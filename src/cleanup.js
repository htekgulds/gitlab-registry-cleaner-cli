import { cancel, confirm, intro, isCancel, note, outro, select, spinner } from '@clack/prompts'
import chalk from 'chalk'
import getTopLevelGroups from './gitlab/getTopLevelGroups.js'
import getRepositoriesFromGroups from './gitlab/getRepositoriesFromGroups.js'
import getRepositoryDetails from './gitlab/getRepositoryDetails.js'
import { filterByCount, sumByGroup } from './gitlab/util.js'
import Gitlab from './gitlab/config.js'

export default async function cleanup () {
  intro('İmajları Temizle')

  const groups = await getTopLevelGroups()

  const selectedGroup = await select({
    message: 'Taranacak Gitlab grubunu seçin',
    options: groups.map(i => ({ value: i.id, label: i.name }))
  })

  if (isCancel(selectedGroup)) {
    cancel('İşlem iptal edildi')
    process.exit(0)
  }

  // Prepare image tags for cleanup
  const s = spinner()
  s.start()
  const repositories = await getRepositoriesFromGroups([selectedGroup])
  const withTags = await getRepositoryDetails(repositories)
  const filteredWithTags = filterByCount(withTags)
  const allTags = sumByGroup(withTags)
  s.stop()

  note(`Toplam imaj sayısı: ${chalk.yellow(repositories.length)}
Temizlemeye dahil edilecek imaj sayısı: ${chalk.yellow(filteredWithTags.length)}
`)

  const selectedTag = await select({
    message: 'Temizlenecek sürüm etiketini seçin',
    options: Object.keys(allTags).map(key => ({ value: key, label: `${key}: ${chalk.yellow(allTags[key])}` }))
  })

  if (isCancel(selectedTag)) {
    cancel('İşlem iptal edildi')
    process.exit(0)
  }

  const isContinue = await confirm({
    message: chalk.red('!! Dikkat: Bu işlem bulunan imajların seçtiğiniz sürümlerini silecektir.') + ' İşleme devam edilsin mi?'
  })

  if (!isContinue) {
    outro('İşlem iptal edildi')
    process.exit(0)
  }

  const results = filteredWithTags.map(repo => {
    console.log(repo.name, 'temizleniyor')
    const tag = repo.tags.find(tag => tag.group === selectedTag)

    // Do nothing if group not found or tag count is less than 5
    if (!tag || tag.list.length <= 5) {
      console.log('Temizlenecek imaj sürümü yok ya da yeterli değil')
      return Promise.resolve()
    }

    return Gitlab.client.delete(`/projects/${repo.project_id}/registry/repositories/${repo.id}/tags`, {
      params: {
        name_regex_delete: `.*-${tag.group}`,
        keep_n: 5,
        older_than: '7d'
      }
    })
      .then(() => console.log(`Temizlik başarılı: ${repo.name} - ${tag.group}`))
      .catch(err => console.error(`Temizlik sırasında hata: ${repo.name} - ${tag.group} - ${err.response?.data?.error || err.response?.data?.message || err.message || err.response?.message}`))
  })

  await Promise.all(results)

  note(`İmajlar sürümleri başarıyla temizlendi.
İmajların diskten kalıcı olarak silinmesi için aşağıdaki komutu Gitlab sunucusunda çalıştırmanız gerekmektedir:
${chalk.green('sudo gitlab-ctl registry-garbage-collect -m')}`)

  outro('İşlem tamamlandı')
}

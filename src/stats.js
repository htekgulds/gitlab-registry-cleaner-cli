import { intro, note, outro, select, spinner } from '@clack/prompts'
import Gitlab from './gitlab/config.js'
import getRepositoriesFromGroups from './gitlab/getRepositoriesFromGroups.js'
import getRepositoryDetails from './gitlab/getRepositoryDetails.js'
import { filterByCount, sumByGroup } from './gitlab/util.js'
import chalk from 'chalk'

export default async function stats (argv) {
  intro('İmaj İstatistikleri Hesaplanıyor')

  const groups = await Gitlab.client.get('/groups', { params: { top_level_only: true } })

  const selectedGroup = await select({
    message: 'Taranacak Gitlab grubunu seçin',
    options: groups.data.map(i => ({ value: i.id, label: i.name }))
  })

  console.log('Selected Group:', selectedGroup)

  const s = spinner()
  s.start()

  const repositories = await getRepositoriesFromGroups([selectedGroup])
  const withTags = await getRepositoryDetails(repositories)

  const filteredTags = filterByCount(withTags, 5)
  const allTags = sumByGroup(withTags)

  s.stop()

  note(`Toplam tekil imaj: ${chalk.yellow(repositories.length)}
Tüm Sürüm Etiketleri:
${Object.keys(allTags).map(key => `\n  ${key}: ${chalk.yellow(allTags[key])}`)}

Temizlenmesi Gereken Depo Sayısı: ${chalk.yellow(filteredTags.length)}
`)

  outro('Bitti!')
}

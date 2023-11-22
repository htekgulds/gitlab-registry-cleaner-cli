import { intro, note, outro, select, spinner } from '@clack/prompts'
import chalk from 'chalk'

import getRepositoriesFromGroups from './gitlab/getRepositoriesFromGroups.js'
import getRepositoryDetails from './gitlab/getRepositoryDetails.js'
import { filterByCount, sumByGroup } from './gitlab/util.js'
import getTopLevelGroups from './gitlab/getTopLevelGroups.js'

export default async function stats (argv) {
  intro('İmaj İstatistikleri')

  const groups = await getTopLevelGroups()

  const selectedGroup = await select({
    message: 'Taranacak Gitlab grubunu seçin',
    options: groups.map(i => ({ value: i.id, label: i.name }))
  })

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

import { intro, note, outro } from '@clack/prompts'
import chalk from 'chalk'

import getCleanupDetails from '../common/getCleanupDetails'
import promptSelectGroups from '../common/promptSelectGroups'

export default async function stats (argv) {
  intro('İmaj İstatistikleri')

  const selectedGroups = await promptSelectGroups(argv.groups)
  const details = await getCleanupDetails(selectedGroups)

  note(
    `Toplam Depo: ${chalk.yellow(details.repositories.length)},
Temizlenmesi Gereken Depo Sayısı: ${chalk.yellow(details.filtered.length)},

Tüm Sürüm Etiketleri:

${Object.keys(details.tags)
  .map(key => `${chalk.green('*')} ${key}: ${chalk.yellow(details.tags[key])}`)
  .join('\n')}
`,
    'Sonuçlar'
  )

  outro(`Temizleme işlemi için ${chalk.green('grc cleanup')} komutunu çalıştırabilirsiniz`)
}

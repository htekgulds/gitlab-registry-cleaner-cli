import { intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import getCleanupDetails from '../common/getCleanupDetails'
import promptSelectGroups from '../common/promptSelectGroups'

export default async function stats (argv) {
  intro('İmaj İstatistikleri')

  console.log('Args:', argv)

  const selectedGroups = await promptSelectGroups(argv.groups)
  const details = await getCleanupDetails(selectedGroups)

  console.log({
    'Toplam Depo': details.repositories.length,
    'Temizlenmesi Gereken Depo Sayısı': details.filtered.length,
    'Tüm Sürüm Etiketleri': details.tags
  })

  outro(
    `Temizleme işlemi için ${chalk.green(
      'grc cleanup'
    )} komutunu çalıştırabilirsiniz`
  )
}

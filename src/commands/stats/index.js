import { intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import getCleanupDetails from '../common/getCleanupDetails'
import promptSelectGroups from '../common/promptSelectGroups'

export default async function stats (argv) {
  console.log('Args:', argv)
  intro('İmaj İstatistikleri')

  // TODO: should be normalized in a middleware or something
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

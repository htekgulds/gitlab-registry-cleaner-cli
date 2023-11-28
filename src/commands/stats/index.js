import { intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import { logger } from '../../util'
import getCleanupDetails from '../common/getCleanupDetails'
import promptSelectGroups from '../common/promptSelectGroups'

export default async function stats (argv) {
  logger.info('Args:', argv)

  intro('İmaj İstatistikleri')

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

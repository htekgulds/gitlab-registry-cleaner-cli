import { intro, outro } from '@clack/prompts'
import getCleanupDetails from '../common/getCleanupDetails.js'
import promptSelectGroups from '../common/promptSelectGroups.js'
import promptConfirm from './promptConfirm.js'
import promptSelectTagToCleanup from './promptSelectTagToCleanup.js'
import showCleanupSuccess from './showCleanupSuccess.js'
import showRegistrySummary from './showRegistrySummary.js'
import deleteImages from './deleteImages.js'
import chalk from 'chalk'

export default async function cleanup (argv) {
  intro(`🧹 İmajları Temizle ${argv.dryRun ? `[${chalk.green('DRY RUN')}]` : ''}`)

  const selectedGroups = await promptSelectGroups(argv.groups)
  const details = await getCleanupDetails(selectedGroups)

  showRegistrySummary(details)

  const selectedTag = await promptSelectTagToCleanup(details.tags, argv.deleteTagsRegex)
  await promptConfirm(argv.dryRun, argv.yes)

  if (!argv.dryRun) {
    // !!! Attention: actually delete given image tags. This action cannot be reversed!
    await deleteImages(details, selectedTag, argv)
  }

  showCleanupSuccess()
  outro('🎉 İşlem tamamlandı')
}

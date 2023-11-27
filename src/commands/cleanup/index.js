import { intro, outro } from '@clack/prompts'
import getCleanupDetails from '../common/getCleanupDetails.js'
import promptSelectGroups from '../common/promptSelectGroups.js'
import promptConfirm from './promptConfirm.js'
import promptSelectTagToCleanup from './promptSelectTagToCleanup.js'
import showCleanupSuccess from './showCleanupSuccess.js'
import showRegistrySummary from './showRegistrySummary.js'
import deleteImages from './deleteImages.js'

export default async function cleanup (argv) {
  intro('İmajları Temizle')

  const selectedGroups = await promptSelectGroups(argv.groups)
  const details = await getCleanupDetails(selectedGroups)

  showRegistrySummary(details)

  const selectedTag = await promptSelectTagToCleanup(details.tags)
  await promptConfirm()
  if (!argv.dryRun) {
    // !!! Attention: actually delete given image tags. This action cannot be reversed!
    await deleteImages(details, selectedTag)
  }

  showCleanupSuccess()
  outro('İşlem tamamlandı')
}

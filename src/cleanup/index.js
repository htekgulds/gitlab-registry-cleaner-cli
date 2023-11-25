import { intro, outro } from '@clack/prompts'
import getCleanupDetails from './getCleanupDetails.js'
import promptConfirm from './promptConfirm.js'
import promptSelectGroups from './promptSelectGroups.js'
import promptSelectTagToCleanup from './promptSelectTagToCleanup.js'
import showCleanupSuccess from './showCleanupSuccess.js'
import showRegistrySummary from './showRegistrySummary.js'
import deleteImages from './deleteImages.js'
import getTopLevelGroups from '../gitlab/getTopLevelGroups.js'

export default async function cleanup (isDry) {
  intro('İmajları Temizle')

  const topLevelGroups = await getTopLevelGroups()
  const selectedGroups = await promptSelectGroups(topLevelGroups)
  const details = await getCleanupDetails(selectedGroups)

  showRegistrySummary(details)

  const selectedTag = await promptSelectTagToCleanup(details.tags)
  await promptConfirm()
  if (!isDry) {
    // !!! Attention: actually delete given image tags. This action cannot be reversed!
    await deleteImages(details, selectedTag)
  }

  showCleanupSuccess()
  outro('İşlem tamamlandı')
}

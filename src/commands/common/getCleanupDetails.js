import { spinner } from '@clack/prompts'
import getRepositoriesFromGroups from '../../gitlab/getRepositoriesFromGroups'
import getRepositoryDetails from '../../gitlab/getRepositoryDetails'
import { filterByCount, sumByGroup } from '../../gitlab/util'

// Prepare image tags for cleanup
export default async function getCleanupDetails (selectedGroups) {
  const s = spinner()
  s.start()

  const repositories = await getRepositoriesFromGroups(selectedGroups)
  const withTags = await getRepositoryDetails(repositories)
  const filtered = filterByCount(withTags)
  const allTags = sumByGroup(withTags)

  s.stop()

  return {
    repositories,
    filtered,
    tags: allTags
  }
}

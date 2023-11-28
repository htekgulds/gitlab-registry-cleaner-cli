import { spinner } from '@clack/prompts'
import getRepositoriesFromGroups from '../../gitlab/getRepositoriesFromGroups'
import getRepositoryDetails from '../../gitlab/getRepositoryDetails'
import { filterByCount, sumByGroup } from '../../gitlab/util'
import chalk from 'chalk'

// Prepare image tags for cleanup
export default async function getCleanupDetails (selectedGroups) {
  const s = spinner()
  s.start('İmaj detayları alınıyor')

  const repositories = await getRepositoriesFromGroups(selectedGroups)
  const withTags = await getRepositoryDetails(repositories)
  const filtered = filterByCount(withTags)
  const allTags = sumByGroup(withTags)

  s.stop(`${chalk.green('✔')} İmaj detayları başarıyla alındı`)

  return {
    repositories,
    filtered,
    tags: allTags
  }
}

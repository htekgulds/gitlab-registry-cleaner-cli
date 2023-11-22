import fetchRepositories from './fetchRepositories.js'

export default async function getRepositoriesFromGroups (groupIds) {
  // Fetch repositories under given groups
  const repositoriesAsync = groupIds.map(groupId => fetchRepositories(groupId))

  // Wait for async requests and merge into one list
  return (await Promise.all(repositoriesAsync)).flatMap(i => i)
}

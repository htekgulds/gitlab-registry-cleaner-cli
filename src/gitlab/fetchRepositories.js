const Gitlab = require('./config.js')

// Find all repositories under given group recursively
export default async function fetchRepositories (groupId, page = 1, perPage = 100) {
  try {
    console.log(`Depolar çekiliyor: ${groupId} - sayfa: ${page}`)
    const response = await Gitlab.client.get(`/groups/${groupId}/registry/repositories`, {
      params: { page, per_page: perPage }
    })

    const items = response.data // Assuming the items are directly in the response data

    // Base case: No more items to fetch
    if (items.length === 0) {
      console.log('Başka kalmadı, döngüden çıkıyorum...')
      return []
    }

    // Recursive case: Fetch more items
    const nextPage = page + 1
    const remainingItems = await fetchRepositories(groupId, nextPage, perPage)

    return [...items, ...remainingItems]
  } catch (error) {
    console.error('Depolar çekilirken hata:', error)
    throw error
  }
}

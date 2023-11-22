const gitlab = require('./gitlab')
const { getSuffix } = require('./parser')

async function getRepositoriesFromGroups (groupIds) {
  // Verilen grupların altındaki repository'leri çekiyoruz
  const repositoriesAsync = groupIds.map(groupId => fetchRepositories(groupId))

  // Tüm async sorguları bekleyip dönen listeleri birleştiriyoruz
  return (await Promise.all(repositoriesAsync)).flatMap(i => i)
}

// Deponun sürümlerini çek
function getRepositoryDetails (repositories) {
  const response = repositories.map(async repo => {
    console.log(`Deponun detayları çekiliyor: ${repo.path}`)

    const details = await gitlab.get(`/registry/repositories/${repo.id}`, {
      params: {
        tags: true,
        tags_count: true
      }
    })

    return {
      id: repo.id,
      name: repo.path,
      project_id: repo.project_id,
      tags_count: details.data.tags_count,
      tags: groupByTagSuffix(details.data.tags.map(tag => tag.name))
    }
  })

  return Promise.all(response)
}

// Verilen grup altındaki tüm depoları recursive olarak bul
async function fetchRepositories (groupId, page = 1, perPage = 100) {
  try {
    console.log(`Depolar çekiliyor: ${groupId} - sayfa: ${page}`)
    const response = await gitlab.get(`/groups/${groupId}/registry/repositories`, {
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

// Sürüm suffix'lerine göre grupla
function groupByTagSuffix (items) {
  const obj = items.reduce((all, tag) => {
    const suffix = getSuffix(tag)
    const current = all[suffix]?.list || []

    return {
      ...all,
      [suffix]: {
        list: [...current, tag]
      }
    }
  }, {})

  return Object.keys(obj).map(key => ({ group: key, ...obj[key] }))
}

// 1. 5'ten az imajı olan depoları sayma
// 2. Kalanların sürüm gruplarından 5'ten az imajı olanları da sayma
// 3. Grupları filtreledikten sonra altında hiç gup kalmayanları da sayma
function filterByCount (list, groupCount = 5, totalCount = 5) {
  return list
    .filter(repo => repo.tags_count > totalCount)
    .map(repo => ({ ...repo, tags: repo.tags.filter(tag => tag.list.length > groupCount) }))
    .filter(repo => repo.tags.length !== 0)
}

// Her suffix'den kaç imaj olduğunu bul
function sumByGroup (list) {
  return list.reduce((all, repo) => {
    repo.tags.forEach(tag => {
      const current = all[tag.group] || 0
      all[tag.group] = current + tag.list.length
    })

    return all
  }, {})
}

module.exports = {
  getRepositoriesFromGroups,
  getRepositoryDetails,
  filterByCount,
  sumByGroup
}

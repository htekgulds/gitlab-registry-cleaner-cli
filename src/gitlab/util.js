import { GROUP_TAGS_REGEX } from '../defaults'
import { logger } from '../util'

export const GroupBy = {
  regex: GROUP_TAGS_REGEX, // default
  tagSuffix (items) {
    const obj = items.reduce((all, tag) => {
      const match = tag.match(this.regex)
      const suffix = match?.groups?.suffix || '[no-suffix]'
      logger.debug('Match:', match)

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
}

// 1. 5'ten az imajı olan depoları sayma
// 2. Kalanların sürüm gruplarından 5'ten az imajı olanları da sayma
// 3. Grupları filtreledikten sonra altında hiç gup kalmayanları da sayma
export function filterByCount (list, groupCount = 5, totalCount = 5) {
  return list
    .filter(repo => repo.tags_count > totalCount)
    .map(repo => ({
      ...repo,
      tags: repo.tags.filter(tag => tag.list.length > groupCount)
    }))
    .filter(repo => repo.tags.length !== 0)
}

// Her suffix'den kaç imaj olduğunu bul
export function sumByGroup (list) {
  return list.reduce((all, repo) => {
    repo.tags.forEach(tag => {
      const current = all[tag.group] || 0
      all[tag.group] = current + tag.list.length
    })

    return all
  }, {})
}

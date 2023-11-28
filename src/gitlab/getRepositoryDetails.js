import { logger } from '../util.js'
import Gitlab from './config.js'
import { GroupBy } from './util.js'

export default function getRepositoryDetails (repositories) {
  const response = repositories.map(async repo => {
    logger.info(`Deponun detayları çekiliyor: ${repo.path}`)

    const details = await Gitlab.client.get(
      `/registry/repositories/${repo.id}`,
      {
        params: {
          tags: true,
          tags_count: true
        }
      }
    )

    return {
      id: repo.id,
      name: repo.path,
      project_id: repo.project_id,
      tags_count: details.data.tags_count,
      tags: GroupBy.tagSuffix(details.data.tags.map(tag => tag.name))
    }
  })

  return Promise.all(response)
}

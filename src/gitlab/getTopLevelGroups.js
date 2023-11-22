import Gitlab from './config.js'

export default async function getTopLevelGroups () {
  const response = await Gitlab.client.get('/groups', {
    params: {
      top_level_only: true
    }
  })

  return response.data
}

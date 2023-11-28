import Gitlab from '../../gitlab/config'
import { logger } from '../../util'

export default async function config (argv) {
  try {
    const response = await Gitlab.client.get('/version')
    logger.info('Gitlab Version:', response.data)
  } catch (err) {
    console.error(err)
  }
}

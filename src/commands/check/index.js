import Gitlab from '../../gitlab/config'
import { logger } from '../../util'

export default async function check () {
  logger.warn('WARN: level 0')
  logger.info('INFO: Level 1')
  logger.debug('DEBUG: Level 2')
  logger.trace('TRACE: Level 3')
  try {
    const response = await Gitlab.client.get('/version')
    logger.warn('Gitlab Version:', response.data)
  } catch (err) {
    console.error(err)
  }
}

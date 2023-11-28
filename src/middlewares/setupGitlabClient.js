import Gitlab from '../gitlab/config'
import { logger } from '../util'

export default function setupGitlabClient (argv) {
  logger.info('Setting up Gitlab client')

  if (!argv.url || !argv.token) {
    console.error('Gitlab ayarları bulunamadı')
    process.exit(1)
  }

  Gitlab.setup(argv)
}

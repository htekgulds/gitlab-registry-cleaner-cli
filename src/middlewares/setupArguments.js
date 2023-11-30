import Config from '../config'
import { logger } from '../util'

export default function setupArguments (argv) {
  if (argv.verbose) {
    Config.logLevel = argv.verbose
  }

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  Config.args = argv
  logger.info('Setting up arguments', Config)
}

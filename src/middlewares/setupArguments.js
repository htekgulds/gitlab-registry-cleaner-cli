import Config from '../config'
import { DEFAULT_LEVEL, logger } from '../util'

export default function setupArguments (argv) {
  Config.logLevel = argv.verbose || DEFAULT_LEVEL

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  Config.args = argv
  logger.info('Setting up arguments', Config)
}

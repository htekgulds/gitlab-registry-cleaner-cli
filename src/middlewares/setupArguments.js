import Config from '../config'
import { GroupBy } from '../gitlab/util'
import { logger } from '../util'

export default function setupArguments (argv) {
  if (argv.verbose) {
    Config.logLevel = argv.verbose
  }

  logger.info('Setting up arguments', argv)

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  if (argv.groupTagsRegex) {
    GroupBy.regex = argv.groupTagsRegex
  }
}

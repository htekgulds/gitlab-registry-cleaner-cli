import { GroupBy } from '../gitlab/util'
import { DebugConfig, logger } from '../util'

export default function setupArguments (argv) {
  logger.debug('Setting up arguments', argv)

  if (argv.verbose) {
    DebugConfig.level = argv.verbose + 1
  }

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  if (argv.groupTagsRegex) {
    GroupBy.regex = argv.groupTagsRegex
  }
}

import { GroupBy } from '../gitlab/util'
import { logger } from '../util'

export default function setupArguments (argv) {
  logger.info('Setting up arguments')

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  if (argv.groupTagsRegex) {
    GroupBy.regex = argv.groupTagsRegex
  }
}

import { GroupBy } from '../gitlab/util'
import { debug } from '../util'

export default function setupArguments (argv) {
  debug(() => console.log('Setting up arguments'))

  if (argv.groups) {
    argv.groups = String(argv.groups)
      ?.split(',')
      .filter(i => i && i.trim() !== '')
  }

  if (argv.groupTagsRegex) {
    GroupBy.regex = argv.groupTagsRegex
  }
}

import path from 'path'
import os from 'os'

export const KEEP_N = 5 // keep last 5
export const OLDER_THAN = '7d' // delete older than 7 days
export const GROUP_TAGS_REGEX = '.*' // eg. /^[a-zA-Z0-9.]+(-[0-9]+)?-(?<suffix>.*)$/ for 123abc-98765-test (commit sha + (pipeline id) + env)
export const DEFAULT_CONFIG_PATHS = ['.grc.json', path.join(os.homedir(), '.grc.json')] // $pwd/.grc.json or $home/.grc.json (JSON file)

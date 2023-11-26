import path from 'path'
import os from 'os'

export const KEEP_N = 5 // keep last 5
export const OLDER_THAN = '7d' // delete older than 7 days
export const GROUP_TAGS_REGEX = /^[a-zA-Z0-9.]+(-[0-9]+)?-(.*)$/ // eg. myimage-123456-test (image + commit sha + env)
export const DELETE_TAGS_REGEX = '.*-test'
export const CONFIG_PATH = path.join(os.homedir(), '.grc') // $home/.grc (JSON file)

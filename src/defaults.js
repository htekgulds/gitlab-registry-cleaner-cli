import path from 'path'
import os from 'os'
import dotenvFlow from 'dotenv-flow'
import { debug } from './util'

// Get options from .env file while developing for ease of use
debug(() => dotenvFlow.config())

export const GITLAB_BASE_URL = process.env.GITLAB_BASE_URL
export const GITLAB_TOKEN = process.env.GITLAB_TOKEN
export const KEEP_N = process.env.KEEP_N || 5 // keep last 5
export const OLDER_THAN = process.env.OLDER_THAN || '7d' // delete older than 7 days
export const GROUP_TAGS_REGEX =
  process.env.GROUP_TAGS_REGEX || /^[a-zA-Z0-9.]+(-[0-9]+)?-(.*)$/ // eg. myimage-123456-test (image + commit sha + env)
export const DELETE_TAGS_REGEX = process.env.DELETE_TAGS_REGEX || '.*-test'
export const CONFIG_PATH =
  process.env.CONFIG_PATH || path.join(os.homedir(), '.grc.json') // $home/.grc.json (JSON file)

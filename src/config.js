import os from 'os'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { debug } from './util.js'
import {
  CONFIG_PATH,
  DELETE_TAGS_REGEX,
  GROUP_TAGS_REGEX,
  KEEP_N,
  OLDER_THAN
} from './defaults.js'

/**
 * Options (check defaults.js fiel for defaults):
 * - gitlabBaseUrl (required)
 * - gitlabToken (required)
 * - keepN (optional) (for non-interactive mode)
 * - olderThan (optional) (for non-interactive mode)
 * - groupTagsRegex (optional) (for selecting with prompt)
 * - deleteTagsRegex (optional) (for non-interactive mode)
 * - dryRun (optional) (do everything except actually deleting images)
 * - configPath (optional) (you can provide all options from file except this one, which doesn't make any sense 😅)
 */

const Config = {
  _config: {},
  path: CONFIG_PATH,
  get () {
    return this._config
  },
  set () {
    let configFromFile = {}

    try {
      const configFile = fs.readFileSync(this.path)
      configFromFile = JSON.parse(configFile)
    } catch (err) {
      debug(() => console.log('Dosya bulunamadı:', chalk.blue(this.path)))
    }

    this._config.gitlabBaseUrl = process.env.GITLAB_BASE_URL || configFromFile.gitlabBaseUrl
    this._config.gitlabToken = process.env.GITLAB_TOKEN || configFromFile.gitlabToken

    return this._config
  },
  isValid () {
    return this._config.gitlabBaseUrl && this._config.gitlabToken
  }
}

export default Config

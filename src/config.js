import os from 'os'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { debug } from './util.js'

const Config = {
  _config: {},
  path: path.join(os.homedir(), '.grc'),
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
  },
  isValid () {
    return this._config.gitlabBaseUrl && this._config.gitlabToken
  }
}

export default Config

#!/usr/bin/env node

import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import dotenvFlow from 'dotenv-flow'

import Config from '../src/config.js'
import { debug } from '../src/util.js'
import help from '../src/help.js'
import Gitlab from '../src/gitlab/config.js'
import stats from '../src/commands/stats/index.js'
import cleanup from '../src/commands/cleanup/index.js'
import configCommand from '../src/commands/config/index.js'
import { CONFIG_PATH } from '../src/defaults.js'
import options from '../src/commands/options.js'

// Get options from .env file while developing for ease of use
debug(() => dotenvFlow.config())

// const config = Config.set()
// debug(() => console.log('Config', config))

// Warn if Gitlab settings not present and exit
// if (!Config.isValid()) {
//   help()
//   process.exit(1)
// }

// Gitlab.setup(config)

function getConfigPath () {
  if (fs.existsSync(CONFIG_PATH)) return CONFIG_PATH
}

// TODO: i18n (en, etc.)
yargs(hideBin(process.argv))
  .usage('Kullanım: $0 <command>')
  .command('stats', 'İmaj istatistikleri', {}, stats)
  .command('cleanup', 'İmajları temizle', {}, cleanup)
  .command('config', 'Ayarları tanımla', {}, configCommand)
  .options(options) // with default or env values
  .demandCommand(1) // 1 command required
  .config({ extends: getConfigPath() }) // use default config file if exists
  .config(
    'config-path',
    'Ayarları içeren JSON formatındaki dosya (ör. /etc/.grc)',
    configPath => {
      debug(() => console.log('Reading config file: ', configPath))
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }
  ) // extra config file if given
  .env('GRC') // use env variables (eg. GRC_MY_VAR) to provide options. Command line arguments take presedence
  .help()
  .parse()

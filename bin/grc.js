#!/usr/bin/env node

import fs from 'fs'
import yargs from 'yargs/yargs'
import dotenvFlow from 'dotenv-flow'
import { hideBin } from 'yargs/helpers'

import Config from '../src/config.js'
import { debug } from '../src/util.js'
import help from '../src/help.js'
import Gitlab from '../src/gitlab/config.js'
import stats from '../src/commands/stats/index.js'
import cleanup from '../src/commands/cleanup/index.js'
import configCommand from '../src/commands/config/index.js'
import {
  CONFIG_PATH,
  DELETE_TAGS_REGEX,
  GROUP_TAGS_REGEX,
  KEEP_N,
  OLDER_THAN
} from '../src/defaults.js'

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
  .option('gitlab-base-url', {
    alias: 'url',
    describe:
      'Gitlab uygulamasının adresi (ör. https://git.mycompany.com)' /* 'Base url for gitlab instance. (eg. https:/git.company.com)' */
  })
  .option('gitlab-token', {
    alias: 'token',
    describe:
      'İmajları silmeye yetkili Gitlab access token' /* 'Gitlab Access token authorized to delete given tags' */
  })
  .option('keep-n', {
    describe:
      'Son yüklenen n kadar imajı silemden bırak' /* 'Keep n number of latest tags while deleting' */,
    default: KEEP_N
  })
  .option('older-than', {
    describe:
      'Verilen zamandan önce yüklenmiş imajları sil' /* 'Delete tags older than given amount of time' */,
    default: OLDER_THAN
  })
  .option('group-tags-regex', {
    describe:
      "İmaj sürümlerini verilen regex'e göre grupla (interaktif modda liste çıkarmak için kullanılır)",
    default: GROUP_TAGS_REGEX
  })
  .option('delete-tags-regex', {
    describe:
      "İmajları verilen reegx'e göre sil (interaktif olmayan modda kullanılır)",
    default: DELETE_TAGS_REGEX
  })
  .option('dry-run', { describe: 'İmajları gerçekten silme', default: false })
  .demandCommand(
    1, // min required
    1 // max required
  )
  .config({
    extends: getConfigPath()
  })
  .config(
    'config-path',
    'Ayarları içeren JSON formatındaki dosya (ör. /etc/.grc)',
    configPath => {
      debug(() => console.log('Reading config file: ', configPath))
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }
  )
  .help()
  .parse()

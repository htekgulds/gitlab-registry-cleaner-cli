#!/usr/bin/env node

import yargs from 'yargs/yargs'
import dotenvFlow from 'dotenv-flow'
import { hideBin } from 'yargs/helpers'

import Config from '../src/config.js'
import { debug } from '../src/util.js'
import help from '../src/help.js'
import Gitlab from '../src/gitlab/config.js'
import stats from '../src/commands/stats/index.js'
import cleanup from '../src/commands/cleanup/index.js'

// Get options from .env file while developing for ease of use
debug(() => dotenvFlow.config())

const config = Config.set()
debug(() => console.log('Config', config))

// Warn if Gitlab settings not present and exit
if (!Config.isValid()) {
  help()
  process.exit(1)
}

Gitlab.setup(config)

// TODO: i18n (en, etc.)
await yargs(hideBin(process.argv))
  .usage('Kullanım: $0 <command>')
  .command('stats', 'İmaj istatistikleri', stats)
  .command('cleanup', 'İmajları temizle', cleanup)
  .command('config', 'Ayarları tanımla', config)
  .demandCommand(
    1, // min required
    1, // max required
    'komut boş geçilemez. stats ya da cleanup komutunu kullanın'
  )
  .help()
  .parse()

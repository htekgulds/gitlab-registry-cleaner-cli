#!/usr/bin/env node

import yargs from 'yargs/yargs'
import dotenvFlow from 'dotenv-flow'
import { hideBin } from 'yargs/helpers'

import { stats, cleanup } from '../src/index.js'
import Config from '../src/config.js'
import { debug } from '../src/util.js'
import help from '../src/help.js'
import Gitlab from '../src/gitlab/config.js'

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

// TODO: i18n (en)
await yargs(hideBin(process.argv))
  .usage('Kullanım: $0 <command>')
  .command('stats', 'İmaj istatistikleri', stats)
  .command('cleanup', 'İmajları temizle', cleanup)
  .demandCommand(1, 1, 'komut boş geçilemez. stats ya da cleanup komutunu kullanın')
  .help()
  .parse()

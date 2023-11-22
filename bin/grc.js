#!/usr/bin/env node

import yargs from 'yargs/yargs'
import dotenvFlow from 'dotenv-flow'
import { hideBin } from 'yargs/helpers'

import { stats, cleanup } from '../src/index.js'
import Config from '../src/config.js'
import { debug } from '../src/util.js'
import { warnConfigNotFound } from '../src/message.js'

// Get options from .env file while developing for ease of use
debug(() => dotenvFlow.config())

Config.set()
debug(() => console.log('Config', Config.get()))

// Warn if Gitlab settings not present
if (!Config.isValid()) warnConfigNotFound()

// TODO: i18n (en)
yargs(hideBin(process.argv))
  .usage('Kullanım: $0 <command>')
  .command('stats', 'İmaj istatistikleri', stats)
  .command('cleanup', 'İmajları temizle', cleanup)
  .demandCommand(1, 1, 'komut boş geçilemez. stats ya da cleanup komutunu kullanın')
  .help()
  .parse()

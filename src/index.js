import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import Config from './config.js'
import { debug } from './util.js'
import help from './help.js'
import Gitlab from './gitlab/config.js'
import stats from './commands/stats/index.js'
import cleanup from './commands/cleanup/index.js'
import config from './commands/config/index.js'
import { CONFIG_PATH } from './defaults.js'
import options from './commands/options.js'

function getConfigPath () {
  if (fs.existsSync(CONFIG_PATH)) return CONFIG_PATH
}

export default async function main () {
  // TODO: i18n (en, etc.)
  await yargs(hideBin(process.argv))
    .usage('Kullanım: $0 <command>')
    // COMMANDS
    .command('stats', 'İmaj istatistikleri', {}, stats)
    .command('cleanup', 'İmajları temizle', {}, cleanup)
    .command('config', 'Ayarları tanımla', {}, config)
    .options(options) // with default or env values
    .demandCommand(1) // 1 command required
    // CONFIG
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
    // HELP
    .describe('help', 'Bu yardım metnini göster')
    .describe('version', 'Sürüm numarası')
    .example(
      '$0 cleanup --config-path=/etc/grc.json',
      'Ayarları JSON dosyasından al'
    )
    .example(
      '$0 cleanup --url=https://git.mycompany.com --token=xxx --delete-tags-regex=.*-test',
      'Ayarları arguman olarak al'
    )
    .alias('help', 'h')
    .alias('version', 'v')
    .epilog(
      'Daha fazla bilgi için bkz: https://github.com/htekgulds/gitlab-registry-cleaner-cli'
    )
    .parse()
}

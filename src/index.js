import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'

import { logger } from './util.js'
import stats from './commands/stats/index.js'
import cleanup from './commands/cleanup/index.js'
import check from './commands/check/index.js'
import { DEFAULT_CONFIG_PATHS, GROUP_TAGS_REGEX, KEEP_N, OLDER_THAN } from './defaults.js'
import setupGitlabClient from './middlewares/setupGitlabClient.js'
import setupArguments from './middlewares/setupArguments.js'
import pkgJson from '../package.json'

function getConfigPath () {
  for (const path of DEFAULT_CONFIG_PATHS) {
    logger.info('Checking config file path: ', chalk.blue(path))
    if (fs.existsSync(path)) return path
  }
}

export default async function main () {
  // TODO: i18n (en, etc.)
  await yargs(hideBin(process.argv))
    .usage('Kullanım: $0 <command>')
    // COMMANDS
    .command('stats', 'İmaj istatistikleri', {}, stats)
    .command('cleanup', 'İmajları temizle', {}, cleanup)
    .command('check', 'Ayarları kontrol et', {}, check) // debug amaçlı
    /**
     * option: --gitlab-base-url, --url
     * env: GRC_GITLAB_BASE_URL
     */
    .option('gitlab-base-url', {
      alias: 'url',
      describe:
        'Gitlab uygulamasının adresi (ör. https://git.mycompany.com)' /* 'Base url for gitlab instance. (eg. https:/git.company.com)' */
    })
    /**
     * option: --gitlab-token, --token
     * env: GRC_GITLAB_TOKEN
     */
    .option('gitlab-token', {
      alias: 'token',
      describe:
        'İmajları silmeye yetkili Gitlab access token' /* 'Gitlab Access token authorized to delete given tags' */
    })
    /**
     * option: --keep-n
     * env: GRC_KEEP_N
     * default: 5
     */
    .option('keep-n', {
      describe: 'Son yüklenen n kadar imajı silmeden bırak' /* 'Keep n number of latest tags while deleting' */,
      default: KEEP_N
    })
    /**
     * option: --older-than
     * env: GRC_OLDER_THAN
     * default: 7d
     */
    .option('older-than', {
      describe: 'Verilen zamandan önce yüklenmiş imajları sil' /* 'Delete tags older than given amount of time' */,
      default: OLDER_THAN
    })
    /**
     * option: --group-tags-regex
     * env: GRC_GROUP_TAGS_REGEX
     * default: .*
     * example: ^[a-zA-Z0-9.]+(-[0-9]+)?-(?<suffix>.*)$ -> (abc123de-[test], abc123de-98765-[dev], etc.)
     */
    .option('group-tags-regex', {
      describe: "İmaj sürümlerini verilen regex'e göre grupla (interaktif modda liste çıkarmak için kullanılır)",
      default: GROUP_TAGS_REGEX
    })
    /**
     * option: --delete-tags-suffix
     * env: GRC_DELETE_TAGS_SUFFIX
     */
    .option('delete-tags-suffix', {
      describe: "İmajları verilen reegx'e göre sil (interaktif olmayan modda kullanılır)"
    })
    /**
     * option: --dry-run
     * env: GRC_DRY_RUN
     * default: false
     */
    .option('dry-run', { describe: 'İmajları gerçekten silme', default: false, boolean: true })
    /**
     * option: --verbose, -v
     * default: 0 (warn)
     */
    .option('verbose', {
      alias: 'v',
      describe: 'Log ayrıntı seviyesini belirle (eg. -v -> info, -vv -> debug gibi)',
      count: true
    })
    /**
     * option: --yes, -y
     * env: GRC_YES
     * default: false
     */
    .option('yes', {
      alias: 'y',
      describe: 'İmajları silme işlemi için onay sorma (aracın non-interactive çalışması için kullanılır)',
      boolean: true
    })
    .alias('help', 'h')
    .version('version', 'Sürüm numarasını göster', pkgJson.version)
    .describe('help', 'Bu yardım metnini göster')
    .middleware(setupGitlabClient)
    .middleware(setupArguments)
    .demandCommand(1) // 1 command required
    // CONFIG
    .config({ extends: getConfigPath() }) // use default config file if exists
    .config('config-path', 'Ayarları içeren JSON formatındaki dosya (ör. /etc/.grc)', configPath => {
      logger.info('Reading config file:', chalk.blue(configPath))
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }) // extra config file if given
    .env('GRC') // use env variables (eg. GRC_MY_VAR) to provide options. Command line arguments take presedence
    // HELP
    .example('$0 cleanup --config-path=/etc/grc.json', 'Ayarları verilen JSON dosyasından al')
    .example(
      '$0 cleanup --url=https://git.mycompany.com --token=xxx --delete-tags-suffix=test',
      'Ayarları arguman olarak al'
    )
    .epilog(`Daha fazla bilgi için bkz: ${chalk.blue('https://github.com/htekgulds/gitlab-registry-cleaner-cli')}`)
    .wrap(120)
    .showHelpOnFail(false, `Kullanım hakkında bilgi almak için ${chalk.green('--help')} argümanını kullanın`)
    .parse()
}

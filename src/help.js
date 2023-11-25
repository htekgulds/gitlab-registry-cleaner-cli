import boxen from 'boxen'
import chalk from 'chalk'
import Config from './config.js'

export default function help () {
  console.log(boxen(`${chalk.yellow('Uyarı:')}

Gitlab ayarları bulunamadı.

Gitlab ayarlarını aşağıdaki şekillerde belirtebilirsiniz:

${chalk.yellow('1.')} ${chalk.blue(Config.path)} dosyası içinde. Dosya içeriği aşağıdaki şekilde olmalıdır:

  ${chalk.yellow('{')}
    ${chalk.blue('"gitlabBaseUrl"')}: ${chalk.dim('"https://git.company.com"')},
    ${chalk.blue('"gitlabToken"')}: ${chalk.dim('"xxx"')}
  ${chalk.yellow('}')}

Bu dosyayı ilgili ayarlarla birlikte oluşturmak için;

  ${chalk.green('grc config --url https://git.company.com --token xxx')}

komutunu da kullanabilirsiniz.

${chalk.yellow('2.')} Ortam değişkenleriyle. Aşağıdaki ortam değişkenlerini kullanabilirsiniz:

  export ${chalk.blue('GITLAB_BASE_URL')}=${chalk.dim('"https://git.company.com"')}
  export ${chalk.blue('GITLAB_TOKEN')}=${chalk.dim('"xxx"')}`, { padding: 1 }))
}

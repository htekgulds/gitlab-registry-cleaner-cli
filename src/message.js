import boxen from 'boxen'
import chalk from 'chalk'
import Config from './config.js'

export function warnConfigNotFound () {
  const example = `${chalk.yellow('{')}
  ${chalk.blue('"gitlabBaseUrl"')}: ${chalk.dim('"https://git.company.com"')},
  ${chalk.blue('"gitlabToken"')}: ${chalk.dim('"xxx"')}
${chalk.yellow('}')}`
  console.log(boxen(`${chalk.yellow('Uyarı:')}

Gitlab ayarları bulunamadı.

${chalk.blue(Config.path)} dosyası bulunamadı.
Bu uygulamayı düzgün şekilde çalıştırabilmek için Gitlab bilgilerine ihtiyacınız var.
Bu dosyayı oluşturup ilgili ayarları aşağıdaki gibi girebilirsiniz:

${example}

Bu dosyayı ilgili ayarlarla birlikte oluşturmak için;

${chalk.green('grc config --url https://git.company.com --token xxx')}

komutunu da kullanabilirsiniz.
`, { padding: 1 }))
  console.log()
}

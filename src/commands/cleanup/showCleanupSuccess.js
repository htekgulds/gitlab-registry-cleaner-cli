import { note } from '@clack/prompts'
import chalk from 'chalk'

export default function showCleanupSuccess () {
  note(`İmaj sürümleri başarıyla temizlendi. 
İmajların diskten kalıcı olarak silinmesi için aşağıdaki komutu Gitlab sunucusunda çalıştırmanız gerekmektedir:
${chalk.green('sudo gitlab-ctl registry-garbage-collect -m')}`)
}

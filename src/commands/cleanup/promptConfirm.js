import { confirm, outro } from '@clack/prompts'
import chalk from 'chalk'

export default async function promptConfirm (isDryRun, isYes) {
  if (isYes) return true

  const isContinue = await confirm({
    message: isDryRun
      ? `İşleme devam edilsin mi? (${chalk.green('dry-run')} argümanı ile çalıştırdınız. İmajlar silinmeyecek)`
      : `${chalk.red(
          '!! Dikkat: Bu işlem bulunan imajların seçtiğiniz sürümlerini silecektir.'
        )} İşleme devam edilsin mi?`
  })

  if (!isContinue) {
    outro('İşlem iptal edildi')
    process.exit(0)
  }
}

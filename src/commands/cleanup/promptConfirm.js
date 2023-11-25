import { confirm, outro } from '@clack/prompts'
import chalk from 'chalk'

export default async function promptConfirm () {
  const isContinue = await confirm({
    message:
      chalk.red(
        '!! Dikkat: Bu işlem bulunan imajların seçtiğiniz sürümlerini silecektir.'
      ) + ' İşleme devam edilsin mi?'
  })

  if (!isContinue) {
    outro('İşlem iptal edildi')
    process.exit(0)
  }
}

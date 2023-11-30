import { cancel, isCancel, select } from '@clack/prompts'
import chalk from 'chalk'

export default async function promptSelectTagToCleanup (tags, regex) {
  // Eğer regex verildiyse suffix bulmaya gerek yok, direk çık.
  if (regex) return null

  const selectedTag = await select({
    message: 'Temizlenecek sürüm etiketini seçin',
    options: Object.keys(tags).map(key => ({
      value: key,
      label: `${key}: ${chalk.yellow(tags[key])}`
    }))
  })

  if (isCancel(selectedTag)) {
    cancel('İşlem iptal edildi')
    process.exit(0)
  }

  return selectedTag
}

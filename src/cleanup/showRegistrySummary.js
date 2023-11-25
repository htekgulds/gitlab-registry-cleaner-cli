import { note } from '@clack/prompts'
import chalk from 'chalk'

export default function showRegistrySummary (details) {
  note(`Toplam imaj sayısı: ${chalk.yellow(details.repositories.length)}
Temizlemeye dahil edilecek imaj sayısı: ${chalk.yellow(
    details.filtered.length
  )}`)
}

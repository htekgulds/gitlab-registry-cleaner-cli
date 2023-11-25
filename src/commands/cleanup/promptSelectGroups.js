import { cancel, isCancel, multiselect } from '@clack/prompts'

export default async function promptSelectGroups (groups) {
  const selectedGroups = await multiselect({
    message: 'Taranacak Gitlab grubunu seçin',
    options: groups.map(i => ({ value: i.id, label: i.name }))
  })

  if (isCancel(selectedGroups)) {
    cancel('İşlem iptal edildi')
    process.exit(0)
  }

  return selectedGroups
}

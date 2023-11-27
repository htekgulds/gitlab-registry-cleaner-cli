import { cancel, isCancel, multiselect } from '@clack/prompts'
import getTopLevelGroups from '../../gitlab/getTopLevelGroups'

export default async function promptSelectGroups (groupsFromOptions) {
  if (groupsFromOptions) return groupsFromOptions.split(',')

  const groups = await getTopLevelGroups()

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

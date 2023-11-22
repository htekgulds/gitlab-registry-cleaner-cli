import chalk from 'chalk'
import Gitlab from './gitlab/config.js'

export default async function stats (argv) {
  console.log(chalk.blue('Stats'))

  const groups = await Gitlab.client.get('/groups', { params: { top_level_only: true } })

  console.log(groups.data)
}

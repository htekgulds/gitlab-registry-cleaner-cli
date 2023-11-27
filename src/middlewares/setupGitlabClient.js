import Gitlab from '../gitlab/config'
import { debug } from '../util'

export default function setupGitlabClient (argv) {
  debug(() => console.log('Setting up Gitlab client'))

  if (!argv.url || !argv.token) {
    console.error('Gitlab ayarları bulunamadı')
    process.exit(1)
  }

  Gitlab.setup(argv)
}

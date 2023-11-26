import Gitlab from '../../gitlab/config'

export default async function config (argv) {
  console.log('Args:', argv)
  try {
    const response = await Gitlab.client.get('/version')
    console.log('Gitlab Version:', response.data)
  } catch (err) {
    console.error(err)
  }
}

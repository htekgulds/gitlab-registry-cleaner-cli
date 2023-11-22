import axios from 'axios'

const Gitlab = {
  client: null,
  setup (config) {
    console.log('Setting up gitlab')

    this.client = axios.create({
      baseURL: config.gitlabBaseUrl + '/api/v4',
      timeout: 10000,
      headers: {
        'Private-Token': config.gitlabToken
      }
    })
  }
}

export default Gitlab

import axios from 'axios'
import Config from './config'

const config = Config.get()

const gitlab = axios.create({
  baseURL: config.gitlabBaseUrl,
  timeout: 10000,
  headers: {
    'Private-Token': config.gitlabToken
  }
})

export default gitlab

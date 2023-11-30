import { DEFAULT_LEVEL } from './util'

/**
 * Global config nesnesi
 * Fonksiyonların kolayca erişmesi için
 */
const Config = {
  debug: process.env.NODE_ENV === 'development',
  logLevel: DEFAULT_LEVEL
}

export default Config

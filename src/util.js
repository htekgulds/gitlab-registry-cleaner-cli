// const GROUP_BY_REGEX = /^[a-zA-Z0-9.]+(-[0-9]+)?-(.*)$/

import { GROUP_TAGS_REGEX } from './defaults'

export function getSuffix (tag) {
  const match = tag.match(GROUP_TAGS_REGEX)
  debug(() => console.log('Match:', match))

  if (match) return match[2]

  return null
}

export function debug (fn, condition = process.env.NODE_ENV === 'development') {
  if (condition) {
    fn()
  }
}

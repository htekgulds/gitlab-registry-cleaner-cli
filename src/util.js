import Config from './config'

export const Levels = {
  WARN: 0,
  INFO: 1,
  DEBUG: 2,
  TRACE: 3
}

export const DEFAULT_LEVEL = Levels.WARN

export function debug (fn) {
  if (Config.debug) {
    fn()
  }
}

export function log ({ msgs, args, level = DEFAULT_LEVEL }) {
  if (level <= Config.logLevel) {
    console.log(msgs, ...args)
  }
}

export const logger = {
  warn (msgs, ...args) {
    log({ msgs, args, level: Levels.WARN })
  },
  info (msgs, ...args) {
    log({ msgs, args, level: Levels.INFO })
  },
  debug (msgs, ...args) {
    log({ msgs, args, level: Levels.DEBUG })
  },
  trace (msgs, ...args) {
    log({ msgs, args, level: Levels.TRACE })
  }
}

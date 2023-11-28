export const Levels = {
  WARN: 0,
  INFO: 1,
  DEBUG: 2,
  TRACE: 3
}

const DEFAULT_LEVEL = Levels.WARN

export const DebugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  level: DEFAULT_LEVEL
}

export function debug (fn) {
  if (DebugConfig.enabled) {
    fn()
  }
}

export function log ({ msgs, args, level = DEFAULT_LEVEL }) {
  if (level <= DebugConfig.level) {
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

export const Levels = {
  INFO: 0,
  WARN: 1,
  DEBUG: 2,
  TRACE: 3
}

const DEFAULT_LEVEL = Levels.INFO

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
  if (DebugConfig.enabled && level <= DebugConfig.level) {
    console.log(msgs, ...args)
  }
}

export const logger = {
  info (msgs, ...args) {
    log({ msgs, args, level: Levels.INFO })
  },
  warn (msgs, ...args) {
    log({ msgs, args, level: Levels.WARN })
  },
  debug (msgs, ...args) {
    log({ msgs, args, level: Levels.DEBUG })
  },
  trace (msgs, ...args) {
    log({ msgs, args, level: Levels.TRACE })
  }
}

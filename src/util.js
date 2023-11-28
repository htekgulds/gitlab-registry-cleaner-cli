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

export function log ({ msgs, level = DEFAULT_LEVEL }) {
  if (DebugConfig.enabled && level <= DebugConfig.level) {
    console.log(...msgs)
  }
}

export const logger = {
  info (...msgs) {
    log({ msgs, level: Levels.INFO })
  },
  warn (msgs) {
    log({ msgs, level: Levels.WARN })
  },
  debug (msgs) {
    log({ msgs, level: Levels.DEBUG })
  },
  trace (msgs) {
    log({ msgs, level: Levels.TRACE })
  }
}

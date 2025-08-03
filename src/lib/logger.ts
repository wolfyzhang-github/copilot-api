import consola from "consola"

function getTimestamp(): string {
  const now = new Date()
  // Convert to UTC+8 (East Asia timezone)
  const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000)

  const year = utc8Time.getUTCFullYear()
  const month = String(utc8Time.getUTCMonth() + 1).padStart(2, "0")
  const day = String(utc8Time.getUTCDate()).padStart(2, "0")
  const hours = String(utc8Time.getUTCHours()).padStart(2, "0")
  const minutes = String(utc8Time.getUTCMinutes()).padStart(2, "0")
  const seconds = String(utc8Time.getUTCSeconds()).padStart(2, "0")
  const milliseconds = String(utc8Time.getUTCMilliseconds()).padStart(3, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}

// Create a wrapper that adds timestamps to output methods while preserving all consola functionality
const originalMethods = {
  log: consola.log.bind(consola),
  info: consola.info.bind(consola),
  error: consola.error.bind(consola),
  warn: consola.warn.bind(consola),
  debug: consola.debug.bind(consola),
  success: consola.success.bind(consola),
}

// Override output methods to add timestamps while preserving the raw property
const createTimestampedLogFn = (originalFn: typeof originalMethods.log) => {
  const timestampedFn = (...args: Array<unknown>) =>
    originalFn(`[${getTimestamp()}]`, ...args)
  timestampedFn.raw = originalFn.raw
  return timestampedFn
}

consola.log = createTimestampedLogFn(originalMethods.log)
consola.info = createTimestampedLogFn(originalMethods.info)
consola.error = createTimestampedLogFn(originalMethods.error)
consola.warn = createTimestampedLogFn(originalMethods.warn)
consola.debug = createTimestampedLogFn(originalMethods.debug)
consola.success = createTimestampedLogFn(originalMethods.success)

// Export both the enhanced consola and a simple logger for basic console methods

export const logger = {
  log: (...args: Array<unknown>) => {
    console.log(`[${getTimestamp()}]`, ...args)
  },
  error: (...args: Array<unknown>) => {
    console.error(`[${getTimestamp()}]`, ...args)
  },
  warn: (...args: Array<unknown>) => {
    console.warn(`[${getTimestamp()}]`, ...args)
  },
  info: (...args: Array<unknown>) => {
    console.info(`[${getTimestamp()}]`, ...args)
  },
}
export { default as consola } from "consola"

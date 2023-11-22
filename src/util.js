export function debug (fn, condition = process.env.NODE_ENV === 'development') {
  if (condition) {
    fn()
  }
}

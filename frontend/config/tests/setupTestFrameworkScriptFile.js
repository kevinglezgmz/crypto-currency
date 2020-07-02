if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', (error) => {
    throw error
  })

  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true
}

beforeAll(() => {
  const defaultLogError = console.error
  const defaultWarnError = console.warn

  console.error = jest.fn(defaultLogError)
  console.warn = jest.fn(defaultWarnError)
})

beforeEach(() => {
  console.error.mockRestore()
  console.warn.mockRestore()
})

afterEach(() => {
  expect(console.error).not.toHaveBeenCalled()
  expect(console.warn).not.toHaveBeenCalled()
})

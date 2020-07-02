module.exports = {
  moduleDirectories: ['node_modules'],
  setupFiles: ['<rootDir>/config/tests/setupEnzyme.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/config/tests/setupTestFrameworkScriptFile.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/@types/',
    '<rootDir>/dist/',
    '<rootDir>/bundles/',
    '<rootDir>/build/',
    '<rootDir>/lib/',
    '<rootDir>/config/',
  ],
  transform: {
    '\\.tsx?$': 'babel-jest',
    '\\.jsx?$': 'babel-jest', // if you have jsx tests too
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|png|svg)$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
}

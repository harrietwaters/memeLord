module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/__*__/*',
  ],
  testPathIgnorePatterns: [
      "/node_modules/",
      ".js$"
  ],
  moduleFileExtensions: ['js', 'ts'],
  cacheDirectory: '<rootDir>/.cache/unit',
};
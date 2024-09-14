module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/*.test.ts*'],
};

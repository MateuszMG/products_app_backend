/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
  verbose: true,
  clearMocks: true,
  forceExit: true,
  resetMocks: true,
  restoreMocks: true,
};

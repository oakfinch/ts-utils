module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  collectCoverage: true,
  passWithNoTests: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/__test__/**'],
};

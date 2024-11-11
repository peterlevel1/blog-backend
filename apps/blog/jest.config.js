module.exports = {
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/common/$1',
    '@databases/(.*)': '<rootDir>/databases/$1',
    '@modules/(.*)': '<rootDir>/modules/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

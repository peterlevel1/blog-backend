module.exports = {
  testRegex: '.e2e-spec.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/../src/$1',
    '@common/(.*)': '<rootDir>/../src/common/$1',
    '@databases/(.*)': '<rootDir>/../src/databases/$1',
    '@modules/(.*)': '<rootDir>/../src/modules/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

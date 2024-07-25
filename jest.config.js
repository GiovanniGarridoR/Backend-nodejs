module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3002', // o el URL que prefieras
  },
};

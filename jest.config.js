module.exports = {
  clearMocks: true,
  resetModules: true,
  setupFiles: ['<rootDir>/test/jest-setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/mocks/styleMock.js',
  },
  coverageDirectory: './.coverage',
  coverageReporters: ['json-summary', 'lcov', 'text'],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|png|psd|svg|webp)$": "<rootDir>/test/mocks/mediaFileTransformer.js",
  },
};

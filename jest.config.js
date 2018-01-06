module.exports = {
  verbose: true,
  globals: {
    window: true,
  },

  setupFiles: ['./client/__mock__/jqueryMock', './client/__mock__/browserHistory'],
  testPathIgnorePatterns: ['./server/test/test', './node_modules/'],

};


module.exports = {
  verbose: true,
  globals: {
    window: true,
  },
  setupFiles: ['./client/__mock__/jquery', './client/__mock__/gapi', './client/__mock__/browserHistory'],
  testPathIgnorePatterns: ['./server/test/test', './node_modules/'],

};


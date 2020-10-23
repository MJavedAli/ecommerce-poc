require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
  },
  disableWarnings: true,
  fast: true,
});
exports.config = require('./config/protractor.conf.ts').config;

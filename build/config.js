const path = require('path');

const pkg = require('../package.json');

module.exports = {
  path: path.join(__dirname, '../dist/assets/'),
  build: {
    publicPath: `//mycdn.com/${pkg.name}/dist/`,
    sourceMap: false,
    cssSourceMap: false
  },
  dev: {
    publicPath: '/dist/',
    sourceMap: true,
    cssSourceMap: true
  }
};

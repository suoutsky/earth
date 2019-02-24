const chalk = require('chalk');
const webpack = require('webpack');
const TuiaAutoUpload = require('tuia-auto-upload');
const config = require('./config');
const webpackConfig = require('./webpack.prod.conf');

const pkg = require('../package.json');

webpack(webpackConfig, function(err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  console.log(chalk.cyan('  Build complete.\n'));

  (async() => {
    const uploader = new TuiaAutoUpload({
      dir: config.path,
      originDir: `/tuia/${pkg.name}/dist/`
    });
    await uploader.start();
  })();
});

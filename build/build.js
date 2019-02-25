const chalk = require('chalk');
const webpack = require('webpack');
// const config = require('./config');
const webpackConfig = require('./webpack.prod.conf');

// const pkg = require('../package.json');1

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

  // (async() => {
  //  上传cdn
  //   const uploader = new AutoUpload({
  //     dir: config.path,
  //     originDir: `/earth/${pkg.name}/dist/`
  //   });
  //   await uploader.start();
  // })();
});

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const utils = require('./utils');
const config = require('./config');
const entryConfig = require('./entry');

const NODE_ENV = process.env.NODE_ENV;
const isLocal = NODE_ENV === 'local' || NODE_ENV === undefined;

module.exports = {
  entry: utils.computeEntry(entryConfig),
  output: {
    path: config.path,
    filename: isLocal ? '[name].js' : '[name].[chunkhash].js',
    publicPath: config[isLocal ? 'dev' : 'build'].publicPath,
    chunkFilename: isLocal ? '[name].js' : '[chunkhash].js'
  },
  resolve: {
    alias: {
      src: path.join(__dirname, '../src/')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          configFile: './.eslintrc.js',
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 5 * 1024
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    ...utils.computeTemplate(entryConfig).map(el => {
      return new HtmlWebpackPlugin(
        Object.assign({}, el, {
          alwaysWriteToDisk: true
        })
      );
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackHarddiskPlugin()
  ]
};

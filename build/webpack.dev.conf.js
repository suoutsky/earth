const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('./config');
const webpackBaseConfig = require('./webpack.base.conf');

Object.keys(webpackBaseConfig.entry).forEach(function(name) {
  webpackBaseConfig.entry[name] = webpackBaseConfig.entry[name].concat(
    'webpack-hot-middleware/client?reload=true'
  );
});

const { sourceMap, cssSourceMap } = config.dev;

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: sourceMap ? '#eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules|src[\\/]styles[\\/]index\.less/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: cssSourceMap
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: cssSourceMap,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: cssSourceMap
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: cssSourceMap,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /(\.less|\.css)$/,
        include: /node_modules|src[\\/]styles[\\/]index\.less/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: cssSourceMap
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: cssSourceMap
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: cssSourceMap,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});

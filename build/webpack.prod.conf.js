const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const chalk = require('chalk');

const config = require('./config');
const webpackBaseConfig = require('./webpack.base.conf');

const { sourceMap, cssSourceMap } = config.build;

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: sourceMap ? '#source-map' : false,
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules|src[\\/]styles[\\/]index\.less/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            sourceMap: cssSourceMap
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
            javascriptEnabled: true,
            sourceMap: cssSourceMap
          }
        }]
      },
      {
        test: /(\.less|\.css)$/,
        include: /node_modules|src[\\/]styles[\\/]index\.less/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            cssSourceMap
          }
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            cssSourceMap
          }
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
        cache: true,
        parallel: true,
        sourceMap
      })
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin({
      format: chalk.yellow('打包中 [:bar] :current/:total :percent :elapseds :msg'),
      complete: '●',
      incomplete: '○',
      width: 20
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[contenthash].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /zh-cn/
    ),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../dist/html/'),
      to: path.join(__dirname, '../../dist/html/')
    }])
  ]
});

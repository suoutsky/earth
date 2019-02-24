/*
 * @Author: 周成
 * @Date: 2018-01-16 15:51:14
 * @Last Modified by: suxiaoqing
 * @Last Modified time: 2018-12-13 15:33:46
 */

const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const isLocal = NODE_ENV === 'local' || NODE_ENV === undefined;

exports.computeEntry = function(entry = []) {
  let result = {};

  for (let i = 0; i < entry.length; i++) {
    const item = entry[i];
    const name = item.name;
    result[name] = [path.join(__dirname, item.path)];
  }

  return result;
};

exports.computeTemplate = function(entry = []) {
  let result = [];

  for (let i = 0; i < entry.length; i++) {
    const item = entry[i];
    let params = {
      name: item.name,
      filename: path.join(__dirname, '../dist/html/', `${item.name}.html`),
      template: `html-loader?attrs[]=img:src&attrs[]=img:data-src!${path.join(__dirname, item.template)}`,
      chunks: [`vendors-${item.name}`, 'common', item.name],
      favicon: path.join(__dirname, '../static/bfavicon.ico')
    };

    if (!isLocal) {
      params.minify = {
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      };
    }
    result.push(params);
  }
  return result;
};

exports.getIPAdress = function() {
  let interfaces = require('os').networkInterfaces();

  // 有WLAN先returnWLAN中的IP
  if ('WLAN' in interfaces) {
    let iface = interfaces['WLAN'];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
    delete interfaces['WLAN'];
  }

  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};

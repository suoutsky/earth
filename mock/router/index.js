const path = require('path');
const fs = require('fs');
// const url = require('url');
const router = require('express').Router();
const httpProxyMiddleware = require('http-proxy-middleware');

const config = require('../../config');
// const upload = require('../server/upload');

const Router = function(app) {
  router.get('/', function(req, res) {
    // 根路由
    res.render('ntuia.html');
  });
  router.get(/html/, function(req, res) {
    // html路由
    res.render(req.path.replace('/', ''));
  });
  router.get('/auth/getAuthList', (req, res) => {
    // mock路由，优先查找JS，其次是JSON，找不到返回默认值
    const JSFilePath = path.join(__dirname, '../server/', `${req.path}.js`);
    const JSONFilePath = path.join(__dirname, '../server/', `${req.path}.json`);
    if (fs.existsSync(JSFilePath)) {
      const file = fs.readFileSync(JSFilePath);
      res.json(JSON.parse(file));
    } else if (fs.existsSync(JSONFilePath)) {
      const file = fs.readFileSync(JSONFilePath);
      res.json(JSON.parse(file));
    } else {
      res.json({
        code: '0',
        desc: '成功',
        data: '0',
        success: true
      });
    }
  });
  router.get('/sso/admin/adminInfo', (req, res) => {
    // mock路由，优先查找JS，其次是JSON，找不到返回默认值
    const JSFilePath = path.join(__dirname, '../server/', `${req.path}.js`);
    const JSONFilePath = path.join(__dirname, '../server/', `${req.path}.json`);
    if (fs.existsSync(JSFilePath)) {
      const file = fs.readFileSync(JSFilePath);
      res.json(JSON.parse(file));
    } else if (fs.existsSync(JSONFilePath)) {
      const file = fs.readFileSync(JSONFilePath);
      res.json(JSON.parse(file));
    } else {
      res.json({
        code: '0',
        desc: '成功',
        data: '0',
        success: true
      });
    }
  });
  /**
   * npm命令中带有process.env.proxy参数,则开启代理到指定服务器
   */
  if (process.env.proxy) {
    const filter = function(pathname, req) {
      return !(pathname.match('html') || pathname === '/' || pathname.match('sso') || pathname.match('getAuthList'));
    };
    app.use(httpProxyMiddleware(filter, {
      target: 'http://' + process.env.proxy + ':' +config.proxy.port,
      changeOrigin: false
    }));
  } else {
    router.all('*', (req, res) => {
      // mock路由，优先查找JS，其次是JSON，找不到返回默认值
      const JSFilePath = path.join(__dirname, '../server/', `${req.path}.js`);
      const JSONFilePath = path.join(__dirname, '../server/', `${req.path}.json`);
      if (fs.existsSync(JSFilePath)) {
        const file = fs.readFileSync(JSFilePath);
        res.json(JSON.parse(file));
      } else if (fs.existsSync(JSONFilePath)) {
        const file = fs.readFileSync(JSONFilePath);
        res.json(JSON.parse(file));
      } else {
        res.json({
          code: '0',
          desc: '成功',
          data: '0',
          success: true
        });
      }
    });
  }
  app.use(router);
};

module.exports = Router;

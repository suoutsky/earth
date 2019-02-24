const Koa = require('koa');
const e2k = require('express-to-koa');
const c2k = require('koa-connect');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const router = require('./router');

const devConfig = require('./build/webpack.dev.conf');

const app = new Koa();

const port = 3011;

const compiler = webpack(devConfig);

// webpackDevMiddleware默认不支持koa，需要用express-to-koa和koa-connect解决
app.use(c2k((req, res, next) => {
  res.statusCode = 200;
  next();
}));

app.use(e2k(webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: 'errors-only',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})));
app.use(e2k(webpackHotMiddleware(compiler)));

app.use(router.routes());

const mock = require('./router/mock');
const proxy = require('./router/proxy');

// npm命令中带有process.env.proxy参数,则开启代理到指定服务器
if (process.env.proxy) {
  app.use(proxy());
} else {
  app.use(mock.routes());
}

app.listen(port);

console.log(`Open <http://localhost:${port}> width chrome`);

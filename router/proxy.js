const proxy = require('koa-server-http-proxy');

const filter = function(pathname, req) {
  return !(pathname.match('html') || pathname === '/');
};
module.exports = function() {
  const ipReg = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/;
  let target = process.env.proxy;
  const ip = target.split(':')[0];
  target = ipReg.test(ip) || ip === 'localhost' ? `http://${target}` : target;
  return proxy(filter, {
    target,
    changeOrigin: true,
    headers: {
      referer: target
    }
  });
};

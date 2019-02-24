const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const router = new Router();

/**
 * 模拟SSO跳转
 */
router.get('/sso/ssoIndex', ctx => {
  ctx.cookies.set('sso_ticket', '6fb1f563995a2b60720567f4940b8844');
  ctx.redirect(ctx.query.redirect);
});

// 本地上传接口模拟
router.post('/upload/index', require('../mock/upload'));

router.all('*', ctx => {
  // mock路由，优先查找JS，其次是JSON，找不到返回默认值
  const JSFilePath = path.join(__dirname, '../mock/', `${ctx.request.path}.js`);
  const JSONFilePath = path.join(__dirname, '../mock/', `${ctx.request.path}.json`);

  if (fs.existsSync(JSFilePath)) {
    require(JSFilePath)(ctx);
  } else if (fs.existsSync(JSONFilePath)) {
    const file = fs.readFileSync(JSONFilePath);
    ctx.body = JSON.parse(file);
  } else {
    ctx.body = ({
      code: '0',
      desc: '成功',
      data: '0'
    });
  }
});

module.exports = router;

const path = require('path');
const Router = require('koa-router');
const send = require('koa-send');

const router = new Router();

const root = path.join(__dirname, '../dist/html/');

router.get('/', async ctx => {
  ctx.redirect('/earth.html');
});
router.get(/index(\.html)?$/, (ctx, next) => {
  ctx.redirect('/');
});
router.get(/html$/, async ctx => {
  await send(ctx, ctx.path.replace('/', ''), { root });
});

module.exports = router;

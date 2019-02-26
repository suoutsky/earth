var utils = require('src/lib/utils').default;

module.exports = {
  path: 'datapanel',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('src/containers/earth/chart-center/index.js').default);
    });
  },
  childRoutes: [{
    path: 'histogram',
    breadcrumbName: '直方图',
    getComponent(location, cb) {
      require.ensure([], require => {
        cb(null, require('src/containers/earth/chart-center/line').default);
      });
    },
    onEnter: (nextState, replaceState) => {
      // 发访问日志
      utils.sendRouter(nextState, replaceState);
    }
  }]
};

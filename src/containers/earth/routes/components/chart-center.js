var utils = require('src/lib/utils').default;

module.exports = {
  path: 'tuiachartcenter',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('src/containers/earth/chart-center/index').default);
    });
  },
  childRoutes: [{
    path: 'tuiachartlist',
    breadcrumbName: '直方图',
    getComponent(location, cb) {
      require.ensure([], require => {
        cb(null, require('src/containers/earth/chart-center/index').default);
      });
    },
    onEnter: (nextState, replaceState) => {
      // 发访问日志
      utils.sendRouter(nextState, replaceState);
    }
  }]
};

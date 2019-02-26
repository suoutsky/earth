import App from '../App';

const checkLoginState = (replaceState) => {
  console.log('route to login page here');
};

const rootRoute = {
  path: '/',
  component: App,
  breadcrumbName: '首页',
  onEnter: (nextState, replaceState) => {
    // 检查登录状态
    checkLoginState(replaceState);
  },
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('src/containers/earth/chart-center/line/index').default);
      });
    }
  },
  childRoutes: [
    require('./components/chart-center'),
    // require('./components/monitor'),
    // 路由放在这个的前面
    // 这里相当于redirect, 放404
    {
      path: '*',
      onEnter: (nextState, replaceState) => {
        replaceState('/', null);
      }
    }
  ]
};

export default rootRoute;

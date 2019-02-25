import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, hashHistory } from 'react-router';

import routes from './routes';
// import stores from './stores';

class App extends React.Component {
  render() {
    return (
      // <Provider {...stores}>
      <Provider>
        <LocaleProvider locale={zhCN}>
          <Router history={hashHistory} routes={routes} />
        </LocaleProvider>
      </Provider>
    );
  }
}

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('#app-container')
  );
};

// Add a delay in dev mode to ensure styles are loaded before executing any JavaScript code
if (process.env.NODE_ENV !== 'production') {
  setTimeout(() => {
    render(App);
  }, 500);
} else {
  render(App);
}

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(App, () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    // render(require('./containers/App'))
  });
}

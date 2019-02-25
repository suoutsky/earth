import { hashHistory } from 'react-router';

import common from 'src/lib/common';

const utils = {
  // history跳转
  jumpTo(url) {
    hashHistory.push(url);
  },
  // // 登出函数
  // async logout() {
  //   const {system, ssoHomeURL} = await common.fetch('/sso/systemInfo');
  //   window.location.href = `${ssoHomeURL}/login?sysytemId=${system.id}&redirect=${encodeURIComponent(`${window.location.origin}/static/index.html`)}`;
  // },
  // 登出函数
  logout() {
    common.fetch('/sso/systemInfo').then(res => {
      if (res.success) {
        window.location.href = `${res.ssoHomeURL}/login?systemId=${
          res.system.id
        }&redirect=${encodeURIComponent(`${window.location.origin}`)}`;
      }
    });
  },
  // 判断是否有值
  isNothing(value) {
    return (
      value === '' ||
      value === undefined ||
      value === null ||
      (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
    );
  },
  serialize(obj) {
    const str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(
          encodeURIComponent(p) +
            '=' +
            encodeURIComponent(this.isNothing(obj[p]) ? '' : obj[p])
        );
      }
    }
    return str.join('&');
  },
  getCookie(name) {
    const regexp = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const matches = regexp.exec(document.cookie);
    return matches ? matches[2] : null;
  },
  getURLParameter(name) {
    const result =
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(
          window.location.href
        ) || [undefined, ''])[1].replace(/\+/g, '%20')
      ) || null;

    return result;
  },
  sendLog(data) {
    data.ext.isMobile = this.uaType();
    let params = {
      uri: data.uri.split('.com')[1],
      ext: JSON.stringify(data.ext),
      referer: data.referer,
      location: data.location,
      logType: data.logType
    };
    common.fetch('/front/log', params, 'post', { isJson: true });
  },
  // 发送路由埋点
  sendRouter(nextState, replaceState) {
    let isMobile = this.uaType();
    let params = {
      uri: window.location.href.split('.com')[1],
      ext: JSON.stringify({ isMobile }),
      referer: nextState.location.query.ref || '',
      location: 1,
      logType: 1
    };

    common.fetch('/front/log', params, 'post', { isJson: true });
  },
  meizz(str) {
    var tmp = '';
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 65281 && str.charCodeAt(i) <= 65374) {
        // 如果位于全角！到全角～区间内
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else if (str.charCodeAt(i) === 12288) {
        // 全角空格的值，它没有遵从与ASCII的相对偏移，必须单独处理
        tmp += ' ';
      } else {
        // 不处理全角空格，全角！到全角～区间外的字符
        tmp += str[i];
      }
    }
    return tmp;
  },
  uaType() {
    let ua = window && window.navigator && window.navigator.userAgent;
    if (ua && (ua.indexOf('iphone') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('iPad') > 0)) {
      return true;
    } else {
      return false;
    }
  }
};
export default utils;

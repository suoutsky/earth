// import React from 'react';
import React from 'react';
import 'whatwg-fetch';

import utils from 'src/lib/utils';
import errorCodes from 'src/lib/errorcode';
import PermissionTool from './permissionTools';

import { message, Modal } from 'antd';

import Loading from 'src/components/loading';

const Common = (function() {
  // message提示框延迟时间
  const MESSAGE_DURATION = 3;
  // 关闭加载提示框
  const close = res => {
    setTimeout(() => {
      Loading.close();
    }, 300);
    return res;
  };
  // 拼接请求参数
  const concatUrl = (params = {}) => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return query;
  };
  // 检查返回code
  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
  return {
    concatUrl,
    // 错误处理框，不阻断用户操作
    handleError(msg) {
      message.error(msg, MESSAGE_DURATION);
    },
    // 成功处理框，不阻断用户操作
    handleSuccess(msg) {
      message.success(msg, MESSAGE_DURATION);
    },
    // 成功处理框，不阻断用户操作
    handleWarning(msg) {
      message.warning(msg, MESSAGE_DURATION);
    },
    // 错误提示框，阻断用户操作，需要用户自己手动点击关闭
    handleErrorNeedClick(msg) {
      Modal.error({
        title: '系统提示',
        content: (
          <div>
            <p>{msg}</p>
          </div>
        )
      });
    },
    // 成功提示框，阻断用户操作，需要用户自己手动点击关闭
    handleSuccessNeedClick(msg) {
      Modal.success({
        title: '系统提示',
        content: (
          <div>
            <p>{msg}</p>
          </div>
        )
      });
    },
    handleWarn(msg) {
      message.warn(msg, MESSAGE_DURATION);
    },
    authRender: PermissionTool.authRender,
    ifRender: PermissionTool.ifRender,
    /**
     * fetch请求封装
     * @param {*} action 请求线上地址
     * @param {*} data 请求入参
     * @param {*} method 请求方式，默认get
     * @param {*} options 其他参数
     * options为对象格式,值：
     * isLoading(是否激活请求加载动画)
     * isJson(是否设置post请求头contentType为application/json)
     * content 自定义请求参数
     */
    fetch(action, params = {}, method = 'get', options) {
      let url = action;
      const token = utils.getCookie('token');
      // const XCsrfToken = utils.getCookie('csrf_token');
      let option = {
        method,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token,
          'X-Csrf-Token': utils.getCookie('csrf_token')
        },
        content: { deleteNullAndUndefinedParams: false }
      };
      if (options && options.content) {
        option = Object.assign({}, option, options.content);
      }
      // 删除null和undefined的字段
      if (option && option.deleteNullAndUndefinedParams) {
        Object.keys(params).forEach(key => {
          if (params[key] === null || params[key] === undefined) {
            delete params[key];
          }
        });
      }
      // if (options && options.isJson && method === 'post') {
      //   option.body = JSON.stringify(params);
      // }
      if (method === 'post' || method === 'put' || method === 'delete') {
        if (options && options.isJson) {
          option = Object.assign({}, option, {
            headers: {
              Accept: 'application/json,text/plain,*/*',
              'Content-Type': 'application/json;charset=UTF-8',
              'X-Csrf-Token': utils.getCookie('csrf_token')
            }
          });
          option.body = JSON.stringify(params);
        } else {
          option = Object.assign({}, option, {
            headers: {
              Accept: 'application/json,text/plain,*/*',
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              'X-Csrf-Token': utils.getCookie('csrf_token')
            }
          });
          option.body = utils.serialize(params);
        }
      }
      if (method === 'get') {
        url = Object.keys(params).length ? url + '?' + concatUrl(params) : url;
      }
      if (options && options.isLoading) {
        Loading.open();
      }
      return fetch(url, option) // eslint-disable-line no-undef
        .then(checkStatus)
        .then(close, close)
        .then(
          response => {
            return response.json().then(
              res => {
                // SSO登录验证
                if (res.success !== undefined) {
                  if (!res.success && !!res.notLogin) {
                    utils.logout();
                  }
                } else {
                  // 业务接口成功
                  if (res.code !== '0') {
                    if (errorCodes[res.code]) {
                      this.handleErrorNeedClick(errorCodes[res.code]);
                    } else {
                      this.handleErrorNeedClick(res.desc);
                    }
                    throw new Error(res.desc);
                  }
                }
                return res;
              },
              ex => {
                throw new Error(`解析JSON字符串出错:${url} ${ex.message}`);
              }
            );
          },
          ex => {
            throw new Error(`请求服务器出错:${url} ${ex.message}`);
          }
        );
    }
  };
})();

export default Common;

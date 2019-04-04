import React from 'react';

import common from 'src/lib/common';
import PermissionTool from 'src/lib/permissionTools';
import {
  Layout
} from 'antd';

import Menu from 'src/components/menu';

import 'src/styles/index.less';
import water from 'src/lib/water';

const { Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsReady: false, // 用于判断数据是否获取完成标识
      currentAccount: {
        name: '',
        email: ''
      } // 当前用户信息
    };
  }
  componentDidMount() {
    this.fetcUserInfo();
  }
  // 获取用户信息数据
  fetcUserInfo = () => {
    const actions = ['/auth/getAuthList', '/sso/admin/adminInfo'];
    Promise.all(actions.map(action => {
      return common.fetch(action, {}, 'get');
    }))
      .then(datas => {
        const [authInfoData = {}, userInfoData = {}] = datas;
        const { success: getAuthSuccess, authList } = authInfoData;
        const { success: getUserInfoSuccess, adminName: name } = userInfoData;
        // 权限数据获取
        if (getAuthSuccess) {
          PermissionTool.setPermissions(authList);
          this.setState({
            dataIsReady: true
          });
          water(name);
        } else {
          // 已经统一处理  公用fetch里
          //  const { success: getAuthSuccess, authList, desc } = authInfoData;
          // common.handleError(desc);
        }
        // 用户信息获取
        if (getUserInfoSuccess) {
          this.setState({
            currentAccount: {
              name
            }
          });
        }
      });
  }
  render() {
    const { dataIsReady } = this.state;
    const { router, children } = this.props;
    const { getCurrentLocation } = router;
    return dataIsReady ? (
      <Layout className="app-container">
        <Menu currentLocation={getCurrentLocation()} meunType="SPARK_MENU" root="spark.html#!"/>
        <Layout className="content">
          <Content className="content-container">
            {children}
          </Content>
        </Layout>
      </Layout>
    ) : null;
  }
}

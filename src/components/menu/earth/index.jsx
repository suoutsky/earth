import React from 'react';
import { Link } from 'react-router';

import PermissionTool from 'src/lib/permissionTools';

import {
  Layout,
  Menu as AntdMenu,
  Icon
} from 'antd';

import MENU from './menuData';
import Topbar from '../../topbar';
import Footer from '../../footer';
import styles from './index.less';

const { SubMenu } = AntdMenu;
const { Sider } = Layout;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: '',
      selectedKeys: []
    };
  }
  rootSubmenuKeys = ['datapanel', 'monitor', 'analyze', 'tuiachartcenter'];

  // 菜单伸缩
  _toggle = () => {
    this.setState((preState, props) => ({
      collapsed: !preState.collapsed
    }), () => {
      if (this.state.collapsed) {
        document.getElementById('___menu_container___') && document.getElementById('___menu_container___').classList.add('chart_list_wrapper_small');
      } else {
        document.getElementById('___menu_container___') && document.getElementById('___menu_container___').classList.remove('chart_list_wrapper_small');
      }
    });
  }
  // 生成一级菜单
  _createSubMenu = () => {
    const { collapsed } = this.state;
    return MENU.map((item) => {
      const { icon, title, key, auth } = item;
      const subMenuTitle = (
        <span>
          <i className="iconnav antdicon" dangerouslySetInnerHTML={{ __html: icon }}></i>
          <span>{title}</span>
        </span>
      );
      return PermissionTool.ifRender(auth) ? (
        collapsed
          ? <SubMenu
            key={key}
            title={subMenuTitle}
            onTitleClick={this._toggle}
          >
            { this._createItemMenu(item) }
          </SubMenu> : <SubMenu
            key={key}
            title={subMenuTitle}
          >
            { this._createItemMenu(item) }
          </SubMenu>
      ) : null;
    });
  }
  // 生成二级菜单
  _createItemMenu = (subMenuData) => {
    const { root } = this.props;
    const { children } = subMenuData;
    return children.map((subItem) => {
      const { auth, key, route, title, isRoot } = subItem;
      return PermissionTool.ifRender(auth) ? (
        <AntdMenu.Item key={key}>
          { isRoot ? <Link to={route}>{title}</Link>
            : <a href={root + route}>{title}</a> }
        </AntdMenu.Item>
      ) : null;
    });
  }
  // 手风琴效果
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  }
  componentDidMount() {
    this.getCurrentPaths();
  }
  getCurrentPaths = () => {
    const { currentLocation = {} } = this.props;
    const { pathname = '' } = currentLocation;
    let paths = pathname.split('/');
    paths.shift();
    this.setState({
      openKeys: [paths.shift()],
      selectedKeys: [paths.shift()]
    });
  }
  itemClick = (item) => {
    this.setState({
      selectedKeys: [item.key]
    });
  }
  render() {
    const { collapsed, openKeys, selectedKeys } = this.state;
    return (
      <Sider
        width={188}
        trigger={null}
        className={styles.slider}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.menu_top} onClick={this._toggle}>
          <Icon
            className="trigger"
            type={!collapsed ? 'dir-left' : 'dir-right'}
          />
        </div>
        <AntdMenu
          mode="inline"
          className={styles.menu}
          theme="dark"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.itemClick}
          header={<Topbar appShowId="tuia" collapsed={collapsed}></Topbar>}
          footer={<Footer collapsed={collapsed}></Footer>}
        >
          {this._createSubMenu()}
        </AntdMenu>
      </Sider>
    );
  }
}

export default Menu;
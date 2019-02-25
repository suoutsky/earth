import React from 'react';
import styles from './index.less';
import utils from 'src/lib/utils';
import common from 'src/lib/common';
class Footer extends React.Component {
  handleQuit = () => {
    const _quit = () => {
      common.fetch('/sso/outLogin')
        .then((res) => {
          if (res.success) {
            utils.logout();
          }
        });
    };
    _quit();
  }
  render() {
    const { collapsed } = this.props;
    return (
      <div className={styles.footer} >
        <i className="iconnav" onClick={() => { return this.handleQuit(); }} dangerouslySetInnerHTML={{ __html: '&#xe644;' }}></i>
        { collapsed ? <div className={styles.desc}>&nbsp;</div> : <div className={styles.desc}>退出</div> }
      </div>
    );
  };
};

export default Footer;

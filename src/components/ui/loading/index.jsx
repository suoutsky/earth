import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
export default class Loading extends React.Component {
  render() {
    const { show } = this.props;
    return (
      <React.Fragment>
        {show ? <div className={styles.loading_warp}>
          <Spin tip="Loading..."></Spin>
        </div> : null}
      </React.Fragment>
    );
  }
};

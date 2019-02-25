/* eslint-disable */
import React from 'react';
import styles from './index.less';
import getChartData from './get-chart-data.js';
import { Select } from 'antd';
import PubSub from 'pubsub-js';
import { observer } from 'mobx-react';
import store from './store.js';
const Option = Select.Option;
@observer
class ChartSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quota: this.props.defaultValue
    };
  }
  componentDidMount() {
    PubSub.subscribe('chartData', () => {
      this.getData(this.state.quota);
    });
  }
  getData = (value) => {
    const { chartData } = this.props;
    this.setState({
      quota: value
    }, () => {
      getChartData(chartData, value);
    });
  }
  render() {
    const { totalCountData } = store;
    const { quotaList, defaultValue } = this.props;
    const quotaOptions = quotaList && quotaList.map(item => <Option key={item.value}>{item.label}</Option>);
    return (
      <div className={styles.chart_area}>
        <div id="chartSelect" className={styles.chart_select}></div>
        <div className={styles.chart_filter_warp}>
          <div className={styles.chart_filter}>
            <Select defaultValue={defaultValue} style={{ width: 140 }} onChange={this.getData}>
              {quotaOptions}
            </Select>
            <div className={styles.total}>
              <div className={styles.item}>
                <div><span className={styles.a}></span>今日</div>
                <div className={styles.num}>{totalCountData.today}</div>
              </div>
              <div className={styles.item}>
                <div><span className={styles.b}></span>昨日</div>
                <div className={styles.num}>{totalCountData.yesterday}</div>
              </div>
              <div className={styles.item}>
                <div><span className={styles.c}></span>历史七日</div>
                <div className={styles.num}>{totalCountData.his7}</div>
              </div>
              <div className={styles.item}>
                <div><span className={styles.d}></span>额外日期</div>
                <div className={styles.num}>{totalCountData.extraDate}</div>
              </div>
              {totalCountData.big ? <div className={styles.item}>
                <div><span className={styles.e}></span>大盘</div>
                <div className={styles.num}>{totalCountData.big}</div>
              </div> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartSelect;

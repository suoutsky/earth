import React from 'react';
// import styles from './index.less';
import timeNodeArr from './timeData';
import { Select } from 'antd';
const Option = Select.Option;
export default class Checkselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNodeArr: this.props.timeNodeArr ? this.props.timeNodeArr : timeNodeArr
    };
  }
  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value }, () => {
      onChange && onChange(value);
    });
  }
  format = (value) => {
    if (value === '24:00' || value._i === '24:00') {
      return '24:00';
    } else {
      return value.format('HH:mm');
    }
  }
  render() {
    const { timeNodeArr } = this.state;
    const options = timeNodeArr.map(d => <Option key={d.id}>{d.label}</Option>);
    return (
      <Select
        value={this.format(this.props.value)}
        showArrow={true}
        onChange={this.handleChange}
        disabled={this.props.disabled}
      >
        {options}
      </Select>
    );
  }
}

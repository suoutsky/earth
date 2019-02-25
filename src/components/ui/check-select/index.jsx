import React from 'react';
import styles from './index.less';
export default class Checkselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectData: [].concat(this.props.defalutData)
    };
  }

  select(item) {
    const { onChange } = this.props;
    const { selectData } = this.state;
    let newData = [].concat(selectData);
    if (!selectData.includes(item)) {
      newData.push(item);
      this.setState({
        selectData: newData
      }, () => {
        onChange(this.state.selectData);
      });
    } else {
      this.setState({
        selectData: this.delArrayItem(newData, item)
      }, () => {
        onChange(this.state.selectData);
      });
    }
  }
  // 删除数组中的某一项
  delArrayItem(arr, item) {
    let newArr = [].concat(arr);
    let index = newArr.findIndex((_item) => {
      return _item === item;
    });
    newArr.splice(index, 1);
    return newArr;
  }
  render() {
    const { data } = this.props;
    const { selectData } = this.state;
    return (
      <React.Fragment>
        { data.map((item) => {
          return <div className={`${styles.box} ${selectData.includes(item.value) ? styles.active : null}`} key={item.value} onClick={() => this.select(item.value)}>{item.label}</div>;
        })
        }
      </React.Fragment>
    );
  }
}

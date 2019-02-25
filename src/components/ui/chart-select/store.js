import { observable, action } from 'mobx';

class ChartStore {
  @observable totalCountData = {
    today: '',
    yesterday: '',
    his7: '',
    extraDate: ''
  }
  @observable tooltip = {};

  @action
  setData = (data) => {
    this.totalCountData = data;
  }
  @action
  setTooltip = (data) => {
    this.tooltip = Object.assign({}, this.tooltip, data);
  }
};

export default new ChartStore();

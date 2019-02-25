import initCharts from './init-chart';
import { _fixNum, _fixData } from 'src/lib/cheatDataUtils.js';
import { formatfunc } from 'src/lib/formatter.js';
import store from './store';
const color = {
  today: '#1890FF',
  yesterday: '#2FC25B',
  avg: '#FACC14',
  extraDate: '#223273',
  big: '#d87a80'
};
const axisData = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];

function getChartData(data, quota) {
  let legendData = [];
  let series = [];
  // 今日
  let today = {
    name: '今日',
    key: 'today',
    type: 'line',
    symbol: 'circle',
    data: (data['today'] && data['today'][quota]) ? _fixData(Object.values(data['today'][quota])) : [],
    itemStyle: {
      normal: {
        color: color.today,
        borderWidth: 4
      }
    }
  };
  if (today.data.length > 0) {
    legendData.push('今日');
    series.push(today);
  }
  // 昨日
  let yesterday = {
    name: '昨日',
    key: 'yesterday',
    type: 'line',
    symbol: 'circle',
    data: (data['yesterday'] && data['yesterday'][quota]) ? Object.values(data['yesterday'][quota]) : [],
    itemStyle: {
      normal: {
        color: color.yesterday,
        borderWidth: 4
      }
    }
  };
  if (yesterday.data.length > 0) {
    legendData.push('昨日');
    series.push(yesterday);
  }
  // 七日平均
  let avg = {
    name: '历史七日',
    key: '7avg',
    type: 'line',
    symbol: 'circle',
    data: (data['7avg'] && data['7avg'][quota]) ? Object.values(data['7avg'][quota]) : [],
    itemStyle: {
      normal: {
        color: color.avg,
        borderWidth: 4
      }
    }
  };
  if (avg.data.length > 0) {
    legendData.push('历史七日');
    series.push(avg);
  }
  // 额外日期
  let extraDate = {
    name: '额外日期',
    key: 'extraDate',
    type: 'line',
    symbol: 'circle',
    data: (data['extraDate'] && data['extraDate'][quota]) ? Object.values(data['extraDate'][quota]) : [],
    itemStyle: {
      normal: {
        color: color.extraDate,
        borderWidth: 4
      }
    }
  };
  if (extraDate.data.length > 0) {
    legendData.push('额外日期');
    series.push(extraDate);
  }
  // 大盘
  let big = {
    name: '大盘',
    key: 'big',
    type: 'line',
    symbol: 'circle',
    data: (data['big'] && data['big'][quota]) ? _fixData(Object.values(data['big'][quota])) : [],
    itemStyle: {
      normal: {
        color: color.big,
        borderWidth: 4
      }
    }
  };
  if (big.data.length > 0) {
    legendData.push('大盘');
    series.push(big);
  }
  let option = {
    series: series,
    axisData: axisData,
    legendData: legendData
  };
  // 计算总计
  transformData(quota, series, option, data);
}
// 计算总计
function transformonce(key, date, totalData) {
  let calculate = Object.values(totalData[date][key]).length === 0 ? 0 : Object.values(totalData[date][key]).reduce((x, y) => Number(x) + Number(y));
  return calculate;
}
function cal(v1, v2) {
  if ((v1 / v2).toString() === 'NaN') {
    return 0;
  } else if ((v1 / v2).toString() === 'Infinity') {
    return '∞';
  } else {
    return _fixNum(v1 / v2, 2);
  }
};
function calPercent(v1, v2) {
  if ((v1 / v2).toString() === 'NaN') {
    return 0;
  } else if ((v1 / v2).toString() === 'Infinity') {
    return '∞';
  } else {
    const totalcount = (v1 / v2 * 100).toFixed(2) === '0.00' ? 0 : (v1 / v2 * 100).toFixed(2) + '%';
    return totalcount;
  }
};
function trans(arr, fix) {
  let transarr = arr.map((ele) => {
    let newarr = ele.data.map((item) => {
      if (typeof item === 'number') {
        item = item.toFixed(fix);
      }
      return item;
    });
    ele.data = newarr;
    return ele;
  });
  return transarr;
}
// 计算总计
function caltotal(arr, type, fixed, indicator, totalData) {
  const { setData } = store;
  let _totalCountData = {
    today: '',
    yesterday: '',
    his7: '',
    extraDate: ''
  };
  arr.forEach((ele) => {
    switch (ele.name) {
      case '大盘':
        _totalCountData.big = ele.data.length === 0 ? '暂无数据' : ele.data.reduce((x, y) => Number(x) + Number(y));
        break;
      case '今日':
        _totalCountData.today = ele.data.length === 0 ? '暂无数据' : ele.data.reduce((x, y) => Number(x) + Number(y));
        break;
      case '昨日':
        _totalCountData.yesterday = ele.data.length === 0 ? '暂无数据' : ele.data.reduce((x, y) => Number(x) + Number(y));
        break;
      case '历史七日':
        _totalCountData.his7 = ele.data.length === 0 ? '暂无数据' : ele.data.reduce((x, y) => Number(x) + Number(y));
        break;
      default:
        _totalCountData.extraDate = ele.data.length === 0 ? '暂无数据' : ele.data.reduce((x, y) => Number(x) + Number(y));
        break;
    }
  });
  if (type === 'integer') {
    for (let key in _totalCountData) {
      _totalCountData[key] = _fixNum(_totalCountData[key], 0).toString() === 'NaN' ? 0 : _fixNum(_totalCountData[key], 0);
    }
  };
  if (type === 'decimal') {
    for (let key in _totalCountData) {
      const decimalarr = ['cost', 'ctPpec', 'arpu']; // 需要小数点保留两位的处理：转化成本，CTR，计费点击均，消耗
      const decimalObj = {
        cost: ['consumeTotal', 'effectPv'],
        ctPpec: ['consumeTotal', 'payEfClicks'],
        arpu: ['consumeTotal', 'launchPv']
      };
      if (decimalarr.includes(indicator)) {
        const keynew = key === 'his7' ? '7avg' : key;
        let val1 = transformonce(decimalObj[indicator][0], keynew, totalData);
        let val2 = transformonce(decimalObj[indicator][1], keynew, totalData);
        _totalCountData[key] = cal(val1, val2);
      } else {
        _totalCountData[key] = _fixNum(_totalCountData[key], fixed).toString() === 'NaN' ? 0 : _fixNum(_totalCountData[key], fixed);
      }
    }
  };
  if (type === 'percent') {
    for (let key in _totalCountData) {
      const percentarr = ['vpPpec', 'cvr', 'ctr']; // 落地页到达率, CVR, CTR
      const percentObj = {
        vpPpec: ['visitPv', 'payEfClicks'],
        ctr: ['payEfClicks', 'exposurePv'],
        cvr: ['effectPv', 'payEfClicks']
      };
      percentarr.map(item => {
        if (indicator === item) {
          const keynew = key === 'his7' ? '7avg' : key;
          let val1 = transformonce(percentObj[item][0], keynew, totalData);
          let val2 = transformonce(percentObj[item][1], keynew, totalData);
          _totalCountData[key] = calPercent(val1, val2);
        }
      });
    }
  }
  setData(_totalCountData);
}
/**
 *
 *
 * @param {quota 维度} indicator
 * @param {chart series } arr
 * @param {chart option} option
 */
function transformData(indicator, arr, option, totalData) {
  let newarr;
  let tooltip;
  // 小数保留两位
  if (indicator === 'cost' || indicator === 'ctPpec' || indicator === 'arpu') {
    newarr = trans(arr, 2);
    caltotal(newarr, 'decimal', 2, indicator, totalData);
    tooltip = {
      trigger: 'axis',
      formatter: formatfunc.transDataTotal('decimal', 2, arr, indicator)
    };
  } else
  // 百分数保留两位
  if (indicator === 'vpPpec' || indicator === 'cvr' || indicator === 'ctr') {
    newarr = trans(arr, 4);
    caltotal(newarr, 'percent', 2, indicator, totalData);
    tooltip = {
      trigger: 'axis',
      formatter: formatfunc.transData('percent', 2)
    };
  } else {
    newarr = trans(arr, 0);
    caltotal(newarr, 'integer', 2, indicator, totalData);
    tooltip = {
      trigger: 'axis',
      formatter: formatfunc.transDataTotal('integer', 0, arr, indicator)
    };
  };
  const { setTooltip } = store;
  setTooltip(tooltip);
  // 画图
  option.series = newarr;
  initCharts(option);
};

export default getChartData;

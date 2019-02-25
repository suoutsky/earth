import { _fixNum, getPrecent } from './cheatDataUtils.js';
/* eslint-disable */
let axisData = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];
export const formatfunc = {
  /*
    type  --- 类型 / 整数 integer、小数 decimal、百分数 percent
    fixed --- 保留小数位
    params   --- tooltip内置参数
  */
  transY: function() {
    return function (value,idx) {
      console.log(value,idx)
    }
  },
  // 带累计的通用方法
  transDataTotal: function(type,fixed,data,dimension) {
    return function (params) {
      let tpl = '';
      let axisitem = params[0].axisValueLabel;
      let getIndex = axisData.findIndex((ele) => ele === axisitem);
      // 对每个总数求和
      let paramsTotal = [];
      let filterArr = [];
      let series = data;
      params.forEach((item) => {
        let index = series.findIndex((ele) => ele.name === item.seriesName);
        filterArr.push(series[index]);
      });
      filterArr.forEach((ele) => {
        ele.data.slice(0, getIndex + 1).length === 0 ? paramsTotal.push(0) : paramsTotal.push(
          ele.data.slice(0, getIndex + 1).reduce((x, y) => {
            return Number(x) + Number(y);
          })
        );
      });
      //小数
      if(type === 'decimal'){
       params.forEach((item,index) => {
         let data =  typeof item.data  === 'undefined' ? '暂无数据' : item.data === '∞' ? "∞" :  _fixNum(item.data, fixed);
           tpl += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
           item.color + '"></span>' + item.seriesName + ' : ' + data + '<br/>';
       }) ;
      }
      // 百分数
      if(type === 'percent'){
        params.forEach((item) => {
          let data =  typeof item.data  === 'undefined' ? '暂无数据' : item.data === '∞' ? "∞" : `${_fixNum(item.data*100, fixed)}%`;
            tpl += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
            item.color + '"></span>' + item.seriesName + ' : ' + data + '<br/>';
        }) ;
      }
      if(type === 'integer') {
        params.forEach((item,index) => {
          let data =  typeof item.data  === 'undefined' ? '暂无数据' : `${_fixNum(item.data,0)}`;
            tpl += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color: ${item.color}"></span>${item.seriesName} : ${data} (累计: ${_fixNum(paramsTotal[index], 0)})<br/>`;
        })
      }
      return params.length>0 ? params[0].axisValue+ '<br/>' + tpl : tpl ;
    }
  },
  // 不带累计的通用方法
  transData: function(type,fixed) {
    return function (params) {
      let tpl = '';
      // 小数
      if(type === 'decimal'){
       params.forEach((item,index) => {
         let data =  typeof item.data  === 'undefined' ? '暂无数据' : item.data === '∞' ? "∞" :  _fixNum(item.data, fixed);
           tpl += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
           item.color + '"></span>' + item.seriesName + ' : ' + data + '<br/>';
       }) ;
      }
      // 百分数
      if(type === 'percent'){
        params.forEach((item) => {
          let data =  typeof item.data  === 'undefined' ? '暂无数据' : item.data === '∞' ? "∞" : `${_fixNum(item.data*100, fixed)}%`;
            tpl += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
            item.color + '"></span>' + item.seriesName + ' : ' + data + '<br/>';
        }) ;
      }
      if(type === 'integer') {
        params.forEach((item,index) => {
          let data =  typeof item.data  === 'undefined' ? '暂无数据' : `${_fixNum(item.data,0)}`;
            tpl += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color: ${item.color}"></span>${item.seriesName} : ${data}<br/>`;
        })
      }

      return params.length>0 ? params[0].axisValue+ '<br/>' + tpl : tpl ;
    }
  },
  /*
    fixedNum --- 保留小数位
    params   --- tooltip内置参数
  */
  calpercent: function(fixedNum) {
    return  function (params) {
      /* 后端传值类型
         当前无数据        ----    null
         其它             ----    Number
      */
      let total = 0 ;
      let tpl = '' ;
      params.forEach((ele) => {
        total += Number(ele.data = ele.data ? ele.data : 0 ) ;
      });
      params.forEach((item) => {
        let percent =  typeof item.data  === 'undefined' ? '暂无数据' : getPrecent(item.data / total);
          tpl += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
          item.color + '"></span>' + item.seriesName + ' : ' + _fixNum(item.data, fixedNum) + ' (' + percent + ')' + '<br/>';
      }) ;
      return tpl ;
    }
  },
  // 计算截止日期累计
  caltotal: function(fixedNum,val,formatarr) {
    return function (params) {
      /* 后端传值类型
            当前无数据      ----    null
            当前有数据      ----    Number
        */
        // 获取下标
      let dataIndex = params[0].dataIndex;
      // 对每个总数求和
      let paramsTotal = [];
      let tpl = '';
      // selected === true的数据;
      let filterArr = [];
      params.forEach((item) => {
        let index = val.findIndex((ele) => ele.name === item.seriesName);
        filterArr.push(val[index]);
      });
      filterArr.forEach((ele) => {
        ele.data.slice(0, dataIndex + 1).length === 0 ? paramsTotal.push(0) : paramsTotal.push(
          ele.data.slice(0, dataIndex + 1).reduce((x, y) => {
            if (!x) x = 0;
            if (!y) y = 0;
            return x + y;
          })
        );
      });
      params.forEach(function(item, index) {
        //当前累计暂时隐藏
        // tpl += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
        //     item.color
        //   }"></span>
        //   ${item.seriesName} :  ${ typeof item.value !== 'undefined' ?  _fixNum(item.value, fixedNum) : '暂无数据' } (当前累计: ${ _fixNum(paramsTotal[index], fixedNum) })<br/>`;
        let valnum = null;
        if(!!formatarr&&formatarr.length){
          const valbool = [];
           formatarr.map(k => {
             valbool.push(item.seriesName.includes(k));
           })
           if(valbool.includes(true)){
             valnum = typeof item.value !== 'undefined' ? parseFloat((item.value * 100).toPrecision(12)) + '%' : '暂无数据';
           }else{
             valnum = typeof item.value !== 'undefined' ? item.value : '暂无数据'
           }
        } else {
          valnum = typeof item.value !== 'undefined' ? item.value : '暂无数据'
        }
        tpl += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
            item.color
          }"></span>
          ${item.seriesName} :  ${valnum}<br/>`;
      });
      console.log(tpl);
      return params[0].name + '<br/>' + tpl;
    }
  },
  clickDom: function() {

  },
  // 所有排序在chartdata初始化之后完成
  sortfunc: function(val1, val2){
    let totalval1 = val1.data.reduce((x, y) => Number(x) + Number(y));
    let totalval2 = val2.data.reduce((x, y) => Number(x) + Number(y));
    if (totalval1 > totalval2) {
      return -1;
    } else if (totalval1 < totalval2) {
      return 1;
    } else {
      return 0;
    }

  },
  // 换行显示
  calcuAxisData(params) {
    var newParamsName = '';
    var paramsNameNumber = params.length;
    var provideNumber = 7; // 一行显示几个字
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
    if (paramsNameNumber > provideNumber) {
      for (var p = 0; p < rowNumber; p++) {
        var tempStr = '';
        var start = p * provideNumber;
        var end = start + provideNumber;
        if (p === rowNumber - 1) {
          tempStr = params.substring(start, paramsNameNumber);
        } else {
          tempStr = params.substring(start, end) + '\n';
        }
        newParamsName += tempStr;
      }
    } else {
      newParamsName = params;
    }
    return newParamsName;
  },
  // 处理数据
  // getLineDate(list, type) {
  //   return showline;
  // },
  _fixData(num) {
    // 去掉今天末尾为0的填充数据
      for (let len = num.length; len--;) {
        if (num[len] === 0) {
          num.pop();
        } else {
          break;
        }
      }
    }
}

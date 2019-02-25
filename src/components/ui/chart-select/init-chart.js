import echarts from 'echarts';
import store from './store';
export default function initCharts(option) {
  const { tooltip } = store;
  let lineChart = echarts.init(document.getElementById('chartSelect'));
  lineChart && lineChart.clear();
  lineChart.setOption({
    tooltip: tooltip,
    legend: {
      itemHeight: 10,
      itemWidth: 10,
      itemGap: 5,
      bottom: 10,
      data: option.legendData.map((ele) => {
        return { name: ele, icon: 'circle' };
      })
    },
    grid: {
      left: '4%',
      right: '4%',
      top: '4%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          color: 'rgba(0,0,0,0.65)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(223,223,223)',
          width: 2
        }
      },
      data: option.axisData
    },
    yAxis: {
      name: '',
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        textStyle: {
          color: 'rgba(0,0,0,0.65)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: '#8CA0B3',
          opacity: 0.3
        }
      }
    },
    series: option.series
  });
  window.addEventListener('resize', function() {
    lineChart.resize();
  });
}

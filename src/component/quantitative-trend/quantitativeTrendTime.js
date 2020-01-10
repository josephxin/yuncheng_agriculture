import React from 'react';
import echarts from 'echarts';
class QuantitativeTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div ref={'bar'} style={{
        width: this.props.width,
        height: this.props.height
      }}></div>
    )
  }
  componentDidMount() {
    const me = this;
    me.barChart = echarts.init(me.refs.bar)
    me._option = {
      title: {
        text: '单位：家',
        right: 20,
        top: 30,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '25%',
        containLabel: true
      },
      legend: {
        data: ['A级', 'B级', 'C级', 'D级'],
        itemWidth: 10,
        itemHeight: 6,
        itemGap: 30,
        top: 35,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },

      xAxis: [
        {
          type: 'category',
          data: ['产前', '生产', '加工', '仓储', '运输', '销售'],
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#0a89ff'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#064e98',
              type: 'dashed'
            }
          }
        }
      ],
      "dataZoom": [{
          "show": true,
          "height": 30,
          "xAxisIndex": [
              0
          ],
          bottom: 0,
          "start": 10,
          "end": 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle:{
              color:"#d3dee5",
              
          },
         textStyle:{
          color:"#fff"},
         borderColor:"#90979c"       
       }, {
          "type": "inside",
          "show": true,
          "height": 15,
          "start": 1,
          "end": 35
      }],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: { color: 'rgba(36,169,224,0.2)' }
          },
          barGap: '-90%',
          barWidth: 22,
          data: [900, 900, 900, 900, 900, 900],
          animation: false
        },

        {
          name: 'A级',
          type: 'bar',
          stack: '广告',
          data: [120, 132, 101, 134, 90, 230],
          barWidth: 19,
          color: '#0aa4d4',
          itemStyle: {
            borderColor: '#0aa4d4',
            borderWidth: 3
          }
        },
        {
          name: 'B级',
          type: 'bar',
          stack: '广告',
          data: [220, 182, 191, 234, 290, 130],
          color: '#5ff4db',
          itemStyle: {
            borderColor: '#5ff4db',
            borderWidth: 3
          }
        },
        {
          name: 'C级',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 230],
          color: '#fffd04',
          itemStyle: {
            borderColor: '#fffd04',
            borderWidth: 3
          }
        },
        {
          name: 'D级',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 150],
          color: '#f02f5e',
          itemStyle: {
            borderColor: '#f02f5e',
            borderWidth: 3
          }
        },
      ]
    }
    me.barChart.setOption(me._option)
  }
  componentWillUnmount() {
    if (this.barChart) {
      this.barChart.dispose()
    }
  }
}
export default QuantitativeTrend;
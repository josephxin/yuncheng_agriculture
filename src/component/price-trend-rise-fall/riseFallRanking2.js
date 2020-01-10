import React, {Component} from 'react';
import echart from 'echarts';
//import symbol from './symbol.png';
class riseFallRanking extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.echartStyle = {
      width: `${me.props.width}px`,
      height: `${me.props.height}px`,
	  left:`${me.props.left}px`,
      position:'absolute',
      top:`${me.props.top || 35}px`
    };

  }

  render() {
    let me = this;
    return (
      <div ref={'echarts'} style={me.echartStyle}> </div>
    )
  }
	
  componentDidMount() {
    let me = this;
    let box = me.refs.echarts;
    let echarts = echart.init(box);
	let color = '#0b7955';
    let data = [5.53, 5.48, 5.07, 4.15, 3.18, 2.21, 1.58, 1.45, 0.91, 0.71];
    let option = {
        grid: {
          left: '10%',
          right: '10%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: {
          show: true,
          type: 'category',
          inverse: true,
          data: ['安徽', '湖北', '江苏', '宁夏', '上海', '辽宁', '河北', '山西', '河南', '北京'],
          nameTextStyle: {
            color: '#8199c3'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#18418a"
            }
          }
        },
        series: [{
            type: 'bar',
            barGap: '-100%',
            barCategoryGap: '70%',
            label: {
              normal: {
                show: true,
                position: 'right',
                color: color,
                fontSize: 12,
                // fontWeight:'bold',
                formatter: function(params) {
                  return data[params.dataIndex] + '%';
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(170,170,170,.1)'
              },
              emphasis: {
                color: 'rgba(170,170,170,.1)'
              }
            },
            silent: true,
            data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
          },
          {
            type: 'bar',
            barCategoryGap: '70%',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: color
              },
              emphasis: {
                color: color
              }
            },
            silent: true,
            data: data
          }
        ]
      }
    echarts.setOption(option);
  }

  componentDidUpdate() {

  }
}

export default riseFallRanking;

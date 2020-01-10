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
	let color = '#a64258';
      let data = [13.94, 13.91, 11.41, 5.98, 5.96, 5.79, 3.78, 3.42, 2.78, 1.5];
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
          data: ['广西', '贵州', '湖南', '四川', '天津', '内蒙古', '浙江', '广东', '山东', '甘肃'],
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
            data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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

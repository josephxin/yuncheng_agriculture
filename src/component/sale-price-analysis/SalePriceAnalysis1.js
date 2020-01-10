import React, {Component} from 'react';
import echart from 'echarts';
import symbol from './symbol.png';
class Relation extends Component {
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
    let option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        itemGap: 15,
        textStyle: {
          color: '#fff'
        },
        left: 'center',
        top: 20,
        data: [{
          name:'平均批发价格',
          icon:'rect'
        },{
          name:'平均销售价格',
          icon:'rect'
        },
        {
          name:'环比变化率',
          icon:'line'
        }],
        itemWidth: 10,
        itemHeight: 10
      },
      xAxis: {
        data: ['2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08'],
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#9dc6ff',
            fontSize:12
          },
          interval: 0
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0d7bff',
            width:1
          }
        }
      },

      yAxis: [
        {
          type: 'value',
          name: '元',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ',
            color:'#9dc6ff',

          },
          // splitNumber: 5,
          axisTick: {
            show: false
          },

          splitLine:{
            show:true,
            lineStyle:{
              color:'#053e7b',
              width:1,
              type:'dashed'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          }
        },
        {
          type: 'value',
          name: '%',
          min: 0,
          max: 25,
          axisLabel: {
            formatter: '{value}',
            color:'#9dc6ff',
          },
          axisTick: {
            show: false
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#053e7b',
              width:1,
              type:'dashed'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 0
            },
          }
        }
      ],
      series: [  //for shadow
        {
          name:'平均批发价格',
          type:'bar',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              }
            }
          },
          barWidth:10,
          barGap:'100%',
          data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
        },
        {
          name:'平均销售价格',
          type:'bar',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(13,123,255,1)'
                }, {
                  offset: 1, color: 'rgba(13,123,255,0.3)'
                }]
              }
            }
          },
          barWidth:10,
          data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
        },
        {
          name:'环比变化率',
          type:'line',
          symbol:'image://'+symbol,
          smooth:true,
          lineStyle:{
            color:'#f0ff03',
            width:3
          },
          itemStyle: {
            normal: {
              color: '#f0ff03'
            }
          },
          yAxisIndex: 1,
          data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
        }
      ]
    };

    echarts.setOption(option);

  }

  componentDidUpdate() {

  }
}

export default Relation;

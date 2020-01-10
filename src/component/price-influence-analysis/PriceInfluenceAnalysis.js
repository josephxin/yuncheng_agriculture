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
        formatter: function (params) {
          let res1 = '<div style="min-width: 10px;">';
          if(params.length>0){
            let enter = '';
            let unit = '';
            for(let i = 0;i < params.length;i++){
              if(i===0){
                enter = '<br/>';
                unit = '万吨';
              }else if (i===1){
                enter = '<br/>';
                unit = '万吨';
              }else {
                unit = '元/公斤';
              }
              res1 += '<span>'+params[i].seriesName+':'+ params[i].value +'</span>'+unit+enter;
            }
          }
          res1 += '</div>';
          return res1;
        }
      },
      legend: {
        itemGap: 15,
        textStyle: {
          color: '#fff'
        },
   
        top: 20,
        data: [{
          name:'采购量',
          icon:'rect'
        },{
          name:'库存量',
          icon:'rect'
        },
        {
          name:'价格',
          icon:'line'
        }],
        itemWidth: 10,
        itemHeight: 10
      },
      xAxis: {
        data: ['2010','2011','2012','2013','2014','2015','2016','2017','2018'],
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
          name: '万吨',
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
          name: '元/公斤',
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
          name:'采购量',
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
          data:[4.9, 7.0, 23.2, 25.6, 76.7, 135.6,150,180,200]
        },
        {
          name:'库存量',
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
          data:[5.9, 9.0, 26.4, 28.7, 70.7, 175.6,155,190,220]
        },
        {
          name:'价格',
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
          data:[2.2, 3.3, 4.5, 6.3, 10.2,13,16,18, 20.3]
        }
      ]
    };

    echarts.setOption(option);

  }

  componentDidUpdate() {

  }
}

export default Relation;

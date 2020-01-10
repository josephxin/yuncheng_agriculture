import React, {Component} from 'react';
import echart from 'echarts';
import symbol from './symbol.png';
class Relation extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div ref={'echarts'} style={{width:this.props.width||'450px',height:this.props.height||'300px',top:this.props.top || '30px'}}> </div>
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
                unit = '元';
              }else if (i===1){
                enter = '<br/>';
                unit = '元';
              }else {
                unit = '%';
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
        left: me.props.legendLeft || 80,
        top: me.props.legendTop || 10,
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
            show: true
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
            show: true,
            lineStyle: {
              color: '#0d7bff',
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
            show: true
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
            show: true,
            lineStyle: {
              color: '#0d7bff',
              width: 1
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
          smooth:false,
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

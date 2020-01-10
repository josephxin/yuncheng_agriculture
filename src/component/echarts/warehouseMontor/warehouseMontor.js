import React, {Component} from 'react';
import echart from 'echarts';
import symbol from '../../sale-price-analysis/symbol.png';
class Warehouse extends Component {
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
                unit = '万吨';
              }else if (i===1){
                enter = '<br/>';
                unit = '万吨';
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
        left: me.props.legendLeft || 105,
        top: 10,
        data: [{
          name:'入库量',
          icon:'rect'
        },{
          name:'出库量',
          icon:'rect'
        }],
        itemWidth: 10,
        itemHeight: 10
      },
      xAxis: {
        data: ['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'],
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
          min: 1,
          max: 6,
          interval: 1,
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
          name:'入库量',
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
          data:[2.0, 3.2, 3.0, 4.2, 3.6, 2.7, 3.6,2.6,3.0,4.2]
        },
        {
          name:'出库量',
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
          data:[2.6, 3.9, 4.0, 4.8, 4.3, 3.6, 4.6,3.0,3.8, 4.4]
        }
      ]
    };

    echarts.setOption(option);

  }

  componentDidUpdate() {

  }
}

export default Warehouse;

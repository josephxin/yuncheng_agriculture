import React, {Component} from 'react';
import echarts from 'echarts';
import symbol from './symbol.png';
import './echarts.css';
class Relation extends Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {};
    this.domRef = React.createRef();
    this.options = {
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
        left: me.props.legendLeft || 105,
        top: me.props.legendTop || 10,
        data: [{
          name:this.props.legend[0]||'投入成本',
          icon:'rect'
        },{
          name:this.props.legend[1]||'净利润',
          icon:'rect'
        },
        {
          name:this.props.legend[2]||'利润率',
          icon:'line'
        }],
        itemWidth: 10,
        itemHeight: 10
      },
      xAxis: {
        data: this.props.xData||[],
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
          name: '元/亩',
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
          name:this.props.legend[0]||'平均批发价格',
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
          data:[]
        },
        {
          name:this.props.legend[1]||'平均销售价格',
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
          data:[]
        },
        {
          name:this.props.legend[2]||'环比变化率',
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
          data:[]
        }
      ]
    };
  }
  setData(d) {
    this.setState({ ...d });
  }
  componentDidUpdate() {
    const me = this;
    const state = me.state;
    const options = me.options;
    options.series[0].data = state.data0;
    options.series[1].data = state.data1;
    options.series[2].data = state.data2;
    options.xAxis.data = state.date;
    options.yAxis[0].name = state.unit1;
    options.yAxis[1].name = state.unit2;
    me.chart.setOption(me.options);
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  componentDidMount() {
    const me = this;
    const dom = me.domRef.current;
    me.chart = echarts.init(dom);
    me.chart.setOption(me.options);

  }
  render() {
    return (
      <div ref={this.domRef} style={{width:this.props.width||'450px',height:this.props.height||'300px',top:this.props.top || '30px'}}> </div>
    )
  }
}

export default Relation;

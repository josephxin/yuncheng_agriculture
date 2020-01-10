import React, {Component} from 'react';
import echart from 'echarts';
import symbol from './symbol.png';
class Relation extends Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {};
    this.domRef = React.createRef();
    me.option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (param) {
          let html = '';
          let unit,name;
          html += '<div class="tooltip-box">';
          html += '<div>'+ param[0].name +'</div>'
          for(var i=0;i<param.length;i++){
            if(param[i].seriesType=='bar'){
              unit = '元/亩';
              if(param[i].seriesName=="投入成本"){
                name = '投入成本';
              }else{
                name = '产出';
              }
            }else{
              unit = '%';
              name="投入产出比"
            }
            html += name+'：'+param[i].value + unit+'</br>';
          }
          
          return html;
        }
      },
      legend: {
        itemGap: 15,
        textStyle: {
          color: '#fff'
        },
        left: 'center',
        top: 10,
        data: [{
          name:'投入成本',
          icon:'rect'
        },{
          name:'产出',
          icon:'rect'
        },
        {
          name:'投入产出比',
          icon:'line'
        }],
        itemWidth: 10,
        itemHeight: 10
      },
      xAxis: {
        data: [],
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
          name:'投入成本',
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
          name:'产出',
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
          name:'投入产出比',
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
  render() {
    return (
      <div ref={this.domRef} style={{width:this.props.width||'450px',height:this.props.height||'300px',top:this.props.top || '0px'}}> </div>
    )
  }

  componentDidMount() {
    const me = this;
    const dom = me.domRef.current;
    me.chart = echart.init(dom);
    me.chart.setOption(me.option);

  }

  componentDidUpdate() {
    const me = this;
    const state = me.state;
    const option = me.option;
    option.series[0].data = state.barData1;
    option.series[1].data = state.barData2;
    option.series[2].data = state.lineData;
    option.xAxis.data = state.date;
    me.chart.setOption(me.option);
  }
}

export default Relation;

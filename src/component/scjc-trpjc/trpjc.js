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
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        top: 20,
        data: ['农药','肥料','水'],
      },
      xAxis: {
        data: [],
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#9dc6ff',
            fontSize:12
          },
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
          name: 'ML',
          //min: 0,
          //max: 250,
          //interval: 50,
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
        }
      ],
      color:['rgba(0,255,246,1)','rgba(13,123,255,1)','red'],
      series: [  //for shadow
        {
          name:'肥料',
          type:'line',
          data:[]
        },
        {
          name:'农药',
          type:'line',
          data:[]
        },
        {
          name:'水',
          type:'line',
          data:[]
        },
      ]
    };
    me.echartStyle = {
      width: `${me.props.width}px`,
      height: `${me.props.height}px`,
      position:'absolute',
      top:`${me.props.top || 35}px`
    };

  }
  setData(d) {
    this.setState({ ...d });
  }
  render() {
    let me = this;
    return (
      <div ref={this.domRef} style={me.echartStyle}> </div>
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
    option.series = [];
    let index = 0;
    for(var key in state.seriesData){
      option.series[index] = {name:key,type:'line',data:state.seriesData[key]};
      index++;
    }
    //console.log(option.series);
    option.xAxis.data = state.date;
    option.legend.data = state.legend;
    me.chart.setOption(me.option,true);
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

export default Relation;

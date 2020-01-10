/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import Echarts from 'echarts'

class Radar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      init: [],
      raderText:''
    };
  }


  componentDidMount() {
    let me = this;
    me.myChart = Echarts.init(me.chart);
    me.myChart.option = {
      title: {
        text: '',
        left:'35%',
        top:'43%',
        textStyle:{
          color:'#fff220',
          align:'center'
        }
      },
      tooltip: {
        textStyle: {
          fontSize: 14
        }
      },
      legend: {
        data: []
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#4CE3FF',
            fontSize: 14,
            // // backgroundColor: 'red',
            // borderRadius: 3,
          }
        },
        indicator: [],
        splitArea: {
          areaStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10,
            color:'rgb(37,103,192)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(37,103,192)',
            type: 'dotted',
          }
        },
      },
      series: [{
        name: '',
        type: 'radar',
        symbolSize: 0,
        data: [
          {
            value: me.state.data,
            areaStyle: {normal: {color: '#3FBDD9'}},
            lineStyle: {normal: {color: '#3FBDD9'}},
            name: ''
          }
        ]
      }]
    };
  }

  componentDidUpdate() {
    let me = this;
    me.myChart.option.series[0].data[0].value = me.state.data;
    me.myChart.option.radar.indicator = me.state.init;
    me.myChart.option.title.text = me.state.data.reduce((t,c)=>{
      return t+c
    },0)+'人';
    me.myChart.setOption(me.myChart.option, true);
  }

  componentWillUnmount() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }

  render() {
    let me = this;
    return (
      <div ref={ref => me.chart = ref} style={{
        width: me.props.width,
        height: me.props.height,
        top: me.props.top,
        left: me.props.left,
        position: 'absolute'
      }}>
      </div>
    );
  }
}

export default Radar

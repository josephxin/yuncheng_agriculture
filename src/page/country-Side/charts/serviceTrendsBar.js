import React, {Component} from 'react';
import echarts from 'echarts';

// 乡村文化
class ServiceTrendsBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.region = [];
    this.sales = [];
    this.xData = [];
    this.interval = '';
    this.rotate = '';
    this.seriousData = [];
  }

  render() {
    return (
      <div ref={'barChart'}
           style={{width: this.props.width, height: this.props.height, position: 'relative', top: 30}}></div>
    )
  }

  setData(json) {
    this.xData = json.xData ? json.xData : [];
    this.seriousData = json.seriousData ? json.seriousData : [];
    this.interval = json.interval;
    this.rotate = json.rotate;
    this.setState(json);
    this.initChart(json);
  }

  initChart(json) {
    let me = this;
    let dom = this.refs.barChart;
    me.myChart = echarts.init(dom);
    let newArr = [];
    let xData = [];
    if (this.state.seriousData) {
      let allData = this.state.xData;
      let sumData = allData[0] + '-' + allData[allData.length - 1];
      xData = allData;
      let sum = null;
      let data = this.state.seriousData;
      data.forEach((item, index) => {
        sum += item
      });
      //newArr=[sum,...this.state.seriousData];
      newArr = this.state.seriousData;
    }
    let data = newArr;

    function fuzhuData(data) {
      let ret = [];
      let sumData = data[0];
      data.forEach(function (v, i, a) {
        ret[0] = 0;
        ret[1] = sumData - a[1];
        if (i > data.length - 3) {
          return
        }
        ret[i + 2] = ret[i + 1] - a[i + 2]
      });
      return ret
    }

    fuzhuData(data);
    me.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        padding: 0,
        formatter: function (params) {
          if (params[1]) {
            let tar = params[1];
            let html = '<div class="tooltip-box">';
            html += '<p>' + tar.name + '</p>';
            html += '<p>' + tar.seriesName + ' : ' + tar.value + '个' + '</p>';
            html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
            return html;
          }

        }
      },
      /*legend: {
       top:20,
       right: '4%',
       itemGap:'4%',
       itemHeight:10,
       itemWidth:20,
       textStyle:{
       color:'#bacce5',
       fontSize:12,
       padding: [0, 0, 0, 5]
       }
       },*/
      grid: {
        top: '22%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: '',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#aaa',
          }
        },
        axisLabel: {
          show: true,
          interval: this.interval,
          rotate: this.rotate,
          textStyle: {
            fontSize: 16,
            color: '#9FD7DF'
          }
        },
        data: xData
      },
      yAxis: [{
        type: 'value',
        name: '个',
        min: '0',
        nameTextStyle: {
          color: '#9FD7DF',
          fontSize: '16',
          padding: [0, 0, 0, -40]
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(0,230,252, .8)',
            width: 3
          }
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#395974',
            width: 1,
            type: "dotted"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 16,
            color: '#9FD7DF'
          }
        }
      }],
      color: [new echarts.graphic.LinearGradient(
        0, 0, 0, 1, [{
          offset: 0,
          color: '#11F1F5',
        }, {
          offset: 0.5,
          color: 'rgba(14,160,177,.6)'
        }, {
          offset: 1,
          color: 'rgba(6,84,113,0.2)'
        }]
      )],
      series: [
        {
          name: '',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: fuzhuData(data)
        },
        {
          name: '数量',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 17,
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0,230,252, 1)',
              borderWidth: 1,
              shadowColor: 'rgba(0,230,252, .9)',
              shadowBlur: 10
            },
            emphasis: {
              borderColor: 'rgba(0,230,252, 1)',
              borderWidth: 1,
              shadowColor: 'rgba(0,230,252, .9)',
              shadowBlur: 10
            }
          },
          data: data
        }
      ]
    };
    me.myChart.setOption(me.option);
  }

  componentDidMount() {
    this.initChart();
  };
}

export default ServiceTrendsBar;

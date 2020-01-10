import React from 'react';
import echarts from 'echarts';
class BarLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IData: {
        nameList: [],
        valueList: [], // /库存
      }
    };
  }

  setData(data) {
    this.setState({
      IData: {
        nameList: data.nameList,
        valueList: data.valueList
      }}, () => {
        this.initChart(this.state.IData);
      }
    )
  }


  render() {
    return ( <div ref={'chartsWrap'} style={{
        width: this.props.width || '100%',
        height: this.props.height || '250px',
        position: 'absolute',
        top: `${this.props.top || 35}px`
      }}></div>
    )
  }

  componentDidMount() {
    this.initChart(this.state.IData);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  initChart(params) {
    let dom = this.refs.chartsWrap;
    if (this.chart) {
      this.chart.dispose();
    }
    this.chart = echarts.init(dom);

    if (!params) {
      return {}
    }
    // let data = [573, 33, 63, 201, 276];
    let data=params.valueList[0];
    function fuzhuData(data) {
      if(data){
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
    }
    fuzhuData(data);
    let option = {
      tooltip: {
        trigger: 'axis',
        textStyle:{
          align:'left'
        },
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          //console.log(params);
          let tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value +'人';
        }
      },
      legend: {
        top: 30,
        right: '4%',
        itemGap: '4%',
        itemHeight: 8,
        itemWidth: 12,
        textStyle: {
          color: '#bacce5',
          fontSize: 12,
          padding: [0, 0, 0, 5]
        }
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: '',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#d4e7ff",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "#3b6aa1",
            fontSize: 12
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#294d6f']
          }
        },
        // data: ['全部', '<20岁', '20-40岁', '40-60岁', '>60岁']
        data: params.nameList
      },
      yAxis: [{
        type: 'value',
        name: '人',
        nameTextStyle: {
          color: '#d4e7ff'
        },
        axisLabel: {
          textStyle: {
            color: "#d4e7ff",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "#3b6aa1",
            fontSize: 12
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['transparent']
          }
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#06346c'],
          }
        }
      },
        {
          type: 'value',
          name: ' ',
          axisLabel: {
            textStyle: {
              color: "#bacce5",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#3b6aa1",
              fontSize: 12
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['transparent']
            }
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#06346c'],
            }
          }
        }
      ],
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
          name: '从事农业生产人数',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 11,
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#01dfef'
                }, {
                  offset: 1,
                  color: '#02307d'
                }]
              ),
              opacity: 1,
              barBorderColor: '#036dbf'
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#01dfef'
                }, {
                  offset: 1,
                  color: '#02307d'
                }]
              ),
              opacity: 1,
              barBorderColor: '#d0bc44'
            }
          },
          data: data
        }
      ]
    };
    this.chart.setOption(option);
  }
}

export default BarLine
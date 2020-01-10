import React from 'react';
import echarts from 'echarts';
class BarLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieValue: {},
    };
  }

  setData(data) {
    this.setState({
        pieValue: data
      }, () => {
        this.initChart(this.state.pieValue);
      }
    )
  }

  render() {
    return ( <div ref={'chartsWrap'} style={{
        width: this.props.width || '100%',
        height: this.props.height || '250px',
        position: 'absolute',
        top: `${this.props.top || 35}px`,
        left: `${this.props.left || 50}px`
      }}></div>
    )
  }

  componentDidMount() {
    this.initChart(this.state.pieValue);
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
    let data = {
      value: this.state.pieValue.name,
    };
    let option = {
      title: {
        text: params.value,
        top: '55%',
        left: params.left,
        textStyle: {
          color: '#fff',
          fontSize: 14,
          align: 'center',
          fontWeight: '400',
        }
      },
      series: [
        {
          name: '刻度1',
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '75%',
          min: 0,//最小刻度
          max: 100,//最大刻度
          splitNumber: 10, //刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, '#42B3D0']]
            }
          },//仪表盘轴线
          axisLabel: {
            show: true,
            color: '#42B3D0',
            distance: -12,
            formatter: function (v) {
              switch (v + '') {
                case '0' :
                  return '0';
                case '10' :
                  return '10';
                case '20' :
                  return '20';
                case '30' :
                  return '30';
                case '40' :
                  return '40';
                case '50' :
                  return '50';
                case '60' :
                  return '60';
                case '70' :
                  return '70';
                case '80' :
                  return '80';
                case '90' :
                  return '90';
                case '100' :
                  return '100';
              }
            }
          },//刻度标签。
          axisTick: {
            show: true,
            splitNumber: 4,
            lineStyle: {
              color: '#42B3D0',  //用颜色渐变函数不起作用
              width: 1,
            },
            length: -5
          },//刻度样式
          splitLine: {
            show: true,
            length: -8,
            lineStyle: {
              color: '#01B661',  //用颜色渐变函数不起作用
            }
          },//分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          name: "仪表盘2",
          type: "gauge",
          center: ['50%', '50%'],
          radius: '65%',
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: [
                [data.value / 100, "#42B3D0"],
                [1, "#111F42"]
              ],
              width: 8
            }
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,

          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            show: false,
          },
          detail: {
            formatter: function (value) {
              if (value !== 0) {
                return value + "%";
              } else {
                return 0;
              }
            },
            offsetCenter: ['2%', "-18%"],
            textStyle: {
              fontSize: 18,
              fontWeight: '700',
              color: '#fff'
            }
          },
          data: [{
            value: params.name
          }
          ],
          pointer: {
            show: false,
            length: '75%',
            width: 20, //指针粗细
          },
        }
      ]
    };


    //   let option = {
    //       series : [
    //         {
    //           name:'速度',
    //           type:'gauge',
    //           min:0,
    //           max:100,
    //           center: ['50%', '50%'], // 默认全局居中
    //           splitNumber:5,
    //           radius: '80%',
    //           axisLine: {            // 坐标轴线
    //             lineStyle: {       // 属性lineStyle控制线条样式
    //               color: [[0.1, '#ff4500'],[0.8, '#4EE3FF'],[1, 'lime']],
    //               width: 2,
    //               shadowColor : '#D6F5FF', //默认透明
    //               shadowBlur: 20
    //             }
    //           },
    //           axisLabel: {            // 坐标轴小标记
    //             textStyle: {       // 属性lineStyle控制线条样式
    //               fontWeight: 'bolder',
    //               color: '#5D91B5',
    //               fontSize: 10,
    //               shadowColor : '#D6F5FF', //默认透明
    //               shadowBlur: 20
    //             }
    //           },
    //           axisTick: {            // 坐标轴小标记
    //             length :8,        // 属性length控制线长
    //             lineStyle: {       // 属性lineStyle控制线条样式
    //               color: 'auto',
    //               width:2,
    //               shadowColor : '#D6F5FF', //默认透明
    //               shadowBlur: 20
    //             }
    //           },
    //           splitLine:{//橙色分割线
    //             length:14,
    //             lineStyle:{
    //               width:2,
    //               color:'#FCD209',
    //             }
    //           },
    //           itemStyle:{//指针颜色
    //             color:'#1e90ff',
    //           },
    //           pointer:{//指针长短
    //             length:35,
    //             width :3,
    //             show:true
    //           },
    //           detail: {
    //             formatter:'{value}%',
    //             color:'#C2E1FD',
    //             fontSize: 16,
    //             fontWeight: 'bolder',
    //             offsetCenter:['2%','65%'],//相对于仪表盘中心的偏移位置
    //           },
    //           data:[{value: params}]
    //         }
    //       ]
    // };
    this.chart.setOption(option);
  }
}

export default BarLine
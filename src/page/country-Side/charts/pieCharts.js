import React from 'react';
import echarts from 'echarts';
class BarLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieValue: ' ',
    };
  }

  setData(data) {
    // console.log(data);
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
    let option = {
        series : [
          {
            name:'速度',
            type:'gauge',
            min:0,
            max:100,
            center: ['50%', '50%'], // 默认全局居中
            //splitNumber:11,
            radius: '85%',
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                color: [[0.1, '#ff4500'],[0.8, '#4EE3FF'],[1, 'lime']],
                width: 2,
                shadowColor : '#D6F5FF', //默认透明
                shadowBlur: 20
              }
            },
            axisLabel: {            // 坐标轴小标记
              textStyle: {       // 属性lineStyle控制线条样式
                fontWeight: 'bolder',
                color: '#5D91B5',
                fontSize: 10,
                shadowColor : '#D6F5FF', //默认透明
                shadowBlur: 20
              }
            },
            axisTick: {            // 坐标轴小标记
              length :10,        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                width:2,
                shadowColor : '#D6F5FF', //默认透明
                shadowBlur: 20
              }
            },
            splitLine:{//橙色分割线
              length:18,
              lineStyle:{
                width:2,
                color:'#FCD209',
              }
            },
            itemStyle:{//指针颜色
              color:'#1e90ff',
            },
            pointer:{//指针长短
              length:50,
              width :4,
              show:true
            },
            detail: {
              formatter:'{value}%',
              color:'#C2E1FD',
              fontSize: 20,
              fontWeight: 'bolder',
              offsetCenter:['2%','25%'],//相对于仪表盘中心的偏移位置
            },
            data:[{value: params}]
          }
        ]
  };
    this.chart.setOption(option);
  }
}

export default BarLine
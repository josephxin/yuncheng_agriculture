import React from 'react';
import echarts from 'echarts';
import './echarts.css';

class doubleLine extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.domRef = React.createRef();
        this.option = {
            grid: {
                top: '20%',
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            legend:{
                data:['采收量','预测量'],
                textStyle:{
                    color:'#fff'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        fontSize: 14,
                        color: "#bbf9ff",
                    },
                    margin: 10
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                      color: "#0a89ff",
                      type: "solid"
                    }
                },
                splitLine: {
                    show: false,
                },
                data: ['01', '02', '03', '04', '05', '06', '07']
            },
            yAxis: {
                type: 'value',
                name: '公斤',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14,
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14,
                        color: "#bbf9ff",
                    },
                    formatter: '{value}',
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: "#0a89ff",
                        type: "dashed",
                    }
                },
            },
            series: [
                {
                    name:'采收量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    lineStyle:{
                        color:'rgba(0,255,246,1)',
                        width:3
                    },
                    itemStyle: {
                        normal: {
                          color: 'rgba(0,255,246,1)'
                        }
                    },
                },
                {
                    name:'预测量',
                    data: [720, 832, 851, 924, 1090, 1230, 1120],
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(13,123,255,1)',
                        width: 3
                    },
                    itemStyle: {
                        normal: {
                        color: 'rgba(13,123,255,1)'
                        }
                    },
                },
            ]
        };
    }
    setData(d){
        this.setState({...d});
    }
    componentDidMount() {
        const me = this;
        const dom = me.domRef.current;
        me.chart = echarts.init(dom);
        me.chart.setOption(me.option);
    }
    componentDidUpdate() {
        const me = this;
        const state = me.state;
        const option = me.option;
        option.series[0].data = state.lineData1;
        option.series[1].data = state.lineData2;
        option.xAxis.data = state.date;
        me.chart.setOption(me.option);
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
    }
    render() {
        return (
          <div style={{
            position: 'absolute',
            top: this.props.top || '40px',
            left: this.props.left||0,
            width: this.props.width||'440px',
            height: this.props.height || '190px'
          }}>
            <div style={{
              width: this.props.width||'440px',
              height: this.props.height || '160px'
            }} ref={this.domRef}></div>
          </div>
        );
    }
}
export default doubleLine
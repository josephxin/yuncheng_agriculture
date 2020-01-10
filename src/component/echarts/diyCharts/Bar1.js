import React from 'react';
import echarts from 'echarts';
import './css/charts-style.css';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<
            div ref={
            'chartsWrap'
        }
                style={
                    {
                        width: this.props.width || '100%',
                        height: this.props.height || '250px'
                    }
                }>
            <
            /div>
            )

            }
            componentDidMount() {
            this.initChart();
        }
            componentDidUpdate() {
            // this.initChart();
        }
            initChart(params){
            let dom = this.refs.chartsWrap;
            if (this.chart) {
            this.chart.dispose();
            }
            this.chart = echarts.init(dom);
            // initOptions(params) {
            if (!params) {return {}}
            let series = [],
            legend = [],
            color = params.color || ['22,197,255', '230,40,108'],
            colorRGB = [];
            color.map((item, index) => {
            colorRGB.push('rgb(' + item + ')');
        });
            let seriesData = params.series || [];
            seriesData.map((item, index) => {
            legend.push(item.name);
            series.push({
            name: item.name || '',
            stack: '总量',
            type: 'bar',
            barWidth: 35,
            data: item.data || [],
            itemStyle: {
                normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(' + color[index] + ',0.8)'
                }, {
                    offset: 0.9,
                    color: 'rgba(43,253,182,0)'
                }]),
                borderWidth: 1,
                borderColor: 'rgba(' + color[index] + ',1)',
            }
        }
        })
        });
            let option = {
            color: colorRGB,
            legend: {
                show: params.legend ? true : false,
                icon: 'rect',
                itemHeight: 10,
                itemWidht: 10,
                top: '2%',
                right: 'center',
                data: legend,
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                }
            },
            grid: {
                top: '15%',
                left: '3%',
                right: '3%',
                bottom: '5%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle:{
                    color:'rgba(62,181,121,0.3)',
                    },
                },
                backgroundColor:'transparent',
                borderWidth:1,
                borderColor:'#29F3B1',

                textStyle:{
                    color:'#fff'
                },
                formatter: function (params){
                    var name = params[0].value == '-' ? '上涨' : '下跌',
                    value = params[0].value == '-' ? params[1].value : params[0].value,
                    color = params[0].value == '-' ? params[1].color : params[0].color;

                    var title = '<span style="display:inline-block; width:100%; color:'+color+';padding:5px 0;border-bottom:2px solid '+color+';text-align:center;">'+ params[0].name +'</span></br>';
                    var itemHtml = '<span style="display:inline-block; padding:10px;">';

                    itemHtml+= name + '：<span style="color:'+ color +';">' + value + '（%）</span>'
                    return title + itemHtml + '</span>';
                },
                padding: 0,
                margin:0
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                interval: 0,
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
                splitArea: {
                    show: params.xAxis.splitArea ? true : false,
                    // interval:0,
                    areaStyle: {
                        color: ['rgba(10,137,255,.5)', 'rgba(10,137,255,.4)', 'rgba(10,137,255,.3)', 'rgba(10,137,255,.2)']
                        }
                    },
                data: params.xAxis.data || [],
            },
            yAxis: {
                type: 'value',
                name: params.yAxis.name || '',
                nameTextStyle: {
                    color: '#bbf9ff',
                    fontSize: 14
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
            series: series
        };
            // return option;
            this.chart.setOption(option);
        }
            }

            export default Bar

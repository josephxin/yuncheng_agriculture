import React from 'react';
import echarts from 'echarts';
class BarLine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			IData: {
				seriesData1: [],
				seriesData2: [],
				valueList: [],
			}
		};
	}

	setData(data) {
		this.setState({
			IData: {
				seriesData1: data.seriesData1,
				seriesData2: data.seriesData2,
				xData: data.xData
			}
		}, () => {
			this.initChart(this.state.IData);
		})
	}

	render() {
		return(<div ref={'chartsWrap'} style={{
        width: this.props.width || '100%',
        height: this.props.height || '250px',
        position: 'absolute',
        top: `${this.props.top || 35}px`
      }}></div>)
	}

	componentDidMount() {
		this.initChart(this.state.IData);
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

	initChart(params) {
		let dom = this.refs.chartsWrap;
		if(this.chart) {
			this.chart.dispose();
		}
		this.chart = echarts.init(dom);

		if(!params) {
			return {}
		}
		let option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				padding: 0,
				formatter: function(params) {
					//console.log(params);
					let tar = params[1];
					var html = '<div class="tooltip-box">';
					html += '<p>' + tar.name + '</p>';
					html += '<p>' + tar.seriesName + ' : ' + tar.value + '</p>';
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
					return html;
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				top: '15%',
				containLabel: true
			},

			xAxis: {
				type: 'category',
				splitLine: {
					show: false,
					lineStyle: {
						color: ['#A0A9B7']
					}
				},
				axisLabel: {
					interval: '0',
					textStyle: {
						color: "#fff", //字体颜色
						fontSize: 12
					}
				},
				axisLine: {
					lineStyle: {
						color: "#68CCFF",
					}
				},
				// data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
				data: params.xData
			},
			yAxis: [{
					type: 'value',
					splitLine: {
						show: false
					},
					splitArea: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: "#fff", //字体颜色
							fontSize: 12
						}
					},
					axisLine: {
						lineStyle: {
							color: "#68CCFF"
						}
					},
					axisTick: {
						// alignWithLabel: true,
						show: false
					},
				},
				{
					type: 'value',
					name: ' ',
					axisLabel: {
						textStyle: {
							color: "#fff",
							fontSize: 12
						},
						axisTick: {
							show: false
						},
					},
					axisLine: {
						lineStyle: {
							color: "#68CCFF",
						}
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: ['transparent']
						}
					}
				}
			],
			series: [{
					name: '辅助',
					type: 'bar',
					stack: '总量',
					barMaxWidth: 40,
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
					// data: [0, 1700, 1400, 1200, 300, 0]
					data: params.seriesData1
				},
				{
					name: '数量',
					type: 'bar',
					stack: '总量',
					barMaxWidth: 40,
					label: {
						normal: {
							show: true,
							position: 'outside',
							textStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(0,200,250,0.8)'
								}, {
									offset: 1,
									color: 'rgba(2,127,199,0.8)'
								}]
							),
							opacity: 1,
							barBorderColor: '#00C0ED'
						},
					},

					// data:[2900, 1200, 300, 200, 900, 300]
					data: params.seriesData2
				}
			]
		};
		this.chart.setOption(option);
	}
}

export default BarLine
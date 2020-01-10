import React from 'react';
import echarts from 'echarts';
import symbol from '../img/symbol.png'
import '../css/charts-style.css';
class BarLine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div ref = {'chartsWrap'} style = {{width: this.props.width || '100%', height: this.props.height || '250px', position: 'absolute', top: `${this.props.top || 35}px`}}></div>
		)
	}
	componentDidMount() {
		this.initChart();
	}
	componentDidUpdate() {

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
				confine: true,
				padding: 0,
				backgroundColor: 'transparent',
				formatter: function(param) {
					var html = '';
					var unit = ['元/公斤', '元/公斤'];
					html += '<div class="tooltip-box">';
					param.map((item, i) => {
						html += '<p>' + item.seriesName + '：' + item.value + unit[i] + '</p>';
					});
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
					return html;
				}
			},
			grid: {
				top: '20%',
				left: '3%',
				right: '3%',
				bottom: '5%',
				containLabel: true
			},
			legend: {
				itemGap: 15,
				textStyle: {
					color: '#fff'
				},
				left: 'center',
				top: 10,
				data: [{
					name: '平均批发价格',
					icon: 'rect'
				}, {
					name: '平均销售价格',
					icon: 'rect'
				}],
				itemWidth: 10,
				itemHeight: 10
			},
			xAxis: {
				data: params.date || [],
				axisLabel: {
					inside: false,
					textStyle: {
						color: '#9dc6ff',
						fontSize: 12
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
						width: 1
					}
				}
			},
			yAxis: [{
				type: 'value',
				name: '元/公斤',
				min: 0,
				interval: 50,
				axisLabel: {
					formatter: '{value} ',
					color: '#9dc6ff',

				},
				// splitNumber: 5,
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#053e7b',
						width: 1,
						type: 'dashed'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#fff',
						width: 1
					}
				}
			}],
			series: [ //for shadow
				{
					name: '平均批发价格',
					type: 'bar',
					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(0,255,246,1)'
								}, {
									offset: 1,
									color: 'rgba(0,255,246,0.3)'
								}]
							}
						}
					},
					barWidth: 10,
					barGap: '100%',
					data: params.wholesalePrice || []
				},
				{
					name: '平均销售价格',
					type: 'bar',
					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(13,123,255,1)'
								}, {
									offset: 1,
									color: 'rgba(13,123,255,0.3)'
								}]
							}
						}
					},
					barWidth: 10,
					data: params.retailPrice || []
				}
			]
		};
		this.chart.setOption(option);
	}
}

export default BarLine
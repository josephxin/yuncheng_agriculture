import React from 'react';
import echarts from 'echarts';
class creditStatistics2 extends React.Component {
	constructor(props) {
		super(props);
		this.unit = props.unit || '人';
		this.state = {

		}
	}

	render() {
		return(
			<div ref={'bar'} style={{
        width: this.props.width,
        height: this.props.height
      }}></div>
		)
	}

	componentDidMount() {
		const me = this;
		me.barChart = echarts.init(me.refs.bar)
		me._option = {
			title: {
				text: '',
				right: 20,
				top: 30,
				textStyle: {
					color: '#fff',
					fontSize: 14
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter: function(d) {
					let str = '';
					d.forEach((s, i) => {
						if(i === 0) {
							str = [`<span style="font-size: 16px;">${s.name}</span>`, '</br>', s.marker, s.seriesName, ': ', s.value + me.unit || '--'].join('');
						} else {
							str += ['</br>', s.marker, s.seriesName, ': ', s.value + me.unit || '--'].join('');
						}
					});
					return str;
				},
				textStyle: {
					fontSize: 14
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '25%',
				containLabel: true
			},
			legend: {
				data: ['红名单', '白名单', '黑名单'],
				itemWidth: 10,
				itemHeight: 6,
				itemGap: 30,
				top: 35,
				textStyle: {
					color: '#fff',
					fontSize: 14
				}
			},
			xAxis: [{
				type: 'category',
				data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
				triggerEvent: true,
				axisLabel: {
					color: '#fff'
				},
				axisLine: {
					lineStyle: {
						color: '#0a89ff'
					}
				}
			}],
			yAxis: {
				type: 'value',
				name: me.unit,
				nameTextStyle: {
					color: '#fff',
					fontSize: 14,
					padding: [0, 20, 0, 0]
				},
				scale: true,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: '#ffffff',
					fontSize: 16,
					margin: 16,
					formatter: function(d) {
						return d;
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(10,137,255,.8)',
						width: 1,
						type: 'dashed'
					}
				}
			},
			series: [{ // For shadow
					type: 'bar',
					itemStyle: {
						normal: {
							color: 'rgba(36,169,224,0.2)'
						}
					},
					barGap: '-90%',
					barWidth: 30,
					// data: [900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
					animation: false
				},
				{
					name: '红名单',
					type: 'bar',
					stack: '广告',
					data: [5, 3, 6, 8, 2, 6, 3, 6, 8, 2],
					barWidth: 30,
					color: '#0aa4d4',
				},
				{
					name: '白名单',
					type: 'bar',
					stack: '广告',
					data: [5, 33, 64, 85, 27, 68, 39, 62, 8, 6],
					barWidth: 30,
					color: '#5ff4db',
				},
				{
					name: '黑名单',
					type: 'bar',
					stack: '广告',
					data: [15, 3, 64, 5, 7, 8, 9, 2, 8, 6],
					barWidth: 30,
					color: '#fffd04',
				}
			]
		};
		me.barChart.setOption(me._option);
		me.barChart.on('click', function(params) {
			if(typeof me.props.fn === 'function') {
				me.props.fn(params.name);
			}
		});
	}

	componentWillUnmount() {
		if(this.barChart) {
			this.barChart.dispose();
		}
	}

	initData(JsonData) {
		let me = this;
		me._option.legend.data = JsonData[0];
		me._option.xAxis[0].data = JsonData[1];
		me._option.series = JsonData[2];
		me.barChart.setOption(me._option, true);
	}
}
export default creditStatistics2;
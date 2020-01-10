import React from 'react';
import echarts from 'echarts';
class QuantitativeTrend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return(
			<div ref={'bar'} style={{
        width: this.props.width,
        height: this.props.height
      }}></div>
		)
	}

	_setData(JsonData) {
		let me = this;
		me._option.series = JsonData;
		me.barChart.setOption(me._option);
	}

	initData(obj) {
		let me = this;
		me._option.xAxis[0].data = obj.xData;
		me._option.series[1].data = obj.dataA;
		me._option.series[2].data = obj.dataB;
		me._option.series[3].data = obj.dataC;
		me._option.series[4].data = obj.dataD;
		me.barChart.setOption(me._option, true);
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
							str = [`<span style="font-size: 16px;">${s.name}</span>`, '</br>', s.marker, s.seriesName, ': ', s.value + '家' || '--'].join('');
						} else {
							str += ['</br>', s.marker, s.seriesName, ': ', s.value + '家' || '--'].join('');
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
				data: ['A级', 'B级', 'C级', 'D级'],
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
				data: ['产前', '生产', '加工', '仓储', '运输', '销售'],
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
				name: '家',
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
					barWidth: 22,
					animation: false
				},
				{
					name: 'A级',
					type: 'bar',
					stack: '广告',
					data: [120, 132, 101, 134, 90, 230],
					color: '#0aa4d4',
					itemStyle: {
            borderColor: '#0aa4d4',
            borderWidth: 3
          }
				},
				{
					name: 'B级',
					type: 'bar',
					stack: '广告',
					data: [220, 182, 191, 234, 290, 130],
					color: '#5ff4db',
					itemStyle: {
            borderColor: '#5ff4db',
            borderWidth: 3
          }
				},
				{
					name: 'C级',
					type: 'bar',
					stack: '广告',
					data: [150, 232, 201, 154, 190, 230],
					color: '#fffd04',
					itemStyle: {
            borderColor: '#fffd04',
            borderWidth: 3
          }
				},
				{
					name: 'D级',
					type: 'bar',
					stack: '广告',
					data: [150, 232, 201, 154, 190, 150],
					color: '#f02f5e',
					itemStyle: {
            borderColor: '#f02f5e',
            borderWidth: 3
          }
				},
			]
		}
		me.barChart.setOption(me._option);
	}
	componentWillUnmount() {
		if(this.barChart) {
			this.barChart.dispose()
		}
	}
}
export default QuantitativeTrend;
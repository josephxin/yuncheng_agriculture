/**
 * Created by joseph_xin on 2019-12-9.
 */
import React from 'react';
import echarts from 'echarts';

class Bar extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			data: [
				[450, 200],
				[320, 300],
				[350, 320],
				[150, 120]
			]
		};
		me.color = ['#12ffff', '#5bbfff', '#fff712', '#ffa912'];
		me.option = {
			backgroundColor: 'transparent',
			color: me.color,
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
        textStyle:{
          align:'left'
        },
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: 60,
				containLabel: true
			},
			legend: {
				left: 'center',
				itemWidth: 10,
				itemHeight: 10,
				textStyle: {
					color: '#fff',
					fontSize: 14
				},
			},
			xAxis: [{
				type: 'category',
				data: ["进村道路硬化", "巷道硬化方式 "],
				axisTick: {
					show: false,
					alignWithLabel: true
				},
				splitLine: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#0a89ff'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#bbf9ff',
						fontSize: 14,
					}
				},
			}],
			yAxis: {
				name: '公里',
				nameTextStyle: {
					color: '#9eceff',
					fontSize: 14,
					padding: [0, 0, 0, -40]
				},
				splitArea: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#04428e',
						width: 1,
						type: "dashed"
					}
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#bbf9ff',
						fontSize: 14,
					}
				},
			},
			series: [{
					name: '水泥',
					type: 'bar',
					barWidth: 10,
					barGap: '40%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(12,162,186,.9)'
									},
									{
										offset: 1,
										color: 'rgba(12,162,186,.1)'
									}
								]
							),
							borderColor: me.color[0],
							borderWidth: 1
						}
					},
					data: me.state.data[0]
				},
				{
					name: '沥青',
					type: 'bar',
					barWidth: 10,
					barGap: '40%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(11,105,184,.9)'
									},
									{
										offset: 1,
										color: 'rgba(11,105,184,.1)'
									}
								]
							),
							borderColor: me.color[1],
							borderWidth: 1,
						}
					},
					data: me.state.data[1]
				},
				{
					name: '砂石',
					type: 'bar',
					barWidth: 10,
					barGap: '40%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(117,144,68,.9)'
									},
									{
										offset: 1,
										color: 'rgba(117,144,68,.1)'
									}
								]
							),
							borderColor: me.color[2],
							borderWidth: 1,
						}
					},
					data: me.state.data[2]
				},
				{
					name: '其他',
					type: 'bar',
					barWidth: 10,
					barGap: '40%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(144,98,77,.9)'
									},
									{
										offset: 1,
										color: 'rgba(144,98,77,.1)'
									}
								]
							),
							borderColor: me.color[3],
							borderWidth: 1,
						}
					},
					data: me.state.data[3]
				}
			]
		};
	}

	setData(d) {
		this.setState({
			data: d
		}, () => {
			this.renderChart();
		});
	}

	renderChart() {
		let me = this;
		me.option.series[0].data = this.state.data[0];
		me.option.series[1].data = this.state.data[1];
		me.option.series[2].data = this.state.data[2];
		me.option.series[3].data = this.state.data[3];
		me.chart.setOption(me.option, true);
	}

	componentDidMount() {
		let me = this;
		me.chart = echarts.init(me._chart);
		me.chart.setOption(me.option);
	}

	render() {
		return(
			<div ref={ref => this._chart = ref} style={{height: '100%'}}></div>
		)
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

}

export default Bar;
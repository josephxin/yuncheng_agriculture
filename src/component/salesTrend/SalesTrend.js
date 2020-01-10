import React, {
	Component
} from 'react';
import echarts from 'echarts';

// 农投品销量趋势

class SalesTrend extends Component {
	constructor(props) {
		super();
		this.state = {};
		this.unit = props.unit || '';
		this.region = [];
		this.sales = [];
	}

	render() {
		return(
			<div ref={'barChart'}
           style={{width: this.props.width, height: this.props.height, position: 'relative', top: 30}}></div>
		)
	}
	setData(json) {
		this.region = json.region ? json.region : [];
		this.sales = json.sales ? json.sales : [];
		this.bgArr = [];
		let max = Math.max(...this.sales);
		this.sales.map((item, i) => {
			this.bgArr.push(max);
		})

		this.initChart();
	}
	initChart() {
		let me = this;
		let dom = this.refs.barChart;
		me.myChart = echarts.init(dom);
		me.option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function(p) {
					//console.log('p',p);
					return `${p[1].name}：${p[1].value}${me.unit}`;
				}
			},
			grid: {
				left: '3%',
				right: '15%',
				bottom: '5%',
				top: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				name: me.props.unit,
				nameTextStyle: {
					color: '#9dc6ff',
					fontSize: 14
				},
				axisLabel: {
					color: '#9dc6ff',
					fontSize: 14,
					formatter: function(p) {
						return p;
					}
				},
				axisLine: {
					lineStyle: {
						color: '#0a89ff'
					}
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'category',
				inverse: true,
				axisLabel: {
					color: '#9dc6ff',
					fontSize: 14
				},
				axisLine: {
					lineStyle: {
						color: '#0a89ff'
					}
				},
				axisTick: {
					show: false
				},
				data: this.region
			},
			series: [{
					type: 'bar',
					barWidth: '30%',
					barGap: '-100%',
					itemStyle: {
						barBorderRadius: 5,
						color: '#093b7e'
					},
					data: this.bgArr
				},
				{
					type: 'bar',
					barWidth: '30%',
					itemStyle: {
						barBorderRadius: 5,
						borderWidth: 1,
						borderColor: '#30fdde',
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [{
								offset: 0,
								color: '#06336a' // 0% 处的颜色
							}, {
								offset: 1,
								color: '#6ed67f' // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						}
					},
					data: this.sales
				}
			]
		};
		me.myChart.setOption(me.option);
	}
	componentDidMount() {
		this.initChart();
	};
}

export default SalesTrend;
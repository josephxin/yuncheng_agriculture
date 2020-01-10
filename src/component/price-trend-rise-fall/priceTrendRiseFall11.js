import React, {
	Component
} from 'react';
import echart from 'echarts';

class priceTrendRiseFall extends Component {
	constructor(props) {
		super(props);
		let me = this;
		this.state = {
			IData: {
				seriesData: [],
				xData: [],
				kData: [

				]
			}
		}

		this.option = {
			color: ['#099d4f'],
			legend: {
				top: 20,
				itemGap: 30,
				itemHeight: 10,
				itemWidth: 20,
				textStyle: {
					color: '#fff',
					fontSize: 14,
					padding: [0, 0, 0, 5]
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				},
				padding: 0,
				backgroundColor: 'transparent',
				formatter: function(d) {
					//console.log(d);
					let str = '<div style="position:relative;padding:10px;font-size:16px;line-height:16px;color:#fff;background:#00af67;border-radius:5px;box-shadow:0 0 10px 0 #00af67;">';
					d.forEach((s, i) => {
						if(i === 0) {
							str += [s.name, '</br>', '价格', ': ', s.value || '--', '元/公斤'].join('');
							str += '</div>';
						}
					});
					return str;
				}
			},
			grid: {
				left: '3%',
				right: '3%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				name: '',
				splitLine: {
					show: false,
					lineStyle: {
						color: '#254495',
						type: 'dashed'
					}
				},
				axisTick: {
					alignWithLabel: true
				},
				axisLine: {
					lineStyle: {
						color: '#0372b1',
						fontSize: 16,
						width: 2
					}
				},
				axisLabel: {
					textStyle: {
						color: "#fff",
						fontSize: 14
					}
				},
				data: this.state.IData.xData
			},
			yAxis: [{
				name: '元/公斤',
				nameTextStyle: {
					color: '#fff'
				},
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: function(value) {
						return value;
					},
					textStyle: {
						color: "#fff",
						fontSize: 14
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#043c65',
						type: "solid"
					}
				},
			}],
			series: [{
				type: 'line',
				name: '趋势图',
				data: this.state.IData.seriesData,
				smooth: true,
				symbolSize: 10,
				symbol: 'circle',
				itemStyle: {
					normal: {
						borderWidth: 4,
						borderColor: '#ffff00'
					}
				},
				lineStyle: {
					normal: {
						color: '#099d4f'
					}
				}
			}]
		};

		me.echartStyle = {
			width: `${me.props.width}px`,
			height: `${me.props.height}px`,
			position: 'absolute',
			top: `${me.props.top || 35}px`
		};

	}

	render() {
		let me = this;
		return(
			<div ref={'echarts'} style={me.echartStyle}></div>
		)
	}
	
	_setData(data) {
		this.setState({
			IData: data
		})
	}

	componentDidMount() {
		let me = this;
		let box = me.refs.echarts;
		let echarts = echart.init(box);

		echarts.setOption(this.option, true);
	}

	componentDidUpdate() {
		this.option.series[0].data = this.state.IData.seriesData;
		this.option.xAxis.data = this.state.IData.xData;
		let me = this;
		let box = me.refs.echarts;
		let echarts = echart.init(box);

		echarts.setOption(this.option, true);
	}
}

export default priceTrendRiseFall;
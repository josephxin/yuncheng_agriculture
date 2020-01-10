import React, {
	Component
} from 'react';
import echart from 'echarts';
//import symbol from './symbol.png';
class priceTrendRiseFall extends Component {
	constructor(props) {
		super(props);
		let me = this;
		this.state = {
			IData: {
				seriesData: [40, 40, 40, 40, 40, 40],
				xData: ['2018-10-29', '2018-10-30', '2018-11-01', '2018-11-02', '2018-11-03', '2018-11-04'],
				kData: [
					[20, 30, 1, 2],
					[40, 35, 2, 1],
					[33, 38, 3, 2],
					[40, 45, 4, 4],
					[33, 38, 33, 40],
					[40, 45, 32, 42]
				]
			}
		}

		this.option = {
			
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				},
				padding: 0,
				backgroundColor: 'transparent',
				formatter: function(params) {
					//console.log(params);
					var unit = '';
					var itemHtml = '<div style="position:relative;padding:10px;font-size:16px;line-height:16px;color:#fff;background:#00af67;border-radius:5px;box-shadow:0 0 10px 0 #00af67;">';
					itemHtml += '<p>' + params[0].name + unit + '</p>';
					itemHtml += '<p>' + unit + '均价：' + params[0].value + '元</p>';
					itemHtml += '</div>';
					return itemHtml;
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
				name: '元',
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
					name: '价格',
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
				}
				/*,
				        {
				          type: 'k',
				          name: '价格',
				          data:this.state.IData.kData,
				          barMaxWidth: 10,
				          itemStyle: {
				            normal: {
				              color: '#9d3c54',
				              color0: '#159b55',
				              borderColor: '#ff0000',
				              borderColor0: '#00ff79'
				            }
				          },
				        }*/
			]
		};

		me.echartStyle = {
			width: `${me.props.width}px`,
			height: `${me.props.height}px`,
		};
	}

	render() {
		//console.log('render     --->',this.state.IData);
		let me = this;
		return(
			<div ref={'echarts'} style={me.echartStyle}> </div>
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
		//this.option.series[1].data = this.state.IData.kData;
		this.option.xAxis.data = this.state.IData.xData;
		let me = this;
		let box = me.refs.echarts;
		let echarts = echart.init(box);

		echarts.setOption(this.option, true);
	}
}

export default priceTrendRiseFall;
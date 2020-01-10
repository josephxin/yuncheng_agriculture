import React, {
	Component
} from 'react';
import echart from 'echarts';
import symbol from './symbol.png';
class Relation extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.legend = props.legend || ['', ''];
		me.unit = props.unit || ['', ''];
		me.max = props.max || 10;
		me.state = {};
	}

	render() {
		return(
			<div ref={'echarts'} style={{width:this.props.width||'450px',height:this.props.height||'300px',top:this.props.containerTop || '30px'}}> </div>
		)
	}

	componentDidMount() {

	}

	componentDidUpdate() {
		let me = this;
		if(!me.lock) {
			return
		}
		let box = me.refs.echarts;
		let echarts = echart.init(box);
		let dataObj = me.state.data;
		me.unit = dataObj.unit || me.unit;
		let option = {
			grid: {
				top: me.props.top || 40,
				left: 30,
				right: 30,
				bottom: me.props.bottom || 0,
				containLabel: true
			},
			legend: {
				itemGap: 15,
				textStyle: {
					color: '#fff'
				},
				top: me.props.legendTop || 10,
				data: [{
						name: this.legend[0],
						icon: 'rect'
					},
					{
						name: this.legend[1],
						icon: 'line'
					}
				],
				itemWidth: 15,
				itemHeight: 15
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
				formatter: function(d) {
					let str = '';
					d.forEach((s, i) => {
						//console.log(s)
						if(s.seriesIndex === 0) {
							str = [s.name, '</br>', s.seriesName, ': ', s.value || '--', me.unit[0]].join('');
						} else {
							str += ['</br>', s.seriesName, ': ', s.value || '--', me.unit[1]].join('');
						}
					});
					return str;
				},
			},
			dataZoom: [{
				"type": "slider",
				"show": this.props.dataZoom ? true : false,
				"xAxisIndex": [0], // 表示这个 dataZoom 组件控制 第一个 xAxis
				"height": 15,
				left: '3%',
				right: '3%',
				bottom: 10,
				"start": 0,
				"end": 100,
				handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
				handleSize: '200%',
				handleStyle: {
					color: "#349dff",
				},
				textStyle: {
					color: "#bbf9ff"
				},
				backgroundColor: 'rgba(17,66,114,.5)',
				fillerColor: 'rgba(17,66,114,1)', //选中范围的填充颜色。
				borderColor: "#349dff",
			}, {
				"type": "inside",
				"show": this.props.dataZoom ? true : false,
				"start": 0,
				"end": 100
			}],
			xAxis: {
				data: dataObj.xDateTime,
				axisLabel: {
					inside: false,
					textStyle: {
						color: '#9dc6ff',
						fontSize: 12
					},
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
				},
			},
			yAxis: [{
					type: 'value',
					name: me.unit[0],
					nameTextStyle: {
						color: '#fff', //默认取 axisLine.lineStyle.color
					},
					min: 0,
					max: this.max,
					//interval: 2,
					axisLabel: {
						formatter: '{value} ',
						color: '#9dc6ff',
					},
					axisTick: {
						show: true
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
						show: true,
						lineStyle: {
							color: '#0d7bff',
							width: 1
						}
					}
				},
				{
					type: 'value',
					name: me.unit[1],
					nameTextStyle: {
						color: '#fff', //默认取 axisLine.lineStyle.color
					},
					//min: 0,
					//max: 500,
					axisLabel: {
						formatter: '{value}',
						color: '#9dc6ff',
					},
					axisTick: {
						show: true
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
						show: true,
						lineStyle: {
							color: '#0d7bff',
							width: 1
						},
					}
				}
			],
			series: [{
					name: this.legend[0],
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
					barWidth: '30%',
					data: dataObj.barData
				},
				{
					name: this.legend[1],
					type: 'line',
					symbol: 'image://' + symbol,
					symbolSize: 20,
					smooth: false,
					lineStyle: {
						color: '#f0ff03',
						width: 3
					},
					itemStyle: {
						normal: {
							color: '#f0ff03'
						}
					},
					yAxisIndex: 1,
					data: dataObj.lineData
				}
			]
		};

		echarts.setOption(option);
	}

	_setData(d) {
		let me = this;
		me.lock = true;
		me.setState({
			data: d
		})
	};
}

export default Relation;
import React, {
	Component
} from 'react';
import echart from 'echarts';
import symbol from './symbol.png';
class Relation extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {};
	}

	render() {
		return(
			<div ref={'echarts'} style={{width:this.props.width,height:this.props.height,marginTop:this.props.marginTop,marginLeft:this.props.marginLeft}}> </div>
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
		let dataArr = me.state.data
		let option = {
			title: {
				show: true,
				text: '公顷',
				textStyle: {
					color: '#fff',
					fontSize: 14
				},
				top: 16,
				left: 15
			},
			grid: {
				top: 60,
				left: 20,
				right: 20,
				bottom: 20,
				containLabel: true
			},
			legend: {
				itemGap: 15,
				textStyle: {
					color: '#fff'
				},
				//left: me.props.legendLeft || 80,
				top: me.props.legendTop || 10,
				data: [{
					name: '面积',
					icon: 'rect'
				}, {
					name: '产量',
					icon: 'rect'
				}],
				itemWidth: 10,
				itemHeight: 10
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
				formatter: function(d) {
					let str = '';
					d.forEach((s, i) => {
						//console.log(s);
						if(s.seriesIndex === 0) {
							str = [s.name, '</br>', s.seriesName, ': ', s.value || '--', '公顷'].join('');
						} else {
							str += ['</br>', s.seriesName, ': ', s.value || '--', '吨'].join('');
						}
					});
					return str;
				},
			},
			xAxis: {
				data: dataArr.timeData,
				axisLabel: {
					inside: false,
					textStyle: {
						color: '#9dc6ff',
						fontSize: 12
					},
					// interval: 0
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
					name: '面积/公顷',
					min: 0,
					axisTick: {
						show: true
					},
					axisLabel: {
						inside: false,
						textStyle: {
							color: '#bbf9ff',
							fontSize: 14 || 24
						},
						interval: 0
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
							color: 'transparent' || '#0f0',
							width: 0
						},
						symbol: ['none', 'arrow']
					}
				},
				{
					type: 'value',
					name: '产量/吨',
					min: 0,
					axisTick: {
						show: true
					},
					axisLabel: {
						inside: false,
						textStyle: {
							color: '#bbf9ff',
							fontSize: 14 || 24
						},
						interval: 0,
						formatter: '{value}'
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
							color: 'transparent' || '#0f0',
							width: 0
						},
						symbol: ['none', 'arrow']
					}
				}
			],
			series: [ //for shadow
				{
					name: '面积',
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
					//barGap:'100%',
					data: dataArr.Data2
				},
				{
					name: '产量',
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
					yAxisIndex: 1,
					barWidth: 10,
					data: dataArr.Data1
				},
			]
		};

		echarts.setOption(option);
	}

	_setData(d) {
		//console.log(d);
		let me = this;
		me.lock = true;
		me.setState({
			data: d
		})
	};
}

export default Relation;
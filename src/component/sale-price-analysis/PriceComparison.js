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
		this.len = false;
		this.num = 30;
	}

	render() {
		return(
			<div ref={'echarts'} style={{width:this.props.width||'450px',height:this.props.height||'300px',top:this.props.top}}> </div>
		)
	}

	componentDidMount() {

	}

	componentDidUpdate() {
		let me = this;
		if(!me.lock) {
			return
		}
		me.lock = false;
		let box = me.refs.echarts;
		let echarts = echart.init(box);
		let dataArr = me.state.data
		let option = {
			grid: {
				top: me.props.dataZoom ? 60 : 40,
				left: 20,
				right: 20,
				bottom: me.props.dataZoom ? 60 : 0,
				containLabel: true
			},
			dataZoom: [{
				"type": "slider",
				"show": me.props.dataZoom ? true : false,
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
				"show": me.props.dataZoom ? true : false,
				"start": 0,
				"end": 100
			}],
			legend: {
				itemGap: 15,
				textStyle: {
					color: '#fff'
				},
				//left: me.props.legendLeft || 80,
				top: me.props.legendTop || 10,
				data: [{
					name: '批发价',
					icon: 'rect'
				}, {
					name: '零售价',
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
				formatter: function(params) {
					let res1 = '<div style="min-width: 10px;">';
					if(params.length > 0) {
						let enter = '';
						let unit = '';
						for(let i = 0; i < params.length; i++) {
							if(i === 0) {
								enter = '<br/>';
								unit = '元/公斤';
							} else if(i === 1) {
								enter = '<br/>';
								unit = '元/公斤';
							} else {
								unit = '万吨';
							}
							res1 += '<span>' + params[i].seriesName + ':' + params[i].value + '</span>' + unit + enter;
						}
					}
					res1 += '</div>';
					return res1;
				}
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
				name: '元/公斤',
				nameTextStyle: {
					color: '#fff',//默认取 axisLine.lineStyle.color
				},
				min: 0,
				interval: 2,
				axisLabel: {
					formatter: '{value} ',
					color: '#9dc6ff',
				},
				// splitNumber: 5,
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
			}],
			series: [ //for shadow
				{
					name: '批发价',
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
					name: '零售价',
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
					data: dataArr.Data1
				}
			]
		};

		echarts.setOption(option, true);
	}

	_setData(d) {
		let me = this;
		me.lock = true;
		me.setState({
			data: d
		})
		if(d.Data1.length > 12) {
			this.len = true
			this.num = 70
		} else {
			this.len = false
			this.num = 30
		}
	};
}

export default Relation;
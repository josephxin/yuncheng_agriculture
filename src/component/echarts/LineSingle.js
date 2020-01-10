import React from 'react';
import echarts from 'echarts';
import './echarts.css';

class LineSingle extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		this.state = {};
		this.domRef = React.createRef();
		this.dataZoom = props.dataZoom ? true : false;
		this.options = {
			color: ['#2bfdb6', '#c5276a'],
			grid: {
				top: 20,
				left: '3%',
				right: '3%',
				bottom: this.dataZoom ? '15%' : '5%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					lineStyle: {
						color: '#0a89ff'
					}
				},
				confine: true,
				padding: 0,
				backgroundColor: 'transparent',
				position: function(point, params, dom, rect, size) {
					return [point[0] + 10, point[1] - size.contentSize[1]];
				},
				formatter: function(param) {
					//console.log(param);
					//console.log(me.state.unit);
					let html = '';
					let unit = me.state.unit || '';
					let smallVariety = me.state.smallVariety ? me.state.smallVariety + '：' : '';
					html += '<div class="tooltip-box">';
					html += param[0].axisValue + '<br />';
					html += smallVariety + param[0].value + unit;
					html += '<i class="lt"></i><i class="rb"></i></div>';
					return html;
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				axisLabel: {
					interval: 0,
					textStyle: {
						fontSize: 14,
						color: "#bbf9ff",
					},
					margin: 10
				},
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: "#0a89ff",
						type: "solid"
					}
				},
				splitLine: {
					show: false,
				},
				data: [],
			},
			yAxis: {
				type: 'value',
				name: me.state.unit,
				//min: 0,
				//max: 1000000,
				nameTextStyle: {
					color: '#fff',
					fontSize: 14,
				},
				axisLabel: {
					margin: 10,
					textStyle: {
						fontSize: 14,
						color: "#bbf9ff",
					},
					formatter: '{value}',
				},
				axisTick: {
					show: true
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: "#0a89ff",
						type: "dashed",
					}
				},
			},
			series: [{
				name: '',
				type: 'line',
				data: [],
				showSymbol: this.props.showSymbol ? true : false,
				symbolSize: 10,
				smooth: true,
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(43,253,182,0.8)'
						}, {
							offset: 0.5,
							color: 'rgba(43,253,182,0)'
						}])
					}
				},
				emphasis: {
					itemStyle: {
						borderWidth: 4,
						borderColor: 'rgba(24,54,133,0.6)',
						shadowColor: 'rgba(43,253,182,1)',
						shadowBlur: 10
					}
				}
			}, {
				name: '',
				type: 'line',
				data: [20000, 20000, 20000, 20000, 20000, 20000, 20000],
				showSymbol: this.props.showSymbol ? true : false,
				symbolSize: 10,
				smooth: true,
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(169,25,86,0.8)'
						}, {
							offset: 0.5,
							color: 'rgba(169,25,86,0)'
						}])
					}
				},
				emphasis: {
					itemStyle: {
						borderWidth: 4,
						borderColor: 'rgba(169,25,86,0.6)',
						shadowColor: 'rgba(169,25,86,1)',
						shadowBlur: 10
					}
				}
			}],
			dataZoom: [{
				"type": "slider",
				"show": this.dataZoom,
				"xAxisIndex": [0], // 表示这个 dataZoom 组件控制 第一个 xAxis
				"height": 15,
				left: '5%',
				right: '5%',
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
				"show": this.dataZoom,
				"start": 0,
				"end": 100
			}],
		};
	}

	setData(d) {
    this.lock = true;
		this.setState({ ...d
		});
	}
	_setData(d) {
		this.lock = true;
		this.setState({ ...d
		});
	}
	_setData1(d) {
		this.lock = true;
		this.setState({ ...d
		});
	}
	componentDidUpdate() {
		if(!this.lock) {
			return false;
		}
		this.lock = false;
		const me = this;
		const state = me.state;
		const options = me.options;
		options.series[0].data = state.data;
		options.series[1].data = state.data1;
		options.xAxis.data = state.date;
		options.yAxis.name = state.unit;
		options.grid.top = state.unit ? 40 : 20;
		me.chart.setOption(me.options);
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

	componentDidMount() {
		const me = this;
		const dom = me.domRef.current;
		me.chart = echarts.init(dom);
		me.chart.setOption(me.options);
	}

	render() {
		return(
			<div style={{
        position: 'absolute',
        top: this.props.top || '40px',
        left: 0,
        width: this.props.width||'440px',
        height: this.props.height || '190px'
      }}>
        <div style={{
          width: this.props.width||'440px',
          height: this.props.height || '160px'
        }} ref={this.domRef}></div>
      </div>
		);
	}
};

export default LineSingle;

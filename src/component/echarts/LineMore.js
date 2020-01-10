import React from 'react';
import echarts from 'echarts';
import dot1 from './image/dot1.png';
import dot2 from './image/dot2.png';
import dot3 from './image/dot3.png';
import dot4 from './image/dot4.png';
import markPoint from './image/markPoint.png';

const lineColor = ['rgba(59,255,208,1)', 'rgba(255,253,4,1)', '#0a89ff', '#15b7f1'];
const dotList = [dot1, dot2, dot3, dot4];

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.options = {
			/*tooltip: {
				trigger: 'item',
				padding: 0,
				formatter: function(d) {
					//console.log(d);
					var html = '<div class="tooltip-box">';
					html += '<p>' + d.name + '</p>';
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
					return html;
				},
				textStyle: {
					fontSize: 14
				}
			},*/
			tooltip: {
				trigger: 'axis',
				padding: 0,
				formatter: function(d) {
					//console.log(d);
					let str = '';
					d.forEach((s, i) => {
						if(s.seriesType == 'line' && i == 0) {
							str = [`<span style="font-size: 16px;">${s.name}</span>`, '</br>', s.marker, s.seriesName, ': ', s.value + '亿元' || '--'].join('');
						} else if(s.seriesType == 'line' && i == 1) {
							str += ['</br>', s.marker, s.seriesName, ': ', s.value + '万吨' || '--'].join('');
						}
					});
					return str;
				},
				textStyle: {
					fontSize: 14
				}
			},
			legend: {
				icon: 'react',
				itemHeight: 7,
				left: 'center',
				textStyle: {
					color: '#fff',
					fontSize: 14
				},
				data: props.legend
			},
			grid: {
				top: 40,
				left: 30,
				right: 30,
				bottom: '3%',
				containLabel: true
			},
			color: lineColor,
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				axisLine: {
					lineStyle: {
						color: 'rgba(10,137,255,1)',
						width: 1
					}
				},
				axisTick: {
					show: true
				},
				axisLabel: {
					color: '#ffffff',
					fontSize: 16,
					margin: 16
				}
			},
			yAxis: [{
				//max: 80,
				type: 'value',
				name: '产值（亿元）',
				nameTextStyle: {
					color: '#fff',
					fontSize: 14,
					padding: [0, 20, 0, 0]
				},
				scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
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
			}, {
				//max: 80,
				type: 'value',
				name: '产量（万吨）',
				nameTextStyle: {
					color: '#fff',
					fontSize: 14,
					padding: [0, 20, 0, 0]
				},
				scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
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
			}],
			series: [{
					name: this.props.legend ? this.props.legend[0] : '上一年',
					type: 'line',
					yAxisIndex: 0,
					data: [12, 21, 35, 43, 55, 2, 1, 5, 4, 55, 14, 5],
					showSymbol: false,
					symbol: `image://${dot1}`,
					symbolSize: 18,
					smooth: true,
					lineStyle: {
						width: 3
					},
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: 'rgba(59,255,208,.3)'
								},
								{
									offset: 0.4,
									color: 'rgba(59,255,208,.3)'
								},
								{
									offset: 1,
									color: 'rgba(59,255,208,0)'
								}
							],
						}
					},
				},
				{
					name: this.props.legend ? this.props.legend[1] : '当年',
					type: 'line',
					yAxisIndex: 1,
					data: [16, 33, 28, 60, 51, 6, 35, 8, 0, 1, 77, 1],
					showSymbol: false,
					symbol: `image://${dot2}`,
					symbolSize: 18,
					smooth: true,
					lineStyle: {
						width: 3
					},
				},
				{
					name: '三农政策',
					type: 'scatter',
					//hoverAnimation: true,
					symbol: `image://${markPoint}`,
					symbolSize: [24, 32],
					data: [{
						name: '惠农发展政策1',
						value: 12
					}, {
						name: '苹果发展政策1',
						value: 22
					}, {
						name: '荔枝发展政策1',
						value: 28
					}, {
						name: '橘子发展政策1',
						value: 43
					}, {
						name: '香蕉发展政策1',
						value: 51
					}, {
						name: '西红柿发展政策1',
						value: 2
					}, {
						name: '芒果发展政策1',
						value: 1
					}, {
						name: '哈密瓜发展政策1',
						value: 5
					}, {
						name: '百香果发展政策1',
						value: 4
					}, {
						name: '猕猴桃发展政策1',
						value: 1
					}, null, {
						name: '车厘子发展政策1',
						value: 1
					}]
				}
			]
		};
	}

	setData(d) {
		this.lock = true;
		this.setState({
			xData: d.xData,
			lineData: d.lineData,
			scatterData: d.scatterData,
			max: d.max,
			option: d.option
		});
	}

	componentDidUpdate() {
		if(!this.lock) {
			return false;
		}
		const me = this;
		const state = me.state;
		const options = me.options;
		options.series = [];
		options.xAxis.data = state.xData;
		options.yAxis[0].max = state.max;
		options.yAxis[1].max = state.max;
		if(this.state.option) {
			Object.assign(options.yAxis, this.state.option.yAxis);
		}
		state.lineData.forEach((s, i) => {
			let temp = {
				name: s.name,
				type: 'line',
				yAxisIndex: i,
				data: s.data,
				showSymbol: false,
				symbol: `image://${dotList[i]}`,
				symbolSize: 18,
				smooth: true,
				lineStyle: {
					width: 3,
					color: lineColor[i]
				},
			};
			if(i == 0) {
				temp.areaStyle = {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
								offset: 0,
								color: 'rgba(59,255,208,.3)'
							},
							{
								offset: 0.4,
								color: 'rgba(59,255,208,.3)'
							},
							{
								offset: 1,
								color: 'rgba(59,255,208,0)'
							}
						],
					}
				};
			}
			options.series.push(temp);
		});

		state.scatterData.forEach((s, i) => {
			let temp = {
				type: 'scatter',
				data: s,
				symbol: `image://${markPoint}`,
				symbolSize: [24, 32],
			};
			options.series.push(temp);
		});

		me.chart.setOption(options, true);
		me.lock = false;

		me.chart.on('click', function(params) {
			console.log(params.data.name);
		});
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

	componentDidMount() {
		const me = this;
		me.chart = echarts.init(this.domRef);
		me.chart.setOption(me.options);
		me.chart.on('click', function(e) {
			if(typeof me.props.click === 'function') {
				me.props.click(e);
			}
		});
	}

	render() {
		return(
			<div style={{
          position:'absolute',
          width: this.props.width || 440,
          height: this.props.height || 250,
          top:this.props.top || 0,
          left:this.props.left || 0,
        }} ref={ref=>this.domRef=ref}></div>
		);
	}
};

export default Page;
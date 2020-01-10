import React from 'react';
import echarts from 'echarts';
import dot1 from './image/dot1.png';
import dot2 from './image/dot2.png';
import dot3 from './image/dot3.png';
import dot4 from './image/dot4.png';

const lineColor = ['rgba(59,255,208,1)', 'rgba(255,253,4,1)', '#0a89ff', '#15b7f1'];
const dotList = [dot1, dot2, dot3, dot4];

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.options = {
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
			legend: {
				icon: 'react',
				itemHeight: 4,
				textStyle: {
					color: '#fff',
					fontSize: 14
				}
			},
			grid: {
				top: '15%',
				left: '3%',
				right: '8%',
				bottom: '3%',
				containLabel: true
			},
			color: lineColor,
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: this.props.xData ? this.props.xData : [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
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
			series: [{
					name: this.props.legend ? this.props.legend[0] : '上一年',
					type: 'line',
					data: [12, 21, 35, 43, 55, 2, 1, 5],
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
					data: [16, 33, 28, 60, 51, 6, 35, 8],
					showSymbol: false,
					symbol: `image://${dot2}`,
					symbolSize: 18,
					smooth: true,
					lineStyle: {
						width: 3
					},
				}
			]
		};
		this.domRef = React.createRef();
	}

	setData(d) {
		this.lock = true;
		this.setState({
			date: d.date,
			data: d.data,
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
		options.xAxis.data = state.date;
		if(this.state.option) {
			Object.assign(options.yAxis, this.state.option.yAxis);
		}
		state.data.forEach((s, i) => {
			const temp = {
				name: s.name,
				type: 'line',
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
		me.chart.setOption(options, true);
		me.lock = false;
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
        top: 30,
        left: 0
      }}>
        <div style={{
          position:'absolute',
          width: this.props.width || 440,
          height: this.props.height || 250,
          top:this.props.top || 0,
          left:this.props.left || 0,
        }} ref={this.domRef}></div>
      </div>
		);
	}
};

export default Page;
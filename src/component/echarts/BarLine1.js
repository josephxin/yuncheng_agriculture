import React from 'react';
import echarts from 'echarts';
import dot2 from './image/dot2.png';
import barDot from './image/bar-dot.png';
import timeBar from './image/time-bar.png';
import { scaleLinear } from 'd3';

const lineColor = ['rgba(59,255,208,1)', 'rgba(255,253,4,.9)'];

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			date: []
		};
		const me = this;
		this.options = {
			tooltip: {
				trigger: 'axis',
				left: 200,
				formatter: function(d) {
					let str = '';
					d.forEach((s, i) => {
						if(i === 0) {
							str = [s.name, '</br>', s.seriesName, ': ', s.value + '元/公斤' || '--'].join('');
						} else if(s.seriesName !== 'bar-dot') {
							str += ['</br>', s.seriesName, ': ', s.value + '元/公斤' || '--'].join('');
						}
					});
					return str;
				},
				textStyle: {
					fontSize: 16
				}
			},
			legend: {
				show: false,
				selectedMode: false,
				left: me.props.legendLeft || 130,
				textStyle: {
					color: '#fff',
					fontSize: 14
				},
				data: [{
					name: '交易量',
					icon: 'rect'
				}, {
					name: '变化率',
					itemHeight: 1,
					icon: 'line',
				}, ]
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
				boundaryGap: true,
				data: [1, 2, 3, 4, 5],
				axisLine: {
					lineStyle: {
						color: 'rgba(10,137,255,1)',
						width: 1
					}
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: '#ffffff',
					fontSize: 16,
					margin: 16
				}
			},
			yAxis: [{
					type: 'value',
					name: '万吨',
					nameTextStyle: {
						color: '#fff',
						fontSize: 14,
						padding: [0, 20, 0, 0]
					},
					// scale: true,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: 16,
						margin: 16
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
				{
					type: 'value',
					name: '',
					nameTextStyle: {
						color: '#fff',
						fontSize: 14,
						padding: [0, 0, 0, 20]
					},
					// scale: true,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: 16,
						margin: 16
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(10,137,255,.8)',
							width: 1,
							type: 'dashed'
						}
					}
				}
			],
			series: [{
					name: '平均价格',
					type: 'bar',
					data: [1, 2, 3, 4, 5],
					barWidth: 5,
					itemStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: 'rgba(59,255,208,1)'
								},
								{
									offset: 1,
									color: 'rgba(33,119,241,1)'
								}
							],
						}
					}
				},
				{
					name: 'bar-dot',
					type: 'line',
					hoverAnimation: false,
					data: [1, 2, 3, 4, 5],
					showSymbol: true,
					symbol: `image://${barDot}`,
					symbolSize: 15,
					lineStyle: {
						color: 'transparent',
						width: 3
					}
				}
			]
		};
		this.domRef = React.createRef();
		this.len = 10;
	}

	setData(d) {
		this.lock = true;
		this.scale = scaleLinear().domain([0, d.dataBar.length - this.len]).range([this.len * 380 / d.dataBar.length, 380]);
		this.setState({ ...d
		});
	}

	componentDidUpdate() {
		if(!this.lock) {
			return false;
		}
		const me = this;
		const state = me.state;
		const options = me.options;
		const len = me.len;

		if(me.props.showBar) {
			// bar
			options.series[0].data = state.dataBar.slice(state.index, state.index + len);
			options.series[1].data = state.dataBar.slice(state.index, state.index + len);
			options.yAxis[0].name = state.unitL;

			options.xAxis.data = state.date.slice(state.index, state.index + len);
			me.chart.setOption(me.options);
			me.lock = false;
			if(!me.timer) {
				me.move();
			}
		} else {
			// bar
			options.series[0].data = state.dataBar;
			options.series[1].data = state.dataBar;
			options.yAxis[0].name = state.unitL;

			options.xAxis.data = state.date;
			me.chart.setOption(me.options);
			me.lock = false;
		}
	}

	componentWillUnmount() {
		if(this.timer) {
			clearInterval(this.timer);
		}
		if(this.chart) {
			this.chart.dispose();
		}
	}

	componentDidMount() {
		const me = this;
		const dom = me.domRef.current;
		me.chart = echarts.init(dom);
	}

	move() {
		const me = this;
		let index = me.state.index;
		me.timer = setInterval(() => {
			index++;
			if(index > me.state.dataBar.length - me.len) {
				index = 0;
			}
			me.lock = true;
			me.setState({
				index
			});
		}, 3000);
	}

	createLegend() {
		const data = this.state.legend || [];

		return(
			<ul style={{
        width: this.props.legendWidth || 180,
        display: 'flex',
        color: '#fff',
        fontSize: 14
      }}>
        <li style={{
          marginRight: 20,
          display: 'flex',
          alignItems: 'center',
          width: 150
        }}>
          <div style={{
            width: 13,
            height: 10,
            backgroundColor: lineColor[0],
            marginRight: 10
          }}></div>
          <div style={{
            width: 120
          }}>{data[0]}</div>
        </li>
      </ul>
		);
	}

	createTime() {
		const data = this.state.date;
		const len = data.length;
		return [data[0], data[~~(len / 2)], data[len - 1]].map((s, i) => {
			return(
				<div key={'time' + i}>{s}</div>
			);
		});
	}

	render() {
		return(
			<div className={'bar-line'} style={{
        position: 'absolute',
        top: 40,
        left: 0
      }}>
        <div className={'x-legend'} style={{
          position: 'absolute',
          left: this.props.legendLeft || 100,
          top: this.props.legendTop || 60,
          
        }}>{this.createLegend()}</div>
        <div className={'x-echarts'} style={{
          position:'absolute',
          width: this.props.width || 440,
          height: this.props.height || 210,
          top:this.props.top || 0,
          left:this.props.left || 0,
        }} ref={this.domRef}></div>
        <div className={'time-line'} style={{
          display: this.props.showBar ? 'block' : 'none',
          position: 'absolute',
          top: 215,
          left: 20,
        }}>
          <div className={'time-line-bottom'} style={{
            width: 380,
            height: 10,
            position: 'absolute',
            border: '1px solid rgba(4,91,172,1)',
            borderRadius: 10,
            backgroundColor: 'rgba(4,91,172,.3)',
          }}>
            <div className={'time-line-bottom-xdata'} style={{
              width: 380,
              height: 10,
              color: '#bbf9ff',
              fontSize: 14,
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 15
            }}>
              {this.createTime()}
            </div>
          </div>
          <div className={'time-line-top'} style={{
            width: this.scale ? this.scale(this.state.index) : 0,
            height: 10,
            position: 'absolute',
            border: '1px solid rgba(4,91,172,1)',
            borderRadius: 10,
            backgroundColor: 'rgba(10,138,255,1)'
          }}>
            <img src={timeBar} alt={'time-bar'} style={{ position: 'absolute', right: -10, top: -9 }}/>
          </div>
        </div>
      </div>
		);
	}
};

export default Page;
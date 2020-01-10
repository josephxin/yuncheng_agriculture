import React from 'react';
import echarts from 'echarts';
import './echarts.css';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.domRef = React.createRef();
		this.dataZoom = props.dataZoom ? true : false;
		this.options = {
			color: ['#2bfdb6'],

			grid: {
				top: '5%',
				left: '3%',
				right: '3%',
				bottom: this.dataZoom ? '15%' : '5%',
				containLabel: true
			},
			tooltip: {
		        trigger: 'axis',
		        left:200,
		        formatter: function (d) {
		          let str = '';
		          d.forEach((s, i) => {
		            if (i === 0) {
		              str = [s.name, '</br>', s.seriesName, '平均价格: ', s.value+'元/公斤' || '--'].join('');
		            }
		          });
		          return str;
		        },
		        textStyle: {
		          fontSize: 16
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
				name: '元/公斤',
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
					show: false
				},
				axisLine: {
					show: false,
				},
				splitLine: {
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
				"end": 10,
				handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
				handleSize: '200%',
				handleStyle: {
					color: "#349dff",
				},
				textStyle: {
					color: "#bbf9ff"
				},
				backgroundColor: 'rgba(17,66,114,.5)',
				fillerColor: 'rgba(17,66,114,1)',//选中范围的填充颜色。
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
		this.lock=false;
		const me = this;
		const state = me.state;
		const options = me.options;
		options.series[0].data = state.data;
		options.xAxis.data = state.date;
		options.yAxis.name = state.unit;
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
      <div style={{    marginLeft: 200,
    color: '#fff',position: 'absolute',
    top: 4,
    width: 200}}>
      	<div style={{ background: '#bbf9ff',
      	    marginTop: 9,
    width: 15,
    height: 1,
    margintop: 10,
    float: 'left',
    marginRight: 5,
    }}></div>
      	<p>平均价格</p>
      </div>
      <p style={{color: '#fff'}}>元/公斤</p>
        <div style={{
          width: this.props.width||'440px',
          height: this.props.height || '160px'
        }} ref={this.domRef}></div>
      </div>
		);
	}
};

export default Page;
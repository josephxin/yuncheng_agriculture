/**
 * Created by joseph_xin on 2019-9-11.
 */
import React from 'react';
import echarts from 'echarts';
//import 'echarts-liquidfill';
import './vender/echarts-liquidfill.js';

class Pie extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			seriesData: [{
				value: 208,
				name: '粮食'
			}, {
				value: 40,
				name: '油料'
			}, {
				value: 60,
				name: '蔬菜'
			}, {
				value: 32,
				name: '水果'
			}, {
				value: 30,
				name: '其他'
			}],
			pieClick: '蔬菜'
		};

		const style = props.style || {};
		me._containerStyle = {
			width: style.width ? `${style.width}px` : '100%',
			height: style.height ? `${style.height}px` : '100%',
		};

		me.option = {
			grid: {
				top: 60,
				left: 20,
				right: 20,
				bottom: 60,
				containLabel: true
			},
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {d}%"
			},
			legend: {
				formatter: function(name) {
					if(!name) return '';
					if(name.length > 5) {
						name = name.slice(0, 5) + '...';
					}
					return name;
				},
				tooltip: {
					show: true
				},
				show: true,
				orient: 'vertical',
				itemHeight: 10,
				top: 'middle',
				right: 50,
				icon: "circle",
				textStyle: {
					color: '#fff',
					fontSize: 16,
				},
				data: []
			},
			series: [{ //外面的环
					name: '',
					type: 'pie',
					color: ["#0297ff", "#00cfff", "#2bfdb6", "#28dd5f", "#fffd04", "#08eafb"],
					radius: ['45%', '65%'],
					center: ["30%", "55%"],
					hoverAnimation: false,
					label: {
						normal: {
							show: false
						}
					},
					labelLine: {
						normal: {
							show: false,
						}
					},
					data: me.state.seriesData,
					itemStyle: {
						normal: {
							borderWidth: 2,
							borderColor: 'rgb(8,41,94)'
						}
					},
				},
				{ //最外面的小细环
					name: '',
					type: 'pie',
					radius: ['68%', '68%'],
					center: ["30%", "55%"],
					silent: true,
					hoverAnimation: false,
					label: {
						normal: {
							show: false,
						}
					},
					labelLine: {
						normal: {
							show: false,
							length: 5,
							length2: 0
						}
					},
					itemStyle: {
						normal: {
							color: "rgba(255,255,255,0)"
						}
					},
					data: me.state.seriesData,
				},
				{ //中间的水
					type: 'liquidFill',
					data: [0, 0],
					radius: '45%',
					silent: true,
					// 水球颜色
					color: ['rgba(6,102,138,.8)', 'rgba(6,102,138,.6)'],
					center: ["30%", "55%"],
					label: {
						show: false,
						color: '#294D99',
						insideColor: '#fff',
						fontSize: 50,
						fontWeight: 'bold',

						align: 'center',
						baseline: 'middle',
						position: 'inside'
					},
					outline: {
						show: false
					},
					// 内图 背景色 边
					backgroundStyle: {
						color: 'transparent',
					}
				}
			]
		};
	}

	_setData(d) {
		this.setState(d)
	}

	setData(d) {
		this.setState(d)
	}

	showLabel(params) {
		let me = this;
		let label = {
			normal: {
				show: false,
				textStyle: {
					color: '#fff'
				}
			}
		};
		let itemStyle = {
			normal: {
				borderColor: '#00447e',
				borderWidth: 7,
			}
		};

		let data = [];
		me.state.seriesData.map((item, index) => {
			let obj = {
				name: item.name,
				value: item.value
			};
			if(item.name == params.name) {
				obj.label = label;
				obj.itemStyle = itemStyle;
			}
			data.push(obj);
		});
		//console.log('data--------',data);
		me.option.series[1].data = data;
		if(data == []) {
			me.option.series[2].data = [0]
		} else {
			me.option.series[2].data = [params.percent / 100, params.percent / 90];
		}
		me.chart.setOption(me.option, true);
	}

	componentDidMount() {
		let me = this;
		me.chart = echarts.init(me._chart);
		me.chart.on('mouseover', function(params) {
			//console.log(params);
			if(params.seriesType === 'pie') {
				me.showLabel(params);
			}
		});
		me.chart.on('click', function(params) {
			//console.log(params);
			if(params.seriesType === 'pie') {
				me.props.clickPie ? me.props.clickPie(params.name) : console.log('点击饼图');
				me.showLabel(params);
			}
		});
	}

	componentDidUpdate() {
		const me = this;
		if(me.state) {
			let chart = me.chart;
			let legendData = [];
			let allValue = 0;
			me.state.seriesData.map((item) => {
				legendData.push(item.name);
				allValue = allValue + item.value;
			});

			me.option.legend.data = legendData;
			me.option.series[0].data = me.state.seriesData;
			me.option.series[1].data = me.state.seriesData;

			chart.setOption(me.option, true);

			if(me.state.seriesData.length > 0) {
				//默认选中第一项
				let initParams = { ...me.state.seriesData[0],
					percent: (me.state.seriesData[0].value / allValue * 100)
				};
				me.showLabel(initParams);
			}
		}
	}

	render() {
		return(
			<div ref={ref => this._chart = ref} style={this._containerStyle}></div>
		)
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose()
		}
	}

}

export default Pie;
/**
 * Created by joseph-xin on 2019-01-14.
 */
import React from 'react';
import echarts from 'echarts';
import './vender/echarts-liquidfill';

class Pie3 extends React.Component {
	constructor(props) {
		super();
		this.state = {
			seriesData: [{
				value: 38,
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
			}]
		};
		this._containerStyle = {
			width: props.width ? props.width : '100%',
			height: props.height ? props.height : '100%',
			left: props.left || 0,
			top: props.top || 0,
			zIndex: props.zIndex || '',
		};
	}

	setData(d) {
		this.setState(d);
	}

	componentDidMount() {
		this.chart = echarts.init(this._chart);
	}

	componentDidUpdate() {
		if(this.state) {
			const me = this;
			let chart = me.chart;
			chart.off('click');
			let center = ['40%', '50%'];
			let legendData = [];
			let allValue = 0;
			let seriesData = me.state.seriesData;
			seriesData.map((item) => {
				legendData.push(item.name);
				allValue = allValue + item.value;
			})
			let option = {
				/*tooltip: {
					trigger: 'item',
					formatter: "{b}: {d}%"
				},*/
				tooltip: {
					trigger: 'item',
					confine: true,
					padding: 0,
					backgroundColor: 'transparent',
					formatter: function(params) {
						let html = '';
						html += '<div class="tooltip-box">';
						html += params.name + '：<br/>';
						html += '检测：' + params.value + '次<br/>';
						html += '占比：' + params.percent + '%';
						html += '<i class="lt"></i><i class="rb"></i></div>';
						return html;
					}
				},
				legend: {
					show: true,
					type: 'scroll',
					orient: 'vertical',
					itemHeight: 10,
					top: 'middle',
					right: 50,
					pageIconColor: '#00f6de',//翻页按钮的颜色
					pageIconInactiveColor: '#fff',//翻页按钮不激活时（即翻页到头时）的颜色
					textStyle: {
						color: '#fff',
						fontSize: 16,
					},
					data: legendData
				},
				series: [{
						name: '',
						type: 'pie',
						color: ['#2bfdb6', '#28dd5f', '#9fde5f', '#d2f5a6', '#ffee51', '#f3a43b', '#d0648a', '#f58db2', '#f2b3c9'],
						radius: ['60%', '80%'],
						center: center,
						hoverAnimation: false,
						label: {
							normal: {
								show: false,
							}
						},
						labelLine: {
							normal: {
								show: false,
							}
						},
						data: seriesData,
						itemStyle: {
							normal: {
								borderWidth: 2,
								borderColor: 'rgb(8,41,94)'
							}
						},
					},
					{
						name: '',
						type: 'pie',
						radius: ['85%', '85%'],
						center: center,
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
						data: seriesData,
					},
					{
						type: 'liquidFill',
						data: [0, 0],
						radius: '60%',
						silent: true,
						// 水球颜色
						color: ['rgba(6,102,138,.8)', 'rgba(6,102,138,.6)'],
						center: center,
						label: {
							normal: {
								//fontSize: 35,
								textStyle: {
									color: '#fff',
									insideColor: 'rgba(6,102,138,1)',
									fontSize: 35
								}
							}
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

			function showLabel(params) {
				//console.log(params);
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
				seriesData.map((item, index) => {
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
				chart.setOption({
					series: [{},
						{
							data: data
						},
						{
							data: [params.percent / 100, params.percent / 90]
						}
					]
				});
			}
			
			chart.setOption(option, true);
			
			chart.on('mouseover', function(params) {
				if(params.seriesType === 'pie') {
					showLabel(params);
				}
			});
			if (seriesData.length>0) {
				/*默认选中第一项*/
				let initParams = { ...seriesData[0],
					percent: (Math.ceil(seriesData[0].value / allValue * 100))
				};
				showLabel(initParams);
			}
			chart.on('click', function(params) {
				//console.log(params);
				if(typeof(me.props.getPieClick) == "function") {
					me.props.getPieClick(params);
				}
				showLabel(params);
			});
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

export default Pie3
/**
 * Created by admin on 2018-12-12.
 */
import React from 'react';
import echarts from 'echarts';
import './vender/echarts-liquidfill';

class Pie extends React.Component {
	constructor(props) {
		super(props);
		//console.log(this.props)
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
			}],
			pieClick:'蔬菜'
		};
		const style = props.style || {};
		this._containerStyle = {
			//position: 'absolute',
			width: style.width ? `${style.width}px` : '100%',
			height: style.height ? `${style.height}px` : '100%',
			//left: `${style.left || 0}px`,
			//top: `${style.top || 0}px`,
			//zIndex: `${style.zIndex || ''}`,
		};
		this.pieClick='蔬菜'
	}
	_setData(d) {
		this.setState(d)
	}
	setData(d) {
		this.setState(d)
	}
	componentDidMount() {
		//console.log(this.props)
		this.chart = echarts.init(this._chart);
	}

	componentDidUpdate() {
		if(this.state) {
			let chart = this.chart;
			const me = this;
			let legendData = [];
			let allValue = 0;
			this.state.seriesData.map((item) => {
				legendData.push(item.name);
				allValue = allValue + item.value;
			})
			let option = {
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
					show: true,
					orient: 'vertical',
					itemHeight: 10,
					top: 'middle',
					right: 50,
					icon: "circle",
					// formatter: function (name) {
					//   let text;
					//   me.state.seriesData.map((item, index) => {
					//     if (item.name == name) {
					//       text = name +' ('+ (item.value / 200*100).toFixed(0) + '%)'
					//     }
					//   });
					//   return text;
					// },
					textStyle: {
						color: '#fff',
						fontSize: 16,
					},
					data: legendData
				},
				series: [{
						name: '',
						type: 'pie',
						color: ["#0297ff", "#00cfff", "#2bfdb6", "#28dd5f", "#fffd04", "#08eafb"],
						radius: ['40%', '55%'],
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
					{
						name: '',
						type: 'pie',
						radius: ['58%', '58%'],
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
					{
						type: 'liquidFill',
						data: [0, 0],
						radius: '40%',
						silent: true,
						// 水球颜色
						color: ['rgba(6,102,138,.8)', 'rgba(6,102,138,.6)'],
						center: ["30%", "55%"],
						label: {
							normal: {
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
			
			chart.off('click')
			chart.setOption(option);

			chart.on('mouseover', function(params) {
				if(params.seriesType === 'pie') {
					showLabel(params);
				}
			});
			var that = this
			chart.on('click', function(params) {
				// debugger
				if(params.seriesType === 'pie') {
					that.props.clickPie?that.props.clickPie(params.name):console.log('1')
					that.props.clickPie2?that.props.clickPie2(params.name):console.log('1')
					showLabel(params);				
				}
			});
			/*默认选中第一项*/
			let initParams = { ...me.state.seriesData[0],
				percent: (me.state.seriesData[0].value / allValue * 100)
			};
			showLabel(initParams);

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

export default Pie
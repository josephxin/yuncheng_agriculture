import React from 'react';
import echarts from 'echarts';
import './css/charts-style.css';
class Line extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return(
			<div ref={'chartsWrap'} style = {{width: this.props.width || '100%', height: this.props.height || '250px'}}></div>
		)
	}
	
	componentDidMount() {
		this.initChart();
	}
	
	componentDidUpdate() {

	}
	
	initChart(params) {
		//console.log(params)
		if (params && params.xAxis.data.length == 0) {
			params.unit = '';
			params.yAxis.name = ''
		}
		let dom = this.refs.chartsWrap;
		if(this.chart) {
			this.chart.dispose();
		}
		this.chart = echarts.init(dom);

		if(!params) {
			return {}
		}
		let series = [],
			legend = [],
			color = params.color ? params.color : ['43,253,182', '255,242,0'],
			colorRGB = [];
		color.map((item, index) => {
			colorRGB.push('rgb(' + item + ')');
		});
		let seriesData = params.series ? params.series : [];
		seriesData.map((item, index) => {
			legend.push(item.name);
			series.push({
				name: item.name ? item.name : '',
				type: 'line',
				data: item.data ? item.data : [],
				showSymbol: params.symbol ? true : false,
				smooth: params.noSmooth ? false : true,
				markPoint: params.symbol ? {
					symbolSize: 60,
					label: {
						fontSize: 14
					},
					data: [{
							type: 'max',
							name: '最大值'
						},
						{
							type: 'min',
							name: '最小值'
						}
					]
				} : false,
				areaStyle: item.areaStyle ? {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(' + color[index] + ',0.8)'
						}, {
							offset: 0.5,
							color: 'rgba(43,253,182,0)'
						}])
					}
				} : undefined,
				itemStyle: {
					normal: {
						borderWidth: 4,
						borderColor: 'rgba(' + color[index] + ',.6)',
						shadowColor: 'rgba(' + color[index] + ',1)',
						shadowBlur: 10
					}
				}
			})
		});
		let option = {
			color: colorRGB,
			legend: {
				show: params.legend ? true : false,
				icon: 'rect',
				itemGap: 30,
				itemWidth: 20,
				itemHeight: 10,
				top: '',
				right: 'center',
				data: legend,
				textStyle: {
					color: '#fff',
					fontSize: 14,
				}
			},
			grid: {
				top: '30%',
				left: '3%',
				right: '3%',
				bottom: params.dataZoom ? '15%' : '5%',
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
				// position: function (point, params, dom, rect, size) {
				//   return [point[0] + 10 ,point[1] - size.contentSize[1] ];
				// },
				formatter: function(param) {
					//console.log(param);
					var html = '<div class="tooltip-box">',
						unit = params.unit ? params.unit : '';
					html += '<p style="font-size:16px;font-weight:bold;">' + param[0].name + '</p>';
					param.map((item, index) => {
						html += '<p>' + item.seriesName + '：' + item.value + unit + '</p>';
					});
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
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
				splitArea: {
					show: params.xAxis.splitArea ? true : false,
					//interval:0,
					areaStyle: {
						color: ['rgba(10,137,255,.5)', 'rgba(10,137,255,.4)', 'rgba(10,137,255,.3)', 'rgba(10,137,255,.2)']
					}
				},
				data: params.xAxis.data ? params.xAxis.data : [],
			},
			yAxis: {
				type: 'value',
				name: params.yAxis.name ? params.yAxis.name : '',
				nameTextStyle: {
					color: '#bbf9ff',
					fontSize: 14
				},
				nameTextStyle: {
					fontSize: 14,
					color: "#fff",
					padding: [0, 0, 0, -30]
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
			dataZoom: [{
				"type": "slider",
				"show": params.dataZoom ? true : false,
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
				fillerColor: 'rgba(17,66,114,1)',//选中范围的填充颜色。
				borderColor: "#349dff",
			}, {
				"type": "inside",
				"show": params.dataZoom ? true : false,
				"start": 0,
				"end": 100
			}],
			series: series
		};
		this.chart.setOption(option);
	}
}

export default Line
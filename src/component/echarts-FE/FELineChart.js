import * as echarts from 'echarts';

export const Line = function(container) {
	if(!container) throw new Error('container is undefined');
	let line = echarts.init(container);
	return {
		setOption(params) {
			let series = [],
				legend = [],
				color = params.color ? params.color : ['43,253,182', '255,242,0'],
				colorRGB = [];

			color.forEach((item, index) => {
				colorRGB.push('rgb(' + item + ')');
			});

			let seriesData = params.series ? params.series : [];

			seriesData.forEach((item, index) => {
				legend.push(item.name);
				series.push({
					name: item.name ? item.name : '',
					type: 'line',
					data: item.data ? item.data : [],
					showSymbol: false,
					smooth: true,
					areaStyle: item.areaStyle === false ? {
						opacity: 0,
					} : {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(' + color[index] + ',0.8)'
							}, {
								offset: 0.5,
								color: 'rgba(43,253,182,0)'
							}])
						}
					},
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
					show: params.legendShow,
					icon: 'rect',
					itemHeight: 2,
					itemWidth: 10,
					top: '2%',
					right: 'left',
					data: legend,
					textStyle: {
						color: '#fff',
						fontSize: 14,
					}
				},
				grid: {
					top: '15%',
					left: '3%',
					right: '3%',
					bottom: '5%',
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
							let value = item.value;
							if(value == undefined || value == null) {
								value = '--';
							}
							html += '<p>' + item.seriesName + '：' + value + unit + '</p>';
						});
						html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
						return html;
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: true,
					axisLabel: {
						// interval: 0,
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
					axisLabel: {
						margin: 20,
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
				series: series
			};
			line.setOption(option);
		}
	};
};

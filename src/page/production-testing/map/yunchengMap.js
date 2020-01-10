/**
 * Created by joseph_xin on 2019-08-10.
 */
import React from 'react';
import echarts from 'echarts';

import yunchengJson from './json/yuncheng.json';
import priceMapSymbol from './price-map-symbol.png';
import tooltipBg from './grow-map-tooltip-bg.png';

class YunchengMap extends React.Component {
	constructor(props) {
		super();
		this.state = {
			data: [],
			dd: {},
			dataObj: {
				"yuncheng": [{
						name: "河津市",
						value: 177,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "稷山县",
						value: 42,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "新绛县",
						value: 102,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "万荣县",
						value: 81,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "闻喜县",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "绛县",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "临猗县",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "盐湖区",
						value: 81,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "夏县",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "垣曲县",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "永济市",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "芮城县",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "平陆县",
						value: 80,
						area: 110,
						yield: 220,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					}
				]
			}
		};
		this.mapStyle = {
			position: 'absolute',
			width: `${props.width || 400}px`,
			height: `${props.height || 400}px`,
			left: `${props.left || 0}px`,
			top: `${props.top || 0}px`,
		}
	}

	geo = undefined;
	chart = undefined;
	maxV = 0;
	minV = 0;

	componentDidMount() {
		this.chart = echarts.init(this.chartRef);
		this.getMapData();
	}

	/*获取数组对象最小值*/
	getMinAndMaxV(numArray) {
		let data = numArray.map(d => d.value);
		let maxV = Math.max.apply(null, data);
		let minV = Math.min.apply(null, data);
		return [maxV, minV]
	}

	/*获取指定数组对象的key,value*/
	getArrayObjK(numArray) {
		let obj = {};
		numArray.map(d => {
			obj[d.name] = d.value
		});
		return [Object.keys(obj), Object.values(obj)]
	}

	resetMap() {
		//console.log(this.pp);
		var me = this;
		this.chart.clear();
		this.chart.setOption(this.state.dd);

		let count = null;
		let zoom = function(per) {
			if(!count) count = per;
			count = count + per;
			me.chart.setOption({
				geo: [{
						zoom: count
					},
					{
						zoom: count
					}
				]
			});
			if(count < 1.2) window.requestAnimationFrame(function() {
				zoom(0.2)
			})
		};
		window.requestAnimationFrame(function() {
			zoom(0.2);
		});
	}

	/*数据请求*/
	getMapData() {
		this.chart.clear();
		let dataObj = this.state.dataObj;
		let [maxV, minV] = this.getMinAndMaxV(dataObj['yuncheng']);
		this.maxV = maxV;
		this.minV = minV;
		if(dataObj) {
			this.initMap(dataObj['yuncheng']);
		}
	}

	/*初始化地图*/
	initMap(d) {
		echarts.registerMap('yuncheng', yunchengJson);
		this.extendsMap('chart', {
			mapName: 'yuncheng', // 地图名
			goDown: false, // 是否下钻
			// 下钻回调
			callback: function(name, option, instance) {
				//  console.log(name, option, instance);
			}
		}, d);
	}

	/*下钻重绘*/
	extendsMap(id, opt, d) {
		let me = this;
		let chart = me.chart;

		let areaMap = {
			"yuncheng": '运城市'
		};

		let defaultOpt = {
			mapName: 'yuncheng', // 地图展示
			goDown: false, // 是否下钻
			bgColor: '#404a59', // 画布背景色
			activeArea: [], // 区域高亮,同echarts配置项
			data: [],
			// 下钻回调(点击的地图名、实例对象option、实例对象)
			callback: function(name, option, instance) {}
		};
		if(opt) opt = Object.assign(defaultOpt, opt);
		//console.log(opt);
		// 层级索引
		let name = [opt.mapName]; //'china'
		let idx = 0;
		let pos = {
			leftPlus: 115,
			leftCur: 150,
			left: 198,
			top: 5,
			xDistance: 80
		};

		let line = [
			[0, 0],
			[8, 11],
			[0, 22]
		];
		// style
		let style = {
			font: '18px "Microsoft YaHei", sans-serif',
			textColor: '#eee',
			lineColor: '#0090e1',
			visualMapColor: ['#009dff', '#09f5fa']
		};

		let handleEvents = {
			/**
			 * name 地图名
			 **/
			createBreadcrumb: (name, d) => {
				let breadcrumb = {
					type: 'group',
					id: name,
					left: pos.leftCur + pos.leftPlus,
					top: pos.top + 3,
					children: [{
						type: 'polyline',
						left: -90,
						top: -5,
						shape: {
							points: line
						},
						style: {
							stroke: '#fff',
							key: name
							// lineWidth: 2,
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name, d);
						}
					}, {
						type: 'text',
						left: -68,
						top: 'middle',
						style: {
							text: areaMap[name],
							textAlign: 'center',
							fill: style.textColor,
							font: style.font
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name, d)
						}
					}, {
						type: 'text',
						left: -68,
						top: 10,
						style: {
							name: name,
							text: name.toUpperCase(),
							textAlign: 'center',
							fill: style.textColor,
							font: '12px "Microsoft YaHei", sans-serif',
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name, d)
						}
					}]
				};

				pos.leftCur += pos.leftPlus;

				return breadcrumb;
			},

			/*缩放动画*/
			zoomAnimation: function() {
				let count = null;
				let zoom = function(per) {
					if(!count) count = per;
					count = count + per;
					chart.setOption({
						geo: [{
								zoom: count
							},
							{
								zoom: count
							}
						]
					});
					if(count < 1.2) window.requestAnimationFrame(function() {
						zoom(0.2)
					})
				};
				window.requestAnimationFrame(function() {
					zoom(0.2);
				});
			}
		};

		let unit = me.unit ? me.unit : '元';

		let option = {
			tooltip: {
				show: true,
				type: 'item',
				//formatter: '{b}' + ':' + '\n' + ' {c}' + unit
				formatter: function(d) {
					//console.log(d);
					let str = '';
					let data = d.data;
					if(data) {
						str += `<p style="height: 30px;line-height: 45px;font-size: 16px; font-weight:500;color: #fff;">${d.name}` + `<span style="float:right;margin-right:20px;">${data.varieties ? data.varieties : '--'}</span>` + `</p>`;
						str += `<p style="height: 30px;margin-top:10px;font-size: 15px; font-weight:500;color: #fff;">种植面积：${data.area?data.area:'--'}亩&nbsp;|&nbsp;第${data.areaNum?data.areaNum:'--'}名</p>`;
						str += `<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">产量：${data.yield?data.yield:'--'}吨&nbsp;|&nbsp;第${data.yieldNum?data.yieldNum:'--'}名</p>`;
					}
					return str;
				}
			},
			graphic: [{
					type: 'group',
					left: pos.left,
					top: pos.top - 4,
					children: [{
						type: 'line',
						left: 0,
						top: -20,
						shape: {
							x1: 0,
							y1: 0,
							x2: 80,
							y2: 0
						},
						style: {
							stroke: style.lineColor
						}
					}, {
						type: 'line',
						left: 0,
						top: 20,
						shape: {
							x1: 0,
							y1: 0,
							x2: 80,
							y2: 0
						},
						style: {
							stroke: style.lineColor
						}
					}]
				},
				{
					type: 'group',
					left: pos.left + 2,
					top: pos.top,
					children: [{
						type: 'polyline',
						left: 90,
						top: -12,
						shape: {
							points: line
						},
						style: {
							stroke: 'transparent',
							key: name[0]
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name[0], d)
						}
					}, {
						type: 'text',
						left: 0,
						top: 'middle',
						style: {
							text: areaMap[name],
							textAlign: 'center',
							fill: style.textColor,
							font: style.font
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name[0], d)
						}
					}, {
						type: 'text',
						left: 0,
						top: 10,
						style: {
							text: name[0].toUpperCase(),
							textAlign: 'center',
							fill: style.textColor,
							font: '12px "Microsoft YaHei", sans-serif'
						},
						onclick: function() {
							//handleEvents.resetOption(chart, option, name[0], d)
						}
					}]
				}
			],
			visualMap: {
				show: true,
				// min: this.minV,
				// max: this.maxV,
				type: 'piecewise',
				splitNumber: 3,
				left: '0%',
				top: 'bottom',
				pieces: [{
						min: 132,
						label: '主产区'
					},
					{
						min: 66,
						max: 132,
						label: '副产区'
					},
					{
						min: 0,
						max: 66,
						label: '其他'
					},
				],
				text: ['主产区', '其他'],
				calculable: true,
				seriesIndex: [1],
				inRange: {
					color: style.visualMapColor
				},
				itemWidth: 50,
				itemHeight: 20,
				textStyle: {
					color: style.textColor,
					font: style.font
				}
			},
			geo: [{
					map: opt.mapName,
					zoom: 1.1,
					aspectScale: 0.9,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						},
						emphasis: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							borderColor: '#339ff9',
							borderWidth: 0,
							shadowBlur: 0,
							shadowColor: '#206cd2',
							shadowOffsetX: 5,
							shadowOffsetY: 15
						},
						emphasis: {
							borderColor: '#339ff9',
							borderWidth: 0,
							shadowBlur: 0,
							shadowColor: '#206cd2',
							shadowOffsetX: 5,
							shadowOffsetY: 15,
							areaColor: '#02b270'
						}
					}
				},
				{
					map: opt.mapName,
					zoom: 1.1,
					aspectScale: 0.9,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						},
						emphasis: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							borderColor: '#13fafc',
							borderWidth: 1,
							shadowBlur: 0,
							shadowColor: '#04bd9e',
							shadowOffsetX: 0,
							shadowOffsetY: 0
						},
						emphasis: {
							borderColor: '#13fafc',
							borderWidth: 1,
							shadowBlur: 0,
							shadowColor: '#04bd9e',
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							areaColor: '#02b270'
						}
					}
				}
			],
			series: [{
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'image://' + priceMapSymbol,
					symbolSize: [23, 28],
					hoverAnimation: true,
					label: {
						show: false,
						color: '#fff',
						formatter: '{b}'
					},
					tooltip: {
						show: true,
						trigger: 'item',
						position: function(point, params, dom, rect, size) {
							return [rect.x + 8, rect.y - 140];
						},
						backgroundColor: 'transparent',
						formatter: function(d) {
							//console.log(d);
							let str = '';
							let data = d.data;
							if(data) {
								str += `<div style="width: 177px;height: 134px;background: url(${tooltipBg}) no-repeat center;position: relative"><p style="position: absolute;left: 28px;top: 7px;height: 30px;line-height: 30px;font-size: 16px; font-weight:500;color: #fff;">${data.name}</p><p style="position: absolute;left: 28px;top: 36px;height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">${'黄瓜：' + data.value[2] + '元/公斤'}</p></div>`;
							}
							return str;
						}
					},
					data: []
				},
				{
					name: '价格',
					type: 'map',
					map: opt.mapName,
					geoIndex: 1,
					data: d
				}
			]
		};
		chart.setOption(option);

		let keyAndV = this.getArrayObjK(this.state.dataObj['yuncheng']);
		return chart;
	}

	// 设置effectscatter  小图标priceMapSymbol
	initSeriesData(geoCoordMap, data) {
		let temp = []
		for(let i = 0; i < data.length; i++) {
			let geoCoord = geoCoordMap[data[i].name];
			if(geoCoord) {
				temp.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value, data[i].level)
				})
			}
		}
		return temp
	}

	render() {
		return(
			<div ref={ref => this.chartRef = ref} style={this.mapStyle}>
      </div>
		)
	}
}

export default YunchengMap;
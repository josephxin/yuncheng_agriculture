/**
 * Created by admin on 2018-12-14.
 */
import React from 'react';
import echarts from 'echarts';

import chinaJson from './json/china.json';
import shandongJson from './json/shandong.json';
import weifangJson from './json/weifang.json';
import priceMapSymbol from './price-map-symbol.png';
import tooltipBg from './grow-map-tooltip-bg.png';
import { api } from '../api.js';

class ChinaMap extends React.Component {
	constructor(props) {
		super();
		this.state = {
			data: [],
			dd: {},
			tooltipParamIsTree:false,
			dataObj: {
				"china": [{
						name: "北京",
						value: 177,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "天津",
						value: 42,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "河北",
						value: 102,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "山西",
						value: 81,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "内蒙古",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "辽宁",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "吉林",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "黑龙江",
						value: 66,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "上海",
						value: 24,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "江苏",
						value: 92,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "浙江",
						value: 114,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "安徽",
						value: 109,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "福建",
						value: 116,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "江西",
						value: 91,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "山东",
						value: 119,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "河南",
						value: 137,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "湖北",
						value: 116,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "湖南",
						value: 114,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "重庆",
						value: 91,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "四川",
						value: 125,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "贵州",
						value: 62,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "云南",
						value: 83,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "西藏",
						value: 9,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "陕西",
						value: 80,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "甘肃",
						value: 56,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "青海",
						value: 10,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "宁夏",
						value: 18,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "新疆",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "广东",
						value: 123,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "广西",
						value: 59,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "海南",
						value: 14,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					}
				],
				"shandong": [{
						"name": "烟台市",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "临沂市",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "潍坊市",
						value: 37,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "青岛市",
						value: 27,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "菏泽市",
						value: 167,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "济宁市",
						value: 80,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "德州市",
						value: 70,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "滨州市",
						value: 10,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "聊城市",
						value: 56,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "东营市",
						value: 37,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "济南市",
						value: 89,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "泰安市",
						value: 90,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "威海市",
						value: 123,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "日照市",
						value: 145,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "淄博市",
						value: 111,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "枣庄市",
						value: 56,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						"name": "莱芜市",
						value: 23,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
				],
				"weifang": [{
						name: "青州市",
						value: 177,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "奎文区",
						value: 42,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "昌乐县",
						value: 102,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "潍城区",
						value: 81,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "坊子区",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "临朐县",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "安丘市",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "高密市",
						value: 81,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "诸城市",
						value: 47,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "寒亭区",
						value: 67,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "昌邑市",
						value: 82,
						area: 100,
						yield: 200,
						areaNum: 1,
						yieldNum: 1,
						varieties: '黄瓜'
					},
					{
						name: "寿光市",
						value: 82,
						area: 100,
						yield: 200,
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
		//this.pp = ''
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
		let [maxV, minV] = this.getMinAndMaxV(dataObj['china']);
		this.maxV = maxV;
		this.minV = minV;
		if(dataObj) {
			this.initMap(dataObj['china'])
		}
	}

	/*初始化地图*/
	initMap(d) {
		echarts.registerMap('china', chinaJson);
		this.extendsMap('chart', {
			mapName: 'china', // 地图名
			goDown: true, // 是否下钻
			// 下钻回调
			callback: function(name, option, instance) {
				//  console.log(name, option, instance);
			}
		}, d)
	}

	/*下钻重绘*/
	extendsMap(id, opt, d) {
		let me = this;
		let chart = me.chart;

		let areaMap = {
			"china": '中国',
			"shandong": '山东',
			"weifang": '潍坊市'
		};

		let cityMap = {
			"中国": chinaJson,
			"山东": shandongJson,
			"潍坊市": weifangJson
		};

		let weifangCoordMap = {
			'青州市': [118.484693, 36.697855],
			'奎文区': [119.137357, 36.709494],
			'昌乐县': [118.839995, 36.703253],
			'潍城区': [119.103784, 36.710062],
			'坊子区': [119.166326, 36.654616],
			'临朐县': [118.539876, 36.516371],
			'安丘市': [119.206886, 36.427417],
			'高密市': [119.757033, 36.37754],
			'诸城市': [119.403182, 35.997093],
			'寒亭区': [119.207866, 36.772103],
			'昌邑市': [119.394502, 36.854937],
			'寿光市': [118.736451, 36.874411]
		};

		let chinaCoordMap = {
			'湖南': [111.5332, 27.3779],
			'吉林': [125.7746, 43.5938],
			'河北': [115.4004, 38.2288],
			'北京': [116.4551, 40.2539],
			'山东': [118.7402, 36.4307]
		};

		let shanDongCoordMap = {
			'烟台市': [120.7397, 37.5128],
			'潍坊市': [119.0918, 36.524],
			'滨州市': [117.8174, 37.4963],
			'泰安市': [117.0264, 36.0516],
			'莱芜市': [117.6526, 36.2714]
		};

		let cityToPinyin = {
			'中国': 'china',
			'山东': 'shandong',
			'潍坊市': 'weifang'
		};

		let levelColorMap = {
			'1': 'rgba(241, 109, 115, .8)',
			'2': 'rgba(255, 235, 59, .7)',
			'3': 'rgba(147, 235, 248, 1)'
		};

		let defaultOpt = {
			mapName: 'china', // 地图展示
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
		let name = [opt.mapName];//'china'
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
			 * i 实例对象
			 * o option
			 * n 地图名
			 * d 数据
			 **/
			resetOption: function(i, o, n, d) {
				i.clear();
				//console.log(n);
				//this.pp = n;
				let breadcrumb = this.createBreadcrumb(n, d);
				let j = name.indexOf(n);
				let l = o.graphic.length;
				if(j < 0) {
					o.graphic.push(breadcrumb);
					o.graphic[0].children[0].shape.x2 += pos.xDistance;
					o.graphic[0].children[1].shape.x2 += pos.xDistance;
					name.push(n);
					idx++
				} else {
					o.graphic.splice(j + 2, l);
					o.graphic[0].children[0].shape.x2 = (j + 1) * pos.xDistance;
					o.graphic[0].children[1].shape.x2 = (j + 1) * pos.xDistance;
					name.splice(j + 1, l);
					idx = j;
					pos.leftCur -= pos.leftPlus * (l - j - 1)
				}

				/*下钻symbol设置*/
				let goord;
				if(n.indexOf('shandong') !== -1) {
					goord = shanDongCoordMap
					//console.log(shanDongCoordMap)
				} else if(n.indexOf('weifang') !== -1) {
					goord = weifangCoordMap
				} else if(n.indexOf('china') !== -1) {
					goord = chinaCoordMap
				}
				//o.series[0].data = me.initSeriesData(goord, me.dataObj[n]);

				o.series[1].map = n;
				o.series[1].data = d;
				let visualRange = me.getMinAndMaxV(d);
				o.visualMap.min = visualRange[1];
				o.visualMap.max = visualRange[0];

				o.geo[0].map = n;
				o.geo[1].map = n;
				o.geo[0].zoom = 0.3;
				o.geo[1].zoom = 0.3;
				//console.log(o);
				i.setOption(o);
				this.zoomAnimation();
				//console.log(opt);
				opt.callback(n, o, i);
				me.props.getProductionRankingMapInfo(n);
				if(n=='weifang'){
					me.state.tooltipParamIsTree = true
				}else{
					me.state.tooltipParamIsTree = false
				}
			},

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
							handleEvents.resetOption(chart, option, name, d);
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
							handleEvents.resetOption(chart, option, name, d)
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
							handleEvents.resetOption(chart, option, name, d)
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
						str += `<p style="height: 30px;margin-top:10px;font-size: 15px; font-weight:500;color: #fff;">种植面积：${data.area?data.area:'--'}${me.state.tooltipParamIsTree?'亩':'万亩'}&nbsp;|&nbsp;第${data.areaNum?data.areaNum:'--'}名</p>`;
						str += `<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">产量：${data.yield?data.yield:'--'}${me.state.tooltipParamIsTree?'吨':'万吨'}&nbsp;|&nbsp;第${data.yieldNum?data.yieldNum:'--'}名</p>`;
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
							handleEvents.resetOption(chart, option, name[0], d)
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
							handleEvents.resetOption(chart, option, name[0], d)
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
							handleEvents.resetOption(chart, option, name[0], d)
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
					zoom: 1.2,
					aspectScale: 0.9,
					top: '15%',
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
					aspectScale: 0.90,
					top: '15%',
					zoom: 1.2,
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
					//data: this.initSeriesData(chinaCoordMap, this.dataObj['china'])
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

		let keyAndV = this.getArrayObjK(this.state.dataObj['weifang']);
		//console.log(keyAndV)
		// 事件监听
		chart.off('click');
		chart.on('click', (params) => {
			//console.log(params);
			//console.log(option);
			this.setState({
				dd: option
			})
			//this.pp = option.series[1].map;
			let paramsName = cityToPinyin[params.name]
			let value = cityMap[params.name];
			if(keyAndV[0].indexOf(params.name) !== -1) {
				let keys = weifangCoordMap[params.name]
			}
			if(opt.goDown && paramsName !== name[idx]) {
				if(value) {
					//console.log(paramsName)
					let eachartData = this.state.dataObj[paramsName];
					echarts.registerMap(paramsName, value);
					handleEvents.resetOption(chart, option, paramsName, eachartData)
				}
			}
		});
		return chart
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

export default ChinaMap
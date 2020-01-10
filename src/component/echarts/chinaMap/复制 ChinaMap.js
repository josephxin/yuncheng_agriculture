/**
 * Created by admin on 2018-12-14.
 */
import React from 'react';
import echarts from 'echarts';
import { message } from 'antd';
import './mapNav.scss';
import Mapping from './mapping.js';
import priceMapSymbol from './price-map-symbol.png';
import tooltipBg from './price-tooltip-bg.png';
import * as Tool from '../../../tool/tool.js';

class ChinaMap extends React.Component {
	constructor(props) {
		super();
		this.state = {
			nav: [],
		};
		this.mapStyle = {
			position: 'absolute',
			width: `${props.width || 400}px`,
			height: `${props.height || 400}px`,
			left: `${props.left || 0}px`,
			top: `${props.top || 0}px`,
		}
		this.priceMax = 0;

		this.currentMap = { //当前地图
			name: '中国',
			pname: 'china',
			type: 'country'
		}
		this.callBackParams = { //回传参数
			province: '',
			city: '',
			county: ''
		}

		this.markerData = [];
		this.regionData = [];
	}
	componentDidMount() {
		this.initChart();
	}
	initChart() {
		this.chart = echarts.init(this.chartRef);
		this.setRegion();
		this.setMap();
		this.chart.on('click', (params) => {
			//console.log(params);
			if(params.seriesIndex === 0) {
				this.markerClick(params);
			}
			if(params.seriesIndex === 1) {
				this.regionClick(params);
			}
		});

	}
	// 设置标点
	setMarker(object) {
		//console.log(object);
		this.markerData = [];
		for(var key in object) {
			object[key].map((item, i) => {
				this.markerData.push({
					sid: item.marketId,
					name: item.name,
					value: item.coordinate,
					category: item.category,
					price: item.price,
					date: item.dateTime,
					stockNum: item.stockNum
				});
			});
		}
		//console.log(this.markerData);
		this.setOption();
	}
	setRegion(array) {
		//console.log('区域接口数据', array);
		array = array || [];
		this.priceMax = 0; //必须写，初始化
		let typeObj = {
			country: 'province',
			province: 'city',
			city: 'county'
		};
		let type = typeObj[this.currentMap.type];
		//console.log('原始数据', this.currentMap, Mapping[this.currentMap.pname]); //原始数据
		this.regionData = Tool.cloneFn(Mapping[this.currentMap.pname] || []);
		this.regionData.map((item, i) => {
			item.type = type || '';
			array.map((item2, j) => {
				if(item.name === item2.name) {
					item.value = item2.value;
				}
			})
			if(item.value > this.priceMax) {
				//console.log('进入判断');
				this.priceMax = item.value;
			}
			//console.log(this.priceMax);
		});
		//console.log('克隆并且处理后的数据', this.regionData); //克隆并且处理后的数据
		if(this.regionData.length > 0) {
			this.setOption();
		}
	}

	setOption() {
		//console.log(this.priceMax);
		let pname = this.currentMap.pname,
			markerData = this.markerData,
			regionData = this.regionData;
		//console.log(pname, markerData, regionData);
		if(!pname) {
			return false;
		}
		let option = {
			tooltip: {
				show: false,
				type: 'item',
				formatter: ''
			},
			visualMap: {
				type: 'continuous',
				show: true,
				min: 0,
				max: 10,
				left: '0%',
				top: 'bottom',
				text: ['价格：元/公斤', ''],
				calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
				seriesIndex: [1],
				inRange: {
					color: ['#03bdfd', '#009dff']
				},
				itemWidth: 10,
				itemHeight: 70,
				textStyle: {
					color: '#eee'
				}
			},
			geo: [{
					map: pname,
					zoom: 1.1,
					regions: [{
						name: "\u5357\u6D77\u8BF8\u5C9B",
						value: 0,
						itemStyle: {
							normal: {
								opacity: 0,
								label: {
									show: false
								}
							}
						}
					}],
					aspectScale: 0.9,
					top: '15%',
					silent: true,
					label: {
						normal: {
							show: false
						},
						emphasis: {}
					},
					itemStyle: {
						normal: {
							areaColor: '#206cd2',
							borderWidth: 0,
						},
						emphasis: {}
					}
				},
				{
					map: pname,
					aspectScale: 0.9,
					top: '12%',
					zoom: 1.1,
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
							areaColor: '#03bdfd',
							borderColor: '#fff',
							borderWidth: 1,
						},
						emphasis: {
							areaColor: '#02b270',
							borderColor: '#13fafc',
							borderWidth: 1,
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
							let str = ''
							if(!d.data.stockNum) {
								str = `<div style="min-width: 177px;height: 134px;display:inline-block;padding: 7px;position: relative"><i style="display: inline-block;position: absolute;top: 0;left: 0;width: 30%;height: 100%;border-left: 1px solid #fff;border-top: 1px solid #fff;"></i> <div style="display:inline-block;background:linear-gradient(#123c6f, #122a5b);border:1px solid #03faf6;padding: 15px 20px;">
									<p style="height: 30px;line-height: 30px;font-size: 16px; font-weight:500;color: #fff;">${d.data.name}</p>
									<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">${d.data.category}：${d.data.price}元/公斤</p>
									<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">日期：${d.data.date}</p></div></div>`;
							} else {
								str = `<div style="min-width: 177px;height: 134px;display:inline-block;padding: 7px;position: relative"><i style="display: inline-block;position: absolute;top: 0;left: 0;width: 30%;height: 100%;border-left: 1px solid #fff;border-top: 1px solid #fff;"></i> <div style="display:inline-block;background:linear-gradient(#123c6f, #122a5b);border:1px solid #03faf6;padding: 15px 20px;">
									<p style="height: 30px;line-height: 30px;font-size: 16px; font-weight:500;color: #fff;">${d.data.name}</p>
									<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">库存：${d.data.stockNum}吨</p>
									<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">${d.data.category}：${d.data.price}元/公斤</p>
									<p style="height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">日期：${d.data.date}</p></div></div>`;
							}

							return str;
						}
					},
					geoIndex: 1,
					data: markerData
				},
				{
					name: '价格',
					type: 'map',
					map: pname,
					geoIndex: 1,
					data: regionData
				}
			]
		}
		this.chart.setOption(option);
	}
	
	//标点点击
	markerClick(params) {
		if(typeof this.props.markerClick == 'function') {
			this.props.markerClick(params);
		}
	}
	//区域点击
	regionClick(params) {
		params.data = params.data || {};
		let pname = params.data.pname || '',
			type = params.data.type || '';
		this.currentMap = {
			pname: pname,
			name: params.name,
			type: type
		};
		console.log(this.currentMap);
		this.setMap();
	}
	// 设置地图
	setMap() {
		let me = this;
		let type = me.currentMap.type || '';
		let pname = me.currentMap.pname || '';
		me.markerData = []; //清空marker点
		if(type == 'country') {
			fn();
		} else if(type == 'province') {
			if(pname) {
				fn();
			} else {
				message.info('该地区无法下钻！');
			}
		} else if(type == 'city') {
			if(pname == 'weifang') {
				fn();
			} else {
				message.info('该地区无法下钻！');
			}
		} else if(type == 'county') {
			me.mapChange();
		} else {
			message.info('该地区无法下钻！');
		}

		function fn() {
			let mapJson = require('./json/' + pname + '.json');
			echarts.registerMap(pname, mapJson);
			me.setOption();
			me.mapChange();
		}
	}

	mapChange() {
		let type = this.currentMap.type,
			name = this.currentMap.name;
		//console.log(type, name);
		if(type == 'country') {
			this.callBackParams.province = '';
			this.callBackParams.city = '';
			this.callBackParams.county = '';
		}
		if(type == 'province') {
			this.callBackParams.city = '';
			this.callBackParams.county = '';
		}
		if(type == 'city') {
			this.callBackParams.county = '';
		}
		if(type) {
			this.callBackParams[type] = name;
		}
		this.props.mapChange(this.callBackParams);
	}
	render() {
		return(
			<div>
	      <div ref={ref=>this.chartRef=ref} style={this.mapStyle}></div>
	    </div>
		)
	}
}

export default ChinaMap
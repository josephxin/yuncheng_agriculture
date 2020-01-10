import React from 'react';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-harmonious';

import './css/countrySide.scss';

//弹出框
import Dialog from '../../component/dialog/Dialog';

/*引入antd框架*/
import { Table, Carousel, Button, Checkbox } from 'antd';

/*引入下拉选择框*/
import Select from '../../component/select/Select';
import UlList from './assembly/ulList.js';

//地图
import CenterMap from '../../component/map-component/center-map/harmonious_map';

//引入假数据
import demoData from './demoData.js';

/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, cloneFn, formatParams } from '../../tool/tool.js';

//引入组件
import Panel from '../../component/panel/Panel';
import Pie from './charts/Pie.js';
import DiyPie from '../../component/echarts/diyCharts/Pie';
import ServiceTrendsBar from "./charts/serviceTrendsBar";
import Ring from "./charts/ring";
import TextPage2 from '../../component/text/TextPage2.js';
import Observation from '../../component/window/Observation3';
import ObservationDetails from '../../component/window/ObservationDetails3';
import GisMap from '../../component/map-component/gisMap/gisMap3';
import MarkPoint from '../../component/window/MarkPoint';
import Table7 from '../../component/table/Table7';
//引入图片
import suyuan from './img/suyuan.png';

class harmonious extends React.Component {
	constructor() {
		super();
		this.state = {
			isEchertsMap: true,
			gisTitle: '村委会分布',
			healthServiceData: demoData.healthServiceData,
			educationalResourcesData: demoData.educationalResourcesData,
			//村详情
			quxian: '',
			xiangzhen: '',
			cun: '',
			waterSourceSelect: [], //饮用水来源-选中的值
			//乡村文化弹窗
			dialogXcwhTitle: '',
		};
		this.pieColor = ['#349dff', '#28dd5f', '#fff220', '#fd296f', '#01cfff'];
		this._tokens = [];
		this.regionType = ['1', '2', '3'];
		//主页
		this.indexPage = {
			pageNum: 1,
			pageSize: 5
		};
		this.indexRegion = {
			quxian: '',
			xiangzhen: '',
			cun: '',
		};
		//GIS页面
		this.gisPage = {
			pageNum: 1,
			pageSize: 15
		};
		this.gisRegion = {
			quxian: '',
			xiangzhen: '',
			cun: '',
		};
		this.lng = 110.98;
		this.lat = 35.02;
		this.cunId = -1;
		//除GIS页面外的其他下钻页面（乡村文化，餐饮住宿）
		this.dialogPage = {
			pageNum: 1,
			pageSize: 10
		};
		this.dialogRegion = {
			quxian: '',
			xiangzhen: '',
			cun: '',
		};
		//村详情
		this.waterSource = demoData.waterSource; //饮用水来源
		this.agrProPage = {
			pageNum: 1,
			pageSize: 10
		}; //村详情-特色农产品-页码
		this.agrInputsPage = {
			pageNum: 1,
			pageSize: 10
		}; //村详情-农业投入品-页码
	}

	/**
	 * 首页图表接口
	 */
	/**村委会分布*/
	selectDistributionVillageCommittees() {
		this._tokens.push(api.selectDistributionVillageCommittees.send({
			...this.indexRegion,
			...this.indexPage,
		}).then((res) => {
			if(window.debugging) console.log('村委会分布', res);
			if(res.list.length > 0 && res.list) {
				let dataList = [];
				res.list.forEach((item, index) => {
					dataList.push({
						name: item.cun,
						address: item.latitude + ' / ' + item.longitude
					})
				});
				this.refs.ulList.setData({
					ulList: dataList
				});
			}
		}));
	}

	//通信服务网点
	getSelectCommunicationService(d) {
		this._tokens.push(api.selectCommunicationService.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('通信服务网点', res);
			let data = res.data;
			let legendData = [];
			let chartData = [];
			let sum = 0;
			data.map((item, i) => {
				legendData.push(item.type);
				chartData.push([{
					name: item.type,
					value: item.num,
				}]);
				sum += item.num;
			});
			chartData.map((item, i) => {
				item.push({
					name: '',
					value: sum - item[0].value,
				});
			});
			this.txfwRef.setData({
				legendData: legendData,
				seriesData: chartData
			});
		}));
	}

	//餐饮住宿
	getCyzsData(d) {
		this._tokens.push(api.selectCateringAccommodation.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('餐饮住宿', res);
			if(res.data.length > 0 && res.data) {
				let data = res.data;
				let legendData = [];
				let chartData = [];
				let sum = 0;
				data.map((item, i) => {
					legendData.push(item.type);
					chartData.push([{
						name: item.type,
						value: item.num,
					}]);
					sum += item.num;
				});
				chartData.map((item, i) => {
					item.push({
						name: '',
						value: sum - item[0].value,
					});
				});
				this.cyzsRef.setData({
					legendData: legendData,
					seriesData: chartData
				});
			}
		}));
	}

	/**技术服务*/
	selectTechnicalService() {
		this._tokens.push(api.selectTechnicalService.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('技术服务', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.number
				});
			});
			let options = {
				seriesData: series,
			};
			this.pieWaterOne.setData(options);
		}));
	};

	/**公共服务*/
	selectPublicService() {
		this._tokens.push(api.selectPublicService.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('公共服务', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: parseFloat(item.percent)
				});
			});
			let options = {
				seriesData: series,
				onlyShowPercent: true
			};
			this.pieWaterTwo.setData(options);
		}));
	};

	//购物服务
	selectShoppingService() {
		let me = this;
		this._tokens.push(api.selectShoppingService.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('购物服务', res);
			let dataSeries = [];
			let picOption = {};
			if(!res.data || res.data.length == 0) {
				picOption = {
					color: this.pieColor,
					series: dataSeries
				};
			} else {
				res.data.map((item, i) => {
					if(item.name !== '') {
						let itemArr = {
							name: item.type,
							value: item.num
						};
						dataSeries.push(itemArr)
					}
				});
			}
			picOption = {
				color: this.pieColor,
				series: dataSeries
			};
			me.landAreaRatioRef.initChart(picOption);
		}));
	}

	//乡村文化
	selectRuralCulture() {
		this._tokens.push(api.selectRuralCulture.send({
			...this.indexRegion,
		}).then(res => {
			if(window.debugging) console.log('乡村文化', res);
			if(res.data.length > 0 && res.data) {
				let xData = [];
				let seriousData = [];
				res.data.forEach((item, index) => {
					xData.push(item.TYPE);
					seriousData.push(item.num);
				});
				let options = {
					xData: xData,
					seriousData: seriousData,
					interval: 0,
					rotate: 0,
				};
				this.barFef.setData(options)
			} else {
				this.barFef.setData({})
			}
		}))
	}

	//公用-地区改变
	siteSelectChange(type, prefix, e, selectedValue) { //1 'gis' {name: '河津市'} '下化乡'
		//console.log(type, prefix, e);
		let name = e.name;
		let xiangzhen = prefix + 'CountrysideRef';
		let cun = prefix + 'VillageRef';
		if(type == this.regionType[0]) { //区县
			if(name == "全部") {
				this[xiangzhen]._setList(['全部']);
			} else {
				//调用获取乡镇数据的方法
				this.getXiangZhenHandle(name, xiangzhen, selectedValue);
			}
			this[cun]._setList(['全部']);
		} else if(type == this.regionType[1]) { //乡镇
			if(name == "全部") {
				this[cun]._setList(['全部']);
			} else {
				//调用获取村数据的方法
				this.getAllCunHandle(name, cun, selectedValue);
			}
		}
	}

	//区县下拉
	getQuXianHandle() {
		this._tokens.push(apiAll.getQuXian.send({}).then((res) => {
			if(window.debugging) console.log('区县下拉', res);
			let data = res.data || [];
			data.unshift('全部');
			this.indexDistrictRef._setList(data); //主页
			this.gisDistrictRef._setList(data); //GIS地图
			this.xcwhDistrictRef._setList(data); //乡村文化
			this.cyzsDistrictRef._setList(data); //餐饮住宿
		}));
	}

	//乡镇下拉
	getXiangZhenHandle(d, ref, selectedValue) {
		this._tokens.push(apiAll.getXiangZhen.send({
			XqName: d
		}).then((res) => {
			if(window.debugging) console.log('乡镇下拉', res);
			let data = res.data || [];
			data.unshift('全部');
			this[ref]._setList(data);
			if(selectedValue) {
				this[ref]._setSelectedText(selectedValue);
			}
		}));
	}

	//村下拉
	getAllCunHandle(d, ref, selectedValue) {
		this._tokens.push(apiAll.getAllCun.send({
			XzName: d
		}).then((res) => {
			if(window.debugging) console.log('村下拉', res);
			let data = res.data || [];
			data.unshift('全部');
			this[ref]._setList(data);
			if(selectedValue) {
				this[ref]._setSelectedText(selectedValue);
			}
		}));
	}

	//中间总览统计图-卫生服务
	getWsfwData() {
		this.setState({
			healthServiceData: []
		});
		this._tokens.push(api.selectHealthService.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('中间总览统计图-卫生服务', res);
			let data = res.data;
			demoData.healthServiceData[0].value = data.hospitalNum;
			demoData.healthServiceData[1].value = data.menzhengNum;
			demoData.healthServiceData[2].value = data.pianfangNum;
			//console.log(demoData.healthServiceData);
			this.setState({
				healthServiceData: demoData.healthServiceData
			});
		}));
	}

	//中间总览统计图-教育资源
	getJyzyData() {
		this.setState({
			healthServiceData: []
		});
		this._tokens.push(api.selectEducationalResources.send({
			...this.indexRegion,
		}).then((res) => {
			if(window.debugging) console.log('中间总览统计图-教育资源', res);
			let data = res.data;
			demoData.educationalResourcesData[0].value = data.kindergartenNum;
			demoData.educationalResourcesData[1].value = data.primaryschoolNum;
			demoData.educationalResourcesData[2].value = data.juniormiddleschoolNum;
			demoData.educationalResourcesData[3].value = data.highschoolNum;
			//console.log(demoData.educationalResourcesData);
			this.setState({
				educationalResourcesData: demoData.educationalResourcesData
			});
		}));
	}

	//点击主页查询按钮
	handleClicks() {
		let quxian = this.indexDistrictRef._getText();
		let xiangzhen = this.indexCountrysideRef._getText();
		let cun = this.indexVillageRef._getText();
		this.indexRegion.quxian = quxian == '全部' ? '' : quxian;
		this.indexRegion.xiangzhen = xiangzhen == '全部' ? '' : xiangzhen;
		this.indexRegion.cun = cun == '全部' ? '' : cun;
		this.showNewPage();
	}

	//点击地图区县
	gisMapShow(d) {
		let name = d.name;
		this.siteSelectChange(1, 'index', d);
		this.indexDistrictRef._setSelectedText(name);
		this.indexRegion.quxian = name;
		this.indexRegion.xiangzhen = '';
		this.indexRegion.cun = '';
		this.showNewPage();
	}

	//点击运城市
	selectAllData() {
		let params = {
			name: '全部'
		};
		this.siteSelectChange(1, 'index', params);
		this.indexDistrictRef._setSelectedText('全部');
		this.indexRegion.quxian = '';
		this.indexRegion.xiangzhen = '';
		this.indexRegion.cun = '';
		this.showNewPage();
	}

	showNewPage() {
		this.selectDistributionVillageCommittees(); //村委会分布
		this.getSelectCommunicationService(); //通信服务网点
		this.selectTechnicalService(); //技术服务
		this.selectPublicService(); //公共服务
		this.selectShoppingService(); //购物服务
		this.selectRuralCulture(); //乡村文化
		this.getCyzsData(); //餐饮住宿
		this.getWsfwData(); //中间总览统计图-卫生服务
		this.getJyzyData(); //中间总览统计图-教育资源
	}

	componentDidMount() {
		this.getQuXianHandle(); //获取公用区县列表
		this.showNewPage();
	}

	componentWillUnmount() {
		this._clearTokens();
	};

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};
	
	//打开弹窗时，将弹窗区域检索条件与主页区域检索条件的值保持一致
	queryParamsHandle(prefix, paramsPrefix) {
		let quxian = this.indexRegion.quxian || '全部';
		let xiangzhen = this.indexRegion.xiangzhen || '全部';
		let cun = this.indexRegion.cun || '全部';
		this[prefix + 'DistrictRef']._setSelectedText(quxian);
		this.siteSelectChange(1, prefix, {
			name: quxian
		}, xiangzhen);
		this.siteSelectChange(2, prefix, {
			name: xiangzhen
		}, cun);
		this[paramsPrefix + 'Region'].quxian = this.indexRegion.quxian;
		this[paramsPrefix + 'Region'].xiangzhen = this.indexRegion.xiangzhen;
		this[paramsPrefix + 'Region'].cun = this.indexRegion.cun;
	}
	
	//公用-打开弹窗
	openDialog(prefix, fn) {
		this.refs[prefix + 'DialogRef']._open();
		this.dialogPage.pageNum = 1; //页码重置为1
		this.queryParamsHandle(prefix, 'dialog'); //组件前缀，参数前缀
		this[fn]();
	}
	
	//公用-关闭弹窗
	dialogClose(){
		this.indexRegion.quxian='';
		this.indexRegion.xiangzhen='';
		this.indexRegion.cun='';
		this.indexDistrictRef._setSelectedText('全部');
		this.siteSelectChange(1, 'index', {
			name: '全部'
		});
		this.showNewPage();
	}
	
	//公用-点击查询按钮
	queryHandle(prefix, fn) {
		this.dialogPage.pageNum = 1;
		let quxian = this[prefix + 'DistrictRef']._getText();
		let xiangzhen = this[prefix + 'CountrysideRef']._getText();
		let cun = this[prefix + 'VillageRef']._getText();
		this.dialogRegion.quxian = quxian == '全部' ? '' : quxian;
		this.dialogRegion.xiangzhen = xiangzhen == '全部' ? '' : xiangzhen;
		this.dialogRegion.cun = cun == '全部' ? '' : cun;
		this[fn]();
	}
	//公用-分页
	pagenationHandle(fn, page) {
		//console.log(fn, page);
		this.dialogPage.pageNum = page;
		this[fn]();
	}
	
	//打开GIS地图
	showGisHandle(gisTitle) {
		let me = this;
		let markPointList = [];

		this.queryParamsHandle('gis', 'gis');

		me.setState({
			isEchertsMap: false,
			gisTitle: gisTitle
		});
		setTimeout(() => {
			//重新绘制gis的大小
			me.GisMapRef.checkResize();
			/*清除所有覆盖物*/
			me.GisMapRef.clearOverLays();
			let geoCoord = me._centerMapRef._getGeoCoord(me.indexRegion.quxian); //数组或undefined
			//console.log(geoCoord);
			if(geoCoord) {
				me.GisMapRef.centerTo(geoCoord[0], geoCoord[1], 16); //定位到当前区县的县政府
			} else {
				me.GisMapRef.centerTo(me.lng, me.lat, 16);
			}
		});
		if(gisTitle == '村委会分布') {
			this.getCwhGisList(true); //true 只有打开GIS窗口时才渲染marker（村），分页和查询不重复渲染
		} else if(gisTitle == '卫生服务分布') {
			markPointList = demoData.markPointWsfw;
			this.getWsfwGisHead();
			this.getWsfwGisList(true);
			this.getWsfwGisMarker();
		} else if(gisTitle == '教育资源分布') {
			markPointList = demoData.markPointJyzy;
			this.getJyzyGisHead();
			this.getJyzyGisList(true);
			this.getJyzyGisMarker();
		} else if(gisTitle == '技术服务分布') {
			this.gisPage.pageSize = 14; //由于头部占用了一定的高度，所以减少每页的条数
			markPointList = demoData.markPointJsfw;
			this.getJsfwGisHead();
			this.getJsfwGisList(true);
			this.getJsfwGisMarker();
		} else if(gisTitle == '通信服务分布') {
			this.getTxfwGisHead();
			this.getTxfwGisList(true);
		}
		me.MarkPointRef.setData({
			dataList: markPointList
		});
	}

	//关闭GIS地图
	backToEchartsMap() {
		this.gisPage.pageNum = 1;
		this.dialogClose();
		
		this.ObservationDetailsRef.closeDetails();
		this.setState({
			isEchertsMap: true,
		});
	}

	//点击GIS查询按钮
	gisQueryHandle() {
		//关闭详情弹窗
		this.ObservationDetailsRef.closeDetails();
		//参数处理
		this.gisPage.pageNum = 1;
		let quxian = this.gisDistrictRef._getText();
		let xiangzhen = this.gisCountrysideRef._getText();
		let cun = this.gisVillageRef._getText();
		this.gisRegion.quxian = quxian == '全部' ? '' : quxian;
		this.gisRegion.xiangzhen = xiangzhen == '全部' ? '' : xiangzhen;
		this.gisRegion.cun = cun == '全部' ? '' : cun;
		//调接口
		let gisTitle = this.state.gisTitle;
		switch(gisTitle) {
			case '村委会分布':
				this.getCwhGisList();
				break;
			case '卫生服务分布':
				this.getWsfwGisHead();
				this.getWsfwGisList();
				break;
			case '教育资源分布':
				this.getJyzyGisHead();
				this.getJyzyGisList();
				break;
			case '技术服务分布':
				this.getJsfwGisHead();
				this.getJsfwGisList();
				break;
			case '通信服务分布':
				this.getTxfwGisHead();
				this.getTxfwGisList();
				break;
		}
		//定位中心点
		let geoCoord = this._centerMapRef._getGeoCoord(quxian); //数组或undefined
		//console.log(geoCoord);
		if(geoCoord) {
			this.GisMapRef.centerTo(geoCoord[0], geoCoord[1], 16); //定位到当前区县的县政府
		} else {
			this.GisMapRef.centerTo(this.lng, this.lat, 16);
		}
	}

	//村委会分布
	getCwhGisList(isFirst) {
		this._tokens.push(api.selectDistributionVillageCommittees.send({
			...this.gisRegion,
			...this.gisPage
		}).then((res) => {
			if(window.debugging) console.log('GIS-村委会分布-list', res);
			let list = res.list;
			let totalCount = res.total;
			let tbody = [];
			let marker = [];
			this.ObservationRef.setData1([{
				name: '村',
				num: totalCount,
				unit: '个',
			}], 24);
			list.map((t, i) => {
				let lng = Number(t.longitude) || this.lng;
				let lat = Number(t.latitude) || this.lat;
				tbody.push([t.cun, t.village_head, lng, lat, t.quxian, t.xiangzhen, t.id]);
				marker.push({
					key: t.id,
					type: 'cun',
					name: t.cun,
					pointX: lng,
					pointY: lat
				});
			});
			let tableData = {
				thead: ['村名', '村长姓名', '详情'],
				tbody: tbody,
				width: [170],
				pagination: {
					...this.gisPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.ObservationRef.setData2(tableData);
			if(isFirst) {
				this.GisMapRef.drawShape(marker);
			}
		}));
	}

	//卫生服务分布
	getWsfwGisHead() {
		this._tokens.push(api.selectHealthService.send(this.gisRegion).then((res) => {
			if(window.debugging) console.log('GIS-卫生服务分布-head', res);
			let data = res.data;
			this.ObservationRef.setData1([{
				name: '医院',
				num: data.hospitalNum,
				unit: '家',
			}, {
				name: '门诊',
				num: data.menzhengNum,
				unit: '家',
			}, {
				name: '农村民间偏方',
				num: data.pianfangNum,
				unit: '家',
			}]);
		}));
	}
	getWsfwGisList(isFirst) {
		this._tokens.push(api.selectHealthServiceList.send({
			...this.gisRegion,
			...this.gisPage
		}).then((res) => {
			if(window.debugging) console.log('GIS-卫生服务分布-list', res);
			let list = res.list;
			let totalCount = res.total;
			let tbody = [];
			let marker = [];
			list.map((t, i) => {
				let lng = Number(t.longitude) || this.lng;
				let lat = Number(t.latitude) || this.lat;
				tbody.push([t.cun, t.village_leader, lng, lat, t.quxian, t.xiangzhen, t.id]);
				marker.push({
					key: t.id,
					type: 'cun',
					name: t.cun,
					pointX: lng,
					pointY: lat
				});
			});
			let tableData = {
				thead: ['村名', '村长姓名', '详情'],
				tbody: tbody,
				width: [170],
				pagination: {
					...this.gisPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.ObservationRef.setData2(tableData);
			if(isFirst) {
				this.GisMapRef.drawShape(marker);
			}
		}));
	}
	getWsfwGisMarker() {
		this._tokens.push(api.selectHealthServiceCoordinatePoints.send({
			...this.gisRegion
		}).then((res) => {
			if(window.debugging) console.log('GIS-卫生服务分布-marker', res);
			let data = res.data || [];
			let marker = [];
			data.map((item, i) => {
				let lng = Number(item.longitude);
				let lat = Number(item.latitude);
				if(lng && lat) {
					marker.push({
						key: i,
						type: item.type,
						name: item.name,
						pointX: lng,
						pointY: lat
					});
				}
			});
			this.GisMapRef.drawShape(marker);
		}));
	}

	//教育资源分布
	getJyzyGisHead() {
		this._tokens.push(api.selectEducationalResources.send(this.gisRegion).then((res) => {
			if(window.debugging) console.log('GIS-教育资源分布-head', res);
			let data = res.data;
			this.ObservationRef.setData1([{
				name: '高中',
				num: data.highschoolNum,
				unit: '所',
			}, {
				name: '初中',
				num: data.juniormiddleschoolNum,
				unit: '所',
			}, {
				name: '小学',
				num: data.primaryschoolNum,
				unit: '所',
			}, {
				name: '幼儿园',
				num: data.kindergartenNum,
				unit: '所',
			}]);
		}));
	}
	getJyzyGisList(isFirst) {
		this._tokens.push(api.selectEducationalResourcesList.send({
			...this.gisRegion,
			...this.gisPage
		}).then((res) => {
			if(window.debugging) console.log('GIS-教育资源分布-list', res);
			let list = res.list;
			let totalCount = res.total;
			let tbody = [];
			let marker = [];
			list.map((t, i) => {
				let lng = Number(t.longitude) || this.lng;
				let lat = Number(t.latitude) || this.lat;
				tbody.push([t.cun, t.contacts, lng, lat, t.quxian, t.xiangzhen, t.id]);
				marker.push({
					key: t.id,
					type: 'cun',
					name: t.cun,
					pointX: lng,
					pointY: lat
				});
			});
			let tableData = {
				thead: ['村名', '村长姓名', '详情'],
				tbody: tbody,
				width: [170],
				pagination: {
					...this.gisPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.ObservationRef.setData2(tableData);
			if(isFirst) {
				this.GisMapRef.drawShape(marker);
			}
		}));
	}
	getJyzyGisMarker() {
		this._tokens.push(api.selectEducationalResourcesPoints.send({
			...this.gisRegion
		}).then((res) => {
			if(window.debugging) console.log('GIS-教育资源分布-marker', res);
			let data = res.data || [];
			let marker = [];
			data.map((item, i) => {
				let lng = Number(item.longitude);
				let lat = Number(item.latitude);
				if(lng && lat) {
					marker.push({
						key: i,
						type: item.type,
						name: item.name,
						pointX: lng,
						pointY: lat
					});
				}
			});
			//console.log(marker)
			this.GisMapRef.drawShape(marker);
		}));
	}

	//技术服务分布
	getJsfwGisHead() {
		this._tokens.push(api.selectTechnicalService.send(this.gisRegion).then((res) => {
			if(window.debugging) console.log('GIS-技术服务分布-head', res);
			let data = res.data;
			let markPointJsfw = cloneFn(demoData.markPointJsfw);
			markPointJsfw.map((item, i) => {
				delete item.src;
				item.num = 0;
				item.unit = '个';
				data.map((t, j) => {
					if(item.name == t.type) {
						item.num = t.number;
					}
				});
			});
			this.ObservationRef.setData1(markPointJsfw);
		}));
	}
	getJsfwGisList(isFirst) {
		this._tokens.push(api.selectTechnicalServiceList.send({
			...this.gisRegion,
			...this.gisPage
		}).then((res) => {
			if(window.debugging) console.log('GIS-技术服务分布-list', res);
			let list = res.list;
			let totalCount = res.total;
			let tbody = [];
			let marker = [];
			list.map((t, i) => {
				let lng = Number(t.longitude) || this.lng;
				let lat = Number(t.latitude) || this.lat;
				tbody.push([t.cun, t.contacts, lng, lat, t.quxian, t.xiangzhen, t.id]);
				marker.push({
					key: t.id,
					type: 'cun',
					name: t.cun,
					pointX: lng,
					pointY: lat
				});
			});
			let tableData = {
				thead: ['村名', '村长姓名', '详情'],
				tbody: tbody,
				width: [170],
				pagination: {
					...this.gisPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.ObservationRef.setData2(tableData);
			if(isFirst) {
				this.GisMapRef.drawShape(marker);
			}
		}));
	}
	getJsfwGisMarker() {
		this._tokens.push(api.selectTechnicalServicePoints.send({
			...this.gisRegion
		}).then((res) => {
			if(window.debugging) console.log('GIS-技术服务分布-marker', res);
			let data = res.data || [];
			let marker = [];
			data.map((item, i) => {
				let lng = Number(item.longitude);
				let lat = Number(item.latitude);
				if(lng && lat) {
					marker.push({
						key: i,
						type: item.type,
						name: item.name,
						pointX: lng,
						pointY: lat
					});
				}
			});
			//console.log(marker)
			this.GisMapRef.drawShape(marker);
		}));
	}

	//通信服务分布
	getTxfwGisHead() {
		this._tokens.push(api.selectCommunicationServiceCount.send(this.gisRegion).then((res) => {
			if(window.debugging) console.log('GIS-通信服务分布-head', res);
			let data = res.data;
			this.ObservationRef.setData1([{
				name: '通宽带',
				num: data.kuandaiNum,
				unit: '个',
			}, {
				name: '手机信号覆盖',
				num: data.shoujixhfgNum,
				unit: '个',
			}]);
		}));
	}
	getTxfwGisList(isFirst) {
		this._tokens.push(api.selectCommunicationServiceList.send({
			...this.gisRegion,
			...this.gisPage
		}).then((res) => {
			if(window.debugging) console.log('GIS-通信服务分布-list', res);
			let list = res.list;
			let totalCount = res.total;
			let tbody = [];
			let marker = [];
			list.map((t, i) => {
				let lng = Number(t.longitude) || this.lng;
				let lat = Number(t.latitude) || this.lat;
				tbody.push([t.cun, t.village_leader, lng, lat, t.quxian, t.xiangzhen, t.id]);
				marker.push({
					key: t.id,
					type: 'cun',
					name: t.cun,
					pointX: lng,
					pointY: lat
				});
			});
			let tableData = {
				thead: ['村名', '村长姓名', '详情'],
				tbody: tbody,
				width: [170],
				pagination: {
					...this.gisPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.ObservationRef.setData2(tableData);
			if(isFirst) {
				this.GisMapRef.drawShape(marker);
			}
		}));
	}

	//GIS地图-左侧列表-分页回调
	gisDataPaginationCallback(page) {
		//console.log(page);
		this.gisPage.pageNum = page;
		//改变页码时，关闭GIS左侧列表详情
		this.ObservationDetailsRef.closeDetails();
		let gisTitle = this.state.gisTitle;
		if(gisTitle == '村委会分布') {
			this.getCwhGisList();
		} else if(gisTitle == '卫生服务分布') {
			this.getWsfwGisList();
		} else if(gisTitle == '教育资源分布') {
			this.getJyzyGisList();
		} else if(gisTitle == '技术服务分布') {
			this.getJsfwGisList();
		} else if(gisTitle == '通信服务分布') {
			this.getTxfwGisList();
		}
	}

	//点击GIS左侧列表，显示详情
	showObservationDetailsHandle(item) {
		//console.log(item);
		if(this.cunId != item[6]) {
			this.cunId = item[6];
			this.GisMapRef.centerTo(item[2], item[3]);
			let gisTitle = this.state.gisTitle;
			if(gisTitle == '村委会分布') {
				this.getGisDetailsCwh(item);
			} else if(gisTitle == '卫生服务分布') {
				this.getGisDetailsWsfw(item);
			} else if(gisTitle == '教育资源分布') {
				this.getGisDetailsJyzy(item);
			} else if(gisTitle == '技术服务分布') {
				this.getGisDetailsJsfw(item);
			} else if(gisTitle == '通信服务分布') {
				this.getGisDetailsTxfw(item);
			}
		}
	}
	getGisDetailsCwh(item) {
		//console.log(item);
		this.refs.dialogRefCunDetails._open();
		this.setState({
			quxian: item[4],
			xiangzhen: item[5],
			cun: item[0],
		}, () => {
			this.selectVillageDetailAjax();
			this.selectCharacteristicAgrProListAjax();
			this.selectAgriculturalInputsListAjax();
		});
	}
	getGisDetailsWsfw(item) {
		this._tokens.push(api.selectHealthService.send({
			quxian: item[4],
			xiangzhen: item[5],
			cun: item[0],
		}).then((res) => {
			if(window.debugging) console.log('GIS-卫生服务分布-details', res);
			let data = res.data;
			this.ObservationDetailsRef.openDetails(item[0], [
				['医院', data.hospitalNum],
				['门诊', data.menzhengNum],
				['农村民间偏方', data.pianfangNum]
			], '家');
		}));
	}
	getGisDetailsJyzy(item) {
		this._tokens.push(api.selectEducationalResources.send({
			quxian: item[4],
			xiangzhen: item[5],
			cun: item[0],
		}).then((res) => {
			if(window.debugging) console.log('GIS-教育资源分布-details', res);
			let data = res.data;
			this.ObservationDetailsRef.openDetails(item[0], [
				['高中', data.highschoolNum],
				['初中', data.juniormiddleschoolNum],
				['小学', data.primaryschoolNum],
				['幼儿园', data.kindergartenNum],
			], '所');
		}));
	}
	getGisDetailsJsfw(item) {
		this._tokens.push(api.selectTechnicalService.send({
			quxian: item[4],
			xiangzhen: item[5],
			cun: item[0],
		}).then((res) => {
			if(window.debugging) console.log('GIS-技术服务分布-details', res);
			let data = res.data;
			let markPointJsfw = cloneFn(demoData.markPointJsfw);
			let list = [];
			markPointJsfw.map((item, i) => {
				delete item.src;
				item.number = 0;
				data.map((t, j) => {
					if(item.name == t.type) {
						item.number = t.number;
					}
				});
			});
			markPointJsfw.map((item, i) => {
				list.push([item.name, item.number]);
			});
			//console.log(markPointJsfw, list);
			this.ObservationDetailsRef.openDetails(item[0], list, '个');
		}));
	}
	getGisDetailsTxfw(item) {
		this._tokens.push(api.selectCommunicationServiceCount.send({
			quxian: item[4],
			xiangzhen: item[5],
			cun: item[0],
		}).then((res) => {
			if(window.debugging) console.log('GIS-通信服务分布-details', res);
			let data = res.data;
			let kuandai = data.kuandaiNum ? '是' : '否';
			let shoujixhfg = data.shoujixhfgNum ? '是' : '否';
			let list = [
				['通宽带', kuandai],
				['手机信号覆盖', shoujixhfg],
			];
			this.ObservationDetailsRef.openDetails(item[0], list);
		}));
	}

	//关闭GIS详情
	closeDetails() {
		//初始化GIS左侧列表的active
		this.ObservationRef.initActive();
		this.cunId = -1;
	}

	//关闭村详情
	dialogCloseCunDetails() {
		this.closeDetails();
		this.agrProPage.pageNum = 1;
		this.agrInputsPage.pageNum = 1;
	}
	selectVillageDetailAjax() {
		this._tokens.push(api.selectVillageDetail.send({
			quxian: this.state.quxian,
			xiangzhen: this.state.xiangzhen,
			cun: this.state.cun,
		}).then((res) => {
			if(window.debugging) console.log('GIS-村详情-饮用水来源', res);
			let data = res.data;
			this.setState({
				waterSourceSelect: data.source
			});
		}));
	}
	selectCharacteristicAgrProListAjax() {
		this._tokens.push(api.selectCharacteristicAgrProList.send({
			quxian: this.state.quxian,
			xiangzhen: this.state.xiangzhen,
			cun: this.state.cun,
			...this.agrProPage,
		}).then((res) => {
			if(window.debugging) console.log('GIS-村详情-特色农产品', res);
			let list = res.list || [];
			let totalCount = res.total;
			let tbody = [];
			list.map((item, i) => {
				let lng = item.longitude;
				let lat = item.latitude;
				let lnglat = '';
				if(lng && lat) {
					lnglat = lng + '/' + lat;
				}
				tbody.push([item.type, item.ishave, item.company, item.chapingname, item.chanliang, item.contact, item.tel, lnglat]);
			});
			let tableData = {
				thead: ['特色农产品种类', '是否有加工后产品', '单位名称', '加工后产品名称', '产量', '联系人', '联系方式', '经纬度坐标'],
				tbody: tbody,
				width: [],
				pagination: {
					...this.agrProPage,
					totalCount: totalCount,
				}
			};
			this.agriculturalProductRef.setData(tableData);
		}));
	}
	selectAgriculturalInputsListAjax() {
		this._tokens.push(api.selectAgriculturalInputsList.send({
			quxian: this.state.quxian,
			xiangzhen: this.state.xiangzhen,
			cun: this.state.cun,
			...this.agrInputsPage,
		}).then((res) => {
			if(window.debugging) console.log('GIS-村详情-农业投入品', res);
			let list = res.list || [];
			let totalCount = res.total;
			let tbody = [];
			list.map((item, i) => {
				tbody.push([item.inputname, item.brandname, item.proportion]);
			});
			let tableData = {
				thead: ['农业投入品名称', '品牌名称', '比重'],
				tbody: tbody,
				width: [],
				pagination: {
					...this.agrInputsPage,
					totalCount: totalCount,
				}
			};
			this.agriculturalInputsRef.setData(tableData);
		}));
	}
	agriculturalProductPage(page) {
		//console.log(page);
		this.agrProPage.pageNum = page;
		this.selectCharacteristicAgrProListAjax();
	}
	agriculturalInputsPage(page) {
		//console.log(page);
		this.agrInputsPage.pageNum = page;
		this.selectAgriculturalInputsListAjax();
	}

	//乡村文化-列表
	selectRuralCultureList() {
		this._tokens.push(api.selectRuralCultureList.send({
			...this.dialogRegion,
			...this.dialogPage,
		}).then((res) => {
			if(window.debugging) console.log('乡村文化-列表', res);
			let list = res.list || [];
			let totalCount = res.total;
			let tbody = [];
			list.map((item, i) => {
				tbody.push([item.cun, item.celebrity_allusion, item.cultural_introduction, item.traditional_technology, item.historical_inheritance, item.local_snacks, item.myths_and_legends, item.quxian, item.xiangzhen]);
			});
			let tableData = {
				thead: ['村名', '名人典故', '文化介绍', '传统工艺', '历史传承', '地域小吃', '神话传说', '操作'],
				tbody: tbody,
				width: [],
				pagination: {
					...this.dialogPage,
					totalCount: totalCount,
				},
				src: suyuan
			};
			this.xcwhListRef.setData(tableData);
		}));
	}
	//餐饮住宿下钻列表
	selectCateringAccommodationListAjax() {
		this._tokens.push(api.selectCateringAccommodationList.send({
			...this.dialogRegion,
			...this.dialogPage,
		}).then((res) => {
			if(window.debugging) console.log('餐饮住宿下钻列表', res);
			let list = res.list || [];
			let totalCount = res.total;
			let tbody = [];
			list.map((item, i) => {
				tbody.push([item.cun, item.jiudianNum, item.fandianNum, item.gongyuNum]);
			});
			let tableData = {
				thead: ['村名', '酒店（家）', '饭店（家）', '公寓（家）'],
				tbody: tbody,
				width: [],
				pagination: {
					...this.dialogPage,
					totalCount: totalCount,
				}
			};
			this.cyzsListRef.setData(tableData);
		}));
	}
	//乡村文化-查看详情
	lookHandle(item) {
		//console.log(item);
		let title = item[0] + '乡村文化介绍';
		this.setState({
			dialogXcwhTitle: title
		});
		this.refs.dialogRefXcwh._open(title);
		this.selectRuralCultureDetailAjax(item[7], item[8], item[0]);
	}

	selectRuralCultureDetailAjax(quxian, xiangzhen, cun) {
		this._tokens.push(api.selectRuralCultureDetail.send({
			quxian: quxian,
			xiangzhen: xiangzhen,
			cun: cun
		}).then((res) => {
			if(window.debugging) console.log('乡村文化-详情', res);
			let data = res.data[0];
			let tbody = [];
			tbody.push(['名人典故', data.celebrity_allusion]);
			tbody.push(['文化介绍', data.cultural_introduction]);
			tbody.push(['传统工艺', data.traditional_technology]);
			tbody.push(['历史传承', data.historical_inheritance]);
			tbody.push(['地域小吃', data.local_snacks]);
			tbody.push(['神话传说', data.myths_and_legends]);
			tbody.push(['其他', data.other]);
			let tableData = {
				thead: ['类型', '文化详情'],
				tbody: tbody,
				width: [200]
			};
			this.xcwhTableRef.setData(tableData);
		}));
	}

	render() {
		const me = this;
		return(
			<div className={'harmonious-box'}>
				<div style={{display: this.state.isEchertsMap ? 'block' : 'none'}}>
					{/*村委会分布*/}
	        <Panel title={'村委会分布'} width={465} height={270} top={130} left={30} type={1} onClick={this.showGisHandle.bind(this, '村委会分布')}>
	          <div className={'village-box'}>
	            <UlList ref={'ulList'} width={460} height={240} top={30}/>
	          </div>
	        </Panel>
					
	        {/*通信服务网点*/}
	        <Panel title={'通信服务网点'} width={465} height={270} top={430} left={30} type={1} onClick={this.showGisHandle.bind(this, '通信服务分布')}>
	          <div className={'info-box'}>
	          	<Ring unit={'个'} title={'通信服务'} ref={ref=>this.txfwRef=ref} />
	          </div>
	        </Panel>
	
	        {/*技术服务*/}
	        <Panel title={'技术服务'} width={465} height={310} top={700} left={30} type={1} onClick={this.showGisHandle.bind(this, '技术服务分布')}>
	          <div className={'countrys-box'}>
	            <Pie ref={ref => this.pieWaterOne = ref} unit={'个'} />
	          </div>
	        </Panel>
	
	        {/*全局搜索框*/}
	        <div className={'selectBox'}>
	          <span style={{color: '#00ffe4', fontSize: 14}}>区域检索条件：</span>
	          <Select left={140} width={135} list={['全部']} ref={(ref) => {this.indexDistrictRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0], 'index')}/>
	          <span className={'selectSpan'} style={{left: 280}}>区县</span>
	          <Select left={345} width={135} list={['全部']} ref={(ref) => {this.indexCountrysideRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1], 'index')}/>
	          <span className={'selectSpan'} style={{left: 485}}>乡</span>
	          <Select left={535} width={135} list={['全部']} ref={(ref) => {this.indexVillageRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2], 'index')}/>
	          <span className={'selectSpan'} style={{left: 675}}>村</span>
	          <Button type="primary" style={{position: 'absolute', right: 0, top: 5,zIndex: 100}} onClick={this.handleClicks.bind(this)}>查询</Button>
	        </div>
	
					{/*中间地图*/}
					<div className={'centerMapBox'}>
						<div className={'centerMap'}>
							<CenterMap style={{ width: '695px', height: '390px' }} mapClickHandle={this.gisMapShow.bind(this)} ref={ref => { this._centerMapRef = ref; }}/>
						</div>
						<h5 className={'centerMapbox-title'} style={{top: 12}}>卫生服务</h5>
						<div className={'health-service'}>
							{
								me.state.healthServiceData.map((item, index)=>{
	                return (
	                  <div key={index} onClick={this.showGisHandle.bind(this, '卫生服务分布')}>
											<p>{item.name}</p>
											<div>
												<TextPage2 data={item.value} unit={item.unit} />
											</div>
										</div>
	                )
	              })
							}
						</div>
						<h5 className={'centerMapbox-title'} style={{top: 370}}>教育资源</h5>
						<div className={'educational-resources'}>
							{
								me.state.educationalResourcesData.map((item, index)=>{
	                return (
	                  <div key={index} style={{backgroundImage: `url(${item.url})`}} onClick={this.showGisHandle.bind(this, '教育资源分布')}>
											<div>
												<span title={item.value}>{item.value}</span>{item.unit}
											</div>
											<p>{item.name}</p>
										</div>
	                )
	              })
							}
						</div>
						<Button type="primary" style={{position: 'absolute', right: 0, top: 10}} onClick={this.selectAllData.bind(this)}>运城市</Button>
					</div>
	
	        {/*乡村文化*/}
	        <Panel title={'乡村文化'} width={825} height={270} top={700} left={530} type={1}
	               onClick={this.openDialog.bind(this, 'xcwh', 'selectRuralCultureList')}>
	          <div className={'agriculture-box'}>
	            <ServiceTrendsBar ref={(ref) => this.barFef = ref} width={800} height={240}/>
	          </div>
	        </Panel>
	
	        {/*餐饮住宿*/}
	        <Panel title={'餐饮住宿'} width={465} height={270} top={130} left={1430} type={1} onClick={this.openDialog.bind(this, 'cyzs', 'selectCateringAccommodationListAjax')}>
	          <div className={'info-box'}>
	          	<Ring unit={'家'} title={'餐饮住<br />宿服务'} ref={ref=>this.cyzsRef=ref} />
	          </div>
	        </Panel>
	
	        {/*购物服务*/}
	        <Panel title={'购物服务'} width={465} height={270} top={430} left={1430} type={0}>
	          <div className={'shopping-box'}>
	            <DiyPie ref={ref => this.landAreaRatioRef = ref} top={30} width={400} height={240} name={'购物服务'} unit={'个'} />
	          </div>
	        </Panel>
	
	        {/*公共服务*/}
	        <Panel title={'公共服务'} width={465} height={290} top={700} left={1430} type={0}>
	          <div className={'statistics-box'}>
	            <Pie ref={ref => this.pieWaterTwo = ref}/>
	          </div>
	        </Panel>
				</div>
        
        {/* gis */}
        <div className={'gisMap harmonious-gismap'} style={{ display: !this.state.isEchertsMap ? 'block' : 'none'}}>
        	<div className={'query-box'}>
        		<span>区县：</span>
	        	<Select position={'relative'} width={135} list={['全部']} ref={(ref) => {this.gisDistrictRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0], 'gis')}/>
	        	<span>乡镇：</span>
	          <Select position={'relative'} width={135} list={['全部']} ref={(ref) => {this.gisCountrysideRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1], 'gis')}/>
	          <span>村组：</span>
	          <Select position={'relative'} width={135} list={['全部']} ref={(ref) => {this.gisVillageRef = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2], 'gis')}/>
	        	<Button type="primary" onClick={this.gisQueryHandle.bind(this)}>查询</Button>
	        	<Button className={'back'} type="primary" onClick={this.backToEchartsMap.bind(this)}>返回</Button>
        	</div>
        	
        	<Panel title={me.state.gisTitle} width={440} childrenWidth={1870} position={'relative'}>
        		<Observation ref={ref => this.ObservationRef = ref} width={410} height={820} click={this.showObservationDetailsHandle.bind(this)} getData={this.gisDataPaginationCallback.bind(this)} />
        		
        		<ObservationDetails ref={ref => this.ObservationDetailsRef = ref} top={70} closeDetails={this.closeDetails.bind(this)} />
        		
        		<div style={{position: 'absolute', top: 50, right: 0, width: 1440, height: 820}}>
        			<GisMap ref={ref => this.GisMapRef = ref} zoom={18} width={1440} height={820} style={{position: 'absolute', top: 0, left: 0}} />
        			<MarkPoint ref={ref => this.MarkPointRef = ref} className2={'mark-point2'} />
        		</div>
        	</Panel>
        </div>
        
        {/*村委会分布-详情*/}
        <Dialog title={'村详情'} ref={'dialogRefCunDetails'} close={me.dialogCloseCunDetails.bind(me)}>
          <div className={'detail-box'}>
            <div className={'detail-title'}>
            	<p>运城市</p>
            	<p><span>></span>{this.state.quxian}</p>
            	<p><span>></span>{this.state.xiangzhen}</p>
            	<p><span>></span>{this.state.cun}</p>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>饮用水来源</p>
              <Checkbox.Group options={this.waterSource} disabled value={this.state.waterSourceSelect}/>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>特色农产品</p>
              <Table7 ref={ref => this.agriculturalProductRef = ref} marginTop={15} simple={false} getData={this.agriculturalProductPage.bind(this)}></Table7>
            </div>
             <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>农业投入品</p>
              <Table7 ref={ref => this.agriculturalInputsRef = ref} marginTop={15} simple={false} getData={this.agriculturalInputsPage.bind(this)}></Table7>
            </div>
          </div>
        </Dialog>
        
        {/*乡村文化-列表*/}
        <Dialog title={'乡村文化'} ref={'xcwhDialogRef'} close={me.dialogClose.bind(me)}>
          <div className={'detail-box'}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.xcwhDistrictRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0], 'xcwh')}/>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.xcwhCountrysideRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1], 'xcwh')}/>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.xcwhVillageRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2], 'xcwh')}/>
              <Button type="primary" onClick={this.queryHandle.bind(this, 'xcwh', 'selectRuralCultureList')}>查询</Button>
            </div>
            <Table7 ref={ref => this.xcwhListRef = ref} marginTop={30} simple={false} getData={this.pagenationHandle.bind(this, 'selectRuralCultureList')} click={this.lookHandle.bind(this)}></Table7>
          </div>
        </Dialog>
	        
        {/*餐饮住宿-列表*/}
        <Dialog title={'餐饮住宿分布'} ref={'cyzsDialogRef'} close={me.dialogClose.bind(me)}>
          <div className={'detail-box'}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.cyzsDistrictRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0], 'cyzs')}/>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.cyzsCountrysideRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1], 'cyzs')}/>
              <Select position={'relative'} list={['全部']} ref={(ref) => {this.cyzsVillageRef = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2], 'cyzs')}/>
              <Button type="primary" onClick={this.queryHandle.bind(this, 'cyzs', 'selectCateringAccommodationListAjax')}>查询</Button>
            </div>
            <Table7 ref={ref => this.cyzsListRef = ref} marginTop={30} simple={false} getData={this.pagenationHandle.bind(this, 'selectCateringAccommodationListAjax')}></Table7>
          </div>
        </Dialog>
        
        {/*乡村文化-详情*/}
        <Dialog title={'乡村文化介绍'} ref={'dialogRefXcwh'}>
          <div className={'detail-box'}>
            <p className={'detail-text'}><span></span>{this.state.dialogXcwhTitle}</p>
            <Table7 ref={ref => this.xcwhTableRef = ref} marginTop={30}></Table7>
          </div>
        </Dialog>
      </div>
		)
	}
}
export default harmonious;
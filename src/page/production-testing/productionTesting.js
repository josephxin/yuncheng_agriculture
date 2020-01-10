import React from 'react';
import Panel from '../../component/panel/Panel';
import Pie from './component/pie/Pie';
import TrunRoll from '../../component/production-link/trunRoll';
import BarLine from '../../component/plant-area/PlantArea6';
import LtpxsRate from './component/DivChart';
import LineSingle from '../../component/echarts/LineSingle';
import DiyPie from '../../component/echarts/diyCharts/Pie';
//弹出框
import Dialog from '../../component/dialog/Dialog';
//zent三种事件选择组件
import DatePickers from '../../component/DatePickers/DatePickers';

import './productionTesting.scss';

/*引入下拉选择框*/
import Select from '../../component/select/Select';
/*引入antd框架*/
import { DatePicker, Input, Pagination, Cascader, InputNumber, Radio, Button, message } from 'antd';

import Tab from '../../component/tab/Tab';
/*中间地图*/
import CenterMap from './map/center-map/growMap';

import GisMap from '../../component/map-component/gisMap/gisMap';

//全国地图
import YunchengMap from './map/yunchengMap';

//gis大棚列表
import GisTable from './gisTable';
//gis基地列表
import GisTableBase from './gisTablebase';

//大棚详情
import GreenhouseDetails from '../../component/scjc-greenhouseDetails/greenhouseDetails';
//基地详情
import BaseDetails from '../../component/scjc-baseDetails/baseDetails';

//引入图片
import foot_bg from './img/foot-bg.png';
import icon_animal from './img/icon-animal.png';
import icon_aquatic from './img/icon-aquatic.png';
import icon_food from './img/icon-food.png';
import icon_fruit from './img/icon-fruit.png';
import icon_jjzw from './img/icon-jjzw.png';
import icon_vegetable from './img/icon-vegetable.png';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-production-testing';

//引入假数据
import commonData from '../../data/commonData';
import demoData from './demoData.js';

/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, cloneFn, formatParams } from '../../tool/tool.js';

const Search = Input.Search;
const RadioGroup = Radio.Group;
const paramsDay = setParamsDay(12); //12个月
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear(); //10年前
const paramsYear1 = setParamsYear(1); //1年前
const paramsYear2 = setParamsYear(2); //2年前
const currentYear = getCurrentYear();
const currentDay = getNowDay();
const chang = 100;
const kuan = 12;
const region = '盐湖区';
const bigVariety = '蔬菜';
const smallVariety = '黄瓜';

class ProductionTesting extends React.Component {
	constructor() {
		super();
		const me = this;
		this.state = {
			url: window.location.href.substring(7, 16),
			//大棚类型字典数据
			dictionariesData: [],

			/*默认大鹏列表显示，基地列表隐藏*/
			isGreenhouseList: true,

			greenhouseNumber: '', //大鹏数量
			baseNumber: '', //基地数量
			isEchertsMap: true,

			//生产规模排名单位
			unitOfProductionScale: '亩',
			bigUnitOfProductionScale: '亩',
			typesOfProductionScale: '种植面积',

			//生产规模总计单位数额
			yunchengTotal: 0,
			unitTotal: '万亩',

			dpDetail: 'none',
			baseDetail: 'none',

			//品牌农品详情html
			brandAgriculturalProductsInfoHtml: '',
			//种植分布
			plantingDistributionParams: {
				smallVariety: smallVariety
			},
			//产量占比
			varietyStructureParams: {
				region: '运城全市',
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
			},
			//生产规模排名Top10-首页
			ProductionRankTop10Params: {
				smallVariety: smallVariety, //品种小类
				rankType: '种植面积', //排序类型：种植面积/产量
				regionType: '2', //区域类型：0：全国 /1：山西省 /2：运城市
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
			},
			//生产规模排名Top10-弹窗
			bigProductionRankTop10Params: {
				smallVariety: smallVariety,
				rankType: '种植面积',
				regionType: '2',
				startTime: paramsYear2.startTime,
				endTime: paramsYear2.endTime,
			},
			//生产规模排名-省市区
			productionScaleProvinceParams: {
				smallVariety: smallVariety,
				startTime: paramsYear2.startTime,
				endTime: paramsYear2.endTime,
			},
			//产量走势
			outputTrendParams: {
				timeType: 'year',
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
				region: '运城全市',
				smallVariety: smallVariety,
				category: '产量'
			},
			//土地使用趋势
			landUseTrendParams: {
				timeType: 'year',
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
				region: '运城全市',
				smallVariety: smallVariety,
				category: '种植面积'
			},
			//耕地面积占比
			landAreaRatioParams: {
				plantTimes: paramsYear.startTime,
				plantEndTimes: paramsYear.endTime,
			},
			//gis大棚参数
			ListOfGreenhousesParams: {
				pageable: true,
				pageNum: 1,
				pageSize: 15,
				areaName: region,
				name: '', //大棚所有者
				plantType: '', //品种
			},
			//gis基地参数
			ListOfBaseParams: {
				pageable: true,
				pageNum: 1,
				pageSize: 15,
				areaName: region
			},
			//gis品种当前值
			plantType: [''],
			//品种下拉框
			varietySelect: commonData.varietySelect,
			varietySelect2: commonData.varietySelect, //包含全部品种
			//fromEnter: '', //品牌农品弹窗中-来自企业

			indexStartTime: paramsYear.startTime, //主页开始时间
			indexEndTime: paramsYear.endTime, //主页结束时间
		};

		this._tokens = [];
		this.lng = 111.00699;
		this.lat = 35.02628;

		this.baseNumberParams = {
			areaName: region,
		};
		this.greenHouseNumberParams = {
			areaName: region,
			name: '',
			plantType: '',
		};
		this.pieColor = ['#349dff', '#28dd5f', '#fff220', '#fd296f', '#01cfff'];
		//生产规模排名
		this.scgmpmTabData = ['种植面积', '产量'];
		//品牌农品对话框中省、市、区、品牌农品选择框的选中项
		this.district = '';
		this.brandName = '';

		this.oldGreenhouseNum = ''; //gis大棚列表中大棚编号
		this.oldBaseNum = ''; //gis基地列表中基地编号
		this.regionList = commonData.regionSelect;
		this.filePath = '/file/getPhoto?filename=';
		this.plantingDistributionBigVariety = bigVariety;
	}

	componentWillUnmount() {
		this._clearTokens();
	}

	componentDidUpdate() {
		//组件更新之后控制天地图marker点等级
		document.getElementsByClassName('tdt-marker-pane')[0].style.zIndex = 800;
	}

	componentDidMount() {
		const me = this;
		//品种树状列表
		me.varietiesTreeFunc();
		//字典
		me.dictionariesFunc();
		//种植分布
		me.plantingDistributionFunc();
		//产量占比
		me.varietyStructureFunc();
		//生产规模排名-弹窗中的地图和总量
		me.productionScaleDistrictFunc();
		me.productionScaleNumTotalFunc();
		//生产规模排名-小图
		me.ProductionRankTop10Func();
		//生产规模排名-大图
		me.bigProductionRankTop10Func();
		//产量走势-首页
		me.productionScaleTrendFunc();

		//品牌农品-主页
		me.brandAgriculturalProductsFunc();
		//土地使用趋势
		me.landUseTrendFunc();
		//耕地面积占比
		me.landAreaRatioFunc();

		//获取地区列表
		me.getRegionList();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}

	//所有品种下拉框
	varietiesTreeFunc() {
		let params = formatParams({
			rootId: 0,
			keyword: ''
		});
		this._tokens.push(apiAll.product_tree.send(params).then((result) => {
			if(window.debugging) console.log('所有品种下拉框', result);
			let content = result.content;
			let varietySelect = [];
			content.subList.map((t, i) => {
				let option = {
					value: t.typeName,
					label: t.typeName,
				};
				let subList = t.subList;
				if(subList && subList.length > 0) {
					option.children = [];
					recursion(subList, option.children);
				}
				varietySelect.push(option);
				//递归函数
				function recursion(arr, children) {
					arr.map((u, j) => {
						let option = {
							value: u.typeName,
							label: u.typeName,
						}
						let subList = u.subList;
						if(subList && subList.length > 0) {
							option.children = [];
							recursion(subList, option.children);
						}
						children.push(option);
					});
				}
			});
			let varietySelect2 = cloneFn(varietySelect);
			varietySelect2.unshift({
				value: '',
				label: '全部品种'
			});
			//console.log(varietySelect);
			this.setState({
				varietySelect,
				varietySelect2
			});
		}));
	}

	//字典(参数仅查询大棚类型对应label)
	dictionariesFunc() {
		let arr = ['appendant_type'];
		arr.map((item, i) => {
			//请求方式为GET
			this._tokens.push(api.listByType.send({
				type: item
			}).then((result) => {
				if(window.debugging) console.log('字典数据-' + item, result);
				if(i == 0) {
					if(result.data.length > 0) {
						this.setState({
							dictionariesData: result.data
						});
					}
				}
			}));
		});
	}

	//种植分布
	plantingDistributionFunc() {
		let me = this;
		let params = formatParams(me.state.plantingDistributionParams);
		me._tokens.push(api.plant_distribution_coord.send(params).then((res) => {
			if(window.debugging) console.log('种植分布', res);
			let content = res.content || [];
			//图标数组
			let imgData = [];
			//悬浮数组
			let suspensionData = [];
			content.map((item, i) => {
				suspensionData.push({
					name: item.region,
					value: item.cultivatedArea,
					bigVariety: item.bigVariety,
					mainCrops: item.smallVariety,
					base: item.baseSum,
					greenhouse: item.greenhouseSum,
					tpaos: item.threeoneSum,
				});
				//农作物的种植面积等于0时，不渲染icon
				/*if(item.cultivatedArea != 0) {
					let url = me.state.url == 'localhost' ? window.BASEURL_01 + me.filePath : me.filePath; //前面
					let iconUrl = item.pic; //后面
					let symbol = ''; //全部
					if(iconUrl) {
						symbol = url + iconUrl;
					}
					imgData.push({
						name: item.smallVariety,
						symbol: symbol,
						value: '1',
						coord: [item.lng, item.lat],
					});
				}*/
				if(item.cultivatedArea != 0) {
					let symbol = '';
					if(this.plantingDistributionBigVariety === '蔬菜') {
						symbol = icon_vegetable;
					} else if(this.plantingDistributionBigVariety === '粮食') {
						symbol = icon_food;
					} else if(this.plantingDistributionBigVariety === '水果') {
						symbol = icon_fruit;
					} else if(this.plantingDistributionBigVariety === '经济作物') {
						symbol = icon_jjzw;
					} else if(this.plantingDistributionBigVariety === '畜产') {
						symbol = icon_animal;
					} else if(this.plantingDistributionBigVariety === '水产') {
						symbol = icon_aquatic;
					}
					imgData.push({
						bigVariety: this.plantingDistributionBigVariety,
						name: item.smallVariety,
						symbol: symbol,
						value: '1',
						coord: [item.lng, item.lat],
					});
				}
			});
			//按种植面积排序，由大到小
			suspensionData.sort((a, b) => {
				return b.value - a.value;
			});
			//console.log(suspensionData, imgData);
			me._centerMapRef._setData(imgData, suspensionData);
		}));
	}

	//品牌农品-主页
	brandAgriculturalProductsFunc() {
		let me = this;
		let params = formatParams({
			city: '运城市'
		});
		me._tokens.push(api.product_brand.send(params).then((result) => {
			if(window.debugging) console.log('品牌农品-主页', result);
			let content = result.content || [];
			let ppnpRotationChartData = [];
			let iconArr = [];
			content.map((item, i) => {
				ppnpRotationChartData.push({
					name: item.brandName,
					id: item.id
				});
				let url = me.state.url == 'localhost' ? window.BASEURL_01 + me.filePath : me.filePath;
				let iconUrl = item.iconUrl;
				if(iconUrl) {
					iconArr.push(url + iconUrl);
				} else {
					iconArr.push('');
				}
			});
			//console.log(ppnpRotationChartData, iconArr);
			if(ppnpRotationChartData.length > 0) {
				me.ppnpRotationChartRef.setState({
					dataList: ppnpRotationChartData,
					iconArr: iconArr, //需要改
				});
			}
		}));
	}

	/*-----生产规模排名-开始-----*/
	//生产规模排名-小图
	ProductionRankTop10Func() {
		let params = formatParams(this.state.ProductionRankTop10Params);
		this._tokens.push(api.production_scale_rank.send(params).then((result) => {
			if(window.debugging) console.log('生产规模排名-小图', result);
			let content = result.content || [];
			let scgmpmTop10Data = [];
			content.map((item, i) => {
				scgmpmTop10Data.push({});
				scgmpmTop10Data[i].name = item.region;
				if(this.state.ProductionRankTop10Params.rankType == '种植面积') {
					scgmpmTop10Data[i].value = item.cultivatedArea;
				} else {
					scgmpmTop10Data[i].value = item.output;
				}
			})
			this.scgmpmTop10.setData(scgmpmTop10Data.slice(0, 5));
		}));
	}

	//生产规模排名-大图
	bigProductionRankTop10Func() {
		let params = formatParams(this.state.bigProductionRankTop10Params);
		this._tokens.push(api.production_scale_rank.send(params).then((result) => {
			if(window.debugging) console.log('生产规模排名-大图', result);
			let scgmpmTop10Data = [];
			result.content.map((item, i) => {
				scgmpmTop10Data.push({});
				scgmpmTop10Data[i].name = item.region;
				if(this.state.bigProductionRankTop10Params.rankType == '种植面积') {
					scgmpmTop10Data[i].value = item.cultivatedArea;
				} else {
					scgmpmTop10Data[i].value = item.output;
				}
			})
			this.bigScgmpmTop10.setData(scgmpmTop10Data);
		}));
	}

	//生产规模排名大图-总额数值
	productionScaleNumTotalFunc() {
		let params = formatParams(this.state.bigProductionRankTop10Params);
		this._tokens.push(api.production_scale_rank_sum.send(params).then((result) => {
			if(window.debugging) console.log('生产规模排名大图-总额数值', result);
			this.setState({
				yunchengTotal: result.content.weifang,
			});
			if(this.state.bigProductionRankTop10Params.rankType == '种植面积') {
				this.setState({
					unitTotal: '万亩'
				});
			} else {
				this.setState({
					unitTotal: '万吨'
				});
			}
		}));
	}

	//运城市地图鼠标hover
	productionScaleDistrictFunc(e) {
		/*let districtData = demoData.yunchengMapData;//模拟数据
		let yunchengArr = this.yunchengMapRef.state.dataObj['yuncheng'];//组件内数据
		yunchengArr.map((item1, i1) => {
			districtData.map((item2, i2) => {
				if(item1['name'] == item2['name']) {
					yunchengArr[i1] = item2;
				} else {
					item1['area'] = item1['yield'] = item1['areaNum'] = item1['yieldNum'] = '--';
					item1['value'] = 1;
				}
			})
			if(e) {
				item1.varieties = e;
			}
		});
		if(JSON.stringify(this.yunchengMapRef.state.dd) == '{}') {
			this.yunchengMapRef.getMapData();
		} else {
			this.yunchengMapRef.resetMap();
		}*/

		let params = formatParams(this.state.productionScaleProvinceParams);
		this._tokens.push(api.production_scale_district.send(params).then((result) => {
			if(window.debugging) console.log('运城市地图鼠标hover', result);
			let content = result.content || [];
			let yunchengArr = this.yunchengMapRef.state.dataObj['yuncheng']; //组件内数据
			if(content.length == 0) {
				yunchengArr.map((item1, i1) => {
					item1['area'] = item1['yield'] = item1['areaNum'] = item1['yieldNum'] = '--';
					item1['value'] = 1
				});
			} else {
				let districtData = []; //接口返回并处理后的数据
				content.map((item, i) => {
					districtData.push({});
					districtData[i].name = item.region;
					districtData[i].value = item.output;
					districtData[i].area = item.cultivatedArea;
					districtData[i].yield = item.output;
					districtData[i].areaNum = item.rankCultivatedArea;
					districtData[i].yieldNum = item.rankOutput;
					districtData[i].varieties = item.smallVariety;
				});
				//console.log(JSON.stringify(districtData));
				yunchengArr.map((item1, i1) => {
					districtData.map((item2, i2) => {
						if(item1['name'] == item2['name']) {
							yunchengArr[i1] = item2;
						} else {
							item1['area'] = item1['yield'] = item1['areaNum'] = item1['yieldNum'] = '--';
							item1['value'] = 1;
						}
					});
					if(e) {
						item1.varieties = e;
					}
				});
			}
			if(JSON.stringify(this.yunchengMapRef.state.dd) == '{}') {
				this.yunchengMapRef.getMapData();
			} else {
				this.yunchengMapRef.resetMap();
			}
		}));
	}

	//生产规模排名大图-时间改变
	ProductionRankingGetTime(key, date) {
		let params = this.state.productionScaleProvinceParams;
		//console.log(this.state.productionScaleProvinceParams)
		params[key] = date;
		//console.log(date)
		this.setState({
			productionScaleProvinceParams: params
		})
		this.state.bigProductionRankTop10Params[key] = date;
		//区县
		this.productionScaleDistrictFunc();
		//this.yunchengMapRef.resetMap();
		//运城市总量
		this.productionScaleNumTotalFunc();
		//排名
		this.bigProductionRankTop10Func();
	}

	//生产规模排名大图-品种改变
	ProductionRankingCascaderSelect(e) {
		//console.log(e);
		this.state.productionScaleProvinceParams.smallVariety = e[e.length - 1];
		this.state.bigProductionRankTop10Params.smallVariety = e[e.length - 1];
		//区县
		this.productionScaleDistrictFunc(e[e.length - 1]);
		//运城市总量
		this.productionScaleNumTotalFunc();
		//排名
		this.bigProductionRankTop10Func();
	}

	//生产规模排名小图-选项卡
	productionRankingTabChange(e) {
		//console.log(e);
		this.state.ProductionRankTop10Params.rankType = e.label;
		this.ProductionRankTop10Func();
		if(e.label == '种植面积') {
			this.setState({
				unitOfProductionScale: '亩'
			})
		} else {
			this.setState({
				unitOfProductionScale: '吨'
			})
		}
	}

	//生产规模排名大图-选项卡
	bigProductionRankingTabChange(e) {
		//console.log(e);
		this.state.bigProductionRankTop10Params.rankType = e.label;
		this.state.typesOfProductionScale = e.label;
		//运城市总量
		this.productionScaleNumTotalFunc();
		//排名
		this.bigProductionRankTop10Func();
		if(e.label == '产量') {
			document.getElementsByClassName('bigScgmpmUnit')[0].innerText = '单位：吨';
		} else {
			document.getElementsByClassName('bigScgmpmUnit')[0].innerText = '单位：亩';
		}
	}
	/*-----生产规模排名-结束-----*/

	//产量走势
	productionScaleTrendFunc() {
		const me = this;
		let params = formatParams(this.state.outputTrendParams);
		this._tokens.push(api.production_scale.send(params).then((res) => {
			if(window.debugging) console.log('产量走势-首页', res);
			let content = res.content || [];
			let scgmzsData = {
				date: [],
				dataBar: [],
				unitL: '产量(吨)',
				legend: ['产量'],
				smallVariety: this.state.outputTrendParams.smallVariety, //小品种
			};
			content.map((item, i) => {
				scgmzsData.date.push(item.dateTime);
				scgmzsData.dataBar.push(item.value);
			});
			me.scgmTrendRef.setData(scgmzsData);
		}));
	}

	//产量占比
	varietyStructureFunc() {
		let params = formatParams(this.state.varietyStructureParams);
		this._tokens.push(api.breed_structure.send(params).then((result) => {
			if(window.debugging) console.log('产量占比', result);
			let pieData = {
				unit: '条',
				colorArr: ['#0297ff', '#00cfff', '#2bfdb6', '#28dd5f', '#a8ed6b', '#fff400', '#eb95a1'],
				seriesData: [],
				region: this.state.varietyStructureParams.region
			};
			let pieSeriesData = [];
			result.content.map((item, i) => {
				pieSeriesData.push({});
				pieSeriesData[i].name = item.bigVariety;
				pieSeriesData[i].value = item.cultivatedArea;
			})
			//console.log(pieSeriesData);
			let confirm = [];
			pieSeriesData.map((item, i) => {
				if(item.value) {
					confirm.push(item)
				}
			})
			pieData.seriesData = confirm;
			this.pieRef._setData(pieData);
		}));
	}

	//土地使用趋势
	landUseTrendFunc() {
		let me = this;
		//me.landUseTrendRef.setData(demoData.landUseTrendData);
		let params = formatParams(this.state.landUseTrendParams);
		this._tokens.push(api.production_scale.send(params).then((res) => {
			if(window.debugging) console.log('土地使用趋势', res);
			let content = res.content || [];
			let landUseTrendData = {
				data: [], //数据
				date: [], //日期
				unit: "公顷", //单位
				smallVariety: this.state.landUseTrendParams.smallVariety, //小品种
			};
			content.map((item, i) => {
				landUseTrendData.data.push(item.value);
				landUseTrendData.date.push(item.dateTime);
			});
			me.landUseTrendRef.setData(landUseTrendData);
		}));
	}

	//耕地面积占比
	landAreaRatioFunc() {
		let me = this;
		let params = formatParams(this.state.landAreaRatioParams);
		this._tokens.push(api.cultivated_land_proportion.send(params).then((res) => {
			if(window.debugging) console.log('耕地面积占比', res);
			let content = res.content || [];
			let picOption = {
				color: this.pieColor,
				series: content
			};
			me.landAreaRatioRef.initChart(picOption);
		}));
	}

	//获取地区列表
	getRegionList() {
		this._tokens.push(apiAll.selectRegion.send().then((res) => {
			if(window.debugging) console.log('gis地区下拉', res);
			this.regionList = res.data || this.regionList;
			this.brandSiteRef._setList(this.regionList);
			this.gisSiteSelectRef._setList(this.regionList);
		}));
	}

	//-----基地接口方法
	//基地数量
	get_gis_base_count() {
		let params = formatParams(this.baseNumberParams);
		this._tokens.push(api.gis_base_count.send(params).then((result) => {
			if(window.debugging) console.log('基地数量', result);
			this.setState({
				baseNumber: result.content
			});
		}));
	}

	//基地列表
	ListOfBaseFunc() {
		let params = formatParams(this.state.ListOfBaseParams);
		this._tokens.push(api.gis_base_list.send(params).then((result) => {
			if(window.debugging) console.log('基地列表', result);
			let list = result.content.list || [];
			let ListOfBaseData = [];
			let dataSource = []; //用于GIS地图的坐标图标
			if(list.length > 0) {
				list.map((item, i) => {
					let lng = item.lng;
					let lat = item.lat;
					if(!lng || !lat) {
						lng = this.lng;
						lat = this.lat;
					}
					ListOfBaseData.push({
						id: item.id,
						number: item.baseNum,
						baseName: item.baseName,
						address: item.baseAddress,
						lng: lng,
						lat: lat
					});
					dataSource.push({
						key: item.id,
						number: item.baseNum,
						type: '基地',
						name: item.baseName,
						pointX: lng,
						pointY: lat
					});
				});
				//点击基地定位到第一个基地中心
				this.GisMapRef.centerTo(ListOfBaseData[0].lng, ListOfBaseData[0].lat, 16);
			} else {
				this.GisMapRef.centerTo(this.lng, this.lat, 16);
			}

			let ListOfBaseParams = this.state.ListOfBaseParams;
			ListOfBaseParams.total = result.content.totalCount;
			this.setState({
				ListOfBaseParams: ListOfBaseParams
			});

			//清除所有覆盖物
			this.GisMapRef.clearOverLays();
			/*下钻窗口-markPoint-地图icon*/
			this.GisMapRef.drawShape(dataSource);
			/*GIS地图-左侧列表*/
			this.baseGisTableRef.setData(ListOfBaseData);
		}));
	}

	//基地详情
	baseDetailsFunc(baseNum) {
		let params = formatParams({
			baseNum: baseNum
		});
		this._tokens.push(api.gis_base_details.send(params).then((result) => {
			if(window.debugging) console.log('基地详情', result);
			let content = result.content || {};
			let baseDetailsData = {
				name: content.baseName,
				code: content.baseNum,
				addrDetails: content.baseAddress,
				baseArea: content.baseArea,
				baseVariety: content.baseVariety
			};
			this.baseDetailsRef.setData(baseDetailsData);
		}));
	}

	//-----大棚接口方法
	//大棚数量
	get_gis_greenhouse_count() {
		let params = formatParams(this.greenHouseNumberParams);
		this._tokens.push(api.gis_greenhouse_count.send(params).then((result) => {
			if(window.debugging) console.log('大棚数量', result);
			let greenhouseNumber = result.content ? result.content.greenhouseTotal : 0;
			this.setState({
				greenhouseNumber: greenhouseNumber
			});
		}));
	}

	//大棚列表
	ListOfGreenhousesFunc() {
		let params = formatParams(this.state.ListOfGreenhousesParams);
		this._tokens.push(api.gis_greenhouse_list.send(params).then((result) => {
			if(window.debugging) console.log('大棚列表', result);
			let list = result.content.list || [];
			let ListOfGreenhousesData = [];
			let gisMarker = [];
			let params = this.state.ListOfGreenhousesParams;
			params.total = result.content.totalCount;
			this.setState({
				ListOfGreenhousesParams: params
			});
			list.map((item, i) => {
				let lng = item.lng;
				let lat = item.lat;
				if(!lng || !lat) {
					lng = this.lng;
					lat = this.lat;
				}
				ListOfGreenhousesData.push({
					number: item.greenhouseNum,
					type: item.greenhouseType,
					varieties: item.plantType,
					contacts: item.name,
					address: item.address,
					lng: lng,
					lat: lat,
					appendantId: item.id,
				});
				gisMarker.push({
					pointX: lng,
					pointY: lat,
					type: '大棚',
					name: item.name,
					key: item.id,
					number: item.greenhouseNum
				});
			});
			if(gisMarker.length > 0) {
				this.GisMapRef.centerTo(gisMarker[0].pointX, gisMarker[0].pointY, 16);
			} else {
				this.GisMapRef.centerTo(this.lng, this.lat, 16);
			}

			//清除所有覆盖物
			this.GisMapRef.clearOverLays();
			/*下钻窗口-markPoint-地图icon*/
			this.GisMapRef.drawShape(gisMarker);
			/*GIS地图-左侧列表*/
			this.GisTableRef.setData(ListOfGreenhousesData);
		}));
	}

	//大棚详情
	GreenhouseDetailsFunc(greenhouseNum) {
		greenhouseNum = greenhouseNum || '';
		let params = formatParams({
			greenhouseNum: greenhouseNum
		});
		this._tokens.push(api.gis_greenhouse_details.send(params).then((result) => {
			if(window.debugging) console.log('大棚详情', result);
			let content = result.content;
			let greenhouseDetailsData = {
				name: '',
				userNum: '',
				phone: '',
				greenhouseType: '',
				greenhouseNum: '',
				greenhouseArea: '',
				greenhouseLength: '',
				plantDate: '',
				plantType: '',
			};
			//对返回的大棚详情大棚类型进行转化label
			if(content) {
				this.state.dictionariesData.map((data1, i1) => {
					if(content.type == data1.value) {
						content.type = data1.label;
					}
				});
				greenhouseDetailsData = {
					name: content.name,
					userNum: content.userNum,
					phone: content.phone,
					greenhouseType: content.greenhouseType,
					greenhouseNum: content.greenhouseNum,
					greenhouseArea: content.greenhouseArea,
					greenhouseLength: content.greenhouseLength,
					plantDate: content.plantDate,
					plantType: content.plantType,
				};
				if(greenhouseDetailsData.plantDate && greenhouseDetailsData.plantDate.length > 10) {
					greenhouseDetailsData.plantDate = greenhouseDetailsData.plantDate.substr(0, 10);
				}
			}
			//console.log(greenhouseDetailsData);
			this.greenhouseDetailsRef.setData(greenhouseDetailsData);
		}));
	}

	//大棚分页
	gisMapPageChange(e) {
		//console.log(e);
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = e;
		this.setState({
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			dpDetail: 'none'
		});
		this.GisTableRef.initActive();
		this.ListOfGreenhousesFunc();
	}

	//基地分页
	gisMapPageChange1(e) {
		//console.log(e);
		let ListOfBaseParams = this.state.ListOfBaseParams;
		ListOfBaseParams.pageNum = e;
		this.setState({
			ListOfBaseParams: ListOfBaseParams,
			baseDetail: 'none'
		});
		this.baseGisTableRef.initActive();
		this.ListOfBaseFunc();
	}

	//点击大棚列表打开大棚详情(获取所有和该大棚有关信息)
	openGreenhousrDetail(e) {
		//console.log(e);
		//重新定位gis中心点
		if(!e.lng || !e.lat) {
			this.GisMapRef.centerTo(this.lng, this.lat, 16);
		} else {
			this.GisMapRef.centerTo(e.lng, e.lat, 16);
		}

		//高亮gis地图的icon
		this.GisMapRef.highlightIcon(e.lng, e.lat);

		this.setState({
			dpDetail: 'block'
		});
		//不同大棚调接口，获取大棚详情
		if(this.oldGreenhouseNum != e.number) {
			this.oldGreenhouseNum = e.number;
			this.GreenhouseDetailsFunc(this.oldGreenhouseNum);
		}
	}

	//点击基地列表打开基地详情(获取所有和该基地有关的信息)
	openBaseDetail(e) {
		//console.log(e);
		//重新定位gis中心点
		if(!e.lng || !e.lat) {
			this.GisMapRef.centerTo(this.lng, this.lat, 16);
		} else {
			this.GisMapRef.centerTo(e.lng, e.lat, 16);
		}

		//高亮gis地图的icon
		this.GisMapRef.highlightIcon(e.lng, e.lat);

		this.setState({
			baseDetail: 'block'
		});
		if(this.oldBaseNum != e.number) {
			//不同基地刷新数据
			this.oldBaseNum = e.number;
			//小窗基地详情，接口需要基地编号
			this.baseDetailsFunc(e.number);
		}
	}

	//地图marker点击事件回调
	gisMapMarkerClick(marker) {
		//console.log(marker);
		let number = marker.data.number;
		if(this.state.isGreenhouseList) {
			//如果显示的是大棚列表
			this.setState({
				dpDetail: 'block'
			});
			if(this.oldGreenhouseNum != number) {
				this.oldGreenhouseNum = number;
				this.GreenhouseDetailsFunc(this.oldGreenhouseNum);
			}
		} else {
			//如果显示的是基地列表
			this.setState({
				baseDetail: 'block'
			});
			if(this.oldBaseNum != number) {
				this.oldBaseNum = number;
				this.baseDetailsFunc(this.oldBaseNum);
			}
		}
	}

	//关闭大棚详情
	detailsClose(e) {
		//console.log(e);
		this.setState({
			dpDetail: e
		});
		this.GisTableRef.initActive();
		this.GisMapRef.cancelHighlight(); //取消marker高亮
	}

	//关闭基地详情
	BaseDetailsClose(e) {
		//console.log(e);
		this.setState({
			baseDetail: e
		});
		this.baseGisTableRef.initActive();
		this.GisMapRef.cancelHighlight(); //取消marker高亮
	}

	//GIS地图品种改变，品种只跟大棚有关系，所以改变品种只会改变大棚数量和大棚列表
	mapVarietyControl(e) {
		console.log(e); //["蔬菜", "西红柿"]
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = 1;
		if(e.length > 0) {
			ListOfGreenhousesParams.plantType = e[e.length - 1];
			this.greenHouseNumberParams.plantType = e[e.length - 1];

		} else {
			ListOfGreenhousesParams.plantType = '';
			this.greenHouseNumberParams.plantType = '';
		}

		//清除GIS地图所有markpoint
		this.GisMapRef.clearOverLays();

		this.setState({
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			plantType: e, //为了给品种组件设置当前值
			isGreenhouseList: true,
			//隐藏基地和大棚详情
			dpDetail: 'none',
			baseDetail: 'none'
		});

		//大棚数量改变
		this.get_gis_greenhouse_count();
		//大棚列表更新
		this.ListOfGreenhousesFunc();
	}

	//GIS地图地区改变
	gisSiteSelectChange(e) {
		console.log(e); //{name: "坊子区", index: 1, data: "坊子区"}
		//改变地区变量
		let region = e.name;
		if(region == this.baseNumberParams.areaName) {
			return;
		}
		//清除GIS地图所有markpoint
		this.GisMapRef.clearOverLays();

		//基地数量改变
		this.baseNumberParams.areaName = region;
		this.get_gis_base_count();
		//大棚数量改变
		this.greenHouseNumberParams.areaName = region;
		this.get_gis_greenhouse_count();

		//重置翻页及设置地区参数
		let ListOfBaseParams = this.state.ListOfBaseParams;
		ListOfBaseParams.pageNum = 1;
		ListOfBaseParams.areaName = region;
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = 1;
		ListOfGreenhousesParams.areaName = region;
		this.setState({
			ListOfBaseParams: ListOfBaseParams,
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			//隐藏基地和大棚详情
			dpDetail: 'none',
			baseDetail: 'none'
		});

		if(this.state.isGreenhouseList) {
			//gis大棚列表
			this.ListOfGreenhousesFunc();
		} else {
			//基地列表
			this.ListOfBaseFunc();
		}
	}

	//gis页面搜索框，搜索大棚所有者姓名，只会改变大棚数量和大棚列表
	mapSearchChange(e) {
		//console.log(e, typeof(e), Boolean(e));
		//清除GIS地图所有markpoint
		this.GisMapRef.clearOverLays();

		//大棚数量改变
		this.greenHouseNumberParams.name = e;
		this.get_gis_greenhouse_count();

		//重置翻页及设置地区参数
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = 1;
		ListOfGreenhousesParams.name = e;
		this.setState({
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			isGreenhouseList: true,
			//隐藏基地和大棚详情
			dpDetail: 'none',
			baseDetail: 'none'
		});

		//gis大棚列表
		this.ListOfGreenhousesFunc();
	}

	/*点击基地获取基地数据*/
	baseListFunc() {
		let ListOfBaseParams = this.state.ListOfBaseParams;
		ListOfBaseParams.pageNum = 1;
		this.setState({
			isGreenhouseList: false,
			ListOfBaseParams: ListOfBaseParams,
			//隐藏大棚和基地详情
			dpDetail: 'none',
			baseDetail: 'none',
		});
		this.baseGisTableRef.initActive();
		//基地列表
		this.ListOfBaseFunc();
	}

	/*点击大棚获取大棚数据*/
	greenhouseList() {
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = 1;
		this.setState({
			isGreenhouseList: true,
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			//隐藏基地和大棚详情
			dpDetail: 'none',
			baseDetail: 'none'
		});
		this.GisTableRef.initActive();
		//gis大棚列表
		this.ListOfGreenhousesFunc();
	}

	_mapClickHandle(d) {
		let me = this;
		console.log(d);
		let name = d.name; //地区
		let data = d.data;
		if(!data) {
			message.info('该地区无法下钻！');
			return;
		}
		let bigVariety = data.bigVariety; //大品种
		let mainCrops = data.mainCrops; //小品种
		console.log('mainCrops--------------', mainCrops);
		me.setState({
			isEchertsMap: false
		});
		setTimeout(() => {
			me.GisMapRef.checkResize();
		});

		//清除GIS地图所有markpoint
		this.GisMapRef.clearOverLays();

		//基地数量
		this.baseNumberParams.areaName = name;
		this.get_gis_base_count();
		//大棚数量
		this.greenHouseNumberParams.areaName = name;
		this.greenHouseNumberParams.name = '';
		this.greenHouseNumberParams.plantType = mainCrops;
		this.get_gis_greenhouse_count();

		//重置翻页及设置地区参数
		let ListOfBaseParams = this.state.ListOfBaseParams;
		ListOfBaseParams.pageNum = 1;
		ListOfBaseParams.areaName = name;

		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		ListOfGreenhousesParams.pageNum = 1;
		ListOfGreenhousesParams.areaName = name;
		ListOfGreenhousesParams.name = '';
		ListOfGreenhousesParams.plantType = mainCrops;

		//给地区组件设置当前值
		this.gisSiteSelectRef._setSelectedText(name);
		//给查询框组件设置空值
		//console.log(this.gisSearchRef);
		this.gisSearchRef.input.setValue('');

		this.setState({
			ListOfBaseParams: ListOfBaseParams,
			ListOfGreenhousesParams: ListOfGreenhousesParams,
			plantType: [bigVariety, mainCrops]
		});

		if(this.state.isGreenhouseList) {
			//gis大棚列表
			this.ListOfGreenhousesFunc();
		} else {
			//基地列表
			this.ListOfBaseFunc();
		}
	}

	//-----------------------下拉框及其他选项
	//主页品种总控制器
	totalVarietyControl(e) {
		//console.log(e);
		this.plantingDistributionBigVariety = e[0];
		this.state.plantingDistributionParams.smallVariety = e[e.length - 1];
		this.plantingDistributionFunc();
		//生产规模排名
		this.state.ProductionRankTop10Params.smallVariety = e[e.length - 1];
		this.ProductionRankTop10Func();
		//产量走势
		this.state.outputTrendParams.smallVariety = e[e.length - 1];
		this.productionScaleTrendFunc();
		//土地使用趋势
		this.state.landUseTrendParams.smallVariety = e[e.length - 1];
		this.landUseTrendFunc();
	}

	//主页开始时间改变
	changeIndexStartTime(e) {
		//console.log(e);
		this.setState({
			indexStartTime: e
		});
		//生产规模排名
		this.state.ProductionRankTop10Params.startTime = e;
		this.ProductionRankTop10Func();
		//产量走势
		this.state.outputTrendParams.startTime = e;
		this.productionScaleTrendFunc();
		//产量占比
		this.state.varietyStructureParams.startTime = e;
		this.varietyStructureFunc();
		//土地使用趋势
		this.state.landUseTrendParams.startTime = e;
		this.landUseTrendFunc();
		//耕地面积占比
		this.state.landAreaRatioParams.plantTimes = e;
		this.landAreaRatioFunc();
	}

	//主页结束时间改变
	changeIndexEndTime(e) {
		//console.log(e);
		this.setState({
			indexEndTime: e
		});
		//生产规模排名
		this.state.ProductionRankTop10Params.endTime = e;
		this.ProductionRankTop10Func();
		//产量走势
		this.state.outputTrendParams.endTime = e;
		this.productionScaleTrendFunc();
		//产量占比
		this.state.varietyStructureParams.endTime = e;
		this.varietyStructureFunc();
		//土地使用趋势
		this.state.landUseTrendParams.endTime = e;
		this.landUseTrendFunc();
		//耕地面积占比
		this.state.landAreaRatioParams.plantEndTimes = e;
		this.landAreaRatioFunc();
	}

	//品牌农品对话框-获取下级县区品牌农品列表
	productBrandnameListFunc(data, current) {
		let params = formatParams({
			district: data
		});
		this._tokens.push(api.product_brandname_list.send(params).then(result => {
			if(window.debugging) console.log('品牌农品对话框-获取下级县区品牌农品列表', result);
			let brandnameCollect = [];
			let content = result.content || [];
			content.map((item, i) => {
				brandnameCollect.push(item.brandName);
			});
			this.brandProductRef._setList(brandnameCollect);
			if(current) {
				this.brandProductRef.setState({
					active: current
				});
			} else {
				this.brandProductRef.setState({
					active: ''
				});
			}
		}));
	}

	//区下拉选择渲染品牌农品下拉框
	brandSiteChange(e) {
		//console.log(e);
		if(e.data != this.district) {
			this.district = e.data;
			this.brandName = '';
			this.productBrandnameListFunc(this.district, undefined);
		}
	}

	//区品牌农品
	brandProductChange(e) {
		//console.log(e);
		if(e.data != this.brandName) {
			this.brandName = e.data;
			let params = formatParams({
				brandName: this.brandName
			});
			this._tokens.push(api.product_brand_list.send(params).then((res) => {
				if(window.debugging) console.log('品牌农品详情(点击下拉框调用)', res);
				let content = res.content;
				if(content && content.length > 0) {
					this.setState({
						brandAgriculturalProductsInfoHtml: content[0].brandIntroduce,
					});
				} else {
					this.setState({
						brandAgriculturalProductsInfoHtml: '暂无数据',
					});
				}
				//this.refs.ppnpDialogRef._open(e.data);
			}));
		}
	}

	displayRender(label) {
		return label[label.length - 1];
	}
	//用于级联选择控件的搜索功能（参数：字符串，数组对象）
	cascaderFilter(inputValue, path) {
		//console.log(inputValue, path);
		return(path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
	}

	//点击品牌农品,获取信息
	getProductInfo(title, id) {
		//console.log(title, id);
		//品牌农品详情
		let params = formatParams({
			brandName: title
		});
		this._tokens.push(api.product_brand_info_by_name.send(params).then((res) => {
			if(window.debugging) console.log('通过品牌农品的名字获取品牌农品详情(点击轮播调用)', res);
			let content = res.content;
			if(content) {
				this.setState({
					brandAgriculturalProductsInfoHtml: content.brandIntroduce,
				});
				this.district = content.district;
				this.brandName = content.brandName;
				//给地区设置当前值
				this.brandSiteRef._setSelectedText(this.district);
				//需要请求县区品牌农品下拉框渲染数据
				this.productBrandnameListFunc(this.district, this.brandName);
				this.refs.ppnpDialogRef._open('品牌农品');
			}
		}));
	}

	ltpxsRateBig(text) {
		const me = this;
		switch(text) {
			case '生产规模排名':
				me.refs.dcycDialogRef._open(text);
				break;
		}
	}

	backToEchartsMap() {
		let me = this;
		me.setState({
			isEchertsMap: true,
			dpDetail: 'none',
			baseDetail: 'none',
		});
	}

	render() {
		const me = this;
		let productionScaleProvinceParams = this.state.productionScaleProvinceParams;
		let ListOfGreenhousesParams = this.state.ListOfGreenhousesParams;
		let ListOfBaseParams = this.state.ListOfBaseParams;

		return(
			<div style={{position:'relative'}}>
        <div style={{display:this.state.isEchertsMap?'block':'none'}}>
        	{/*主页时间*/}
        	<div style={{position: 'absolute', left: 640, top: 80}}>
        		<DatePickers type={'year'} width={120} max={this.state.indexEndTime} value={this.state.indexStartTime} onChange={this.changeIndexStartTime.bind(this)} placeholder={'选择开始时间'} />
	        	<span className={'to'} style={{color: '#fff', padding: '0 10px'}}>至</span>
	        	<DatePickers type={'year'} width={120} min={this.state.indexStartTime} value={this.state.indexEndTime} onChange={this.changeIndexEndTime.bind(this)} placeholder={'选择结束时间'} />
        	</div>
        	
        	{/* 品种下拉框 */}
          <Cascader options={this.state.varietySelect} defaultValue={[bigVariety, smallVariety]} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.totalVarietyControl.bind(this)}  style={{zIndex: 999, width: 350, left: 940, top: 80}} />

          <Panel title={'品牌农品'} left={30} top={100} width={440} height={285} onClick={this.ltpxsRateBig.bind(this,'生产环节')}>
            <TrunRoll ref={ref => this.ppnpRotationChartRef = ref} ProductsInfo={this.getProductInfo.bind(this)} />
          </Panel>

          {/* 品牌农品弹窗 */}
          <Dialog title={''} ref={'ppnpDialogRef'}>
						<div style={{position:'absolute',left:'80px',top:'25px'}}>
							<span>区/县：</span>
							<Select left={50} top={-5} list={this.regionList} ref={ref => this.brandSiteRef = ref} onSelectChange={this.brandSiteChange.bind(this)} />
						</div>
						<div style={{position:'absolute',left:'330px',top:'25px'}}>
							<span>品牌农品：</span>
							<Select left={80} top={-5} ref={(ref) => {this.brandProductRef = ref;}} onSelectChange={this.brandProductChange.bind(this)} />
						</div>
						<div style={{overflowY:'auto', height: '780px', padding:'80px', fontSize: 18}}>
							<div dangerouslySetInnerHTML = {{ __html: this.state.brandAgriculturalProductsInfoHtml }}></div>
							{/*<div style={{marginTop: 20}}>来自企业：<span>{this.state.fromEnter}</span></div>*/}
						</div>
					</Dialog>

          <Panel title={'生产规模排名'} left={30} top={400} width={440} height={285} type={1} onClick={this.ltpxsRateBig.bind(this,'生产规模排名')}>
            <Tab left={180} top={30} data={this.scgmpmTabData} onChange={this.productionRankingTabChange.bind(this)}/>
            <div style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'10px',top:'35px' }}>单位:{this.state.unitOfProductionScale}</div>
            <LtpxsRate top={70} ref={(ref) => { this.scgmpmTop10 = ref;}}  state={{}}/>
          </Panel>

          {/*生产规模排名*/}
          <Dialog title={''} ref={'dcycDialogRef'}>
            <div style={{padding: '60px 74px'}}>
              <div className={'select-time'}>
                <DatePickers type={'year'} max={productionScaleProvinceParams.endTime} value={productionScaleProvinceParams.startTime} placeholder={'选择开始时间'} onChange={this.ProductionRankingGetTime.bind(this,'startTime')} />
                <span className={'to'}>至</span>
                <DatePickers type={'year'} min={productionScaleProvinceParams.startTime} value={productionScaleProvinceParams.endTime} placeholder={'选择结束时间'} onChange={this.ProductionRankingGetTime.bind(this,'endTime')} />
                <Cascader options={this.state.varietySelect} defaultValue={[bigVariety, smallVariety]} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.ProductionRankingCascaderSelect.bind(this)} style={{left: 64}} />
                <Tab left={800} data={this.scgmpmTabData} onChange={this.bigProductionRankingTabChange.bind(this)}/>
              </div>
            </div>
            <YunchengMap ref={(ref) => {this.yunchengMapRef = ref;}} left={50} top={120} width={800} height={580} />
            <div style={{ position:'absolute',top:'110px',left:'950px',fontSize:'16px' }}>
							<span style={{ marginRight:'20px' }}>运城市：{this.state.yunchengTotal} {this.state.unitTotal}</span>
						</div>
						<Panel title={'区县排行榜'} width={440} type={false} height={490} top={150} left={950} onClick={this.ltpxsRateBig.bind(this)}>
              <div className={'bigScgmpmUnit'} style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'70px',top:'26px' }}>单位:{this.state.bigUnitOfProductionScale}</div>
              <LtpxsRate top={60} height={500} ref={(ref) => { this.bigScgmpmTop10 = ref;}} state={{}}/>
            </Panel>
          </Dialog>

          <Panel title={'产量走势'} left={30} top={710} width={440} height={300} onClick={this.ltpxsRateBig.bind(this,'产量走势')}>
            <BarLine ref={ref => this.scgmTrendRef = ref} height={270} top={30} legendLeft={'center'} />
          </Panel>

          <Panel title={'产量占比'} left={1450} top={94} width={440} height={285}>
            <Pie ref={ref => this.pieRef = ref} style={{width:'440',height:'280', top: '20'}} />
          </Panel>

          <Panel title={'土地使用趋势'} left={1450} top={400} width={440} height={285}>
          	<LineSingle ref={ref => this.landUseTrendRef = ref} height={280} showSymbol={false} dataZoom={false} />
          </Panel>

          <Panel title={'耕地面积占比'} left={1450} top={710} width={440} height={285}>
            <DiyPie ref={ref => this.landAreaRatioRef = ref} top={30} height={270} name={'耕地面积占比'} />
          </Panel>

          {/*中间地图*/}
          <Panel title={'种植分布'} top={120} left={549} width={440} height={880}>
            <CenterMap style={{width: '870px', height: '880px'}} mapClickHandle={this._mapClickHandle.bind(this)} ref={ref => this._centerMapRef = ref} />
          </Panel>
          <ul style={{zIndex: 2, position: 'absolute', top: 900, left: 700}}>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_vegetable} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>蔬菜</div>
						</li>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_food} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>粮食</div>
						</li>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_fruit} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>水果</div>
						</li>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_jjzw} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>经济作物</div>
						</li>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_animal} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>畜产</div>
						</li>
						<li style={{float: 'left', marginRight: 5}}>
							<div style={{position: 'relative', width: 115, height: 32, background: `url(${foot_bg})`}}><img style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translate(-50%)'}} src={icon_aquatic} /></div>
							<div style={{height: 37, lineHeight: '37px', fontSize: 20, color: '#fff', textAlign: 'center'}}>水产</div>
						</li>
					</ul>
        </div>

        {/* gis */}
        <div style={{ display:!this.state.isEchertsMap?'block':'none',position:'absolute',top:'100px',left:'31px',width:'1858px',height:'900px'}}>
					<Select ref={ref => this.gisSiteSelectRef = ref} zIndex={200} position={'absolute'} top={0} left={1045} width={130} list={this.regionList} onSelectChange={this.gisSiteSelectChange.bind(this)} />

					<Cascader options={this.state.varietySelect2} value={this.state.plantType} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.mapVarietyControl.bind(this)} style={{position: 'absolute', left: 1200}} />

          <Search ref={ref=>this.gisSearchRef=ref} placeholder="大棚所有者姓名" onSearch={this.mapSearchChange.bind(this)} style={{ width: 290, position:'absolute', left:'1440px'}} />
          <div onClick={this.backToEchartsMap.bind(this)} style={{ width:'100px',height:'30px',backgroundColor:'#053d88',color:'#46bec6',position:'absolute',right:'0',textAlign:'center',lineHeight:'30px',cursor:'pointer' }}>返回</div>

          <Panel title={'种植分布'} style={{position:'absolute',type:false}} width={440}>
            <div className={"production-testing-head"} style={{marginTop: 40, marginLeft: 50, marginBottom: 10}}>
              <div className={this.state.isGreenhouseList?"git-head-item":"git-head-item background"} onClick={this.baseListFunc.bind(this)}>
                <p className={'blue'}><span>{this.state.baseNumber}</span>个</p>
                <p>基地/园区</p>
              </div>
              <div className={this.state.isGreenhouseList?"git-head-item background":"git-head-item"} onClick={this.greenhouseList.bind(this)}>
                <p className={'orange'}><span>{this.state.greenhouseNumber}</span>个</p>
                <p>大棚</p>
              </div>
            </div>

            <div style={{display:this.state.isGreenhouseList?'none':'block'}}>
              <GisTableBase openBaseDetails={this.openBaseDetail.bind(this)} ref={ref => this.baseGisTableRef = ref} width={"500px"}/>
							<div style={{marginLeft: 160, marginTop: 20}}>
                <Pagination simple hideOnSinglePage current={ListOfBaseParams.pageNum} pageSize={ListOfBaseParams.pageSize} total={ListOfBaseParams.total} onChange={this.gisMapPageChange1.bind(this)} />
              </div>
            </div>

            <div style={{display:this.state.isGreenhouseList?'block':'none'}}>
              <GisTable openDetails={this.openGreenhousrDetail.bind(this)} ref={ref => this.GisTableRef = ref} width={"500px"} />
              <div style={{marginLeft: 160, marginTop: 20}}>
                <Pagination simple hideOnSinglePage current={ListOfGreenhousesParams.pageNum} pageSize={ListOfGreenhousesParams.pageSize} total={ListOfGreenhousesParams.total} onChange={this.gisMapPageChange.bind(this)} />
              </div>
            </div>

            <GisMap ref={ref => this.GisMapRef = ref} zoom={16} style={{position:'absolute', top:'50px', left:'520px'}} name={'联系人'} markerClick={this.gisMapMarkerClick.bind(this)} />
          </Panel>

          <GreenhouseDetails ref={ref=>this.greenhouseDetailsRef=ref} close={this.detailsClose.bind(this)} display={this.state.dpDetail}></GreenhouseDetails>
          <BaseDetails close={this.BaseDetailsClose.bind(this)} ref={ref=>this.baseDetailsRef=ref} display={this.state.baseDetail}></BaseDetails>
        </div>
      </div>
		)
	}
}

export default ProductionTesting;
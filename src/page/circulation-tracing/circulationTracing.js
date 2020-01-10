import React from 'react';
import Panel from '../../component/panel/Panel';
import './circulationTracing.css';
/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-circulation-tracing';

//主页放大弹框
import Dialog1 from '../../component/dialog/Dialog1';
//农产品交易量及价格分析
import SalePriceAnalysis from '../../component/sale-price-analysis/SalePriceAnalysis3';
//批发价零售价对比
import PriceComparison from '../../component/sale-price-analysis/PriceComparison';
//主页-批发市场数量-交易品种数量
import TurnUp from '../../component/turn-up/TurnUp';
//农产品采收量监测
import LineSingle from '../../component/echarts/LineSingle1';
//饼图
import Pie from '../../component/echarts/pie/Pie';
/*农产品销售流向*/
import ChinaMap from '../../component/map-component/center-map/chinaMap';

/*中间地图*/
import ChinaMap1 from '../../component/echarts/chinaMap/ChinaMap';

import Observation2 from '../../component/window/Observation2';
import ObservationDetails2 from '../../component/window/ObservationDetails2';
/*引入标记点窗口*/
import MarkPoint from '../../component/window/MarkPoint';

//世界地图  运城市农产品流通概况
import YunchengMap from '../../component/map-component/center-map/yunchengMap';
/*gisMap*/
import GisMap from '../../component/map-component/gisMap/gisMap';
/*下拉选择框*/
import Select from '../../component/select/Select';
import Select1 from '../../component/select/Select4';
import Select2 from '../../component/select/Select2';
import Select3 from '../../component/select/Select3';
/*引入antd框架*/
import { Input, DatePicker, Cascader, Table, message } from 'antd';

//排序
import LtpxsRate from '../../component/list/DivChart2';
//农产品采收量监测 弹框 各区县才收量分析
import ScjcSingleColumn from '../../component/echarts/ltSingleColumn'
import Tab from '../../component/tab/Tab';

/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, formatParams, cloneFn } from '../../tool/tool.js';

/*引入日期插件*/
import DatePickers from '../../component/DatePickers/DatePickers';
//引入假数据
import commonData from '../../data/commonData';
import demoData from './data';

import TableNew from './tableNew';

const Search = Input.Search;
const paramsDay = setParamsDay();
const paramsDay12 = setParamsDay(12);
const paramsDay24 = setParamsDay(24);
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear();
const nowDay = getNowDay();
const region = '盐湖区';
const bigVariety = '蔬菜';
const smallVariety = '黄瓜';
const commonParams = {
	timeType: 'MONTH',
	region: region,
	smallVariety: smallVariety,
};

class CirculationTracing extends React.Component {
	constructor() {
		super();
		this.state = {
			//农产品交易量及价格分析
			dealPriceParams: {
				timeType: 'month',
				startTime: paramsMonth.startTime,
				endTime: paramsMonth.endTime,
			},
			//批发价零售价对比
			priceContrastParams: {
				timeType: 'year',
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
			},
			//农产品采收量监测
			ncpcslParams: {
				timeType: 'month',
				startTime: paramsMonth.startTime,
				endTime: paramsMonth.endTime,
			},
			/*农产品销售流向*/
			xslxParams: {
				timeType: 'day',
				startTime: paramsDay12.startTime,
				endTime: paramsDay12.endTime,
			},
			isOpen: false,
			cont: '',
			children: null,
			isEchertsMap: true,
			num: null,
			dataSource: [],
			dataSource1: [],
			varietySelect: commonData.varietySelect,

			flow: false,
			flow0: false,
		};

		this.tabData3 = ['批发', '零售'];
		this.tabData5 = ['按年', '按月'];
		this.tabData6 = ['流出', '流入'];

		this.yearMonthDaySelect = ['按月', '按日', '按年'];

		//农产品销售流向
		this.ncpxslxVariety = [bigVariety, smallVariety];

		//农产品交易量及价格分析
		this.dealPriceTimeType = '按月';
		this.DealPriceType = [bigVariety, smallVariety]; //弹窗的品种
		this.dealPriceRegion = region;
		this.dealPriceRegionBig = region;
		this.DealPriceOrgId = '';
		this.DealPriceOrgIdBig = '';

		/**批发价零售价对比---弹窗*/
		this.priceContrastTimeType = '按年';
		this.priceContrastType = [bigVariety, smallVariety]; //弹窗的品种
		this.priceContrastRegion = region;

		/**农产品品种交易结构分析---弹窗*/
		this.dealStructureStartTime = paramsDay12.startTime;
		this.dealStructureEndTime = paramsDay12.endTime;
		this.dealStructureRegion = region;
		this.dealStructureBigVariety = bigVariety;

		/**运城市农产品流通概况---弹窗*/
		this.startTimeImpExpTrade = paramsDay12.startTime;
		this.endTimeImpExpTrade = paramsDay12.endTime;
		this.productTypeImpExpTrade = [bigVariety, smallVariety];

		/**实时交易信息*/
		this.realTimeTradingVariety = [bigVariety, smallVariety];

		//gis  农产品交易量及价格分析
		this.regionGisMap = region;
		this.keyword = '';

		this.orgId = 0;
		this.points = [];
		//GIS左侧列表当前类型（0为批发市场，1为合作社）
		this.gisTableType = 0;
		//批发市场当前页
		this.marketPage = 1;
		//合作社当前页
		this.artelPage = 1;

		this.locale = {
			emptyText: '暂无数据',
		};
		//交易实时信息
		this.observationColumns1 = demoData.observationColumns1;
		//交易实时信息-大图
		this.observationColumns2 = demoData.observationColumns2;
		//批发市场参数
		this.price_form = {
			province: '',
			city: '',
			smallVariety: smallVariety,
		};

		this._tokens = [];
		this.regionList = commonData.regionSelect;
		this.lng = 111.00699;
		this.lat = 35.02628;
		this.isShowObservationDetails = false; //默认隐藏gis列表详情
		this.flowProfileRegion = '盐湖区';
		this.smallVarietyIndex = smallVariety; //主页品种

	}

	componentDidMount() {
		const me = this;
		//农产品交易价格分析
		me.paramsDealPrice = { ...commonParams
		};

		//批发价零售价对比
		me.paramsPriceContrast = {
			timeType: 'YEAR',
			region: region,
			smallVariety: smallVariety,
		};

		//农产品采收量监测
		me.paramsNcpcsl = { ...commonParams
		};
		delete me.paramsNcpcsl.smallVariety;

		//农产品销售流向
		me.paramsXslx = {
			shucai: smallVariety,
			flowType: '流出',
		};

		//生成GIS左上角图例数据
		me.MarkPointRef.setData(demoData.markPointData);

		//获取主页所有数据
		me.get_main_data();

		//获取下拉选择框地区列表
		me.getSelectRegion();
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		this._clearTokens();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}

	/*获取下拉选择框地区列表*/
	getSelectRegion() {
		this._tokens.push(apiAll.selectRegion.send().then(res => {
			if(window.debugging) console.log('地区', res);
			this.regionList = res.data || this.regionList;
			this.priceAnalysisSiteRef._setList(this.regionList); //农产品交易量及价格分析-主页
			this.priceAnalysisSiteRef._setSelectedText(this.dealPriceRegion); //农产品交易量及价格分析-设置默认值，必须写在这
		}));
	}

	//农产品销售流向-主页
	get_sale_tradeInfo() {
		let me = this;
		let params = formatParams({
			shucai: this.smallVarietyIndex,
			flowType: '流出',
			startTime: paramsDay12.startTime,
			endTime: paramsDay12.endTime,
		});
		this._tokens.push(api.sale_tradeInfo.send(params).then((res) => {
			if(window.debugging) console.log('农产品销售流向-主页', res);
			let out = res.content.out || [];
			let dataArr = [];
			if(out.length > 0) {
				out.map((item, i) => {
					dataArr.push({
						name: item.xiaodi,
						value: item.weight,
						flow: this.state.flow0
					});
				});
			}
			me.refs.chinaMapRef._setData(dataArr);
		}));
	}

	//农产品销售流向-弹窗
	get_sale_tradeInfo_big() {
		let me = this;
		let params = formatParams({
			...me.paramsXslx,
			startTime: me.state.xslxParams.startTime,
			endTime: me.state.xslxParams.endTime,
		});
		if(me.paramsXslx.flowType == '流出') {
			this._tokens.push(api.sale_tradeInfo.send(params).then((res) => {
				if(window.debugging) console.log('农产品销售流向-弹窗', res)
				let dataOut = {},
					dataArr = [];
				if(res.content.out != [] && res.content.out != null) {
					res.content.out.map((item, i) => {
						dataOut = {
							name: item.xiaodi,
							value: item.weight,
							flow: this.state.flow0
						};
						dataArr.push(dataOut);
					});
				}
				me.refs.bigChinaMapRef._setData(dataArr);
			}));

			this._tokens.push(api.sale_tradeOrder.send(params).then((res) => {
				if(window.debugging) console.log('农产品销售流向-弹窗-排行榜', res)
				let dataIn = {},
					dataArr = [];
				if(res.content.length > 0) {
					res.content.map((item, i) => {
						dataIn = {
							name: item.xiaodi,
							value: item.weight,
							flow: true
						};
						dataArr.push(dataIn);
					});
				}
				me.refs.plantingAreaTop102._setData(dataArr);
			}));
		} else if(me.paramsXslx.flowType == '流入') {
			this._tokens.push(api.sale_tradeInfo.send(params).then((res) => {
				if(window.debugging) console.log('农产品销售流向', res)
				let dataIn = {},
					dataArr = [];
				if(res.content.in != [] && res.content.in != null) {
					res.content.in.map((item, i) => {
						dataIn = {
							name: item.xiaodi,
							value: item.weight,
							flow: this.state.flow0
						};
						dataArr.push(dataIn);
					});
				}
				me.refs.bigChinaMapRef._setData(dataArr);
				me.refs.plantingAreaTop102._setData([]);
			}));
		}
	}

	//农产品交易量及价格分析-弹窗-品种改变
	changeDealPriceSmallVariey(arr) {
		this.DealPriceType = arr;
		this.get_deal_price_big();
	}

	//打开弹框
	openDialog = (text) => {
		this.setState({
			isOpen: true,
			cont: text,
			children: ``
		});
		setTimeout(() => {
			switch(text) {
				case "农产品交易量及价格分析":
					//按年，按月，按日
					this.dealPriceYearMonthDaySelectRef._setSelectedText(this.dealPriceTimeType);
					//地区
					this.bigPriceAnalysisSiteRef._setSelectedText(this.dealPriceRegionBig);
					//农产品交易量及价格分析-弹窗-批发市场改变
					this.gisSaleSelectBig();
					break;
				case "批发价零售价对比":
					//按年，按月，按日
					this.priceContrastYearMonthDaySelectRef._setSelectedText(this.priceContrastTimeType);
					//地区
					this.bigPriceContrastSiteRef._setSelectedText(this.priceContrastRegion);
					this.get_price_contrast_big();
					break;
				case "农产品采收量监测":
					this.getNcpcslData();
					break;
				case "农产品销售流向":
					this.get_sale_tradeInfo_big();
					break;
				case "运城市农产品流通概况":
					this.bigFlowProfileSelectRef._setSelectedText(this.flowProfileRegion); //运城市农产品流通概况-弹窗-地区，设置当前值
					if(this.state.flow) { //true为流入
						this.bigFlowProfileTabRef.setState({
							defaultItem: 1
						});
					} else {
						this.bigFlowProfileTabRef.setState({
							defaultItem: 0
						});
					}
					this.getFlowProfileData('bigYunchengMapRef');
					break;
				case "农产品品种交易结构分析":
					if(this.state.isEchertsMap) {
						//地区
						this.bigDealStructureSelectRef._setSelectedText(this.dealStructureRegion);
						this.dealStructureBigVariety = bigVariety;
						this.get_deal_structure();
						this.get_deal_variety_ranking();
					}
					break;
			}
		});
	};

	closeDialog = (flag) => {
		let me = this;
		this.setState({
			isOpen: flag
		});
	};

	//运城市农产品流通概况弹窗-流入、流出选项卡切换
	tabChangeImpExpTrade(e) {
		//console.log(e.label)
		if(e.label === '流入') {
			this.setState({
				flow: true
			});
		} else if(e.label === '流出') {
			this.setState({
				flow: false
			});
		}
		setTimeout(() => {
			this.getFlowProfileData('bigYunchengMapRef');
		});
	}

	//地区改变
	siteSelectChange(ref, params, fn, data) {
		//console.log(data);
		let me = this;
		let name = data.name;
		let lastName = me[ref]._getText();
		//console.log(lastName, name);
		if(lastName == name) {
			return;
		}
		me[params].region = name;
		me[fn]();
	}

	//运城市农产品流通概况弹窗-地区改变
	flowProfileSelectChange(data) {
		let me = this;
		let name = data.name;
		let lastName = me.bigFlowProfileSelectRef._getText();
		console.log(lastName, name);
		if(lastName == name) {
			return;
		}
		me.flowProfileRegion = name;
		me.getFlowProfileData('bigYunchengMapRef');
	}

	//品种改变
	varietyChange(params, fn, arr) {
		//console.log(arr);
		let me = this;
		let name = arr[arr.length - 1];
		let lastName = me[params].shucai;
		//console.log(lastName, name);
		if(lastName == name) {
			return;
		}
		me.ncpxslxVariety = arr;
		me[params].shucai = name;
		me[fn]();
	}

	//农产品交易量及价格分析-主页-批发市场列表
	gisSaleSelect(name) {
		name = name || region;
		let params = formatParams({
			pageable: false,
			pageNum: 1,
			pageSize: 10,
			region: name,
			orgType: '批发市场',
			isLocal: 0,
			orgTypes: '',
			keyword: ''
		});
		this._tokens.push(api.org_details_list.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易量及价格分析-主页-批发市场列表', res)
			let list = res.content.list || [];
			let market = [];
			list.map((item, i) => {
				let items = {
					name: item.name,
					id: item.id
				};
				market.push(items)
			});
			this.priceAnalysisMarketRef._setList(market);
			if(market.length > 0) {
				this.priceAnalysisMarketRef._setSelectedText(market[0].name);
				this.DealPriceOrgId = market[0].id;
			}
			this.get_deal_price();
		}));
	}

	//农产品交易量及价格分析-弹窗-批发市场列表
	gisSaleSelectBig() {
		let params = formatParams({
			pageable: false,
			pageNum: 1,
			pageSize: 10,
			region: this.dealPriceRegionBig,
			orgType: '批发市场',
			isLocal: 0,
			orgTypes: '',
			keyword: ''
		});
		this._tokens.push(api.org_details_list.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易量及价格分析-弹窗-批发市场列表', res);
			let list = res.content.list || [];
			let market = [];
			list.map((item, i) => {
				let items = {
					name: item.name,
					id: item.id
				};
				market.push(items)
			});
			this.bigPriceAnalysisMarketRef._setList(market);
			if(market.length > 0) {
				this.bigPriceAnalysisMarketRef._setSelectedText(market[0].name);
				this.DealPriceOrgIdBig = market[0].id;
			} else {
				this.bigPriceAnalysisMarketRef._setSelectedText('');
				this.DealPriceOrgIdBig = '';
			}
			this.get_deal_price_big();
		}));
	}

	//gis下拉框
	gisSiteSelectChange(data) {
		//console.log(data);
		let me = this;
		let name = data.name;
		if(me.regionGisMap == name) {
			return;
		}
		me.regionGisMap = name;
		//清除GIS地图所有markpoint
		me.GisMapRef.clearOverLays();
		/*GIS地图-批发市场和合作社的数量*/
		me.org_details_count();
		/*GIS地图-组织机构信息-组织机构列表查询*/
		me.org_details_list();
		//关闭GIS左侧列表详情，隐藏右侧icon列表，隐藏小窗
		me.ObservationDetailsRef.closeDetails();
	}

	//GIS页面-搜索框
	gisSiteSearch(val) {
		//console.log(val);
		let me = this;
		me.keyword = val.trim(); //去掉首尾空格
		me.marketPage = 1; //批发市场页码变为1
		me.artelPage = 1; //合作社页码变为1
		/*GIS地图-组织机构信息-组织机构列表查询*/
		me.org_details_list();
		me.org_details_count();
		//搜索机构名称时，关闭GIS左侧列表详情
		me.ObservationDetailsRef.closeDetails();
	}

	backToEchartsMap() {
		let me = this;
		me.ObservationDetailsRef.closeDetails();
		me.setState({
			isEchertsMap: true,
			isOpen: false,
		})
	}

	//批发价零售价对比-地区改变
	priceContrastSiteChange(e) {
		console.log('批发价零售价对比-地区改变', e);
		this.priceContrastRegion = e.name;
		this.get_price_contrast_big();
	}

	/**农产品品种交易结构分析*/
	dealStructureSiteChange(e) {
		//console.log('农产品品种交易结构分析-地区改变', e);
		this.dealStructureRegion = e.name;
		this.dealStructureBigVariety = bigVariety;
		this.get_deal_structure();
		this.get_deal_variety_ranking();
	}

	/**运城市农产品流通概况*/
	flowProfileSmallVarietyChange(value) {
		this.productTypeImpExpTrade = value;
		this.getFlowProfileData('bigYunchengMapRef');
	}

	//点击GIS地图标记，显示详情
	markerClick(marker) {
		//console.log(marker);
		let me = this;
		let id = marker.data.key;
		if(me.orgId != id) {
			//初始化GIS左侧列表的active
			me.ObservationRef.initActive();
		}
		me.showObservationDetails(id);
	}

	//点击GIS左侧列表，显示详情
	showObservationDetails(id) {
		let me = this;
		//console.log(id);
		//打开GIS左侧列表详情小窗
		//如果点击的机构和当前选中的机构相同，则不调接口
		if(me.orgId == id) {
			if(!me.isShowObservationDetails) {
				me.ObservationDetailsRef.openDetails();
				me.GisMapRef.highlightIcon(this.points[0], this.points[1]);
				//注意执行的先后顺序
				me.isShowObservationDetails = true;
			} else {
				me.ObservationDetailsRef.closeDetails();
			}
			return;
		}

		me.isShowObservationDetails = true;
		me.ObservationDetailsRef.openDetails();

		me.orgId = id;
		//组织机构信息-组织机构信息查询
		let params = formatParams({
			orgId: id
		});
		me._tokens.push(api.org_details_info.send(params).then((res) => {
			if(window.debugging) console.log('组织机构信息-组织机构信息查询', res);
			let content = res.content;
			//给GIS左侧列表详情小窗添加数据
			me.ObservationDetailsRef.setData({
				id: content.id,
				name: content.name,
				type: content.type,
				region: content.region,
				address: content.address,
				linkMan: content.linkMan,
				mainBiz: content.mainBiz,
			});
			if(!content.lng || !content.lat) {
				me.points = [me.lng, me.lat]; //保存坐标点
				me.GisMapRef.centerTo(me.lng, me.lat);
				//改变点击图标方法
				me.GisMapRef.highlightIcon(me.lng, me.lat);
			} else {
				//定位选中的检测机构到地图中心点
				me.points = [content.lng, content.lat]; //保存坐标点
				me.GisMapRef.centerTo(content.lng, content.lat);
				//改变点击图标方法
				me.GisMapRef.highlightIcon(content.lng, content.lat);
			}
		}));
	}

	//全部品种下拉框
	get_product_tree() {
		let me = this;
		let params = formatParams({
			rootId: 0,
			keyword: '',
		});
		this._tokens.push(apiAll.product_tree.send(params).then(res => {
			if(window.debugging) console.log('产品类型信息接口', res);
			let content = res.content;
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
					})
				}
			});
			//console.log(varietySelect);
			me.setState({
				varietySelect
			});
		}));
	}

	//农产品采收量监测
	getNcpcslData() {
		let params = formatParams({
			...this.paramsNcpcsl,
			startTime: this.state.ncpcslParams.startTime,
			endTime: this.state.ncpcslParams.endTime,
		});
		this._tokens.push(api.collection_monitor_total.send(params).then((res) => {
			if(window.debugging) console.log('农产品采收量监测', res);
			let years = [];
			let num = [];
			let num1 = [];
			res.content.map((item, i) => {
				years.push(item.dateStr);
				num.push(item.amountHarvest)
				num1.push(item.stockVolume)
			});
			let options = {
				data: num,
				date: years,
				data1: num1,
				unit: 'kg'
			}
			demoData.ncpcsljcDom = options;
			this.refs.ncpcsljcRef._setData(demoData.ncpcsljcDom);
			if(this.state.isOpen && this.state.cont === "农产品采收量监测") {
				const me = this;
				me.refs.ncpcsljcr11._setData(demoData.ncpcsljcDom);
			}
		}));

		//各区县农产品采收量分析
		this._tokens.push(api.collection_monitor_region.send(params).then((res) => {
			if(window.debugging) console.log('各区县农产品采收量分析', res);
			var datax = [],
				datay = [];
			res.content.map((item, i) => {
				datax.push(item.region);
				datay.push(item.amountHarvest)
			});
			var data = {
				datax: datax,
				datay: datay,
				text: '2018'
			}
			if(this.state.isOpen && this.state.cont == '农产品采收量监测') {
				this.bigWtrateFxRef.setData(data)
			}
		}));
	}

	//农投品交易量及价格分析-主页
	get_deal_price() {
		let params = formatParams({
			timeType: 'MONTH',
			startTime: paramsMonth.startTime,
			endTime: paramsMonth.endTime,
			region: this.dealPriceRegion,
			orgId: this.DealPriceOrgId,
			smallVariety: this.smallVarietyIndex,
		});
		this._tokens.push(api.deal_price.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易量及价格分析-主页', res);
			if(res.code == 0) {
				let DealPriceObj = {
					barData: [], //批发
					//sellPriceData: [], //销售
					lineData: [], //交易量
					xDateTime: [] //时间
				};
				res.content.forEach((item, i) => {
					DealPriceObj.barData.push(item.wholesalePrice);
					//DealPriceObj.sellPriceData.push(item.sellPrice);
					DealPriceObj.lineData.push(item.volume);
					DealPriceObj.xDateTime.push(item.dateTime);
				})
				this.salePriceAnalysis._setData(DealPriceObj);
			}
		}));
	}

	//农投品交易量及价格分析-弹窗
	get_deal_price_big() {
		let params = formatParams({
			timeType: this.paramsDealPrice.timeType,
			startTime: this.state.dealPriceParams.startTime,
			endTime: this.state.dealPriceParams.endTime,
			region: this.dealPriceRegionBig,
			orgId: this.DealPriceOrgIdBig,
			smallVariety: this.DealPriceType[this.DealPriceType.length - 1],
		});
		this._tokens.push(api.deal_price.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易量及价格分析-弹窗', res);
			if(res.code == 0) {
				let DealPriceObj = {
					barData: [], //批发
					//sellPriceData: [], //销售
					lineData: [], //交易量
					xDateTime: [] //时间
				};
				res.content.forEach((item, i) => {
					DealPriceObj.barData.push(item.wholesalePrice);
					//DealPriceObj.sellPriceData.push(item.sellPrice);
					DealPriceObj.lineData.push(item.volume);
					DealPriceObj.xDateTime.push(item.dateTime);
				})
				this.salePriceAnalysisBig._setData(DealPriceObj);
			}
		}));
	}

	/*获取主页数据*/
	get_main_data() {
		let me = this;
		//实时交易信息--主页
		me.get_today_trading_list();

		//农产品销售流向
		me.get_sale_tradeInfo();

		//农产品交易价格分析 主页 地区-批发市场联动
		me.gisSaleSelect(me.dealPriceRegion);

		//批发价零售价对比
		me.get_price_contrast();

		//主页批发市场数量 交易品种数量 
		me.TradeMessage1();

		//农产品品种交易结构分析
		me.get_deal_structure();

		//全部品种下拉框
		me.get_product_tree();

		// 农产品采收量监测
		me.getNcpcslData();

		//实时交易信息--弹框
		me.get_today_trading_list_big();

		//运城市农产品流通概况
		me.getFlowProfileData('YunchengMapRef');
	}

	//主页品种改变后调的接口，如：wholesale_market_price和allPrice
	mapChangeVarietyChange(value) {
		let variety = value[1];
		this.smallVarietyIndex = variety; //主页品种
		this.price_form.smallVariety = variety;
		//中间地图的接口
		this.wholesaleMarket();
		//调接口-实时交易信息
		this.get_today_trading_list();
		//农产品销售流向
		this.get_sale_tradeInfo();
		//农投品交易量及价格分析
		this.get_deal_price();
		//批发价零售价对比
		this.get_price_contrast();
	}

	get_today_trading_list() {
		let params = formatParams({
			pageable: true,
			pageNum: 1,
			pageSize: 5,
			region: region,
			smallVariety: this.smallVarietyIndex,
		});
		this._tokens.push(api.today_trading_list.send(params).then((res) => {
			if(window.debugging) console.log('地图主页展示-实时交易额数据列表-主页', res)
			let content = res.content;
			let list = content.list || [];
			let optarr = [];
			if(list.constructor == Array) {
				list.map((item, i) => {
					//console.log(item);
					let time = item.dateDate.split('T')[0];
					let options = {
						name: item.buyerName,
						product: item.productName,
						price: item.transactionPrice + '元/公斤',
						time: time,
						//time: getNowDay(),
						key: item.id,
					}
					optarr.push(options);
				});
				this.setState({
					dataSource: optarr
				});
				this.refs.tableNew.setData({
					dataList: optarr
				});

			} else {
				this.setState({
					dataSource: []
				});
				this.refs.tableNew.setData({
					dataList: []
				});
			}
		}));
	}

	//农产品交易结构分析-销售品种
	get_deal_structure() {
		let params = formatParams({
			region: this.dealStructureRegion,
			startTime: this.dealStructureStartTime,
			endTime: this.dealStructureEndTime
		});
		this._tokens.push(api.deal_structure.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易结构分析-销售品种', res);
			let content = res.content || [];
			let series = [];
			content.map((item, i) => {
				series.push({
					name: item.variety,
					value: item.salesVolume
				});
			});
			demoData.pieData.seriesData = series;
			//console.log(JSON.stringify(demoData.pieData));
			this.dealStructureRef.setData(demoData.pieData);
			if(this.state.isOpen && this.state.cont === "农产品品种交易结构分析") {
				this.bigDealStructureRef.setData(demoData.pieData);
			}
		}));
	}

	//农产品交易结构分析-地区销量排序
	get_deal_variety_ranking() {
		let params = formatParams({
			region: this.dealStructureRegion,
			startTime: this.dealStructureStartTime,
			endTime: this.dealStructureEndTime,
			bigVariety: this.dealStructureBigVariety
		});
		this._tokens.push(api.deal_variety_ranking.send(params).then((res) => {
			if(window.debugging) console.log('农产品交易结构分析-地区销量排序', res);
			let list = res.content || [];
			let arr = [];
			list.map((item, i) => {
				arr.push({
					name: item.smallVariety,
					value: item.tradingWeight
				});
			});
			if(this.state.isOpen && this.state.cont === "农产品品种交易结构分析") {
				this.bigSaleOrderRef._setData(arr);
			}
		}));
	}
	//实时交易信息
	get_today_trading_list_big() {
		let params = formatParams({
			pageable: false,
			pageNum: 1,
			pageSize: 10,
			region: region,
			smallVariety: this.realTimeTradingVariety[this.realTimeTradingVariety.length - 1],
		});
		this._tokens.push(api.today_trading_list.send(params).then((res) => {
			if(window.debugging) console.log('地图主页展示-实时交易额数据列表', res)
			let content = res.content;
			let list = content.list || [];
			let optarr = [];
			if(list.constructor == Array) {
				list.map((item, i) => {
					//console.log(item);
					let time = item.dateDate.split('T')[0];
					let options = {
						name: item.buyerName,
						area: item.region,
						product: item.productName,
						weight: item.tradingWeight + 'kg',
						time: time,
						//time: getNowDay(),
						price: item.transactionPrice + '元/公斤',
						key: item.id,
					}
					optarr.push(options);
				});
				this.setState({
					dataSource1: optarr
				});
			} else {
				this.setState({
					dataSource1: []
				});
			}
		}));
	}

	//批发价零售价对比-主页
	get_price_contrast() {
		let params = formatParams({
			timeType: 'YEAR',
			region: region,
			smallVariety: this.smallVarietyIndex,
			startTime: paramsYear.startTime,
			endTime: paramsYear.endTime,
		});
		this._tokens.push(api.price_contrast.send(params).then((res) => {
			if(window.debugging) console.log('批发价零售价对比-主页', res);
			let content = res.content || [];
			let PriceObj = {
				timeData: [],
				Data1: [],
				Data2: []
			}
			content.forEach((item, i) => {
				PriceObj.Data1.push(item.marketPrice)
				PriceObj.Data2.push(item.tradePrice)
				PriceObj.timeData.push(item.dateTime)
			});
			this.priceContrastRef._setData(PriceObj);
		}));
	}

	//批发价零售价对比-弹窗
	get_price_contrast_big() {
		let params = formatParams({
			timeType: this.paramsPriceContrast.timeType,
			startTime: this.state.priceContrastParams.startTime,
			endTime: this.state.priceContrastParams.endTime,
			region: this.priceContrastRegion,
			smallVariety: this.priceContrastType[this.priceContrastType.length - 1],
		});
		this._tokens.push(api.price_contrast.send(params).then((res) => {
			if(window.debugging) console.log('批发价零售价对比-弹窗', res)
			let content = res.content || [];
			let PriceObj = {
				timeData: [],
				Data1: [],
				Data2: []
			}
			content.forEach((item, i) => {
				PriceObj.Data1.push(item.marketPrice)
				PriceObj.Data2.push(item.tradePrice)
				PriceObj.timeData.push(item.dateTime)
			});
			this.bigPriceContrastRef._setData(PriceObj)
		}));
	}
	// 运城市农产品流通概况
	getFlowProfileData(refsName) {
		let type = '流出';
		if(this.state.flow) {
			type = '流入';
		} else {
			type = '流出';
		}
		let params = formatParams({
			importExport: type,
			startTime: this.startTimeImpExpTrade,
			endTime: this.endTimeImpExpTrade,
			smallVariety: this.productTypeImpExpTrade[this.productTypeImpExpTrade.length - 1],
			tradeArea: this.flowProfileRegion
		});

		/*//假数据
		this[refsName]._setData({
			data: demoData.flowProfile,
			name: this.flowProfileRegion
		});
		if(this.state.isOpen && this.state.cont == '运城市农产品流通概况') {
			this.plantingAreaTop100._setData(demoData.flowProfile);
		}*/
		this._tokens.push(api.analysis_trade_country.send(params).then((res) => {
			if(window.debugging) console.log('运城市农产品流通概况', res);
			let content = res.content || [];
			let dataArr = [];
			content.map((item, i) => {
				dataArr.push({
					name: item.country,
					value: item.dealNum
				});
			});
			demoData.flowProfile = dataArr;
			//console.log(demoData.flowProfile);
			this[refsName]._setData({
				data: demoData.flowProfile,
				name: this.flowProfileRegion
			});
			if(this.state.isOpen && this.state.cont == '运城市农产品流通概况') {
				this.plantingAreaTop100._setData(demoData.flowProfile);
			}
		}));
	}

	//组织机构信息-组织机构总量查询
	org_details_count() {
		let me = this;
		let params = formatParams({
			region: me.regionGisMap,
			orgType: '批发市场',
			keyword: me.keyword || ''
		});
		this._tokens.push(api.org_details_count.send(params).then((res) => {
			if(window.debugging) console.log('组织机构信息-组织机构总量查询-批发市场', res)
			let content = res.content;
			me.marketCount = content.count;
			me.ObservationRef.setData1([{
				name: '批发市场数量',
				num: me.marketCount,
				unit: '家',
				color: 'head-blue',
			}]);
		}));
	}

	//组织机构信息-组织机构列表查询，flag参数为true时定位gis地图中心点
	org_details_list(flag) {
		let me = this;
		let params = formatParams({
			pageable: false,
			pageNum: 1,
			pageSize: 10,
			region: me.regionGisMap,
			keyword: me.keyword,
			isLocal: 0,
			orgType: '',
			orgTypes: ["批发市场"],
		});
		this._tokens.push(api.org_details_list.send(params).then((res) => {
			if(window.debugging) console.log('组织机构信息-组织机构列表查询', res);
			let content = res.content;
			let list = content.list ? content.list : [];
			let market = [];
			let dataSource = [];
			me.observationMarketData = [];
			me.observationArtelData = [];
			list.map((t, i) => {
				dataSource.push({
					key: t.id,
					name: t.name,
					type: t.type,
					pointX: t.lng,
					pointY: t.lat,
				});
				market.push(t.name);
				if(t.type == '批发市场') {
					me.observationMarketData.push([t.name, t.type, t.region, t.id]);
				} else {
					me.observationArtelData.push([t.name, t.type, t.region, t.id]);
				}
			});
			if(me.gisTableType == 0) {
				me.observationData = me.observationMarketData;
			} else {
				me.observationData = me.observationArtelData;
			}
			let needData = me.observationData.slice(0, 15);
			let totalCount = content.totalCount;
			let tableData = {
				thead: ['名称', '类型', '区域'],
				tbody: needData,
				width: [170],
				pagination: {
					pageNum: 1,
					pageSize: 15,
					totalCount: totalCount,
				},
			};
			//console.log(dataSource);
			if(flag) {
				if(dataSource.length > 0 && dataSource[0].pointX && dataSource[0].pointY) {
					//初始化页面时，移动到中心点，GIS中心的坐标为数组第0项的数据
					me.GisMapRef.centerTo(dataSource[0].pointX, dataSource[0].pointY);
				} else {
					me.GisMapRef.centerTo(this.lng, this.lat);
				}
			}
			/*下钻窗口-markPoint-地图icon*/
			me.GisMapRef.drawShape(dataSource);
			/*GIS地图-左侧列表*/
			me.ObservationRef.setData2(tableData);
		}));
	}

	//GIS地图-左侧列表-分页数据
	getObservationData(page) {
		//console.log(page);
		let me = this;
		if(me.gisTableType == 0) {
			me.marketPage = page;
		} else {
			me.artelPage = page;
		}
		let needData = me.observationData.slice((page - 1) * 15, page * 15);
		let tableData = {
			tbody: needData,
			pagination: {
				pageNum: page
			},
		};
		/*GIS地图-左侧列表*/
		me.ObservationRef.setData2(tableData);
		//改变页码时，关闭GIS左侧列表详情，隐藏右侧icon列表，隐藏小窗
		me.ObservationDetailsRef.closeDetails();
		//分页时，table组件自己就取消了选中状态
	}

	//点击批发市场和合作社，切换GIS table类型
	toggleGisTableType(index) {
		//console.log(index);
		let me = this;
		let page = 1;
		me.gisTableType = index;
		if(me.gisTableType == 0) {
			me.observationData = me.observationMarketData;
			page = me.marketPage;
		} else {
			me.observationData = me.observationArtelData;
			page = me.artelPage;
		}
		let needData = me.observationData.slice((page - 1) * 15, page * 15);
		let totalCount = me.observationData.length;
		let tableData = {
			tbody: needData,
			pagination: {
				pageNum: page,
				totalCount: totalCount,
			},
		};
		/*GIS地图-左侧列表*/
		me.ObservationRef.setData2(tableData);
		//切换GIS table类型时，关闭GIS左侧列表详情，隐藏右侧icon列表，隐藏小窗
		me.ObservationDetailsRef.closeDetails();
	}

	//gis列表详情关闭后的回调，改变gis列表详情状态、gis列表下标、地图icon颜色
	closeDetails() {
		let me = this;
		//改变gis列表详情状态
		me.isShowObservationDetails = false;
		//改变gis列表下标
		me.ObservationRef.initActive();
		//地图icon颜色
		me.GisMapRef.cancelHighlight();
	}

	/*-----批发市场对比-开始-----*/
	/*下钻潍坊事件*/
	handleWf(region) {
		let me = this;
		console.log('潍坊下钻', region);
		this.regionGisMap = region;
		this.regionGisMapRef._setSelectedText(region);
		/*GIS地图-组织机构信息-组织机构列表查询*/
		me.org_details_list(true); //参数为true定位gis地图中心点
		/*组织机构信息-组织机构总量查询*/
		me.org_details_count();
		this.setState({
			isEchertsMap: false
		});
		setTimeout(() => {
			//重新绘制gis的大小
			me.GisMapRef.checkResize();
		});
	}

	/*
	  批发市场
	  callBackParams.county 打开gis各区县
	*/
	wholesaleMarket(data) {
		console.log(data);
		if(data) {
			this.price_form.province = data.province;
			this.price_form.city = data.city;
		}
		//点击的是（区）才可以打开GIS地图
		if(data && data.county) {
			this.handleWf(data.county);
			return;
		}

		let params = formatParams({
			...this.price_form,
			dateTime: nowDay,
		});
		//运城市批发市场价格-默认查询当天的批发市场价格数据
		this._tokens.push(api.wholesale_market_price.send(params).then((res) => {
			if(window.debugging) console.log('运城市批发市场价格-设置marker', res);
			let content = res.content ? res.content : [];
			this.wholesaleMarketRef.setMarker(content);
			/*this.wholesaleMarketRef.setMarker({
				'山西省': [{
					category: "黄瓜",
					coordinate: [110.968289, 35.053451],
					dateTime: "2019-06-01",
					marketId: "mofcom_99990002",
					name: "山东寿光果菜批发市场有限公司",
					price: 1.6,
					province: "山西省",
					stockNum: null,
				}]
			});*/
		}));

		//运城市价格  下钻city传县全称呼
		this._tokens.push(api.allPrice.send(params).then((res) => {
			if(window.debugging) console.log('运城市批发市场价格-设置region', res);
			let content = res.content ? res.content : [];
			this.wholesaleMarketRef.setRegion(content);
		}));
	}
	/*-----批发市场对比-结束-----*/

	/**----主页批发市场数量 交易品种数量 */
	TradeMessage1() {
		this._tokens.push(api.market_class_quantity.send().then((res) => {
			if(window.debugging) console.log('主页批发市场数量 交易品种数量', res);
			let me = this;
			me.turnUpRef1.setData(res.content.marketNum);
			me.turnUpRef2.setData(res.content.classNum);
		}));
	}

	priceContrastSmallVarietyChange(value) {
		this.priceContrastType = value;
		this.get_price_contrast_big();
	}

	changeRealTimeTradingVariety(value) {
		this.realTimeTradingVariety = value;
		this.get_today_trading_list_big();
	}

	//按年、按月、按日切换
	yearMonthDaySelectChange(type, type2, fn, data) {
		let me = this;
		let name = data.name;
		let lastName = me[type + 'YearMonthDaySelectRef']._getText();
		let params = me.state[type + 'Params'];
		if(lastName == name) {
			return;
		}
		if(name == '按年') {
			me['params' + type2].timeType = 'YEAR'; //接口需要
			params.timeType = 'year'; //插件需要
			params.startTime = paramsYear.startTime; //接口，插件都需要
			params.endTime = paramsYear.endTime;
		} else if(name == '按月') {
			me['params' + type2].timeType = 'MONTH';
			params.timeType = 'month';
			params.startTime = paramsMonth.startTime;
			params.endTime = paramsMonth.endTime;
		} else if(name == '按日') {
			me['params' + type2].timeType = 'DAY';
			params.timeType = 'day';
			params.startTime = paramsDay.startTime;
			params.endTime = paramsDay.endTime;
		}
		me[type + 'TimeType'] = name;
		let obj = {};
		obj[type + 'Params'] = params;
		this.setState(obj);
		me[fn]();
	}

	//按年，按月，按日切换
	//农产品采收量监测
	ncYearMonthDaySelectChange3(data) {
		let me = this;
		let name = data.name;
		let lastName = me.ncYearMonthDaySelectRef3._getText();
		let params = me.state.ncpcslParams;
		if(lastName == name) {
			return;
		}
		if(name == '按年') {
			me.paramsNcpcsl.timeType = 'YEAR'; //接口需要
			params.timeType = 'year'; //插件需要
			params.startTime = paramsYear.startTime; //接口，插件都需要
			params.endTime = paramsYear.endTime;
		} else if(name == '按月') {
			me.paramsNcpcsl.timeType = 'MONTH';
			params.timeType = 'month';
			params.startTime = paramsMonth.startTime;
			params.endTime = paramsMonth.endTime;
		} else if(name == '按日') {
			me.paramsNcpcsl.timeType = 'DAY';
			params.timeType = 'day';
			params.startTime = paramsDay12.startTime;
			params.endTime = paramsDay12.endTime;
		}
		this.setState({
			ncpcslParams: params
		});
		this.getNcpcslData();
	}

	/*
	 * type: 模块类型（字符串）
	 * timeType: 开始时间/结束时间（字符串）
	 * fn: 选择时间后的回调函数
	 * value: 当前时间（字符串）
	 */
	getTime(type, timeType, fn, value) {
		//console.log(type, timeType, value);
		let me = this;
		let params = me.state[type + 'Params'];
		params[timeType] = value;
		let obj = {};
		obj[type + 'Params'] = params;
		me.setState(obj);
		//console.log(obj);
		me[fn]();
	}

	//运城市农产品流通概况弹窗-时间改变
	getTime5(timeType, value) {
		//console.log(timeType, value);
		let me = this;
		if(timeType == 'startTime') {
			me.startTimeImpExpTrade = value;
		} else if(timeType == 'endTime') {
			me.endTimeImpExpTrade = value;
		}
		me.getFlowProfileData('bigYunchengMapRef');
	}

	//农产品品种交易结构分析-时间改变
	getTime6(timeType, value) {
		let me = this;
		if(timeType == 'startTime') {
			me.dealStructureStartTime = value;
		} else if(timeType == 'endTime') {
			me.dealStructureEndTime = value;
		}
		me.dealStructureBigVariety = bigVariety;
		me.get_deal_structure();
		me.get_deal_variety_ranking();
	}

	//农产品交易量及价格分析-主页-地区改变
	areaSelectChange1(e) {
		console.log('农产品交易量及价格分析-主页-地区改变', e.name);
		this.dealPriceRegion = e.name;
		this.priceAnalysisSiteRef._setSelectedText(e.name);
		this.gisSaleSelect(e.name);
	}

	//农产品交易量及价格分析-弹框-地区改变
	areaSelectChange2(e) {
		console.log('农产品交易量及价格分析-弹窗-地区改变', e.name);
		this.dealPriceRegionBig = e.name;
		this.bigPriceAnalysisSiteRef._setSelectedText(e.name);
		this.gisSaleSelectBig();
	}

	//农产品交易量及价格分析-主页-市场改变
	marketSelectChange(e) {
		console.log('农产品交易量及价格分析-主页-市场改变', e);
		this.priceAnalysisMarketRef._setSelectedText(e.data.name);
		// 刷新数据
		this.DealPriceOrgId = e.data.id;
		this.get_deal_price();
	}

	//农产品交易量及价格分析-弹窗-市场改变
	marketSelectChange0(e) {
		console.log('农产品交易量及价格分析-弹窗-市场改变', e);
		this.bigPriceAnalysisMarketRef._setSelectedText(e.data.name);
		// 刷新数据
		this.DealPriceOrgIdBig = e.data.id;
		this.get_deal_price_big();
	}

	//点击饼图
	pieclick(name) {
		//console.log(name);
		this.dealStructureBigVariety = name;
		this.get_deal_variety_ranking();
	}

	//品种下拉选择框-只显示最终品种
	displayRender(label) {
		return label[label.length - 1];
	}

	//用于级联选择控件的搜索功能（参数：字符串，数组对象）
	cascaderFilter(inputValue, path) {
		//console.log(inputValue, path);
		return(path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
	}

	render() {
		const me = this;
		const {
			isOpen,
			cont,
			dataSource,
			dataSource1,
		} = this.state;
		let dealPriceParams = me.state.dealPriceParams;
		let priceContrastParams = me.state.priceContrastParams;
		let ncpcslParams = me.state.ncpcslParams;
		let xslxParams = me.state.xslxParams;
		let varietySelect = me.state.varietySelect;

		return(
			<div>
	      <div style={{ display:this.state.isEchertsMap?'block':'none'}}>
	        {
	          isOpen?<Dialog1 title={cont} closeDialog={this.closeDialog}>
		          {( ()=>{
		            switch(cont){
			              case "农产品销售流向":
		                  return <div style={{padding: '60px 74px'}}>
		                    <div className={'select-time'}>
		                      <DatePickers type={xslxParams.timeType} max={xslxParams.endTime} placeholder={'选择开始时间'} value={xslxParams.startTime} onChange={this.getTime.bind(this, 'xslx', 'startTime', 'get_sale_tradeInfo_big')} />
			                    <span className={'to'}>至</span>
			                    <DatePickers type={xslxParams.timeType} min={xslxParams.startTime} placeholder={'选择结束时间'} value={xslxParams.endTime} onChange={this.getTime.bind(this, 'xslx', 'endTime', 'get_sale_tradeInfo_big')} />
		                      <Cascader options={varietySelect} defaultValue={this.ncpxslxVariety} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.varietyChange.bind(this, 'paramsXslx', 'get_sale_tradeInfo_big')} style={{left:24}} />
		                    </div>
		                    <div className={'echarts-container'}>
				              		<div>
							  						<ChinaMap flow={this.state.flow0} style={{width: '800px',height: '450px'}} top={100} ref={'bigChinaMapRef'}/>
			                    </div>
			                    <Panel title={'排行榜'} width={605} type={false} height={490} imgSelfWidth={true} onClick={this.ltpxsRateBig}>
			                    	<div style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'130px',top:'26px' }}>单位：吨</div>
			                      <LtpxsRate ref={'plantingAreaTop102'} overflow={'auto'} />
			                    </Panel>
				              	</div>
		                  </div>
		                break;
			              case "实时交易信息":
			                return <div style={{padding: '60px 74px'}}>
			                  <div className={'select-time'}>
			                    <Cascader options={varietySelect} defaultValue={this.realTimeTradingVariety} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} onChange={this.changeRealTimeTradingVariety.bind(this)} style={{zIndex:999, left:24, top:0}} />
			                  </div>
			                  <div className={'echarts-container tracListBox'} style={{marginTop:40}}>
			                    <Table className={'rowup'} columns={this.observationColumns2} dataSource={dataSource1} pagination={true} scroll={{ y: 470 }} locale={this.locale} />
			                  </div>
			                </div>
			              break;
		                case "农产品交易量及价格分析":
			                return <div className={'big'} style={{padding: '60px 74px'}}>
			                  <div className={'select-time'}>
			                    <Select ref={ref => this.dealPriceYearMonthDaySelectRef = ref} position={'relative'} left={0} width={100} list={this.yearMonthDaySelect} onSelectChange={this.yearMonthDaySelectChange.bind(this, 'dealPrice', 'DealPrice', 'get_deal_price_big')} />
			                    <span style={{width: '30px'}}></span>
			                    <DatePickers type={dealPriceParams.timeType} max={dealPriceParams.endTime} placeholder={'选择开始时间'} value={dealPriceParams.startTime} onChange={this.getTime.bind(this, 'dealPrice', 'startTime', 'get_deal_price_big')} />
			                    <span className={'to'}>至</span>
			                    <DatePickers type={dealPriceParams.timeType} min={dealPriceParams.startTime} placeholder={'选择结束时间'} value={dealPriceParams.endTime} onChange={this.getTime.bind(this, 'dealPrice', 'endTime', 'get_deal_price_big')} />
			                    <Cascader options={varietySelect} defaultValue={this.DealPriceType} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} onChange={this.changeDealPriceSmallVariey.bind(this)} style={{zIndex:999, left:424, top:0}} />
			                    <Select left={610} ref={(ref) => {this.bigPriceAnalysisSiteRef = ref;}} onSelectChange={this.areaSelectChange2.bind(this)} list={this.regionList} />
													<Select3 left={790} ref={(ref) => {this.bigPriceAnalysisMarketRef = ref;}} onSelectChange={this.marketSelectChange0.bind(this)}/>
			                  </div>
			                  <div className={'echarts-container'}>
			                  	<SalePriceAnalysis dataZoom={true} ref={ref=>me.salePriceAnalysisBig=ref} width={1409} height= {510} containerTop={'0px'} top={60} bottom={60} legend={['价格', '交易量']} unit={['元/公斤', '万吨']} max={10} />
				              	</div>
			                </div>
			              break;
		                case "批发价零售价对比":
			                return <div style={{padding: '60px 74px'}}>
				                <div className={'select-time'}>
					                <Select ref={ref => this.priceContrastYearMonthDaySelectRef = ref} position={'relative'} left={0} width={100} list={this.yearMonthDaySelect} onSelectChange={this.yearMonthDaySelectChange.bind(this, 'priceContrast', 'PriceContrast', 'get_price_contrast_big')} />
					                <span style={{width: '30px'}}></span>
					                <DatePickers type={priceContrastParams.timeType} max={priceContrastParams.endTime} placeholder={'选择开始时间'} value={priceContrastParams.startTime} onChange={this.getTime.bind(this, 'priceContrast', 'startTime', 'get_price_contrast_big')} />
					                <span className={'to'}>至</span>
					                <DatePickers type={priceContrastParams.timeType} min={priceContrastParams.startTime} placeholder={'选择结束时间'} value={priceContrastParams.endTime} onChange={this.getTime.bind(this, 'priceContrast', 'endTime', 'get_price_contrast_big')} />
					                <Select left={600} ref={(ref) => { this.bigPriceContrastSiteRef = ref; }} onSelectChange={this.priceContrastSiteChange.bind(this)} list={this.regionList} />
					                <Cascader options={varietySelect} defaultValue={this.priceContrastType} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} onChange={this.priceContrastSmallVarietyChange.bind(this)} style={{zIndex:999, left:224, top:0}} />
				              	</div>
				              	<div className={'echarts-container'}>
				              		<PriceComparison dataZoom={true} ref={ref=>this.bigPriceContrastRef=ref} width={1409} height={510} />
				              	</div>
				              </div>
		                break;
		                case "农产品品种交易结构分析":
			                return <div style={{padding: '60px 74px'}}>
			                  <div className={'select-time'}>
			                    <DatePickers type={'DAY'} placeholder={'选择开始时间'} max={this.dealStructureEndTime} value={this.dealStructureStartTime} onChange={this.getTime6.bind(this,'startTime')} />
			                    <span className={'to'}>至</span>
			                    <DatePickers type={'DAY'} placeholder={'选择结束时间'} min={this.dealStructureStartTime} value={this.dealStructureEndTime} onChange={this.getTime6.bind(this,'endTime')} />
													<Select left={470} ref={(ref) => {
			                      this.bigDealStructureSelectRef = ref;
			                    }} onSelectChange={this.dealStructureSiteChange.bind(this)} list={this.regionList}
			                    />
			                  </div>
			                  <div className={'echarts-container'}>
			                  	<div>
			                  		<Pie clickPie={this.pieclick.bind(this)} ref={(ref) => this.bigDealStructureRef = ref} />
			                  	</div>
			                    <Panel title={'销量排序'} width={605} type={false} height={510} imgSelfWidth={true} onClick={this.ltpxsRateBig}>
			                    	<div style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'130px',top:'26px' }}>单位：吨</div>
			                      <LtpxsRate ref={(ref) => { this.bigSaleOrderRef = ref;}} />
			                    </Panel>
				              	</div>
			                </div>
			              break;
		                case "运城市农产品流通概况":
			                return <div style={{padding: '60px 74px'}}>
				                <div className={'select-time'}>
				                  <DatePickers type={'DAY'} placeholder={'选择开始时间'} max={this.endTimeImpExpTrade} value={this.startTimeImpExpTrade} onChange={this.getTime5.bind(this, 'startTime')} />
				                  <span className={'to'}>至</span>
				                  <DatePickers type={'DAY'} placeholder={'选择结束时间'} min={this.startTimeImpExpTrade} value={this.endTimeImpExpTrade} onChange={this.getTime5.bind(this, 'endTime')} />
				                  <Cascader options={varietySelect} defaultValue={this.productTypeImpExpTrade} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} onChange={this.flowProfileSmallVarietyChange.bind(this)} style={{zIndex:999, left:30, top:0}} />
				                  <Select ref={ref => this.bigFlowProfileSelectRef = ref} list={me.regionList} onSelectChange={this.flowProfileSelectChange.bind(this)} position={'relative'} left={60} />
		            />
				                  <Tab ref={ref=> this.bigFlowProfileTabRef=ref} left={1030} data={this.tabData6} onChange={this.tabChangeImpExpTrade.bind(this)}/>
				                </div>
				                <div className={'echarts-container'}>
				              		<YunchengMap ref={ref=>this.bigYunchengMapRef=ref} flow1={this.state.flow} style={{width: '800px', height: '450px'}} />
				                  <Panel title={'排行榜'} width={605} type={false} imgSelfWidth={true} onClick={this.ltpxsRateBig}>
				                  	<div style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'130px',top:'26px' }}>单位：吨</div>
				                    <LtpxsRate ref={ref=>this.plantingAreaTop100=ref} overflow={'auto'} />
				                  </Panel>
				              	</div>
			                </div>
			              break;
		                case "农产品采收量监测":
			                return <div style={{padding: '60px 74px'}}>
				                <div className={'select-time'}>
				                  <Select ref={ref => this.ncYearMonthDaySelectRef3 = ref} position={'relative'} left={0} width={100} list={this.yearMonthDaySelect} onSelectChange={this.ncYearMonthDaySelectChange3.bind(this)} />
				                  <span style={{width: '30px'}}></span>
				                  <DatePickers type={ncpcslParams.timeType} max={ncpcslParams.endTime} placeholder={'选择开始时间'} value={ncpcslParams.startTime} onChange={this.getTime.bind(this, 'ncpcsl', 'startTime', 'getNcpcslData')} />
												  <span className={'to'}>至</span>
												  <DatePickers type={ncpcslParams.timeType} min={ncpcslParams.startTime} placeholder={'选择结束时间'} value={ncpcslParams.endTime} onChange={this.getTime.bind(this, 'ncpcsl', 'endTime', 'getNcpcslData')} />
				                </div>
				                <div className={'echarts-container-column'}>
				                	<div>
					                	<LineSingle dataZoom={true} ref={'ncpcsljcr11'} top={'0px'} width={1409} height= {320} />
					                </div>
					                <div>
					                	<ScjcSingleColumn  ref={ref => this.bigWtrateFxRef = ref} top={'0px'} width={1409} height={290} />
					                </div>
				                </div>
			                </div>
		                break;
		                default:return null;
		              }
		            }
		        	)()}
	         	</Dialog1>:''
	        }
	        
	        {/*控制主页的品种*/}
	        <Cascader options={varietySelect} defaultValue={[bigVariety, smallVariety]} allowClear={false} expandTrigger="hover" onChange={this.mapChangeVarietyChange.bind(this)} displayRender={this.displayRender.bind(this)} style={{zIndex:999, width: 350, left:790, top:80}} />
	        
	        <div style={{position: 'absolute', left: '770px', top: '120px'}}>
	          <TurnUp ref={ref => this.turnUpRef1 = ref} title={'批发市场数量'} theme={1} unit={'家'} unitRight={-30}/>
	        </div>
	        
	        <div style={{position: 'absolute', left: '1000px', top: '120px'}}>
	          <TurnUp ref={ref => this.turnUpRef2 = ref} title={'交易品种数量'} theme={2} unit={'种'} unitRight={-28}/>
	        </div>
	        
        	{/*中国地图*/}
	        <div style={{ width: '800px', height: '520px', position: 'absolute', top: '180px', left: 565}}>
	          <ChinaMap1 ref={(ref) => { this.wholesaleMarketRef = ref;}} width={800} height={520} mapChange={this.wholesaleMarket.bind(this)} />
        	</div>
        	
        	<Panel onClick={this.openDialog.bind(this,'农产品采收量监测')} type={1} title={'农产品采收量监测'} left={552} top={710} width={870} height={285} imgSelfWidth={true}>
            <LineSingle dataZoom={false} title="各区县采收量" ref={'ncpcsljcRef'} height={270} width={870} top={40}/>
          </Panel>
          
          <Panel onClick={this.openDialog.bind(this,'农产品销售流向')} type={1} title={'农产品销售流向'} left={40} top={90} width={440} height={280}>
            <ChinaMap style={{width: '440px', height: '280px', top: '10px'}} ref={'chinaMapRef'} />
        	</Panel>
        	
          <Panel onClick={this.openDialog.bind(this,'实时交易信息')} type={1} title={'实时交易信息'} left={30} top={380} width={420} height={280}>
            <div style={{position:'absolute',top:'40px',left:'0',width:'440px',height:'280px'}} className={'newListBox'}>
            	{/*<Table width={420} height={280} columns={this.observationColumns1} dataSource={dataSource} pagination={false} scroll={{ y: 220 }} locale={this.locale } />*/}
              <TableNew width={420} height={200} top={45} ref={'tableNew'}/>
            </div>
          </Panel>
          
          <Panel onClick={this.openDialog.bind(this,'农产品交易量及价格分析')} type={1} title={'农产品交易量及价格分析'} left={30} top={715} width={440} height={290}>
            <Select width={120} height={24} left={140} top={35} ref={(ref) => {
              this.priceAnalysisSiteRef = ref;
            }} onSelectChange={this.areaSelectChange1.bind(this)} list={this.regionList}
            />
            <Select2 width={140} height={24} left={290} top={35} ref={(ref) => {
              this.priceAnalysisMarketRef = ref;
            }} onSelectChange={this.marketSelectChange.bind(this)}
            />
            <SalePriceAnalysis dataZoom={false} ref={ref=>me.salePriceAnalysis=ref} height={235} containerTop={65} legend={['价格', '交易量']} unit={['元/公斤', '万吨']} max={10} />
          </Panel>
          
          <Panel onClick={this.openDialog.bind(this,'批发价零售价对比')} type={1} title={'批发价零售价对比'} left={1450} top={90} width={440} height={300}>
            <PriceComparison dataZoom={false} ref={ref=>this.priceContrastRef=ref} height={240} top={40}/>
          </Panel>
					
					<Panel onClick={this.openDialog.bind(this,'农产品品种交易结构分析')} type={1} title={'农产品品种交易结构分析'} left={1450} top={380} width={440} height={280}>
            <div style={{position: 'absolute', left: '0px', width: 440,top: '0px'}}>
              <Pie ref={(ref) => this.dealStructureRef = ref} style={{width:'440',height:'290',left:'0'}} top={40} />
            </div>
          </Panel>
          
          <Panel onClick={this.openDialog.bind(this,'运城市农产品流通概况')} type={1} title={'运城市农产品流通概况'} left={1450} top={715} width={440} height={285}>
            <YunchengMap ref={ref=>this.YunchengMapRef=ref} style={{width: '440px', height: '250px', top: 40}} />
          </Panel>
      	</div>

	      {/*gis地图 */}
	      <div style={{ display:!this.state.isEchertsMap?'block':'none',position:'absolute',top:'100px',left:'31px',width:'1858px',height:'900px'}}>
		      <div style={{position: 'absolute',top:3,left:1300,display:'flex'}}>
		        <Select1 position={'relative'} active={this.regionGisMap} left={0} width={130} list={this.regionList} ref={ref=>this.regionGisMapRef=ref} onSelectChange={this.gisSiteSelectChange.bind(this)} />
		        <Search placeholder="批发市场名称" onSearch={this.gisSiteSearch.bind(this)} style={{ width: 290, left: 20,zIndex:99 }} />
		      </div>
	      	<div onClick={this.backToEchartsMap.bind(this)} style={{ marginLeft:'30px',width:'100px',height:'32px',backgroundColor:'#053d88',color:'#46bec6',textAlign:'center',lineHeight:'32px',cursor:'pointer',position: 'absolute',top:'3px',right:'0px' }}>返回</div>

	      	<Panel title={'流通追溯'} style={{position:'absolute',type:false}} width={440}>
	        	<GisMap markerClick={this.markerClick.bind(this)} ref={ref => this.GisMapRef = ref} zoom={16} width={'1430px'} height={'850px'} centerPointX={118.726} centerPointY={36.872} style={{position:'absolute',top:'50px',left:'428px'}}/>

	        	<Observation2 ref={ref => this.ObservationRef = ref} width={410} headClick={this.toggleGisTableType.bind(this)} click={this.showObservationDetails.bind(this)} getData={this.getObservationData.bind(this)} />

	        	<ObservationDetails2 closeDetails={this.closeDetails.bind(this)} ref={ref => this.ObservationDetailsRef = ref} top={190} />

	        	<MarkPoint ref={ref => this.MarkPointRef = ref} />
	        </Panel>
	      </div>
     	</div>
		)
	}
}

export default CirculationTracing;
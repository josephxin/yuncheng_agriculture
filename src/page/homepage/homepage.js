import React from 'react';
import Panel from '../../component/panel/Panel';
import Select from '../../component/select/Select';
//弹出框
import Dialog from '../../component/dialog/Dialog';
/*引入antd框架*/
import { DatePicker, Input, Table, Popconfirm, Button, Cascader } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

/*引入日期插件*/
import DatePickers from "../../component/DatePickers/DatePickers";

import StructureAnalysis from '../../component/structure-analysis/structureAnalysis';
import UnifiedStandard from '../../component/structure-analysis/unifiedStandard';
import RadarCharts from './charts/radarCharts';
import BarCharts from './charts/barCharts';
import FELineChartReact from './../../component/echarts-FE/FELineChartReact';
//农产品销售全国流向
import ChinaMap from '../../component/map-component/center-map/chinaMap';
//三农政策与产值、产量相关性分析
import LineMore from '../../component/echarts/LineMore';
import LineMoreTooltip from '../../component/echarts/LineMoreTooltip';

//中间球体
import RotateIcon from './rotate.min/chart-library.min.js';

//移动端统计-注册量、活跃度走势
import SalePriceAnalysis from '../../component/sale-price-analysis/SalePriceAnalysis3';
//饼图
import Pie from '../../component/echarts/pie/Pie';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-leader';

//引入图片
import app_bg from './image/app_bg.png';
import app_icon from './image/app_icon.png';
import blue_bar from './image/blue_bar.png';

//引入假数据
import commonData from '../../data/commonData';
import demoData from './demoData.js';

/* 格式化参数 */
import { setParamsDay, setParamsDay2, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, cloneFn, DataTool, formatParams, handleDateUtc } from '../../tool/tool.js';

import './homepage.scss';
import './../../_diy-antd.css';

const paramsDay = setParamsDay(12); //12个月
const paramsDay2 = setParamsDay2(); //默认一年前
const paramsMonth = setParamsMonth(); //相差1年
const paramsMonth2 = setParamsMonth(2); //相差2年
const paramsYear = setParamsYear();
const currentYear = getCurrentYear();
const currentDay = getNowDay();
const bigVariety = '';
const smallVariety = '';

//地区
let regionSelect = cloneFn(commonData.regionSelect);
regionSelect.unshift('全部');

//包含全部品种
let varietySelect = cloneFn(commonData.varietySelect);
varietySelect.unshift({
	value: '',
	label: '全部品种'
});
//console.log(varietySelect);

/**
 * 首页
 * */
class Homepage extends React.Component {
	constructor() {
		super();
		//全部品种下拉框
		this.state = {
			varietySelect: varietySelect,
			varietySelect2: varietySelect,
			current: 1, //当前页码
			total: '', //总条数
			pageSize: 10, //每页显示条数
			placeName: '',
			productValue: '', //三品一标-产品名称
			productTypeSelect: '', //三品一标分类
			farmerName: '', //农户名
			greenhouseName: '', //大棚名
			coordinate: '', //大棚坐标

			//产业结构分析
			industrStructureTime: currentYear,

			//农作物耕地面积分布
			productType: bigVariety, //品类
			productNames: smallVariety, //农产品名称 ,

			saleType: '', //销售类型

			industrialStructureColumn: demoData.industrialStructureColumn,
			industrialStructureDataSource: [],
			spybColumn: demoData.spybColumn,
			spybDataSource: [],
			priceContrastColumn: demoData.priceContrastColumn,
			priceContrastDataSource: [],
			networkEquipmentColumn: demoData.networkEquipmentColumn,
			networkEquipmentDataSource: [],
			areaDistributionColumn: demoData.areaDistributionColumn,
			areaDistributionDataSource: [],
			//中间下钻
			outputValueColumn: demoData.outputValueColumn,
			outputValueDataSource: [], //农业总产值
			proportionColumn: demoData.proportionColumn,
			proportionDataSource: [],
			// profitTaxColumn: demoData.profitTaxColumn,
			// profitTaxDataSource: [],
			registeredUserColumn: demoData.registeredUserColumn,
			registeredUserDataSource: [],
			equipmentNumColumn: demoData.equipmentNumColumn,
			equipmentNumDataSource: [],
			agriculturalColumn: demoData.agriculturalColumn,
			agriculturalDataSource: [],
			landmarkColumn: demoData.landmarkColumn,
			landmarkDataSource: [],
			totalPopulationColumn: demoData.totalPopulationColumn,
			totalPopulationDataSource: [],
			enterpriseColumn: demoData.enterpriseColumn,
			enterpriseDataSource: [],
			cultivatedLandColumn: demoData.cultivatedLandColumn,
			cultivatedLandDataSource: [],
			relatedColumn: demoData.relatedColumn,
			relatedDataSource: [],
			pesticidesColumn: demoData.pesticidesColumn,
			pesticidesDataSource: [],
			chemicalFertilizerColumn: demoData.chemicalFertilizerColumn,
			chemicalFertilizerDataSource: [],
			//时间筛选框
			scgmzsParams: {
				starttime: paramsYear.startTime,
				endtime: paramsYear.endTime,
			},
			//批发零售价格比较
			priceContrastParams: {
				startTime: paramsMonth2.startTime,
				endTime: paramsMonth2.endTime,
			},
			//物联网设备发展概况
			networkParams: {
				startTime: paramsDay2.startTime,
				endTime: paramsDay2.endTime,
			},
			//三农政策
			nyzcTitle: '',
			nyzcTime: '',
			nyzcContent: '',
		};
		this.region = '潍坊全市';
		this.currentdate = currentDay;
		/*当前时间*/
		this.regionType = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
		this._tokens = [];
		this.reginName = '';
		this.regionList1 = regionSelect;
		this.regionList2 = ['全部', '无公害产品', '绿色食品', '地标农产品'];
		// this.regionList3 = ['全部', '批发价格', '零售价格'];
		this.regionList3 = ['全部', '批发价格', '零售店零售价格', '超市零售价格'];

		//批发零售价格比较-主页
		this.priceContrastSmallVariety = smallVariety; //农作物名称
		//批发零售价格比较-弹窗
		this.priceContrastBigVariety2 = bigVariety;
		this.priceContrastSmallVariety2 = smallVariety;

		this.locale = {
			emptyText: '暂无数据',
		};
	}

	componentDidMount() {
		const me = this;
		//地区
		me.selectSystemList();
		//全部品种下拉框
		me.get_product_tree();
		//首页-农作物耕地-农作物分类下拉框
		me.get_product_gettypetree();

		/*产业结构分析*/
		me.getlatelyInfo();
		/*两品一标统计*/
		me.getcountfortype();
		//物联网图表
		me.gethomeview();
		//农作物耕地面积分布
		me.getcountforbigtype();
		//农产品销售流向-图表
		me.getallList();

		//批发零售价格比较
		me.getPriceContrast();

		//三农政策与产值、产量相关性分析
		me.getCorrelationAnalysis();

		//设置下拉列表
		//三品一标分类下拉
		me.siteSelectRef3._setList(this.regionList2);
		me.siteSelectRef7._setList(this.regionList3);

		//首页-中心区域
		me.getCenterInfoFunc();

		//移动端统计-注册量、活跃度走势
		me.getZclData();
		//移动端统计-用户类型占比
		me.getUserTypeData();
		//移动端统计-供需类型占比
		me.getSupplyDemandData();
	}

	componentWillUnmount() {
		this._clearTokens();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}

	/**
	 * 弹框-下拉菜单
	 * */
	siteSelectChange(type, e) {
		console.log(e);
		if(type == this.regionType[0]) {
			if(e.name == "全部") {
				e.name = "";
			}
			this.setState({
				placeName: e.name
			});
		} else if(type == this.regionType[1]) {
			if(e.name == "全部") {
				e.name = "";
			}
			this.setState({
				productTypeSelect: e.name
			});
		} else if(type == this.regionType[2]) {
			if(e.name == "全部") {
				e.name = "";
			}
			this.setState({
				saleType: e.name //销售类型
			});
		}
	}

	/*
	 *只选择年份的日期方法
	 * type: 模块类型（字符串）
	 * timeType: 开始时间/结束时间（字符串）
	 * value: 当前时间（字符串）
	 */
	getTime(type, timeType, value) {
		let me = this;
		let params = me.state[type + 'Params']; //scgmzsParams
		// console.log(params[timeType]);//2009
		params[timeType] = value; //params[startTime]='2017'
		let obj = {};
		obj[type + 'Params'] = params; //obj={scgmzsParams:{timeType: "year", startTime: "2017", endTime: 2019}}
		me.setState(obj);
	}

	/**
	 * 弹框-打开、关闭事件
	 * */
	leaderBig1(t) { //产业结构分析
		const me = this;
		me.refs.dialogRef1._open(t);
		me.selectlistOne(); //列表
	}

	//产业结构分析-关闭
	dialogClose1() {
		this.setState({
			placeName: '',
			current: 1
		});
		this.siteSelectRef1._setSelectedText('全部'); //地区
	}

	//两品一标统计-打开弹窗
	leaderBig2(t) {
		const me = this;
		me.refs.dialogRef2._open(t);
		me.selectlistTwo();
	}

	//两品一标统计
	dialogClose2() {
		this.setState({
			placeName: '',
			productValue: '',
			productTypeSelect: '',
			current: 1
		});
		this.siteSelectRef2._setSelectedText('全部'); //地区
		this.siteSelectRef3._setSelectedText('全部'); //三品一标分类
	}

	//批发零售价格比较-打开
	leaderBig3(t) {
		const me = this;
		me.refs.dialogRef3._open(t);
		me.selectlistThree();
	}

	//批发零售价格比较-关闭
	dialogClose3() {
		this.setState({
			saleType: '',
			current: 1
		});
		this.siteSelectRef7._setSelectedText('全部'); //销售类型
	}

	//物联网-列表-打开
	leaderBig4(t) {
		const me = this;
		me.refs.dialogRef4._open(t);
		me.selectlistFour();
	}

	//物联网-列表-关闭
	dialogClose4() {
		this.setState({
			placeName: '',
			farmerName: '', //农户名
			greenhouseName: '', //大棚名称
			current: 1
		});
		this.siteSelectRef8._setSelectedText('全部'); //地区
	}

	// 农耕作物站地面积分布
	dialogClose5() {
		this.setState({
			placeName: '',
			current: 1,
		});
		this.siteSelectRef9._setSelectedText('全部'); //地区
	}

	//中间球体点击回调
	rotateIconClick(e) {
		console.log(e);
		const me = this;
		let name = e.data.name;
		switch(name) {
			case '农业总产值':
				me.refs.dialogRef6._open(name);
				me.outputValueData();
				break;
			case 'GDP占比':
				me.refs.dialogRef7._open(name);
				me.proportionData();
				break;
				// case '利税':
				// 	me.refs.dialogRef8._open(name);
				// 	me.profitTaxData();
				// 	break;
			case '注册用户量':
				me.refs.dialogRef9._open(name);
				me.registeredUserData();
				break;
			case '农机设备数':
				me.refs.dialogRef10._open(name);
				me.equipmentNumData();
				break;
			case '农投品使用量':
				me.refs.dialogRef11._open(name);
				me.agriculturalData();
				break;
			case '地标农产品':
				me.refs.dialogRef12._open(name);
				me.landmarkData();
				break;
			case '农业总人口':
				me.refs.dialogRef13._open(name);
				me.totalPopulationData();
				break;
			case '龙头企业':
				me.refs.dialogRef14._open(name);
				me.enterpriseData();
				break;
			case '耕地总面积':
				me.refs.dialogRef15._open(name);
				me.cultivatedLandData();
				break;
			case '涉农企业':
				me.refs.dialogRef16._open(name);
				me.relatedData();
				break;
			case '农药农投品使用量':
				me.refs.dialogRef17._open(name);
				me.getainulistData();
				break;
			case '化肥农投品使用量':
				me.refs.dialogRef18._open(name);
				me.getaiulistData();
				break;
		}
	}

	dialogCloses() {
		this.setState({
			current: 1,
		})
	}

	/**
	 * 弹框-列表查询
	 * */
	handleClick1() { //产业结构
		//页码变成1
		this.setState({
			current: 1
		}, () => {
			this.selectlistOne();
		});
	}

	handleClick2() { //两品一标统计
		//页码变成1
		this.setState({
			current: 1
		}, () => {
			this.selectlistTwo();
		});
	}

	handleClick3() { //批发零售价格比较
		//页码变成1
		this.setState({
			current: 1
		}, () => {
			this.selectlistThree();
		});
	}

	handleClick4() { //物联网
		//页码变成1
		this.setState({
			current: 1
		}, () => {
			this.selectlistFour();
		});
	}

	handleClick5() { //农耕作物站地面积分布
		//页码变成1
		this.setState({
			current: 1
		}, () => {
			this.selectlistFive();
		});
	}

	/**
	 * 弹框-列表分页
	 * */
	//户数统计-分页
	changePage1 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectlistOne();
		});
	};

	//两品一标统计-分页
	changePage2 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectlistTwo();
		});
	};

	//批发零售价格比较-分页
	changePage3 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectlistThree();
		});
	};

	//物联网
	changePage4 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectlistFour();
		});
	};

	//农耕作物站地面积分布
	changePage5 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectlistFive();
		});
	};

	//中间主图-农业总产值
	changePage6 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.outputValueData();
		});
	};

	//中间主图-GDP占比
	changePage7 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.proportionData();
		});
	};

	//中间主图-利税
	// changePage8 = (page) => {
	// 	this.setState({
	// 		current: page,
	// 	}, () => {
	// 		this.profitTaxData();
	// 	});
	// };

	//中间主图-注册用户量
	changePage9 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.registeredUserData();
		});
	};

	//中间主图-农机设备数
	changePage10 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.equipmentNumData();
		});
	};

	//中间主图-农投品使用量
	changePage11 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.agriculturalData();
		});
	};

	//中间主图-地标农产品
	changePage12 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.landmarkData();
		});
	};

	//中间主图-地标农产品
	changePage13 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.totalPopulationData();
		});
	};

	//中间主图-龙头企业
	changePage14 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.enterpriseData();
		});
	};

	//中间主图-耕地总面积
	changePage15 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.cultivatedLandData();
		});
	};

	//中间主图-涉农企业
	changePage16 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.relatedData();
		});
	};

	//中间主图-农药农投品使用量
	changePage17 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.getainulistData();
		});
	};

	//中间主图-化肥农投品使用量
	changePage18 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.getaiulistData();
		});
	};

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
			varietySelect.unshift({
				value: '',
				label: '全部品种'
			});
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

	//首页-农作物耕地-农作物分类下拉框
	get_product_gettypetree() {
		let me = this;
		let params = formatParams({
			rootId: 0,
			keyword: '',
		});
		this._tokens.push(api.product_gettypetree.send(params).then(res => {
			if(window.debugging) console.log('首页-农作物耕地-农作物分类下拉框', res);
			let content = res.data;
			let varietySelect = [];
			varietySelect.unshift({
				value: '',
				label: '全部品种'
			});
			content.map((t, i) => {
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
			me.setState({
				varietySelect2: varietySelect
			});
		}));
	}

	/**
	 * 首页-图表接口
	 * */
	//产业结构分析
	getlatelyInfo() {
		this._tokens.push(api.getlatelyInfo.send().then((res) => {
			if(window.debugging) console.log('产业结构分析', res);
			let data = res.data || [];
			let dataArr = [];
			data.map((item, i) => {
				dataArr.push({
					name: item.industryType,
					value: item.productionValue,
					productionPercent: item.productionPercent
				});
			});
			if(data.length > 0) {
				this.setState({
					industrStructureTime: data[0].dateTime
				});
			}
			// 产业结构分析
			this.refs.selectIndustrStructureRef.setData(dataArr);
		}));
	}

	//产业结构-列表
	selectlistOne() {
		this._tokens.push(api.selectlistOne.send({
			areaname: this.state.placeName,
			starttime: this.state.scgmzsParams.starttime,
			endtime: this.state.scgmzsParams.endtime,
			pageNum: this.state.current,
			pageSize: this.state.pageSize
		}).then((res) => {
			if(window.debugging) console.log('产业结构-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				industrialStructureDataSource: list
			});
		}));
	}

	/*两品一标统计*/
	getcountfortype() {
		this._tokens.push(api.getcountfortype.send().then((res) => {
			if(window.debugging) console.log('两品一标统计', res);
			let data = res.data || [];
			let dataArr = [];
			data.map((item, i) => {
				dataArr.push({
					name: item.productType,
					value: item.companyName,
					num: item.productName
				});
			});
			// 两品一标统计
			this.refs.selectThreeOneRef.setData(dataArr);
		}))
	}

	//三品一标-列表
	selectlistTwo() {
		this._tokens.push(api.selectlistTwo.send({
			datetime: '',
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
			productname: this.state.productValue, //产品名称
			producttype: this.state.productTypeSelect,
			region: this.state.placeName
		}).then((res) => {
			if(window.debugging) console.log('三品一标-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				spybDataSource: list
			});
		}));
	}

	/*农产品销售全国流向*/
	getallList() {
		let me = this;
		this._tokens.push(api.getallList.send({}).then((res) => {
			if(window.debugging) console.log('农产品销售全国流向', res);
			let data = res.data || [];
			let dataArr = [];
			data.map((item, i) => {
				dataArr.push({
					name: item.xiaodi,
					value: item.weight,
					flow: false //流出
				});
			});
			data.map((item, i) => {
				dataArr.push({
					name: item.xiaodi,
					value: item.weight,
					flow: true //流入
				});
			});
			// 农产品销售全国流向
			this.refs.selectSaleDirectionRef._setData(dataArr); //里面含有流出和流入的数据
		}));
	}

	// 批发零售价格比较-主页-图表
	getPriceContrast() {
		this._tokens.push(api.priceContrast.send({
			areaname: '', //区县名称，现在没用，传空字符串就行
			cropname: this.priceContrastSmallVariety, //农作物名称
		}).then((res) => {
			if(window.debugging) console.log('批发零售价格比较-主页-图表', res);
			let dataStruct = {};
			dataStruct.areaShow = true;
			dataStruct.xAxisSplitAreaShow = false;
			dataStruct.unit = "元/公斤";
			dataStruct.yAxisName = "元/公斤";
			dataStruct.xAxisData = "season";
			dataStruct.data = "";
			// let lines = [{
			// 	key: "tradePrice",
			// 	value: "批发价",
			// 	color: "230,40,108"
			// }, {
			// 	key: "retailPrice",
			// 	value: "零售价",
			// 	color: "22,197,255"
			// }];
			let lines = [{
				key: "tradePrice",
				value: "批发价",
				color: "230,40,108"
			}, {
				key: "retailPrice",
				value: "零售店零售价",
				color: "22,197,255"
			}, {
				key: "chRetailPrice",
				value: "超市零售价",
				color: "0,250,240"
			}];
			this._feLineChart$1.setData(DataTool.convertToChart2(res.data, dataStruct, lines));
		}));
	}

	//批发零售价格比较-弹窗-列表
	selectlistThree() {
		let startTime = this.state.priceContrastParams.startTime ? this.state.priceContrastParams.startTime + '-01' : '';
		let endTime = this.state.priceContrastParams.endTime ? this.state.priceContrastParams.endTime + '-01' : '';
		this._tokens.push(api.selectlistThree.send({
			areaname: '', //字段没用，传空值就行
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
			//producttype: this.priceContrastBigVariety2, //品类
			producttype: '', //品类
			productname: this.priceContrastSmallVariety2, //农产品名称 ,
			saletype: this.state.saleType, //销售类型
			starttime: startTime,
			endtime: endTime,
		}).then((res) => {
			if(window.debugging) console.log('批发零售价格-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			list.map((item, i) => {
				item.datatime = handleDateUtc(item.datatime);
			});
			this.setState({
				total: total,
				priceContrastDataSource: list
			});
		}));
	}

	//主页-批发零售价格比较-品种改变
	priceContrastVarietyChange(arr) {
		//console.log(arr);
		let me = this;
		let name = arr[arr.length - 1];
		let lastName = me.priceContrastSmallVariety;
		//console.log(lastName, name);
		if(lastName == name) {
			return;
		}
		me.priceContrastSmallVariety = name;
		//需要调接口
		me.getPriceContrast();
	}
	//弹窗-批发零售价格比较-品种改变
	priceContrastVarietyChange2(arr) {
		let me = this;
		let name = arr[arr.length - 1];
		let lastName = me.priceContrastSmallVariety2;
		if(lastName == name) {
			return;
		}
		me.priceContrastBigVariety2 = arr[0];
		me.priceContrastSmallVariety2 = name;
		//不需要调接口
	}

	//农作物耕地面积分布
	getcountforbigtype() {
		this._tokens.push(api.getcountforbigtype.send({}).then((res) => {
			if(window.debugging) console.log('农作物耕地面积分布', res);
			if(res.code == 200) {
				let IData = {
					indicator: [],
					value: []
				};
				let max = 0;
				let data = cloneFn(res.data);
				delete data.id;
				delete data.region;
				delete data.total;
				//获取对象中的最大值
				for(let key in data) {
					if(max < data[key]) {
						max = data[key];
					}
				}
				for(let key in data) {
					IData.indicator.push({
						name: key,
						max: max
					});
					IData.value.push(data[key]);
				}
				//console.log(IData);
				this.populationRadarRef.setData(IData);
			}
		}));
	}

	//农作物耕地面积分布-品种改变
	areaDistributionVarietyChange(arr) {
		let me = this;
		let name = arr[arr.length - 1];
		let lastName = me.state.productNames;
		if(lastName == name) {
			return;
		}
		this.setState({
			productType: arr[0],
			productNames: name,
		});
	}

	//物联网
	gethomeview() {
		this._tokens.push(api.gethomeview.send({}).then((res) => {
			if(window.debugging) console.log('物联网', res);
			let data = res.data || [];
			if(data.length > 0) {
				let option = {
					seriesData1: res.data[0].seriesData[0],
					seriesData2: res.data[0].seriesData[1],
					xData: res.data[0].xData
				};
				this.populationBarRef.setData(option);
			}
		}));
	}

	/**
	 *
	 * 下钻页面-接口
	 */
	//产业结构-地区-下拉
	selectSystemList() {
		this._tokens.push(apiAll.selectSystemList.send({}).then((res) => {
			if(window.debugging) console.log('产业结构-地区-下拉', res);
			let data = res.data || [];
			let listOne = [];
			data.map((item, index) => {
				if(item.name) {
					listOne.push(item.name)
				}
			});
			this.regionList1 = listOne;
			this.regionList1.unshift('全部');
			this.siteSelectRef1._setList(this.regionList1);
			this.siteSelectRef2._setList(this.regionList1);
			this.siteSelectRef8._setList(this.regionList1);
			this.siteSelectRef9._setList(this.regionList1);
			this.priceContrastRef._setList(this.regionList1);
			this.priceContrastRef._setSelectedText(this.priceContrastRegion);
		}));
	}

	//物联网-列表
	selectlistFour() {
		this._tokens.push(api.selectlistFour.send({
			areaname: this.state.placeName,
			farmername: this.state.farmerName,
			greenhousename: this.state.greenhouseName,
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
			starttime: this.state.networkParams.startTime,
			endtime: this.state.networkParams.endTime,
		}).then((res) => {
			if(window.debugging) console.log('物联网-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			let nameAll = '';
			//经度、维度合并成一个字段显示在一列
			list.map((item, index) => {
				if(item.greenhouselongitude || item.greenhouselatitude) { //经度、维度
					nameAll = item.greenhouselongitude + '  / ' + item.greenhouselatitude;
					item.coordinate = nameAll;
				}
				if(item.greenhousename == '' || item.greenhousename == null) {
					item.greenhousename = '/'
				}
			});
			this.setState({
				coordinate: nameAll,
				total: total,
				networkEquipmentDataSource: list
			});
		}));
	}

	//农作物耕地面积分布-列表
	selectlistFive() {
		this._tokens.push(api.selectlistFive.send({
			quxian: this.state.placeName,
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
			cropsbigtype: this.state.productType, //品类
			cropssmalltype: this.state.productNames, //农产品名称 ,
		}).then((res) => {
			if(window.debugging) console.log('农作物耕地面积分布-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				areaDistributionDataSource: list
			});
		}));
	}

	/*-----宏观发展状况-----*/
	//首页-中心区域
	getCenterInfoFunc() {
		let me = this;
		this._tokens.push(api.getCenterInfo.send().then((res) => {
			if(window.debugging) console.log('首页-中心区域', res);
			let valueList = res.data.valueList || [];
			let valueUnitList = res.data.valueUnitList || [];
			let nameList = res.data.nameList || [];
			let rotateData = [];
			valueList.map((item, i) => {
				rotateData.push({
					name: nameList[i],
					value: Number(item),
					unit: valueUnitList[i]
				});
			});
			let index = nameList.indexOf("GDP占比");
			rotateData[index].value = rotateData[index].value * 100 + '%';
			me._rotateIconRef.setData(rotateData);
		}));
	}

	//中间主图-农业总产值
	outputValueData() {
		this._tokens.push(api.outputValueData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('农业总产值-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				outputValueDataSource: list
			});
		}));
	}

	//中间主图-GDP占比
	proportionData() {
		this._tokens.push(api.proportionData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('GDP占比-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			list.map((item, i) => {
				item.ratio = item.ratio * 100 + '%';
			});
			this.setState({
				total: total,
				proportionDataSource: list
			});
		}));
	}

	//中间主图-利税
	// profitTaxData() {
	// 	this._tokens.push(api.profitTaxData.send({
	// 		pageNum: this.state.current,
	// 		pageSize: this.state.pageSize,
	// 	}).then((res) => {
	// 		if(window.debugging) console.log('利税-列表', res);
	// 		let list = res.data.list || [];
	// 		let total = res.data.total || 0;
	// 		this.setState({
	// 			total: total,
	// 			profitTaxDataSource: list
	// 		});
	// 	}));
	// }

	//中间主图-注册用户量
	registeredUserData() {
		this._tokens.push(api.registeredUserData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('注册用户量-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				registeredUserDataSource: list
			});
		}));
	}

	//中间主图-农机设备数
	equipmentNumData() {
		this._tokens.push(api.equipmentNumData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('农机设备数-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				equipmentNumDataSource: list
			});
		}));
	}

	//中间主图-农投品使用量
	agriculturalData() {
		this._tokens.push(api.agriculturalData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('农投品使用量-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				agriculturalDataSource: list
			});
		}));
	}

	//中间主图-地标农产品
	landmarkData() {
		this._tokens.push(api.landmarkData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('地标农产品-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				landmarkDataSource: list
			});
		}));
	}

	//中间主图-农业总人口
	totalPopulationData() {
		this._tokens.push(api.totalPopulationData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('农业总人口-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				totalPopulationDataSource: list
			});
		}));
	}

	//中间主图-龙头企业
	enterpriseData() {
		this._tokens.push(api.enterpriseData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('龙头企业-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				enterpriseDataSource: list
			});
		}));
	}

	//中间主图-耕地总面积
	cultivatedLandData() {
		this._tokens.push(api.cultivatedLandData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('龙头企业-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				cultivatedLandDataSource: list
			});
		}));
	}

	//中间主图-涉农企业
	relatedData() {
		this._tokens.push(api.relatedData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('涉农企业-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				relatedDataSource: list
			});
		}));
	}

	//中间主图-农药农投品使用量
	getainulistData() {
		this._tokens.push(api.getainulistData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('农药农投品使用量-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				pesticidesDataSource: list
			});
		}));
	}
	//中间主图-化肥农投品使用量
	getaiulistData() {
		this._tokens.push(api.getaiulistData.send({
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('化肥农投品使用量-列表', res);
			let list = res.data.list || [];
			let total = res.data.total || 0;
			this.setState({
				total: total,
				chemicalFertilizerDataSource: list
			});
		}));
	}

	/**
	 * 弹框-输入框
	 * */
	valueSearch1 = (e) => { //三品一标
		// console.log(e.target.value);
		let value1 = e.target.value.trim();
		this.setState({
			productValue: value1
		});
	};
	valueSearch2 = (e) => { //农户名
		console.log(e.target.value);
		let value1 = e.target.value.trim();
		this.setState({
			farmerName: value1
		});
	};
	valueSearch3 = (e) => { //大棚名称
		console.log(e.target.value);
		let value1 = e.target.value.trim();
		this.setState({
			greenhouseName: value1
		});
	};

	//品种下拉选择框-只显示最终品种
	displayRender(label) {
		return label[label.length - 1];
	}

	//用于级联选择控件的搜索功能（参数：字符串，数组对象）
	cascaderFilter(inputValue, path) {
		//console.log(inputValue, path);
		return(path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
	}

	//农作物耕地面积分布-label点击回调
	populationRadarClick(name) {
		console.log(name); //name为大类
		if(name) {
			const me = this;
			me.refs.dialogRef5._open();
			//me.productType = name; //品类
			//me.productNames = ''; //农产品名称 ,
			me.selectlistFive();
		}
	}

	//三农政策与产值、产量相关性分析
	getCorrelationAnalysis() {
		//this.correlationAnalysisRef.setData(demoData.correlationAnalysis);
		//return;
		this._tokens.push(api.correlationAnalysis.send().then((res) => {
			if(window.debugging) console.log('三农政策与产值、产量相关性分析', res);
			if(res.code == 200 && res.data && res.data.length > 0) {
				let obj = res.data[0];
				let data = obj.data; //接口中的散点数据
				let seriesData = obj.seriesData; //接口中的折线数据
				let xData = obj.xData;
				let lineData = [{
					name: '产值',
					data: seriesData[0]
				}, {
					name: '产量',
					data: seriesData[1]
				}];

				let minData = []; //对比两条折线，取最小数据
				let maxData = []; //对比两条折线，取最大数据
				for(let i = 0; i < seriesData[0].length; i++) {
					if(seriesData[0][i] <= seriesData[1][i]) {
						minData.push(seriesData[0][i]);
						maxData.push(seriesData[1][i]);
					} else {
						minData.push(seriesData[1][i]);
						maxData.push(seriesData[0][i]);
					}
				}
				let max = Math.ceil(Math.max.apply(null, maxData));
				//console.log(minData, maxData, max);
				let scatterData = [];
				data.map((s, i) => {
					let arr = [];
					let num = i * (max / 6);
					s.map((t, j) => {
						if(t) {
							arr.push({
								name: t,
								value: minData[j] + num
							});
						} else {
							arr.push(null);
						}
					});
					scatterData.push(arr);
				});
				let correlationAnalysisData = {
					xData: xData,
					lineData: lineData,
					scatterData: scatterData,
					//max: max
				};
				//console.log(JSON.stringify(correlationAnalysisData));
				this.correlationAnalysisRef.setData(correlationAnalysisData);
			}
		}));
	}

	//点击三农政策的marker，显示三农政策标题
	showCorrelationAnalysisTitle(e) {
		//console.log(e);
		if(e.seriesType === 'scatter') {
			let offsetX = e.event.offsetX;
			let offsetY = e.event.offsetY;
			this.correlationAnalysisTooltipRef.setState({
				flag: true,
				name: e.name,
				pos: [offsetX, offsetY]
			});
		} else {
			this.correlationAnalysisTooltipRef.setState({
				flag: false
			});
		}
	}

	//点击三农政策标题，显示三农政策详情
	showCorrelationAnalysisDialog(name) {
		//console.log(name);
		this.refs.nyzcDialogRef._open();
		//调接口
		this._tokens.push(api.gethomeviewdetail.send({
			policyname: name
		}).then((res) => {
			if(window.debugging) console.log('三农政策与产值、产量相关性分析政策内容-下钻', res);
			let data = res.data || {};
			this.setState({
				nyzcTitle: name,
				nyzcTime: handleDateUtc(data.policytime),
				nyzcContent: data.policycontent,
			});
		}));
	}

	//移动端统计-注册量、活跃度走势
	getZclData() {
		//this.zclRef._setData(demoData.zclData);
		//调接口
		this._tokens.push(api.selectAppTrend.send().then((res) => {
			if(window.debugging) console.log('移动端统计-注册量、活跃度走势', res);
			let data = res.data || {};
			let YactiveDivision = data.YactiveDivision;
			YactiveDivision = YactiveDivision.map((item, i) => {
				return item * 100;
			});
			this.zclRef._setData({
				barData: data.YallData, //注册量
				lineData: YactiveDivision, //活跃度
				xDateTime: data.xyear,
				unit: [data.danwei, '%']
			});
		}));
	}
	//移动端统计-用户类型占比
	getUserTypeData() {
		//this.userTypeRadarRef.setData(demoData.userTypeData);
		//调接口
		this._tokens.push(api.selectAppUserType.send().then((res) => {
			if(window.debugging) console.log('移动端统计-用户类型占比', res);
			let data = res.data || [];
			let userTypeData = {
				indicator: [],
				value: []
			};
			let max = 0;
			data.map((item, i) => {
				if(max < item.total) {
					max = item.total;
				}
			});
			data.map((item, i) => {
				userTypeData.indicator.push({
					name: item.usertype,
					max: max
				});
				userTypeData.value.push(item.total);
			});
			this.userTypeRadarRef.setData(userTypeData);
		}));
	}
	//移动端统计-供需类型占比
	getSupplyDemandData() {
		//this.supplyDemandRef.setData(demoData.supplyDemandData);
		//调接口
		this._tokens.push(api.selectNeedAndService.send().then((res) => {
			if(window.debugging) console.log('移动端统计-供需类型占比', res);
			try {
				let data = JSON.parse(res.data);
				this.supplyDemandRef.setData({
					"unit": "条",
					"colorArr": ["#0297ff", "#00cfff", "#2bfdb6", "#28dd5f", "#fffd04", "#20fd40"],
					"seriesData": [{
						"name": "需求发布",
						"value": data.needCount
					}, {
						"name": "供应发布",
						"value": data.serviceCount
					}]
				});
			} catch(e) {
				this.supplyDemandRef.setData(demoData.supplyDemandData);
			}
		}));
	}

	render() {
		const me = this;
		let varietySelect = me.state.varietySelect;
		let varietySelect2 = me.state.varietySelect2;
		let scgmzsParams = me.state.scgmzsParams;
		let priceContrastParams = me.state.priceContrastParams;
		let networkParams = me.state.networkParams;
		return(
			<div>
				<div style={{zIndex: 99, position: 'absolute', top: 80, left: 1150, width: 188, height: 61, cursor: 'pointer', background: `url(${app_bg}) no-repeat`}} onClick={()=>{this.refs.appStatisticsDialogRef._open()}}>
					<img src={app_icon} style={{float: 'left', margin: '21px 0 0 17px'}} />
					<span style={{float: 'left', marginLeft: 10, fontSize: 19, color: '#fff', lineHeight: '61px'}}>移动端数据分析</span>
				</div>
				<Dialog title={'移动端统计'} ref={'appStatisticsDialogRef'}>
					<div style={{padding: '50px 74px', height: 740}}>
						<div style={{position: 'relative', float: 'left', width: 900, height: 630}}>
							<Panel title={'注册量、活跃度走势'} width={540} height={630}>
	          		<SalePriceAnalysis dataZoom={false} ref={ref=>me.zclRef=ref} width={900} height={570} containerTop={40} top={60} bottom={20} legend={['累计注册量', '活跃度']} unit={['人', '%']} max={100} />
	        		</Panel>
						</div>
						<div style={{position: 'relative', float: 'right', width: 450, height: 330}}>
							<Panel title={'用户类型占比'} width={440} height={330}>
	          		<RadarCharts width={400} height={280} top={40} name={'用户类型占比'} unit={'人'} ref={ref => this.userTypeRadarRef = ref} />
	        		</Panel>
						</div>
						<div style={{position: 'relative', float: 'right', width: 450, height: 300}}>
							<Panel title={'供需类型占比'} width={440} height={300}>
	          		<Pie ref={(ref) => this.supplyDemandRef = ref} style={{width: 440, height: 300 }} />
	        		</Panel>
						</div>
					</div>
				</Dialog>
				
        {/*产业结构分析*/}
        <Panel title={'产业结构分析'} width={454} height={287} top={90} left={30} type={1} onClick={this.leaderBig1.bind(this, '产业结构')}>
          <StructureAnalysis time={this.state.industrStructureTime} ref={'selectIndustrStructureRef'}/>
        </Panel>
        {/*产业结构分析-弹框*/}
        <Dialog title={'产业结构'} ref={'dialogRef1'} close={me.dialogClose1.bind(me)}>
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span>地区：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef1 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0])}/>
              <div style={{position: 'absolute', left: 290}}>
                <span>时间：</span>
                <DatePickers type={'year'} max={scgmzsParams.endtime} placeholder={'开始时间'} value={scgmzsParams.starttime} onChange={this.getTime.bind(this, 'scgmzs', 'starttime')}/>
                <span style={{color: '#fff', marginLeft: 10, marginRight: 10}} className={'to'}>至</span>
                <DatePickers type={'year'} min={scgmzsParams.starttime} placeholder={'结束时间'} value={scgmzsParams.endtime} onChange={this.getTime.bind(this, 'scgmzs', 'endtime')}/>
              </div>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick1.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={industrialStructureDataSource => industrialStructureDataSource.id} width={1100} columns={this.state.industrialStructureColumn} dataSource={this.state.industrialStructureDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage1}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>

				{/*宏观发展状况*/}
				<div style={{position: 'absolute', top: 70, left: 520, width: 900, height: 600}}>
					<RotateIcon ref={ref => me._rotateIconRef = ref} onClick={this.rotateIconClick.bind(this)}/>
				</div>

        {/*农业总产值*/}
        <Dialog title={'农业总产值'} ref={'dialogRef6'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={outputValueColumn => outputValueColumn.id} width={1100} columns={this.state.outputValueColumn} dataSource={this.state.outputValueDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage6}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*GDP占比*/}
        <Dialog title={'GDP占比'} ref={'dialogRef7'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={proportionColumn => proportionColumn.id} width={1100} columns={this.state.proportionColumn} dataSource={this.state.proportionDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage7,}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*利税*/}
        {/*<Dialog title={'利税'} ref={'dialogRef8'} close={me.dialogCloses.bind(me)}>*/}
          {/*<div style={{position: 'absolute', top: 80, left: 60, right: 60}}>*/}
            {/*<Table rowKey={profitTaxColumn => profitTaxColumn.id} width={1100} columns={this.state.profitTaxColumn} dataSource={this.state.profitTaxDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage8}} scroll={{y: 470}} locale={this.locale} />*/}
          {/*</div>*/}
        {/*</Dialog>*/}
        {/*注册用户量*/}
        <Dialog title={'注册用户量'} ref={'dialogRef9'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={registeredUserColumn => registeredUserColumn.id} width={1100} columns={this.state.registeredUserColumn} dataSource={this.state.registeredUserDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage9}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*农机设备数*/}
        <Dialog title={'农机设备数'} ref={'dialogRef10'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={equipmentNumColumn => equipmentNumColumn.id} width={1100} columns={this.state.equipmentNumColumn} dataSource={this.state.equipmentNumDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage10}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*农投品使用量*/}
        <Dialog title={'农投品使用量'} ref={'dialogRef11'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={agriculturalColumn => agriculturalColumn.id} width={1100} columns={this.state.agriculturalColumn} dataSource={this.state.agriculturalDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage11}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*地标农产品*/}
        <Dialog title={'地标农产品'} ref={'dialogRef12'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={landmarkColumn => landmarkColumn.id} width={1100} columns={this.state.landmarkColumn} dataSource={this.state.landmarkDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage12}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*农业总人口*/}
        <Dialog title={'农业总人口'} ref={'dialogRef13'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={totalPopulationColumn => totalPopulationColumn.id} width={1100} columns={this.state.totalPopulationColumn} dataSource={this.state.totalPopulationDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage13}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*龙头企业*/}
        <Dialog title={'龙头企业'} ref={'dialogRef14'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={enterpriseColumn => enterpriseColumn.id} width={1100} columns={this.state.enterpriseColumn} dataSource={this.state.enterpriseDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage14}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*耕地总面积*/}
        <Dialog title={'耕地总面积'} ref={'dialogRef15'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={cultivatedLandColumn => cultivatedLandColumn.id} width={1100} columns={this.state.cultivatedLandColumn}
              dataSource={this.state.cultivatedLandDataSource} pagination={{
              current: this.state.current,
              total: this.state.total,
              pageSize: this.state.pageSize,
              onChange: this.changePage15,
            }} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*涉农企业*/}
        <Dialog title={'涉农企业'} ref={'dialogRef16'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={relatedColumn => relatedColumn.id} width={1100} columns={this.state.relatedColumn} dataSource={this.state.relatedDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage16}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>

        {/*农药农投品使用量*/}
        <Dialog title={'农药农投品使用量'} ref={'dialogRef17'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={pesticidesColumn => pesticidesColumn.id} width={1100} columns={this.state.pesticidesColumn} dataSource={this.state.pesticidesDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage17}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        {/*化肥农投品使用量*/}
        <Dialog title={'化肥农投品使用量'} ref={'dialogRef18'} close={me.dialogCloses.bind(me)}>
          <div style={{position: 'absolute', top: 80, left: 60, right: 60}}>
            <Table rowKey={chemicalFertilizerColumn => chemicalFertilizerColumn.id} width={1100} columns={this.state.chemicalFertilizerColumn} dataSource={this.state.chemicalFertilizerDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage18}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>

        {/*两品一标统计*/}
        <Panel title={'两品一标统计'} width={454} height={287} top={390} left={30} type={1} onClick={this.leaderBig2.bind(this, '两品一标统计')}>
          <UnifiedStandard ref={'selectThreeOneRef'}/>
        </Panel>
        {/*两品一标统计-弹框*/}
        <Dialog title={'两品一标统计'} ref={'dialogRef2'} close={me.dialogClose2.bind(me)}>
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span>地区：</span>
              <Select left={60} ref={(ref) => {
                this.siteSelectRef2 = ref
              }} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0])}/>
              <span style={{position: 'absolute', left: 270}}>两品一标分类：</span>
              <Select left={395} ref={(ref) => {
                this.siteSelectRef3 = ref
              }} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <span style={{position: 'absolute', left: 600}}>农产品名称：</span>
              <Input placeholder="请输入农产品名称" onChange={this.valueSearch1.bind(this)} value={this.state.productValue}
                     style={{width: 180, position: 'relative', left: 650, top: 0}}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick2.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={spybDataSource => spybDataSource.id} width={1100} columns={this.state.spybColumn}
              dataSource={this.state.spybDataSource} pagination={{
              current: this.state.current,
              total: this.state.total,
              pageSize: this.state.pageSize,
              onChange: this.changePage2
            }} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>

        {/*农作物耕地面积分布*/}
        <Panel title={'农作物耕地面积分布'} width={454} height={287} top={700} left={30}>
          <RadarCharts width={400} height={230} top={60} name={'农作物耕地面积分布'} unit={'公顷'} ref={ref => this.populationRadarRef = ref} radarClick={this.populationRadarClick.bind(this)}/>
        </Panel>
        {/*农作物耕地面积分布-弹框*/}
        <Dialog title={'农作物耕地面积分布'} ref={'dialogRef5'} close={me.dialogClose5.bind(me)}>
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span>地区：</span>
              <Select left={50} ref={(ref) => {this.siteSelectRef9 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0])}/>
              <span style={{position: 'absolute', left: 235}}>农产品：</span>
              <Cascader options={varietySelect2} defaultValue={[smallVariety]} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.areaDistributionVarietyChange.bind(this)} style={{left: 255}}/>
              <Button type="primary" style={{position: 'absolute', right: -10, top: 0}} onClick={this.handleClick5.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={areaDistributionDataSource => areaDistributionDataSource.id} width={1100} columns={this.state.areaDistributionColumn} dataSource={this.state.areaDistributionDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage5}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>

        {/*农产品销售全国流向*/}
        <Panel title={'农产品销售全国流向'} width={440} height={280} top={100} left={1450}>
          <div style={{width: '440px', height: '260px', position: 'absolute', top: '45px', left: '-10px'}}>
            <ChinaMap ref={'selectSaleDirectionRef'} style={{width: '440px', height: '260px', marginTop: 0,}}/>
          </div>
        </Panel>

        {/*批发零售价格比较*/}
        <Panel title={'批发零售价格比较'} left={1450} top={400} width={440} height={285} type={1} onClick={this.leaderBig3.bind(this, '农产品批发零售价格')}>
          <Cascader options={varietySelect} defaultValue={[smallVariety]} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.priceContrastVarietyChange.bind(this)} style={{width: 100, left: 210, top: 25}}/>
          <FELineChartReact ref={ref => me._feLineChart$1 = ref} width={447} height={230} top={60}/>
        </Panel>
        {/*批发零售价格比较-弹框*/}
        <Dialog title={'农产品批发零售价格'} ref={'dialogRef3'} close={me.dialogClose3.bind(me)}>
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span>农产品：</span>
              <Cascader options={varietySelect} defaultValue={[smallVariety]} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.priceContrastVarietyChange2.bind(this)} />
              <div className={'select-time'} style={{left: 30}}>
                <span>时间：</span>
                <DatePickers type={'month'} max={priceContrastParams.endTime} placeholder={'选择开始时间'} value={priceContrastParams.startTime} onChange={this.getTime.bind(this, 'priceContrast', 'startTime')} />
			        	<span className={'to'}>至</span>
			        	<DatePickers type={'month'} min={priceContrastParams.startTime} placeholder={'选择结束时间'} value={priceContrastParams.endTime}
                        onChange={this.getTime.bind(this, 'priceContrast', 'endTime')} />
              </div>
              <span style={{position: 'absolute', left: 860}}>销售类型：</span>
              <Select left={950} ref={(ref) => {this.siteSelectRef7 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Button type="primary" style={{position: 'absolute', right: 0, top: 0}} onClick={this.handleClick3.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={priceContrastDataSource => priceContrastDataSource.id} width={1100} columns={this.state.priceContrastColumn} dataSource={this.state.priceContrastDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage3}} scroll={{y: 480}} locale={this.locale} />
          </div>
        </Dialog>

        {/*物联网设备发展概况*/}
        <Panel title={'物联网设备发展概况'} width={454} height={287} top={700} left={1450} type={1} onClick={this.leaderBig4.bind(this, '物联网设备')}>
          <BarCharts width={400} height={230} top={20} ref={ref => this.populationBarRef = ref}/>
        </Panel>
        {/*物联网设备发展概况-弹框*/}
        <Dialog title={'物联网设备'} ref={'dialogRef4'} close={me.dialogClose4.bind(me)}>
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span>地区：</span>
              <Select left={50} ref={(ref) => {this.siteSelectRef8 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[0])}/>
              <span style={{position: 'absolute', left: 245}}>农户名：</span>
              <Input placeholder="请输入农户名" onChange={this.valueSearch2.bind(this)} value={this.state.farmerName} style={{width: 180, position: 'relative', left: 265, top: 0}}/>
              <span style={{position: 'absolute', left: 522}}>大棚名称：</span>
              <Input placeholder="请输入大棚名称" onChange={this.valueSearch3.bind(this)} value={this.state.greenhouseName} style={{width: 180, position: 'relative', left: 375, top: 0}}/>
              <div className={'select-time'} style={{position: 'absolute', left: 820}}>
                <span>时间：</span>
                <DatePickers type={'day'} max={networkParams.endTime} placeholder={'选择开始时间'} value={networkParams.startTime} onChange={this.getTime.bind(this, 'network', 'startTime')} />
			        	<span className={'to'}>至</span>
			        	<DatePickers type={'day'} min={networkParams.startTime} placeholder={'选择结束时间'} value={networkParams.endTime}
                        onChange={this.getTime.bind(this, 'network', 'endTime')} />
              </div>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick4.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={networkEquipmentDataSource => networkEquipmentDataSource.id} width={1100} columns={this.state.networkEquipmentColumn} dataSource={this.state.networkEquipmentDataSource} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage4}} scroll={{y: 470}} locale={this.locale} />
          </div>
        </Dialog>
        
        {/*三农政策与产值、产量相关性分析*/}
        <Panel title={'三农政策与产值、产量相关性分析'} width={670} height={310} top={700} left={520}>
        	<div style={{position: 'relative', top: 40}}>
	        	<LineMore ref={ref => this.correlationAnalysisRef = ref} height={270} width={870} legend={['产值', '产量']} click={this.showCorrelationAnalysisTitle.bind(this)} />
	        	<LineMoreTooltip ref={ref=>this.correlationAnalysisTooltipRef=ref} click={this.showCorrelationAnalysisDialog.bind(this)} />
        	</div>
        </Panel>
        <Dialog title={'农业政策'} ref={'nyzcDialogRef'}>
        	<div style={{padding: '35px 80px', height: 730}}>
        		<h4 style={{fontSize: 24,
						  color: '#fff',
						  textAlign: 'center',
						  lineHeight: 1}}>{this.state.nyzcTitle}</h4>
        		<div style={{
					    fontSize: 14,
					    color: '#87bbff',
					    textAlign: 'center',
					    lineHeight: 1,
					    margin: '20px 0'
						}}>{this.state.nyzcTime}</div>
        		<div className={'sannongzhengce'} style={{background: `url(${blue_bar}) no-repeat top center`, padding: '30px 0', fontSize: 16, height: 580, lineHeight: '29px', overflow: 'auto'}} dangerouslySetInnerHTML={{__html: this.state.nyzcContent}}></div>
        	</div>
				</Dialog>
      </div>
		)
	}
}

export default Homepage;
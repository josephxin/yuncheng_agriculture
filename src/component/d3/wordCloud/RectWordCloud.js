/**
 * Created by admin on 2018-12-10.
 */
import WordCloud from './WordCloud';
import React from 'react';
import ReactDOM from 'react-dom';
//弹出框
import Dialog from '../../dialog/Dialog';
import Ai from './img/ai.png';
/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay } from '../../../tool/tool.js';
//种植计算器
/*import PlantAlculator from '../../plant-alculator/plantAlculator';*/
/*病虫害*/
import Pie from '../../echarts/pie/Pie'
import UnifiedStandard from '../../structure-analysis/unifiedStandard1';
/*沃土指数*/
import LineSingle from './LineSingle';
//调用接口
import { api } from './api.js';
//按钮
import { Button, Table, Radio, Row, Col, Icon, Layout, Menu, Card, InputNumber, message } from 'antd';
/*引入日期插件*/
import DatePickers from '../../DatePickers/DatePickers';

/*采收量预测*/
import PlantArea2 from '../../plant-area/PlantArea2';
/*种植面积走势*/
import PlantArea3 from '../../plant-area/plantArea3';
/*预测收入*/
import PlantArea4 from '../../plant-area/PlantArea4';
/*成本分析*/
import CbfxPie from './cbfxPie';

import PyPriceTrend from '../../echarts/BarLinecloud';
//全部品种下拉框
import { Cascader, Carousel } from 'antd';
import StockWarn from './StockWarn1';
import onlinetradeimg from './onlinetrade.png';
import supplyChainFinanceimg from './supplyChainFinance.png';
import ScjcSingleColumn from '../../echarts/scjcSingleColumn';
import GreenhouseDetails from '../../scjc-greenhouseDetails1/greenhouseDetails'
import foodExpo1 from './foodExpo1.jpg';
import foodExpo2 from './foodExpo2.jpg';
import foodExpo3 from './foodExpo3.jpg';
import foodExpo4 from './foodExpo4.jpg';
import foodExpo5 from './foodExpo5.jpg';
import './imgwheelPlanting.css';
import './carousel.scss';
import ResizeObserver from 'resize-observer-polyfill';
//zent三种事件选择组件
import Select from '../../select/Select';
import Pie11 from '../../pie/Pie';
import LtpxsRate from '../../DivChart';
import Panel from '../../panel/Panel';
import Tab from '../../tab/Tab';

const RadioGroup = Radio.Group;
const paramsMonth = setParamsMonth();
const chang = 100;
const kuan = 12;

class RectWordCloud extends React.Component {
	constructor(props) {
		super();
		this.yieldTrendRef = React.createRef();
		this.bigWtrateFxRef = React.createRef();
		//tab
		this.observationColumns1 = [{
			title: '40',
			dataIndex: 'name',
			key: 'name',
			width: 72,
			render: (text, record) => (
				<span style={{color: '#4ac5ff',}}>
          {text}
        </span>
			),
		}, {
			title: '50',
			dataIndex: 'area',
			key: 'area',
			width: 50,
		}, {
			title: '60',
			dataIndex: 'product',
			key: 'product',
			width: 52,
		}, {
			title: '70',
			dataIndex: 'weight',
			key: 'weight',
			width: 52,
		}, {
			title: '80',
			dataIndex: 'price',
			key: 'price',
			width: 90,
			render: (text, record) => (
				<span style={{color: '#e7c14a'}}>
          {text}
        </span>
			),
		}, {
			title: '总数',
			dataIndex: 'time',
			key: 'time',
			width: 98,
		}];
		this.radioChecked = ''; //种植计算器默认选中的值
		this.price = 0; //平均价格
		//成本分析
		this.paramsCbfx = {
			smallVariety: '黄瓜',
			cultivatedArea: chang * kuan / 666.67,
		};
		this.state = {
			isPie: true,
			isNoData: false,
			//品种结构分析
			varietyStructureParams: {
				//region:sessionStorage.getItem('modleName') ? sessionStorage.getItem('modleName') : '寿光市',
				startDate: paramsMonth.startTime,
				endDate: paramsMonth.endTime,
				diseaseType: 0, //0-病害；1-虫害
			},
			diseaseTypeText: '病害',
			//各品种种植面积Top10
			varietyStructure: {
				//region:sessionStorage.getItem('modleName') ? sessionStorage.getItem('modleName') : '寿光市',
				bigVariety: '粮食',
				startTime: paramsMonth.startTime,
				endTime: paramsMonth.endTime,
			},
			//判断是否是第三级
			isthree: false,
			bigUnitOfProductionScale: '万亩',
			pzjgfenregin: '',
			titleName: '寿光',
			//品种结构分析Top10排行title
			varietiesTitle: '病害',
			ppnpDedCon: '', //获取弹框详情
			//time: '',
			//各区县沃土指数
			districtAndCountyFertileParams: {
				dateTime: this.getNowTime('year')
			},
			iFrameHeight: '0px',
			data: [],
			dataSource1: [],

			/*种植计算器变量-开始*/
			chang: chang,
			kuan: kuan,
			forecastCost: 0,
			allOutput: '', //总产量
			allPrice: '', //总收入
			plantDate: this.getNowTime('day'),
			landStatus: '自有',

			isPlantArea: false,
			isHarvestVolume: false,
			isForecastCost: false,
			isForecastIncome: false,

			isPlantArea1: false,
			isHarvestVolume1: false,
			isForecastCost1: false,
			isForecastIncome1: false,
			/*种植计算器变量-结束*/

			//沃土指数
			fertileSoilParams: {
				startTime: '2009',
				endTime: this.getNowTime('year'),
				region: '潍坊全市',
			},
			//全部品种下拉框
			selectPin: [],
		};
		this.flag = false;
		this.rootStyle = {
			position: 'absolute',
			width: `${props.width || 400}px`,
			height: `${props.height || 400}px`,
			left: `${props.left || 0}px`,
			top: `${props.top || 0}px`,
		};

		/*初始化*/
		this._chart = new WordCloud();
		this._chart.initial();
		this.wtrateRef = React.createRef();
		this.bigWtrateRef = React.createRef();
		this.harvestingAndIncomeRef = React.createRef();
		this.bigHarvestingAndIncomeRef = React.createRef();
	}

	componentDidMount() {
		this.varietiesTreeFunc()
		this.curDateTime(); //获取当天时间
		/*添加实例dom到指定容器*/
		let chart = this._chart;
		let props = this.props;
		this.refs.svgContainer.appendChild(chart.domElement);
		chart.size = {
			width: props.width,
			height: props.height
		};
		//品种结构分析
		this.pzjgSiteSelectRef._setList(['寿光', '奎文', '潍城', '寒亭', '坊子', '青州', '诸城', '安丘', '高密', '昌邑', '昌乐', '临朐']);
		this.pzjgSiteSelectRef._setSelectedText('寿光');
		this.scgmpmTabData = ['病害', '虫害'];
	}

	componentDidUpdate() {
		let chart = this._chart;
		let state = this.state;
		if(this.flag) {
			this.flag = false;
			chart.data = state.data
		}
	}

	_setData(d) {
		this.flag = true;
		this.setState({
			data: d
		});
	}

	//品种结构分析 病害虫害
	bigProductionRankingTabChange(e) {
		var regin = '';
		if(this.state.pzjgfenregin == '') {
			regin = this.state.titleName;
		} else {
			regin = this.state.pzjgfenregin;
		}
		if(e.label == '病害') {
			this.state.varietyStructureParams.diseaseType = 0;
			this.setState({
				diseaseTypeText: '病害',
			});

		} else if(e.label == '虫害') {
			this.state.varietyStructureParams.diseaseType = 1;
			this.setState({
				diseaseTypeText: '虫害',
			});
		}

		this.varietyStructureFunc(regin);
	}

	//品种结构分析
	varietyStructureFunc(regin) {
		let pieData = {
			unit: '条',
			seriesData: []
		};
		this.state.varietyStructureParams.region = regin;
		let pieSeriesData = [];
		api.selectGroupName(this.state.varietyStructureParams).then((result) => {
			if(result.content.length > 0) {
				result.content.map((item, i) => {
					pieSeriesData.push({});
					pieSeriesData[i].name = item.disease_name;
					pieSeriesData[i].value = item.diseaseNum;
				})
				let confirm = [];
				pieSeriesData.map((item, i) => {
					if(item.value) {
						confirm.push(item)
					}
				})
				pieData.seriesData = confirm;

				this.setState({
					isPie: true,
					isNoData: false
				})
				this.plantingAreaTop10.setData(pieSeriesData); //排行榜
				this.bigPieRef._setData(pieData);
			} else {
				//console.log(333,pieData)
				this.setState({
					isPie: false,
					isNoData: true
				})
				this.plantingAreaTop10.setData([]); //排行榜
				this.bigPieRef._setData([]);
			}
			/*			this.plantingAreaTop10.setData(pieSeriesData); //排行榜
						this.bigPieRef._setData(pieData);*/
		}).catch(() => {});
	}

	//品种结构分析开始时间
	varietyStructureGetStartTime(key, date) {
		let params = this.state.varietyStructureParams;
		params[key] = date;
		this.setState({
			varietyStructureParams: params,
			varietyStructure: {
				...this.state.varietyStructure,
				startDate: date
			}
		});
		var regin = '';
		if(this.state.pzjgfenregin == '') {
			regin = this.state.titleName;
		} else {
			regin = this.state.pzjgfenregin;
		}
		this.varietyStructureFunc(regin);
	}

	//品种结构分析结束时间
	varietyStructureGetEndTime(key, date) {
		let params = this.state.varietyStructureParams;
		params[key] = date;
		this.setState({
			varietyStructureParams: params,
			varietyStructure: {
				...this.state.varietyStructure,
				endDate: date
			}
		})
		var regin = '';
		if(this.state.pzjgfenregin == '') {
			regin = this.state.titleName;
		} else {
			regin = this.state.pzjgfenregin;
		}
		this.varietyStructureFunc(regin);
	}

	/*品种结构分析区域*/
	varietyStructureSelectChange(e) {
		this.setState({
			pzjgfenregin: e.name,
			titleName: e.name,
		})
		this.varietyStructureFunc(e.name);
	}

	//结构分析点击扇形图变化Top10排行
	updateAreaTop10(e) {
		console.log(e);
		this.state.varietyStructure.bigVariety = e.name;
		this.setState({
			varietiesTitle: e.name
		});
		var regin = '';
		if(this.state.pzjgfenregin == '') {
			regin = this.state.titleName;
		} else {
			regin = this.state.pzjgfenregin;
		}
		this.varietyStructureFunc(regin);
	}

	//获取当前时间
	getNowTime(data) {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate;
		//判断日期是需要返回是什么类型
		if(data == 'year') {
			return currentdate = year;
		} else if(data == 'yearMonth') {
			return currentdate = year + seperator1 + month;
		} else {
			return currentdate = year + seperator1 + month + seperator1 + strDate;
		}
	}

	//沃土指数
	fertileSoilIndexFunc() {
		const me = this;
		const wtrateDom = me.wtrateRef.current;
		const bigWtrateDom = me.bigWtrateRef.current;
		let wtrateData = {
			data: [],
			date: [],
			unit: 'g/kg'
		}
		api.fertileSoilIndex(this.state.fertileSoilParams).then((result) => {
			if(window.debugging) console.log('沃土指数', result);
			if(result.content != []) {
				result.content.map((item, i) => {
					wtrateData.data.push(item.fertileSoil);
					wtrateData.date.push(item.dateTime);
				})
				wtrateDom.setData(wtrateData);
			}
		})
	}

	//所有品种下拉框
	varietiesTreeFunc() {
		api.varietiesTree().then((result) => {
			if(window.debugging) console.log('所有品种下拉框', result);
			let selectPinData = [];
			result.content.subList.map((item, i) => {
				selectPinData.push({});
				selectPinData[i].name = selectPinData[i].code = item.typeName;
				selectPinData[i].items = [];
				item.subList.map((itemson, j) => {
					selectPinData[i].items.push({});
					selectPinData[i].items[j].name = selectPinData[i].items[j].code = itemson.typeName
				})
			})
			this.setState({
				selectPin: selectPinData
			})
		})
	}

	//各区县沃土指数分析
	DistrictAndCountyFertileSoilFunc() {
		const bigWtrateFxDom = this.bigWtrateFxRef.current;
		let districtAndCountyFertileSoilData = {
			data: [],
			date: [],
			text: ''
		}
		api.districtAndCountyFertileSoil(this.state.districtAndCountyFertileParams).then((result) => {
			if(window.debugging) console.log('各区县沃土指数分析', result);
			if(result.content.length != 0) {
				result.content.map((item, i) => {
					districtAndCountyFertileSoilData.data.push(item.fertileSoil);
					districtAndCountyFertileSoilData.date.push(item.region);
				})
				districtAndCountyFertileSoilData.text = result.content[0].dateTime;
				bigWtrateFxDom.setData(districtAndCountyFertileSoilData);
			}
		});
	}

	handleClick(d) {
		let me = this;
		let name = this._chart.gNode.data.name;
		//console.log('词云点击事件数据', name);
		if(name === '寿光模式') {
			window.location.hash = 'modleChange?' + name;
		} else if(name === '安丘模式') {
			window.location.hash = 'modleChange?' + name;
		} else if(name === '诸城模式') {
			window.location.hash = 'modleChange?' + name;
		} else if(name === 'AI种植') {
			me.bigDataResources('AI种植')
		}
		/*else if(name==='AI养殖'){
		      me.bigDataResources1('AI养殖')
		    }else if(name==='环境监控'){
		      me.envirMonitFun('环境监控')
		    }else if(name==='食品安全'){
		      me.foodSafetyFun('食品安全')
		    }*/
		else if(name === '病虫害') {
			me.diseaInsectPestsFun('病虫害')
		} else if(name === '三品一标') {
			me.productsFun('三品一标');
			me.selectThreeOneData();
		} else if(name === '沃土指数') {
			me.fatSoliFun('沃土指数');
			me.fertileSoilIndexFunc();
			//各区县沃土指数分析
			me.DistrictAndCountyFertileSoilFunc()
		} else if(name === "种植计算器") {
			me.plantCalculatorFun('种植计算器');
		} else if(name === "农村劳动力") {
			me.ruralLaborForceFun('农村劳动力');
		}
		/*else if(name==="供应链金融"){
		      me.supplyChainFinanceFun('供应链金融');
		    }else if(name==="线上贸易"){
		      me.onlinetradeFun('线上贸易');
		    }*/
		else if(name === "植株生长周期") {
			me.growthCycleFun('植株生长周期');
		} else if(name === "菜博会") {
			me.foodExpoFun('菜博会');
		} else {
			me.dialogmm(name);
		}
	}

	/*产量走势*/
	yieldTrendData() {
		let me = this;
		this.salesTrendParams = {
			dateTime: '2018',
		}
		api.selectWfSmRuralLaborers(this.salesTrendParams).then((res) => {
			let output = []; //产量
			let compareChangeRate = []; //变化率
			let dateTime = []; //日期
			if(res.content != []) {
				res.content.map((item, i) => {
					output.push(item.personNum);
					compareChangeRate.push(item.numRate);
					dateTime.push(item.dateYear);
				});
				// 产量走势
				const yieldTrendDom = this.yieldTrendRef.current;
				yieldTrendDom.setData({
					date: dateTime,
					dataBar: output,
					dataLine: compareChangeRate,
					legend: ['人数', '比例'],
					unitL: '人',
					unitR: '%'
				});
			}
		});
	}

	/*其它弹框*/
	dialogmm(text) {
		this.refs.ppnpDialogRef._open(text);
		var name = this._chart.gNode.data.name;
		var data = this.state.data;
		data.map((item, i) => {
			if(item.name == name) {
				this.setState({
					ppnpDedCon: item.introduction,
				});
			}
		});
	}

	/*菜博会*/
	foodExpoFun(text) {
		this.refs.foodExpo._open(text);
	}

	/*植株生长周期*/
	growthCycleFun(text) {
		this.refs.growthCycle._open(text);
	}

	/*线上贸易*/
	onlinetradeFun(text) {
		this.refs.onlinetrade._open(text);
	}

	/*农村劳动力*/
	ruralLaborForceFun(text) {
		this.refs.ruralLaborForce._open(text);
		//实时交易信息
		//this.TradeMessage3();
		/*产量走势*/
		this.yieldTrendData();
	}

	/*供应链金融*/
	supplyChainFinanceFun(text) {
		this.refs.supplyChainFinance._open(text);
	}

	/*种植计算器*/
	plantCalculatorFun(text) {
		this.refs.plantCalculator._open(text);
	}

	/*AI种植*/
	bigDataResources(text) {
		this.refs.sjstRef._open(text);
	}

	/*AI养殖*/
	bigDataResources1(text) {
		this.refs.sjstRef1._open(text);
	}

	/*环境监控*/
	envirMonitFun(text) {
		this.refs.envirMonit._open(text);
	}

	/*食品安全*/
	foodSafetyFun(text) {
		this.refs.foodSafety._open(text);
	}

	/*病虫害*/
	diseaInsectPestsFun(text) {
		this.refs.diseaInsectPests._open(text);
		//品种结构分析
		this.varietyStructureFunc('寿光');
		//this.varietyStructureTop10Func('寿光'); //品种结构分析Top
	}

	/*三品一标*/
	productsFun(text) {
		this.refs.products._open(text);
	}

	/*沃土指数*/
	fatSoliFun(text) {
		this.refs.fatSoli._open(text);
	}

	/*------种植计算器开始------*/
	cbfxInput1(e) {
		//console.log(e);
		this.setState({
			chang: e
		});
		this.paramsCbfx.cultivatedArea = this.state.chang * this.state.kuan / 666.67;
		//console.log(this.paramsCbfx.cultivatedArea); //输出的是上一次的值
	}
	
	cbfxInput2(e) {
		//console.log(e);
		this.setState({
			kuan: e
		});
		this.paramsCbfx.cultivatedArea = this.state.chang * this.state.kuan / 666.67;
		//console.log(this.paramsCbfx.cultivatedArea); //输出的是上一次的值
	}
	
	//成本分析 全部品种
	cbfxCascaderSelect(e) {
		//console.log(e);
		this.paramsCbfx.smallVariety = e[e.length - 1];
	}

	/*种植计算器-计算按钮*/
	countClick() {
		//console.log(this.state.plantDate);//日期为空时，得到undefined
		if(!this.state.plantDate) {
			message.info('请选择时间！');
			return;
		}
		//种植面积走势
		this.plantAreaData();
		//采收量与收入监测预警
		this.plantAreaData2();
		//成本分析
		this.costAnalysisFunc();
		
		this.setState({
			isPlantArea: true,
			isHarvestVolume: true,
			isForecastCost: true,
			isForecastIncome: true
		});
		/*清空radio选中的值，并且隐藏所有*/
		this.radioChecked = '';
		this.setState({
			isPlantArea1: false,
			isHarvestVolume1: false,
			isForecastCost1: false,
			isForecastIncome1: false
		});
	}

	/*种植计算器-单选按钮*/
	radioChange(e) {
		if(!this.state.plantDate) {
			message.info('请选择时间！');
			return;
		}
		this.setState({
			isPlantArea: false,
			isHarvestVolume: false,
			isForecastCost: false,
			isForecastIncome: false
		});
		if(e.target.value === '种植走势') {
			this.radioChecked = '种植走势';
			this.setState({
				isPlantArea1: true,
				isHarvestVolume1: false,
				isForecastCost1: false,
				isForecastIncome1: false
			});
			/*种植面积走势*/
			this.plantAreaData();
		} else if(e.target.value === '采收量预测') {
			this.radioChecked = '采收量预测';
			this.setState({
				isPlantArea1: false,
				isHarvestVolume1: true,
				isForecastCost1: false,
				isForecastIncome1: false
			});
			//采收量与收入监测预警
			this.plantAreaData2();
		} else if(e.target.value === '预测成本') {
			this.radioChecked = '预测成本';
			this.setState({
				isPlantArea1: false,
				isHarvestVolume1: false,
				isForecastCost1: true,
				isForecastIncome1: false
			});
			//成本分析
			this.costAnalysisFunc();
		} else if(e.target.value === '预测收入') {
			this.radioChecked = '预测收入';
			this.setState({
				isPlantArea1: false,
				isHarvestVolume1: false,
				isForecastCost1: false,
				isForecastIncome1: true
			});
			//采收量与收入监测预警
			this.plantAreaData2();
		}
	}

	/*种植面积走势*/
	plantAreaData() {
		//种植面积
		api.plantAreaIndex1({
			smallVariety: this.paramsCbfx.smallVariety,
			region: '潍坊全市'
		}).then((res) => {
			if(window.debugging) console.log('种植面积走势', res);
			let cultivatedArea = []; //面积
			let output = []; //产量
			let dateTime = []; //时间
			if(res.content && res.content.length > 0) {
				res.content.map((item, i) => {
					cultivatedArea.push(item.cultivatedArea);
					output.push(item.output);
					dateTime.push(item.dateTime);
				});
				//面积data2  产量data1
				this.plantAreaid1._setData({
					Data1: output,
					Data2: cultivatedArea,
					timeData: dateTime
				});
				this.plantAreaid11._setData({
					Data1: output,
					Data2: cultivatedArea,
					timeData: dateTime
				});
			}
		})
	}

	/*采收量与收入监测预警*/
	plantAreaData2() {
		this.plantAreaid2._setData({});
		this.plantAreaid22._setData({});
		this.plantAreaid4._setData({});
		this.plantAreaid44._setData({});
		api.harvestingAndIncome({
			smallVariety: this.paramsCbfx.smallVariety,
			plantTimes: this.state.plantDate,
		}).then((res) => {
			if(window.debugging) console.log('采收量与收入监测预警', res);
			let cultivatedArea = []; //采收量
			let areaChangeRate = []; //收入
			let dateTime = []; //日期
			let priceList = []; //价格
			var a = res.content["priceList"],
				b = res.content["outList"];
			var c = [];
			if(a.length === b.length) {
				for(var i = 0; i < a.length; i++) {
					c[i] = a[i] * b[i];
				}
			}
			//console.log(c);
			c.map((item, i) => {
				priceList.push(Math.round(item * this.paramsCbfx.cultivatedArea));
			});

			res.content["outList"].map((item, i) => {
				cultivatedArea.push(Math.round(item * this.paramsCbfx.cultivatedArea));
				areaChangeRate.push(Math.round(item * this.paramsCbfx.cultivatedArea));
			});

			dateTime = res.content["periodList"];
			this.setState({
				time: dateTime[dateTime.length - 1]
			})

			this.plantAreaid2._setData({
				cultivatedArea: cultivatedArea,
				areaChangeRate: areaChangeRate,
				dateTime: dateTime
			});
			this.plantAreaid22._setData({
				cultivatedArea: cultivatedArea,
				areaChangeRate: areaChangeRate,
				dateTime: dateTime
			});
			this.plantAreaid4._setData({
				cultivatedArea: priceList,
				areaChangeRate: priceList,
				dateTime: dateTime
			});
			this.plantAreaid44._setData({
				cultivatedArea: priceList,
				areaChangeRate: priceList,
				dateTime: dateTime
			});

			//采收量预测和预测收入
			this.price = res.content["averagePrice"]; //平均价格
			this.getOutputUnit();
		});
	}

	/*采收量预测和预测收入*/
	getOutputUnit() {
		api.outputUnit({
			smallVariety: this.paramsCbfx.smallVariety
		}).then((res) => {
			if(window.debugging) console.log('采收量预测', res);
			let allOutput = Math.round(res.content["OutputPredict"] * this.paramsCbfx.cultivatedArea); //总产量
			this.setState({
				allOutput: allOutput
			});
			let allPrice = Math.round(this.price * allOutput); //总收入
			this.setState({
				allPrice: allPrice
			});
		});
	}

	/*成本分析(计算逻辑有问题,后端在改)*/
	costAnalysisFunc() {
		let pieData = {
			data: [{
					value: 335,
					name: '种子种苗'
				},
				{
					value: 310,
					name: '人工'
				},
				{
					value: 234,
					name: '化肥'
				},
				{
					value: 135,
					name: '农药'
				},
				{
					value: 1548,
					name: '其他'
				}
			],
			name: '成本分析'
		};
		//成本分析
		api.costAnalysis({
			...this.paramsCbfx,
			plantTime: this.state.plantDate,
			landStatus: this.state.landStatus,
		}).then((result) => {
			if(window.debugging) console.log('成本分析', result);
			pieData.data = [];
			let resultData = result.content;
			let costTotal = 0; //预测成本
			for(var key in resultData) {
				pieData.data.push({
					name: key,
					value: resultData[key]
				});
				costTotal += resultData[key];
			}
			this.costAnalysisRef.setData(pieData);
			this.costAnalysisRef2.setData(pieData);
			this.setState({
				forecastCost: costTotal
			});
		})
	}

	//成本分析-土地性质-单选按钮（自有/租赁）
	radioChange1(e) {
		console.log(e.target.value);
		this.setState({
			landStatus: e.target.value
		});
		//需要加延时器，更新状态需要时间
		setTimeout(() => {
			this.costAnalysisFunc();
		});
	}

	getPlantDate(dateString) {
		//console.log(dateString);
		this.setState({
			plantDate: dateString
		});
	}
	/*------种植计算器结束------*/

	/*三品一标统计*/
	selectThreeOneData() {
		this.salesTrendParams = {
			//dateTime:'2019',
			region: ''
		}
		api.selectThreeOne(this.salesTrendParams).then((res) => {
			let dataObj = {},
				dataArr = [];
			if(res.content != []) {
				res.content.map((item, i) => {
					dataObj = {
						name: item.productType,
						value: item.companyName,
						num: item.productName
					};
					dataArr.push(dataObj);
				});
				// 三品一标统计
				this.refs.selectThreeOneRef1.setData(dataArr);
			}

		});
	}

	//实时交易信息
	TradeMessage3() {
		this.salesTrendParams = {
			smallVariety: '全部品种',
			startTime: '2018-01-01',
			endTime: '2018-12-31'
		}
		api.TradeMessage3(this.salesTrendParams).then((res) => {
			if(window.debugging) console.log('实时交易信息', res);
			let list = res.content.list;
			let optarr = [];
			if(list != null) {
				list.map((item, i) => {
					let options = {
						name: item.buyerName,
						area: item.region,
						product: item.productName,
						weight: item.tradingWeight + 'kg',
						time: item.dateTime,
						price: item.transactionPrice + '元/公斤'
					}
					optarr.push(options)
				});

				let arr = optarr.splice(0, 4);
				let n = 0;
				if(n < 6) {
					setInterval(() => {
						n++;
						if(n >= 6) {
							n = 0;
						}
						arr.unshift(optarr[n]);
					}, 20000)

				}
				this.setState({
					dataSource1: [{
							area: "473",
							name: "923",
							price: "65",
							product: "8",
							time: "43",
							weight: "43443"
						},
						{
							area: "0.65%",
							name: "11.29%",
							price: "30%",
							product: "8%",
							time: "43%",
							weight: "20%"
						},
						{
							area: "0.15%",
							name: "10.29%",
							price: "23%",
							product: "34%",
							time: "3%",
							weight: "21%"
						},
					],
				})

			} else {
				this.setState({
					dataSource1: [],
				})
			}
		})
	}

	/*获取当天时间*/
	curDateTime() {
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var day = d.getDay();
		var curDateTime = year;
		if(month > 9)
			curDateTime = curDateTime + "-" + month;
		else
			curDateTime = curDateTime + "-0" + month;
		if(date > 9)
			curDateTime = curDateTime + "-" + date;
		else
			curDateTime = curDateTime + "-0" + date;

		return this.setState({
			plantDate: curDateTime
		});
		//return curDateTime;
	}

	//沃土指数点击线状图更新柱状图
	WtzsLineClick(e) {
		// console.log(e);
		let params = this.state.districtAndCountyFertileParams;
		params.dateTime = e;
		this.setState({
			districtAndCountyFertileParams: params
		});
		// console.log(this.state.districtAndCountyFertileParams);
		this.DistrictAndCountyFertileSoilFunc();
	}

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
		let varietyStructureParams = this.state.varietyStructureParams;
		const {
			dataSource1
		} = this.state;
		return(
			<div>
        <div style={this.rootStyle} ref="svgContainer" onClick={this.handleClick.bind(this)}>

        </div>
        <Dialog title={''} ref={'ppnpDialogRef'}>
            <div className="ppnpDialogC" style={{height:700,overflow:'auto',width:'90%',margin:'10px auto 0 auto'}} dangerouslySetInnerHTML={{__html: this.state.ppnpDedCon}}></div>
        </Dialog>
        <Dialog title={'菜博会'} ref={'foodExpo'}>
          <div style={{width:1462,marginLeft:60,marginTop:50}}>
          <h2 style={{color:'#fff',textAlign: 'center',fontSize:30}}>中国（寿光）国际蔬菜科技博览会</h2>
            <p style={{color:'#d4d4d4',textIndent: 36,marginTop:40}}>中国（寿光）国际蔬菜科技博览会（简称“菜博会”）创办于2000年，由中华人民共和国农业部、中华人民共和国商务部、中华人民共和国科学技术部等部委与山东省人民政府联合主办，每年4月20日至5月20日在山东寿光蔬菜高科技示范园定期举办。</p>
            <p style={{color:'#d4d4d4',textIndent: 36}}>菜博会是国内规模最大、最具影响力的国际性蔬菜产业品牌展会，被认定为国家AAAAA级专业展会。蔬菜高科技示范园获国家4A级景区。</p>
            <p style={{color:'#d4d4d4',textIndent: 36}}>菜博会在地面积一万亩，设1个主展区和14个分展区，包括农资展销区、农业科技展区、农产品展销区、农机装备展区、休闲食品展销区等专业展区。另设4个种植区，每个种植区设4个独立采摘区。</p>
            <p style={{color:'#d4d4d4',textIndent: 36}}>菜博会自创办以来，先后举行过众多国际、国内论坛，达成了丰硕的经贸合作成果，在推动寿光农业走向世界的同时，促进了国际农业技术交流、融合发展。</p>
          </div>
          {/*
            <div style={{width:1462,marginLeft:60,marginTop:80}}>
              <img src={foodExpo1} style={{width:280,height:200,float:'left',marginRight:10}}/>
              <img src={foodExpo2} style={{width:280,height:200,float:'left',marginRight:10}}/>
              <img src={foodExpo3} style={{width:280,height:200,float:'left',marginRight:10}}/>
              <img src={foodExpo4} style={{width:280,height:200,float:'left',marginRight:10}}/>
              <img src={foodExpo5} style={{width:280,height:200,float:'left'}}/>
            </div>
          */}
          <div className={'ant-carousel11'} style={{width:900,marginLeft:380}}>
            <Carousel effect="fade" autoplay >
                <div><img src={foodExpo1}/></div>
                <div><img src={foodExpo2} /></div>
                <div><img src={foodExpo3} /></div>
                <div><img src={foodExpo4}  /></div>
                <div><img src={foodExpo5}  /></div>
            </Carousel>
          </div>

        </Dialog>
        <Dialog title={'植株生长周期'} ref={'growthCycle'}>
            <GreenhouseDetails ref={this.greenhouseDetailsRef}  display={this.state.dpDetail} ></GreenhouseDetails>
        </Dialog>
        <Dialog title={'供应链金融'} ref={'supplyChainFinance'}>
            <img style={{marginTop: 100,marginLeft: 300}} src={supplyChainFinanceimg} />
        </Dialog>
        <Dialog title={'线上贸易'} ref={'onlinetrade'}>
            <img style={{marginTop: 100,marginLeft: 300}} src={onlinetradeimg} />
        </Dialog>
        <Dialog title={'农村劳动力'} ref={'ruralLaborForce'}>
          {
            /*<div style={{position:'absolute',left:26,top:'50px'}}>
              <Table columns={this.observationColumns1} dataSource={dataSource1} pagination={false} scroll={{ y: 600,x:1500 }} />
            </div>*/
          }
          <div style={{position:'absolute',left:350,top:50}}>
            <p style={{marginLeft:100}}>对寿光780个村的72619名劳动力进行汇总调查。得出目前劳动力高龄化的严峻性。</p>
            <PyPriceTrend height={600} width={900} legendWidth={200} legendLeft={200} legendTop={5} ref={this.yieldTrendRef} />
          </div>
        </Dialog>
        
        <Dialog title={'种植计算器'} ref={'plantCalculator'}>
          <div style={{padding: '40px 74px',position:'absolute',zIndex:'10'}}>
            <div className={'select-time'}>
              <span>长</span>
              <InputNumber defaultValue={this.state.chang} onChange={this.cbfxInput1.bind(this)} min={1} style={{ background:'#0F3D7C',marginLeft:'10px',marginRight:'10px', color:'#fff',width:'150px' }} placeholder={'长'}  />
              <span>宽</span>
              <InputNumber defaultValue={this.state.kuan} onChange={this.cbfxInput2.bind(this)} min={1} style={{ background:'#0F3D7C',marginLeft:'10px',marginRight:'10px', color:'#fff',width:'150px' }} placeholder={'宽'}  />
              <Cascader options={this.state.selectPin} defaultValue={['蔬菜', '黄瓜']} allowClear={false} expandTrigger="hover" displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.cbfxCascaderSelect.bind(this)} style={{ left:0, top:0, background:'#0F3D7C' }} fieldNames={{ label: 'name', value: 'code', children: 'items' }} />
              <span style={{marginLeft:'20px',width:'90px'}}>种植时间</span>
              <DatePickers type={'day'} placeholder={'请选择时间'} value={this.state.plantDate} onChange={this.getPlantDate.bind(this)} />
              <Button onClick={this.countClick.bind(this)} style={{ background:'#0F3D7C',color:'#fff',marginLeft:10,marginRight:'10px' }} >计算</Button>
              <RadioGroup value={this.radioChecked} style={{width:600}} onChange={this.radioChange.bind(this)}>
                <Radio style={{ color:'#fff' }} value={'种植走势'}>种植走势</Radio>
                <Radio style={{ color:'#fff' }} value={'采收量预测'}>采收量预测</Radio>
                <Radio style={{ color:'#fff' }} value={'预测成本'}>预测成本</Radio>
                <Radio style={{ color:'#fff' }} value={'预测收入'}>预测收入</Radio>
              </RadioGroup>
            </div>
            
            <div style={{display:this.state.isPlantArea?'block':'none', position:'absolute', left:0, top:90}}>
              <span style={{fontSize:'12px', display:'block', color:'#fff', position:'absolute', top:'15px', right:'20px'}}>吨</span>
              <PlantArea3 ref={(ref) => { this.plantAreaid1 = ref; }} width={550} height={300} marginTop={0} marginLeft={30} />
            </div>
            
            <div style={{display:this.state.isForecastCost?'block':'none', position:'absolute', left:0, top:420}}>
              <p style={{width:250, marginLeft: 30, float:'left'}}>预测成本：{this.state.forecastCost}元</p>
              <div style={{float:'left'}}>
	              <span style={{ marginLeft:'20px', fontSize:'16px' }}>土地性质：</span>
	              <RadioGroup value={this.state.landStatus} onChange={this.radioChange1.bind(this)}>
	                <Radio style={{ color:'#fff' }} value={'自有'}>自有</Radio>
	                <Radio style={{ color:'#fff' }} value={'租赁'}>租赁</Radio>
	              </RadioGroup>
              </div>
              <CbfxPie ref={ref => this.costAnalysisRef = ref} marginTop={0} marginLeft={30} width={620} height={280} />
            </div>
            
            <div style={{display:this.state.isHarvestVolume?'block':'none', position:'absolute', left:660, top:90}}>
              <p>采收量预测：{this.state.allOutput}市斤</p>
              <p style={{top: 295, left:-50, fontSize: 16, position: 'absolute'}}>采收周期</p>
              <PlantArea2 ref={(ref) => { this.plantAreaid2 = ref; }} width={900} height={300} marginTop={-5} marginLeft={0}/> 
            </div>
            
            <div style={{display:this.state.isForecastIncome?'block':'none', position:'absolute', left:660, top:420}}>
              <p style={{width:300}}>预测收入：{this.state.allPrice}元</p>  
              <PlantArea4 ref={(ref) => { this.plantAreaid4 = ref; }} width={900} height={300} marginTop={-20} marginLeft={0}/>          
            </div>
            
						{/*------*/}
						
            <div style={{display:this.state.isPlantArea1?'block':'none', position:'absolute', left:100, top:100}}>
              <PlantArea3 ref={(ref) => { this.plantAreaid11 = ref; }} width={1350} height={600} marginTop={0} marginLeft={0} />
              <span style={{fontSize:'14px', display:'block', color:'#fff', position:'absolute', fontSize:12, top:'7px', right:'20px'}}>吨</span>
            </div>
            
            <div style={{display:this.state.isForecastCost1?'block':'none', position:'absolute', left:100, top:100}}>
              <p style={{width:300, float:'left'}}>预测成本：{this.state.forecastCost}元</p>
              <div style={{float:'left'}}>
	              <span style={{ marginLeft:'20px', fontSize:'16px' }}>土地性质：</span>
	              <RadioGroup value={this.state.landStatus} onChange={this.radioChange1.bind(this)}>
	                <Radio style={{ color:'#fff' }} value={'自有'}>自有</Radio>
	                <Radio style={{ color:'#fff' }} value={'租赁'}>租赁</Radio>
	              </RadioGroup>
              </div>
              <CbfxPie ref={ref => this.costAnalysisRef2 = ref} width={1350} height={580} marginTop={0} marginLeft={0} />
            </div>
            
            <div style={{display:this.state.isHarvestVolume1?'block':'none', position:'absolute', left:100, top:100}}>
              <p>采收量预测：{this.state.allOutput}市斤</p>
              <p style={{top: 576, left:1323, fontSize: 16, position: 'absolute', whiteSpace: 'nowrap'}}>采收周期</p>
              <PlantArea2 ref={(ref) => { this.plantAreaid22 = ref; }} width={1350} height={580} marginTop={0} marginLeft={0}/> 
            </div>
            
            <div style={{display:this.state.isForecastIncome1?'block':'none', position:'absolute', left:100, top:100}}>
              <p style={{width:300}}>预测收入：{this.state.allPrice}元</p>
              <PlantArea4 ref={(ref) => { this.plantAreaid44 = ref; }} width={1350} height={580} marginTop={0} marginLeft={0}/>
            </div>
          </div>
        </Dialog>
        
        <Dialog title={'AI种植'} ref={'sjstRef'}>
            <iframe id="frame_content" 
              src="../../../static/video/video1.html"
              scrolling="no" 
              frameBorder="0" height={'400'} width={'800'} style={{margin:'30px auto 20px 370px' }}>
              ref={'childFrame'}
            </iframe>
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:20}}>使用摄像头、传感器、RFID、AI等先进技术进行蔬菜种植的模式，种植品种具备完善数字档案、全生命周期管理、智能农事分析、全链路溯源等功能。</p>
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:10}}>扫一扫大棚内蔬菜品种的二维码，就能看到大棚内生长蔬菜的历史浇水、施肥、施药情况，一部手机、一个管理软件，就可以实时记录、实时同步相关人员；</p>
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:10}}>通过对这些历史数据的智能分析，能建立起一整套知识库，指导施肥和耕作，提供最优决策；还可以进行智慧水肥、土壤调节，针对不同蔬菜品种选择最适宜的土壤肥力环境。</p>
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:10}}>让每个消费者买到放心蔬菜，买到足月足日成熟的放心蔬菜。</p>
        </Dialog>
        
        <Dialog title={'AI养殖'} ref={'sjstRef1'}>
            <img src={Ai} style={{width:738,height:352,marginLeft:404,marginTop:70}} />
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:20}}>AI养出来的虾子肥美大尾，肉质Q甜，来看看高雄一群教授如何打造三处AI养殖池，养出好虾。传统养殖虾塭，渔民必须看天吃饭，大雨容易改变虾塭水质酸碱，加上池深水浊无法目视水底饲料消耗度，最怕喂食过度让残饵污染水质，导致虾群大量死亡，「一只虾浮上水面，池底恐怕已有上百只死虾了。」中山大学海洋科学系教授洪庆章说。AI养出来的虾子肥美大尾，肉质Q甜，来看看高雄一群教授如何打造三处AI养殖池，养出好虾。</p>
            <p style={{width: 1413,margin: '0 auto',lineHeight: '37px',textIndent: 36,marginTop:10}}>传统养殖虾塭，渔民必须看天吃饭，大雨容易改变虾塭水质酸碱，加上池深水浊无法目视水底饲料消耗度，最怕喂食过度让残饵污染水质，导致虾群大量死亡，教授洪庆章说。AI养出来的虾子肥美大尾，肉质Q甜，来看看高雄一群教授如何打造三处AI养殖池，养出好虾。传统养殖虾塭，渔民必须看天吃饭，大雨容易改变虾塭水质酸碱，加上池深水浊无法目视水底饲料消耗度，最怕喂食过度让残饵污染水质，导致虾群大量死亡，中山大学海洋科学系教授洪庆章说。传统养殖虾塭，渔民必须看</p>
        </Dialog>
        
        <Dialog title={'环境监控'} ref={'envirMonit'}>
            
        </Dialog>
        
        <Dialog title={'食品安全'} ref={'foodSafety'}>
            
        </Dialog>
        
        <Dialog title={'病虫害'} ref={'diseaInsectPests'}>
          <div style={{padding: '60px 74px',position:'absolute',zIndex:'10'}}>
              <div className={'select-time'}>
                <DatePickers type={'month'} max={varietyStructureParams.endDate} value={varietyStructureParams.startDate} placeholder={'选择开始时间'} onChange={this.varietyStructureGetStartTime.bind(this,'startDate')} />
                <span className={'to'}>至</span>
                <DatePickers type={'month'} min={varietyStructureParams.startDate} value={varietyStructureParams.endDate} placeholder={'选择结束时间'} onChange={this.varietyStructureGetEndTime.bind(this,'endDate')} />
                <Select left={504} ref={(ref) => {
                  this.pzjgSiteSelectRef = ref;
                }} onSelectChange={this.varietyStructureSelectChange.bind(this)}
                />
                <Tab left={750} width={300} data={this.scgmpmTabData} onChange={this.bigProductionRankingTabChange.bind(this)}/>
              </div>
          </div>
          <div style={{display:this.state.isPie?'block':'none'}}>
         	 <Pie11 getPieClick={this.updateAreaTop10.bind(this)} ref={ref => this.bigPieRef = ref} style={{width:'770',height:'800',top:'20',left:'60'}} />
          </div>
          <p style={{position: 'absolute',left: 300,top: 300, display:this.state.isNoData?'block':'none'}}>暂无数据</p>
          <Panel title={me.state.diseaseTypeText+'上报数量排行榜'} width={440} type={false} height={490} top={150} left={950} onClick={this.ltpxsRateBig}>
            <LtpxsRate ref={(ref) => { this.plantingAreaTop10 = ref;}}  state={{}}
            />
            <div className={'bigScgmpmUnit'} style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'70px',top:'26px' }}>单位:条</div>
          </Panel>
        </Dialog>
        
        <Dialog title={'三品一标'} ref={'products'}>
          <div style={{position:'absolute',left:550,top:-340}}>   
            <UnifiedStandard ref={'selectThreeOneRef1'} style={{width:800,height:600}} />
          </div>
          <div style={{width:1462,marginLeft:50,marginTop:291}}>
            <p style={{color:'#d4d4d4',textIndent: 36}}>无公害农产品、绿色食品、有机农产品和农产品地理标志统称“三品一标”。“三品”为：无公害农产品、绿色食品、有机农产品；“一标为”：农产品地理标志。</p>
            <p style={{color:'#d4d4d4'}}><span style={{color:'#fff', display: 'inline-block'}}>无公害农产品：</span>是指产地环境和产品质量均符合国家普通加工食品相关卫生质量标准要求，经政府相关部门认证合格、并允许使用无公害标志的食品。这类食品不对人的身体健康造成任何危害，是对食品的最起码要求，我们的食品均应符合这种食品的要求，所以无公害食品是指无污染、无毒害、安全的食品。</p>
            <span style={{color:'#fff',textIndent: 36}}>潍坊市允许使用无公害标志的农产品有138个。</span>
            <p style={{color:'#d4d4d4'}}><span style={{color:'#fff', display: 'inline-block'}}>绿色食品：</span>是指无污染、优质、营养食品，经国家绿色食品发展中心认可，许可使用绿色食品商标的产品。由于与环境保护有关的事物和我国通常都冠以“绿色”，为了更加突出这类食品出自良好的生态环境，因此称为绿色食品。绿色食品是中档食品，我国已有多家企业生产绿色食品，是人类食品在不远的将来要达到的食品。绿色食品分为两级，即A级绿色食品（生产条件要求较低的食品）和AA级绿色食品，要求质量较高，与有机食品要求基本相同。</p>
            <span style={{color:'#fff',textIndent: 36}}>潍坊市允许使用绿色绿色食品商标的农产品有164个。</span>
            <p style={{color:'#d4d4d4'}}><span style={{color:'#fff', display: 'inline-block'}}>有机农产品：</span>是指根据有机农业原则，生产过程绝对禁止使用人工合成的农药、化肥、色素等化学物质和采用对环境无害的方式生产、销售过程受专业认证机构全程监控，通过独立认证机构认证并颁发证书，销售总量受控制的一类真正纯天然、高品味、高质量的食品。</p>
            <span style={{color:'#fff',textIndent: 36}}>潍坊市通过有机食品认证的农产品有323个。</span>
            <p style={{color:'#d4d4d4'}}><span style={{color:'#fff', display: 'inline-block'}}>农产品地理标志：</span>是指标示农产品来源于特定地域，产品品质和相关特征主要取决于自然生态环境和历史人文因素，并以地域名称冠名的特有农产品标志。 农业部负责全国农产品地理标志的登记工作，农业部农产品质量安全中心负责农产品地理标志登记的审查和专家评审工作。省级人民政府农业行政主管部门负责本行政区域内农产品地理标志登记申请的受理和初审工作。农业部设立的农产品地理标志登记专家评审委员会，负责专家评审。申请地理标志登记的农产品，应当符合下列条件：称谓由地理区域名称和农产品通用名称构成；产品有独特的品质特性或者特定的生产方式；产品品质和特色主要取决于独特的自然生态环境和人文历史因素；产品有限定的生产区域范围；产地环境、产品质量符合国家强制性技术规范要求。</p>
            <span style={{color:'#fff',textIndent: 36}}>潍坊市有39个农产品获得了农产品地理标志产品认证。</span>
          </div>
        </Dialog>
        
        <Dialog title={'沃土指数'} ref={'fatSoli'}>
          <p style={{width:1000,marginLeft:236,marginTop:36}}>沃土指数是指通过对土壤中有机质、水、有益微生物含量的检测分析，得出土地的肥沃指数。目的是实现农用土壤肥力的精培 ，水、肥调控的精准 ，从而提升耕地土壤基础地力，使农业投入和产出达到最佳效果，增强耕地持续高产稳产能力。</p>
          <LineSingle ref={this.wtrateRef} height={'300px'} width={'1557px'} top={'50px'}/>
          <ScjcSingleColumn titleStyle={{left:'5%',fontSize:'18'}} title={this.state.districtAndCountyFertileParams.dateTime+'年各区县沃土指数分析'} ref={this.bigWtrateFxRef} top={'350px'} height={'300px'} width={'1557px'}/>
        </Dialog>
      </div>
		)
	}

	componentWillUnmount() {
		this._chart.stopTimer()
	}
}

export default RectWordCloud
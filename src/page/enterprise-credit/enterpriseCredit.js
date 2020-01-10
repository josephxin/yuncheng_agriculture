import React from 'react';
import Panel from '../../component/panel/Panel';
import CreditMap from '../../component/creditMap/CreditMap';
import QuantitativeTrend from '../../component/quantitative-trend/quantitativeTrend';
import QuantitativeTrendTime from '../../component/quantitative-trend/quantitativeTrendTime';
import Pie from '../../component/echarts/Pie4';
//import FarmerCreditIndex2 from '../../component/d3/ThreeBar/FarmerCreditIndex2';
//import FarmerCreditIndex3 from '../../component/d3/ThreeBar/FarmerCreditIndex3';
import Radar from '../../component/echarts/Radar';
import RankDistribution2 from '../../component/rankDistribution/RankDistribution2';
import RankDistribution3 from '../../component/rankDistribution/RankDistribution2';
import SymmetricBar from '../../component/company-rang/symmetricBar';
import Star from '../../component/star/star';
import Star1 from '../../component/star/star1';
/*点状地球*/
import DotEarth from '../../component/dot-earth/DotEarth';
//地图
import CenterMap from '../../component/map-component/center-map/creditWeifangTurnMap';

import GisMap from '../../component/map-component/gisMap/gisMap';
import GisTable from './gisTable';

import LineMore1 from '../../component/echarts/LineMore1';
import LineMoreTime from '../../component/echarts/LineMoreTime';
import './enterpriseCredit.css';
//弹出框
import Dialog from '../../component/dialog/Dialog';
/*引入下拉选择框*/
import Select from '../../component/select/Select';
/*引入antd框架*/
import { Input, Cascader, Pagination } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import CreditStatistics2 from '../../component/credit-statistics-hiist/creditStatistics2';
import DatePickers from '../../component/DatePickers/DatePickers';
/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, formatParams } from '../../tool/tool.js';
/**
 * 接口访问
 * */
import * as apiAll from '../../api/api-all';
import * as creditSystemApi from '../../api/api-credit-system';

//引入假数据
import commonData from '../../data/commonData';
import demoData from './demoData.js';

/*引入图片*/
import title1 from './img/title1.png';
import title2 from './img/title2.png';
import ReactDOM from "react-dom";

const Search = Input.Search;
const paramsDay = setParamsDay();
const paramsDay12 = setParamsDay(12);
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear();
const currentYear = getCurrentYear();
const nowDay = getNowDay();
const region = '运城全市';
const bigVariety = '蔬菜';
const smallVariety = '黄瓜';

/**
 * 企业信用
 * */
class EnterpriseCredit extends React.Component {
	constructor() {
		super();
		var myDate = new Date();
		this.yearArr = this.get7Year(7); /**各信用级别企业数量趋势---时间集合(默认为7年)*/

		this.state = {
			isEchertsMap: false,
			activeIndex: 'agriculture',
			isFarmer: true,
			time: Number(this.yearArr[this.yearArr.length - 1]) + 1,
			analysisTime: Number(this.yearArr[this.yearArr.length - 1]) + 1,
			isEnterprise: false,
			entStartTime: paramsYear.startTime,
			entEndTime: paramsYear.endTime,
			farmingStartTime: paramsYear.startTime,
			farmingEndTime: paramsYear.endTime,
			trendStartTime: Number(this.yearArr[0]),
			trendEndTime: Number(this.yearArr[this.yearArr.length - 1]),
			//gistable参数
			gisMapParams: {
				pageNum: 1,
				pageSize: 15,
				total: 0,
				region: '',
				redWhiteBlack: '',
				companyName: ''
			},
			//企业红黑榜，公司详情
			companyName: '', //公司名称
			license: '', //营业执照
			legalPerson: '', //法人代表
			operator: '', //经营人
			telphone: '', //联系电话
			companyAddr: '', //企业地址
		};

		this._tokens = [];
		this.lng = 111.00699;
		this.lat = 35.02628;
		this.redWhiteBlack = '全部';
		this.regionList = commonData.regionSelect;
		this.bangDanList = ['选择信用等级', '红名单', '白名单', '黑名单'];

		this.timeType = ['1', '2', '3']; /**各种时间类型，['各信用级别企业数量趋势','企业信用等级分布','农户信用等级分布']*/
		this.regionType = ['1', '2', '3', '4', '5']; /**各种区域类型，['各信用级别企业数量趋势','企业信用等级分布','农户信用等级分布','农户信用等级分布(信用类型)','企业信用等级分布(信用类型)']*/

		this.trendRegion = region; /**各信用级别企业数量趋势-区域(默认全市)*/
		this.analysisRegion = region; //农村农业生活服务类企业信用分析
		this.analysisTime = Number(this.yearArr[this.yearArr.length - 1]) + 1; /**企业信用数量级别分析-结束时间*/

		this.farmingYearArr = this.get7Year(10); /**农户信用等级分布---时间集合(默认为10年)*/
		this.farmingRegion = region; /**农户信用等级分布-区域(默认全市)*/
		this.farmingBillType = ''; /**农户信用等级分布-红黑榜类型*/

		this.entYearArr = this.get7Year(10); /**企业信用等级分布---时间集合(默认为10年)*/
		this.entRegion = region; /**企业信用等级分布-区域(默认全市)*/
		this.entBillType = ''; /**企业信用等级分布-红黑榜类型*/

		this.creditLevelLabelList = ['红名单', '白名单', '黑名单'];
		this.abcdList = ["A级", "B级", "C级", "D级"];
		this.analysisTypeList = ['生产企业', '农投品店', '批发市场', '质检机构', '土测机构'];
		this.xin = ['一星', '二星', '三星', '四星', '五星'];

		/**各信用级别企业数量趋势(默认数据格式)*/
		this.abcdLevel = [{
				name: this.abcdList[0],
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: this.abcdList[1],
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: this.abcdList[2],
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: this.abcdList[3],
				data: [0, 0, 0, 0, 0, 0, 0]
			}
		];
	}

	componentDidMount() {
		const me = this;
		//console.log(this.yearArr);
		let ydataList = ['AA', "寿光", "诸城", "安丘", "昌乐", "高密", "潍坊", "青州", "仓储", "生产", "运输"];
		/** 信用体系---各信用级别企业数量趋势 */
		this.setEntNumTrend(this.yearArr[0], this.yearArr[this.yearArr.length - 1], this.trendRegion, "2");
		/** 信用体系---农村农业生活服务类企业信用分析 */
		this.setEntNumAnalysis(Number(this.yearArr[this.yearArr.length - 1]), this.analysisRegion, "2");
		/** 信用体系---企业红黑榜 */
		this.setRedBlackBill();
		/** 信用体系---企业红黑榜（弹窗） */
		this.setRedBlackBillQuery("");
		/** 农户信用等级分布 */
		/**信用体系---农户信用等级分布---多个时间的柱子*/
		this.setManyYearFarmerCreditLevel(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '2');
		/** 农户信用等级分布---柱子 */
		this.setyearFarmerCreditLevelZhuzi(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '2');
		/** 信用体系---农户信用等级分布---星级 */
		this.setyearFarmerCreditLevelXingJi(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '2');

		/** 信用体系---企业信用等级分布---多个时间的柱子 */
		this.setWfCscompanyCreditlevelZhuZi(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entBillType, '2');

		/** 信用体系---企业信用等级分布---圆饼 */
		this.setWfCscompanyCreditlevelYuanBing(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entgBillType, '2');

		/**信用体系---地图*/
		this.setYearWfCsIndexMap();

		/**信用体系---红黑榜*/
		this.setWfCsCompanyRedlist();

		let radarData = [4300, 10000, 28000, 35000, 50000];
		let indicator = [{
			name: '一星',
			max: 52000
		}, {
			name: '二星',
			max: 52000
		}, {
			name: '三星',
			max: 52000
		}, {
			name: '四星',
			max: 52000
		}, {
			name: '五星',
			max: 52000
		}];
		this._radarRef.setState({
			data: radarData,
			init: indicator
		});
		let obj = {
			"Ydata1": ydataList,
			"Ydata2": ydataList,
			"seriesVal1": [100, 200, 300, 400, 500, 600, 700, 800, 450, 200, 135].sort(function(a, b) {
				return a - b
			}),
			"seriesVal2": [500, 240, 350, 450, 230, 360, 650, 450, 236, 200, 135].sort(function(a, b) {
				return a - b
			})
		}
		//   me.refs.rossRef._setData(obj)
		// me.refs.rossRef1._setData(obj)
		me._radarRef1.setState({
			data: radarData,
			init: indicator
		});

		//设置下拉选择框数据
		me.nhxytjLevelSelectRef._setList(this.bangDanList);
		me.qyxytjLevelSelectRef._setList(this.bangDanList);

		me.getSelectRegion();
	}
	
	componentWillUnmount() {
		
	}
	
	/*获取下拉选择框地区列表*/
	getSelectRegion() {
		this._tokens.push(apiAll.selectRegion.send().then(res => {
			if(window.debugging) console.log('地区', res);
			let regionList = res.data.slice(); //浅拷贝
			regionList.unshift('运城全市');
			this.nhxytjSiteSelectRef._setList(regionList);
			this.nhxytjSiteSelectRef._setSelectedText(this.farmingRegion);

			this.qyxytjSiteSelectRef._setList(regionList);
			this.qyxytjSiteSelectRef._setSelectedText(this.entRegion);

			this.qyslSiteSelectRef._setList(regionList);
			this.qyslSiteSelectRef._setSelectedText(this.trendRegion);

			this.gisRegionSelectRef._setList(regionList);
		}));
	}

	/**获取最近num年的时间集合*/
	get7Year(num) {
		var yearArr2 = [];
		var myDate = new Date();
		var yearNum = Number(myDate.getFullYear());
		for(var i = num; i >= 1; i--) {
			yearArr2.push((yearNum - i) + "");
		}
		return yearArr2;
	}

	/**返回两个时间间的集合*/
	setYearSubYearNum(start1, end1) {
		start1 = start1 + '';
		let yearArr2 = [];
		let startYear = Number(start1);
		let endYear = Number(end1);
		let addNum = endYear - startYear;
		for(var i = 0; i <= addNum; i++) {
			yearArr2.push((startYear + i) + "");
		}
		return yearArr2;
	}

	/**初始化时间和结果*/
	setYearLevelArr(startTime, endTime) {
		this.yearArr = this.setYearSubYearNum(startTime, endTime);
		/**初始化结果集*/
		for(var j = 0; j < this.abcdLevel.length; j++) {
			let abcdLevel2 = [];
			for(var i = 0; i < this.yearArr.length; i++) {
				abcdLevel2.push(0);
			}
			this.abcdLevel[j].data = abcdLevel2;
		}
	}

	setyearFarmerCreditLevel2(time) {
		/** 农户信用等级分布---柱子 */
		this.setyearFarmerCreditLevelZhuzi("", time, this.farmingRegion, "", "1");
		/** 信用体系---农户信用等级分布---星级 */
		this.setyearFarmerCreditLevelXingJi("", time, this.farmingRegion, "", "1");
	}

	setyearFarmerCreditLevel3(time) {
		/** 信用体系---企业信用等级分布---圆饼 */
		this.setWfCscompanyCreditlevelYuanBing(this.state.entStartTime, time, this.entRegion, this.entBillType, '1');
	}

	/**信用体系---各信用级别企业数量趋势---type(1为弹窗)*/
	setEntNumTrend(startTimeVal, endTimeVal, regionVal, type) {
		let params = formatParams({
			startTime: startTimeVal,
			endTime: endTimeVal,
			region: regionVal
		});
		this._tokens.push(creditSystemApi.wfCsCompanyCom.send(params).then(res => {
			if(window.debugging) console.log('信用体系---各信用级别企业数量趋势', res);
			/**遍历拆分结果集,重组格式*/
			for(var i = 0; i < res.content.length; i++) {
				/**获取所属年份数据*/
				this.abcdLevel[0].data[this.yearArr.indexOf(res.content[i].dateTime)] = res.content[i].anum;
				this.abcdLevel[1].data[this.yearArr.indexOf(res.content[i].dateTime)] = res.content[i].bnum;
				this.abcdLevel[2].data[this.yearArr.indexOf(res.content[i].dateTime)] = res.content[i].cnum;
				this.abcdLevel[3].data[this.yearArr.indexOf(res.content[i].dateTime)] = res.content[i].dnum;
			}
			if(type != "1") {
				this.xyjbqyslTrendRef.setData({
					date: this.yearArr,
					data: this.abcdLevel
				});
			}
			this.xyjbqyslTrendRef1.setData({
				date: this.yearArr,
				data: this.abcdLevel
			});
		}));
	}

	/**信用体系---农村农业生活服务类企业信用分析---type(1为弹窗)*/
	setEntNumAnalysis(dateTimeVal, regionVal, type) { //type '1'为弹窗，'2'为主页
		let params = formatParams({
			dateTime: dateTimeVal,
			region: regionVal
		});
		this._tokens.push(creditSystemApi.WfCsCompanyServicelife.send(params).then(res => {
			if(window.debugging) console.log('信用体系---农村农业生活服务类企业信用分析', res);
			let content = res.content || [];
			let xData = [];
			let dataA = [];
			let dataB = [];
			let dataC = [];
			let dataD = [];
			content.map((item, i) => {
				xData.push(item.name);
				dataA.push(item.anum);
				dataB.push(item.bnum);
				dataC.push(item.cnum);
				dataD.push(item.dnum);
			});
			if(type != "1") {
				this.refs.quantitativeTrend.initData({
					xData: xData,
					dataA: dataA,
					dataB: dataB,
					dataC: dataC,
					dataD: dataD,
				});
			}
		}));
	}

	/** 信用体系---企业红黑榜 */
	setRedBlackBill() {
		let params = formatParams({
			type: '红'
		});
		this._tokens.push(creditSystemApi.wfCsCompanyRedblack.send(params).then(res => {
			if(window.debugging) console.log('信用体系---企业红黑榜-红', res);
			/**遍历拆分结果集,重组格式*/
			var yData1List = [];
			var dataList = [
				[],
				[]
			];
			if(res.content.length > 0) {
				// let lengthArr = [-100, -98, -96, -94, -92, -90, -88, -86];
				let lengthArr = [-100, -100, -100, -100, -100, -100, -100, -100];
				for(var i = 0; i < res.content.length; i++) {
					if(i < 8) {
						yData1List.push(res.content[i].levelCode);
						dataList[0].push({
							name: res.content[i].name,
							value: lengthArr[i]
						});
					}
				}
			}
			let params2 = formatParams({
				type: '黑'
			});
			this._tokens.push(creditSystemApi.wfCsCompanyRedblack.send(params2).then(res2 => {
				if(window.debugging) console.log('信用体系---企业红黑榜-黑', res2);
				/**遍历拆分结果集,重组格式*/
				var yData2List = [];
				if(res2.content.length > 0) {
					// let lengthArr2 = [100, 98, 96, 94, 92, 90, 88, 86];
					let lengthArr2 = [100, 100, 100, 100, 100, 100, 100, 100];
					for(var i = 0; i < res2.content.length; i++) {
						if(i < 8) {
							yData2List.push(res2.content[i].levelCode);
							dataList[1].push({
								name: res2.content[i].name,
								value: lengthArr2[i]
							});
						}
					}
				}
				this.symmetricBar._setData2(dataList, yData1List, yData2List);
			}));
		}));
	}

	/** 信用体系---企业红黑榜（弹窗） */
	setRedBlackBillQuery(entNameVal) {
		let params = formatParams({
			type: '红',
			entName: entNameVal
		});
		this._tokens.push(creditSystemApi.wfCsCompanyRedblackQuerySort.send(params).then(res => {
			if(window.debugging) console.log('信用体系---企业红黑榜-红（弹窗）', res);
			/**遍历拆分结果集,重组格式*/
			var yData1List = [];
			var dataList = [
				[],
				[]
			];
			if(res.content.length > 0) {
				let lengthArr = [-100, -100, -100, -100, -100, -100, -100, -100, -100, -100];
				for(let i = 0; i < res.content.length; i++) {
					if(i < 10) {
						yData1List.push(res.content[i].levelCode);
						dataList[0].push({
							name: res.content[i].name,
							value: lengthArr[i]
						});
					}
				}
			}
			let params2 = formatParams({
				type: '黑',
				entName: entNameVal
			});
			this._tokens.push(creditSystemApi.wfCsCompanyRedblackQuerySort.send(params2).then(res2 => {
				if(window.debugging) console.log('信用体系---企业红黑榜-黑（弹窗）', res);
				/**遍历拆分结果集,重组格式*/
				var yData2List = [];
				if(res2.content.length > 0) {
					let lengthArr2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
					for(var i = 0; i < res2.content.length; i++) {
						if(i < 10) {
							yData2List.push(res2.content[i].levelCode);
							dataList[1].push({
								name: res2.content[i].name,
								value: lengthArr2[i]
							});
						}
					}
				}
				this.symmetricBar1._setData2(dataList, yData1List, yData2List);
			}));
		}));
	}

	/** 信用体系---农户信用等级分布---多个时间的柱子 */
	setManyYearFarmerCreditLevel(farmingStartTimeVal, farmingEndTimeVal, farmingRegionVal, farmingBillTypeVal, type) {
		let params = formatParams({
			startTime: this.state.farmingStartTime,
			endTime: this.state.farmingEndTime,
			region: farmingRegionVal
		});
		this._tokens.push(creditSystemApi.wfCsFarmerCreditlevel.send(params).then(res => {
			if(window.debugging) console.log('信用体系---农户信用等级分布---多个时间的柱子', res);
			let content = res.content || [];
			/**遍历拆分结果集,重组格式*/
			var threeDataList = [
				[],
				[],
				[]
			];
			threeDataList[0] = this.creditLevelLabelList;
			threeDataList[1] = this.setYearSubYearNum(this.state.farmingStartTime, this.state.farmingEndTime);
			let threeSeriesDataList = [{
					type: 'bar',
					itemStyle: {
						normal: {
							color: 'rgba(36,169,224,0.2)'
						}
					},
					barGap: '-90%',
					barWidth: 30,
					animation: false
				},
				{
					name: this.creditLevelLabelList[0],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#0aa4d4',
				},
				{
					name: this.creditLevelLabelList[1],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#5ff4db',
				},
				{
					name: this.creditLevelLabelList[2],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#fffd04',
				}
			];
			//console.log(content);
			if(content.length > 0) {
				if(farmingBillTypeVal != '' && farmingBillTypeVal != this.bangDanList[0]) {
					if(farmingBillTypeVal == this.bangDanList[1]) { //红
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[1].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].redNum;
						}
					}
					if(farmingBillTypeVal == this.bangDanList[2]) { //白
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[2].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].whiteNum;
						}
					}
					if(farmingBillTypeVal == this.bangDanList[3]) { //黑
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[3].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].blackNum;
						}
					}
				} else {
					for(var i = 0; i < content.length; i++) {
						threeSeriesDataList[1].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].redNum;
						threeSeriesDataList[2].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].whiteNum;
						threeSeriesDataList[3].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].blackNum;
					}
				}
			}
			threeDataList[2] = threeSeriesDataList;
			//debugger
			//console.log(threeSeriesDataList)
			this.refs.creditStatistics2.initData(threeDataList);
		}));
	}

	/** 农户信用等级分布---柱子 */
	setyearFarmerCreditLevelZhuzi(farmingStartTimeVal, farmingEndTimeVal, farmingRegionVal, farmingBillTypeVal, type) { /**(farmingBillTypeVal红黑榜类型)后台返回全部类型，前端处理*/
		let params = formatParams({
			startTime: this.state.farmingStartTime,
			dateTime: this.state.farmingEndTime,
			region: farmingRegionVal
		});
		this._tokens.push(creditSystemApi.yearWfCsFarmerCreditlevel.send(params).then(res => {
			if(window.debugging) console.log('信用体系---农户信用等级分布', res);
			/**遍历拆分结果集,重组格式*/
			let content = res.content;
			var creditLevelDataList = [];
			if(content && content.constructor === Object) {
				creditLevelDataList.push({
					name: this.creditLevelLabelList[0],
					value: content.redNum
				});
				creditLevelDataList.push({
					name: this.creditLevelLabelList[1],
					value: content.whiteNum
				});
				creditLevelDataList.push({
					name: this.creditLevelLabelList[2],
					value: content.blackNum
				});
			}
			//console.log(creditLevelDataList);
			if(type != '1') {
				this.farmerCreditIndex2.setData({
					data: creditLevelDataList,
					unit: '人'
				});
			}
			this.farmerCreditIndex3.setData({
				data: creditLevelDataList,
				unit: '人'
			});
			/*let FC3 = document.getElementById('FC3');
			ReactDOM.unmountComponentAtNode(FC3);
			ReactDOM.render(<FarmerCreditIndex3
			  ref={ref => this.farmerCreditIndex3 = ref} width={253} height={213} top={53}/>, FC3);*/
		}));
	}

	/** 信用体系---农户信用等级分布---星级 */
	setyearFarmerCreditLevelXingJi(farmingStartTimeVal, farmingEndTimeVal, farmingRegionVal, farmingBillTypeVal, type) { /**(farmingBillTypeVal红黑榜类型)后台返回全部类型，前端处理*/
		let params = formatParams({
			startTime: this.state.farmingStartTime,
			dateTime: this.state.farmingEndTime,
			region: farmingRegionVal
		});
		this._tokens.push(creditSystemApi.yearFarmerStarlevel.send(params).then(res => {
			if(window.debugging) console.log('信用体系---农户信用等级分布---星级', res);
			let maxNum = 0;
			var radarData = [];
			var indicator = [];
			for(var i = 0; i < this.xin.length; i++) {
				radarData.push(0);
				var map = {};
				map['name'] = this.xin[i];
				map['max'] = 0;
				indicator.push(map);
			}
			/**遍历拆分结果集,重组格式*/
			if(res.content != null) {
				radarData = [];
				indicator = [];
				for(var j = 0; j < this.xin.length; j++) {
					let num = Number(res.content["star" + (j + 1) + "Num"]);
					if(num > maxNum) maxNum = num;
					radarData.push(num);
					var map = {};
					map['name'] = this.xin[j];
					map['max'] = 0;
					indicator.push(map);
				}
				for(var j = 0; j < this.xin.length; j++) {
					indicator[j]['max'] = maxNum;
				}
			}
			if(type != '1') {
				this._radarRef.setState({
					data: radarData,
					init: indicator
				});
			}
			this._radarRef1.setState({
				data: radarData,
				init: indicator
			});
		}));
	}

	/* 信用体系---企业信用等级分布---多个时间的柱子 */
	setWfCscompanyCreditlevelZhuZi(entStartTimeVal, entEndTimeVal, entRegionVal, entBillTypeVal, type) {
		let params = formatParams({
			startTime: entStartTimeVal,
			endTime: entEndTimeVal,
			region: entRegionVal
		});
		this._tokens.push(creditSystemApi.wfCscompanyCreditlevel.send(params).then(res => {
			if(window.debugging) console.log('信用体系---企业信用等级分布---多个时间的柱子', res);
			let content = res.content;
			/**遍历拆分结果集,重组格式*/
			var threeDataList = [
				[],
				[],
				[]
			];
			threeDataList[0] = this.creditLevelLabelList;
			threeDataList[1] = this.setYearSubYearNum(entStartTimeVal, entEndTimeVal);
			let threeSeriesDataList = [{
					type: 'bar',
					itemStyle: {
						normal: {
							color: 'rgba(36,169,224,0.2)'
						}
					},
					barGap: '-90%',
					barWidth: 30,
					animation: false
				},
				{
					name: this.creditLevelLabelList[0],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#0aa4d4',
				},
				{
					name: this.creditLevelLabelList[1],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#5ff4db',
				},
				{
					name: this.creditLevelLabelList[2],
					type: 'bar',
					stack: '广告',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					barWidth: 30,
					color: '#fffd04',
				}
			];
			if(content.length > 0) {
				if(entBillTypeVal != '' && entBillTypeVal != this.bangDanList[0]) {
					if(entBillTypeVal == this.bangDanList[1]) { //红
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[1].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].redNum;
						}
					}
					if(entBillTypeVal == this.bangDanList[2]) { //白
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[2].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].whiteNum;
						}
					}
					if(entBillTypeVal == this.bangDanList[3]) { //黑
						for(var i = 0; i < content.length; i++) {
							threeSeriesDataList[3].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].blackNum;
						}
					}
				} else {
					for(var i = 0; i < content.length; i++) {
						threeSeriesDataList[1].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].redNum;
						threeSeriesDataList[2].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].whiteNum;
						threeSeriesDataList[3].data[threeDataList[1].indexOf(content[i].dateTime)] = content[i].blackNum;
					}
				}
			}
			threeDataList[2] = threeSeriesDataList;
			//console.log(threeSeriesDataList)
			this.refs.creditStatistics3.initData(threeDataList);
		}));
	}

	/* 信用体系---企业信用等级分布---圆饼 */
	setWfCscompanyCreditlevelYuanBing(entStartTimeVal, entEndTimeVal, entRegionVal, entBillTypeVal, type) {
		document.getElementById("onclickYear").innerHTML = entEndTimeVal;
		let entCreditYuanBingDataList = [{
				name: this.creditLevelLabelList[0],
				value: 0,
				color: '#fd296e',
				children: []
			},
			{
				name: this.creditLevelLabelList[1],
				value: 0,
				color: '#fff',
				children: []
			},
			{
				name: this.creditLevelLabelList[2],
				value: 0,
				color: '#000',
				children: [{
						name: this.analysisTypeList[0],
						value: 0,
						color: '#00cfff'
					},
					{
						name: this.analysisTypeList[1],
						value: 0,
						color: '#028eff'
					},
					{
						name: this.analysisTypeList[2],
						value: 0,
						color: '#2bfdb6'
					},
					{
						name: this.analysisTypeList[3],
						value: 0,
						color: '#27dd5f'
					},
					{
						name: this.analysisTypeList[4],
						value: 0,
						color: '#9fdf60'
					}
				]
			}
		];
		/**获取圆饼外层*/
		let params = formatParams({
			startTime: entStartTimeVal,
			dateTime: entEndTimeVal,
			region: entRegionVal
		});
		this._tokens.push(creditSystemApi.yearWfCsCompanyType.send(params).then(res => {
			if(window.debugging) console.log('信用体系---企业信用等级分布---圆饼-外层', res);
			/**默认格式*/
			/**遍历拆分结果集,重组格式*/
			if(res.content != null) {
				entCreditYuanBingDataList[2].children[0].value = Number(res.content.productNum); //生产企业
				entCreditYuanBingDataList[2].children[1].value = Number(res.content.shopNum); //农投品店
				entCreditYuanBingDataList[2].children[2].value = Number(res.content.marketNum); //批发市场
				entCreditYuanBingDataList[2].children[3].value = Number(res.content.qualityNum); //质检机构
				entCreditYuanBingDataList[2].children[4].value = Number(res.content.soilNum); //土测机构
			}

			/**获取圆饼内层（红黑榜）*/
			this._tokens.push(creditSystemApi.yearWfCsCompanyCreditlevel.send(params).then(res => {
				if(window.debugging) console.log('信用体系---企业信用等级分布---圆饼-内层', res);
				/**默认格式*/
				/**遍历拆分结果集,重组格式*/
				if(res.content != null) {
					entCreditYuanBingDataList[0].value = Number(res.content.redNum); //红
					entCreditYuanBingDataList[1].value = Number(res.content.whiteNum); //白
					entCreditYuanBingDataList[2].value = Number(res.content.blackNum); //黑
				}
				if(type != "1") {
					this.refs.rankDistribution2.initData(entCreditYuanBingDataList);
				}
				this.refs.rankDistribution3.initData(entCreditYuanBingDataList);
			}));
		}));
	}

	/**信用体系---地图数据*/
	setYearWfCsIndexMap() {
		let params = formatParams({
			dateTime: currentYear
		});
		this._tokens.push(creditSystemApi.yearWfCsIndexMap.send(params).then(res => {
			if(window.debugging) console.log('信用体系---地图数据', res);
			let regionList = (res.content && res.content.regionList) || [];
			let threeDataList = [
				[],
				[],
				[]
			];
			let regionHBHList = [];
			for(let i = 0; i < regionList.length; i++) {
				regionHBHList.push({
					name: regionList[i].region,
					value: Number(regionList[i].redNum),
					white: Number(regionList[i].whiteNum),
					black: Number(regionList[i].blackNum),
				});
			}
			threeDataList[0] = regionHBHList;
			threeDataList[1].push(Number(res.content.totalRedNum));
			threeDataList[2].push(Number(res.content.totalWhiteNum));
			this._centerMapRef._setData(threeDataList);
		}));
	}

	/** 信用体系---红名单---农户 */
	setWfCsCompanyRedlist() {
		let params = formatParams({
			type: '农户'
		});
		this._tokens.push(creditSystemApi.wfCsCompanyRedlist.send(params).then(res => {
			if(window.debugging) console.log('信用体系---红名单---农户', res);
			/**默认格式*/
			/**遍历拆分结果集,重组格式*/
			let dataList = [];
			if(res.content != null) {
				for(let i = 0; i < res.content.length; i++) {
					let map = {};
					map['name'] = res.content[i].name;
					map['add'] = res.content[i].region;
					map['street'] = res.content[i].street;
					map['star'] = Number(res.content[i].star) * 20;
					dataList.push(map);
				}
			}
			this.refs.star.setData({
				data: dataList
			});
		}));
		let params2 = formatParams({
			type: '企业'
		});
		this._tokens.push(creditSystemApi.wfCsCompanyRedlist.send(params2).then(res => {
			if(window.debugging) console.log('信用体系---红名单---企业', res);
			/**默认格式*/
			/**遍历拆分结果集,重组格式*/
			let dataList = [];
			if(res.content != null) {
				for(let i = 0; i < res.content.length && i < 500; i++) {
					let map = {};
					map['name'] = res.content[i].name;
					//map['add'] = res.content[i].region;
					//map['street'] = res.content[i].street;
					map['star'] = Number(res.content[i].star) * 20;
					dataList.push(map);
				}
			}
			this.refs.star2.setData({
				data: dataList
			});
		}));
	}

	/**企业红黑榜弹窗查询按钮*/
	queryBtn(d) {
		this.setRedBlackBillQuery(document.getElementById("entName").value);
	}

	changeBtn(d) {
		if(d === 'agriculture') {
			document.getElementById('agricultureBtn').className = 'changeBtn agriculture changeBtnActive';
			document.getElementById('enterpriseBtn').className = 'changeBtn enterprise';
			document.getElementById('agriculture').style.display = 'block';
			document.getElementById('enterprise').style.display = 'none';
		} else if(d === 'enterprise') {
			document.getElementById('agricultureBtn').className = 'changeBtn agriculture';
			document.getElementById('enterpriseBtn').className = 'changeBtn enterprise changeBtnActive';
			document.getElementById('agriculture').style.display = 'none';
			document.getElementById('enterprise').style.display = 'block';
		}
	}

	/*农户信用统计*/
	ltpxsRateBig1(t) {
		const me = this;
		me.refs.dialogRef1._open(t);
	}

	/*企业信用统计*/
	ltpxsRateBig2(t) {
		const me = this;
		me.refs.dialogRef2._open(t);
	}

	/*各信用级别企业数量趋势*/
	ltpxsRateBig3(t) {
		const me = this;
		me.refs.dialogRef3._open(t);
	}

	/*企业红黑榜*/
	ltpxsRateBig5(t) {
		const me = this;
		me.refs.dialogRef5._open(t);
	}

	getStartTime(type, moment, t) {
		this.startTime = t;
		if(type == this.timeType[0]) {
			this.setState({
				trendStartTime: moment
			})
		}
		if(type == this.timeType[1]) {
			this.setState({
				entStartTime: moment
			})
		}
		if(type == this.timeType[2]) {
			this.setState({
				farmingStartTime: moment
			})
		}
	}

	getEndTime(type, moment, t) {
		this.endTime = moment;
		if(type == this.timeType[0]) { /**各信用级别企业数量趋势*/
			this.state.trendEndTime = moment;
			this.setState({
				trendEndTime: moment
			})
			this.setYearLevelArr(this.state.trendStartTime, this.state.trendEndTime); /**初始化时间和结果*/
			this.setEntNumTrend(this.state.trendStartTime, this.state.trendEndTime, this.trendRegion, "1");
		}
		if(type == this.timeType[1]) { /**企业信用等级分布*/
			this.state.entEndTime = moment;
			this.setState({
				entEndTime: moment
			})
			/**信用体系---企业信用等级分布---多个时间的柱子*/
			this.setWfCscompanyCreditlevelZhuZi(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entBillType, '2');
		}
		if(type == this.timeType[2]) { /**农户信用等级分布*/
			this.state.farmingEndTime = moment;
			this.setState({
				farmingEndTime: moment
			})
			//console.log(moment)
			//console.log(this.state.farmingEndTime)
			/**信用体系---农户信用等级分布---多个时间的柱子*/
			this.setManyYearFarmerCreditLevel(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '2');
		}
	}

	siteSelectChange(type, e) {
		if(type == this.regionType[0]) { /**各信用级别企业数量趋势*/
			this.trendRegion = e.data;
			this.setYearLevelArr(this.state.trendStartTime, this.state.trendEndTime); /**初始化时间和结果*/
			this.setEntNumTrend(this.state.trendStartTime, this.state.trendEndTime, this.trendRegion, "1");
		}
		if(type == this.regionType[1]) {
			this.entRegion = e.data;
			/**信用体系---企业信用等级分布---多个时间的柱子*/
			this.setWfCscompanyCreditlevelZhuZi(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entBillType, '2');

			/** 信用体系---企业信用等级分布---圆饼 */
			this.setWfCscompanyCreditlevelYuanBing(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entBillType, '1');
		}
		if(type == this.regionType[2]) {
			this.farmingRegion = e.data;
			/** 农户信用等级分布 */
			/**信用体系---农户信用等级分布---多个时间的柱子*/
			this.setManyYearFarmerCreditLevel(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '1');
			/** 农户信用等级分布---柱子 */
			this.setyearFarmerCreditLevelZhuzi(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '1');
			/** 信用体系---农户信用等级分布---星级 */
			this.setyearFarmerCreditLevelXingJi(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '1');
		}
		if(type == this.regionType[3]) {
			/** 农户信用等级分布 */
			this.farmingBillType = e.data;
			/** 农户信用等级分布 */
			/**信用体系---农户信用等级分布---多个时间的柱子*/
			this.setManyYearFarmerCreditLevel(this.state.farmingStartTime, this.state.farmingEndTime, this.farmingRegion, this.farmingBillType, '1');
		}
		if(type == this.regionType[4]) {
			this.entBillType = e.data;
			/**信用体系---企业信用等级分布---多个时间的柱子*/
			this.setWfCscompanyCreditlevelZhuZi(this.state.entStartTime, this.state.entEndTime, this.entRegion, this.entBillType, '2');
		}
	}

	//企业红黑榜点击回调
	qyhhbClick(name) {
		//console.log(name);
		this.refs.qyhhbDialogRef._open(name);
		//调接口
		this._tokens.push(creditSystemApi.companyRedBlackDetail.send({
			companyName: name
		}).then(res => {
			if(window.debugging) console.log('企业红黑榜点击回调-显示企业详情', res);
			let data = res.data;
			this.setState({
				companyName: name, //公司名称
				license: data.businessLicense, //营业执照
				legalPerson: data.legalRepresentative, //法人代表
				operator: data.operator, //经营人
				telphone: data.contactsPhone, //联系电话
				companyAddr: data.address, //企业地址
			});
		}));
	}

	render() {
		const me = this;
		let gisMapParams = me.state.gisMapParams;
		return(
			<div>
				<div style={{display:this.state.isEchertsMap == false?'block':'none'}}>
	        <img style={{position: 'absolute', top: 73, left: 150}} src={title1} alt={'平台信用分析'}/>
	        <img style={{position: 'absolute', top: 73, left: 1524}} src={title2} alt={'社会信用分析'}/>

	       	<Panel type={1} onClick={this.ltpxsRateBig1.bind(this,'农户信用统计')} title={'农户信用等级分布'} left={30} top={132} width={505} height={280}>
	          <Pie ref={ref => this.farmerCreditIndex2 = ref} width={300} height={300} top={0} left={-30} />
	          <Radar width={250} height={233} top={40} left={250} ref={ref => this._radarRef = ref}/>
	        </Panel>
	        <Dialog title={'农户信用统计'} ref={'dialogRef1'}>
		        <div style={{padding: '25px 74px 60px 74px'}}>
		          <div className={'select-time'}>
								<DatePickers max={this.state.farmingEndTime} type={'year'} value={this.state.farmingStartTime} placeholder={'选择开始时间'} onChange={this.getStartTime.bind(this,this.timeType[2])} />
		            <span className={'to'}>至</span>
								<DatePickers min={this.state.farmingStartTime} type={'year'} value={this.state.farmingEndTime} placeholder={'选择开始时间'} onChange={this.getEndTime.bind(this,this.timeType[2])} />
		            <Select left={688} list={me.regionList} ref={(ref) => {this.nhxytjSiteSelectRef = ref; }} onSelectChange={this.siteSelectChange.bind(this,this.regionType[2])} />
		            <Select left={860} ref={(ref) => {this.nhxytjLevelSelectRef = ref;}} onSelectChange={this.siteSelectChange.bind(this,this.regionType[3])} />
		          </div>
		        </div>
	          <div style={{position: 'absolute',top: 90, left: 50}}>
	            <CreditStatistics2 ref={'creditStatistics2'} width={1450} height={300} unit={'人'} fn={this.setyearFarmerCreditLevel2.bind(this)} />
	          </div>
	          <div style={{position: 'absolute',top: 400, left: 520}}>
              <div id='FC3'>
              	<Pie ref={ref => this.farmerCreditIndex3 = ref} width={300} height={300} top={0} />
              </div>
	            <Radar width={250} height={233} top={40} left={320} ref={ref => this._radarRef1 = ref}/>
	          </div>
	        </Dialog>

	        <Panel type={1} onClick={this.ltpxsRateBig2.bind(this,'企业信用统计')} width={500} height={286} title={'企业信用等级分布'} left={30} top={412}>
	          <RankDistribution2 ref={'rankDistribution2'} width={500} height={286} />
	        </Panel>
	        <Dialog title={'企业信用统计'} ref={'dialogRef2'}>
		        <div style={{padding: '25px 74px 60px 74px'}}>
		            <div className={'select-time'}>
									<DatePickers max={this.state.entEndTime} type={'year'} value={this.state.entStartTime} placeholder={'选择开始时间'} onChange={this.getStartTime.bind(this,this.timeType[1])} />
		              <span className={'to'}>至</span>
									<DatePickers min={this.state.entStartTime} type={'year'} value={this.state.entEndTime} placeholder={'选择开始时间'} onChange={this.getEndTime.bind(this,this.timeType[1])} />
		              <Select left={688} list={me.regionList} ref={(ref) => {this.qyxytjSiteSelectRef = ref; }} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])} />
		              <Select left={860} ref={(ref) => {this.qyxytjLevelSelectRef = ref;}} onSelectChange={this.siteSelectChange.bind(this,this.regionType[4])} />
		            </div>
		        </div>
	          <div style={{position: 'absolute',top: 90, left: 50}}>
	            <CreditStatistics2 ref={'creditStatistics3'} width={1450} height={300} unit={'家'} fn={this.setyearFarmerCreditLevel3.bind(this)} />
	          </div>
	          <p style={{fontSize: '20px', color: 'rgb(255, 255, 255)', paddingLeft: '10px', position: 'absolute', top: '437px', left: '40px'}}><span id="onclickYear">2017</span>年企业信用等级分布</p>
	          <div style={{position: 'absolute',top: 400, left: 550}}>
	            <RankDistribution3 ref={'rankDistribution3'} width={500} height={286} />
	          </div>
	        </Dialog>

					<Panel width={500} height={286} title={'红名单'} left={30} top={712}>
	          <div id="agricultureBtn" onClick={this.changeBtn.bind(this, 'agriculture')} className={'changeBtn agriculture changeBtnActive'}>农户</div>
	          <div id="enterpriseBtn" onClick={this.changeBtn.bind(this, 'enterprise')} className={'changeBtn enterprise'}>企业</div>
            <div id="agriculture" style={{ display:'block'}}>
              <Star ref={'star'} width={480} height={160} top={80}/>
            </div>
            <div id="enterprise" style={{ display:'none'}}>
              <Star1 ref={'star2'} width={480} height={160} top={80}/>
            </div>
	        </Panel>

					<Panel onClick={this.ltpxsRateBig3.bind(this,'各信用级别企业数量趋势')} title={'各信用级别企业数量趋势'} width={500} height={270} top={132} left={1390} type={1}>
	          <LineMore1 ref={ref=>this.xyjbqyslTrendRef=ref} width={500} height={230} top={10} />
	        </Panel>
	        <Dialog title={'各信用级别企业数量趋势'} ref={'dialogRef3'}>
		        <div style={{padding: '25px 74px 60px 74px'}}>
		          <div className={'select-time'}>
								<DatePickers max={this.state.trendEndTime} type={'year'} value={this.state.trendStartTime} placeholder={'选择开始时间'} onChange={this.getStartTime.bind(this,this.timeType[0])} />
		            <span className={'to'}>至</span>
								<DatePickers min={this.state.trendStartTime} type={'year'} value={this.state.trendEndTime} placeholder={'选择开始时间'} onChange={this.getEndTime.bind(this,this.timeType[0])} />
		            <Select left={688} list={me.regionList} ref={(ref) => { this.qyslSiteSelectRef = ref;}} onSelectChange={this.siteSelectChange.bind(this,this.regionType[0])}
		            />
		          </div>
	        	</div>
	          <div style={{position: 'absolute',top: 90, left: 60}}>
	            <LineMoreTime ref={ref=>this.xyjbqyslTrendRef1=ref} width={1500} height={530}/>
	          </div>
	        </Dialog>

					<Panel title={'农村农业生活服务类企业信用分析'} width={500} height={301} top={412} left={1390}>
	          <QuantitativeTrend width={473} height={278} ref={'quantitativeTrend'} />
	        </Panel>

	        <Panel onClick={this.ltpxsRateBig5.bind(this, '企业红黑榜')} width={500} height={286} title={'企业红黑榜'} left={1390} top={720} type={1}>
	          <SymmetricBar width={500} height={256} top={30} ref = {ref=>this.symmetricBar=ref} flag={false} click={this.qyhhbClick.bind(this)} />
	        </Panel>
	        <Dialog title={'企业红黑榜'} ref={'dialogRef5'}>
	          <div className="hong-hei-bang-top" style={{padding: '25px 74px 60px 74px'}}>
	            <input id="entName" placeholder="请输入企业名称进行查询" style={{height: '50px',
	            backgroundColor: 'transparent',
	            color: '#01d6c2',
	            fontSize: '16px',
	            borderRadius: 0,
	            borderColor: '#01d6c2',
	            borderStyle:'solid',
	            borderWidth:1,
	            paddingLeft: '8px',width:'80%'}}/>
	            <button size="small" onClick={this.queryBtn.bind(this)} style={{height: '50px',
	            backgroundColor: 'transparent',
	            color: '#01d6c2',
	            fontSize: '16px',
	            borderRadius: 0,
	            borderColor: '#01d6c2',
	            borderStyle:'solid',
	            borderWidth:1,
	            paddingLeft: '8px',width:100, cursor: 'pointer'}}>查询</button>
	          </div>
	          <div style={{position: 'absolute', top: 100, left: 50}}>
	            <SymmetricBar width={1450} height={500} ref = {ref=>this.symmetricBar1=ref} flag={true} click={this.qyhhbClick.bind(this)} />
	          </div>
	        </Dialog>
					<Dialog title={'企业名称'} ref={'qyhhbDialogRef'}>
						<div style={{padding: '25px 74px 60px', fontSize: 20, lineHeight: '40px'}}>
							<p>
								<span style={{color: '#ccc'}}>企业名称：</span>
								<span>{this.state.companyName}</span>
							</p>
							<p>
								<span style={{color: '#ccc'}}>营业执照：</span>
								<span>{this.state.license}</span>
							</p>
							<p>
								<span style={{color: '#ccc'}}>法人代表：</span>
								<span>{this.state.legalPerson}</span>
							</p>
							<p>
								<span style={{color: '#ccc'}}>经营人：</span>
								<span>{this.state.operator}</span>
							</p>
							<p>
								<span style={{color: '#ccc'}}>联系电话：</span>
								<span>{this.state.telphone}</span>
							</p>
							<p>
								<span style={{color: '#ccc'}}>企业地址：</span>
								<span>{this.state.companyAddr}</span>
							</p>
						</div>
					</Dialog>
					
	        <DotEarth style={{ position: 'absolute', left: '-15px', top: "-5px", zIndex: 0,transform:'scale(0.95)' }} />
	        <div style={{
	          width: '900px',
	          height: '880px',
	          position: 'absolute',
	          top: '73px', left: '510px'
	        }}>
	          <CenterMap style={{ width: '900px', height: '880px' }} mapClickHandle={this.gisMapShow.bind(this)} ref={ref => this._centerMapRef = ref}/>
	        </div>
	      </div>

        {/*gis下钻*/}
        <div style={{display:this.state.isEchertsMap == true ?'block':'none'}}>
          <Panel title={'信用体系'} style={{position:'absolute', left:'30px',top:'100px',type:false}} width={500}></Panel>

          <GisTable ref={ref => this.GisTableRef = ref} top={"150px"} left={'30px'} width={"350px"} changeTableListByType={this.changeTableListByType.bind(this)} openDetails={ this.gisTableOpenDetaild.bind(this) } />

          <div style={{position:'absolute', left:'200px',top:'970px'}}>
            <Pagination simple hideOnSinglePage current={gisMapParams.pageNum} defaultPageSize={gisMapParams.pageSize} total={gisMapParams.total} onChange={this.gisMapPageChange.bind(this)} />
          </div>

          <GisMap ref={ref => this.GisMapRef = ref} width={'auto'} style={{position:'absolute',top:'150px',left:'415px',right:'30px',zIndex:'4'}}/>

          <span style={{position:'absolute',right:"620px", top:'100px'}}>
            <Select ref={ref=>this.gisRegionSelectRef=ref} list={me.regionList} onSelectChange={this.gisMapRegionChange.bind(this)} />
          </span>

          <Search placeholder="请输入公司名称" onSearch={this.gisMapSearch.bind(this)} style={{ width: 290,position:'absolute',right:'150px',top:'100px'}} />

          <div onClick={this.gisMapHide.bind(this)} style={{ width:'100px',height:'30px',backgroundColor:'#053d88',color:'#46bec6',position:'absolute',top:'100px',right:'30px',textAlign:'center',lineHeight:'30px',cursor:'pointer' }}>返回</div>
        </div>
      </div>
		)
	}

	/*----------gis地图-开始----------*/
	gisMapShow(d) {
		//console.log(d, d.data);
		let me = this;
		if(!d.data || !d.data.geoCoord) {
			return false;
		}

		let name = d.data.name;
		//console.log(name);
		me.gisRegionSelectRef._setSelectedText(name);
		let gisMapParams = me.state.gisMapParams;
		gisMapParams.region = name;
		gisMapParams.redWhiteBlack = ''; //接口需要
		this.redWhiteBlack = '全部'; //用于判断
		this.GisTableRef.initTabIndex(); //改变视图
		me.setState({
			isEchertsMap: true,
			gisMapParams: gisMapParams
		});
		me.gisMap();
		me.GisMapRef.checkResize(d.data.geoCoord);
	}

	//关闭gis地图
	gisMapHide() {
		let me = this;
		me.setState({
			isEchertsMap: false
		});
	}

	//通过类型改变gistable（红名单，白名单，黑名单）
	changeTableListByType(e) {
		let me = this;
		let gisMapParams = me.state.gisMapParams;
		if(me.redWhiteBlack != e.label) {
			me.redWhiteBlack = e.label;
			gisMapParams.redWhiteBlack = e.label;
			if(gisMapParams.redWhiteBlack == '全部') {
				gisMapParams.redWhiteBlack = '';
			}
			//console.log(gisMapParams.redWhiteBlack);
			me.setState({
				gisMapParams: gisMapParams
			});
			me.gisMap();
		}
	}

	/*GIS地图*/
	gisMap(nextPage) {
		let gisMapParams = this.state.gisMapParams;
		if(!nextPage === true) {
			gisMapParams.pageNum = 1;
		}

		/*//模拟数据
		this.GisTableRef.setTable(demoData.companyList);
		this.GisMapRef.setMarker(demoData.companyList);
		this.GisTableRef.setHead({
			companyTotal: 4
		});*/
		let params = formatParams(this.state.gisMapParams);
		this._tokens.push(creditSystemApi.selectCompanyDetailList.send(params).then((res) => {
			if(window.debugging) console.log('GIS下钻—涉农企业列表', res);
			//修改总页数
			gisMapParams.total = res.data.total;
			this.setState({
				gisMapParams: gisMapParams
			});
			let gisTableData = [];
			let list = res.data.list || [];
			list.map((item, i) => {
				let lng = item.longitude;
				let lat = item.latitude;
				gisTableData.push({
					name: item.company_name,
					type: item.red_black_white_roll_call,
					add: item.address,
					legalPerson: item.legal_representative,
					contacts: item.operator,
					tel: item.contacts_phone,
					license: item.business_license,
					pointX: lng,
					pointY: lat
				})
			});
			//console.log(gisTableData);
			this.GisMapRef.setMarker(gisTableData);
			this.GisTableRef.setTable(gisTableData);
			if(gisTableData.length > 0) {
				this.gisTableOpenDetaild(gisTableData[0]);
			} else {
				let geoCoord = this._centerMapRef._getGeoCoord(this.gisRegionSelectRef._getText()); //拿到下拉地区的经纬度
				//console.log(geoCoord);//数组或undefined
				if(geoCoord) {
					this.GisMapRef.centerTo(geoCoord[0], geoCoord[1], 16);
				} else {
					this.GisMapRef.centerTo(this.lng, this.lat, 16);
				}
			}
		}));
		this._tokens.push(creditSystemApi.selectCountCompany.send(params).then((res) => {
			if(window.debugging) console.log('GIS下钻—涉农企业数量', res);
			this.GisTableRef.setHead(res.data);
		}));
	}

	//gis列表分页切换
	gisMapPageChange(page) {
		//console.log(page);
		let gisMapParams = this.state.gisMapParams;
		gisMapParams.pageNum = page;
		this.setState({
			gisMapParams: gisMapParams
		});
		this.gisMap(true);
		//初始化gisTable的下标
		this.GisTableRef.closeDetails();
	};

	//gis地图地区切换
	gisMapRegionChange(data) {
		//console.log(data);
		let fullName = data.name == '运城全市' ? '' : data.name;
		let gisMapParams = this.state.gisMapParams;
		if(gisMapParams.region == fullName) {
			return;
		}
		gisMapParams.region = fullName;
		gisMapParams.redWhiteBlack = ''; //接口需要
		this.redWhiteBlack = '全部'; //用于判断
		this.GisTableRef.initTabIndex(); //改变视图
		this.setState({
			gisMapParams: gisMapParams
		});
		this.gisMap();

		//初始化gisTable的下标
		this.GisTableRef.closeDetails();
	}

	//gis地图搜索
	gisMapSearch(value) {
		let gisMapParams = this.state.gisMapParams;
		gisMapParams.companyName = value;
		this.setState({
			gisMapParams: gisMapParams
		});
		//公司名称和涉农企业数量没做关联，搜索时不改变涉农企业数量
		this.gisMap();
		//初始化gisTable的下标
		this.GisTableRef.closeDetails();
	}

	//农投品门店表格详情打开回调
	gisTableOpenDetaild(item) {
		//console.log(item);
		if(!item.pointX || !item.pointY) {
			let geoCoord = this._centerMapRef._getGeoCoord(this.gisRegionSelectRef._getText()); //拿到下拉地区的经纬度
			//console.log(geoCoord);//数组或undefined
			if(geoCoord) {
				this.GisMapRef.centerTo(geoCoord[0], geoCoord[1], 16);
			} else {
				this.GisMapRef.centerTo(this.lng, this.lat, 16);
			}
		} else {
			this.GisMapRef.centerTo(item.pointX, item.pointY, 16);
		}
	}
	/*----------gis地图-结束----------*/
}

export default EnterpriseCredit;
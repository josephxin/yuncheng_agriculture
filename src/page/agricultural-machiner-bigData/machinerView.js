import React from 'react';
import Panel from '../../component/panel/Panel';
import SalesTrend from "../../component/salesTrend/SalesTrend";
//引入样式
import './machinerView.scss'

//引入api
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-machinerView';

/*引入antd框架*/
import { Input, Cascader, Pagination, DatePicker } from 'antd';
import moment from 'moment';
/*下拉选择框*/
import Select5 from '../../component/select/Select5';

//数据
import dates from './data';

import { setParamsDay, DataTool } from '../../tool/tool.js';
import LineSingle from "../../component/echarts/LineSingle";
import ServiceTrendsBar from "../../component/echarts/serviceTrendsBar";
import FELineChartReact from "../../component/echarts-FE/FELineChartReact";
import Pie from "../../component/echarts/pie/Pie";

import { setParamsYear1 } from "../../tool/tool";
import demoData from "../agricultural-products/demoData";
import GisTable from "./gisTable";
import GisMap from "../../component/map-component/gisMap/gisMap";
import DatePickers from "../../component/DatePickers/DatePickers";
/*引入下拉选择框*/
import Select from '../../component/select/Select';

//引入中间组件
import IconCircle from './IconCircle';

const Search = Input.Search;
const {
	MonthPicker,
	RangePicker,
	WeekPicker
} = DatePicker;
const dateFormat = 'YYYY';

const paramsDay = setParamsDay(12); //12个月
const paramsYear = setParamsYear1(1);
const setDeful = (n) => {
	let date = new Date();
	let year = date.getFullYear();
	let startYear = year - n;
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	let day = date.getDate();
	day = day >= 10 ? day : `0${day}`;
	return {
		startTime: [startYear, month, day].join('-'),
		endTime: [year, month, day].join('-')
	}
};

class machinerView extends React.Component {
	constructor() {
		super();
		this._tokens = [];
		this.lng = 111.00699;
		this.lat = 35.02628;
		this.sbTypedefault = '耕整机械';

		this.state = {
			totalAll: 0,
			quxian: [],
			//时间筛选框
			scgmzsParams: {
				//starttime: paramsYear.startTime,
				starttime: 2018,
			},
			listSelect: dates.listSelect,
			//农投品监测
			gisMapParams: {
				pageNum: 1,
				pageSize: 15,
				total: 0,
				quxian: '',
				name: ''
			},
			isEchertsMap: false,
		};
	}

	componentWillUnmount() {
		this._clearTokens();
	}

	componentDidMount() {
		this.sbTypeSelectRef._selectType();
		const me = this;
		me.amountTrend();
		me.serviceTrends();
		me.salesTrend();
		me.getCenter();
		me.changePrediction();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}

	//时间筛选
	getAllData() {
		const me = this
		me.salesTrend() //区域设备数量排行
		me.getCenter() //中间圆图
		me.TradeStructure() //设备数量占比分析
	}

	sbTypeSelectChange(e) {
		this.sbTypedefault = e.name;
		this.TradeStructure(e.name);
	}

	/*
	 * type: 模块类型（字符串）
	 * timeType: 开始时间/结束时间（字符串）
	 * fn: 选择时间后的回调函数
	 * value: 当前时间（字符串）
	 */
	getTime(type, timeType, fn, value) {
		let me = this;
		let params = me.state[type + 'Params']; //scgmzsParams
		params[timeType] = value; //params[startTime]='2017'
		let obj = {};
		obj[type + 'Params'] = params;
		me.setState(obj);
		me[fn]();
	}

	//中间圆图
	getCenter() {
		let me = this;
		this._tokens.push(api.machinery_overviewStatistics.send(
			me.state.scgmzsParams
		).then((res) => {
			if(window.debugging) console.log('center总揽图', res);
			let centerData = res.data || [];
			let data = [];
			centerData.map((item, i) => {
				data.push({
					name: item.type,
					value: item.number
				});
			});
			this.centerComponentRef.setData(data);

			if(centerData.length == 0) {
				this.setState({
					totalAll: 0
				});
			} else {
				this.setState({
					totalAll: centerData[0].total || 0,
				});
			}
			let selectList = [];
			centerData.forEach((item, index) => {
				selectList.push(item.type)
			});
			//console.log('selectList------------', selectList);
			this.sbTypeSelectRef._setList(selectList);
			if(selectList[0]) {
				this.TradeStructure(selectList[0]);
			}
		}));
	}

	centerComponentClick(item) {
		console.log(item);
		let params = this.state.gisMapParams;
		params.type = item.name;
		params.number = item.value;
		let geoCoord = [this.lng, this.lat];
		this.setState({
			gisMapParams: params,
		});
		this.gisMapShow(geoCoord);
	}

	/*区域设备数量排行*/
	salesTrend() {
		let me = this;
		this._tokens.push(api.machinery_regEquipQuaRanking.send(
			me.state.scgmzsParams
		).then((res) => {
			if(window.debugging) console.log('区域设备数量排行', res);
			let region = [],
				sales = [];
			res.data.map((item, i) => {
				region.push(item.quxian);
				sales.push(item.amount);
			});
			let salesTrendBar = {
				region: region,
				sales: sales
			};
			this.salesTrendRef.setData(salesTrendBar);
		}))
	}
	/*设备数量趋势分析*/
	amountTrend() {
		let me = this;
		me._tokens.push(api.pesticide_residue_index.send().then(res => {
			if(window.debugging) console.log('设备数量趋势分析', res);
			let content = res.data;
			let seriesData = [];
			let xData = [];
			content.map((t, i) => {
				seriesData.push(t.amount);
				xData.push(t.year);
			});
			let option = {
				data: seriesData,
				date: xData,
				unit: '台'
			};
			me.ncrateRef.setData(option);
		}));
	}
	//设备数量占比分析
	TradeStructure(name) {
		this.salesTrendParams = {
			...this.state.scgmzsParams,
			type: name ? name : '',
		}
		this._tokens.push(api.TradeStructure.send(this.salesTrendParams).then((res) => {
			if(window.debugging) console.log('设备数量占比分析', res);
			let series = [];
			if(!res.data || res.data == []) {
				dates.pieData = {};
			} else {
				res.data.map((item, i) => {
					if(item.name !== '') {
						let itemArr = {
							name: item.name,
							value: parseFloat(item.percent)
						}
						series.push(itemArr)
					}
				})
				let options = {
					unit: '条',
					colorArr: dates.pieData.colorArr,
					seriesData: series
				}
				dates.pieData = options;
				//console.log(dates.pieData);
				this.pieRef && this.pieRef.setData(dates.pieData);
			}
		}))
	}
	//专业服务点趋势分析
	serviceTrends() {
		this._tokens.push(api.serviceTrends.send().then(res => {
			if(window.debugging) console.log('专业服务点趋势分析', res);
			if(res.data) {
				let xData = []
				let seriousData = []
				res.data.forEach((item, index) => {
					xData.push(item.year)
					seriousData.push(item.amount)
				})
				let options = {
					xData: xData,
					seriousData: seriousData,
				}
				this.barFef.setData(options)
			}
		}))
	}
	//机播/机耕/机收
	changePrediction() {
		this._tokens.push(api.machinery_machinesph.send().then(res => {
			if(window.debugging) console.log('机播/机耕/机收', res);
			let content = res.data;
			var dataStruct = {};
			dataStruct.areaShow = true;
			dataStruct.xAxisSplitAreaShow = false;
			dataStruct.unit = "万公顷";
			dataStruct.yAxisName = "面积:万公顷";
			dataStruct.xAxisData = "year";
			dataStruct.data = "";
			var lines = [{
				key: "jibo",
				value: "机播面积",
				color: "59,255,208"
			}, {
				key: "jigeng",
				value: "机耕面积",
				color: "255,242,0"
			}, {
				key: "jishou",
				value: "机收面积",
				color: "255,156,0"
			}];
			this._feLineChart$2.setData(DataTool.convertToChart2(content, dataStruct, lines));
		}));
	}

	/*GIS地图*/
	gisMap(nextPage) {
		let params = this.state.gisMapParams;
		if(!nextPage) {
			params.pageNum = 1;
		}
		params.starttime = this.state.scgmzsParams.starttime;
		if(params.quxian == '运城全市') {
			params.quxian = '';
		}
		this.setState({
			gisMapParams: params
		});
		this._tokens.push(api.machinery_selectList.send(this.state.gisMapParams).then((res) => {
			if(window.debugging) console.log('GIS下钻—列表查询', res);
			//修改总页数
			params.total = res.total;
			this.setState({
				gisMapParams: params
			});
			let gisTableData = [];
			let list = res.list || [];
			list.map((item, i) => {
				if(item != null) {
					gisTableData.push({
						name: item.service_point_name,
						contacts: item.person,
						pointX: item.longitude,
						pointY: item.latitude
					});
				}
			});
			//console.log(gisTableData);
			this.setState({
				gisTableData: gisTableData
			});
			this.GisMapRef.setMarker(gisTableData);
			this.GisTableRef.setTable(gisTableData);
			if(gisTableData.length > 0) {
				if(gisTableData.length > 0) {
					let pointX = gisTableData[0].pointX;
					let pointY = gisTableData[0].pointY;
					if(!pointX || !pointY) {
						this.GisMapRef.centerTo(this.lng, this.lat, 14);
					} else {
						this.GisMapRef.centerTo(pointX, pointY, 14);
					}
				}
			}
		}))
		let selectSeviceCount = '';
		let total = '';
		this._tokens.push(api.machinery_selectSeviceCount.send(this.state.gisMapParams).then((res) => {
			if(window.debugging) console.log('GIS下钻—服务网点设备数量', res);
			selectSeviceCount = res.data.count;
			total = res.data.total;
			this.GisTableRef.setHead({
				shopTotal: params.number,
				shopType: params.type,
				selectSeviceCount: selectSeviceCount,
				total: total
			});
		}))
	}

	//地图marker点击事件回调
	gisMapMarkerClick(marker) {
		//console.log(marker);
		this.GisTableRef.openDetails(marker.data);
	}

	//农投品门店表格详情打开回调
	gisTableOpenDetaild(item) {
		let type = this.state.gisMapParams.type
		this._tokens.push(api.machinery_selectDetail.send({
			mendianName: item.name,
			type: type
		}).then((res) => {
			if(window.debugging) console.log('GIS下钻—详情查询', res);
			let gisTableData = this.state.gisTableData;
			let machineInfo = res.data.machineInfo;
			let nameNum = '';
			machineInfo.forEach((item, index) => {
				nameNum += item.name + (item.num || 0) + '台' + ';'
			});
			let list = res.data || {};
			for(let i = 0; i < gisTableData.length; i++) {
				if(gisTableData[i].name === item.name) {
					gisTableData[i] = Object.assign(gisTableData[i], {
						license: list.service_point_name,
						legalPerson: list.person,
						contacts: nameNum ? nameNum : '',
						tel: list.tel,
						add: list.address,
					});
				}
			}
			this.setState({
				gisTableData: gisTableData
			});
		}));
		if(item.pointX == null || item.pointY == null) {
			this.GisMapRef.centerTo(110.98, 35.02, 14);
		} else {
			this.GisMapRef.centerTo(item.pointX, item.pointY, 14);
		}
		//高亮gis地图的icon
		this.GisMapRef.highlightIcon(item.pointX, item.pointY);
	}

	//打开gis地图
	gisMapShow(d) {
		let me = this;
		let params = this.state.gisMapParams;
		params.mendianName = '';
		params.quxian = '';
		me.gisMapSiteRef._setSelectedText('运城全市');
		me.gisSearchRef.input.setValue('');
		me.setState({
			isEchertsMap: true,
			gisMapParams: params,
		});
		me.gisMap(true);
		me.getQuXian();
		setTimeout(() => {
			me.GisMapRef.checkResize(d);
		});
		me.GisTableRef.closeDetails();
	}

	//拿到区县列表
	getQuXian() {
		this._tokens.push(apiAll.selectSystemList.send().then((res) => {
			if(window.debugging) console.log('拿到区县列表', res);
			let quXian = [];
			res.data.forEach((item, index) => {
				quXian.push(item.name);
			});
			quXian.unshift('运城全市');
			this.setState({
				quxian: quXian
			});
			this.gisMapSiteRef._setList(quXian);
		}))
	}

	//关闭gis地图
	gisMapHide() {
		let me = this;
		me.setState({
			isEchertsMap: false
		});
	}
	//gis地图搜索
	gisMapSearch(value) {
		let params = this.state.gisMapParams;
		params.mendianName = value;
		this.setState({
			gisMapParams: params,
		});
		this.gisMap();
	}
	//gis地图地区切换
	gisMapRegionChange(e) {
		this.GisTableRef.setTableClose(false);
		let params = this.state.gisMapParams;
		params.quxian = e.name;
		this.setState({
			gisMapParams: params
		});
		this.gisMap();
	}

	//gis列表分页切换
	gisMapPageChange(page) {
		//console.log(page);
		let params = this.state.gisMapParams;
		params.pageNum = page;
		this.setState({
			gisMapParams: params
		});
		this.gisMap(true);
		//初始化gisTable的下标
		this.GisTableRef.closeDetails();
	}

	render() {
		const me = this;
		let gisMapParams = me.state.gisMapParams;
		let scgmzsParams = me.state.scgmzsParams;
		return(
			<div style={{position:'relative'}}>
        {/*第一页*/}
        <div style={{display:this.state.isEchertsMap == false ? 'block' :'none'}}>
          {/*时间筛选*/}
           <div className={'timeSelect'}>
            	<span>时间：</span>
             	<DatePickers type={'year'} max={scgmzsParams.endtime} value={scgmzsParams.starttime} onChange={this.getTime.bind(this, 'scgmzs', 'starttime', 'getAllData')} />
          </div>
          
          {/*区域设备数量排行*/}
          <Panel title={'区域设备数量排行'} width={440} height={800} top={100} left={30} type={0}>
            <SalesTrend ref={(ref) => { this.salesTrendRef = ref;}} width={500} height={530} unit={'台'} />
          </Panel>
          
          {/*设备数量趋势分析*/}
          <Panel title={'设备数量趋势分析'} width={900} height={300} top={700} left={30} type={0}>
             <LineSingle ref={ref => this.ncrateRef = ref}
                showSymbol={false} dataZoom={false}
                width={900} height={250}
                unit={'台'}
            />
          </Panel>
          
          {/*机播/机耕/机收*/}
          <Panel title={'机播/机耕/机收'} left={1450} top={100} width={440} height={285} type={0}>
            <FELineChartReact ref={ref => me._feLineChart$2 = ref} width={447} height={220} top={40} />
          </Panel>
          
          {/*设备数量占比分析*/}
          <Panel title={'设备数量占比分析'} width={440} height={280} left={1450} top={400} type={0}>
            <div style={{position: 'absolute', left: '0px', width: 440,top: '0px'}}>
              <Select5 ref={ref => this.sbTypeSelectRef = ref} position={'relative'} left={250} top={27} width={150} list={this.state.listSelect} onSelectChange={this.sbTypeSelectChange.bind(this)} />
              <Pie ref={(ref) => this.pieRef = ref} style={{width:'440',height:'290',left:'0'}} top={40}/>
            </div>
          </Panel>
          
          {/*专业服务点趋势分析*/}
          <Panel title={'专业服务点趋势分析'} width={900} height={300} top={700} left={1000} type={0}>
            <ServiceTrendsBar ref={(ref) => this.barFef=ref} width={900} height={250} />
          </Panel>
          
          {/*center圆图*/}
          <div style={{position:'absolute', top:0, left:590, color:'white', width:744, height:744}}>
          	<IconCircle ref={ref=>this.centerComponentRef=ref} click={this.centerComponentClick.bind(this)} />
          	<div style={{position: 'absolute', top: 285, left: '50%', transform: 'translateX(-50%)', textAlign: 'center'}}>
              <span>
              	{scgmzsParams.starttime}年 <span style={{fontSize:'30px',color:'#ffc000',fontWeight:'bold'}}>{this.state.totalAll}</span> 台
              </span>
              <p>农用机械分布统计</p>
            </div>
          </div>
        </div>
        
        
        {/*gis下钻*/}
        <div style={{display:this.state.isEchertsMap == true ?'block':'none'}}>
          <Panel title={'农机服务点分布'} style={{position:'absolute', left:'30px',top:'100px',type:false}} width={500}></Panel>
          
          <GisTable ref={ref => this.GisTableRef = ref} top={"150px"} left={'30px'} width={"350px"} openDetails={ this.gisTableOpenDetaild.bind(this) } />
          
          <div style={{position:'absolute', left:'200px',top:'970px'}}>
            <Pagination simple  defaultCurrent={gisMapParams.pageNum} current={gisMapParams.pageNum} defaultPageSize={gisMapParams.pageSize} total={gisMapParams.total} onChange={this.gisMapPageChange.bind(this)} />
          </div>
          
          <GisMap ref={ref => this.GisMapRef = ref} width={'auto'} style={{position:'absolute',top:'150px',left:'415px',right:'30px',zIndex:'4'}}  markerClick={this.gisMapMarkerClick.bind(this)} />
          
          <span style={{position:'absolute',right:"625px", top:'100px'}}>
            <Select ref={ref=>this.gisMapSiteRef=ref} list={me.state.quxian} defaultValue={'运城全市'} onSelectChange={this.gisMapRegionChange.bind(this)} />
          </span>

          <Search
            ref={ref => this.gisSearchRef=ref}
            placeholder="请输入门店名称"
            onSearch={this.gisMapSearch.bind(this)}
            style={{ width: 290,position:'absolute',right:'150px',top:'100px'}} />
            
          <div onClick={this.gisMapHide.bind(this)} style={{ width:'100px',height:'30px',backgroundColor:'#053d88',color:'#46bec6',position:'absolute',top:'100px',right:'30px',textAlign:'center',lineHeight:'30px',cursor:'pointer' }}>返回</div>
        </div>
      </div>
		)
	}
}

export default machinerView;
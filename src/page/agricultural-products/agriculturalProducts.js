import React from 'react';
import Panel from '../../component/panel/Panel';
import SalesTrend from '../../component/salesTrend/SalesTrend';
import LtpxsRate from '../../component/list/DivChart';

import Tab from '../../component/tab/Tab';
import Table5 from '../../component/table/Table5';
import GisTable from './gisTable';
import BarLine from './charts/BarLine';

/*点状地球*/
import DotEarth from '../../component/dot-earth/DotEarth';
//地图
import CenterMap from '../../component/map-component/center-map/yuncheng_agriculture';
//import CenterMap from '../../component/map-component/center-map/agricultureWeifangTurnMap';
import GisMap from '../../component/map-component/gisMap/gisMap';

/*引入antd框架*/
import { Input, Cascader, Pagination } from 'antd';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-agricultural-products';

//引入假数据
import commonData from '../../data/commonData';
import demoData from './demoData.js';

/*引入下拉选择框*/
import Select from '../../component/select/Select';

import DatePickers from '../../component/DatePickers/DatePickers';

/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, cloneFn, formatParams } from '../../tool/tool.js';

const Search = Input.Search;
const paramsDay = setParamsDay(12); //12个月
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear(); //10年
const paramsYear1 = setParamsYear(1); //1年
const currentYear = getCurrentYear();
const currentDay = getNowDay();
const region = '永济市';
const bigVariety = '蔬菜';
const smallVariety = '黄瓜';

class AgriculturalProducts extends React.Component {
	constructor() {
		super();
		this.state = {
			isEchertsMap: false,
			//农投品销量
			salesTrendParams: {
				startTime: paramsDay.startTime,
				endTime: paramsDay.endTime,
				region: region,
				middleVariety: '肥料',
				smallVariety: ''
			},
			//农投品品种小类销量TOP10
			sellingShareParams: {
				bigVariety: '种植业',
				startTime: paramsYear1.startTime,
        endTime: paramsYear1.startTime,
				// endTime: paramsYear1.endTime,
				region: '运城全市',
				middleVariety: '肥料'
			},
			//农投品销售价格分析
			sellingPriceParams: {
				timeType: 'year',
				startTime: paramsYear.startTime,
				endTime: paramsYear.endTime,
				region: region,
				middleVariety: '肥料',
				smallVariety: ''
			},
			//违禁品名单
			contrabandParams: {
				sellTime: currentYear,
				farmName: ''
			},
			//农投品监测
			gisMapParams: {
				pageable: true,
				pageNum: 1,
				pageSize: 15,
				total: 0,
				region: region,
				name: ''
			},
			indexType: '肥料'
		};

		this._tokens = [];

		this.panelContent = {
			"paddingTop": "50px"
		};

		this.lng = 111.00699;
		this.lat = 35.02628;
		this.ntpType = [
		  {
			value: '种子',
			label: '种子'
		}, {
			value: '种苗',
			label: '种苗'
		}, {
			value: '肥料',
			label: '肥料'
		}, {
			value: '农药',
			label: '农药'
		}, {
			value: '其他',
			label: '其他'
		}];
		this.regionSelect = commonData.regionSelect;
		//this.regionSelect = ['盐湖区', '永济市', '河津市', '稷山县', '新绛县', '万荣县', '闻喜县', '绛县', '临猗县', '夏县', '垣曲县', '芮城县', '平陆县'];

	}

	componentWillUnmount() {
		this._clearTokens();
	}

	componentDidMount() {
		const me = this;

		me.setIndex();
		//违禁品名单
		me.contraband();
		// 中间地图
		me.centerMap();
		//获取下拉选择框地区列表
		me.getSelectRegion();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}

	//获取下拉选择框地区列表
	getSelectRegion() {
		this._tokens.push(apiAll.selectRegion.send().then(res => {
			if(window.debugging) console.log('地区', res);
			let data = res.data;
			this.gisMapSiteRef._setList(data); //gis地区下拉列表
			this.gisMapSiteRef._setSelectedText(this.state.gisMapParams.region); //gis地区设置默认值
		}));
	}

	// 主界面种类
	indexTypeChange(arr) {
		console.log(arr);
		let me = this;
		let name = arr[arr.length - 1];
		let lastName = me.state.salesTrendParams.middleVariety;
		if(lastName == name) {
			return;
		}
		let salesTrendParams = this.state.salesTrendParams;
		salesTrendParams.middleVariety = name;
		let sellingShareParams = this.state.sellingShareParams;
		sellingShareParams.middleVariety = name;
		let sellingPriceParams = this.state.sellingPriceParams;
		sellingPriceParams.middleVariety = name;

		this.setState({
			indexType: name,
			salesTrendParams: salesTrendParams,
			sellingShareParams: sellingShareParams,
			sellingPriceParams: sellingPriceParams
		});
		this.setIndex();
	}

	setIndex() {
		//农投品销量监测
		this.salesTrend();
		//农投品品种小类销量TOP10
		this.sellingShare();
		//农投品销售价格分析
		this.sellingPrice();
	}

	/*农投品销量*/
	salesTrend() {
		let params = formatParams(this.state.salesTrendParams);
		//console.log(params);
		this._tokens.push(api.sale_volume_region.send(params).then(res => {
			if(window.debugging) console.log('农投品销量', res);
			let region = [],
				sales = [];
			res.content.map((item, i) => {
				region.push(item.region);
				sales.push(item.salesVolume);
			});
			let salesTrendBar = {
				region: region,
				sales: sales
			};
			this.salesTrendRef.setData(salesTrendBar);
		}));
	}

	/*
	农投品品种小类销量TOP10
	*/
	sellingShare() {
		let params = formatParams(this.state.sellingShareParams);
		this._tokens.push(api.sale_volume_ranking.send(params).then((res) => {
			if(window.debugging) console.log('农投品品种小类销量TOP10', res);
			let sellingShareTop10 = [];
			res.content.map((item, i) => {
				sellingShareTop10.push({
					name: item.smallVariety,
					value: item.salesVolume
				});
			});
			this.sellingShareTop10Ref.setData(sellingShareTop10);
		}));
	}

	/*农投品销售价格分析*/
	sellingPrice() {
		let params = formatParams(this.state.sellingPriceParams);
		this._tokens.push(api.sale_price.send(params).then((res) => {
			if(window.debugging) console.log('农投品销售价格分析', res);
			let sellingPrice = {
				date: [],
				wholesalePrice: [],
				retailPrice: [],
			};
			res.content.map((item, i) => {
				sellingPrice.date.push(item.dateTime);
				sellingPrice.wholesalePrice.push(item.wholesalePrice); //批发价格
				sellingPrice.retailPrice.push(item.salePrice); //销售价格
			});
			this.sellingPriceRef.initChart(sellingPrice);
		}));
	}

	/*违禁品名单*/
	contraband() {
		let me = this;
		let params = formatParams(me.state.contrabandParams);
		me._tokens.push(api.contraband_list.send(params).then((res) => {
			if(window.debugging) console.log('违禁品名单', res);
			let content = res.content;
			let totalCount = content.length;
			me.contrabandListData = [];
			content.map((item, i) => {
				me.contrabandListData.push([i + 1, item.farmName, item.prohibitedRange, item.sellTime])
			});
			let needData = me.contrabandListData.slice(0, 5);
			let tableData = {
				thead: ['序号', '农投品名称', '禁止使用范围', '禁止使用/销售时间'],
				tbody: needData,
				width: [50],
				pagination: {
					pageNum: 1,
					pageSize: 5,
					totalCount: totalCount,
				},
			};
			me.contrabandTableRef.setData(tableData);
		}));
	}

	//违禁品名单，改变页码后获取数据
	getContrabandTableData(page) {
		let me = this;
		let needData = me.contrabandListData.slice((page - 1) * 5, page * 5);
		let tableData = {
			tbody: needData,
			pagination: {
				pageNum: page
			},
		};
		/*GIS地图-左侧列表*/
		me.contrabandTableRef.setData(tableData);
	}

	/*中间地图*/
	centerMap() {
		//console.log(demoData.mapData);
		/*this._centerMapRef._setData(demoData.mapData);*/
		let params = formatParams({
			dateTime: '2018'
		});
		this._tokens.push(api.centerMap.send(params).then((res) => {
			if(window.debugging) console.log('中间地图', res);
			let mapData = [];
			res.content.map((item, i) => {
				mapData.push({
					name: item.region,
					value: item.shopNum,
					company: item.businessNum
				})
			});
			//console.log(mapData);
			this._centerMapRef._setData(mapData);
		}));
	}

	/*GIS地图*/
	gisMap(nextPage) {
		let gisMapParams = this.state.gisMapParams;
		if(!nextPage) {
			gisMapParams.pageNum = 1;
		}
		//console.log(params);
		let params = formatParams(gisMapParams);
		this._tokens.push(api.gis_shops_list.send(params).then((res) => {
			if(window.debugging) console.log('GIS下钻—农投品门店信息—农投品门店列表查询', res);
			//修改总页数
			gisMapParams.total = res.content.totalCount;
			this.setState({
				gisMapParams: gisMapParams
			});
			let gisTableData = [];
			let list = res.content.list || [];
			list.map((item, i) => {
				gisTableData.push({
					shopId: item.shopId,
					name: item.name,
					type: item.type,
					add: item.address,
					legalPerson: item.legalPerson,
					contacts: item.linkMan,
					tel: item.linkTel,
					license: item.businessLicense,
					pointX: item.lng,
					pointY: item.lat
				})
			});
			//console.log(gisTableData);
			this.GisMapRef.setMarker(gisTableData);
			this.GisTableRef.setTable(gisTableData);
			if(gisTableData.length > 0) {
				let pointX = gisTableData[0].pointX;
				let pointY = gisTableData[0].pointY;
				if(!pointX || !pointY) {
					this.GisMapRef.centerTo(this.lng, this.lat, 16);
				} else {
					this.GisMapRef.centerTo(pointX, pointY, 16);
				}
			}
		}));
		this._tokens.push(api.gis_shops_count.send(params).then((res) => {
			if(window.debugging) console.log('GIS下钻—农投品门店信息—农投品门店及种类总量查询', res);
			this.GisTableRef.setHead(res.content);
		}));
	}

	//打开gis地图
	gisMapShow(d) {
		console.log(d);
		let me = this;
		if(!d.data || !d.data.geoCoord) {
			return false;
		}
		let name = d.data.name;
		let gisMapParams = me.state.gisMapParams;
		gisMapParams.region = name;
		gisMapParams.name = '';
		//给地区组件设置当前值
		me.gisMapSiteRef._setSelectedText(name);
		//给查询框组件设置空值
		me.gisSearchRef.input.setValue('');

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
		})
	}

	//gis地图搜索
	gisMapSearch(value) {
		let params = this.state.gisMapParams;
		params.name = value;
		this.setState({
			gisMapParams: params
		});
		//调接口
		this.gisMap();
		//关闭列表详情
		this.GisTableRef.closeDetails();
	}

	//gis地图地区切换
	gisMapRegionChange(data) {
		//console.log(data);
		let me = this;
		let name = data.name;
		let lastName = me.gisMapSiteRef._getText();
		//console.log(lastName, name);
		if(lastName == name) {
			return;
		}
		let gisMapParams = this.state.gisMapParams;
		gisMapParams.region = name;
		this.setState({
			gisMapParams: gisMapParams
		});
		//调接口
		this.gisMap();
		//关闭列表详情
		this.GisTableRef.closeDetails();
		let geoCoord = this._centerMapRef._getGeoCoord(name);
		if(geoCoord) {
			if(!geoCoord[0] || !geoCoord[1]) {
				this.GisMapRef.centerTo(this.lng, this.lat, 16);
			} else {
				this.GisMapRef.centerTo(geoCoord[0], geoCoord[1], 16);
			}
		}
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
	};

	//农投品门店详情打开回调
	gisTableOpenDetaild(item) {
		//console.log(item);
		if(!item.pointX || !item.pointY) {
			this.GisMapRef.centerTo(this.lng, this.lat, 16);
		} else {
			this.GisMapRef.centerTo(item.pointX, item.pointY, 16);
		}
		//高亮gis地图的icon
		this.GisMapRef.highlightIcon(item.pointX, item.pointY);
	}

	//农投品门店详情关闭回调
	gisTableCloseHandle() {
		//取消marker高亮
		this.GisMapRef.cancelHighlight();
	}

	//地图marker点击事件回调
	gisMapMarkerClick(marker) {
		//console.log(marker);
		this.GisTableRef.openDetails(marker.data);
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
		let salesTrendParams = me.state.salesTrendParams,
			sellingShareParams = me.state.sellingShareParams,
			gisMapParams = me.state.gisMapParams;

		return(
			<div style={{position:'relative'}}>
            <div style={{display:this.state.isEchertsMap == false?'block':'none'}}>
                {/* 品种下拉框*/}
                <div style={{ position: 'absolute', top: '80px', left: '790px',zIndex:'1' }}>
                  <Cascader options={me.ntpType} defaultValue={[me.state.indexType]} allowClear={false} expandTrigger="hover" style={{width: 350}} displayRender={this.displayRender.bind(this)} showSearch={{filter: this.cascaderFilter.bind(this)}} onChange={this.indexTypeChange.bind(this)} />
                </div>

                {/*农投品销量*/}
                <Panel title={sellingShareParams.middleVariety + '销量'} width={440} height={513} top={90} left={30}>
                  <SalesTrend ref={(ref) => { this.salesTrendRef = ref; }} width={440} height={474} unit={'吨'} />
                </Panel>

                {/*农投品销售价格分析*/}
                <Panel title={sellingShareParams.middleVariety + '销售价格分析'} width={440} height={350} top={620} left={30}>
                  <BarLine ref={(ref) => { this.sellingPriceRef = ref; }} width={440} height={350} />
                </Panel>

                {/*农投品销售top*/}
                <Panel title={sellingShareParams.middleVariety+'销量TOP10'} width={440} height={490} top={90} left={1450}>
                	<div style={{ color:'#00fff6',fontSize:"15px",position:'absolute',right:'10px',top:'26px' }}>单位：吨</div>
                  <LtpxsRate height={490} ref={(ref) => { this.sellingShareTop10Ref = ref;}} />
                </Panel>

                {/*违禁品名单*/}
                <Panel title={'违禁品名单'} width={440} height={350} top={620} left={1450}>
	                <div style={this.panelContent}>
	                  <Table5 ref={ref => this.contrabandTableRef = ref} simple={true} getData={this.getContrabandTableData.bind(this)}></Table5>
	                </div>
                </Panel>

                {/*点状地球*/}
                <DotEarth style={{ position: 'absolute', left: '-15px', top: "-5px", zIndex: 0, transform:'scale(0.95)' }} />

                <div componentname={'运城市地图'} style={{
                  position: 'absolute',
                  top: '73px', left: '510px'
                }}>
                  <CenterMap style={{ width: '900px', height: '880px' }} mapClickHandle={this.gisMapShow.bind(this)} ref={ref => { this._centerMapRef = ref; }}/>
                </div>
            </div>

            {/*gis下钻*/}
            <div style={{display:this.state.isEchertsMap == true ?'block':'none'}}>
                <Panel title={'农投品监测'} style={{position:'absolute', left:'30px',top:'100px',type:false}} width={500}></Panel>
                <GisTable ref={ref => this.GisTableRef = ref} top={"150px"} left={'30px'} width={"350px"} openDetails={ this.gisTableOpenDetaild.bind(this)} closeDetails={this.gisTableCloseHandle.bind(this)} />
                <div style={{position:'absolute', left:'200px',top:'970px'}}>
                    <Pagination simple hideOnSinglePage current={gisMapParams.pageNum} defaultPageSize={gisMapParams.pageSize} total={gisMapParams.total} onChange={this.gisMapPageChange.bind(this)} />
                </div>
                <GisMap ref={ref => this.GisMapRef = ref} width={'auto'} style={{position:'absolute', top:'150px', left:'415px', right:'30px', zIndex:'4'}} markerClick={this.gisMapMarkerClick.bind(this)} />

                <span style={{position:'absolute',right:"460px", top:'100px'}}>
                  <Select ref={ref => this.gisMapSiteRef = ref} position={'relative'} list={me.regionSelect} onSelectChange={this.gisMapRegionChange.bind(this)} />
                </span>

                <Search ref={ref=>this.gisSearchRef=ref} placeholder="请输入门店名称" onSearch={this.gisMapSearch.bind(this)} style={{ width: 290, position:'absolute', right:'150px', top:'100px'}} />

                <div onClick={this.gisMapHide.bind(this)} style={{ width:'100px',height:'30px',backgroundColor:'#053d88',color:'#46bec6',position:'absolute',top:'100px',right:'30px',textAlign:'center',lineHeight:'30px',cursor:'pointer' }}>返回</div>
            </div>
        </div>
		)
	}
}

export default AgriculturalProducts;
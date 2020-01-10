import React from 'react';
import ReactDOM from 'react-dom';
//地图
import CenterMap from '../../component/map-component/center-map/internet_map';
//引入antd框架
import { Input, Cascader, message } from 'antd';
//引入api接口
import * as api from '../../api/api-internet';
//引入样式
import './internet.scss';
//引入假数据
import commonData from '../../data/commonData';
import demoData from './demoData.js';
//格式化参数 
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getTimeType } from '../../tool/tool.js';

const Search = Input.Search;
const paramsDay = setParamsDay();
const paramsDay12 = setParamsDay(12);
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear();

class Internet extends React.Component {
	constructor() {
		super();
		this.state = {
			menuData: demoData.menuData,
		};
		this._tokens = [];
	}

	render() {
		const me = this;
		return(
			<div className={'internet-bigdata'}>
				<div className={'left-menu'}>
					{
						me.state.menuData.map((item, i)=>{
							return (
								<div className={'menu-item'} key={i}>
									<div className={'menu-item-icon'} style={{backgroundImage: `url(${item.src})`}}></div>
									<div className={'menu-item-content'}>
										<div className={'menu-item-num'}><span className={'overflow-ellipsis'} title={item.value}>{item.value}</span><i>个</i></div>
										<p className={'menu-item-name'}>{item.name}</p>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className={'center-map'}>
					<CenterMap style={{ width: '1447px', height: '880px' }} mapClickHandle={this.jumpOtherPage.bind(this)} ref={ref => { this._centerMapRef = ref; }}/>
				</div>
				<h5 className={'internet-title'}>运城市统计</h5>
			</div>
		)
	}

	componentDidMount() {
		this.getLeftbarData();
		this.getCenterMapData();
	}

	componentWillUnmount() {
		this._clearTokens();
	}

	getLeftbarData() {
		this._tokens.push(api.selectStatistic.send().then((res) => {
			if(window.debugging) console.log('物联网-左侧统计', res);
			let data = JSON.parse(res.data);
			let obj = data.data;
			//console.log(obj);
			let menuData = this.state.menuData;
			menuData[0].value = obj.zoneTotal;
			menuData[1].value = obj.stationTotal;
			menuData[2].value = obj.cameraTotal;
			menuData[3].value = obj.deviceTotal;
			menuData[4].value = obj.sensorTotal;
			menuData[5].value = obj.warnTotal;
			menuData[6].value = obj.warnLogTotal;
			menuData[7].value = obj.stationOLTotal;
			this.setState({
				menuData: menuData
			});
		}));
	}

	getCenterMapData() {
		this._centerMapRef._setData(demoData.mapData);
		/*this._tokens.push(api.selectAgriculturalProductionData.send({
			quxian: this.state.households.selectOne
		}).then((res) => {
			if(window.debugging) console.log('中间地图', res);
			let data = res.data || [];
			let mapData = [];
			data.map((item, i) => {
				mapData.push({
					name: item.quxian,
					value: item.output,
				})
			});
			this._centerMapRef._setData(mapData);
		}));*/
	}

	jumpOtherPage(e) {
		console.log(e);
		window.open('http://139.219.129.137/wulianwang.html#/');
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	}
}

export default Internet;
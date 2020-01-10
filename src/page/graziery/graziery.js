import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../../component/panel/Panel';
/*引入Tab*/
import Tab from '../../component/tab/Tab';
/*弹出框*/
import Dialog from '../../component/dialog/Dialog';
/*引入下拉选择框*/
import Select from '../../component/select/Select';
/*引入日期插件*/
import DatePickers from '../../component/DatePickers/DatePickers';
/*引入antd框架*/
import { Input, Cascader, message } from 'antd';
/*gisMap*/
import GisMap from '../../component/map-component/gisMap/gisMap';
/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getTimeType } from '../../tool/tool.js';

const Search = Input.Search;
const paramsDay = setParamsDay();
const paramsDay12 = setParamsDay(12);
const paramsMonth = setParamsMonth();
const paramsYear = setParamsYear();

class Graziery extends React.Component {
	constructor() {
		super();
		this.state = {
			
		};
		this._tokens = [];
	}

	render() {
		const me = this;

		return(
			<div className={'graziery-bigdata'}>
				<p style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: 32}}>敬请期待...</p>
			</div>
		)
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {
		this._clearTokens();
	}

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
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
		me[fn]();
	}
}

export default Graziery;
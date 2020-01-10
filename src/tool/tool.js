import React from 'react';
import ReactDOM from 'react-dom';
import { Spin, Icon } from 'antd';

/* 加载中指示器 */
const antIcon = <Icon type="loading" spin/>;

const WFloading = {
	loadingCount: 0,
	show() {
		if(this.loadingCount <= 0) {
			ReactDOM.render(
				<Spin size="large" indicator={antIcon} delay={500} tip="数据加载中……"/>,
				document.getElementById("loading-wrap")
			);
		}
		this.loadingCount++;
	},
	hide() {
		if(this.loadingCount <= 0) return;
		this.loadingCount--;
		if(this.loadingCount === 0) {
			ReactDOM.unmountComponentAtNode(document.getElementById("loading-wrap"));
		}
	},
};

const WFloading2 = {
	loadingCount: 0,
	show() {
		if(this.loadingCount <= 0) {
			ReactDOM.render(
				<Spin size="large" indicator={antIcon} tip="系统验证中……"/>,
				document.getElementById("loading")
			);
		}
		this.loadingCount++;
	},
	hide() {
		if(this.loadingCount <= 0) return;
		this.loadingCount--;
		if(this.loadingCount === 0) {
			ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
		}
	},
};

const cloneFn = function(obj) {
	if(obj === null) return null;
	if(typeof obj !== 'object') return obj;
	if(obj.constructor === Date) return new Date(obj);
	if(obj.constructor === RegExp) return new RegExp(obj);
	var newObj = new obj.constructor(); //保持继承链
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
			var val = obj[key];
			newObj[key] = typeof val === 'object' ? cloneFn(val) : val; // 使用arguments.callee解除与函数名的耦合
		}
	}
	return newObj;
};

/*按天-年月日（2019-05-08）*/
const setParamsDay = (howMonth = 1) => { //默认一个月前
	function fn(params) {
		let date;
		if(params) {
			date = new Date(params);
		} else {
			date = new Date();
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month >= 10 ? month : `0${month}`;
		let day = date.getDate();
		day = day >= 10 ? day : `0${day}`;
		return {
			year,
			month,
			day,
		}
	}

	function getPreMonthDay(date, monthNum) {
		monthNum = parseInt(monthNum) ? Math.abs(parseInt(monthNum)) : 1;
		var dateArr = date.split('-');
		var year = parseInt(dateArr[0]); //获取当前日期的年份
		var month = parseInt(dateArr[1]); //获取当前日期的月份
		var day = parseInt(dateArr[2]); //获取当前日期的日
		var month2 = month - monthNum;
		if(month2 <= 0) {
			year = year - parseInt(monthNum / 12);
			let m = month - (monthNum % 12);
			if(m <= 0) {
				year--;
				month2 = 12 + m;
			} else {
				month2 = m;
			}
		}
		var days = new Date(year, month2, 0);
		days = days.getDate(); //获取当前日期中的月的天数
		if(day > days) {
			day = days;
		}
		if(month2 < 10) {
			month2 = '0' + month2;
		}
		if(day < 10) {
			day = '0' + day;
		}
		var t = year + '-' + month2 + '-' + day;
		return t;
	}

	let dateObj = fn();
	let end = dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
	let start = getPreMonthDay(end, howMonth);
	return {
		startTime: start,
		endTime: end,
	}
};

/*2018-01-01到2019-01-01*/
const setParamsDay2 = (n) => {
	n = n || 1; //默认一年前
	let date = new Date();
	let year = date.getFullYear();
	let month = '01';
	let day = '01';
	let startYear = year - n;
	return {
		startTime: startYear + '-' + month + '-' + day,
		endTime: year + '-' + month + '-' + day,
	}
}

/*按月-年和月（2019-05）*/
const setParamsMonth = (n) => {
	n = n || 1; //默认一年前
	let date = new Date();
	let year = date.getFullYear();
	let startYear = year - n;
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	return {
		startTime: [startYear, month].join('-'),
		endTime: [year, month].join('-'),
	}
};
/*按年-只有年（2009——2019）*/
const setParamsYear = (n) => {
	n = n || 10; //默认10年前
	let date = new Date();
	let year = date.getFullYear();
	let startYear = year - n;
	return {
		startTime: startYear,
		endTime: year,
	}
};

const setParamsYear1 = (n) => {
	n = n || 10; //默认10年前
	let date = new Date();
	let year = date.getFullYear();
	let startYear = year - n;
	return {
		startTime: startYear,
		//endTime: year,
	}
};

const getCurrentYear = () => {
	let date = new Date();
	let year = date.getFullYear();
	return year;
};

const getNowDay = () => {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	let day = date.getDate();
	day = day >= 10 ? day : `0${day}`;
	return year + '-' + month + '-' + day;
};

const DataTool = {
	/**
	 * @param result      处理对象
	 * @param axisData    x轴
	 * @param seriesData  y轴
	 */
	convertToChart(result, axisData, seriesData, legendData) {
		if(!result) {
			return;
		}

		let chartData = {
			axisData: [],
			seriesData: [],
			legendData: [legendData]
		};
		result.map((t, i) => {
			chartData.axisData.push(t[axisData]);
			chartData.seriesData.push(t[seriesData]);
		});

		return chartData;
	},

	convertToChart2(result, dataStruct, lines) {
		if(!result || !dataStruct) {
			return;
		}
		let chartData = {
			areaShow: dataStruct.areaShow,
			xAxisSplitAreaShow: dataStruct.xAxisSplitAreaShow,
			xAxisData: [],
			data: [],
			unit: dataStruct.unit,
			yAxisName: dataStruct.yAxisName,
			colors: [],
		}

		for(var i = 0; i < lines.length; i++) {
			var item = lines[i];
			chartData.colors.push(item.color);

			var dataItem = {};
			dataItem.name = item.value;
			dataItem.data = [];

			result.map((t, i) => {
				dataItem.data.push(t[item.key]);
			});

			chartData.data.push(dataItem);
		}

		result.map((t, i) => {
			chartData.xAxisData.push(t[dataStruct.xAxisData]);
		});
		return chartData;
	}
};

Date.prototype.format = function(format) {
	var args = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter

		"S": this.getMilliseconds()
	};
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var i in args) {
		var n = args[i];

		if(new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
	}
	return format;
};

const formatParams = function(obj) {
	let params = new URLSearchParams();
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			params.append(key, obj[key]);
		}
	}
	return params;
};

/**
 * 处理时间格式  "2019-03-22 00:00:00" 变成 "2019-03-22"
 * params string 时间字符串
 * return string 年月日
 * */
const getTimeType = function(val) {
	if(val && typeof val === 'string') {
		return val.split(" ")[0];
	} else {
		return '';
	}
};

/**
 * 处理时间格式  "2019-03-22T00:00:00" 变成 "2019-03-22"
 * params string 时间字符串
 * return string 年月日
 * */
const handleDateUtc = function(val) {
	if(val && typeof val === 'string') {
		let date = new Date(val);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month >= 10 ? month : `0${month}`;
		let day = date.getDate();
		day = day >= 10 ? day : `0${day}`;
		let time = year + '-' + month + '-' + day;
		return time;
	} else {
		return '';
	}
};

export {
	WFloading,
	WFloading2,
	cloneFn,
	setParamsDay,
	setParamsDay2,
	setParamsMonth,
	setParamsYear,
	setParamsYear1,
	getCurrentYear,
	getNowDay,
	DataTool,
	formatParams,
	getTimeType,
	handleDateUtc
}
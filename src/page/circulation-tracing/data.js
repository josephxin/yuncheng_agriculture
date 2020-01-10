import React from 'react';
import pfsc from './img/pifashichang.png';

export default {
	markPointData: {
		dataList: [{
			name: '批发市场',
			src: pfsc,
			height: 34,
		}]
	},
	//交易实时信息
	observationColumns1: [{
		title: '批发市场名称',
		dataIndex: 'name',
		key: 'name',
		width: 147,
		render: (text, record) => (
			<p style={{width: 127, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', color: '#4ac5ff'}} title={text}>
	      {text}
	    </p>
		),
	}, {
		title: '交易产品',
		dataIndex: 'product',
		key: 'product',
		width: 90,
	}, {
		title: '交易价格',
		dataIndex: 'price',
		key: 'price',
		width: 100,
	}, {
		title: '交易时间',
		dataIndex: 'time',
		key: 'time',
		width: 100,
	}],
	//交易实时信息-大图
	observationColumns2: [{
		title: '批发市场名称',
		dataIndex: 'name',
		key: 'name',
		width: 350,
		render: (text, record) => (
			<p style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',color: '#4ac5ff',}}>
        {text}
      </p>
		),
	}, {
		title: '区县',
		dataIndex: 'area',
		key: 'area',
		width: 200,
	}, {
		title: '交易产品',
		dataIndex: 'product',
		key: 'product',
		width: 200,
	}, {
		title: '交易重量',
		dataIndex: 'weight',
		key: 'weight',
		width: 200,
	}, {
		title: '交易价格',
		dataIndex: 'price',
		key: 'price',
		width: 200,
		render: (text, record) => (
			<span style={{color: '#e7c14a'}}>
        {text}
      </span>
		),
	}, {
		title: '交易时间',
		dataIndex: 'time',
		key: 'time',
		width: 300,
	}],
	//农产品采收量监测
	ncpcsljcDom: {
		data: [5.1, 3.8, 5.2, 4.1, 7, 5.3, 4, 4.9, 3.5, 5, 5],
		date: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
		unit: '万吨'
	},
	//饼图数据
	pieData: {
		unit: '条',
		colorArr: ['#0297ff', '#00cfff', '#2bfdb6', '#28dd5f', '#fffd04', '#20fd40'],
		seriesData: [{
			value: 0,
			name: '无'
		}]
	},
	//运城市农产品流通概况
	flowProfile: [{
		name: '盐湖区',
		value: 100
	}, {
		name: '永济市',
		value: 80
	}, {
		name: '河津市',
		value: 70
	}, {
		name: '稷山县',
		value: 60
	}, {
		name: '新绛县',
		value: 50
	}, {
		name: '万荣县',
		value: 45
	}, {
		name: '闻喜县',
		value: 44
	}, {
		name: '绛县',
		value: 43
	}, {
		name: '临猗县',
		value: 42
	}, {
		name: '夏县',
		value: 41
	}, {
		name: '垣曲县',
		value: 40
	}, {
		name: '芮城县',
		value: 35
	}, {
		name: '平陆县',
		value: 30
	}]
};
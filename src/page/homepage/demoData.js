export default {
	//农产品销售流向
	productSaleDirection: [{
		"id": null,
		"marketname": null,
		"name": null,
		"shucai": "黄瓜",
		"price": null,
		"weight": "181.00",
		"tradedate": null,
		"xiaodi": "上海",
		"ceguo": null,
		"chuandate": null,
		"pageno": null,
		"adddate": null
	}],
	//批发零售价格比较
	priceCompare: [{
		"id": "",
		"region": "潍坊全市",
		"bigVariety": "蔬菜",
		"smallVariety": "黄瓜",
		"dateTime": "2018",
		"tradePrice": 4.5,
		"retailPrice": 6.0,
		"season": "第一个季度"
	}],
	//物流网设备发展概况
	internetEquipment: {
		xData: ['2015-2019', '2015', '2016', '2017', '2018', '2019'],
		seriesData: [
			[0, 1700, 1400, 1200, 300, 0], //辅助数据
			[2900, 1200, 300, 200, 900, 300] //真实数据
		],
		unit: '' //单位
	},
	//三农政策与产值、产量相关性分析
	correlationAnalysis: {
		"xData": ["2014", "2015", "2016", "2017", "2018"],
		"lineData": [{
			"name": "产值",
			"data": [1138.91, 1153.33, 1143.72, 1179.15, 1092.77]
		}, {
			"name": "产量",
			"data": [396.92, 393.04, 409.05, 432.6, 457.2]
		}],
		"scatterData": [
			[{
				"name": "国家深化农村改革、支持粮食生产、促进农民增收政策措施",
				"value": 396.92
			}, {
				"name": "2015年国家深化农村改革、发展现代农业、促进农民增收政策措施",
				"value": 393.04
			}, {
				"name": "全国农产品加工业与农村一二三产业融合发展规划（2016—2020年）",
				"value": 409.05
			}, {
				"name": "国务院办公厅关于加快推进农业供给侧结构性改革大力发展粮食产业经济的意见",
				"value": 432.6
			}, {
				"name": "农商互联助力乡村振兴",
				"value": 457.2
			}],
			[null, {
				"name": "国务院办公厅关于加快转变农业发展方式的意见",
				"value": 589.7066666666667
			}, {
				"name": "“十三五”全国农业农村信息化发展规划的通知",
				"value": 605.7166666666667
			}, {
				"name": "2017年重点强农惠农政策",
				"value": 629.2666666666667
			}, null]
		]
	},
	//产业结构分析表头
	industrialStructureColumn: [{
			title: '地市',
			dataIndex: 'cityname',
			key: 'cityname',
			width: 100,
		},
		{
			title: '区县',
			dataIndex: 'areaname',
			key: 'areaname',
			width: 100,
		},
		{
			title: '总产值(万元)',
			dataIndex: 'alloutputval',
			key: 'alloutputval',
			width: 150,
		},
		{
			title: '农业总产值(万元)',
			dataIndex: 'farmingoutputval',
			key: 'farmingoutputval',
			width: 150,
		},
		{
			title: '林业总产值(万元)',
			dataIndex: 'forestryoutputval',
			key: 'forestryoutputval',
			width: 150,
		},
		{
			title: '牧业总产值(万元)',
			dataIndex: 'animaloutputval',
			key: 'animaloutputval',
			width: 150,
		},
		{
			title: '渔业总产值(万元)',
			dataIndex: 'fisheryoutputval',
			key: 'fisheryoutputval',
			width: 150,
		},
		{
			title: '农林牧渔服务业(万元)',
			dataIndex: 'serviceval',
			key: 'serviceval',
			width: 150,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//三品一标统计表头
	spybColumn: [{
			title: '农产品名称',
			dataIndex: 'productname',
			key: 'productname',
			width: 150,
		},
		{
			title: '品类',
			dataIndex: 'producttype',
			key: 'producttype',
			width: 150,
		},
		{
			title: '地区',
			dataIndex: 'region',
			key: 'region',
			width: 150,
		},
		{
			title: '详细地址',
			dataIndex: 'companyname',
			key: 'companyname',
			width: 280,
		}
	],
	//批发零售价格比较表头
	priceContrastColumn: [{
			title: '农产品名称',
			dataIndex: 'productname',
			key: 'productname',
			width: 150,
		},
		{
			title: '品类',
			dataIndex: 'producttype',
			key: 'producttype',
			width: 150,
		},
		{
			title: '销售类型',
			dataIndex: 'saletype',
			key: 'saletype',
			width: 150,
		},
		{
			title: '价格',
			dataIndex: 'price',
			key: 'price',
			width: 120,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 220,
		}
	],
	//物流网设备发展概况表头
	networkEquipmentColumn: [{
			title: '时间',
			dataIndex: 'equipmenttime',
			key: 'equipmenttime',
			width: 100,
		},
		{
			title: '设备名称',
			dataIndex: 'equipmentname',
			key: 'equipmentname',
			width: 100,
		},
		{
			title: '农户名称',
			dataIndex: 'farmername',
			key: 'farmername',
			width: 100,
		},
		{
			title: '大棚名称',
			dataIndex: 'greenhousename',
			key: 'greenhousename',
			width: 150,
		},
		{
			title: '所属基地',
			dataIndex: 'basename',
			key: 'basename',
			width: 150,
		},
		{
			title: '所在地区',
			dataIndex: 'areaname',
			key: 'areaname',
			width: 100,
		},
		{
			title: '坐标',
			dataIndex: 'coordinate',
			key: 'coordinate',
			width: 100,
		}
	],
	//农作物耕地面积分布表头
	areaDistributionColumn: [{
			title: '产品名称',
			dataIndex: 'cropssmalltype',
			key: 'cropssmalltype',
			width: 100,
		},
		{
			title: '分类',
			dataIndex: 'cropsbigtype',
			key: 'cropsbigtype',
			width: 100,
		},
		{
			title: '所属区县',
			dataIndex: 'quxian',
			key: 'quxian',
			width: 150,
		},
		{
			title: '耕地面积（公顷）',
			dataIndex: 'plantfieldarea',
			key: 'plantfieldarea',
			width: 150,
		}
	],
	//首页-中心区域
	rotateData: [{
		name: "利税",
		value: "10",
		unit: "亿"
	}, {
		name: "农机设备数",
		value: "20",
		unit: "台"
	}, {
		name: "农投品使用量",
		value: "30",
		unit: ""
	}, {
		name: "地标农产品",
		value: "40",
		unit: "个"
	}, {
		name: "农户总人口",
		value: "1800",
		unit: "人"
	}, {
		name: "龙头企业",
		value: "60",
		unit: "家"
	}, {
		name: "耕地总面积",
		value: "70",
		unit: "亩"
	}, {
		name: "涉农企业",
		value: "80",
		unit: "家"
	}, {
		name: "农业总产值",
		value: "90",
		unit: "亿"
	}, {
		name: "GDP占比",
		value: "90",
		unit: "%"
	}, {
		name: "用户注册量",
		value: "90",
		unit: "万"
	}],
	//农业总产值表头
	outputValueColumn: [{
			title: '总产值(亿)',
			dataIndex: 'outputval',
			key: 'outputval',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//GDP占比表头
	proportionColumn: [{
			title: '农业总产值(亿)',
			dataIndex: 'outputval',
			key: 'outputval',
			width: 100,
		},
		{
			title: 'GDP(亿)',
			dataIndex: 'gdpval',
			key: 'gdpval',
			width: 100,
		},
		{
			title: '占比',
			dataIndex: 'ratio',
			key: 'ratio',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//利税表头
	// profitTaxColumn: [{
	// 		title: '利税（亿）',
	// 		dataIndex: 'profittaxval',
	// 		key: 'profittaxval',
	// 		width: 100,
	// 	},
	// 	{
	// 		title: '时间',
	// 		dataIndex: 'datatime',
	// 		key: 'datatime',
	// 		width: 100,
	// 	}
	// ],
	//注册用户
	registeredUserColumn: [{
			title: '用户量（万）',
			dataIndex: 'registernum',
			key: 'registernum',
			width: 100,
		},
		{
			title: '注册时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//农机设备数
	equipmentNumColumn: [{
			title: '设备数（台）',
			dataIndex: 'equipmentnum',
			key: 'equipmentnum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//农投品使用量
	agriculturalColumn: [{
			title: '农投品使用量（万吨）',
			dataIndex: 'usenum',
			key: 'usenum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],

	//农药农投品使用量
	pesticidesColumn: [{
			title: '农药农投品使用量（吨）',
			dataIndex: 'usenum',
			key: 'usenum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//化肥农投品使用量
	chemicalFertilizerColumn: [{
			title: '化肥农投品使用量（吨）',
			dataIndex: 'usenum',
			key: 'usenum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],

	//地标农产品
	landmarkColumn: [{
			title: '农产品名称',
			dataIndex: 'productname',
			key: 'productname',
			width: 100,
		},
		{
			title: '所在区县',
			dataIndex: 'areaname',
			key: 'areaname',
			width: 100,
		}
	],
	//农业总人口
	totalPopulationColumn: [{
			title: '人口数量（万人）',
			dataIndex: 'peoplenum',
			key: 'peoplenum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//规模以上企业
	enterpriseColumn: [{
			title: '企业名称',
			dataIndex: 'entname',
			key: 'entname',
			width: 100,
		},
		{
			title: '所属区县',
			dataIndex: 'areaname',
			key: 'areaname',
			width: 100,
		}
	],
	//耕地总面积
	cultivatedLandColumn: [{
			title: '耕地总面积（万公顷）',
			dataIndex: 'measurenum',
			key: 'measurenum',
			width: 100,
		},
		{
			title: '时间',
			dataIndex: 'datatime',
			key: 'datatime',
			width: 100,
		}
	],
	//涉农企业
	relatedColumn: [{
			title: '企业名称',
			dataIndex: 'entname',
			key: 'entname',
			width: 100,
		},
		{
			title: '所属区县',
			dataIndex: 'areaname',
			key: 'areaname',
			width: 100,
		}
	],
	//移动端统计-注册量、活跃度走势
	zclData: {
		barData: [25, 45, 45, 55, 55, 65, 40, 45, 45, 50],
		lineData: [42, 52, 60, 58, 70, 82, 45, 50, 60, 55],
		xDateTime: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10']
	},
	//移动端统计-用户类型占比
	userTypeData: {
		indicator: [{
				name: '农户',
				max: 25000
			},
			{
				name: '农机手',
				max: 25000
			},
			{
				name: '二手商 ',
				max: 25000
			},
			{
				name: '商户',
				max: 25000
			},
			{
				name: '农技专家',
				max: 25000
			},
			{
				name: '病虫害专家',
				max: 25000
			}
		],
		value: [4200, 12000, 25000, 22000, 20000, 24000]
	},
	//移动端统计-供需类型占比
	supplyDemandData: {
		"unit": "条",
		"colorArr": ["#0297ff", "#00cfff", "#2bfdb6", "#28dd5f", "#fffd04", "#20fd40"],
		"seriesData": [{
			"name": "需求发布",
			"value": 3500
		}, {
			"name": "供应发布",
			"value": 6500
		}]
	},
};
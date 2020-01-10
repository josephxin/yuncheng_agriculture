import React from 'react';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-affluent';

import './css/countrySide.scss';

//弹出框
import Dialog from '../../component/dialog/Dialog';

/*引入antd框架*/
import { Table, Button } from 'antd';

/*引入下拉选择框*/
import Select from '../../component/select/Select';

//引入组件
import Panel from '../../component/panel/Panel';
import Pie from './charts/Pie.js';
import UlList from './assembly/ulList.js'
import PieChart from './charts/pieCharts1.js';
import WordCloud from './charts/wordCloud';
import Bar from './charts/bar';

//地图
import CenterMap from '../../component/map-component/center-map/affluent_map';

//引入假数据
import demoData from './demoData.js';

/* 格式化参数 */
import { setParamsDay, setParamsMonth, setParamsYear, getCurrentYear, getNowDay, cloneFn, formatParams } from '../../tool/tool.js';

class affluent extends React.Component {
	constructor() {
		super();
		this.state = {
			showSelectData: false, //判断首页是否点击查询
			current: 1, //当前页码
			total: '', //总条数
			pageSize: 10, //每页显示条数
			ulList: [],
			pieValue: '',
			pieDataOne: demoData.pieDataOne,
			pieDataTwo: demoData.pieDataTwo,
			pieDataThree: demoData.pieDataThree,
			pieWaterFour: demoData.pieWaterFour,
			smallPie1: demoData.smallPie1,
			smallPie2: demoData.smallPie2,
			smallPie3: demoData.smallPie3,
			fourFirst: '', //高速出口-num
			households: { //企业列表-查询参数
				selectOne: '', //区县
				selectTwo: '', //乡
				selectThree: '' //村
			},
      detailId:'',
      detailType:'',
      secondLevel: demoData.secondLevel,//二级下钻页面面包屑导航
			wordCloudData: [],
			financeType: '', //金融-下钻-类型
      financeType2: '农业种植合作社', //村企业-下钻-类型
      detailContent:demoData.detailContent,
			regionList1: [], //企业列表-区县
			regionList2: [], //企业列表-乡镇
			regionList3: [], //企业列表-村
			regionList4: [], //金融服务网络占比-区县
			regionList5: [], //金融服务网络占比-乡镇
			regionList6: [], //金融服务网络占比-村
			regionList13: [], //主查询-区县
			regionList14: [], //主查询-乡镇
			regionList15: [], //主查询-村
			// 列表表头
      enterpriseColumns: [//企业列表表头
        {
          title: '村名',
          dataIndex: 'cun',
          key: 'cun',
          width: 90,
        },
        {
          title: '负责人',
          dataIndex: 'head',
          key: 'head',
          width: 75,
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          width: 100,
        },
        {
          title: '经营产品',
          dataIndex: 'products',
          key: 'products',
          width: 100,
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100,
        },
        {
          title: '联系方式',
          dataIndex: 'tel',
          key: 'tel',
          width: 100,
        },
        {
          title: '操作',
          key: '操作',
          width: 80,
          render: (text, record) => (
            <span><a onClick={this.lookPage.bind(this, '企业详情',text)} className={'look-text'}>查看</a></span>
          )
        }

      ],
			enterpriseDataSource: [],
			financeColumns: demoData.financeColumns,
			financeDataSource: [],
			total_output: 0,
		};
    this.locale = {
      emptyText: '暂无数据',
    };
		this._tokens = [];
		this.regionType = ['1', '2', '3'];
	};


	/**
	 * 首页图表接口
	 */
	/**农业经济与GDP占比*/
	selectAgriculturalecoAndGdpPro() {
		this._tokens.push(api.selectAgriculturalecoAndGdpPro.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('农业经济与GDP占比', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: parseFloat(item.percent)
				});
			});
			let options = {
				seriesData: series,
				onlyShowPercent: true
			};
			this.pieWaterOne.setData(options);
		}));
	};

	/**生产资料市场信息*/
	overviewStatistics() {
		this._tokens.push(api.overviewStatistics.send({
			starttime: '',
			endtime: '',
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('生产资料市场信息', res);
			let series = [];
			if(!res.data || res.data.length == 0) {
				this.state.setData({
					wordCloudData: []
				});
			} else {
				res.data.map((item, i) => {
					if(item.name !== '') {
						let itemArr = {
							name: item.type,
							value: item.number
						};
						series.push(itemArr)
					}
				});
				this.state.wordCloudData = series.slice(0, 20);
				this.bubbleWordCloud && this.bubbleWordCloud.setData(this.state.wordCloudData);
			}
		}));
	}

	/**基本生活服务数据*/
	selectBasiclivingServices() {
		this._tokens.push(api.selectBasiclivingServices.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('基本生活服务数据', res);
			if(res.data.length > 0 && res.data) {
				let valueOne = (res.data[0].percent).substr(0, res.data[0].percent.length - 1);
				let nameOne = res.data[0].type;
				this.setState({
					smallPie1: {
						name: valueOne,
						value: nameOne,
						left: '30%'
					}
				});
				let valueTwo = (res.data[1].percent).substr(0, res.data[1].percent.length - 1);
				let nameTwo = res.data[1].type;
				this.setState({
					smallPie2: {
						name: valueTwo,
						value: nameTwo,
						left: '37%'
					}
				});
				let valueThree = (res.data[2].percent).substr(0, res.data[2].percent.length - 1);
				let nameThree = res.data[2].type;
				this.setState({
					smallPie3: {
						name: valueThree,
						value: nameThree,
						left: '33%'
					}
				});
				this.pieRefOne.setData(this.state.smallPie1);
				this.pieRefTwo.setData(this.state.smallPie2);
				this.pieRefThree.setData(this.state.smallPie3);
			}
		}));
	}

	/**通公路未通公路*/
	selectHighwayAndNoway() {
		this._tokens.push(api.selectHighwayAndNoway.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('通公路未通公路', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: parseFloat(item.percent)
				});
			});
			let options = {
				seriesData: series,
				onlyShowPercent: true
			};
			this.pieWaterFour.setData(options);
		}));
	}

	/**高速出口*/
	selectHighspeedExit() {
		this._tokens.push(api.selectHighspeedExit.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('高速出口', res);
			if(res.data != {} && res.data) {
				this.setState({
					fourFirst: res.data.num,
				});
			}
		}));
	}

	/**金融服务网点占比*/
	selectFinancialServiceOsPro() {
		this._tokens.push(api.selectFinancialServiceOsPro.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('金融服务网点占比', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: parseFloat(item.percent)
				});
			});
			let options = {
				seriesData: series,
				onlyShowPercent: true
			};
			this.pieWaterThree.setData(options);
		}));
	}

	/**村企业分布*/
  selectVillageEnterpriseAllList() {
		this._tokens.push(api.selectVillageEnterpriseAllList.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('村企业分布', res);
			if(res.data.length > 0 && res.data) {
				let dataList = [];
				let datas=res.data.slice(0,30);
				datas.forEach((item, index) => {
					dataList.push({
						name: item.name,
						address: item.quxian
					})
				});
				this.refs.ulList.setData({
					ulList: dataList
				});
			}
		}));
	}

	/**产量占比分析*/
	selectOutputProportion() {
		this._tokens.push(api.selectOutputProportion.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('产量占比分析', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.sum
				});
			});
			let options = {
				seriesData: series
			};
			this.pieWaterTwo.setData(options);
		}));
	}

	//道路硬化方式
	getSelectRoadHardening() {
		this._tokens.push(api.selectRoadHardening.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('道路硬化方式', res);
			let data = res.data;
			let chartData = [
				[],
				[],
				[],
				[]
			];
			data.map((item, i) => {
				chartData[0].push(item.shuiliNum || 0);
				chartData[1].push(item.liqingNum || 0);
				chartData[2].push(item.shashiNum || 0);
				chartData[3].push(item.qitaNum || 0);
			});
			this.barRef.setData(chartData);
		}));
	}

	//农业生产数据-地图
	centerMap() {
		this._tokens.push(api.selectAgriculturalProductionData.send({
			quxian: this.state.households.selectOne
		}).then((res) => {
			if(window.debugging) console.log('中间地图', res);
			let data = res.data || [];
			let mapData = [];
			this.setState({
				total_output: data[data.length - 1].output
			});
			let needData = data.slice(0, data.length - 1);
			needData.map((item, i) => {
				mapData.push({
					name: item.quxian,
					value: item.output,
				})
			});
			this._centerMapRef._setData(mapData);
		}));
	}
	//打开gis地图
	gisMapShow(d) {
		// console.log(d.name);
		let me = this;
		let name = d.name;
		me.siteSelectChange(2, d); //调用主筛选
		this.showNewPage();
		this.setState({
			showSelectData: true
		});
	}

	/**
	 * 下钻页面
	 */
	// 村企业分布-一级下钻页面企业列表
  selectVillageEnterpriseList() {
		this._tokens.push(api.selectVillageEnterpriseList.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
      type:this.state.financeType2,
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('企业列表-下钻页面', res);
      console.log('企业列表-下钻页面', res);
			if(res.list.length > 0 && res.list) {
				this.setState({
					total: res.total,
					enterpriseDataSource: res.list
				});
			} else {
				this.setState({
					total: 0,
					enterpriseDataSource: []
				});
			}
		}));
	}

  // 村企业分布-二级下钻页面企业详情
  selectVillageEnterpriseDetail(id,type) {
    this._tokens.push(api.selectVillageEnterpriseDetail.send({
      id: id,
      type:type
    }).then((res) => {
      if(window.debugging) console.log('企业详情-下钻页面', res);
      let data = res.data;
      if(data==null||data=={}){
        this.setState({
          detailContent:{
            detailName:'', detailTypes:'', detailHead:'', detailTel:'', detailLongitude:'', detailLatitude:'', detailOperationScale:'', detailIntroduction:'', detailProducts:''
          },
        });
      }else {
        this.setState({
          detailContent:{
            detailName:data.name?data.name:'',
            detailTypes:data.type?data.type:'',
            detailHead:data.head?data.head:'',
            detailTel:data.tel?data.tel:'',
            detailLongitude:data.longitude?data.longitude:'',
            detailLatitude:data.latitude?data.latitude:'',
            detailOperationScale:data.operationScale?data.operationScale:'',
            detailIntroduction:data.introduction?data.introduction:'',
            detailProducts:data.products?data.products:'',
          }
        });
      }
    }));
  }

  //金融服务网点
	selectFinance() {
		this._tokens.push(api.selectFinancial.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
			type: this.state.financeType,
			pageNum: this.state.current,
			pageSize: this.state.pageSize,
		}).then((res) => {
			if(window.debugging) console.log('金融-下钻页面', res);
			if(res.list.length > 0 && res.list) {
				this.setState({
					total: res.total,
					financeDataSource: res.list
				});
			} else {
				this.setState({
					total: 0,
					financeDataSource: []
				});
			}
		}));
	}

	/**
	 * 弹框-打开、关闭事件
	 * */
  //关闭弹框所用到的公共处理方法
  selectChildMethod(){
    this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    this.siteSelectRef14._setList(['全部']); //乡镇村人口数-村
    this.siteSelectRef15._setList(['全部']); //乡镇村人口数-乡镇
    this.showNewPage(); //重新加载页面数组，默认参数传空
  }
  //关闭下钻页面后清空所有的select选中值
  selectRefAll() {
    this.siteSelectRef13._setList([]); //主-村
    this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
    this.siteSelectRef14._setList([]); //主-乡镇
    this.siteSelectRef15._setList([]); //主-村
    this.siteSelectRef1._setList([]); //企业列表-区县
    this.siteSelectRef4._setList([]); //企业列表-村
    this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
    this.siteSelectRef2._setList([]); //企业列表-村
    this.siteSelectRef3._setList([]); //企业列表-乡镇
    this.siteSelectRef5._setList([]); //金融服务网点占比-村
    this.siteSelectRef6._setList([]); //金融服务网点占比-乡镇
    this.setState({//清空下钻的所有下拉菜单及输入框内容
      households: {selectOne: '', selectTwo: '', selectThree: ''},
      financeType:'',
      financeType2:'农业种植合作社',
      current: 1,
      showSelectData: false
    })
  }

	//企业列表-打开弹窗
	countrySideBig1(t) {
		const me = this;
		me.refs.dialogRef1._open(t);
		if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
			this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
			this.siteSelectRef1._setList([]); //区县
			this.siteSelectRef2._setList(['全部']); //村
			this.siteSelectRef3._setList(['全部']); //乡镇
      this.siteSelectRefs2._setSelectedText(['农业种植合作社']); //下钻-类型默认显示全部
			this.selectNewData('', '', ''); //当区县不为全部的时候，后两个参数都传空
		}
    this.selectChange2(); //类型
		this.selectVillageEnterpriseList();
	}

	//企业列表-关闭弹窗
	dialogClose1() {
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: '',
        selectTwo: '',
        selectThree: '',
      },
      detailId:'',
      detailType:''
    });
		this.selectRefAll();
    this.selectChildMethod();
  }

  //企业列表-二级下钻查看页面
  lookPage(a, t) {
    this.refs.dialogRef11._open(a);
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: t.quxian,
        selectTwo: t.xiangzhen,
        selectThree: t.cun,
      },
      detailId:t.id,
      detailType:t.type
    });
    this.selectVillageEnterpriseDetail(t.id,t.type);
  }

  //企业列表--二级下钻查看页面-关闭弹窗
  dialogClose11(){//关闭下钻页面，数据保留原始状态
    this.setState({
      detailContent:{
        detailName:'', detailTypes:'', detailHead:'', detailTel:'', detailLongitude:'', detailLatitude:'', detailOperationScale:'', detailIntroduction:'', detailProducts:''
      },
    });
  }

	//金融服务网点占比-打开弹窗
	countrySideBig2(t) {
		const me = this;
		me.refs.dialogRef2._open(t);
		if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
			this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
			this.siteSelectRef4._setList([]); //区县
			this.siteSelectRef5._setList(['全部']); //村
			this.siteSelectRef6._setList(['全部']); //乡镇
      this.siteSelectRefs._setSelectedText(['全部']); //下钻-类型默认显示全部
			this.selectNewData('', '', ''); //当区县不为全部的时候，后两个参数都传空
		}
		this.selectChange(); //类型
		this.selectFinance();
	}

	//金融服务网点占比-关闭弹窗
	dialogClose2() {
		this.selectRefAll();
    this.selectChildMethod();
	}

	/**
	 * 下钻页面-查询
	 */
	handleClick1() { //企业列表
		this.selectVillageEnterpriseList();
	}

	handleClick2() { //金融
		this.selectFinance();
	}

	handleClicks() { //主筛选
		this.showNewPage();
		this.setState({
			showSelectData: true
		});
	}

	/**
	 * 分页
	 * */
	//下钻-企业列表
	changePage1 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectVillageEnterpriseList()
		})
	};

	//下钻-金融
	changePage2 = (page) => {
		this.setState({
			current: page,
		}, () => {
			this.selectFinance()
		})
	};

	//总区县下拉
	getQuXian() {
		this._tokens.push(apiAll.getQuXian.send({}).then((res) => {
			if(window.debugging) console.log('主页面-区县下拉', res);
			if(res.data.length > 0 && res.data) {
				this.setState({
					regionList13: res.data
				});
				this.state.regionList13.unshift('全部');
				this.siteSelectRef13._setList(this.state.regionList13); //主-区县
				//企业列表
				this.state.regionList1.unshift('全部');
				this.siteSelectRef1._setList(this.state.regionList13); //区县
				//金融
				this.siteSelectRef4._setList(this.state.regionList13); //区县
			} else {
				this.setState({
					regionList13: []
				});
			}
		}));
	}

	//总乡镇下拉
	getXiangZhen(d) {
		this._tokens.push(apiAll.getXiangZhen.send({
			XqName: d
		}).then((res) => {
			if(window.debugging) console.log('主页面-总乡镇下拉', res);
			if(res.data.length > 0 && res.data) {
				this.setState({
					regionList14: res.data
				});
				this.state.regionList14.unshift('全部');
				this.siteSelectRef14._setList(this.state.regionList14); //主-乡镇
				//企业列表
				this.state.regionList2.unshift('全部');
				this.siteSelectRef2._setList(this.state.regionList14); //乡镇
				//金融
				this.siteSelectRef5._setList(this.state.regionList14); //乡镇
			} else {
				this.setState({
					regionList14: []
				});
			}
		}));
	}

	//总村下拉
	getAllCun(d) {
		this._tokens.push(apiAll.getAllCun.send({
			XzName: d
		}).then((res) => {
			if(window.debugging) console.log('主页面-总村下拉', res);
			if(res.data.length > 0 && res.data) {
				this.setState({
					regionList15: res.data
				});
				this.state.regionList15.unshift('全部');
				this.siteSelectRef15._setList(this.state.regionList15); //主-村
				//企业列表
				this.state.regionList3.unshift('全部');
				this.siteSelectRef3._setList(this.state.regionList15); //村
				//金融
				this.state.regionList6.unshift('全部');
				this.siteSelectRef6._setList(this.state.regionList15); //村
			} else {
				this.setState({
					regionList15: [],
				});
			}
		}));
	}

	//下拉菜单切换，改变传递参数值
	selectNewData(a, b, c) {
		let households = this.state.households;
		households.selectOne = a;
		households.selectTwo = b;
		households.selectThree = c;
		this.setState({
			households: households
		});
	}



	//金融下钻-类型数据（暂时写死，全部的时候传空）
	selectChange(val) {
		this.siteSelectRefs._setList(['全部', '农商银行', '邮政网点']);
		if(val) {
			if(val.name == '全部') {
				this.setState({
					financeType: ''
				});
			} else {
				this.setState({
					financeType: val.name
				});
			}
		}
	}

  //村企业分布下钻-类型数据（暂时写死，全部的时候传空）
  selectChange2(val) {
    this.siteSelectRefs2._setList(['农业种植合作社', '种植大户', '农业养殖合作社','企业', '主导企业', '一村一品']);
    if (val) {
      this.setState({
        financeType2: val.name
      });
    }
  }

	/**
	 * 弹框-区县乡镇下拉菜单
	 * */
	siteSelectChange(type, e) {
		if(type == this.regionType[1]) { //主-区县
			if(e.name == "全部") {
				e.name = "";
				this.selectNewData('', '', ''); //当区县为全部的时候，三个参数都传空
        this.siteSelectRef13._setSelectedText(['全部']); //区县
				this.siteSelectRef14._setList(['全部']); //主-乡
				this.siteSelectRef15._setList(['全部']); //主-村
				//企业列表
				this.siteSelectRef2._setList(['全部']); //乡
				this.siteSelectRef3._setList(['全部']); //村
				//金融
				this.siteSelectRef5._setList(['全部']); //乡
				this.siteSelectRef6._setList(['全部']); //村
			} else {
				this.selectNewData(e.name, '', ''); //当区县不为全部的时候，后两个参数都传空
				this.siteSelectRef13._setSelectedText([e.name]); //区县
				this.siteSelectRef14._setList([]); //主-乡镇
				this.siteSelectRef15._setList(['全部']); //主-村
				//企业列表
				this.siteSelectRef1._setSelectedText([e.name]); //区县
				this.siteSelectRef2._setList([]); //乡镇
				this.siteSelectRef3._setList(['全部']); //村
				//金融
				this.siteSelectRef4._setSelectedText([e.name]); //区县
				this.siteSelectRef5._setList([]); //乡镇
				this.siteSelectRef6._setList(['全部']); //村
				//调用获取乡镇数据的方法
				this.getXiangZhen(e.name);
			}
		}
		if(type == this.regionType[2]) { //主-乡镇
			if(e.name == "全部") {
				e.name = "";
				let households = this.state.households;
				households.selectTwo = '';
				households.selectThree = '';
				this.setState({
					households: households
				});
				this.siteSelectRef15._setList([]); //主-村
				//企业列表
				this.siteSelectRef2._setSelectedText(['全部']); //乡
				this.siteSelectRef3._setList([]); //村
				//金融
				this.siteSelectRef5._setSelectedText(['全部']); //乡
				this.siteSelectRef6._setList([]); //村
			} else {
				let households = this.state.households;
				households.selectTwo = e.name;
				households.selectThree = '';
				this.setState({
					households: households
				});
				//首页选择下拉菜单搜索后，下钻页面赋值
				//企业列表
				this.siteSelectRef2._setSelectedText([e.name]); //乡
				//金融
				this.siteSelectRef5._setSelectedText([e.name]); //乡
				//当前菜单再次选中当前值，村显示全部
				this.siteSelectRef3._setList([]); //村
				this.siteSelectRef6._setList([]); //村
				this.siteSelectRef15._setList([]); //主-村
				//调用获取村数据的方法
				this.getAllCun(e.name);
			}
		}
		if(type == this.regionType[3]) { //主-村
			if(e.name == "全部") {
				e.name = "";
				let households = this.state.households;
				households.selectThree = e.name;
				this.setState({
					households: households
				});
				//企业列表
				this.siteSelectRef3._setSelectedText(['全部']); //村
				//金融
				this.siteSelectRef6._setSelectedText(['全部']); //村
			} else {
				let households = this.state.households;
				households.selectThree = e.name;
				this.setState({
					households: households
				});
				//企业列表
				this.siteSelectRef3._setSelectedText([e.name]); //村
				//金融
				this.siteSelectRef6._setSelectedText([e.name]); //村
			}
		}
	}

	// 关闭弹窗-刷新页面
	showNewPage() {
		this.selectAgriculturalecoAndGdpPro(); //农业经济与GDP占比
		this.overviewStatistics(); //生产资料市场信息
		this.selectVillageEnterpriseAllList(); //村企业分布
		this.selectFinancialServiceOsPro(); //金融服务网点占比
		this.selectBasiclivingServices(); //基本生活服务数据
		this.selectHighwayAndNoway(); //通公路未通公路
		this.selectHighspeedExit(); //高速出口
		this.selectOutputProportion(); //产量占比分析
		this.getSelectRoadHardening(); //道路硬化方式
		//this.centerMap();// 中间地图
	}

	componentDidMount() {
		this.getQuXian(); //总区县
		this.centerMap(); // 中间地图
		this.showNewPage();
		//主-查询
		this.siteSelectRef14._setList(['全部']);
		this.siteSelectRef15._setList(['全部']);
	};

	componentWillUnmount() {
		this._clearTokens();
	};

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};

	render() {
		const me = this;
		return(
			<div className={'affluent'}>
        {/*农业经济GDP占比*/}
        <Panel title={'农业经济与GDP占比'} width={465} height={270} top={130} left={30} type={0}>
          <div className={'agriculture-box'}>
            <Pie ref={ref => this.pieWaterOne = ref}/>
          </div>
        </Panel>

        {/*生产资料市场信息*/}
        <Panel title={'生产资料市场信息'} width={465} height={270} top={430} left={30} type={0}>
          <div className={'production-box'}>
            <WordCloud ref={ref => this.bubbleWordCloud = ref} height={240} tooltip={true} />
          </div>
        </Panel>

        {/*基本生活服务数据*/}
        <Panel title={'基本生活服务数据'} width={1285} height={310} top={700} left={30} type={0}>
          <div className={'life-box'}>
            <div className={'life-one'}>
              <PieChart width={200} height={160} top={45} left={141} ref={ref => this.pieRefOne = ref}/>
              <PieChart width={200} height={160} top={160} left={10} ref={ref => this.pieRefTwo = ref}/>
              <PieChart width={200} height={160} top={160} left={265} ref={ref => this.pieRefThree = ref}/>
            </div>
            <div className={'life-four'}>
              <div className={'four-box'}>
                <p>{this.state.fourFirst}<span className={'text-company'}>个</span></p>
                <p>高速出口</p>
              </div>
            </div>
            <div className={'life-two'}>
							<Bar ref={ref=>this.barRef=ref} />
            </div>
            <div className={'life-three'}>
              <Pie orient={'horizontal'} ref={ref => this.pieWaterFour = ref} />
            </div>
          </div>
        </Panel>

        {/*全局搜索框*/}
        <div className={'selectBox'}>
          <span style={{color: '#00ffe4', fontSize: 14}}>区域检索条件：</span>
          <Select left={140} width={135} ref={(ref) => {this.siteSelectRef13 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
          <span className={'selectSpan'} style={{left: 280}}>区县</span>
          <Select left={345} width={135} ref={(ref) => {this.siteSelectRef14 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
          <span className={'selectSpan'} style={{left: 485}}>乡</span>
          <Select left={535} width={135} ref={(ref) => {this.siteSelectRef15 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
          <span className={'selectSpan'} style={{left: 675}}>村</span>
          <Button type="primary" style={{position: 'absolute', right: 0, top: 5,zIndex: 100}} onClick={this.handleClicks.bind(this)}>查询</Button>
        </div>

        {/*农业生产数据-中间地图*/}
        <Panel title={'农业生产数据'} width={825} height={575} top={200} left={530} type={0}>
          <div className={'agricultural_production_data'}>
          	<div className={'total_output'}><p>运城市总产量：</p><span><span>{me.state.total_output}</span> 吨</span></div>
          	<CenterMap style={{ width: '825px', height: '455px' }} mapClickHandle={this.gisMapShow.bind(this)} ref={ref => { this._centerMapRef = ref; }}/>
          </div>
        </Panel>

        {/*产量占比分析*/}
        <Panel title={'产量占比分析'} width={465} height={270} top={130} left={1430} type={0}>
          <div className={'yield-box'}>
            <Pie unit={'吨'} ref={ref => this.pieWaterTwo = ref}/>
          </div>
        </Panel>

        {/*金融服务网店占比*/}
        <Panel title={'金融服务网点占比'} width={465} height={270} top={430} left={1430} type={1} onClick={this.countrySideBig2.bind(this, '金融服务网点')}>
          <div className={'finance-box'}>
            <Pie ref={ref => this.pieWaterThree = ref}/>
          </div>
        </Panel>

        {/*金融服务网店占比-弹框*/}
        <Dialog title={'金融服务网点'} ref={'dialogRef2'} close={me.dialogClose2.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef4 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef5 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef6 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{position: 'absolute',left: 635,fontSize: '18px'}}>类型：</span>
              <Select left={700} ref={(ref) => {this.siteSelectRefs = ref;}} onSelectChange={this.selectChange.bind(this)}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick2.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={financeDataSource => financeDataSource.id} width={1100} columns={this.state.financeColumns} dataSource={this.state.financeDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage2,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*村企业分布*/}
        <Panel title={'村企业分布'} width={465} height={290} top={700} left={1430} type={1} onClick={this.countrySideBig1.bind(this, '企业列表')}>
          <div className={'enterprise-box'}>
            <div className={'enterprise-table'}>
              <UlList ref={'ulList'} width={460} height={240} top={30}/>
            </div>
          </div>
        </Panel>

        {/*村企业分布弹框*/}
        <Dialog title={'企业列表'} ref={'dialogRef1'} close={me.dialogClose1.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef1 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef2 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef3 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{position: 'absolute',left: 635,fontSize: '18px'}}>类型：</span>
              <Select width={200} left={700} ref={(ref) => {this.siteSelectRefs2 = ref;}} onSelectChange={this.selectChange2.bind(this)}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick1.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={enterpriseDataSource => enterpriseDataSource.id} width={1100} columns={this.state.enterpriseColumns} dataSource={this.state.enterpriseDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage1,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*村企业分布二级查看弹框dialogRef44*/}
        <Dialog title={'企业详情'} ref={'dialogRef11'} close={me.dialogClose11.bind(me)}>
          <div  className={'detail-box'}>
            <div className={'detail-title'}>
              {this.state.secondLevel.selectOne!=''?<p>运城市</p>:<p>运城市</p>}
              {this.state.secondLevel.selectOne!=''?<p><span>></span>{this.state.secondLevel.selectOne}</p>:this.state.secondLevel.selectOne}
              {this.state.secondLevel.selectTwo!=''?<p><span>></span>{this.state.secondLevel.selectTwo}</p>:this.state.secondLevel.selectTwo}
              {this.state.secondLevel.selectThree!=''?<p><span>></span>{this.state.secondLevel.selectThree}</p>:this.state.secondLevel.selectThree}
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>基础信息</p>
              <ul className={'detail-ul'}>
                <li><span>名称：</span><span>{this.state.detailContent.detailName}</span></li>
                <li><span>类型：</span><span>{this.state.detailContent.detailTypes}</span></li>
                <li><span>负责人：</span><span>{this.state.detailContent.detailHead}</span></li>
                <li><span>联系方式：</span><span>{this.state.detailContent.detailTel}</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>经度：</span><span>{this.state.detailContent.detailLongitude}</span></li>
                <li><span>纬度：</span><span>{this.state.detailContent.detailLatitude}</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>企业规模：</span><span>{this.state.detailContent.detailOperationScale}</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>企业简介：</span><span>{this.state.detailContent.detailIntroduction}</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>经营产品/种植面积/经营产品及规模：</span><span>{this.state.detailContent.detailProducts}</span></li>
              </ul>
            </div>
          </div>
        </Dialog>
      </div>
		)
	}
}

export default affluent;
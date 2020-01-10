import React from 'react';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-ecology';

import './css/countrySide.scss';

//弹出框
import Dialog from '../../component/dialog/Dialog';

/*引入antd框架*/
import { Table, Carousel, Button,Checkbox } from 'antd';

/*引入下拉选择框*/
import Select from '../../component/select/Select';

//引入假数据
import demoData from './demoData.js';

//引入组件
import Panel from '../../component/panel/Panel';
import ServiceTrendsBar from "./charts/serviceTrendsBar";
import RadarCharts from './charts/radarCharts';
import Pie from './charts/Pie.js';
import WordCloud from './charts/wordCloud';

//气泡图
import PageBubbleChart from '../../component/circle-ball/Page-BubbleChart';
//地图
import CenterMap from '../../component/map-component/center-map/yuncheng_bubble';

class ecology extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 1, //当前页码
			total: '', //总条数
			pageSize: 10, //每页显示条数
			ulList: [],
			households: { //查询参数
				selectOne: '', //区县
				selectTwo: '', //乡
				selectThree: '' //村
			},
      showSelectData: false, //判断首页是否点击查询
      secondLevel: demoData.secondLevel,//二级下钻页面面包屑导航
      regionList1: [],
      regionList2: [],
      regionList3: [],
      regionList4: [],
      regionList5: [],
      regionList6: [],
      regionList13: [],
      regionList14: [],
      regionList15: [],
			pieDataOne: demoData.pieDataOne,
			pieDataTwo: demoData.pieDataTwo,
			dialogRefOne: demoData.dialogRefOne,
      dialogRefTwo:'',//特色旅游风景村下钻内容
      //复选框组
      ecologyDisabledOne:demoData.ecologyDisabledOne,
      ecologyDisabledTwo:demoData.ecologyDisabledTwo,
      ecologyDisabledThree:demoData.ecologyDisabledThree,
      ecologyDisabledFour:demoData.ecologyDisabledFour,
      arrOne:[],
      arrTwo:[],
      arrThree:[],
      arrFour:[],
      mushu:'',//未耕种土地情况-亩数
      yanjianmu: '',
      shuituliushimu: '',
      genzuocengqianmu: '',
      turangsuanhuamu: '',
      yanjianbi:'',
      shuituliushibi:'',
      gengzuocengqianbi:'',
      turangsuanhuabi:'',
    	imgList: [],
      url: window.location.href.substring(7, 16),
      areaNum: 0, //耕地利用情况-年末耕地面积
      // 表头
      leisureTimeColumns:demoData.leisureTimeColumns,//休闲娱乐
      leisureTimeDataSource:[],
      cultivatedLandColumns:[//耕地
        {
          title: '区县',
          dataIndex: 'quxian',
          key: 'quxian',
          width: 100,
        },
        {
          title: '乡镇',
          dataIndex: 'xiangzhen',
          key: 'xiangzhen',
          width: 100,
        },
        {
          title: '村',
          dataIndex: 'cun',
          key: 'cun',
          width: 100,
        },{
          title: '耕地总亩数（亩）',
          dataIndex: 'total_mu',
          key: 'total_mu',
          width: 100,
        },
        {
          title: '操作',
          key: '操作',
          width: 80,
          render: (text, record) => (
            <span><a onClick={this.lookPage.bind(this, '耕地基本情况',text)} className={'look-text'}>查看</a></span>
          )
        }
      ],
      cultivatedLandDataSource:[],
      dialogName:''
		};
    this.locale = {
      emptyText: '暂无数据',
    };
		this._tokens = [];
		this.regionType = ['1', '2', '3'];
		this.filePath = '/file/getPhoto?filename=';
	};
	componentWillUnmount() {
		this._clearTokens();
	};

	//清除所有接口
	_clearTokens() {
		this._tokens.forEach(token => token.cancel());
		this._tokens = [];
	};

	/**
	 * 首页图表接口
	 */
	/**污水排放方式*/
	selectSewageDischargeMode() {
		this._tokens.push(api.selectSewageDischargeMode.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('污水排放方式', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.num
				});
			});
			let options = {seriesData: series};
			this.pieWaterOne.setData(options);
		}));
	};

	/**生活垃圾处理方式*/
	selectDomesticWasteTreatment() {
		this._tokens.push(api.selectDomesticWasteTreatment.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('生活垃圾处理方式', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.num
				});
			});
			let options = {seriesData: series};
			this.pieWaterTwo.setData(options);
		}));
	}

	/*特色景观旅游名村*/
	getTsjglymcData() {
		this._tokens.push(api.selectTourismNameVillage.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('特色景观旅游名村', res);
			let data = res.data || [];
			let chartData = [];
			data.map((item, i) => {
				chartData.push({
					name: item.cun,
					quxian:item.quxian,
					xiangzhen:item.xiangzhen,
					value: Math.random()
				});
			});
			this.wordCloudRef.setData(chartData.slice(0, 30));
		}));
	}

	/*耕地利用情况-年末耕地面积*/
	getSelectCultivatedLandAreaData() {
		this._tokens.push(api.selectCultivatedLandArea.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('耕地利用情况-年末耕地面积', res);
      let data = res.data;
      if(data==null||data=={}){
        this.setState({
          areaNum: '0'
        });
      }else {
        this.setState({
          areaNum: data.areaNum
        });
      }
		}));
	}

	/*耕地利用情况-耕地问题*/
	selectArableLandProblem() {
		this._tokens.push(api.selectArableLandProblem.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('耕地利用情况-耕地问题', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.num
				});
			});
			let options = {
				seriesData: series
			};
			this.pieWaterThree.setData(options);
		}));
	}

	/*耕地利用情况-旱地水浇地*/
	getSelectDryLandWateringData() {
		this._tokens.push(api.selectDryLandWatering.send({
			quxian: this.state.households.selectOne,
			xiangzhen: this.state.households.selectTwo,
			cun: this.state.households.selectThree,
		}).then((res) => {
			if(window.debugging) console.log('耕地利用情况-旱地水浇地', res);
			let data = res.data || [];
			let series = [];
			data.map((item, i) => {
				series.push({
					name: item.type,
					value: item.num
				});
			});
			let options = {seriesData: series};
			this.pieWaterFour.setData(options);
		}));
	}

  //休闲娱乐统计
  selectRecreationEntertainment() {
    this._tokens.push(api.selectRecreationEntertainment.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then(res => {
      if(window.debugging) console.log('休闲娱乐统计', res);
      let data = res.data || [];
      let xData = [];
      let seriousData = [];
      data.forEach((item, index) => {
        xData.push(item.type);
        seriousData.push(item.num)
      });
      let options = {
        xData: xData,
        seriousData: seriousData,
        interval: 0,
        rotate: 45,
      };
      this.barFef.setData(options)
    }))
  }

  //地形地貌分析
  selectLandformanalysis() {
    this._tokens.push(api.selectLandformanalysis.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      if(window.debugging) console.log('地形地貌分析', res);
      if(res.data.length>0 && res.data) {
        let IData = {indicator: [], value: []};
        let max = 0;
        let data = res.data[0];
        //获取对象中的最大值
        for(let key in data) {
          if(max < data[key]) {
            max = data[key];
          }
        }
        for(let key in data) {
          IData.indicator.push({name: key, max: max});
          IData.value.push(data[key]);
        }
        this.populationRadarRef.setData(IData);
      }
    }));
  }

  /**县域特色*/
  selectCountyCharacteristics() {
    this._tokens.push(api.selectCountyCharacteristics.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      if(window.debugging) console.log('县域特色', res);
      let content = res.data || [];
      let ppnpRotationChartData = [];
      let iconArr = [];
      content.map((item, i) => {
        let url = this.state.url == 'localhost' ? window.BASEURL_01 + this.filePath : this.filePath;
        ppnpRotationChartData.push({
          name: item.brand_name,
          text: item.brand_introduce,
          url: url + item.icon_url,
          title:item.quxian,
        });
      });
      this.setState({
        imgList: ppnpRotationChartData
      });
    }));
  };

  /**
   * 下钻页面
   */
  /**耕地基本情况*/
  selectLandList() {
    this._tokens.push(api.selectLandList.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      pageNum: this.state.current,
      pageSize: this.state.pageSize
    }).then((res) => {
      if (window.debugging) console.log('耕地基本情况', res);
      res.list.forEach((item, index) => {
        item.id = index
      });
      if (res.list.length > 0 && res.list) {
        this.setState({
          total: res.total,
          cultivatedLandDataSource: res.list
        });
      } else {
        this.setState({
          total: 0,
          cultivatedLandDataSource: []
        });
      }
    }));
  }

  /**耕地基本情况-二级下钻页面*/
  selectLandDetail(a,b,c) {
    this._tokens.push(api.selectLandDetail.send({
      quxian: a,
      xiangzhen: b,
      cun: c,
    }).then((res) => {
      if (window.debugging) console.log('耕地基本情况二级', res);
      if(res.data!=null||res.data != {}) {
        let datas=res.data;
        //复选框组-主要土壤类型
        this.state.ecologyDisabledOne.forEach((item,index)=>{
          if(index=='3'&& res.data.qita!=null){
            item.label=item.label + ' ' +datas.qita;
          }
        });
        //复选框组-未耕种土地情况-未用于耕种原因
        this.state.ecologyDisabledTwo.forEach((item,index)=>{
          if(index=='2'){
            item.label=item.label + ' ' + datas.tuigenghuanlinmushu+'亩';
          }
        });
        //复选框组-耕地问题类型和亩数
        this.state.ecologyDisabledThree.forEach((item,index)=>{
          if(index=='0'){
            item.label=item.label + ' ' + datas.yanjianmu+'亩';
          }else if(index=='1'){
            item.label=item.label + ' ' + datas.shuituliushimu+'亩';
          }else if(index=='2'){
            item.label=item.label + ' ' + datas.genzuocengqianmu+'亩';
          }else if(index=='3'){
            item.label=item.label + ' ' + datas.turangsuanhuamu+'亩';
          }
        });
       //复选框组-主要问题耕地占比
        this.state.ecologyDisabledFour.forEach((item,index)=>{
          if(index=='0'){
            item.label=item.label + ' 占比' + datas.yanjianbi+'%';
          }else if(index=='1'){
            item.label=item.label + ' 占比' + datas.shuituliushibi+'%';
          }else if(index=='2'){
            item.label=item.label + ' 占比' + datas.gengzuocengqianbi+'%';
          }else if(index=='3'){
            item.label=item.label + ' 占比' + datas.turangsuanhuabi+'%';
          }
        });
        this.setState({
          arrOne: datas.turangleixing?datas.turangleixing:[],//主要土壤类型-选中
          arrTwo: datas.weigengzhongyuanyin?datas.weigengzhongyuanyin:[],//未耕种土地情况-选中
          mushu:datas.weigengzhongmushu?datas.weigengzhongmushu:'0',//未耕种土地情况-亩数
          arrThree: datas.gengdiwentileiixn?datas.gengdiwentileiixn:[],//耕地问题类型和亩数-选中
          yanjianmu: datas.yanjianmu?datas.yanjianmu:'0',
          shuituliushimu: datas.shuituliushimu?datas.shuituliushimu:'0',
          genzuocengqianmu: datas.genzuocengqianmu?datas.genzuocengqianmu:'0',
          turangsuanhuamu: datas.turangsuanhuamu?datas.turangsuanhuamu:'0',
          arrFour: datas.gengdiwentizhanbi?datas.gengdiwentizhanbi:[],//主要问题耕地占比-选中
          yanjianbi:datas.yanjianbi?datas.yanjianbi:'0',
          shuituliushibi:datas.shuituliushibi?datas.shuituliushibi:'0',
          gengzuocengqianbi:datas.gengzuocengqianbi?datas.gengzuocengqianbi:'0',
          turangsuanhuabi:datas.turangsuanhuabi?datas.turangsuanhuabi:'0',
        });
      } else {
        this.setState({
          arrOne: [],
          arrTwo: [],
          arrThree: [],
          arrFour:[],
          mushu:'0',//未耕种土地情况-亩数
          yanjianmu: '0',
          shuituliushimu: '0',
          genzuocengqianmu:'0',
          turangsuanhuamu:'0',
          yanjianbi:'0',
          shuituliushibi:'0',
          gengzuocengqianbi:'0',
          turangsuanhuabi:'0'
        });
      }
    }));
  }

  /**特色旅游风景村介绍-下钻页面*/
  selectTourismNameVillageDetail(a,b,c) {
    this._tokens.push(api.selectTourismNameVillageDetail.send({
      quxian: a,
      xiangzhen: b,
      cun: c,
    }).then((res) => {
      if(window.debugging) console.log('特色旅游风景村介绍', res);
      if(res.data.length>0 && res.data) {
        this.setState({dialogRefTwo: {text: res.data[0].introduce}});
      } else {
        this.setState({dialogRefTwo: {text: ''}});
      }
    }));
  }

  /**休闲娱乐统计下钻列表*/
  selectRecreationEntertainmentList() {
    this._tokens.push(api.selectRecreationEntertainmentList.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      if(window.debugging) console.log('休闲娱乐统计下钻列表', res);
      if(res.list.length>0 && res.list) {
        res.list.forEach((item,index)=>{
          item.id=index
        });
        this.setState({
          total: res.total,
          leisureTimeDataSource: res.list
        });
      } else {
        this.setState({
          total: 0,
          leisureTimeDataSource: []
        });
      }
    }));
  }


  //总区县下拉
  getQuXian() {
    this._tokens.push(apiAll.getQuXian.send({}).then((res) => {
      if(window.debugging) console.log('主页面-区县下拉', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          regionList13: res.data
        });
        this.state.regionList13.unshift('全部');
        this.siteSelectRef13._setList(this.state.regionList13); //主-区县
        //休闲娱乐统计
        this.state.regionList1.unshift('全部');
        this.siteSelectRef1._setList(this.state.regionList13); //区县
        //耕地基本情况
        this.state.regionList4.unshift('全部');
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
      if(res.data.length>0 && res.data) {
        this.setState({
          regionList14: res.data
        });
        this.state.regionList14.unshift('全部');
        this.siteSelectRef14._setList(this.state.regionList14); //主-乡镇
        //休闲娱乐统计
        this.state.regionList2.unshift('全部');
        this.siteSelectRef2._setList(this.state.regionList14); //乡镇
        //耕地基本情况
        this.state.regionList5.unshift('全部');
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
      // if(window.debugging) console.log('主页面-总村下拉', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          regionList15: res.data
        });
        this.state.regionList15.unshift('全部');
        this.siteSelectRef15._setList(this.state.regionList15); //主-村
        //休闲娱乐统计
        this.state.regionList3.unshift('全部');
        this.siteSelectRef3._setList(this.state.regionList15); //村
        //耕地基本情况
        this.state.regionList6.unshift('全部');
        this.siteSelectRef6._setList(this.state.regionList15); //村
      } else {
        this.setState({
          regionList15: []
        });
      }
    }));
  }

  /**
   * 弹框-区县乡镇下拉菜单
   * */
  //关闭下钻页面后清空所有的select选中值
  selectRefAll() {
    this.siteSelectRef13._setList([]); //主-区县
    this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
    this.siteSelectRef14._setList([]); //主-乡镇
    this.siteSelectRef15._setList([]); //主-村
    this.siteSelectRef1._setList([]); //休闲娱乐-区县
    this.siteSelectRef2._setList([]); //休闲娱乐-村
    this.siteSelectRef3._setList([]); //休闲娱乐-乡镇
    this.siteSelectRef4._setList([]); //耕地基本情况-乡镇
    this.siteSelectRef5._setList([]); //耕地基本情况-村
    this.siteSelectRef6._setList([]); //耕地基本情况-乡镇
    this.setState({//清空下钻的所有下拉菜单及输入框内容
      households: {selectOne: '', selectTwo: '', selectThree: ''},
      current: 1,
      showSelectData: false
    })
  }

  //主下拉菜单切换，改变传递参数值
  selectNewData(a, b, c) {
    let households = this.state.households;
    households.selectOne = a;
    households.selectTwo = b;
    households.selectThree = c;
    this.setState({
      households: households
    });
  }

  siteSelectChange(type, e) {
    if(type == this.regionType[1]) { //主-区县
      if(e.name == "全部") {
        e.name = "";
        this.selectNewData('', '', ''); //当区县为全部的时候，三个参数都传空
        this.siteSelectRef13._setSelectedText(['全部']); //区县
        this.siteSelectRef14._setList(['全部']); //主-乡
        this.siteSelectRef15._setList(['全部']); //主-村
        //休闲娱乐统计
        this.siteSelectRef2._setList(['全部']); //乡
        this.siteSelectRef3._setList(['全部']); //村
        //耕地基本情况
        this.siteSelectRef5._setList(['全部']); //乡
        this.siteSelectRef6._setList(['全部']); //村
      } else {
        this.selectNewData(e.name, '', ''); //当区县不为全部的时候，后两个参数都传空
        this.siteSelectRef13._setSelectedText([e.name]); //区县
        this.siteSelectRef14._setList([]); //主-乡镇
        this.siteSelectRef15._setList(['全部']); //主-村
        //休闲娱乐统计
        this.siteSelectRef1._setSelectedText([e.name]); //区县
        this.siteSelectRef2._setList([]); //乡镇
        this.siteSelectRef3._setList(['全部']); //村
        //耕地基本情况
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
        //休闲娱乐统计
        this.siteSelectRef2._setSelectedText(['全部']); //乡
        this.siteSelectRef3._setList([]); //村
        //耕地基本情况
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
        //休闲娱乐统计
        this.siteSelectRef2._setSelectedText([e.name]); //乡
        //耕地基本情况
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
        //休闲娱乐统计
        this.siteSelectRef3._setSelectedText(['全部']); //村
        //耕地基本情况
        this.siteSelectRef6._setSelectedText(['全部']); //村
      } else {
        let households = this.state.households;
        households.selectThree = e.name;
        this.setState({
          households: households
        });
        //休闲娱乐统计
        this.siteSelectRef3._setSelectedText([e.name]); //村
        //耕地基本情况
        this.siteSelectRef6._setSelectedText([e.name]); //村
      }
    }
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

	//县域特色-打开弹窗
	harmoniousBig1(params, name) {
    // console.log(params);
    this.refs.dialogRef1._open(params.title+'特色');
    this.setState({
			dialogRefOne: {
				img: params.url,
				name: params.name,
				text: params.text,
        title:params.quxian
			}
		});
	}

	//县域特色-关闭弹窗
	dialogClose1() {
    this.setState({dialogRefOne: {img: '', name: '', text: '',title:''}});
    this.selectRefAll();
    this.selectChildMethod();
	}

  //特色旅游风景村介绍-打开弹窗
  populationClick(data) {
    // console.log(data);
    if (data) {
      this.refs.dialogRef2._open(data.name+'旅游风景村');
      this.setState({dialogName: data.name});
      this.selectTourismNameVillageDetail(data.quxian, data.xiangzhen, data.name);
    }
  }
  //特色旅游风景村介绍-关闭弹窗
  dialogClose2(){
    this.selectRefAll();
    this.selectChildMethod();
  }

  //休闲娱乐统计-打开弹窗
  countrySideBig3(t){
    this.refs.dialogRef3._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef1._setList([]); //贫困户-乡镇
      this.siteSelectRef2._setList(['全部']); //贫困户-村
      this.siteSelectRef3._setList(['全部']); //贫困户-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectRecreationEntertainmentList();
  }

  //休闲娱乐统计-关闭弹窗
  dialogClose3(){
    this.selectRefAll();
    this.selectChildMethod();
  }

  //耕地利用情况-打开弹窗
  countrySideBig4(t){
    this.refs.dialogRef4._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef4._setList([]); //贫困户-乡镇
      this.siteSelectRef5._setList(['全部']); //贫困户-村
      this.siteSelectRef6._setList(['全部']); //贫困户-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectLandList();
  }

  //耕地利用情况-关闭弹窗
  dialogClose4(){
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: '',
        selectTwo: '',
        selectThree: '',
      }
    });
    this.selectRefAll();
    this.selectChildMethod();
  }

  //耕地基本情况-二级下钻查看页面
  lookPage(a, t) {
    this.refs.dialogRef44._open(a);
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: t.quxian,
        selectTwo: t.xiangzhen,
        selectThree: t.cun,
      },
    });
    this.selectLandDetail(t.quxian,t.xiangzhen,t.cun);
  }

  //耕地利用情况--二级下钻查看页面-关闭弹窗
  dialogClose44(){//关闭下钻页面，数据保留原始状态
    this.setState({
      arrOne: [],
      arrTwo: [],
      arrThree: [],
      arrFour:[],
      mushu:'0',//未耕种土地情况-亩数
      yanjianmu: '0',
      shuituliushimu: '0',
      genzuocengqianmu:'0',
      turangsuanhuamu:'0',
      yanjianbi:'0',
      shuituliushibi:'0',
      gengzuocengqianbi:'0',
      turangsuanhuabi:'0',
      ecologyDisabledOne:[
        { label: '砂质土', value: '砂质土' },
        { label: '黏土', value: '黏土' },
        { label: '壤土', value: '壤土'},
        { label: '其他', value: '其他'}
      ],
      ecologyDisabledTwo: [
        { label: '劳动力不足', value: '劳动力不足' },
        { label: '自然环境影响', value: '自然环境影响' },
        { label: '退耕还林', value: '退耕还林'},
      ],
      ecologyDisabledThree:[
        { label: '盐碱化', value: '盐碱化' },
        { label: '水土流失', value: '水土流失' },
        { label: '耕作层浅', value: '耕作层浅'},
        { label: '土壤酸化', value: '土壤酸化'}
      ],
      ecologyDisabledFour:[
        { label: '盐碱化', value: '盐碱化' },
        { label: '水土流失', value: '水土流失' },
        { label: '耕作层浅', value: '耕作层浅'},
        { label: '土壤酸化', value: '土壤酸化'},
      ]
    });
  }

	//点击中间地图的地区
	gisMapShow(d) {
    let name = d.name;
    this.siteSelectChange(2, d); //调用主筛选
    this.showNewPage();
    this.setState({
      showSelectData: true
    });
	}
	
	//点击运城市
	selectAllData() {
    let params = {
      name: '全部'
    };
    this.siteSelectChange(2, params);
    this.showNewPage();
    this.setState({
      showSelectData: true
    });
	}

  /**
   * 查询
   * */
  handleClick() { //主筛选
    this.showNewPage();
    this.setState({
      showSelectData: true
    });
  }
  handleClick3() { //休闲娱乐
    this.selectRecreationEntertainmentList();
  }
  handleClick4() { //耕地基本情况
    this.selectLandList();
  }

  /**
   * 分页
   * */
    //下钻-休闲娱乐统计
  changePage1 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectRecreationEntertainmentList()
    })
  };
  //下钻-耕地基本情况
  changePage2 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectLandList();
    })
  };

  // 关闭弹窗-刷新页面
  showNewPage(){
    this.selectSewageDischargeMode(); //污水排放方式
    this.selectDomesticWasteTreatment(); //生活垃圾处理方式
    this.getTsjglymcData(); //特色景观旅游名村
    this.getSelectCultivatedLandAreaData(); //耕地利用情况-年末耕地面积
    this.selectArableLandProblem(); //耕地利用情况-耕地问题
    this.getSelectDryLandWateringData(); //耕地利用情况-旱地水浇地
    this.selectCountyCharacteristics(); //县域特色
    this.selectRecreationEntertainment(); //休闲娱乐统计
    this.selectLandformanalysis(); //地形地貌分析
  }

	componentDidMount() {
    this.showNewPage();
    this.getQuXian(); //总区县
    this.siteSelectRef14._setList(['全部']);
    this.siteSelectRef15._setList(['全部']);
	}


	render() {
		const me = this;
		return(
			<div className={'ecology-box'}>
        {/*污水排放方式*/}
        <Panel title={'污水排放方式'} width={465} height={270} top={130} left={30} type={0}>
          <div className={'sewage-box'}>
            <Pie unit={'个'} ref={ref => this.pieWaterOne = ref}/>
          </div>
        </Panel>

        {/*生活垃圾处理方式*/}
        <Panel title={'生活垃圾处理方式'} width={465} height={270} top={430} left={30} type={0}>
          <div className={'garbage-box'}>
            <Pie unit={'个'} ref={ref => this.pieWaterTwo = ref}/>
          </div>
        </Panel>

        {/*特色景观旅游名村*/}
        <Panel title={'特色景观旅游名村'} width={465} height={310} top={700} left={30} type={0}>
          <div className={'production-box'}>
          	<WordCloud ref={ref => this.wordCloudRef = ref} height={260} sizeRange={[16, 20]} tooltip={false}  seriesClick={this.populationClick.bind(this)}/>
          </div>
        </Panel>

        {/*特色景观旅游名村-弹框*/}
        <Dialog title={this.state.dialogName+'旅游风景村'} ref={'dialogRef2'} close={me.dialogClose2.bind(me)}>
          {/*文字*/}
          <div className={'scenery-div'}>
            <span className={'img-text'} dangerouslySetInnerHTML={{__html:me.state.dialogRefTwo.text}}></span>
          </div>
        </Dialog>

        {/*全局搜索框*/}
        <div className={'selectBox'}>
          <span style={{color: '#00ffe4', fontSize: 14}}>区域检索条件：</span>
          <Select left={140} width={135} ref={(ref) => {this.siteSelectRef13 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
          <span className={'selectSpan'} style={{left: 280}}>区域</span>
          <Select left={345} width={135} ref={(ref) => {this.siteSelectRef14 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
          <span className={'selectSpan'} style={{left: 485}}>乡</span>
          <Select left={535} width={135} ref={(ref) => {this.siteSelectRef15 = ref}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
          <span className={'selectSpan'} style={{left: 675}}>村</span>
          <Button type="primary" style={{position: 'absolute', right: 0, top: 5,zIndex: 100}} onClick={this.handleClick.bind(this)}>查询</Button>
        </div>

        {/*水源分布*/}
        <div className={'water-distribution'}>
        	<h5 className={'title'}>水源分布</h5>
        	<PageBubbleChart ref={ref => this.pageBubbleChartRef = ref} style={{width: 905, height: 505, left: -40}} />
				
					<div componentname={'运城市地图'} style={{position: 'absolute', top: 80, left: 140}}>
          	<CenterMap style={{ width: '600px', height: '350px' }} mapClickHandle={this.gisMapShow.bind(this)} ref={ref => { this._centerMapRef = ref; }} />
					</div>
					<Button type="primary" style={{position: 'absolute', right: 0, top: 10}} onClick={this.selectAllData.bind(this)}>运城市</Button>
        </div>

        {/*耕地利用情况*/}
        <Panel onClick={this.countrySideBig4.bind(this, '耕地基本情况')} title={'耕地利用情况'} width={825} height={270} top={700} left={530} type={1}>
          <div className={'land-box clearFix'}>
          	<div className={'land-sum-area'}>
          		<h5>{me.state.areaNum}</h5>
          		<div>公顷</div>
          		<p>年末耕地面积</p>
          	</div>
          	<div className={'land-area-percent'}>
          		<Pie unit={'亩'} orient={'horizontal'} ref={ref => this.pieWaterFour = ref}/>
          	</div>
          	<div className={'land-water'}>
          		<Pie unit={'亩'} orient={'horizontal'} ref={ref => this.pieWaterThree = ref}/>
          	</div>
          </div>
        </Panel>

        {/*耕地利用情况-弹框*/}
        <Dialog title={'耕地基本情况'} ref={'dialogRef4'} close={me.dialogClose4.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef4 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef5 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef6 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick4.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={cultivatedLandDataSource => cultivatedLandDataSource.id} width={1100} columns={this.state.cultivatedLandColumns} dataSource={this.state.cultivatedLandDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage2,}} scroll={{y: 470}}/>
          </div>
        </Dialog>


        {/*耕地利用情况二级查看弹框*/}
        <Dialog title={'耕地基本情况'} ref={'dialogRef44'} close={me.dialogClose44.bind(me)}>
          <div  className={'detail-box'}>
            <div className={'detail-title'}>
              {this.state.secondLevel.selectOne!=''?<p>运城市</p>:<p>运城市</p>}
              {this.state.secondLevel.selectOne!=''?<p><span>></span>{this.state.secondLevel.selectOne}</p>:this.state.secondLevel.selectOne}
              {this.state.secondLevel.selectTwo!=''?<p><span>></span>{this.state.secondLevel.selectTwo}</p>:this.state.secondLevel.selectTwo}
              {this.state.secondLevel.selectThree!=''?<p><span>></span>{this.state.secondLevel.selectThree}</p>:this.state.secondLevel.selectThree}
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>主要土壤类型</p>
              <Checkbox.Group options={this.state.ecologyDisabledOne} disabled defaultValue={this.state.arrOne} value={this.state.arrOne}/>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>未耕种土地情况</p>
              <ul className={'detail-ul'}>
                <li><span>{this.state.mushu}亩</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>未用于耕种原因：</p>
                <Checkbox.Group options={this.state.ecologyDisabledTwo} disabled defaultValue={this.state.arrTwo} value={this.state.arrTwo}/>
              </div>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>耕地问题类型和亩数</p>
              <Checkbox.Group options={this.state.ecologyDisabledThree} disabled defaultValue={this.state.arrThree} value={this.state.arrThree}/>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>主要问题耕地占比</p>
              <Checkbox.Group options={this.state.ecologyDisabledFour} disabled defaultValue={this.state.arrFour} value={this.state.arrFour}/>
            </div>
          </div>
        </Dialog>

        {/*休闲娱乐统计*/}
        <Panel onClick={this.countrySideBig3.bind(this, '休闲娱乐统计')} title={'休闲娱乐统计'} width={465} height={270} top={130} left={1430} type={1}>
          <div className={'entertainment-box'}>
            <ServiceTrendsBar ref={(ref) => this.barFef = ref} width={460} height={240}/>
          </div>
        </Panel>


        {/*休闲娱乐统计-弹框*/}
        <Dialog title={'休闲娱乐统计'} ref={'dialogRef3'} close={me.dialogClose3.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef1 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef2 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef3 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick3.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={leisureTimeDataSource => leisureTimeDataSource.id} width={1100} columns={this.state.leisureTimeColumns} dataSource={this.state.leisureTimeDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage1,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*地形地貌分析*/}
        <Panel title={'地形地貌分析'} width={465} height={270} top={430} left={1430} type={0}>
          <div className={'terrain-box'}>
            <RadarCharts width={420} height={230} top={45} name={'地形地貌分析'} unit={'个'} ref={ref => this.populationRadarRef = ref} />
          </div>
        </Panel>

        {/*县域特色*/}
        <Panel title={'县域特色'} width={465} height={290} top={700} left={1430} type={0}>
          <div className={'region-box'}>
            <Carousel autoplay>
              {this.state.imgList.map(function (item, index) {
                return (
                  <div className={'house-ul'} onClick={me.harmoniousBig1.bind(me ,item,'县域特色')}  key={index}>
                    <h3 key={index}>
                      <img src={item.url} alt=""/>
                    </h3>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </Panel>

        {/*县域特色弹框*/}
        <Dialog title={this.state.dialogRefOne.title+'特色'} ref={'dialogRef1'} close={me.dialogClose1.bind(me)}>
          {/*图片*/}
          <div style={{padding: '25px 74px 20px 74px'}}>
            <div className={'img-box'}>
              <img src={this.state.dialogRefOne.img} alt=""/>
            </div>
          </div>
          {/*文字*/}
          <div className={'text-div'}>
            <span className={'img-text'} dangerouslySetInnerHTML={{__html:me.state.dialogRefOne.text}}></span>
          </div>
        </Dialog>
      </div>
		)
	}
}

export default ecology;
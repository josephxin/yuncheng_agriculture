import React from 'react';
import ReactDOM from 'react-dom';

/*引入api接口*/
import * as apiAll from '../../api/api-all';
import * as api from '../../api/api-country-side';

import './css/countrySide.scss';
import './assembly/detailPage.scss';
//弹出框
import Dialog from '../../component/dialog/Dialog';

/*引入antd框架*/
import { Input, Table, Button ,Checkbox  } from 'antd';

/*引入下拉选择框*/
import Select from '../../component/select/Select';

//引入假数据
import demoData from './demoData.js';

//引入组件
import Panel from '../../component/panel/Panel';
import PopulationBar from './charts/populationBar';
// import PieChart from './charts/pieCharts.js';
import TreeChart from './charts/chart.js';
import DashBoard from './charts/dashBoard';
import HomePage from './charts/homepage';
import PieAll from './charts/pieAll';

class countrySide extends React.Component {
  constructor() {
    super();
    this.state = {
      treeDatas: [], //乡村概况
      showSelectData: false, //判断首页是否点击查询
      current: 1, //当前页码
      total: '', //总条数
      pageSize: 10, //每页显示条数
      opulationpNum: '', //常住人口
      households: { //主-查询参数
        selectOne: '',
        selectTwo: '',
        selectThree: ''
      },
      secondLevel: demoData.secondLevel,//二级下钻页面面包屑导航
      hsList: { //输入框参数
        telValue: '',
        nameValue: '',
        czczsname: ''
      },
      financeType: '', //外出打工人数-下钻-类型
      nameAll: '', //村长/村支书姓名
      phoneAll:'',//村长/村支书电话
      householdsData: [], //户数统计数据
      numberOne: '', //外出打工人数
      numberOneList: [], //外出打工人数
      numberTwo: '',
      numberTwoList: [],
      numberThree: '',
      numberThreeList: [],
      homePageList: [],
      regionList1: [],
      regionList2: [],
      regionList3: [],
      regionList4: [],
      regionList5: [],
      regionList6: [],
      regionList7: [],
      regionList8: [],
      regionList9: [],
      regionList10: [],
      regionList11: [],
      regionList12: [],
      regionList13: [],
      regionList14: [],
      regionList15: [],
      regionList16: [],
      regionList17: [],
      regionList18: [],
      regionList19: [],
      regionList20: [],
      regionList21: [],
      // 列表表头
      goOutColumns:demoData.goOutColumns,
      goOutDataSource: [],
      ruralPopulationColumns: [
        {
          title: '户主姓名',
          dataIndex: 'houseHostName',
          key: 'houseHostName',
          width: 150,
        },
        {
          title: '所在区县',
          dataIndex: 'quxian',
          key: 'quxian',
          width: 150,
        },
        {
          title: '所在乡镇',
          dataIndex: 'xiangzhen',
          key: 'xiangzhen',
          width: 150,
        },
        {
          title: '联系电话',
          dataIndex: 'telephone',
          key: 'telephone',
          width: 120,
        },
        {
          title: '家庭人口数',
          dataIndex: 'familyPopulation',
          key: 'familyPopulation',
          width: 100,
        },
        {
          title: '操作',
          key: '操作',
          width: 80,
          render: (text, record) => (
            <span><a onClick={this.lookPage.bind(this, '户主详情',text)} className={'look-text'}>查看</a></span>
          )
        }
      ],
      ruralPopulationDataSource: [],
      poorHouseholdsColumns: demoData.poorHouseholdsColumns,
      poorHouseholdsDataSource: [],
      // villagesSurveyColumns: demoData.villagesSurveyColumns,
      //乡镇村概况-表头
      villagesSurveyColumns: [
        {
          title: '村长/村支书姓名',
          dataIndex: 'nameAll',
          key: 'nameAll',
          width: 120,
        },
        {
          title: '所在区县',
          dataIndex: 'quxian',
          key: 'quxian',
          width: 120,
        },
        {
          title: '所在乡镇',
          dataIndex: 'xiangzhen',
          key: 'xiangzhen',
          width: 100,
        },
        {
          title: '所在村',
          dataIndex: 'cun',
          key: 'cun',
          width: 100,
        },
        {
          title: '村长/村支书电话',
          dataIndex: 'phoneAll',
          key: 'phoneAll',
          width: 220,
        },
        {
          title: '是否有大学生村官',
          dataIndex: 'is_have_student_village',
          key: 'is_have_student_village',
          width: 80,
        },
        {
          title: '党员数量',
          dataIndex: 'party_member_total',
          key: 'party_member_total',
          width: 100,
        },
        {
          title: '操作',
          key: '操作',
          width: 80,
          render: (text, record) => (
            <span><a onClick={this.lookPage2.bind(this, '乡村详情',text)} className={'look-text'}>查看</a></span>
          )
        }
      ],
      villagesSurveyDataSource: [],
      householdStatisticsColumns: demoData.householdStatisticsColumns,
      householdStatisticsDataSource: [],
      socialSecurityColumns:demoData.socialSecurityColumns,
      socialSecurityDataSource: [],
      //户主详情
      disabledOne:demoData.optionsDisabledOne,
      disabledTwo:demoData.optionsDisabledTwo,
      disabledThree:demoData.optionsDisabledThree,
      disabledFour:demoData.optionsDisabledFour,
      disabledFive:demoData.optionsDisabledFive,
      disabledSix:demoData.optionsDisabledSix,
      hsOne:[],
      hsTwo:[],
      hsThree:[],
      hsFour:[],
      hsFive:[],
      hsSix:[],
      //乡村详情
      checkOne:demoData.checkOne,
      checkTwo:demoData.checkTwo,
      checkThree:demoData.checkThree,
      checkFour:demoData.checkFour,
      checkFive:demoData.checkFive,
      checkSix:demoData.checkSix,
      checkSeven:demoData.checkSeven,
      checkEight:demoData.checkSeven,
      arrOne:[],
      arrTwo:[],
      arrThree:[],
      arrFour:[],
      arrFive:[],
      arrSix:[],
      arrSeven:[],
      arrEight:[],
      arrCompany:'',
      peopleDetail:demoData.peopleDetail,
      wenhua:demoData.wenhua,
      householderDate:demoData.householderDate,//户主详情-二级下钻
    };
    this.locale = {
      emptyText: '暂无数据',
    };
    this._tokens = [];
    this.regionType = ['1', '2', '3'];
  }

  componentWillUnmount() {
    this._clearTokens();
  }

  //清除所有接口
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  componentDidMount() {
    this.showNewPage();
    this.getQuXian(); //总区县
    this.siteSelectRef14._setList(['全部']);
    this.siteSelectRef15._setList(['全部']);
  }

  // 关闭弹窗-刷新页面
  showNewPage() {
    this.residencePeople(); //常住人口
    this.ageChart(); //常住人口从事农业生产人数年龄统计图
    this.householdsStatistics(); //户数统计
    // this.selectUndergraduateRatio(); //返乡大学生占乡村大学生数量-首页图表
    // this.selectSpinsterhoodNum(); //30-40岁未婚男性占比全部男性比重-首页图表
    this.varietyStructureFunc();//农村人口结构占比
    this.selectXzcSituation(); //乡镇村概况
    this.selectGoOutWorkPeopleNum(); //外出人口数
    this.selectPovertyHouseHold(); //贫困户
    this.selectXzcPeopleNum(); //乡镇村人口数
    this.selectSocialCondition(); //社保情况
  }

  /**
   * 主页面
   * */
  //乡镇村概况
  selectXzcSituation() {
    this._tokens.push(api.selectXzcSituation.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      if(window.debugging) console.log('乡镇村概况', res);
      if(res.data.length>0 && res.data) {
        //数据展示顺序重新排序
        let arr1=res.data.slice(0,2);
        let arr2=res.data[res.data.length-1];
        arr1.push(arr2);
        let arr3=res.data.slice(2,8);
        for (let i = 0; i < arr3.length; ++i) {
          arr1.push(arr3[i])
        }
        this.setState({treeDatas: arr1});
      } else {
        this.setState({treeDatas: []});
      }
    }));
  }

  //外出人口数
  selectGoOutWorkPeopleNum() {
    this._tokens.push(api.selectGoOutWorkPeopleNum.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      // if(window.debugging) console.log('外出人口数', res);
      let data = res.data;
      if(data.length > 0 && data) {
        let listsOne = data.splice(1);
        this.setState({
          numberOne: data[0].value,
          numberOneList: listsOne
        });
      } else {
        this.setState({
          numberOne: '',
          numberOneList: []
        });
      }
      let dashBoard = document.getElementById('dashBoard');
      ReactDOM.unmountComponentAtNode(dashBoard);
      ReactDOM.render(<DashBoard numberOneList={this.state.numberOneList} numberTwoList={this.state.numberTwoList} numberThreeList={this.state.numberThreeList} />, dashBoard);
    }));
  }

  //贫困户
  selectPovertyHouseHold() {
    this._tokens.push(api.selectPovertyHouseHold.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      // if(window.debugging) console.log('贫困户', res);
      let data = res.data;
      if(data.length > 0 && data) {
        let listsThree = data.splice(1);
        this.setState({
          numberThree: data[0].value,
          numberThreeList: listsThree
        });
      } else {
        this.setState({
          numberThree: '',
          numberThreeList: []
        });
      }
      let dashBoard = document.getElementById('dashBoard');
      ReactDOM.unmountComponentAtNode(dashBoard);
      ReactDOM.render(<DashBoard numberOneList={this.state.numberOneList} numberTwoList={this.state.numberTwoList} numberThreeList={this.state.numberThreeList} />, dashBoard);
    }));
  }

  //乡镇村人口数
  selectXzcPeopleNum() {
    this._tokens.push(api.selectXzcPeopleNum.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      if(window.debugging) console.log('乡镇村人口数', res);
      let data = res.data;
      if(data.length > 0 && data) {
        let listsTwo = data.splice(1);
        this.setState({
          numberTwo: data[0].value,
          numberTwoList: listsTwo[0].value
        });
      } else {
        this.setState({
          numberTwo: '',
          numberTwoList: 0
        });
      }
      let dashBoard = document.getElementById('dashBoard');
      ReactDOM.unmountComponentAtNode(dashBoard);
      ReactDOM.render(<DashBoard numberOneList={this.state.numberOneList} numberTwoList={this.state.numberTwoList} numberThreeList={this.state.numberThreeList} />, dashBoard);
    }));
  }

  //社保情况
  selectSocialCondition() {
    this._tokens.push(api.selectSocialCondition.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
      // if(window.debugging) console.log('社保情况', res);
      if(res.data.length>0 && res.data) {
        this.setState({homePageList: res.data});
      } else {
        this.setState({homePageList: []});
      }
    }));
  }

  //农村人口结构占比
  varietyStructureFunc() {
    this._tokens.push(api.selectPopulationStructurePro.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
    }).then((res) => {
        if(window.debugging) console.log('农村人口结构占比', res);
        let pieData = {
          unit: '条',
          colorArr: ['#0297ff', '#00cfff', '#2bfdb6', '#28dd5f', '#a8ed6b', '#fff400', '#eb95a1'],
          seriesData: [],
        };
        if(res.data.length>0 && res.data) {
          let pieSeriesData = [];
          res.data.map((item, i) => {
            pieSeriesData.push({});
            pieSeriesData[i].name = item.name;
            pieSeriesData[i].value = item.value;
          });
          let confirm = [];
          pieSeriesData.map((item, i) => {
            if(item.value) {
              confirm.push(item)
            }
          });
          pieData.seriesData = confirm;
          this.pieRef._setData(pieData);
        }
      }
    ));
  }

  //户数统计
  householdsStatistics() {
    this._tokens.push(api.householdsStatistics.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree
    }).then((res) => {
      // if(window.debugging) console.log('户数统计', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          householdsData: res.data
        });
      } else {
        this.setState({
          householdsData: []
        });
      }
    }));
  }

  //常住人口数
  residencePeople() {
    this._tokens.push(api.residencePeople.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree
    }).then((res) => {
      // if(window.debugging) console.log('常住人口数', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          opulationpNum: res.data[0].value
        });
      }
    }));
  }

  //常住人口从事农业生产人数年龄统计图
  ageChart() {
    this._tokens.push(api.ageChart.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree
    }).then((res) => {
      // if(window.debugging) console.log('常住人口从事农业生产人数年龄统计图', res);
      if(res.data.nameList.length>0 && res.data.nameList && res.data.valueList.length>0 && res.data.valueList) {
        let nameList = [];
        let valueList = [];
        let option = {
          nameList: res.data.nameList,
          valueList: res.data.valueList
        };
        this.populationBarRef.setData(option);
      }
    }));
  }

  //总区县下拉
  getQuXian() {
    this._tokens.push(apiAll.getQuXian.send({}).then((res) => {
      // if(window.debugging) console.log('主页面-区县下拉', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          regionList13: res.data
        });
        this.state.regionList13.unshift('全部');
        this.siteSelectRef13._setList(this.state.regionList13); //主-区县
        //乡镇村人口数
        this.state.regionList1.unshift('全部');
        this.siteSelectRef1._setList(this.state.regionList13); //区县
        //贫困户数
        this.state.regionList4.unshift('全部');
        this.siteSelectRef4._setList(this.state.regionList13); //区县
        //乡镇村概况
        this.state.regionList7.unshift('全部');
        this.siteSelectRef7._setList(this.state.regionList13); //区县
        //户数统计
        this.state.regionList10.unshift('全部');
        this.siteSelectRef10._setList(this.state.regionList13); //区县
        //外出打工人数
        this.state.regionList16.unshift('全部');
        this.siteSelectRef16._setList(this.state.regionList13); //区县
        //社保情况
        this.state.regionList19.unshift('全部');
        this.siteSelectRef19._setList(this.state.regionList13); //区县
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
      // if(window.debugging) console.log('主页面-总乡镇下拉', res);
      if(res.data.length>0 && res.data) {
        this.setState({
          regionList14: res.data
        });
        this.state.regionList14.unshift('全部');
        this.siteSelectRef14._setList(this.state.regionList14); //主-乡镇
        //乡镇村人口数
        this.state.regionList2.unshift('全部');
        this.siteSelectRef2._setList(this.state.regionList14); //乡镇
        //贫困户数
        this.state.regionList5.unshift('全部');
        this.siteSelectRef5._setList(this.state.regionList14); //乡镇
        //乡镇村概况
        this.state.regionList8.unshift('全部');
        this.siteSelectRef8._setList(this.state.regionList14); //乡镇
        //户数统计
        this.state.regionList11.unshift('全部');
        this.siteSelectRef11._setList(this.state.regionList14); //乡镇
        //外出打工人数
        this.state.regionList17.unshift('全部');
        this.siteSelectRef17._setList(this.state.regionList14); //乡镇
        //社保情况
        this.state.regionList20.unshift('全部');
        this.siteSelectRef20._setList(this.state.regionList14); //乡镇
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
        //乡镇村人口数
        this.state.regionList3.unshift('全部');
        this.siteSelectRef3._setList(this.state.regionList15); //村
        //贫困户数
        this.state.regionList6.unshift('全部');
        this.siteSelectRef6._setList(this.state.regionList15); //村
        //乡镇村概况
        this.state.regionList9.unshift('全部');
        this.siteSelectRef9._setList(this.state.regionList15); //村
        //户数统计
        this.state.regionList12.unshift('全部');
        this.siteSelectRef12._setList(this.state.regionList15); //村
        //外出打工人数
        this.state.regionList18.unshift('全部');
        this.siteSelectRef18._setList(this.state.regionList15); //村
        //社保情况
        this.state.regionList21.unshift('全部');
        this.siteSelectRef21._setList(this.state.regionList15); //村
      } else {
        this.setState({
          regionList15: []
        });
      }
    }));
  }

  //返乡大学生占乡村大学生数量-首页图表
  // selectUndergraduateRatio() {
  // 	this._tokens.push(api.selectUndergraduateRatio.send({
  // 		quxian: this.state.households.selectOne,
  // 		xiangzhen: this.state.households.selectTwo,
  // 		cun: this.state.households.selectThree
  // 	}).then((res) => {
  // 		// if(window.debugging) console.log('返乡大学生占乡村大学生数量',res);
  // 		if(res.data != [] && res.data != null) {
  // 			let valueOne = res.data[0].value;
  // 			this.pieRefOne.setData(valueOne);
  // 		}
  // 	}));
  // }

  //30-40岁未婚男性占比全部男性比重-首页图表
  // selectSpinsterhoodNum() {
  // 	this._tokens.push(api.selectSpinsterhoodNum.send({
  // 		quxian: this.state.households.selectOne,
  // 		xiangzhen: this.state.households.selectTwo,
  // 		cun: this.state.households.selectThree
  // 	}).then((res) => {
  // 		// if(window.debugging) console.log('30-40岁未婚男性占比全部男性比重', res);
  // 		if(res.data != [] && res.data != null) {
  // 			let valueTwo = res.data[0].value;
  // 			this.pieRefTwo.setData(valueTwo);
  // 		}
  // 	}));
  // }

  /**
   * 有关下钻页面相关方法
   */
  //关闭下钻页面后清空所有的select选中值
  selectRefAll() {
    this.siteSelectRef13._setList([]); //主-区县
    this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
    this.siteSelectRef14._setList([]); //主-乡镇
    this.siteSelectRef15._setList([]); //主-村
    this.siteSelectRef1._setList([]); //乡镇村人口数-区县
    this.siteSelectRef2._setList([]); //乡镇村人口数-村
    this.siteSelectRef3._setList([]); //乡镇村人口数-乡镇
    this.siteSelectRef4._setList([]); //贫困户-乡镇
    this.siteSelectRef5._setList([]); //贫困户-村
    this.siteSelectRef6._setList([]); //贫困户-乡镇
    this.siteSelectRef7._setList([]); //乡镇村概况-区县
    this.siteSelectRef8._setList([]); //乡镇村概况-村
    this.siteSelectRef9._setList([]); //乡镇村概况-乡镇
    this.siteSelectRef10._setList([]); //户数统计-区县
    this.siteSelectRef11._setList([]); //户数统计-村
    this.siteSelectRef12._setList([]); //户数统计-乡镇
    this.siteSelectRef16._setList([]); //外出打工人数-区县
    this.siteSelectRef17._setList([]); //外出打工人数-村
    this.siteSelectRef18._setList([]); //外出打工人数-乡镇
    this.setState({//清空下钻的所有下拉菜单及输入框内容
      households: {selectOne: '', selectTwo: '', selectThree: ''},
      hsList: {telValue: '', nameValue: '',},
      financeType:'',
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
  //外出打工人数
  countrySideBig0(t) {
    this.refs.dialogRef0._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef16._setList([]); //区县
      this.siteSelectRef17._setList(['全部']); //村
      this.siteSelectRef18._setList(['全部']); //乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectGoOutWorkPeopleList();
  }
  dialogClose0() {
    this.selectRefAll();//关闭下钻页面后清空所有的select选中值
    this.selectChildMethod();
  }

  countrySideBig1(t) { //乡镇村人口数
    const me = this;
    me.refs.dialogRef1._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef1._setList([]); //乡镇村人口数-区县
      this.siteSelectRef2._setList(['全部']); //乡镇村人口数-村
      this.siteSelectRef3._setList(['全部']); //乡镇村人口数-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectListXzc();
  }

  dialogClose1() { //乡镇村人口数
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

  //乡镇村人口-二级下钻查看页面
  lookPage(a, t) {
    this.refs.dialogRef11._open(a);
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: t.quxian,
        selectTwo: t.xiangzhen,
        selectThree: t.cun,
      },
    });
    this.selectHouseholderDetails(t.id);
  }

  dialogClose11() { //乡镇村人口数-二级下钻页面
    this.emptyData2();
    this.setState({
      disabledOne: [
        {label: '钢筋混凝土', value: '钢筋混凝土'},
        {label: '砖混', value: '砖混'},
        {label: '砖（石）木', value: '砖（石）木'},
        {label: '竹草土坯', value: '竹草土坯'},
        {label: '其他', value: '其他'}
      ],
      disabledThree: [
        {label: '农资店', value: '农资店'},
        {label: '网购', value: '网购'},
        {label: '其他', value: '其他'},
      ],
      disabledFive: [
        {label: '是', value: '是'},
        {label: '否', value: '否'}
      ],
    });
  };

  countrySideBig2(t) { //贫困户
    const me = this;
    me.refs.dialogRef2._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef4._setList([]); //贫困户-乡镇
      this.siteSelectRef5._setList(['全部']); //贫困户-村
      this.siteSelectRef6._setList(['全部']); //贫困户-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectListPoverty();
  }

  dialogClose2() { //贫困户
    this.selectRefAll();
    this.selectChildMethod();
  }

  countrySideBig3(t) { //乡镇村概况
    const me = this;
    me.refs.dialogRef3._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef7._setList([]); //贫困户-乡镇
      this.siteSelectRef8._setList(['全部']); //贫困户-村
      this.siteSelectRef9._setList(['全部']); //贫困户-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectListXzcSurvey();
  }

  dialogClose3() { //乡镇村概况
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

  //乡镇村概况-二级下钻查看页面
  lookPage2(a, t) {
    this.refs.dialogRef33._open(a);
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: t.quxian,
        selectTwo: t.xiangzhen,
        selectThree: t.cun,
      },
    });
    this.selectVillageDetail(t.quxian,t.xiangzhen,t.cun);
  }

  dialogClose33() { //乡镇村概况-二级下钻页面
    this.emptyData();
  }

  countrySideBig4(t) { //户数统计
    const me = this;
    me.refs.dialogRef4._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef10._setList([]); //户数统计-乡镇
      this.siteSelectRef11._setList(['全部']); //户数统计-村
      this.siteSelectRef12._setList(['全部']); //户数统计-乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectListHouseNumStatistics();
  }

  dialogClose4() { //户数统计
    this.selectRefAll();
    this.selectChildMethod();
  }

  countrySideBig5(t) { //社保情况
    const me = this;
    me.refs.dialogRef5._open(t);
    if(this.state.showSelectData == false) { //判断首页是否点查询，false表示没有点击查询
      this.getQuXian(); //清空主下拉菜单已选数据，重新调用接口
      this.siteSelectRef19._setList([]); //区县
      this.siteSelectRef20._setList(['全部']); //村
      this.siteSelectRef21._setList(['全部']); //乡镇
      this.selectNewData('', '', ''); //当区县为全部的时候，后两个参数都传空
    }
    this.selectHzsbList();
  }

  dialogClose5() { //社保情况
    this.selectRefAll();
    this.selectChildMethod();
  }


  /**
   * 弹框-区县乡镇下拉菜单
   * */
  siteSelectChange(type, e) {
    if(type == this.regionType[1]) { //主-区县
      if(e.name == "全部") {
        e.name = "";
        this.selectNewData('', '', ''); //当区县为全部的时候，三个参数都传空
        this.siteSelectRef14._setList(['全部']); //主-乡
        this.siteSelectRef15._setList(['全部']); //主-村
        //乡镇村人口数
        this.siteSelectRef2._setList(['全部']); //乡
        this.siteSelectRef3._setList(['全部']); //村
        //贫困户
        this.siteSelectRef5._setList(['全部']); //乡
        this.siteSelectRef6._setList(['全部']); //村
        //乡镇村概况
        this.siteSelectRef8._setList(['全部']); //乡
        this.siteSelectRef9._setList(['全部']); //村
        //户数统计
        this.siteSelectRef11._setList(['全部']); //乡
        this.siteSelectRef12._setList(['全部']); //村
        //外出打工人数
        this.siteSelectRef17._setList(['全部']); //乡
        this.siteSelectRef18._setList(['全部']); //村
        //社保情况
        this.siteSelectRef20._setList(['全部']); //乡
        this.siteSelectRef21._setList(['全部']); //村
      } else {
        this.selectNewData(e.name, '', ''); //当区县不为全部的时候，后两个参数都传空
        this.siteSelectRef14._setList([]); //主-乡镇
        this.siteSelectRef15._setList(['全部']); //主-村
        //乡镇村人口数
        this.siteSelectRef1._setSelectedText([e.name]); //区县
        this.siteSelectRef2._setList([]); //乡镇
        this.siteSelectRef3._setList(['全部']); //村
        //贫困户
        this.siteSelectRef4._setSelectedText([e.name]); //区县
        this.siteSelectRef5._setList([]); //乡镇
        this.siteSelectRef6._setList(['全部']); //村
        //乡镇村概况
        this.siteSelectRef7._setSelectedText([e.name]); //区县
        this.siteSelectRef8._setList([]); //乡镇
        this.siteSelectRef9._setList(['全部']); //村
        //户数统计
        this.siteSelectRef10._setSelectedText([e.name]); //区县
        this.siteSelectRef11._setList([]); //乡镇
        this.siteSelectRef12._setList(['全部']); //户数统计-村
        //外出打工人数
        this.siteSelectRef16._setSelectedText([e.name]); //区县
        this.siteSelectRef17._setList([]); //乡镇
        this.siteSelectRef18._setList(['全部']); //户数统计-村
        //社保情况
        this.siteSelectRef19._setSelectedText([e.name]); //区县
        this.siteSelectRef20._setList([]); //乡镇
        this.siteSelectRef21._setList(['全部']); //户数统计-村
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
        //乡镇村人口数
        this.siteSelectRef2._setSelectedText(['全部']); //乡
        this.siteSelectRef3._setList([]); //村
        //贫困户
        this.siteSelectRef5._setSelectedText(['全部']); //乡
        this.siteSelectRef6._setList([]); //村
        //乡镇村概况
        this.siteSelectRef8._setSelectedText(['全部']); //乡
        this.siteSelectRef9._setList([]); //村
        //户数统计
        this.siteSelectRef11._setSelectedText(['全部']); //乡
        this.siteSelectRef12._setList([]); //村
        //外出打工人数
        this.siteSelectRef17._setSelectedText(['全部']); //乡
        this.siteSelectRef18._setList([]); //村
        //社保情况
        this.siteSelectRef20._setSelectedText(['全部']); //乡
        this.siteSelectRef21._setList([]); //村
      } else {
        let households = this.state.households;
        households.selectTwo = e.name;
        households.selectThree = '';
        this.setState({
          households: households
        });
        //首页选择下拉菜单搜索后，下钻页面赋值
        //乡镇村人口数
        this.siteSelectRef2._setSelectedText([e.name]); //乡
        //贫困户
        this.siteSelectRef5._setSelectedText([e.name]); //乡
        //乡镇村概况
        this.siteSelectRef8._setSelectedText([e.name]); //乡
        //户数统计
        this.siteSelectRef11._setSelectedText([e.name]); //乡
        //外出打工人数
        this.siteSelectRef17._setSelectedText([e.name]); //乡
        //社保情况
        this.siteSelectRef20._setSelectedText([e.name]); //乡

        //当前菜单再次选中当前值，村显示全部
        this.siteSelectRef3._setList([]); //村
        this.siteSelectRef6._setList([]); //村
        this.siteSelectRef9._setList([]); //村
        this.siteSelectRef12._setList([]); //村
        this.siteSelectRef15._setList([]); //主-村
        this.siteSelectRef18._setList([]); //主-村
        this.siteSelectRef21._setList([]); //主-村
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
        //乡镇村人口数
        this.siteSelectRef3._setSelectedText(['全部']); //村
        //贫困户
        this.siteSelectRef6._setSelectedText(['全部']); //村
        //乡镇村概况
        this.siteSelectRef9._setSelectedText(['全部']); //村
        //户数统计
        this.siteSelectRef12._setSelectedText(['全部']); //村
        //外出打工人数
        this.siteSelectRef18._setSelectedText(['全部']); //村
        //社保情况
        this.siteSelectRef21._setSelectedText(['全部']); //村
      } else {
        let households = this.state.households;
        households.selectThree = e.name;
        this.setState({
          households: households
        });
        //乡镇村人口数
        this.siteSelectRef3._setSelectedText([e.name]); //村
        //贫困户
        this.siteSelectRef6._setSelectedText([e.name]); //村
        //乡镇村概况
        this.siteSelectRef9._setSelectedText([e.name]); //村
        //户数统计
        this.siteSelectRef12._setSelectedText([e.name]); //村
        //外出打工人数
        this.siteSelectRef18._setSelectedText([e.name]); //村
        //社保情况
        this.siteSelectRef21._setSelectedText([e.name]); //村
      }
    }
  }

  /**
   * 弹框-姓名、电话输入框
   * */
  telSearch1 = (e) => { // 乡镇村人口数-联系电话
    let hsList = this.state.hsList;
    hsList.telValue = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      hsList: hsList
    })
  };
  nameSearch1 = (e) => { // 乡镇村人口数-姓名输入框
    let hsList = this.state.hsList;
    hsList.nameValue = e.target.value.trim();
    this.setState({
      hsList: hsList
    });
  };
  telSearch2 = (e) => { // 贫困户-联系电话
    e.persist();//如果必须保留原始的合成事件，请使用event.persist()
    //console.log(e, e.target.value);
    let hsList = this.state.hsList;
    hsList.telValue = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      hsList: hsList
    });
  };
  nameSearch2 = (e) => { // 贫困户-姓名输入框
    //console.log(e);
    let hsList = this.state.hsList;
    hsList.nameValue = e.target.value.replace(/[, ]/g, '');
    this.setState({
      hsList: hsList
    });
  };
  telSearch3 = (e) => { // 乡镇村概况-联系电话
    //console.log(e.target.value);
    let hsList = this.state.hsList;
    hsList.telValue = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      hsList: hsList
    });
  };
  nameSearch3 = (e) => { // 乡镇村概况-村长/村支书姓名
    // console.log(e.target.value);
    let hsList = this.state.hsList;
    hsList.czczsname = e.target.value.trim();
    this.setState({
      hsList: hsList
    });
  };
  telSearch4 = (e) => { // 户数统计-联系电话
    let hsList = this.state.hsList;
    hsList.telValue = e.target.value.replace(/[^\d]/g, '');
    this.setState({
      hsList: hsList
    });
  };
  nameSearch4 = (e) => { // 户数统计-姓名输入框
    let hsList = this.state.hsList;
    hsList.nameValue = e.target.value.trim();
    this.setState({
      hsList: hsList
    });
  };

  /**
   * 查询
   * */
  handleClick0() { //外出打工人数-下钻
    this.selectGoOutWorkPeopleList();
  }
  handleClick1() { //乡镇村人口数
    this.selectListXzc();
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: this.state.households.selectOne,
        selectTwo: this.state.households.selectTwo,
        selectThree: this.state.households.selectThree,
      },
    })
  }

  handleClick2() { //贫困户数
    this.selectListPoverty();
  }

  handleClick3() { //乡镇村概况
    this.selectListXzcSurvey();
    this.setState({
      secondLevel: { //二级下钻页面面包屑导航
        selectOne: this.state.households.selectOne,
        selectTwo: this.state.households.selectTwo,
        selectThree: this.state.households.selectThree,
      },
    })
  }

  handleClick4() { //户数统计
    this.selectListHouseNumStatistics();
  }

  handleClick5() { //主筛选
    this.showNewPage();
    this.setState({
      showSelectData: true
    });
  }

  handleClick6() { //社保情况
    this.selectHzsbList();
  }


  /**
   * 下钻页面
   * */
  //外出打工人数-下钻页面
  selectGoOutWorkPeopleList() {
    this._tokens.push(api.selectGoOutWorkPeopleList.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      if(window.debugging) console.log('外出打工人数-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        let datas = res.data.list;
        datas.forEach((item,index)=>{
          item.id=index
        });
        this.setState({
          total: res.data.total,
          goOutDataSource: datas
        });
      } else {
        this.setState({
          total: 0,
          goOutDataSource: []
        });
      }
    }));
  }

  //户主社保情况-下钻页面
  selectHzsbList() {
    this._tokens.push(api.selectHzsbList.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      // if(window.debugging) console.log('户主社保情况-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        let datas = res.data.list;
        datas.forEach((item,index)=>{
          item.id=index
        });
        this.setState({
          total: res.data.total,
          socialSecurityDataSource: datas
        });
      } else {
        this.setState({
          total: 0,
          socialSecurityDataSource: []
        });
      }
    }));
  }

  //乡镇村人口-下钻页面
  selectListXzc() {
    this._tokens.push(api.selectListXzc.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      phone: this.state.hsList.telValue,
      hzname: this.state.hsList.nameValue,
      czczsname: '',
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      // if(window.debugging) console.log('乡镇村人口-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        this.setState({
          total: res.data.total,
          ruralPopulationDataSource: res.data.list
        });
      } else {
        this.setState({
          total: 0,
          ruralPopulationDataSource: []
        });
      }
    }));
  }

  //贫困户数-一级下钻页面
  selectListPoverty() {
    this._tokens.push(api.selectListPoverty.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      phone: this.state.hsList.telValue,
      hzname: this.state.hsList.nameValue,
      czczsname: '',
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      // if(window.debugging) console.log('贫困户数-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        this.setState({
          total: res.data.total,
          poorHouseholdsDataSource: res.data.list
        });
      } else {
        this.setState({
          total: 0,
          poorHouseholdsDataSource: []
        });
      }
    }));
  }

  //户数统计-下钻页面
  selectListHouseNumStatistics() {
    this._tokens.push(api.selectListHouseNumStatistics.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      phone: this.state.hsList.telValue,
      hzname: this.state.hsList.nameValue,
      czczsname: '',
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      // if(window.debugging) console.log('户数统计-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        let datas = res.data.list;
        datas.map((item, index) => {
          if(item.isLowIncome == '1') {
            item.isLowIncome = '是'
          } else {
            item.isLowIncome = '否'
          }
        });
        this.setState({
          total: res.data.total,
          householdStatisticsDataSource: datas
        });
      } else {
        this.setState({
          total: 0,
          householdStatisticsDataSource: []
        });
      }
    }));
  }

  //乡镇村概况-下钻页面
  selectListXzcSurvey() {
    this._tokens.push(api.selectListXzcSurvey.send({
      quxian: this.state.households.selectOne,
      xiangzhen: this.state.households.selectTwo,
      cun: this.state.households.selectThree,
      phone: this.state.hsList.telValue,
      hzname: '',
      czczsname: this.state.hsList.czczsname,
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
    }).then((res) => {
      // if(window.debugging) console.log('乡镇村概况-下钻页面', res);
      if(res.data.list.length>0 && res.data.list) {
        let datas = res.data.list;
        let nameAll = '';
        let phoneAll = '';
        //村长、村支书合并成一个字段显示在一列
        datas.map((item, index) => {
          if(item.village_head || item.village_leader) {
            nameAll = item.village_head + ' / ' + item.village_leader;
            item.nameAll = nameAll
          }
          if(item.village_head_phone || item.village_leader_phone){
            phoneAll = item.village_head_phone + ' / ' + item.village_leader_phone;
            item.phoneAll = phoneAll
          }
        });
        this.setState({
          total: res.data.total,
          nameAll: nameAll,
          phoneAll: phoneAll,
          villagesSurveyDataSource: datas
        });
      } else {
        this.setState({
          total: 0,
          villagesSurveyDataSource: []
        });
      }
    }));
  }


  /**
   *
   * 二级下钻页面
   */
  //乡镇村人口数-二级下钻页面户主详情
  emptyData2(){
    this.setState({
      hsOne:[],//现居住房结构-选中
      hsTwo:[],//家庭收入主要来源-选中
      hsThree:[],//农资购买方式-选中
      hsFour:[],//家庭宽带-选中
      hsFive:[],//低保户-选中
      hsSix:[],//五保户-选中
      householderDate:{
        hzxm:' ',//户主姓名
        lxdh:'',//联系电话
        jtrks:'0',//家庭人口数
        fwsl:'0',//房间数量
        zfmj:'0',//住房面积
        sfwf:'',//是否危房
        jtnsr:'0',//家庭年收入
        jtnxfzc:'0',//家庭年消费支出
        gmnznzc:'0',//购买农资年支出
        hfzc:'0',//化肥支出
        nyzc:'0',//农药支出
        zzzc:'0',//种子支出
        qtnzzc:'0',//其它农资支出
        syhfpp:'',//化肥品牌
        synypp:'',//农药品牌
        syzzpp :'',//种子品牌
        tdzzms:'0',//土地种植亩数
        zyzznzw :'',//主要农作物
        ltsjksl:'0',//联通手机卡
        ydsjksl :'0',//移动手机卡
        dxsjksl:'0',//电信手机卡
        lsetrs:'0',//留守儿童
        cxrs:'0',//辍学人员
        qsslrrs :'0',//70岁以上老人
        dlwhrs:'0',//大龄未婚人员（35岁以上）
        sfdszn:'0',//独生子女
        sfpkh :'',//贫困户
        tsjtrs:'0',//享受其它特殊补贴人数
        dbrs:'0',//大病人数
        cjrs:'0',//残疾人数
        jxjjsnwt:'',//继续解决的涉农问题
      }
    });
  }
  selectHouseholderDetails(ids) {
    this._tokens.push(api.selectHouseholderDetails.send({
      id:ids
    }).then((res) => {
      if (window.debugging) console.log('户主详情', res);
      if (res.data != null||res.data != {}) {
        let datas = res.data;
        //复选框组-现居住房结构
        this.state.disabledOne.forEach((item,index)=>{
          if(index=='4'&&datas.xjzfwjgqt !=null){
            item.label=item.label + ' ' + datas.xjzfwjgqt ;
          }
        });
        //复选框组-农资购买方式
        this.state.disabledThree.forEach((item,index)=>{
          if(index=='2' && datas.nzgmfsqt !=null){
            item.label=item.label + ' ' + datas.nzgmfsqt;
          }
        });
        //复选框组-低保户
        this.state.disabledFive.forEach((item,index)=>{
          if(index=='0' && datas.dbhrs !=null){
            item.label=item.label + ' ' + datas.dbhrs+'人';
          }
        });
        this.setState({
          hsOne:datas.xjzfwjg?(datas.xjzfwjg).split(','):[],//现居住房结构-选中
          hsTwo:datas.jtsrzyly?(datas.jtsrzyly).split(','):[],//家庭收入主要来源-选中
          hsThree:datas.nzgmfs?(datas.nzgmfs).split(','):[],//农资购买方式-选中
          hsFour:datas.jtkdlx?(datas.jtkdlx).split(','):[],//家庭宽带-选中
          hsFive:datas.sfdbh?(datas.sfdbh).split(','):[],//低保户-选中
          hsSix:datas.sfwbh?(datas.sfwbh).split(','):[],//五保户-选中
          householderDate:{
            hzxm:datas.hzxm?datas.hzxm:'---',//户主姓名
            lxdh:datas.lxdh?datas.lxdh:'---',//联系电话
            jtrks:datas.jtrks?datas.jtrks:'0',//家庭人口数
            fwsl:datas.fwsl?datas.fwsl:'0',//房间数量
            zfmj:datas.zfmj?datas.zfmj:'0',//住房面积
            sfwf:datas.sfwf?datas.sfwf:'',//是否危房
            jtnsr:datas.jtnsr?datas.jtnsr:'0',//家庭年收入
            jtnxfzc:datas.jtnxfzc?datas.jtnxfzc:'0',//家庭年消费支出
            gmnznzc:datas.gmnznzc?datas.gmnznzc:'0',//购买农资年支出
            hfzc:datas.hfzc?datas.hfzc:'0',//化肥支出
            nyzc:datas.nyzc?datas.nyzc:'0',//农药支出
            zzzc:datas.zzzc?datas.zzzc:'0',//种子支出
            qtnzzc:datas.qtnzzc?datas.qtnzzc:'0',//其它农资支出
            syhfpp:datas.syhfpp?datas.syhfpp:'---',//化肥品牌
            synypp:datas.synypp?datas.synypp:'---',//农药品牌
            syzzpp :datas.syzzpp?datas.syzzpp:'---',//种子品牌
            tdzzms:datas.tdzzms?datas.tdzzms:'0',//土地种植亩数
            zyzznzw :datas.zyzznzw?datas.zyzznzw:'---',//主要农作物
            ltsjksl:datas.ltsjksl?datas.ltsjksl:'0',//联通手机卡
            ydsjksl :datas.ydsjksl?datas.ydsjksl:'0',//移动手机卡
            dxsjksl:datas.dxsjksl?datas.dxsjksl:'0',//电信手机卡
            lsetrs:datas.lsetrs?datas.lsetrs:'0',//留守儿童
            cxrs:datas.cxrs?datas.cxrs:'0',//辍学人员
            qsslrrs :datas.qsslrrs?datas.qsslrrs:'0',//70岁以上老人
            dlwhrs:datas.dlwhrs?datas.dlwhrs:'0',//大龄未婚人员（35岁以上）
            sfdszn:datas.sfdszn?datas.sfdszn:'0',//独生子女
            sfpkh :datas.sfpkh?datas.sfpkh:'',//贫困户
            tsjtrs:datas.tsjtrs?datas.tsjtrs:'0',//享受其它特殊补贴人数
            dbrs:datas.dbrs?datas.dbrs:'0',//大病人数
            cjrs:datas.cjrs?datas.cjrs:'0',//残疾人数
            jxjjsnwt:datas.jxjjsnwt?datas.jxjjsnwt:'---',//继续解决的涉农问题
          }
        });
      } else {
        this.emptyData2();
      }
    }));
  }

  //乡镇村概况-二级下钻页面-乡村详情
  emptyData(){//清空
    this.setState({
      arrOne: [],
      arrTwo: [],
      arrThree: [],
      arrFour: [],
      arrFive: [],
      arrSix: [],
      arrSeven: [],
      arrEight: [],
      arrCompany:'',
      peopleDetail: {//人员基本情况
        dabingNum: '0',
        canjiNum: '0',
        chuoxueerNum: '0',
        liushouerNum: '0',
        manNum: '0',
        over40man:'0',
        ageOne: '0',
        ageTwo: '0',
        ageThree: '0',
        ageFour: '0',
        ageFive: '0',
        ageSix: '0',
        ageSeven: '0',
        ageEight: '0',
      },
      wenhua: {//文化程度
        shengchandaxueshengNum: '0', dazhuanyisNum: '0', gaozhigaozhongNum: '0', zhongzhizhongzhuanNum:'0', chuzhongyixNum: '0', weishangxueNum: '0', jizhanNum: '0', kuandaiNum: '0', shoujiNum: '0',
      }
    })
  }
  selectVillageDetail(a, b, c) {
    this._tokens.push(api.selectVillageDetail.send({
      quxian: a,
      xiangzhen: b,
      cun: c,
    }).then((res) => {
      if (window.debugging) console.log('乡村详情', res);
      if (res.data != null||res.data != {}) {
        let datas = res.data;
        this.setState({
          arrOne: datas.ranliaoType?(datas.ranliaoType).split(','):[],//燃料种类-选中
          arrTwo: datas.bangfucuoshi?(datas.bangfucuoshi).split(','):[],//帮扶措施-选中
          arrCompany: datas.bangfudanwei ? datas.bangfudanwei : '-----',//帮扶单位
          arrThree: datas.xinhaoqingkuang?(datas.xinhaoqingkuang).split(','):[],//信号情况-选中
          arrFour: datas.huoquxinxiType?(datas.huoquxinxiType).split(','):[],//获取信息方式-选中
          arrFive: datas.zhifuType?(datas.zhifuType).split(','):[],//支付方式-选中
          arrSix: datas.nongyejishuxuexiType?(datas.nongyejishuxuexiType).split(','):[],//农业技术学习方式-选中
          arrSeven: datas.shenghuoyongpingoumaiType?(datas.shenghuoyongpingoumaiType).split(','):[],//生活用品购买方式-选中
          arrEight: datas.nongzigoumaiType?(datas.nongzigoumaiType).split(','):[],//农资购买方式-选中
          peopleDetail: {//人员基本情况
            dabingNum: (datas.dabingNum)?datas.dabingNum:'0',//大病人数
            canjiNum: (datas.canjiNum)?datas.canjiNum:'0',//残疾人数
            chuoxueerNum: (datas.chuoxueerNum)?datas.chuoxueerNum:'0',//辍学儿童数量
            liushouerNum: (datas.liushouerNum)?datas.liushouerNum:'0',//留守儿童数量
            manNum: (datas.manNum)?datas.manNum:'0',//男性数量
            over40man: (datas.over40man)?datas.over40man:'0',//岁以上未婚男性数量
            ageOne: (datas['<=3'])?datas['<=3']:'0',//<=3
            ageTwo: (datas['3-20'])?datas['3-20']:'0',//3-20
            ageThree: (datas['20-40'])?datas['20-40']:'0',//20-40
            ageFour: (datas['40-50'])?datas['40-50']:'0',//40-50
            ageFive: (datas['50-60'])?datas['50-60']:'0',//50-60
            ageSix: (datas['60-70'])?datas['60-70']:'0',//60-70'
            ageSeven: (datas['70-80'])?datas['70-80']:'0',//70-80
            ageEight: (datas['>=80'])?datas['>=80']:'0',//≥80
          },
          wenhua: {//文化程度
            shengchandaxueshengNum: (datas.shengchandaxueshengNum)?datas.shengchandaxueshengNum:'0',//从事生产大学生人数
            dazhuanyisNum: (datas.dazhuanyisNum)?datas.dazhuanyisNum:'0',//大专以上人数
            gaozhigaozhongNum: (datas.gaozhigaozhongNum)?datas.gaozhigaozhongNum:'0',//高职/高中人数
            zhongzhizhongzhuanNum: (datas.zhongzhizhongzhuanNum)?datas.zhongzhizhongzhuanNum:'0',//中职/中专人数
            chuzhongyixNum: (datas.chuzhongyixNum)?datas.chuzhongyixNum:'0',//初中以下人数
            weishangxueNum: (datas.weishangxueNum)?datas.weishangxueNum:'0',//未上学人数
            jizhanNum: (datas.jizhanNum)?datas.jizhanNum:'0',//基站数量
            kuandaiNum: (datas.kuandaiNum)?datas.kuandaiNum:'0',//宽带数量
            shoujiNum: (datas.shoujiNum)?datas.shoujiNum:'0',//智能手机数量
          }
        });
      } else {
        this.emptyData();
      }
    }));
  }


  /**
   *
   * 分页
   */
    //外出打工人数-分页
  changePage0 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectGoOutWorkPeopleList()
    })
  };
  //户数统计-分页
  changePage = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectListHouseNumStatistics()
    })
  };
  //乡镇村概况-分页
  changePage2 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectListXzcSurvey()
    })
  };
  //贫困户数-分页
  changePage3 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectListPoverty()
    })
  };
  //乡镇村人口-分页
  changePage4 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectListXzc()
    })
  };
  //社保情况-分页
  changePage5 = (page) => {
    this.setState({
      current: page,
    }, () => {
      this.selectHzsbList()
    })
  };

  render() {
    const me = this;
    return(
      <div className={'country-side'}>
        {/*人口概况*/}
        <Panel title={'人口概况'} width={440} height={425} top={130} left={30} type={0}>
          <div className={'people-content'}>
            <div className={'people-bg'}>
              <span className={'user-big'}></span>
              <span className={'user-text'}>常住人口</span>
              <span className={'color-text'}>{this.state.opulationpNum}</span>
              <span className={'user-text user-company'}>人</span>
            </div>
            <PopulationBar width={400} height={230} top={320} ref={ref => this.populationBarRef = ref}/>
            <div style={{width:'440',height:'280'}} >
              <p className={'pie-title'}>农村人口结构占比</p>
              <PieAll ref={ref => this.pieRef = ref} style={{width:'440',height:'280', top: '90'}} />
            </div>
            {/*<div>*/}
            {/*<PieChart width={200} height={180} top={350} ref={ref => this.pieRefOne = ref}/>*/}
            {/*<span className={'pie-text1'}>返乡大学生占<br/>乡村大学生数量</span>*/}
            {/*</div>*/}
            {/*<div style={{position: 'absolute', left: 200, top: 0}}>*/}
            {/*<PieChart width={200} height={180} top={350} ref={ref => this.pieRefTwo = ref}/>*/}
            {/*<span className={'pie-text2'}>30-40岁未婚男性<br/>占比全部男性比重</span>*/}
            {/*</div>*/}
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
          <Button type="primary" style={{position: 'absolute', right: 0, top: 5,zIndex: 100}} onClick={this.handleClick5.bind(this)}>查询</Button>
        </div>

        {/*行政统计*/}
        <Panel title={'行政统计'} width={440} height={500} top={200} left={520} type={0} zIndex={100}>
          <div style={{zIndex:1000}}>
            <div style={{position: 'absolute', top: 115, left: 110, whiteSpace: 'nowrap', zIndex: 1000, cursor: 'pointer'}} onClick={this.countrySideBig0.bind(this, '外出打工人数')}>
              <p className="left-text1">外出打工人数</p>
              <p className="left-text2"><span>{this.state.numberOne}</span>人</p>
            </div>
            <div style={{minWidth:160,position: 'absolute', top: 24, left: 370, whiteSpace: 'nowrap', cursor: 'pointer'}} onClick={this.countrySideBig1.bind(this, '乡镇村人口数')}>
              <p className="center-text1">乡镇村人口数</p>
              <p className="center-text2"><span>{this.state.numberTwo}</span>人</p>
            </div>
            <div style={{position: 'absolute', top: 115, left: 687, zIndex: 100, whiteSpace: 'nowrap', cursor: 'pointer'}} onClick={this.countrySideBig2.bind(this, '贫困户数')}>
              <p className="right-text1">贫困户</p>
              <p className="right-text2"><span>{this.state.numberThree}</span>户</p>
            </div>
            <div id="dashBoard" style={{position: 'relative', top: 90, width: 870}}>
              <DashBoard numberOneList={this.state.numberOneList} numberTwoList={this.state.numberTwoList} numberThreeList={this.state.numberThreeList} />
            </div>
          </div>
        </Panel>

        {/*行政统计-外出打工人数弹框*/}
        <Dialog title={'外出打工人数'} ref={'dialogRef0'} close={me.dialogClose0.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef16 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef17 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef18 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <Button type="primary" style={{position: 'absolute',right: -10}} onClick={this.handleClick0.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={goOutDataSource => goOutDataSource.id} width={1100} columns={this.state.goOutColumns} dataSource={this.state.goOutDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage0,}} scroll={{y: 470}}/>
          </div>
        </Dialog>


        {/*行政统计-乡镇村人口数弹框*/}
        <Dialog title={'乡镇村人口数'} ref={'dialogRef1'} close={me.dialogClose1.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef1 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef2 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef3 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{position: 'absolute', left: 600,fontSize: '18px'}}>联系电话：</span>
              <Input placeholder="请输入联系电话" allowClear onChange={this.telSearch1.bind(this)} value={this.state.hsList.telValue} style={{width: 180, position: 'relative', left: 635, top: 0}}/>
              <span style={{position: 'absolute', left: 900,fontSize: '18px'}}>户主姓名：</span>
              <Input placeholder="请输入户主姓名" allowClear onChange={this.nameSearch1.bind(this)} value={this.state.hsList.nameValue} style={{width: 180, position: 'relative', left: 755, top: 0}}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick1.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={ruralPopulationDataSource => ruralPopulationDataSource.id} width={1100} columns={this.state.ruralPopulationColumns} dataSource={this.state.ruralPopulationDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage4,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*乡镇村人口数-二级查看弹框*/}
        <Dialog title={'户主详情'} ref={'dialogRef11'} close={me.dialogClose11.bind(me)}>
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
                <li><span>户主姓名：</span><span>{this.state.householderDate.hzxm}</span></li>
                <li><span>联系电话：</span><span>{this.state.householderDate.lxdh}</span></li>
                <li><span>家庭人口数：</span><span>{this.state.householderDate.jtrks}人</span></li>
              </ul>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>房屋信息</p>
              <ul className={'detail-ul'}>
                <li><span>房屋数量：</span><span>{this.state.householderDate.fwsl}间</span></li>
                <li><span>住房面积：</span><span>{this.state.householderDate.zfmj}㎡</span></li>
                <li><span>是否危房：</span><span>{this.state.householderDate.sfwf}</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>现居住房屋结构：</p>
                <Checkbox.Group options={this.state.disabledOne} disabled defaultValue={this.state.hsOne} value={this.state.hsOne}/>
              </div>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>家庭收入信息</p>
              <ul className={'detail-ul'}>
                <li><span>家庭年收入：</span><span>{this.state.householderDate.jtnsr}万元</span></li>
                <li><span>家庭年消费支出：</span><span>{this.state.householderDate.jtnxfzc}万元</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>家庭收入主要来源：</p>
                <Checkbox.Group options={this.state.disabledTwo} disabled defaultValue={this.state.hsTwo} value={this.state.hsTwo}/>
              </div>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>农业支出信息</p>
              <ul className={'detail-ul'}>
                <li><span>购买农资年支出：</span><span>{this.state.householderDate.gmnznzc}元</span></li>
                <li><span>化肥支出：</span><span>{this.state.householderDate.hfzc}元</span></li>
                <li><span>农药支出：</span><span>{this.state.householderDate.nyzc}元</span></li>
                <li><span>种子支出：</span><span>{this.state.householderDate.zzzc}元</span></li>
                <li><span>其它农资支出：</span><span>{this.state.householderDate.qtnzzc}元</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>农资购买方式：</p>
                <Checkbox.Group options={this.state.disabledThree} disabled defaultValue={this.state.hsThree} value={this.state.hsThree}/>
              </div>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>农投品信息</p>
              <ul className={'detail-ul'}>
                <li><span>化肥品牌：</span><span>{this.state.householderDate.syhfpp}</span></li>
                <li><span>农药品牌：</span><span>{this.state.householderDate.synypp}</span></li>
                <li><span>种子品牌：</span><span>{this.state.householderDate.syzzpp}</span></li>
              </ul>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>种植信息</p>
              <ul className={'detail-ul'}>
                <li><span>土地种植亩数：</span><span>{this.state.householderDate.tdzzms}亩</span></li>
                <li><span>主要农作物：</span><span>{this.state.householderDate.zyzznzw}</span></li>
              </ul>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>通讯信息</p>
              <ul className={'detail-ul'}>
                <li><span>联通手机卡：</span><span>{this.state.householderDate.ltsjksl}个</span></li>
                <li><span>移动手机卡：</span><span>{this.state.householderDate.ydsjksl}个</span></li>
                <li><span>电信手机卡：</span><span>{this.state.householderDate.dxsjksl}个</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>家庭宽带：</p>
                <Checkbox.Group options={this.state.disabledFour} disabled defaultValue={this.state.hsFour} value={this.state.hsFour}/>
              </div>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>家庭成员信息</p>
              <ul className={'detail-ul'}>
                <li><span>留守儿童：</span><span>{this.state.householderDate.lsetrs}人</span></li>
                <li><span>辍学人员：</span><span>{this.state.householderDate.cxrs}人</span></li>
                <li><span>70岁以上老人：</span><span>{this.state.householderDate.qsslrrs}人</span></li>
                <li><span>大龄未婚人员（35岁以上）：</span><span>{this.state.householderDate.dlwhrs}人</span></li>
                <li><span>独生子女：</span><span>{this.state.householderDate.sfdszn}人</span></li>
              </ul>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>家庭成员保障信息</p>
              <ul className={'detail-ul'}>
                <li><span>贫困户：</span><span>{this.state.householderDate.sfpkh}</span></li>
                <li><span>享受其它特殊补贴人数：</span><span>{this.state.householderDate.tsjtrs}人</span></li>
                <li><span>大病人数：</span><span>{this.state.householderDate.dbrs}人</span></li>
                <li><span>残疾人数：</span><span>{this.state.householderDate.cjrs}人</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>低保户：</p>
                <Checkbox.Group options={this.state.disabledFive} disabled defaultValue={this.state.hsFive} value={this.state.hsFive}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>五保户：</p>
                <Checkbox.Group options={this.state.disabledSix} disabled defaultValue={this.state.hsSix} value={this.state.hsSix}/>
              </div>
            </div>

            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>继续解决的涉农问题</p>
              <ul className={'detail-ul'}>
                <li><span>{this.state.householderDate.jxjjsnwt}</span></li>
              </ul>
            </div>
          </div>
        </Dialog>

        {/*行政统计-贫困户数弹框*/}
        <Dialog title={'贫困户数'} ref={'dialogRef2'} close={me.dialogClose2.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef4 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef5 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef6 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{position: 'absolute', left: 600,fontSize: '18px'}}>联系电话：</span>
              <Input placeholder="请输入联系电话" onChange={this.telSearch2.bind(this)} value={this.state.hsList.telValue} style={{width: 180, position: 'relative', left: 635, top: 0}}/>
              <span style={{position: 'absolute', left: 900,fontSize: '18px'}}>户主姓名：</span>
              <Input placeholder="请输入户主姓名" onChange={this.nameSearch2.bind(this)} value={this.state.hsList.nameValue} style={{width: 180, position: 'relative', left: 755, top: 0}}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick2.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={poorHouseholdsDataSource => poorHouseholdsDataSource.id} width={1100} columns={this.state.poorHouseholdsColumns} dataSource={this.state.poorHouseholdsDataSource} locale={this.locale } pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage3,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*社保情况*/}
        <Panel onClick={this.countrySideBig5.bind(this, '农村社保情况')} title={'社保情况'} width={445} height={265} top={130} left={1450} type={1}>
          <div className={'people-content'}>
            <HomePage homePageList={this.state.homePageList} />
          </div>
        </Panel>

        {/*社保情况弹框*/}
        <Dialog title={'农村社保情况'} ref={'dialogRef5'} close={me.dialogClose5.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef19 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef20 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef21 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick6.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={socialSecurityDataSource => socialSecurityDataSource.id} width={1100} columns={this.state.socialSecurityColumns} dataSource={this.state.socialSecurityDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage5,}} scroll={{y: 470}}/>
          </div>
        </Dialog>

        {/*乡镇村概况*/}
        <Panel onClick={this.countrySideBig3.bind(this, '村列表')} title={'乡镇村概况'} width={870} height={280} top={700} left={30} type={1}>
          <div className={'households-content'}>
            <TreeChart width={850} height={200} datas={this.state.treeDatas}/>
          </div>
        </Panel>

        {/*乡镇村概况弹框*/}
        <Dialog title={'村列表'} ref={'dialogRef3'} close={me.dialogClose3.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef7 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef8 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef9 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{marginLeft: 545,fontSize: '18px'}}>联系电话：</span>
              <Input placeholder="请输入联系电话" onChange={this.telSearch3.bind(this)} value={this.state.hsList.telValue} style={{width: 210, position: 'relative', marginLeft: 0, marginRight: 20, top: 0}}/>
              <span style={{fontSize: '18px'}}>村长/村支书姓名：</span>
              <Input placeholder="请输入姓名" onChange={this.nameSearch3.bind(this) } value={this.state.hsList.czczsname} style={{width: 210, position: 'relative', marginLeft: 0, marginRight: 30, top: 0}}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick3.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={villagesSurveyDataSource => villagesSurveyDataSource.id} width={1100} columns={this.state.villagesSurveyColumns} dataSource={this.state.villagesSurveyDataSource} locale={this.locale } pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage2}} scroll={{y: 470}}/>
          </div>
        </Dialog>


        {/*乡镇村概况-二级查看弹框*/}
        <Dialog title={'乡村详情'} ref={'dialogRef33'} close={me.dialogClose33.bind(me)}>
          <div  className={'detail-box'}>
            <div className={'detail-title'}>
              {this.state.secondLevel.selectOne!=''?<p>运城市</p>:<p>运城市</p>}
              {this.state.secondLevel.selectOne!=''?<p><span>></span>{this.state.secondLevel.selectOne}</p>:this.state.secondLevel.selectOne}
              {this.state.secondLevel.selectTwo!=''?<p><span>></span>{this.state.secondLevel.selectTwo}</p>:this.state.secondLevel.selectTwo}
              {this.state.secondLevel.selectThree!=''?<p><span>></span>{this.state.secondLevel.selectThree}</p>:this.state.secondLevel.selectThree}
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>燃料种类</p>
              <Checkbox.Group options={this.state.checkOne} disabled defaultValue={this.state.arrOne} value={this.state.arrOne}/>
            </div>
            <div className={'detail-content detail-checkbox'}>
              <p className={'detail-text'}><span></span>帮扶措施</p>
              <Checkbox.Group options={this.state.checkTwo} disabled defaultValue={this.state.arrTwo} value={this.state.arrTwo}/>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>帮扶单位</p>
              <ul className={'detail-ul'}>
                <li><span>{this.state.arrCompany}</span></li>
              </ul>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>人员基本情况</p>
              <ul className={'detail-ul'}>
                <li><span>大病人数：</span><span>{this.state.peopleDetail.dabingNum}人</span></li>
                <li><span>残疾人数：</span><span>{this.state.peopleDetail.canjiNum}人</span></li>
                <li><span>辍学儿童数量：</span><span>{this.state.peopleDetail.chuoxueerNum}人</span></li>
                <li><span>留守儿童数量：</span><span>{this.state.peopleDetail.liushouerNum}人</span></li>
                <li><span>男性数量：</span><span>{this.state.peopleDetail.manNum}人</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>40岁以上未婚男性数量：</span><span>{this.state.peopleDetail.over40man}人</span></li>
                <li><span>≤3岁：</span><span>{this.state.peopleDetail.ageOne}人</span></li>
                <li><span>3-20岁：</span><span>{this.state.peopleDetail.ageTwo}人</span></li>
                <li><span>20-40岁：</span><span>{this.state.peopleDetail.ageThree}人</span></li>
                <li><span>40-50岁：</span><span>{this.state.peopleDetail.ageFour}人</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>50-60岁：</span><span>{this.state.peopleDetail.ageFive}人</span></li>
                <li><span>60-70岁：</span><span>{this.state.peopleDetail.ageSix}人</span></li>
                <li><span>70-80岁：</span><span>{this.state.peopleDetail.ageSeven}人</span></li>
                <li><span>≥80岁：</span><span>{this.state.peopleDetail.ageEight}人</span></li>
              </ul>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>文化程度</p>
              <ul className={'detail-ul'}>
                <li><span>从事生产大学生人数：</span><span>{this.state.wenhua.shengchandaxueshengNum}人</span></li>
                <li><span>大专以上人数：</span><span>{this.state.wenhua.dazhuanyisNum}人</span></li>
                <li><span>高职/高中人数：</span><span>{this.state.wenhua.gaozhigaozhongNum}人</span></li>
                <li><span>中职/中专人数：</span><span>{this.state.wenhua.zhongzhizhongzhuanNum}人</span></li>
              </ul>
              <ul className={'detail-ul'}>
                <li><span>初中以下人数：</span><span>{this.state.wenhua.chuzhongyixNum}人</span></li>
                <li><span>未上学人数：</span><span>{this.state.wenhua.weishangxueNum}人</span></li>
              </ul>
            </div>
            <div className={'detail-content'}>
              <p className={'detail-text'}><span></span>信息化发展情况</p>
              <ul className={'detail-ul'}>
                <li><span>基站数量：</span><span>{this.state.wenhua.jizhanNum}个</span></li>
                <li><span>宽带数量：</span><span>{this.state.wenhua.kuandaiNum}个</span></li>
                <li><span>智能手机数量：</span><span>{this.state.wenhua.shoujiNum}部</span></li>
              </ul>
              <div className={'detail-checkbox'}>
                <p>信号情况：</p>
                <Checkbox.Group options={this.state.checkThree} disabled defaultValue={this.state.arrThree} value={this.state.arrThree}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>获取信息方式 ：</p>
                <Checkbox.Group options={this.state.checkFour} disabled defaultValue={this.state.arrFour} value={this.state.arrFour}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>支付方式：</p>
                <Checkbox.Group options={this.state.checkFive} disabled defaultValue={this.state.arrFive} value={this.state.arrFive}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>农业技术学习方式：</p>
                <Checkbox.Group options={this.state.checkSix} disabled defaultValue={this.state.arrSix} value={this.state.arrSix}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>生活用品购买方式：</p>
                <Checkbox.Group options={this.state.checkSeven} disabled defaultValue={this.state.arrSeven} value={this.state.arrSeven}/>
              </div>
              <div className={'detail-checkbox'}>
                <p>农资购买方式：</p>
                <Checkbox.Group options={this.state.checkEight} disabled defaultValue={this.state.arrEight} value={this.state.arrEight}/>
              </div>
            </div>
          </div>
        </Dialog>

        {/*户数统计*/}
        <Panel onClick={this.countrySideBig4.bind(this, '农业户籍人员统计明细')} title={'户数统计'} width={870} height={280} top={700} left={1030} type={1}>
          <div className={'households-content'}>
            <ul className={'house-ul'}>
              {me.state.householdsData.map(function (item, index) {
                return (
                  <li key={index}>
                    <p className={'house-title'}>{item.name}</p>
                    <p className={'house-box'}>
                      <span className={'user-small'}></span>
                      <span className={'house-num'}>{item.value}</span>
                      <span className={'house-company'}>{item.valueUnit}</span>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Panel>

        {/*户数统计弹框*/}
        <Dialog title={'农业户籍人员统计明细'} ref={'dialogRef4'} close={me.dialogClose4.bind(me)}>
          {/*筛选条件*/}
          <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <span style={{fontSize: '18px'}}>区域：</span>
              <Select left={60} ref={(ref) => {this.siteSelectRef10 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[1])}/>
              <Select left={230} ref={(ref) => {this.siteSelectRef11 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[2])}/>
              <Select left={400} ref={(ref) => {this.siteSelectRef12 = ref;}} onSelectChange={this.siteSelectChange.bind(this, this.regionType[3])}/>
              <span style={{marginLeft: 545,fontSize: '18px'}}>联系电话：</span>
              <Input placeholder="请输入联系电话" onChange={this.telSearch4.bind(this)} value={this.state.hsList.telValue} style={{width: 210, position: 'relative', marginLeft: 10, marginRight: 30, top: 0}}/>
              <span style={{marginLeft: 10,fontSize: '18px'}}>户主姓名：</span>
              <Input placeholder="请输入户主姓名" onChange={this.nameSearch4.bind(this)} value={this.state.hsList.nameValue} style={{width: 210, position: 'relative', marginLeft: 10, marginRight: 30, top: 0}}/>
              <Button type="primary" style={{position: 'absolute', right: -10}} onClick={this.handleClick4.bind(this)}>查询</Button>
            </div>
          </div>
          {/*表格*/}
          <div style={{position: 'absolute', top: 90, left: 60, right: 60}}>
            <Table rowKey={householdStatisticsDataSource => householdStatisticsDataSource.id} width={1100} columns={this.state.householdStatisticsColumns} dataSource={this.state.householdStatisticsDataSource} locale={this.locale} pagination={{current: this.state.current, total: this.state.total, pageSize: this.state.pageSize, onChange: this.changePage,}} scroll={{y: 470}}/>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default countrySide;

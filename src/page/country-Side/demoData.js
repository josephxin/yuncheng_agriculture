import React from 'react';
//引入图片
import kindergarten from './img/kindergarten.png';
import primarySchool from './img/primary-school.png';
import juniorSchool from './img/junior-school.png';
import seniorSchool from './img/senior-school.png';
import yiyuan from '../../component/map-component/gisMap/img/yiyuan.png';
import menzhen from '../../component/map-component/gisMap/img/menzhen.png';
import pf from '../../component/map-component/gisMap/img/pf.png';
import gaozhong from '../../component/map-component/gisMap/img/gaozhong.png';
import chuzhong from '../../component/map-component/gisMap/img/chuzhong.png';
import xiaoxue from '../../component/map-component/gisMap/img/xiaoxue.png';
import children from '../../component/map-component/gisMap/img/children.png';
import jishufuwu from '../../component/map-component/gisMap/img/jishufuwu.png';
import weixiu from '../../component/map-component/gisMap/img/weixiu.png';
import yunshuqiye from '../../component/map-component/gisMap/img/yunshuqiye.png';
import wuliupeisong from '../../component/map-component/gisMap/img/wuliupeisong.png';
import dianshangwangzhan from '../../component/map-component/gisMap/img/dianshangwangzhan.png';
import daxinglengku from '../../component/map-component/gisMap/img/daxinglengku.png';
import jiayouzhan from '../../component/map-component/gisMap/img/jiayouzhan.png';

export default {
  //外出打工人数-表头
  goOutColumns: [{
    title: '村名',
    dataIndex: 'cun',
    key: 'cun',
    width: 100,
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
      width: 120,
    },
    {
      title: '打工人数',
      dataIndex: 'dagongNum',
      key: 'dagongNum',
      width: 120,
    },
    {
      title: '户数',
      dataIndex: 'hushuNum',
      key: 'hushuNum',
      width: 120,
    }
  ],
  //贫困户-表头
  poorHouseholdsColumns: [{
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
    }
  ],
  //户数统计
  householdStatisticsColumns: [{
    title: '户主姓名',
    dataIndex: 'houseHostName',
    key: 'houseHostName',
    width: 100,
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
      width: 130,
    },
    {
      title: '所在村',
      dataIndex: 'cun',
      key: 'cun',
      width: 150,
    },
    {
      title: '联系电话',
      dataIndex: 'telephone',
      key: 'telephone',
      width: 100,
    },
    {
      title: '独生子女人数',
      dataIndex: 'isNolyChild',
      key: 'isNolyChild',
      width: 100,
    },
    {
      title: '是否是危房',
      dataIndex: 'isLowIncome',
      key: 'isLowIncome',
      width: 100,
    },
  ],
  // 社保情况
  socialSecurityColumns: [
    {
      title: '村名',
      dataIndex: 'cun',
      key: 'cun',
      width: 80,
    },
    {
      title: '所在区县',
      dataIndex: 'quxian',
      key: 'quxian',
      width: 100,
    },
    {
      title: '所在乡镇',
      dataIndex: 'xiangzhen',
      key: 'xiangzhen',
      width: 100,
    },
    {
      title: '农村低保人数',
      dataIndex: 'dibaoNum',
      key: 'dibaoNum',
      width: 100,
    },
    {
      title: '新农合参保人数',
      dataIndex: 'hezuoyiliaoNum',
      key: 'hezuoyiliaoNum',
      width: 120,
    },
    {
      title: '五保人数',
      dataIndex: 'wubaoNum',
      key: 'wubaoNum',
      width: 100,
    },
    {
      title: '基本养老保险人数',
      dataIndex: 'yanglaobaoxianNum',
      key: 'yanglaobaoxianNum',
      width: 150,
    },
    {
      title: '复员军人保障数',
      dataIndex: 'fuyuanjunreNum',
      key: 'fuyuanjunreNum',
      width: 120,
    },
    {
      title: '残疾人员保障',
      dataIndex: 'canjirenNum',
      key: 'canjirenNum',
      width: 100,
    }
  ],

  /**
   * 富裕农村
   *
   */
  //企业详情内容对应字段
  detailContent: {
    detailName: '',
    detailTypes: '',
    detailHead: '',
    detailTel: '',
    detailLongitude: '',
    detailLatitude: '',
    detailOperationScale: '',
    detailIntroduction: '',
    detailProducts: ''
  },
  //金融服务网点表头
  financeColumns: [{
    title: '村名',
    dataIndex: 'cun',
    key: 'cun',
    width: 70,
  },
    {
      title: '网点名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '种类',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '经度',
      dataIndex: 'latitude',
      key: 'latitude',
      width: 100,
    },
    {
      title: '纬度',
      dataIndex: 'longitude',
      key: 'longitude',
      width: 100,
    }
  ],

  pieDataOne: { //饼图数据
    unit: '条',
    seriesData: [{
      value: 0,
      name: '无'
    }]
  },
  pieDataTwo: { //饼图数据
    unit: '条',
    seriesData: [{
      value: 0,
      name: '无'
    }]
  },
  pieDataThree: { //饼图数据
    unit: '条',
    seriesData: [{
      value: 0,
      name: '无'
    }]
  },
  pieWaterFour: {
    unit: '条',
    seriesData: [{
      value: 0,
      name: '无'
    }]
  },
  smallPie1: {
    name: '',
    value: '',
    left: ''
  },
  smallPie2: {
    name: '',
    value: '',
    left: ''
  },
  smallPie3: {
    name: '',
    value: '',
    left: ''
  },

  /**
   * 和谐农村
   *
   */
  //卫生服务
  healthServiceData: [{
    name: '医院数量',
    value: 0,
    unit: '家'
  }, {
    name: '门诊数量',
    value: 0,
    unit: '家'
  }, {
    name: '农村民间偏方数量',
    value: 0,
    unit: '家'
  }],
  //教育资源
  educationalResourcesData: [{
    name: '幼儿园',
    value: 0,
    unit: '个',
    url: kindergarten,
  }, {
    name: '小学',
    value: 0,
    unit: '个',
    url: primarySchool,
  }, {
    name: '初中',
    value: 0,
    unit: '个',
    url: juniorSchool,
  }, {
    name: '高中',
    value: 0,
    unit: '个',
    url: seniorSchool,
  }],
  markPointWsfw: [{
    name: '医院',
    src: yiyuan,
  }, {
    name: '门诊',
    src: menzhen,
  }, {
    name: '农村民间偏方',
    src: pf,
  }],
  markPointJyzy: [{
    name: '高中',
    src: gaozhong,
  }, {
    name: '初中',
    src: chuzhong,
  }, {
    name: '小学',
    src: xiaoxue,
  }, {
    name: '幼儿园',
    src: children,
  }],
  markPointJsfw: [{
    name: '农业技术服务点',
    src: jishufuwu,
  }, {
    name: '各类维修部',
    src: weixiu,
  }, {
    name: '运输企业',
    src: yunshuqiye,
  }, {
    name: '物流配送',
    src: wuliupeisong,
  }, {
    name: '电商网点',
    src: dianshangwangzhan,
  }, {
    name: '大型冷库',
    src: daxinglengku,
  }, {
    name: '加油站',
    src: jiayouzhan,
  }],
  waterSource: [{
    label: '自来水',
    value: '自来水'
  }, {
    label: '井水',
    value: '井水'
  }, {
    label: '泉水',
    value: '泉水'
  }, {
    label: '江、河、湖泊',
    value: '江、河、湖泊'
  }, {
    label: '雨水',
    value: '雨水'
  }, {
    label: '桶装水',
    value: '桶装水'
  }, {
    label: '其他（地下水，外采水库原水）',
    value: '其他'
  }],

  /**
   * 生态农村
   *
   */
  dialogRefOne: {
    img: '',
    text: '',
    name: '',
    title:''
  },
  /**
   * 二级下钻数据
   *
   */
  // 农村概况-乡镇村人口数-查看
  optionsDisabledOne: [
    {
      label: '钢筋混凝土',
      value: '钢筋混凝土'
    },
    {
      label: '砖混',
      value: '砖混'
    },
    {
      label: '砖（石）木',
      value: '砖（石）木'
    },
    {
      label: '竹草土坯',
      value: '竹草土坯'
    },
    {
      label: '其他',
      value: '其他'
    },
  ],
  optionsDisabledTwo: [
    {
    label: '务农',
    value: '务农'
  },
    {
      label: '务工',
      value: '务工'
    },
    {
      label: '个体经营户',
      value: '个体经营户',
    },
    {
      label: '经商',
      value: '经商',
    }
  ],
  optionsDisabledThree: [
    {
    label: '农资店',
    value: '农资店'
  },
    {
      label: '网购',
      value: '网购'
    },
    {
      label: '其他',
      value: '其他'
    },
  ],
  optionsDisabledFour: [
    {
    label: '联通',
    value: '联通'
  },
    {
      label: '移动',
      value: '移动'
    },
    {
      label: '电信',
      value: '电信'
    },
  ],
  optionsDisabledFive: [
    {
    label: '是',
    value: '是'
  },
    {
      label: '否',
      value: '否'
    }
  ],
  optionsDisabledSix: [{
    label: '是',
    value: '是'
  },
    {
      label: '否',
      value: '否'
    }
  ],
  checkOne: [
    {
      label: '煤',
      value: '煤'
    },
    {
      label: '柴',
      value: '柴'
    },
    {
      label: '液化气',
      value: '液化气'
    },
    {
      label: '沼气',
      value: '沼气'
    },
    {
      label: '天然气',
      value: '天然气'
    }
  ],
  checkTwo: [
    {
      label: '发展特色产业',
      value: '发展特色产业'
    },
    {
      label: '劳务输出',
      value: '劳务输出'
    },
    {
      label: '异地搬迁',
      value: '异地搬迁'
    },
    {
      label: '加强教育',
      value: '加强教育'
    },
    {
      label: '医疗保险和医疗救助',
      value: '医疗保险和医疗救助'
    },
    {
      label: '低保',
      value: '低保'
    },
    {
      label: '有帮扶单位',
      value: '有帮扶单位'
    }
  ],
  checkThree: [
    {
    label: '良',
    value: '良'
  },
    {
      label: '差',
      value: '差'
    }
  ],
  checkFour: [
    {
    label: '电视',
    value: '电视'
  },
    {
      label: '电脑',
      value: '电脑'
    },
    {
      label: '报纸',
      value: '报纸'
    },
    {
      label: '闲谈',
      value: '闲谈'
    },
    {
      label: '手机',
      value: '手机'
    },
    {
      label: '板报',
      value: '板报'
    },
    {
      label: '大喇叭',
      value: '大喇叭'
    },
    {
      label: '其他',
      value: '其他'
    }
  ],
  checkFive: [
    {
    label: '现金',
    value: '现金'
  },
    {
      label: '微信',
      value: '微信'
    },
    {
      label: '支付宝',
      value: '支付宝'
    },
    {
      label: '其他',
      value: '其他'
    }
  ],
  checkSix: [
    {
    label: '农技节目',
    value: '农技节目'
  },
    {
      label: '网上教学',
      value: '网上教学'
    },
    {
      label: '远程培训',
      value: '远程培训'
    },
    {
      label: '现场教学',
      value: '现场教学'
    },
    {
      label: '其他',
      value: '其他'
    },
  ],
  checkSeven: [
    {
    label: '网购',
    value: '网购'
  },
    {
      label: '实体店',
      value: '实体店'
    },
    {
      label: '集市',
      value: '集市'
    },
  ],
  checkEight: [
    {
      label: '网购',
      value: '网购'
    },
    {
      label: '实体店',
      value: '实体店'
    },
    {
      label: '农资农技一体',
      value: '农资农技一体'
    },
  ],
  peopleDetail:{
    dabingNum:'',
    canjiNum:'',
    chuoxueerNum:'',
    liushouerNum:'',
    manNum:'',
    over40man:'',
    ageOne:'',
    ageTwo:'',
    ageThree:'',
    ageFour:'',
    ageFive:'',
    ageSix:'',
    ageSeven:'',
    ageEight:''
  },
  wenhua:{
    shengchandaxueshengNum :'',
    dazhuanyisNum:'',
    gaozhigaozhongNum:'',
    zhongzhizhongzhuanNum:'',
    chuzhongyixNum :'',
    weishangxueNum:'',
    jizhanNum:'',
    kuandaiNum:'',
    shoujiNum:''
  },
  //户主详情-二级下钻
  householderDate:{
    hzxm:'',
    lxdh:'',
    jtrks:'',
    fwsl:'',
    zfmj:'',
    sfwf:'',
    jtnsr:'',
    jtnxfzc:'',
    gmnznzc:'',
    hfzc:'',
    nyzc:'',
    zzzc:'',
    qtnzzc:'',
    syhfpp:'',
    synypp:'',
    syzzpp :'',
    tdzzms:'',
    zyzznzw :'',
    ltsjksl:'',
    ydsjksl :'',
    dxsjksl:'',
    lsetrs:'',
    cxrs:'',
    qsslrrs :'',
    dlwhrs:'',
    sfdszn:'',
    sfpkh :'',
    tsjtrs:'',
    dbrs:'',
    cjrs:'',
    jxjjsnwt:'',
  },

  //二级下钻页面面包屑导航
  secondLevel: {
    selectOne: '',
    selectTwo: '',
    selectThree: ''
  },
  //休闲娱乐统计
  leisureTimeColumns: [
    {
    title: '村名',
    dataIndex: 'cun',
    key: 'cun',
    width: 80,
  },
    {
      title: '农旅庄园',
      dataIndex: 'nonglvzhuangyuan',
      key: 'nonglvzhuangyuan',
      width: 100,
    },
    {
      title: '景点',
      dataIndex: 'jingdian',
      key: 'jingdian',
      width: 100,
    },
    {
      title: '农家乐',
      dataIndex: 'nongjiale',
      key: 'nongjiale',
      width: 100,
    },
    {
      title: '垂钓',
      dataIndex: 'chuidiao',
      key: 'chuidiao',
      width: 100,
    },
    {
      title: '采摘',
      dataIndex: 'caizhai',
      key: 'caizhai',
      width: 100,
    },
    {
      title: '庙会',
      dataIndex: 'miaohui',
      key: 'miaohui',
      width: 120,
    }
  ],

  /**
   * 生态农村-二级下钻页面
   */
  ecologyDisabledOne: [{
    label: '砂质土',
    value: '砂质土'
  },
    {
      label: '黏土',
      value: '黏土'
    },
    {
      label: '壤土',
      value: '壤土'
    },
    {
      label: '其他',
      value: '其他'
    }
  ],
  ecologyDisabledTwo: [{
    label: '劳动力不足',
    value: '劳动力不足'
  },
    {
      label: '自然环境影响',
      value: '自然环境影响'
    },
    {
      label: '退耕还林',
      value: '退耕还林'
    },
  ],
  ecologyDisabledThree: [{
    label: '盐碱化',
    value: '盐碱化'
  },
    {
      label: '水土流失',
      value: '水土流失'
    },
    {
      label: '耕作层浅',
      value: '耕作层浅'
    },
    {
      label: '土壤酸化',
      value: '土壤酸化'
    }
  ],
  ecologyDisabledFour: [{
    label: '盐碱化',
    value: '盐碱化'
  },
    {
      label: '水土流失',
      value: '水土流失'
    },
    {
      label: '耕作层浅',
      value: '耕作层浅'
    },
    {
      label: '土壤酸化',
      value: '土壤酸化'
    },
  ],

};
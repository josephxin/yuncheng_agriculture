/**
 * Created by admin on 2018-12-14.
 */
import React from 'react';
import echarts from 'echarts';

import chinaJson from './json/china.json';
import shandongJson from './json/shandong.json';
import weifangJson from './json/weifang.json';
import priceMapSymbol from './price-map-symbol.png';
import tooltipBg from './price-tooltip-bg.png';


class ChinaMap extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };
    this.mapStyle = {
      position: 'absolute',
      width:`${props.width || 400}px`,
      height:`${props.height || 400}px`,
      left:`${props.left || 0}px`,
      top:`${props.top || 0}px`,
    }
  }


  geo=undefined;
  chart = undefined;
  maxV = 0;
  minV = 0;
  dataObj = {
    "china": [
      {name: "北京", value: 177},
      {name: "天津", value: 42},
      {name: "河北", value: 102},
      {name: "山西", value: 81},
      {name: "内蒙古", value: 47},
      {name: "辽宁", value: 67},
      {name: "吉林", value: 82},
      {name: "黑龙江", value: 66},
      {name: "上海", value: 24},
      {name: "江苏", value: 92},
      {name: "浙江", value: 114},
      {name: "安徽", value: 109},
      {name: "福建", value: 116},
      {name: "江西", value: 91},
      {name: "山东", value: 119},
      {name: "河南", value: 137},
      {name: "湖北", value: 116},
      {name: "湖南", value: 114},
      {name: "重庆", value: 91},
      {name: "四川", value: 125},
      {name: "贵州", value: 62},
      {name: "云南", value: 83},
      {name: "西藏", value: 9},
      {name: "陕西", value: 80},
      {name: "甘肃", value: 56},
      {name: "青海", value: 10},
      {name: "宁夏", value: 18},
      {name: "新疆", value: 67},
      {name: "广东", value: 123},
      {name: "广西", value: 59},
      {name: "海南", value: 14}],
    "shandong": [
      {"name": "烟台市", value: 67},
      {"name": "临沂市", value: 47},
      {"name": "潍坊市", value: 37},
      {"name": "青岛市", value: 27},
      {"name": "菏泽市", value: 167},
      {"name": "济宁市", value: 80},
      {"name": "德州市", value: 70},
      {"name": "滨州市", value: 10},
      {"name": "聊城市", value: 56},
      {"name": "东营市", value: 37},
      {"name": "济南市", value: 89},
      {"name": "泰安市", value: 90},
      {"name": "威海市", value: 123},
      {"name": "日照市", value: 145},
      {"name": "淄博市", value: 111},
      {"name": "枣庄市", value: 56},
      {"name": "莱芜市", value: 23},
    ],
    "weifang": [
      {name: "青州市", value: 177},
      {name: "奎文区", value: 42},
      {name: "昌乐县", value: 102},
      {name: "潍城区", value: 81},
      {name: "坊子区", value: 47},
      {name: "临朐县", value: 67},
      {name: "安丘市", value: 82},
      {name: "高密市", value: 81},
      {name: "诸城市", value: 47},
      {name: "寒亭区", value: 67},
      {name: "昌邑市", value: 82},
      {name: "寿光市", value: 82}
    ]
  };

  _setData(d){
    this.setState({
      data:d
    })
  }


  componentDidMount() {
    this.chart = echarts.init(document.getElementById('chart'));
    this.getMapData();
  }

  componentDidUpdate(){
    if(this.state.data.length){
      this.getMapData()
    }
  }

  /*获取数组对象最小值*/
  getMinAndMaxV(numArray) {
    let data = numArray.map(d => d.value);
    let maxV = Math.max.apply(null, data);
    let minV = Math.min.apply(null, data);
    return [maxV, minV]
  }

  /*获取指定数组对象的key,value*/
  getArrayObjK(numArray) {
    let obj = {};
    numArray.map(d => {
      obj[d.name] = d.value
    });
    return [Object.keys(obj), Object.values(obj)]
  }

  /*数据请求*/
  getMapData() {
    let dataObj = this.state.data.length || this.dataObj;
    let [maxV, minV] = this.getMinAndMaxV(dataObj['china']);
    this.maxV = maxV;
    this.minV = minV;
    if (dataObj) {
      this.initMap(dataObj['china'])
    }

  }

  /*初始化地图*/
  initMap(d) {
    echarts.registerMap('china', chinaJson);
    this.extendsMap('chart', {
      mapName: 'china',    // 地图名
      goDown: true,       // 是否下钻
      // 下钻回调
      callback: function (name, option, instance) {
        //  console.log(name, option, instance);
      }
    }, d)
  }

  /*下钻重绘*/
  extendsMap(id, opt, d) {
    let me = this;
    let chart = me.chart;

    let areaMap = {
      "china": '中国',
      "shandong": '山东',
      "weifang": '潍坊市'
    };

    let cityMap = {
      "中国": chinaJson,
      "山东": shandongJson,
      "潍坊市": weifangJson
    };

    let weifangCoordMap = {
      '青州市': [{
          name:'青州市农批市场',
          coordinate:[118.484693, 36.697855],
          category:'黄瓜',
          price:'4.3'
      }],
      '奎文区': [{
          name:'奎文区农批市场',
          coordinate:[119.137357, 36.709494],
          category:'黄瓜',
          price:'4.3'
      }],
      '昌乐县': [{
          name:'昌乐县农批市场',
          coordinate:[118.839995, 36.703253],
          category:'黄瓜',
          price:'4.3'
      }],
      '潍城区': [{
          name:'潍城区农批市场',
          coordinate:[119.103784, 36.710062],
          category:'黄瓜',
          price:'4.3'
      }],
      '坊子区': [{
          name:'坊子区农批市场',
          coordinate:[119.166326, 36.654616],
          category:'黄瓜',
          price:'4.3'
      }],
      '临朐县': [{
          name:'临朐县农批市场',
          coordinate:[118.539876, 36.516371],
          category:'黄瓜',
          price:'4.3'
      }],
      '安丘市': [{
          name:'安丘市农批市场',
          coordinate:[119.206886, 36.427417],
          category:'黄瓜',
          price:'4.3'
      }],
      '高密市': [{
          name:'高密市农批市场',
          coordinate:[119.757033, 36.37754],
          category:'黄瓜',
          price:'4.3'
      }],
      '诸城市': [{
          name:'诸城市农批市场',
          coordinate:[119.403182, 35.997093],
          category:'黄瓜',
          price:'4.5'
      }],
      '寒亭区': [{
          name:'寒亭区农批市场',
          coordinate:[119.207866, 36.772103],
          category:'黄瓜',
          price:'4.3'
      }],
      '昌邑市': [{
          name:'昌邑市农批市场',
          coordinate:[119.394502, 36.854937],
          category:'黄瓜',
          price:'4.4'
      }],
      '寿光市': [{
          name:'寿光市农批市场',
          coordinate:[118.736451, 36.874411],
          category:'黄瓜',
          price:'4.1'
      }]
    };

    let chinaCoordMap = {
      '山东': [{
          name:'威海农批市场',
          coordinate:[122.173333333,37.371111111],
          category:'黄瓜',
          price:'4.8'
      }],
      '北京':[{
          name:'北京八里桥',
          coordinate:[116.6361,39.9150],
          category:'黄瓜',
          price:'5.1'
      }],
      '河南':[{
          name:'河南郑州市农产品物流配送中心',
          coordinate:[113.690788,34.8478],
          category:'黄瓜',
          price:'4.1'
      }],
      '河北':[{
          name:'张北蔬菜城',
          coordinate:[114.697397,41.1576778],
          category:'黄瓜',
          price:'4.3'
      }],
      '广东':[{
          name:'佛山中南市场',
          coordinate:[113,23.071464],
          category:'黄瓜',
          price:'5.3'
      }],
	  '黑龙江':[{
          name:'黑龙江哈尔滨哈达果菜批发市场',
          coordinate:[126.625974,45.684271],
          category:'黄瓜',
          price:'4.8'
      }],
	  '吉林':[{
          name:'吉林长春果品中心批发市场',
          coordinate:[125.323027,43.948033],
          category:'黄瓜',
          price:'3.2'
      }],
	  '辽宁':[{
          name:'辽宁省朝阳果菜批发市场',
          coordinate:[120.442412,41.577857],
          category:'黄瓜',
          price:'4.8'
      }],
	  '内蒙古':[{
          name:'内蒙古包头市友谊蔬菜批发市场',
          coordinate:[109.836055,40.650748],
          category:'黄瓜',
          price:'3.5'
      }],
	  '天津':[{
          name:'天津市东丽区金钟蔬菜市场',
          coordinate:[117.114159,39.089339],
          category:'黄瓜',
          price:'2.9'
      }],
	  '江苏':[{
          name:'江苏扬州联谊农副产品批发市场',
          coordinate:[119.459168,32.37795],
          category:'黄瓜',
          price:'4.2'
      }],
	  '上海':[{
          name:'上海市江桥批发市场',
          coordinate:[121.36591,31.262952],
          category:'黄瓜',
          price:'5.1'
      }],
	  '浙江':[{
          name:'浙江农都农副产品批发市场',
          coordinate:[120.197034,30.308861],
          category:'黄瓜',
          price:'4.3'
      }],
	  '福建':[{
          name:'福建福鼎闽浙边界农贸中心市场',
          coordinate:[120.222015,27.330095],
          category:'黄瓜',
          price:'3.3'
      }],
	  '广西':[{
          name:'广西南宁五里亭蔬菜批发市场',
          coordinate:[108.299111,22.834206],
          category:'黄瓜',
          price:'4.2'
      }],
	  '云南':[{
          name:'云南省呈贡县龙城蔬菜批发市场',
          coordinate:[102.807733,24.892213],
          category:'黄瓜',
          price:'5.2'
      }],
	  '四川':[{
          name:'四川省成都市农产品批发中心',
          coordinate:[104.074886,30.710785],
          category:'黄瓜',
          price:'4.4'
      }],
	  '贵州':[{
          name:'贵州贵阳市五里冲农副产品批发市场',
          coordinate:[106.641404,26.700561],
          category:'黄瓜',
          price:'3.2'
      }],
	  '重庆':[{
          name:'重庆观农贸批发市场',
          coordinate:[106.489373,29.581393],
          category:'黄瓜',
          price:'4.2'
      }],
	  '湖北':[{
          name:'湖北武汉白沙洲农副产品大市场',
          coordinate:[113.037321,31.262952],
          category:'黄瓜',
          price:'3.2'
      }],
	  '湖南':[{
          name:'湖南长沙马王堆蔬菜批发市场',
          coordinate:[113.022063,28.113472],
          category:'黄瓜',
          price:'2.5'
      }],
	  '江西':[{
          name:'江西南昌农产品中心批发市场',
          coordinate:[115.937186,28.615544],
          category:'黄瓜',
          price:'4.3'
      }],
	  '安徽':[{
          name:'安徽合肥周谷堆农产品批发市场',
          coordinate:[117.389117,31.842901],
          category:'黄瓜',
          price:'3.3'
      }],
	  '山西':[{
          name:'山西太原市城东利民果菜批发市场',
          coordinate:[112.619272,37.868567],
          category:'黄瓜',
          price:'3.2'
      }],
	  '陕西':[{
          name:'陕西西安朱雀农产品交易中心',
          coordinate:[108.926407,34.202616],
          category:'黄瓜',
          price:'4.1'
      }],
	  '宁夏':[{
          name:'宁夏银川市北环批发市场',
          coordinate:[106.308616,38.482774],
          category:'黄瓜',
          price:'3.2'
      }],
	  '甘肃':[{
          name:'甘肃酒泉春光农产品市场',
          coordinate:[98.517955,39.728056],
          category:'黄瓜',
          price:'3.6'
      }],
	  '新疆':[{
          name:'新疆乌鲁木齐北园春批发市场',
          coordinate:[87.582795,43.828542],
          category:'黄瓜',
          price:'4.5'
      }],
	  '青海':[{
          name:'青海省西宁市海湖路蔬菜瓜果综合批发市场',
          coordinate:[101.740165,36.650197],
          category:'黄瓜',
          price:'2.7'
      }],
	  '西藏':[{
          name:'拉萨市综合批发市场',
          coordinate:[91.00000,29.60000],
          category:'黄瓜',
          price:'3.5'
      }],
	  '海南':[{
          name:'海口市蔬菜批发市场',
          coordinate:[110.35000,20.01667],
          category:'黄瓜',
          price:'3.7'
      }],

    };

    let shanDongCoordMap = {
      '威海市': [{
          name:'威海农批市场',
          coordinate:[122.173333333,37.371111111],
          category:'黄瓜',
          price:'4.1'
      }],
      '淄博市': [{
          name:'山东淄博鲁中',
          coordinate:[118.0429,36.779],
          category:'黄瓜',
          price:'4.2'
      }],
      '济南市': [{
          name:'济南堤口果品',
          coordinate:[116.95,36.6703],
          category:'黄瓜',
          price:'4.1'
      }],
	  '德州市': [{
          name:'德州黑马农产品批发市场',
          coordinate:[116.29,37.45],
          category:'黄瓜',
          price:'3.8'
      }],
	  '滨州市': [{
          name:'山东滨州市滨城区鲁北无公害蔬菜批发',
          coordinate:[118.033249,37.374521],
          category:'黄瓜',
          price:'3.2'
      }],
	  '青岛市': [{
          name:'山东青岛莱西东庄头蔬菜批发',
          coordinate:[120.344084,36.732672],
          category:'黄瓜',
          price:'3.5'
      }],
	  '菏泽市': [{
          name:'山东菏泽蔬菜批发',
          coordinate:[115.43,35.24],
          category:'黄瓜',
          price:'4.2'
      }],
	  '枣庄市': [{
          name:'山东枣庄瓜果批发',
          coordinate:[117.57,34.86],
          category:'黄瓜',
          price:'3.3'
      }],
	  '济宁市': [{
          name:'山东济宁综合批发',
          coordinate:[116.33,35.23],
          category:'黄瓜',
          price:'4.2'
      }],
	  '临沂市': [{
          name:'山东临沂蔬菜批发',
          coordinate:[118.20,35.03],
          category:'黄瓜',
          price:'2.9'
      }],
	  '青岛市': [{
          name:'山东青岛镇中蔬菜批发',
          coordinate:[120.344084,36.732672],
          category:'黄瓜',
          price:'3.8'
      }],
	  '日照市': [{
          name:'山东日照庄头蔬菜批发',
          coordinate:[119.32,35.23],
          category:'黄瓜',
          price:'3.1'
      }],
	  '潍坊市': [{
          name:'山东潍坊蔬菜批发',
          coordinate:[119.06,36.43],
          category:'黄瓜',
          price:'3.8'
      }],
	  '烟台市': [{
          name:'山东烟台综合批发',
          coordinate:[121.24,37.32],
          category:'黄瓜',
          price:'4.2'
      }],
	  '东营市': [{
          name:'山东东营市批发市场',
          coordinate:[118.49,37.46],
          category:'黄瓜',
          price:'3.8'
      }],
	  '聊城市': [{
          name:'山东聊城市蔬菜批发',
          coordinate:[115.57,36.26],
          category:'黄瓜',
          price:'4.3'
      }],
	  '泰安市': [{
          name:'山东泰安市水果蔬菜批发',
          coordinate:[117.08,36.11],
          category:'黄瓜',
          price:'3.8'
      }],
	  '莱芜市': [{
          name:'山东莱芜市三里城批发',
          coordinate:[117.67,36.19],
          category:'黄瓜',
          price:'3.8'
      }],

    };

    let cityToPinyin = {
      '中国': 'china',
      '山东': 'shandong',
      '潍坊市': 'weifang'
    };

    let levelColorMap = {
      '1': 'rgba(241, 109, 115, .8)',
      '2': 'rgba(255, 235, 59, .7)',
      '3': 'rgba(147, 235, 248, 1)'
    };

    let defaultOpt = {
      mapName: 'china',     // 地图展示
      goDown: false,        // 是否下钻
      bgColor: '#404a59',   // 画布背景色
      activeArea: [],       // 区域高亮,同echarts配置项
      data: [],
      // 下钻回调(点击的地图名、实例对象option、实例对象)
      callback: function (name, option, instance) {
      }
    };
    if (opt) opt = Object.assign(defaultOpt, opt);
    // 层级索引
    let name = [opt.mapName];
    let idx = 0;
    let pos = {
      leftPlus: 115,
      leftCur: 150,
      left: 198,
      top: 5,
      xDistance: 80
    };

    let line = [[0, 0], [8, 11], [0, 22]];
    // style
    let style = {
      font: '18px "Microsoft YaHei", sans-serif',
      textColor: '#eee',
      lineColor: '#0090e1',
      visualMapColor: ['#009dff', '#09f5fa']
    };

    let handleEvents = {
      /**
       * i 实例对象
       * o option
       * n 地图名
       * d 数据
       **/
      resetOption: function (i, o, n, d) {
        i.clear();
        let breadcrumb = this.createBreadcrumb(n, d);
        let j = name.indexOf(n);
        let l = o.graphic.length;
        if (j < 0) {
          o.graphic.push(breadcrumb);
          o.graphic[0].children[0].shape.x2 += pos.xDistance;
          o.graphic[0].children[1].shape.x2 += pos.xDistance;
          name.push(n);
          idx++
        } else {
          o.graphic.splice(j + 2, l);
          o.graphic[0].children[0].shape.x2 = (j + 1) * pos.xDistance;
          o.graphic[0].children[1].shape.x2 = (j + 1) * pos.xDistance;
          name.splice(j + 1, l);
          idx = j;
          pos.leftCur -= pos.leftPlus * (l - j - 1)
        }

        /*下钻symbol设置*/
        let goord;
        if (n.indexOf('shandong') !== -1) {
          goord = shanDongCoordMap
        } else if (n.indexOf('weifang') !== -1) {
          goord = weifangCoordMap
        } else if (n.indexOf('china') !== -1) {
          goord = chinaCoordMap
        }
        o.series[0].data = me.initSeriesData(goord, me.dataObj[n]);

        o.series[1].map = n;
        o.series[1].data = d;
        let visualRange = me.getMinAndMaxV(d);
        o.visualMap.min = visualRange[1];
        o.visualMap.max = visualRange[0];

        o.geo[0].map = n;
        o.geo[1].map = n;
        o.geo[0].zoom = 0.3;
        o.geo[1].zoom = 0.3;

        i.setOption(o);
        this.zoomAnimation();
        opt.callback(n, o, i)

        me.props.mapChange(n);
      },

      /**
       * name 地图名
       **/
      createBreadcrumb: (name, d) => {
        let breadcrumb = {
          type: 'group',
          id: name,
          left: pos.leftCur + pos.leftPlus,
          top: pos.top + 3,
          children: [{
            type: 'polyline',
            left: -90,
            top: -5,
            shape: {
              points: line
            },
            style: {
              stroke: '#fff',
              key: name
              // lineWidth: 2,
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name, d)
            }
          }, {
            type: 'text',
            left: -68,
            top: 'middle',
            style: {
              text: areaMap[name],
              textAlign: 'center',
              fill: style.textColor,
              font: style.font
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name, d)
            }
          }, {
            type: 'text',
            left: -68,
            top: 10,
            style: {
              name: name,
              text: name.toUpperCase(),
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name, d)
            }
          }]
        };

        pos.leftCur += pos.leftPlus;

        return breadcrumb;
      },

      /*缩放动画*/
      zoomAnimation: function () {
        let count = null;
        let zoom = function (per) {
          if (!count) count = per;
          count = count + per;
          chart.setOption({
            geo: [{
              zoom: count
            },
              {
                zoom: count
              }]
          });
          if (count < 1.2) window.requestAnimationFrame(function () {
            zoom(0.2)
          })
        };
        window.requestAnimationFrame(function () {
          zoom(0.2);
        });
      }
    };

    let unit = me.unit ? me.unit : '元';

    let option = {
      tooltip: {
        show:false,
        type: 'item',
        formatter: '{b}' + ':' + '\n' + ' {c}' + unit
      },
      graphic: [
        {
          type: 'group',
          left: pos.left,
          top: pos.top - 4,
          children: [{
            type: 'line',
            left: 0,
            top: -20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 80,
              y2: 0
            },
            style: {
              stroke: style.lineColor
            }
          }, {
            type: 'line',
            left: 0,
            top: 20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 80,
              y2: 0
            },
            style: {
              stroke: style.lineColor
            }
          }]
        },
        {
          type: 'group',
          left: pos.left + 2,
          top: pos.top,
          children: [{
            type: 'polyline',
            left: 90,
            top: -12,
            shape: {
              points: line
            },
            style: {
              stroke: 'transparent',
              key: name[0]
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name[0], d)
            }
          }, {
            type: 'text',
            left: 0,
            top: 'middle',
            style: {
              text: areaMap[name],
              textAlign: 'center',
              fill: style.textColor,
              font: style.font
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name[0], d)
            }
          }, {
            type: 'text',
            left: 0,
            top: 10,
            style: {
              text: name[0].toUpperCase(),
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif'
            },
            onclick: function () {
              handleEvents.resetOption(chart, option, name[0], d)
            }
          }]
        }
      ],
      visualMap: {
        show: true,
        min: this.minV,
        max: this.maxV,
        left: '0%',
        top: 'bottom',
        text: ['价格：元', ''],
        calculable: true,
        seriesIndex: [1],
        inRange: {
          color: style.visualMapColor
        },
        itemWidth: 10,
        itemHeight: 70,
        textStyle: {
          color: style.textColor,
          font: style.font
        }
      },
      geo: [
        {
          map: opt.mapName,
          zoom: 1.2,
          aspectScale:0.9,
          top:'15%',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#339ff9',
              borderWidth: 0,
              shadowBlur: 0,
              shadowColor: '#206cd2',
              shadowOffsetX: 5,
              shadowOffsetY: 15
            },
            emphasis: {
              borderColor: '#339ff9',
              borderWidth: 0,
              shadowBlur: 0,
              shadowColor: '#206cd2',
              shadowOffsetX: 5,
              shadowOffsetY: 15,
              areaColor:'#02b270'
            }
          }
        },
        {
          map: opt.mapName,
          aspectScale:0.90,
          top:'15%',
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#13fafc',
              borderWidth: 1,
              shadowBlur: 0,
              shadowColor: '#04bd9e',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },
            emphasis: {
              borderColor: '#13fafc',
              borderWidth: 1,
              shadowBlur: 0,
              shadowColor: '#04bd9e',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              areaColor:'#02b270'
            }
          }
        }
      ],
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'image://' + priceMapSymbol,
          symbolSize: [23, 28],
          hoverAnimation: true,
          label: {
            show: false,
            color: '#fff',
            formatter: '{b}'
          },
          tooltip: {
            show: true,
            trigger: 'item',
            position: function (point, params, dom, rect, size) {
              return [rect.x + 8, rect.y - 140];
            },
            backgroundColor: 'transparent',
            formatter: function (d) {
              let str = `<div style="width: 177px;height: 134px;background: url(${tooltipBg}) no-repeat center;position: relative"><p style="position: absolute;left: 28px;top: 7px;height: 30px;line-height: 30px;font-size: 16px; font-weight:500;color: #fff;">${d.data.name}</p><p style="position: absolute;left: 28px;top: 36px;height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">${d.data.category}：${d.data.price}元/公斤</p></div>`;
              return str;
            }
          },
          data: this.initSeriesData(chinaCoordMap, this.dataObj['china'])
        },
        {
          name: '价格',
          type: 'map',
          map: opt.mapName,
          geoIndex: 1,
          data: d
        }
      ]
    };
    chart.setOption(option);

    let keyAndV = this.getArrayObjK(this.dataObj['weifang']);

    // 事件监听
    chart.on('click', (params) => {
      let paramsName = cityToPinyin[params.name];
      let value = cityMap[params.name];
      if (keyAndV[0].indexOf(params.name) !== -1) {
        let keys = weifangCoordMap[params.name];
        me.props.onHandleWf(keys);
      }
      if (opt.goDown && paramsName !== name[idx]) {
        if (value) {
          let eachartData = this.dataObj[paramsName];
          echarts.registerMap(paramsName, value);
          handleEvents.resetOption(chart, option, paramsName, eachartData);
        }
      }
    });
    return chart
  }

  // 设置effectscatter
  initSeriesData(geoCoordMap, data) {
    let temp = []
    for (let i = 0; i < data.length; i++) {
      let geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        geoCoord.map((item,index)=>{
            temp.push({
                name: item.name,
                value:item.coordinate,
                category:item.category,
                price:item.price
            })
        });
      }
    }
    return temp
  }

  render() {
    return (
      <div id="chart" style={this.mapStyle}>
      </div>
    )
  }
}

export default ChinaMap
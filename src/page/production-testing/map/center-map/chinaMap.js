import React, {Component} from 'react';
import echarts from 'echarts';

import chinaJson from './china.json';

import Geo from './geo/geo';

class ChinaMap extends Component {

  constructor(props) {
    super(props);
    let me = this;
    me.geo = new Geo({
      mapLayoutSize: '145%',//
      mapAspectScale: '0.95',//和mapLayoutSize配合控制地图大小
      center: ['47%', '52%'],//地图位置
      mapType: 'china',//哪个城市的地图
      area1Color: '#074487',//下层颜色
      area1BorderColor: '#16548c',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: true,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#88a7d4',//地图上文字颜色
      mapLabelFontSize: 8,//地图上文字大小
      area2Color:'#124ea9',
      area2BorderColor: '#3fadee',//上层边框颜色
      area2BorderWidth: 1,//上层边框宽度
      area2BorderHoverColor: '#3fadee',//鼠标移上去的边框颜色
      colorStart: '#124ea9',//鼠标移上地图颜色渐变的起点
      colorEnd: '#124ea9'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
    });
    me._randomValue = function () {
      return Math.round(Math.random() * 20);
    };
    /*地图的区域颜色显示相关-初始数据*/
    me.initData = [
/*      {name: '北京', value: me._randomValue()},
      {name: '天津', value: me._randomValue()},
      {name: '上海', value: me._randomValue()},
      {name: '重庆', value: me._randomValue()},
      {name: '河北', value: me._randomValue()},
      {name: '河南', value: me._randomValue()},
      {name: '云南', value: me._randomValue()},
      {name: '辽宁', value: me._randomValue()},
      {name: '黑龙江', value: me._randomValue()},
      {name: '湖南', value: me._randomValue()},
      {name: '安徽', value: me._randomValue()},
      {name: '山东', value: me._randomValue()},
      {name: '新疆', value: me._randomValue()},
      {name: '江苏', value: me._randomValue()},
      {name: '浙江', value: me._randomValue()},
      {name: '江西', value: me._randomValue()},
      {name: '湖北', value: me._randomValue()},
      {name: '广西', value: me._randomValue()},
      {name: '甘肃', value: me._randomValue()},
      {name: '山西', value: me._randomValue()},
      {name: '内蒙古', value: me._randomValue()},
      {name: '陕西', value: me._randomValue()},
      {name: '吉林', value: me._randomValue()},
      {name: '福建', value: me._randomValue()},
      {name: '贵州', value: me._randomValue()},
      {name: '广东', value: me._randomValue()},
      {name: '青海', value: me._randomValue()},
      {name: '西藏', value: me._randomValue()},
      {name: '四川', value: me._randomValue()},
      {name: '宁夏', value: me._randomValue()},
      {name: '海南', value: me._randomValue()},
      {name: '台湾', value: me._randomValue()},
      {name: '香港', value: me._randomValue()},
      {name: '澳门', value: me._randomValue()}*/
    ];
    me.state = {
      data: me.initData.slice()
    };

  }

  _setData(d) {
    let me = this;
    me._flag = true;
    me.setState({
      data: d
    });
    
    me._echartsInstance = echarts.init(me.refs.chinaMapRef);
    let initData = me.state.data.slice();
    let geoCoordMapPro = {
      '潍坊': [119.033727, 36.733087],
      '山西': [112.4121, 38.6611],
      '河南': [113.4668, 35.8818],
      '山东': [118.7402, 37.9307],
      '黑龙江': [128.1445, 48.5156],
      '吉林': [126.4746, 44.5938],
      '辽宁': [122.3438, 42.3889],
      '内蒙古': [111.747176, 42.852351],
      '河北': [115.4004, 39.2688],
      '北京': [116.4551, 41.9539],
      '江苏': [120.0586, 33.915],
      '安徽': [117.2461, 33.0361],
      '浙江': [120.498, 30.6918],
      '福建': [118.3008, 26.9277],
      '广东': [113.4668, 25.2876],
      '广西': [108.2813, 24.6426],
      '云南': [101.9652, 23.6807],
      '重庆': [107.7539, 31.1904],
      '四川': [102.9199, 30.1904],
      '西藏': [88.7695, 31.6846],
      '新疆': [84.9023, 41.748],
      '青海': [96.2402, 35.4199],
      '甘肃': [95.7129, 41.166],
      '宁夏': [105.9961, 38.3096],
      '陕西': [109.5996, 35.6396],
      '贵州': [106.645486, 28.122376],
      '江西': [116.0156, 28.99],
      '湖南': [111.5332, 29.3779],
      '湖北': [112.2363, 32.7572],
      '天津': [117.23137, 40.61652],
      '上海': [121.497212, 32.458404],
      '海南': [109.9512, 20.2041]
    };
    let effectScatterData = [];
    let linesData = [];
    let centerCity = {
      name: '潍坊',
      value: geoCoordMapPro['潍坊'].concat(1),
      symbol: 'circle',
      symbolSize: [8, 7]
    };
    effectScatterData.push(centerCity);
    for (let i in geoCoordMapPro) {
      let effectScatter = {};
      let lines = {};
      initData.forEach(function (item, index) {
        if (item.name.indexOf(i) > -1) {
          // console.log(item);
          effectScatter.name = i;
          effectScatter.value = geoCoordMapPro[i].concat(item.value);
          effectScatter.all = item;
          effectScatter.symbol = 'circle';
          effectScatter.symbolSize = [7, 5];

          lines.fromName = i;
          lines.toName = centerCity.name;
          lines.all = item;
          lines.coords = [geoCoordMapPro[i], geoCoordMapPro[centerCity.name]];

          if (geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
            linesData.push(lines);
          }
        }
      });
      if (effectScatter.name && geoCoordMapPro[effectScatter.name]) {
        effectScatterData.push(effectScatter);
      }
    }

    me._initEchartsOption(effectScatterData,linesData);
  }

  _flag = false;
  _tooltipTimer = null;
  _echartsInstance = undefined;
  _defaultAreaIndex = -1;


  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      let scatterData = me.state.data.slice();
      me._initEchartsOption(scatterData);
      me._flag = false;
    }
  }

  _initEchartsOption(effectScatterData,linesData) {
    let me = this;

    let option = {
      tooltip: {
        show: true
      },
      geo: me.geo.geo,
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'china',
          geoIndex: 1,
          z: 2,
          zlevel: 2,
          label: {
            normal: {
              show: true,
              color: '#fff',
              fontSize: 22
            },
            emphasis: {
              show: true,
              color: '#fff',
              fontSize: 22
            }
          },
          tooltip: {
            show: false
          },
          data: me.initData.slice()
        },
        {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          z: 3,
          symbol: 'circle',
          //symbolOffset: [0, -18],
          itemStyle: {
            normal: {
              color: '#fefa92'
            }
          },
          rippleEffect: {
            period: 12,
            scale: 2.5,
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              color: '#fff'
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: function (d) {
              if (d.data.all) {
                return d.marker + d.data.all.name;
              } else {
                return d.marker + d.name;
              }
            }
          },
          data: effectScatterData
        }, {
          name: '',
          type: 'lines',
          zlevel: 4,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: '#22ff7f',
              width: 0,
              curveness: 0.2
            }
          },
          tooltip: {
            show: false,
            trigger: 'item'
          },
          data: linesData
        },
        {
          name: '',
          type: 'lines',
          zlevel: 5,
          symbol: ['none', 'none'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.2,
            symbol: 'roundRect',
            symbolSize: [3, 8]
          },
          lineStyle: {
            normal: {
              color: '#22ff7f',
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          tooltip: {
            show: false,
            trigger: 'item'
          },
          data: linesData
        }
      ]
    };
    me._echartsInstance.showLoading();
    echarts.registerMap('china', chinaJson);
    me._echartsInstance.hideLoading();
    me._echartsInstance.setOption(option, true);

  }

  componentDidMount() {

    let me = this;
    me._echartsInstance = echarts.init(me.refs.chinaMapRef);
    let initData = me.state.data.slice();
    let geoCoordMapPro = {
      '潍坊': [119.033727, 36.733087],
      '山西': [112.4121, 38.6611],
      '河南': [113.4668, 35.8818],
      '山东': [118.7402, 37.9307],
      '黑龙江': [128.1445, 48.5156],
      '吉林': [126.4746, 44.5938],
      '辽宁': [122.3438, 42.3889],
      '内蒙古': [111.747176, 42.852351],
      '河北': [115.4004, 39.2688],
      '北京': [116.4551, 41.9539],
      '江苏': [120.0586, 33.915],
      '安徽': [117.2461, 33.0361],
      '浙江': [120.498, 30.6918],
      '福建': [118.3008, 26.9277],
      '广东': [113.4668, 25.2876],
      '广西': [108.2813, 24.6426],
      '云南': [101.9652, 23.6807],
      '重庆': [107.7539, 31.1904],
      '四川': [102.9199, 30.1904],
      '西藏': [88.7695, 31.6846],
      '新疆': [84.9023, 41.748],
      '青海': [96.2402, 35.4199],
      '甘肃': [95.7129, 41.166],
      '宁夏': [105.9961, 38.3096],
      '陕西': [109.5996, 35.6396],
      '贵州': [106.645486, 28.122376],
      '江西': [116.0156, 28.99],
      '湖南': [111.5332, 29.3779],
      '湖北': [112.2363, 32.7572],
      '天津': [117.23137, 40.61652],
      '上海': [121.497212, 32.458404],
      '海南': [109.9512, 20.2041]
    };
    let effectScatterData = [];
    let linesData = [];
    let centerCity = {
      name: '潍坊',
      value: geoCoordMapPro['潍坊'].concat(1),
      symbol: 'circle',
      symbolSize: [8, 7]
    };
    effectScatterData.push(centerCity);
    for (let i in geoCoordMapPro) {
      let effectScatter = {};
      let lines = {};
      initData.forEach(function (item, index) {
        if (item.name.indexOf(i) > -1) {
          // console.log(item);
          effectScatter.name = i;
          effectScatter.value = geoCoordMapPro[i].concat(item.value);
          effectScatter.all = item;
          effectScatter.symbol = 'circle';
          effectScatter.symbolSize = [7, 5];

          lines.fromName = i;
          lines.toName = centerCity.name;
          lines.all = item;
          lines.coords = [geoCoordMapPro[i], geoCoordMapPro[centerCity.name]];

          if (geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
            linesData.push(lines);
          }
        }
      });
      if (effectScatter.name && geoCoordMapPro[effectScatter.name]) {
        effectScatterData.push(effectScatter);
      }
    }

    me._initEchartsOption(effectScatterData,linesData);
  }


  componentWillUnmount() {
    let me = this;
    if (me._echartsInstance) {
      me._echartsInstance.dispose();
      me._echartsInstance = undefined;
    }
  }


  render() {
    let me = this;
    return (
      <div style={me.props.style}>
        <div ref='chinaMapRef' style={me.props.style}>
        </div>
      </div>
    );
  }
}

export default ChinaMap;

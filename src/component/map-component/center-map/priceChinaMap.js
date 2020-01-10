/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import echarts from 'echarts';

import chinaJson from './china.json';
/*地图symbol*/
import scatterSymbol from './img/price-map-symbol.png';

/*提示框*/
import tooltipBg from './img/price-tooltip-bg.png';

import Geo from './geo/geo';

class ChinaPriceMap extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.mapLayoutSize = me.props.layoutSize || '150%';
    me.mapLabelFontSize = 12;
    me.mapType = 'china';
    me.mapAspectScale = me.props.mapAspectScale || 0.95;

    me.geo = new Geo({
      mapLayoutSize: '150%',//
      mapAspectScale: '0.95',//和mapLayoutSize配合控制地图大小
      center: ['51%', '47%'],//地图位置
      mapType: 'china',//哪个城市的地图
      area1Color: '#206cd2',//下层颜色
      area1BorderColor: '#339ff9',//下层边框颜色
      area1BorderWidth: 2,//下层边框宽度
      geoSilent: false,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#cfe6ff',//地图上文字颜色
      mapLabelFontSize: 12,//地图上文字大小
      area2BorderColor: '#12fefe',//上层边框颜色
      area2BorderWidth: 2,//上层边框宽度
      area2BorderHoverColor: '#03e289',//鼠标移上去的边框颜色
      colorStart: '#02b270',//鼠标移上地图颜色渐变的起点
      colorEnd: '#01cb95'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
    });

    me._echartsInstance = null;
    me.timer = null;
    me._randomValue = function () {
      return (Math.random() * 30).toFixed(1);
    };
    /*地图的区域颜色显示相关-初始数据*/
    me.initData = [
      {name: '北京', value: me._randomValue()},
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
      {name: '澳门', value: me._randomValue()}
    ];

    me.geoCoord = {
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

    me.state = {
      data: me.initData.slice()
    };
  }

  _flag = false;

  _setData(d) {
    let me = this;
    console.log(d)

    me._flag = true;
  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me._mapChartRef);
    let data = me.initData.slice();
    let sortData = data.sort(function (a, b) {
      return b.value - a.value;
    });
    me.initChartOption(sortData);


  }


  initChartOption(mapData) {
    let me = this;
    let visualMax = Math.ceil(mapData[0].value);
    let scatterData = [];
    for (let i in me.geoCoord) {
      /*普通的symbol*/
      let scatter = {};
      mapData.forEach((item, index) => {
        if (item.name.indexOf(i) > -1) {
          /*测试用数据*/
          let val = Math.floor(Math.random() * 100);

          scatter.name = i;
          scatter.all = item;
          scatter.value = me.geoCoord[i].concat(item.value);
          //json.symbol = 'circle'
        }
      });
      scatterData.push(scatter);
    }

    let option = {
      tooltip: {
        show: true
      },
      visualMap: {
        min: 0,
        max: visualMax,
        text: ['价格：元', ''],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#009dff', '#09f5fa']
        },
        seriesIndex: 0,
        textStyle: {
          fontSize: '18px',
          color: '#fff'
        },
        hoverLink: false,
        align: 'left',
        textGap: 26,
        itemHeight: 100,
        itemWidth: 10,
        bottom: 2,
        left: 30
      },
      geo: me.geo.geo,
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'china',
          geoIndex: 1,
          tooltip: {
            show: false
          },
          data: me.initData.slice()
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          z: 2,
          symbol: 'image://' + scatterSymbol,
          symbolSize: [23, 28],
          //symbolOffset: [5, 2],
          itemStyle: {
            normal: {
              color: 'transparent'
            }
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
            position: function (point, params, dom, rect, size) {
              return [rect.x + 8, rect.y - 140];
            },
            backgroundColor: 'transparent',
            formatter: function (d) {
              console.log(d);
              let str = `<div style="width: 177px;height: 134px;background: url(${tooltipBg}) no-repeat center;position: relative"><p style="position: absolute;left: 28px;top: 7px;height: 30px;line-height: 30px;font-size: 16px; font-weight:500;color: #fff;">${d.data.name}</p><p style="position: absolute;left: 28px;top: 36px;height: 30px;line-height: 30px;font-size: 15px; font-weight:500;color: #fff;">${'黄瓜：' + d.data.value[2] + '元/公斤'}</p></div>`;
              return str;
            }
          },
          data: scatterData
        }
      ]
    };

    me._echartsInstance.showLoading();
    echarts.registerMap('china', chinaJson);
    me._echartsInstance.hideLoading();
    me._echartsInstance.setOption(option, true);
  }

  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      me._flag = false;
    }
  }


  componentWillUnmount() {
    if (this._echartsInstance) {
      this._echartsInstance.dispose();
    }
  }

  render() {
    let me = this;
    return (
      <div style={{...me.props.style, position: 'relative'}}>
        <div ref={ref => me._mapChartRef = ref}
             style={{...me.props.style, position: 'absolute', left: 0, top: 0}}>
        </div>
        {/*<MapTooltip ref={ref => {
          me._mapTooltipRef = ref;
        }}/>*/}

        <div
          style={{position: 'absolute', width: '200px', height: '34px', left: '5px', top: '10px', lineHeight: '40px'}}>
          <div style={{
            width: '31px',
            height: '32px',
            background: 'url(' + scatterSymbol + ') no-repeat center',
            backgroundSize: 'contain',
            position: 'absolute',
            left: '1px',
            top: '1px'
          }}>
          </div>
          <span style={{
            position: 'absolute',
            display: 'inline-block',
            left: '40px',
            fontSize: '18px',
            fontWeight: "bold",
            color: '#fff'
          }}>批发市场</span>
        </div>
      </div>
    );
  }

}

export default ChinaPriceMap;

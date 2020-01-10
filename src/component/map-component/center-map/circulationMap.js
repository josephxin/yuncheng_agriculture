/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import echarts from 'echarts';

import * as d3 from 'd3';

import weifangJson from './370700-weifang.json';
/*地图symbol*/
import scatterSymbol from './img/circulation-map-symbol.png';

/*提示框*/
import MapTooltip from './circulationMapTooltip';

import Geo from './geo/geo';

import spanBg from './img/circulation-span-bg.png';

class WeifangTurnMap extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.spanStyle = {
      display: 'inline-block',
      width: '32px',
      height: '48px',
      marginRight: '4px',
      background: 'url(' + spanBg + ') no-repeat center',
      lineHeight: '48px',
      textAlign: 'center'
    };

    me.geo = new Geo({
      mapLayoutSize: '120%',//
      mapAspectScale: '1.5',//和mapLayoutSize配合控制地图大小
      center: ['50%', '55%'],//地图位置
      mapType: 'weifang',//哪个城市的地图
      area1Color: 'rgba(12,255,255,0.5)',//下层颜色
      area1BorderColor: '#02748d',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: false,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#cfe6ff',//地图上文字颜色
      mapLabelFontSize: 18,//地图上文字大小
      area2BorderColor: '#13fafc',//上层边框颜色
      area2BorderWidth: 4,//上层边框宽度
      colorStart: '#ffae01',//鼠标移上地图颜色渐变的起点
      colorEnd: '#e9680f'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
    });


    me._echartsInstance = null;
    me.timer = null;
    me._randomValue = function () {
      return Math.round(Math.random() * 1500);
    };
    me.initData = [
      {
        name: '安丘',
        value: me._randomValue(),
        market: '安丘金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '昌乐',
        value: me._randomValue(),
        market: '昌乐金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '昌邑',
        value: me._randomValue(),
        market: '昌邑金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '坊子',
        value: me._randomValue(),
        market: '坊子金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '高密',
        value: me._randomValue(),
        market: '高密金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '寒亭',
        value: me._randomValue(),
        market: '寒亭金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '奎文',
        value: me._randomValue(),
        market: '奎文金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '临朐',
        value: me._randomValue(),
        market: '临朐金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '青州',
        value: me._randomValue(),
        market: '青州金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '寿光',
        value: me._randomValue(),
        market: '寿光金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '潍城',
        value: me._randomValue(),
        market: '潍城金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }, {
        name: '诸城',
        value: me._randomValue(),
        market: '诸城金茂批发市场',
        product: '黄瓜',
        weight: '10吨',
        price: '6元/公斤',
        time: '2018-11-28 18:00:00'
      }
    ];

    me.geoCoord = {
      '安丘': [119.095605, 36.345468],
      '昌乐': [118.935911, 36.614154],
      '昌邑': [119.408654, 36.865393],
      '坊子': [119.223744, 36.622047],
      '高密': [119.721839, 36.399652],
      '寒亭': [119.189486, 37.074213],
      '奎文': [119.17926, 36.763532],
      '临朐': [118.531175, 36.428896],
      '青州': [118.487108, 36.760185],
      '寿光': [118.828568, 37.10169],
      '潍城': [119.033727, 36.733087],
      '诸城': [119.358705, 36.122712]
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
    clearInterval(me.timer);
    let c = 0;
    sortData.forEach((item, index) => {
      for (let i in me.geoCoord) {
        if (item.name.indexOf(i) > -1) {
          let pos = me.geoCoord[i];
          let tipPosition = me._echartsInstance.convertToPixel({
            seriesIndex: 0
          }, pos);
          item.pos = tipPosition;
          item.rank = index + 1;
        }
      }
    });
    me.timer = setInterval(function () {
      me.handleOpenModal(sortData[c]);
      for (let i = 0; i < sortData.length; i++) {
        me._echartsInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: i
        });
      }
      me._echartsInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        name: sortData[c]["name"]
      });
      //me._mapTooltipRef.refs.mapToolTip.style.transition = 'all 0.5s';
      c++;
      if (c >= sortData.length) {
        c = 0;
      }
    }, 3000);

    me._echartsInstance.on('click', function (e) {
      if (me.props.mapClickHandle) {
        me.props.mapClickHandle(e);
      }
    })
  }

  handleOpenModal(info) {
    let me = this;
    if (info === null) {
      return false
    } else {
      info.flag = true;
      me._mapTooltipRef.setState(info);
    }
  }

  initChartOption(mapData) {
    let me = this;
    let visualMax = Math.ceil(mapData[0].value / 100) * 100;
    let scatterData = [];
    for (let i in me.geoCoord) {
      /*涟漪效果*/
      /*普通的symbol*/
      let scatter = {};
      mapData.forEach((item, index) => {
        if (item.name.indexOf(i) > -1) {
          /*测试用数据*/
          let val = Math.floor(Math.random() * 100);

          scatter.name = i;
          scatter.all = item;
          scatter.value = me.geoCoord[i].concat(val);
          //json.symbol = 'circle'
        }
      });
      scatterData.push(scatter);
    }

    let option = {
      tooltip: {
        show: false
      },
      visualMap: {
        min: 0,
        max: visualMax,
        text: ['交易量', ''],
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
        itemWidth: 12,
        bottom: 2,
        left: 30
      },
      geo: me.geo.geo,
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'vender',
          geoIndex: 1,
          data: me.initData.slice()
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          z: 2,
          symbol: 'image://' + scatterSymbol,
          symbolSize: [31, 32],
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
            show: false,
            trigger: 'item'
          },
          data: scatterData
        }
      ]
    };
    me._echartsInstance.showLoading();
    echarts.registerMap('weifang', weifangJson);
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

    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let me = this;
    return (
      <div style={{...me.props.style, position: 'relative'}}>
        <div ref={ref => me._mapChartRef = ref}
             style={{...me.props.style, position: 'absolute', left: 0, top: 0}}>
        </div>
        <MapTooltip ref={ref => {
          me._mapTooltipRef = ref;
        }}/>

        <div style={{
          position: 'absolute', width: '200px', height: '34px',
          left: '170px', bottom: '15px', lineHeight: '40px'
        }}>
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
        {/*交易量
        <div style={{
          position: 'absolute',
          width: '420px',
          height: '130px',
          top: 0, left: 0
        }}>
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '44px',
            lineHeight: '44px',
            top: 0,
            left: 0,
            textIndent: '2px',
            color: '#29f3b1',
            fontSize: '22px',
            fontWeight: 'bold'
          }}>
            今日交易量
          </div>
          <div style={{
            // height: '80px',
            position: 'absolute',
            top: '50px',
            left: 0,
          }}>
            <div style={{
              // height: '80px',
              display: 'inline-block',
              padding: '3px',
              border: '1px solid #215cc2',
              marginRight: '4px'
            }} ref="storeTotalRef">
              {me.createSpan(123456)}
            </div>
            <span style={{
              display: 'inline-block',
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(to bottom, #fbfffe, #31f3b4)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>吨
          </span>
          </div>


        </div>
        交易金额
        <div style={{
          position: 'absolute',
          width: '420px',
          height: '130px',
          top: 0, left: '425px'
        }}>
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '44px',
            lineHeight: '44px',
            top: 0,
            left: 0,
            textIndent: '2px',
            color: '#f3ec0b',
            fontSize: '22px',
            fontWeight: 'bold'
          }}>
            今日交易金额
          </div>

        </div>*/}
        {/*<div style={{
          position: 'absolute',
          bottom: '10px',
          left: '250px',
          color: '#fff'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '280px',
            height: '60px'
          }}>
            <div style={{
              width: '60px',
              height: '55px',
              background: 'url(' + leftLegend + ') no-repeat center',
              backgroundSize: 'contain',
              position: 'absolute',
              left: 0,
              top: '2px'
            }}>
            </div>
            <div style={{
              position: 'absolute',
              width: '220px',
              height: '30px',
              lineHeight: '30px',
              top: 0,
              left: '70px',
              textIndent: '2px',
              fontSize: '18px',
              fontWeight: '500'
            }}><span style={
              {
                marginRight: '10px',
                fontWeight: 'bold',
                fontSize: '24px',
                background: 'linear-gradient(to bottom, #00fdf6, #00c5fe)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }} ref="storeTotalRef">{'0'}</span>吨
            </div>
            <div style={{
              position: 'absolute',
              width: '220px',
              height: '24px',
              lineHeight: '24px',
              top: '32px',
              left: '70px',
              textIndent: '2px',
              color: '#00f4f9',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              今日交易量
            </div>
          </div>
          <div style={{
            position: 'absolute',
            left: '280px',
            bottom: 0,
            width: '280px',
            height: '60px'
          }}>
            <div style={{
              width: '60px',
              height: '55px',
              background: 'url(' + rightLegend + ') no-repeat center',
              backgroundSize: 'contain',
              position: 'absolute',
              left: 0,
              top: '2px'
            }}>
            </div>
            <div style={{
              position: 'absolute',
              width: '220px',
              height: '30px',
              lineHeight: '30px',
              top: 0,
              left: '70px',
              textIndent: '2px',
              fontSize: '18px',
              fontWeight: '500'
            }}><span style={
              {
                marginRight: '10px',
                fontWeight: 'bold',
                fontSize: '24px',
                background: 'linear-gradient(to bottom, #feffb1, #fff606)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }} ref="companyTotalRef">{'0'}</span>
            </div>
            <div style={{
              position: 'absolute',
              width: '220px',
              height: '24px',
              lineHeight: '24px',
              top: '32px',
              left: '70px',
              textIndent: '2px',
              color: '#fff606',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              今日交易金额
            </div>
          </div>

        </div>*/}
      </div>
    );
  }

  textAnimation() {
    let me = this;
    let storeTotal = 13222444;
    let companyTotal = 13222445;
    d3.select(me.refs.storeTotalRef).transition()
      .duration(2000)
      .tween('simple', function () {
        let _thisNode = this;
        return function (t) {
          let d = (storeTotal * t).toFixed(0);
          _thisNode.appendChild(me.createSpan(d));
        }
      });

    /*d3.select(me.refs.companyTotalRef).transition()
      .duration(2000)
      .tween('simple', function () {
        let _thisNode = this;
        return function (t) {
          let d = (companyTotal * t).toFixed(0);
          _thisNode.innerHTML = me.comdify(d);
        }
      });*/
  }

  comdify(n) {
    let re = /\d{1,3}(?=(\d{3})+$)/g;
    let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
      return s1.replace(re, "$&,") + s2;
    });
    return n1;
  }

  /*createSpan(d, color) {
    let me = this;
    let val = me.comdify(d.toString());
    let arr = val.split('');

    let greenStyle = {
      display: 'inline-block',
      fontSize: '34px',
      fontWeight: 'bold',
      background: 'linear-gradient(to bottom, #fbfffe, #31f3b4)',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    };

    let list = arr.map(function (item, index) {
      if (isNaN(item)) {
        return (
          <span style={{...greenStyle, textAlign: 'left', marginRight: '5px'}}>
            {item}
          </span>
        )
      } else {
        return (
          <span style={{...me.spanStyle, marginRight: index === arr.length - 1 ? '0' : '4px'}}>
             <i style={greenStyle}>
                {item}
             </i>
        </span>
        )
      }

    });
    console.log(list)
    return list;
  }*/
}

export default WeifangTurnMap;

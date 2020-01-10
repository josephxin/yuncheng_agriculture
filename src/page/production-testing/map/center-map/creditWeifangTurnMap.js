/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import echarts from 'echarts';

import weifangJson from './370700-weifang.json';
/*地图symbol*/
import greenScatter from './img/green-scatter.png';
import yellowScatter from './img/yellow-scatter.png';
/*提示框*/
import MapTooltip from './creditMapTooltip';


import NumberCard from '../gradientNumber';

import Geo from './geo/geo';

class WeifangTurnMap extends React.Component {
  constructor(props) {
    super(props);
    let me = this;

    me.geo = new Geo({
      mapLayoutSize: '77%',//
      mapAspectScale: '0.75',//和mapLayoutSize配合控制地图大小
      center: ['52%', '46%'],//地图位置
      mapType: 'weifang',//哪个城市的地图
      area1Color: 'rgba(12,255,255,0.5)',//下层颜色
      area1BorderColor: '#02748d',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: false,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#cfe6ff',//地图上文字颜色
      mapLabelFontSize: 18,//地图上文字大小
      area2BorderColor: '#13fafc',//上层边框颜色
      area2BorderWidth: 2,//上层边框宽度
      area2BorderHoverColor: '#13fafc',//鼠标移上去的边框颜色
      colorStart: 'rgba(12,255,255,1)',//鼠标移上地图颜色渐变的起点
      colorEnd: 'rgba(12,255,255,0.5)'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
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
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '昌乐',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '昌邑',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '坊子',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '高密',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '寒亭',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '奎文',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '临朐',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '青州',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '寿光',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '潍城',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
      }, {
        name: '诸城',
        value: me._randomValue(),
        white: me._randomValue(),
        black: me._randomValue()
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
  
  _setData2(d) {
	    let me = this;
	    //alert(JSON.stringify(me.initData));
	    me.initData = d[0];
	    //alert(JSON.stringify(me.initData));
	    this.componentDidMount2();
	    me.numberCardRef._setData({lTotal:d[1][0],rTotal:d[2][0]});
	  }
  

  componentDidMount2() {
	    let me = this;
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

    let lTotal = 0;
    let rTotal = 0;
    sortData.forEach(function (item, index) {
      lTotal += parseFloat(item.value);
      rTotal += parseFloat(item.black);
    });
    me.numberCardRef._setData({
      lTotal, rTotal
    });

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
    let greenColor = '#01e8b2';
    let yellowColor = '#ebf17d';
    let scatterData = [];
    let effectScatterData = [];
    for (let i in me.geoCoord) {
      /*涟漪效果*/
      let effectScatter = {};
      /*普通的symbol*/
      let scatter = {};
      mapData.forEach((item, index) => {
        if (item.name.indexOf(i) > -1) {
          /*测试用数据*/
          if (i.indexOf('安丘') > -1 || i.indexOf('昌邑') > -1 || i.indexOf('高密') > -1 || i.indexOf('奎文') > -1 || i.indexOf('青州') > -1 || i.indexOf('潍城') > -1) {
            effectScatter.itemStyle = {
              color: greenColor
            };
            effectScatter.symbolCor = 'green';
            scatter.itemStyle = {
              color: greenColor
            };
            scatter.symbolCor = 'green';
          } else if (i.indexOf('昌乐') > -1 || i.indexOf('坊子') > -1 || i.indexOf('寒亭') > -1 || i.indexOf('临朐') > -1 || i.indexOf('寿光') > -1 || i.indexOf('诸城') > -1) {
            effectScatter.itemStyle = {
              color: yellowColor
            };
            effectScatter.symbolCor = 'yellow';
            scatter.itemStyle = {
              color: yellowColor
            };
            scatter.symbolCor = 'yellow';
          }
          let val = Math.floor(Math.random() * 100);
          effectScatter.name = i;
          effectScatter.all = item;
          effectScatter.value = me.geoCoord[i].concat(val);

          scatter.name = i;
          scatter.all = item;
          scatter.value = me.geoCoord[i].concat(val);
          //json.symbol = 'circle'
        }
      });
      scatterData.push(scatter);
      effectScatterData.push(effectScatter);
    }

    let option = {
      tooltip: {
        show: false
      },
      visualMap: {
        min: 0,
        max: visualMax,
        text: ['红名单企业数量', ''],
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
          mapType: 'weifang',
          geoIndex: 1,
          data: mapData
        },
        {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          z: 2,
          symbol: 'circle',
          symbolSize: [14, 7],
          symbolOffset: [5, 15],
          /*itemStyle: {
            normal: {
              color: 'yellow'
            }
          },*/
          rippleEffect: {
            period: 8,
            scale: 3,
            brushType: 'fill'
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
          data: effectScatterData
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          z: 3,
          //symbol: 'circle',
          symbolSize: [18, 24],
          symbolOffset: [5, 2],
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
          data: scatterData.map(function (item, i) {
            if (item.symbolCor.indexOf('green') > -1) {
              item.symbol = 'image://' + greenScatter;
            } else if (item.symbolCor.indexOf('yellow') > -1) {
              item.symbol = 'image://' + yellowScatter;
            }
            return item;
          })
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
        <NumberCard leftTitle={'红名单企业'} rightTitle={'白名单企业'} ref={ref => {
          me.numberCardRef = ref;
        }}/>
      </div>
    );
  }


}

export default WeifangTurnMap;

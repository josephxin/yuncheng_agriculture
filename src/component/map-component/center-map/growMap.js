/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import echarts from 'echarts';

import weifangJson from './370700-weifang.json';
/*地图symbol*/
import fruitSymbol from './grow-map-img/fruit-symbol.png';//23*27
import appleSymbol from './grow-map-img/apple-symbol.png';//18*20
import vegetableSymbol from './grow-map-img/vegetable-symbol.png';//24 20
import cukeSymbol from './grow-map-img/cuke-symbol.png';//16 32

/*提示框*/
import MapTooltip from './growMapTooltip';

import Geo from './geo/geo';

import ellipseBg from './grow-map-img/circle.png';

class WeifangGrowMap extends React.Component {
  constructor(props) {
    super(props);
    let me = this;

    me.geo = new Geo({
      mapLayoutSize: '85%',//
      mapAspectScale: '0.75',//和mapLayoutSize配合控制地图大小
      center: ['50%', '49%'],//地图位置
      mapType: 'weifang',//哪个城市的地图
      area1Color: 'rgba(12,255,255,0.5)',//下层颜色
      area1BorderColor: '#02748d',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: false,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#cfe6ff',//地图上文字颜色
      mapLabelFontSize: 18,//地图上文字大小
      area2BorderColor: '#13fafc',//上层边框颜色
      area2BorderWidth: 3,//上层边框宽度
      area2BorderHoverColor: '#03e289',//鼠标移上去的边框颜色
      colorStart: '#02b270',//鼠标移上地图颜色渐变的起点
      colorEnd: '#01cb95'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
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
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '昌乐',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '昌邑',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '坊子',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '高密',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '寒亭',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '奎文',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '临朐',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '青州',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '寿光',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '潍城',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }, {
        name: '诸城',
        value: me._randomValue(),
        mainCrops: '黄瓜',
        base: '2000个',
        greenhouse: '15000个',
        tpaos: '1300个'
      }
    ].sort(function (a, b) {
      return b.value - a.value;
    });

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

  _setData(d,e) {
    let me = this;
    console.log(d,e)
    me._flag = true;
  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me._mapChartRef);
    let data = me.initData.slice();
    /*let data = data.sort(function (a, b) {
      return b.value - a.value;
    });*/
    let scatterData = [
      {
        name: '黄瓜',
        value: '1',
        coord: [119.121839, 36.599652]
      }, {
        name: '苹果',
        value: '1',
        coord: [118.521839, 36.899652]
      }, {
        name: '蔬菜',
        value: '1',
        coord: [118.761839, 36.399652]
      }, {
        name: '水果',
        value: '1',
        coord: [119.321839, 36.999652]
      }, {
        name: '蔬菜',
        value: '1',
        coord: [119.091839, 37.299652]
      }, {
        name: '水果',
        value: '1',
        coord: [118.861839, 36.989652]
      }, {
        name: '黄瓜',
        value: '1',
        coord: [119.221839, 35.999652]
      }, {
        name: '苹果',
        value: '1',
        coord: [118.787839, 37.239652]
      }];
    me.initChartOption(scatterData);
    clearInterval(me.timer);
    let c = 0;
    data.forEach((item, index) => {
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
      me.handleOpenModal(data[c]);
      for (let i = 0; i < data.length; i++) {
        me._echartsInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: i
        });
      }
      me._echartsInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        name: data[c]["name"]
      });
      //me._mapTooltipRef.refs.mapToolTip.style.transition = 'all 0.5s';
      c++;
      if (c >= data.length) {
        c = 0;
      }
    }, 3000);

    me._echartsInstance.on('click', function (e) {
      // console.log(e)
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
    var valueMax = 0;
    me.initData.map((item,i)=>{
      if(item.value>valueMax){
        valueMax = item.value;
      }
    })
    let visualMax = Math.ceil(valueMax / 100) * 100;
    let scatterData = [];

    mapData.forEach((item, index) => {
      let scatter = {};
      scatter.name = item.name;
      if (item.name.indexOf('黄瓜') > -1) {
        scatter.symbol = 'image://' + cukeSymbol;
        scatter.symbolSize = [16, 32];
      } else if (item.name.indexOf('苹果') > -1) {
        scatter.symbol = 'image://' + appleSymbol;
        scatter.symbolSize = [18, 20];
      } else if (item.name.indexOf('蔬菜') > -1) {
        scatter.symbol = 'image://' + vegetableSymbol;
        scatter.symbolSize = [24, 20];
      } else if (item.name.indexOf('水果') > -1) {
        scatter.symbol = 'image://' + fruitSymbol;
        scatter.symbolSize = [23, 27];
      }


      scatter.value = item.coord.concat(item.value);

      scatterData.push(scatter);
    });

    let option = {
      tooltip: {
        show: false
      },
      visualMap: {
        min: 0,
        max: visualMax,
        text: ['种植面积', ''],
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
          data: me.initData.slice()
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          z: 2,
          // symbol: 'image://' + scatterSymbol,
          // symbolSize: [31, 32],
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
             style={{...me.props.style, position: 'absolute', left: 0, top: 0, zIndex: 1}}>
        </div>
        <MapTooltip ref={ref => {
          me._mapTooltipRef = ref;
        }} text={'核心种植作物:'}/>

        <div style={{
          width: '609px',
          height: '468px',
          background: 'url(' + ellipseBg + ') no-repeat center',
          backgroundSize: 'contain',
          position: 'absolute',
          bottom: '-30px',
          left: '130px',
          zIndex: 0
        }}>

        </div>
      </div>
    );
  }
}

export default WeifangGrowMap;

import React, {Component} from 'react';
import echarts from 'echarts';
import mapJson from './370700-weifang.json';

import Geo from './geo/geo';

class WeifangMap extends Component {

  constructor(props) {
    super(props);
    let me = this;

    me.mapLayoutSize = me.props.layoutSize || '95%';
    me.mapLabelFontSize = 14;
    me.mapType = 'vender';
    me.mapAspectScale = me.props.mapAspectScale || 0.75;
    this.option ={};
    me.geo = new Geo({
      mapLayoutSize: '95%',//
      mapAspectScale: '0.75',//和mapLayoutSize配合控制地图大小
      center: ['52%', '48%'],//地图位置
      mapType: 'weifang',//哪个城市的地图
      area1Color: 'rgba(12,255,255,0.5)',//下层颜色
      area1BorderColor: '#0e4c87',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: false,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#cfe6ff',//地图上文字颜色
      mapLabelFontSize: 14,//地图上文字大小
      area2BorderColor: '#48c6f2',//上层边框颜色
      area2BorderWidth: 2,//上层边框宽度
      area2BorderHoverColor: '#03f6ff',//鼠标移上去的边框颜色
      colorStart: '#2e8ee9',//鼠标移上地图颜色渐变的起点
      colorEnd: '#1056d1'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
    });
    me._randomValue = function () {
      return Math.round(Math.random() * 300);
    };
    /*地图的区域颜色显示相关-初始数据*/
    me.initData = [
      {name: '安丘', value: me._randomValue()},
      {name: '昌乐', value: me._randomValue()},
      {name: '昌邑', value: me._randomValue()},
      {name: '坊子', value: me._randomValue()},
      {name: '高密', value: me._randomValue()},
      {name: '寒亭', value: me._randomValue()},
      {name: '奎文', value: me._randomValue()},
      {name: '临朐', value: me._randomValue()},
      {name: '青州', value: me._randomValue()},
      {name: '寿光', value: me._randomValue()},
      {name: '潍城', value: me._randomValue()},
      {name: '诸城', value: me._randomValue()}
    ];


    me.initRangeData = [
      {
        name: '250以上',
        color: '#35ee2c',
      }, {
        name: '200-250',
        color: '#41ffef'
      }, {
        name: '150-200',
        color: '#00c0ff'
      }, {
        name: '100-150',
        color: '#fff200'
      }, {
        name: '50-100',
        color: '#ff9d00'
      }, {
        name: '0-50',
        color: '#fd296f'
      }
    ];
    me.liStyle = {
      height: '22px',
      lineHeight: '22px',
      fontSize: '16px',
      color: '#fff',
      paddingLeft: '30px',
      marginTop: '3px',
      position: 'relative'
    };
    me.dotStyle = {
      display: 'inline-block',
      position: 'absolute',
      width: ' 16px',
      height: '16px',
      borderRadius: '8px',
      top: '3px',
      left: '5px'
    };

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

  _initEchartsOption(data) {
    let me = this;
    let geoCoordMapPro = {
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
    let effectScatterData = [];
    let linesData = [];
    let centerCity = {
      name: '潍城',
      value: geoCoordMapPro['潍城'].concat(1),
      symbol: 'circle',
      // symbolSize: [10, 7],
      symbolSize: [12, 7],
      itemStyle: {
        color: '#fff'
      }
    };
    effectScatterData.push(centerCity);
    for (let i in geoCoordMapPro) {
      let effectScatter = {};
      let lines = {};
      data.forEach(function (item, index) {
        if (item.name.indexOf(i) > -1) {
          // console.log(item);
          let color = '';
          effectScatter.name = i;
          effectScatter.value = geoCoordMapPro[i].concat(item.value);
          effectScatter.all = item;
          //effectScatter.symbol = 'circle';
          if (item.value >= 0 && item.value < 50) {
            color = '#fd296f';
          } else if (item.value >= 50 && item.value < 100) {
            color = '#ff9d00';
          } else if (item.value >= 100 && item.value < 150) {
            color = '#fff200';
          } else if (item.value >= 150 && item.value < 200) {
            color = '#35ee2c';
          } else if (item.value >= 200 && item.value < 250) {
            color = '#41ffef';
          } else if (item.value >= 250 && item.value <= 300) {
            color = '#00c0ff';
          }

          effectScatter.itemStyle = {
            color: color
          };
          //effectScatter.symbolSize = [26, 26];

          lines.fromName = i;
          lines.toName = centerCity.name;
          lines.all = item;
          lines.coords = [geoCoordMapPro[i], geoCoordMapPro[centerCity.name]];
          lines.lineStyle = {
            color: color
          };
          if (geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
            linesData.push(lines);
          }
        }
      });
      if (effectScatter.name && geoCoordMapPro[effectScatter.name]) {
        effectScatterData.push(effectScatter);
      }
    }

    this.option = {
      visualMap: {
        show:false,
        //left: 'right',
        min: 500000,
        max: 38000000,
        inRange: {
            color: ['#124ea9', '#2e8ee9']
        },
        text:['High','Low'], // 文本，默认为数值文本
        calculable: false
      },
      tooltip: {
        show: true
      },
      geo: me.geo.geo,
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'weifang',
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
          symbolSize: [8, 5],
          //symbolOffset: [0, -18],
          itemStyle: {
            normal: {
              color: 'yellow'
            }
          },
          rippleEffect: {
            period: 12,
            scale: 6,
            brushType: 'fill'
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
            symbolSize: 3
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
            symbolSize: [6, 12]
          },
          label: {
            normal: {
              show: true,
              position: 'middle',
              formatter: function (d) {
                // console.log(d)
                return d.data.all.value;
              }
            }
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
    echarts.registerMap('weifang', mapJson);
    me._echartsInstance.hideLoading();
    me._echartsInstance.setOption(this.option, true);

  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me.refs.mapRef);  
    setInterval(()=>{
       me._echartsInstance.clear();
       let initData = me.state.data.slice();
       me._initEchartsOption(initData);
    },2000);
    me._echartsInstance.on('click', function (e) {
     // console.log(e);
      let date=me.option.series[0].data;
      date.map((item, i) => {
        if(i===e.dataIndex){
          /*console.log(e.dataIndex);
          console.log(i);
          console.log(me.option.series[0].data[i]);*/
          me.option.series[0].data[i].value = 38000000;
          me._echartsInstance.setOption(me.option, true);
        }else{
          me.option.series[0].data[i].value = 5;
        }
      });
        /*console.log(e.dataIndex);
        console.log(me.option.series[0].data);
        console.log(me.option.series[0].data[e.dataIndex]);*/
      
        
     //  let initData = me.state.data.slice();
     //  me._initEchartsOption(initData);

      if (me.props.mapClickHandle) {
        me.props.mapClickHandle(e);
      }
    });
    me._echartsInstance.on('dblclick', function (e) {
      if (me.props.mapDbclickHandle) {
        me.props.mapDbclickHandle(e);
      }
    })

  }


/*  componentWillUnmount() {
    let me = this;
    if (me._echartsInstance) {
      me._echartsInstance.dispose();
      me._echartsInstance = undefined;
    }
  }*/


  render() {
    let me = this;
    return (
      <div style={{...me.props.style, position: 'absolute', left: 0, top: '20px'}}>
        <div ref='mapRef' style={me.props.style}>
        </div>


        <div style={{
          position: 'absolute',
          left: '30px',
          bottom: '40px'
        }}>
          <ul>
            {me.initRangeData.map(function (item, index) {
              return (
                <li style={me.liStyle} key={index}>
                  <i style={{...me.dotStyle, backgroundColor: item.color}}>
                  </i>
                  <span>{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default WeifangMap;

import React, {Component} from 'react';
import echarts from 'echarts';
import weifang from './weifang.json';


/**
 * 潍坊板块地图
 * */

class Map extends Component {
  constructor(props) {
    super(props);
    this.dataLevelArr = [];
    this.dataLevelBCArr = [];
    this.state = {}
  };

  render() {
    return (
      <div>
        <div ref={'mapChart'} style={{
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          top: this.props.top,
          left: this.props.left,
          transform: 'rotate3d(1, 0, 0, 58deg) scale(1.09, 1.7)'
        }}></div>
      </div>
    )
  }

  componentDidUpdate() {
    let me = this;
    console.log(me.props.seriesData);
    me.option.series[1].data = me.props.seriesData;
    me.myChart.setOption(me.option);
  }

  handle1(dataMapList) {
	  if(dataMapList.length>1){
		  this.dataLevelArr = dataMapList;
	  }  
	  let me = this;
	    /**重新赋值*/
	 // alert("最里层："+JSON.stringify(this.dataLevelArr));
	    me.option.series[0].data = this.dataLevelArr;
	    me.myChart.setOption(me.option);
	}
  
  handle2(dataMapList) {
	  if(dataMapList.length>1){
		  this.dataLevelBCArr = dataMapList;
	  }
	  let me = this;
	    /**重新赋值*/
	 // alert("最里层："+JSON.stringify(this.dataLevelArr));
	    me.option.series[0].data = this.dataLevelBCArr;
	    me.myChart.setOption(me.option);
	  }
  
 /* handle1(dataMapList) {
	  *//**处理数据结果*//*
	  alert("最里层："+JSON.stringify(dataMapList));
    this.setState({
    })
  }*/
  
  componentDidMount() {
    let me = this;
    let dom = me.refs.mapChart;
    me.myChart = echarts.init(dom);
    echarts.registerMap('weifang', weifang);
    me.option = {
      tooltip: {
        trigger: 'item',
        formatter: function (p) {
          let html = '';
          me.props.tooltipList.forEach((t, i) => {
            html += `<li><span style=font-size:14px;>${t.name}</span>：<span style=color:#00ff96;font-size:24px;>${t.value}</span>${me.props.unit}</li>`
          });
          return `<div><p style=color:#fff;font-size:16px;>${p.name}</p><ul>${html}</ul></div>`
        },
        backgroundColor: 'rgba(10,46,101,0.8)',
        borderColor: '#349dff',
        borderWidth: 1
      },
      dataRange: {
        show: false,
        splitList: [
         {
              start: 0,
              end: 500,
              label: '无预警',
              color: 'green'
          }, {
            start: 501,
            end: 1000,
            label: '一级预警',
            color: '#2d5cea'
          }, {
            start: 1001,
            end: 3000,
            label: '二级预警',
            color: '#f9f821'
          }, {
            start: 3001,
            end: 6000,
            label: '三级预警',
            color: '#ee9716'
          },
          {
            start: 6001,
            end: 10000,
            label: '四级预警',
            color: '#ce352c'
          }
        ],
        textStyle: {
          fontSize: 14,
          color: '#fff'
        }
      },
      geo: [{
        map: 'weifang',
        width: 650,
        height: 390,
        zoom: 1.2,
        label: {
          normal: {
            fontSize: 14,
            show: true,
            color: '#fff'
          },
          emphasis: {
            show: false,
            color: '#292929'
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            borderColor: '#12f8fb',
            borderWidth: 1,
            opacity: 0.8,
            shadowColor: '#096bb1',
            shadowBlur: 2,
            shadowOffsetX: 1,
            shadowOffsetY: 10
          },
          emphasis: {
            areaColor: '#057eb3'
          }
        }
      }, {
        map: 'weifang',
        width: 650,
        height: 390,
        zoom: 1.2,
        label: {
          normal: {
            fontSize: 14,
            show: true,
            color: '#fff'
          },
          emphasis: {
            show: false,
            color: '#292929'
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            borderColor: '#12f8fb',
            borderWidth: 1,
            // opacity: 0.9
          },
          emphasis: {
            areaColor: '#057eb3'
          }
        }
      }],
      series: [
        {
          type: 'map',
          mapType: 'weifang',
          geoIndex: 1,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [{
            name: '寿光市',
            value: 0
          }, {
            name: '青州市',
            value: 4923.53
          }, {
            name: '昌乐县',
            value: 6759.68
          }, {
            name: '安丘市',
            value: 0
          }, {
            name: '高密市',
            value: 2127.66
          }, {
            name: '诸城市',
            value: 0
          }, {
            name: '潍城区',
            value: 0
          }, {
            name: '坊子区',
            value: 3529.22
          }, {
            name: '奎文区',
            value: 0
          }, {
            name: '昌邑市',
            value: 0
          }, {
            name: '临朐县',
            value: 30
          }, {
            name: '寒亭区',
            value: 0
          }]
        }, {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 30,
          data: me.props.seriesData
        }]
    };

    setTimeout(() => {
      me.myChart.setOption(me.option);
    }, 1000)
  }
}

export default Map;

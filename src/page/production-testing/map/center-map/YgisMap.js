/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';

/*地图*/
import * as ChartLib from './chart-library.min.js'
import red from './img/red.png'
import green from './img/green.png'
import yellow from './img/yellow.png'
import blue from './img/blue.png'
let gisMap

class WeifangGisMap extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    const gisMap = new ChartLib.TianDiMap()

    gisMap.config = {
        //viewPort: this.$refs['gisMap'],
        // 地图切片来源
        minZoom: 1,
        maxZoom: 18,
        initZoom: 12,
        center: [119.203961, 36.712418],
        mapTypeSwitchControl: true,
        defaultMap: '卫星',
        // 多边形的样式--暂时不支持渐变色
        polygonStyle: {
          color: "blue",
          weight: 3,
          opacity: 0.5,
          fillColor: "#fff",
          fillOpacity: 0.2,
        }
    }
    //gis地图数据示例
    // gisMap.data = [
    //     {name: "监测点1", coordinates: [119.170961, 36.712418], id: '1'},
    // ]
    gisMap.data = me.gisMapMarkerData;
    // gis地图多边形数据示例
    // gisMap.polygonPoints = [
    //     {
    //         id: '1',
    //         name: 'aaa',
    //         points: [
    //            [118.707156, 36.912261],
    //            [118.785345, 36.842977],
    //            [118.788794, 36.803688],
    //            [118.669212, 36.824029],
    //         ]
    //     }
    // ];
    gisMap.polygonPoints = me.gisMapPolygonData;
    // marker点击事件
    gisMap.eventListener('marker.click', function (e) {
        me.$emit('gisMapMarkerClick', e)
        //me.showBox = true
        console.log(me.$route.path);
        if (me.$route.path == "/quality") {
          document.getElementsByClassName('detailsBox')[0].style.display = 'block';
        }
    });
    // 多边形点击事件
    gisMap.eventListener('polygon.click', (e) => {
        this.$emit('polygonClick', e)
    })
    me.gisMap = gisMap;
    console.log(me.gisMap);
  }

  _setData(d) {
    
  }

  componentDidMount() {
    

  }

  handleOpenModal(info) {
    
  }

  initChartOption(mapData) {
    
  }

  componentDidUpdate() {
    
  }


  componentWillUnmount() {
    
  }

  render() {
    return(
        <div>
          {/* <div ref={ref => this._gisMap = ref}>

          </div> */}
        </div>
    )
  }
}

export default WeifangGisMap;

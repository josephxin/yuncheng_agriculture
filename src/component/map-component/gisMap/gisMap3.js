import React from 'react';
import './gisMap.css';
import jidi from './img/jidi.png';
import yiyuan from './img/yiyuan.png';
import menzhen from './img/menzhen.png';
import pf from './img/pf.png';
import gaozhong from './img/gaozhong.png';
import chuzhong from './img/chuzhong.png';
import xiaoxue from './img/xiaoxue.png';
import children from './img/children.png';
import jishufuwu from './img/jishufuwu.png';
import weixiu from './img/weixiu.png';
import yunshuqiye from './img/yunshuqiye.png';
import wuliupeisong from './img/wuliupeisong.png';
import dianshangwangzhan from './img/dianshangwangzhan.png';
import daxinglengku from './img/daxinglengku.png';
import jiayouzhan from './img/jiayouzhan.png';

const T = window.T;

class GisMap extends React.Component {
	/*
	 *  zoom:
	 *  centerPoint: 中心点
	 *  layDialog-- array(key:point, value: html): 图层标记点，弹出层HTML
	 */
	constructor(props) {
		super(props);
		const zoom = props.zoom ? props.zoom : 18;
		const centerPointX = props.centerPointX || 110.98;
		const centerPointY = props.centerPointY || 35.02;
		this.state = {
			zoom: zoom,
			centerPoint: {
				centerPointX,
				centerPointY
			},
			isImg_w: 0,
			showDetailInfo: 'block'
		};
		this.lay = null;
		this.lay2 = null;
		this.lay3 = null;
	}

	render() {
		let me = this;
		return(
			<div id="mapDiv" style={{...me.props.style, width:me.props.width || '1340px', height:me.props.height || '850px', border:'2px solid #349dff'}}></div>
		)
	}

	componentDidMount() {
		this.initMap();
		//console.log(this.props.markerArr);
	}

	/**
	 * 初始化map
	 * type: 地图类型
	 */
	initMap() {
		this.map = new T.Map("mapDiv");
		this.initSatelliteLayer();

		//设置显示地图的中心点和级别
		this.map.centerAndZoom(new T.LngLat(this.state.centerPoint.centerPointX, this.state.centerPoint.centerPointY), this.state.zoom);
		//隐藏地图左下角的天地图logo
		document.getElementsByClassName("tdt-control-copyright")[0].style.display = "none";

		this.drawCover();
	}

	//设置中心坐标
	centerTo(lng, lat, zoom) {
		//console.log(lng, lat, zoom);
		let pos = new T.LngLat(lng, lat);
		this.map.panTo(pos, zoom ? zoom : this.state.zoom);
		return this.map.lngLatToContainerPoint(pos); //返回相对屏幕的坐标
	}

	//重新绘制gis的大小
	checkResize() {
		this.map.checkResize();
	}

	/*
	 * 切换图层类型
	 */
	changeLayer(isImg_w) {
		if(isImg_w == 0) {
			//影像图层
			this.map.removeLayer(this.lay3)
			this.map.removeLayer(this.lay2)
			this.initSatelliteLayer();
		} else {
			this.map.removeLayer(this.lay)
			this.map.removeLayer(this.lay2)
			this.initGeneralLayer();
		}
	}
	/*
	 * 创建卫星地图
	 */
	initSatelliteLayer() {
		let key = "&tk=4a148053e60f37ac17ab48daff95011f";
		//let key = "";
		// 创建卫星图层
		var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}' + key;
		this.lay = new T.TileLayer(imageURL, {
			minZoom: 1,
			maxZoom: 18
		});
		this.map.addLayer(this.lay);

		// 影像地图地界图层
		var iboURL = 'http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}' + key;
		this.lay2 = new T.TileLayer(iboURL, {
			minZoom: 1,
			maxZoom: 18
		});
		this.map.addLayer(this.lay2);
	}
	/*
	 * 创建普通地图
	 */
	initGeneralLayer() {
		let key = "&tk=4a148053e60f37ac17ab48daff95011f";
		//let key ="";
		// 普通图图层
		var vecURL = 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}' + key;
		this.lay3 = new T.TileLayer(vecURL, {
			minZoom: 1,
			maxZoom: 18
		});
		this.map.addLayer(this.lay3);

		// 影像地图地界图层
		var iboURL = 'http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}' + key;
		this.lay2 = new T.TileLayer(iboURL, {
			minZoom: 1,
			maxZoom: 18
		});
		this.map.addLayer(this.lay2);
	}

	drawCover() {
		// 增加图层
		if(this.props.markerArr) {
			this.props.markerArr.map((item, i) => {
				this.addMarker(item);
			})
		}
	}

	drawShape(arr) {
		arr = arr || [];
		arr.map((item, i) => {
			//console.log(item);
			this.addMarker(item);
		})
	}

	clearOverLays() {
		this.map.clearOverLays(); //清除所有覆盖物
	}

	setMarker(markerArr) {
		//console.log(markerArr);
		this.map.clearOverLays(); //清除所有覆盖物
		markerArr.map((item, i) => {
			this.addMarker(item);
		})
	}

	addMarker(item) {
		let me = this;
		let pointX = item.pointX,
			pointY = item.pointY;
		let marker;
		let type = item.type;
		//创建图片对象
		var iconUrl;
		if(type === '医院') {
			iconUrl = yiyuan;
		} else if(type === '诊所-挂牌') {
			iconUrl = menzhen;
		} else if(type === '诊所-民间偏方') {
			iconUrl = pf;
		} else if(type === '高中') {
			iconUrl = gaozhong;
		} else if(type === '初中') {
			iconUrl = chuzhong;
		} else if(type === '小学') {
			iconUrl = xiaoxue;
		} else if(type === '幼儿园') {
			iconUrl = children;
		} else if(type === '农业技术服务点') {
			iconUrl = jishufuwu;
		} else if(type === '各类维修部') {
			iconUrl = weixiu;
		} else if(type === '运输企业') {
			iconUrl = yunshuqiye;
		} else if(type === '物流配送') {
			iconUrl = wuliupeisong;
		} else if(type === '电商网点') {
			iconUrl = dianshangwangzhan;
		} else if(type === '大型冷库') {
			iconUrl = daxinglengku;
		} else if(type === '加油站') {
			iconUrl = jiayouzhan;
		} else{
			iconUrl = jidi;
		}
		let icon = new T.Icon({
			iconUrl: iconUrl,
		});
		//向地图上添加自定义标注
		marker = new T.Marker(new T.LngLat(pointX, pointY), {
			icon: icon
		});

		marker.data = item;
		marker.iconUrl = iconUrl;

		//给marker添加点击事件
		marker.addEventListener("click", (e) => {
			//console.log('点击marker', e);
			// 定位到当前点
			me.centerTo(e.lnglat.lng, e.lnglat.lat);
		});
		//console.log(marker);
		me.map.addOverLay(marker);

		let label = new T.Label({
			text: marker.data.name,
			position: marker.getLngLat(),
			//offset: new T.Point(20, 13)
		});
		me.map.addOverLay(label);

		return marker;
	}
}

export default GisMap;
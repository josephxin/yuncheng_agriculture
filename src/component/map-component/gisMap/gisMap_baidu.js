import React from 'react';
import './gisMap.css';
const BMap = window.BMap;
class GisMap extends React.Component {
	constructor(props) {
		super(props);
		this.zoom = props.zoom || 10;
		this.centerPointX = props.centerPointX || 118.679;
		this.centerPointY = props.centerPointY || 36.798;
		this.activeMarker = null;
		this.mapType = window.BMAP_SATELLITE_MAP;

		this.markerArr = []; //用于清除标点
		this.polygonArr = []; //用于清除边界
	}
	render() {
		let me = this;
		return(
			<div id="map" style={{...me.props.style,width:me.props.width || '1340px', height:me.props.height|| '850px',border:'2px solid #349dff',}}></div>
		)
	}

	componentDidMount() {
		this.initMap();
		// this.setPolygon([
		// 	[[118.650379435,36.938660481],[118.659477488,36.938660481],[118.658576266,36.923983434],[118.649606959,36.924498418]]
		// ]);
	}
	initMap() {
		this.map = new BMap.Map("map",{
	    	mapType:this.mapType,
			enableMapClick:false,
			enableHighResolution:true
	  	});    // 创建Map实例
		this.map.centerAndZoom(new BMap.Point(this.centerPointX , this.centerPointY), this.zoom); // 初始化地图,设置中心点坐标和地图级别
		this.map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
		this.map.disableDoubleClickZoom() //关闭双击放大
	}
	checkResize(geoCoord){
		if (!Array.isArray(geoCoord)) { return }
		this.centerPointX = geoCoord[0] || this.centerPointX;
		this.centerPointY = geoCoord[1] || this.centerPointY;
		this.map.centerAndZoom(new BMap.Point(this.centerPointX , this.centerPointY), this.zoom);
	}
	//绘制标点
	setMarker(markerData){
		this.markerObj = {}; //用于定位到对应的marker
		this.removeOverlay(this.markerArr);
		markerData.map((item,i)=>{
			this.addMarker(item);
		});
		this.checkResize([this.centerPointX,this.centerPointY]);
	}
	addMarker(item){
		let url = item.iconName || 'http://api.tianditu.gov.cn/v4.0/image/marker-icon.png';
		let markerIcon = new BMap.Icon(url, new BMap.Size(25,40));
		let marker = new BMap.Marker(new BMap.Point(item.pointX, item.pointY),{icon:markerIcon}); // 创建点
			marker.data = item;
			marker.addEventListener("click",(e)=>{
				let marker = e.target;
				this.markerClick(marker);
			});
			marker.addEventListener("mouseover",(e)=>{
				let marker = e.target;
				this.setInfoWindow(marker);
			});
			marker.addEventListener("mouseout",(e)=>{
				this.map.closeInfoWindow();
			});
			this.markerObj[item.shopId] = marker;
			this.markerArr.push(marker);
			this.map.addOverlay(marker);    //增加点
	}
	markerClick(marker){
		this.markerActive(marker);
		if(typeof this.props.markerClick === 'function') {
			this.props.markerClick(marker);
		}
		//alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
	}
	markerActive(marker){
		if (this.activeMarker) {
			this.activeMarker.setAnimation(null);
		}
		this.activeMarker = marker;
		this.activeMarker.setAnimation(window.BMAP_ANIMATION_BOUNCE); //跳动的动画
	}
	setInfoWindow(marker){
		let data = marker.data;
		let html = `<div class='opt_station_hover' style="z-index:999;" id='device_online'>
			<ul class='opt_station_hover_ul'>
				<li><span class='opt_li_left'>${data.type}</span></li>
				<li><span class='opt_li_left'>名称:${data.name}</span></li>
				<li style="display: ${data.product?'block':'none'}"><span class='opt_li_left'>产品名称:${data.product}</span></li>
			</ul>
		</div>`;
		var infoWindow = new BMap.InfoWindow(html,{offset:new BMap.Size(10,-20)});
		this.map.openInfoWindow(infoWindow,new BMap.Point(marker.getPosition().lng, marker.getPosition().lat))
	}

	setPolygon(polygonData){
		this.removeOverlay(this.polygonArr);
		polygonData.map((item,i)=>{
			this.addPolygon(item);
		});
	}
	//绘制多边形
	addPolygon(coordinate) {
		let points = [];
		coordinate = coordinate || [];
		coordinate.map((item,i)=>{
			points.push(new BMap.Point(item[0],item[1]));
		});
		var polygon = new BMap.Polygon( points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建多边形
		this.polygonArr.push(polygon)
		this.map.addOverlay(polygon);   //增加多边形
	}

	//移除覆盖物
	removeOverlay(overlayArr){
		overlayArr.map((item,i)=>{
			this.map.removeOverlay(item);
		});
	}
	changeLayer(e){
		let typeArr = [window.BMAP_SATELLITE_MAP,window.BMAP_NORMAL_MAP];
		this.mapType = typeArr[e];
		this.map.setMapType(this.mapType);
	}
	centerTo(lng, lat, zoom , markerId){
		this.map.panTo(new BMap.Point(lng , lat));
		if (markerId) {
			this.markerActive(this.markerObj[markerId]);
		}
	}
}

export default GisMap;

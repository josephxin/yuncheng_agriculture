import React from 'react';

const T = window.T

class GisMap extends React.Component {

	/*
	 *  zoom:
	 *  centerPoint: 中心点
	 *  layDialog-- array(key:point, value: html): 图层标记点，弹出层HTML 
	 */
	constructor(props) {
		super(props);
		const zoom = props.zoom ? props.zoom : 10;
		const centerPointX = props.centerPointX || 118.679;
		const centerPointY = props.centerPointY || 36.798;
		this.state = {
			zoom: zoom,
			centerPoint: {
				centerPointX,
				centerPointY
			},
			isImg_w: 0,
			showDetailInfo: 'block'
		};
	}
	render() {
		let me = this;
		return(
			<div id="mapDiv" style={{...me.props.style,width:me.props.width || '1858px', height:me.props.height|| '850px',border:'2px solid #349dff',}}></div>
		)
	}
	componentDidMount() {
		let key = "1ab2a3f22aa7bcc72d4bdeb49e4116f9";

		//影像图层           
		let imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';
		let lay = new T.TileLayer(imageURL, {
			minZoom: 1,
			maxZoom: 18
		});
		// 地界图层
		let iboURL = 'http://t0.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';
		let lay2 = new T.TileLayer(iboURL, {
			minZoom: 1,
			maxZoom: 18
		});

		//建立地图
		this.map = new T.Map("mapDiv", {
			layers: [lay]
		});
		//this.map.addLayer(lay);
		//this.map.addLayer(lay2);

		//设置显示地图的中心点和级别
		this.map.centerAndZoom(new T.LngLat(this.state.centerPoint.centerPointX, this.state.centerPoint.centerPointY), this.state.zoom);
		if(this.props.showPolygon) {
			this.drawPolygonByPoints(this.props.areaPoint);
		}
	}

	// 如下代码是弹出层调用事例
	/*let _marker = this.addMarker(this.state.centerPoint.centerPointX, this.state.centerPoint.centerPointY, "http://api.tianditu.gov.cn/img/map/markerA.png");
	  let sContent =
			"<div style='margin:0px;'>" +
			"<div style='margin:10px 10px; '>" +
			"<img style='float:left;margin:0px 10px' src='http://lbs.tianditu.gov.cn/images/logo.png' width='101' height='49' title='天安门'/>" +
			"<div style='margin:10px 0px 10px 120px;'>电话 : (010)88187700 <br>地址：北京市顺义区机场东路国门商务区地理信息产业园2号楼天地图大厦" +
			"</div>" +
			"<input  id='keyWord' value='机场' type='text' style='border: 1px solid #cccccc;width: 180px;height: 20px;line-height: 20px;padding-left: 10px;display: block;float: left;'>" +
			"<input style='margin-left:195px;  width: 80px;height: 24px; text-align: center; background: #5596de;color: #FFF;border: none;display: block;cursor: pointer;' type='button' value='周边搜索'  onClick=\"localsearch.searchNearby(document.getElementById('keyWord').value,center,radius)\">" +
			"</div>" +
			"</div>";
	  	  
	  this.addOpenLayer(_marker, sContent);
	 */

	/*
	 * pointX: X坐标
	 * pointY: Y坐标
	 * iconName：标注物url
	 */
	addMarker(pointX, pointY, iconName) {
		let marker;
		if(!iconName) {
			marker = new T.Marker(new T.LngLat(pointX, pointY));
		} else {
			//创建图片对象
			let icon = new T.Icon({
				iconUrl: iconName,
				iconSize: new T.Point(19, 27),
				iconAnchor: new T.Point(10, 25)
			});

			//向地图上添加自定义标注
			marker = new T.Marker(new T.LngLat(pointX, pointY), {
				icon: icon
			});
		}
		this.map.addOverLay(marker);
		return marker;
	}

	/*
	 * marker: 图层
	 * _html: 弹出层HTML
	 * eventName : 默认 click
	 */
	addOpenLayer(marker, _html, eventName) {
		if(!marker || !_html) {
			return;
		}

		if(!eventName) {
			eventName = "click";
		}

		let infoWin1 = new T.InfoWindow();
		infoWin1.setContent(_html);　　
		marker.addEventListener(eventName, function() {
			marker.openInfoWindow(infoWin1);
		});
	}

	changeLayer(isImg_w) {

	}

	//绘制多边形  
	drawPolygonByPoints(points) {
		console.log(1);　
		let getPoints = [];
		if(points.length != 0) {
			//创建面对象
			for(let i = 0; i < points.length; i++) {
				getPoints.push(new T.LngLat(points[i][0], points[i][1]));
			}
			let polygon = new T.Polygon(getPoints, {
				color: "blue",
				weight: 3,
				opacity: 0.5,
				fillColor: '#fff',
				fillOpacity: 0.5
			});
			//向地图上添加面  
			this.map.addOverLay(polygon);
			polygon.addEventListener('click', this.PolygonClick.bind(this));
		}
	}

	//多边形点击事件
	PolygonClick() {
		let me = this;
		if(this.state.showDetailInfo == 'block') {
			me.props.getGisInfo('block')
			this.setState({
				showDetailInfo: 'none'
			})
		} else {
			me.props.getGisInfo('none')
			this.setState({
				showDetailInfo: 'block'
			})
		}

	}
}

export default GisMap;
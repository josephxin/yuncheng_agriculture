import React from 'react';
import './gisMap.css';
import hzs from './img/hezuoshe.png';
import hzsA from './img/hezuosheA.png';
import dp from './img/dapeng.png';
import dpA from './img/dapengA.png';
import jd from './img/jidi.png';
import jdA from './img/jidiA.png';
import jcjg from './img/jiancejigou.png';
import jcjgA from './img/jiancejigouA.png';
import pfsc from './img/pifashichang.png';
import pfscA from './img/pifashichangA.png';
const T = window.T

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
		this.needHideShapeArr = [];
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

		//return;
		this.map = new T.Map("mapDiv");
		this.initSatelliteLayer();

		//设置显示地图的中心点和级别
		this.map.centerAndZoom(new T.LngLat(this.state.centerPoint.centerPointX, this.state.centerPoint.centerPointY), this.state.zoom);
		//隐藏地图左下角的天地图logo
		document.getElementsByClassName("tdt-control-copyright")[0].style.display = "none";

		this.drawCover();

		//画坐标
		this.map.addEventListener("mousemove", this.drawXY);
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
		// 画矩形
		if(this.props.showPolygon) {
			this.drawPolygonByPoints(this.props.areaPoint, true);
		}

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
			if(item.type == '地理标志产品') {
				this.drawPolygonByPoints(item.data, false, true); //第二个参数图形是否可以点击，第三个参数是否需要隐藏
			}
			if(item.type == '绿色食品' || item.type == '无公害食品' || item.type == '有机食品' || item.type == '地理标志产品') {
				this.addMarker(item, true); //第二个参数是否需要隐藏
			} else {
				this.addMarker(item, false);
			}
		})
	}
	showShape() {
		for(var i = 0; i < this.needHideShapeArr.length; i++) {
			this.needHideShapeArr[i].show();
		}
	}
	hideShape() {
		for(var i = 0; i < this.needHideShapeArr.length; i++) {
			this.needHideShapeArr[i].hide();
		}
	}
	clearOverLays() {
		this.map.clearOverLays(); //清除所有覆盖物
		this.needHideShapeArr = [];
	}

	//高亮gis地图的icon
	highlightIcon(lng, lat) {
		let me = this;
		let overLayArr = me.map.getOverlays();
		//console.log(overLayArr);
		if(overLayArr && overLayArr.length > 0) {
			overLayArr.map((item, i) => {
				//console.log(item);
				if(item.data && item.data.pointX == lng && item.data.pointY == lat) {
					me.cancelHighlight(item);
					let type = item.data.type;
					let icon = item.getIcon();
					if(type == '检测机构') {
						icon.setIconUrl(jcjgA);
					} else if(type == '批发市场') {
						icon.setIconUrl(pfscA);
					} else if(type == '大棚') {
						icon.setIconUrl(dpA);
					} else if(type === '仓库' || type === '商超' || type === '合作社') {
						icon.setIconUrl(hzsA);
					} else {
						icon.setIconUrl(jdA);
					}
				}
			});
		}
	}

	//上一个marker取消高亮
	cancelHighlight(mark) {
		let me = this;
		//console.log(me.lastClickMarker);
		if(me.lastClickMarker) {
			let iconDefault = new T.Icon({
				iconUrl: me.lastClickMarker.iconUrl
			});
			me.lastClickMarker.setIcon(iconDefault);
		}
		if (mark) {
			me.lastClickMarker = mark;
		}
	}

	setMarker(markerArr) {
		//console.log(markerArr);
		this.map.clearOverLays(); //清除所有覆盖物
		markerArr.map((item, i) => {
			this.addMarker(item)
		})
	}

	addMarker(item, isHide) {
		let me = this;
		let pointX = item.pointX,
			pointY = item.pointY;
		let marker, customerWinInfo;
		let type = item.type;
		//创建图片对象
		var icon;
		var iconUrl;
		if(type === '仓库' || type === '商超' || type === '合作社') {
			iconUrl = item.iconName ? item.iconName : hzs;
			icon = new T.Icon({
				iconUrl: iconUrl,
			});
		} else if(type === '检测机构') {
			iconUrl = jcjg;
			icon = new T.Icon({
				iconUrl: iconUrl,
				iconSize: new T.Point(28, 24),
			});
		} else if(type === '批发市场') {
			iconUrl = pfsc;
			icon = new T.Icon({
				iconUrl: iconUrl,
				iconSize: new T.Point(24, 24),
			});
		} else if(type === '大棚') {
			iconUrl = dp;
			icon = new T.Icon({
				iconUrl: iconUrl,
				iconSize: new T.Point(24, 24),
			});
		} else {
			iconUrl = item.iconName ? item.iconName : jd;
			icon = new T.Icon({
				iconUrl: iconUrl,
			});
		}

		//向地图上添加自定义标注
		marker = new T.Marker(new T.LngLat(pointX, pointY), {
			icon: icon
		});

		marker.data = item;
		marker.iconUrl = iconUrl;
		
		//给marker添加点击事件
		marker.addEventListener("click", (e) => {
			console.log('点击marker', e);
			// 定位到当前点
			me.centerTo(e.lnglat.lng, e.lnglat.lat);

			//上一个marker取消高亮
			me.cancelHighlight(marker);

			//点击高亮
			let iconActive;
			let type = e.target.data.type;
			if(type == '检测机构') {
				iconActive = new T.Icon({
					iconUrl: jcjgA
				});
			} else if(type == '批发市场') {
				iconActive = new T.Icon({
					iconUrl: pfscA
				});
			} else if(type == '大棚') {
				iconActive = new T.Icon({
					iconUrl: dpA
				});
			} else if(type === '仓库' || type === '商超' || type === '合作社') {
				iconActive = new T.Icon({
					iconUrl: hzsA
				});
			} else {
				iconActive = new T.Icon({
					iconUrl: jdA
				});
			}
			
			//当前marker设置高亮
			marker.setIcon(iconActive);

			if(me.props.markerClick) {
				me.props.markerClick(marker);
			}
		});
		
		//给marker添加鼠标over事件
		marker.addEventListener("mouseover", (e) => {
			//console.log(e);
			var html = `<div class='opt_station_hover' style="z-index:999;" id='device_online'>
				<ul class='opt_station_hover_ul'>
					<li><span class='opt_li_left'>${e.target.data.type || ''}</span></li>
					<li><span class='opt_li_left'>${me.props.name || '名称'}:${e.target.data.name}</span></li>
					<li style="display: ${e.target.data.product?'block':'none'}"><span class='opt_li_left'>产品名称:${e.target.data.product}</span></li>
				</ul>
			</div>`;

			let config = {
				//offset: [0, 30],
				position: e.lnglat
			};
			customerWinInfo = new T.Label(config);
			//console.log(customerWinInfo);
			customerWinInfo.setLabel(html);

			me.map.addOverLay(customerWinInfo);
		});
		
		//给marker添加鼠标out事件
		marker.addEventListener("mouseout", (e) => {
			me.map.removeOverLay(customerWinInfo); //移除信息窗口。
		});

		if(isHide) {
			me.needHideShapeArr.push(marker);
		}

		me.map.addOverLay(marker);
		return marker;
	}

	//绘制多边形
	drawPolygonByPoints(points, isClick, isHide) {
		//console.log(points);
		let getPoints = [];
		if(points.length != 0) {
			//创建面对象
			for(let i = 0; i < points.length; i++) {
				getPoints.push(new T.LngLat(points[i][0], points[i][1]));
			}

			//console.log(getPoints);
			let polygon = new T.Polygon(getPoints, {
				color: "blue",
				weight: 3,
				opacity: 0.5,
				fillColor: '#fff',
				fillOpacity: 0.5
			});

			if(isClick) {
				polygon.addEventListener('click', this.PolygonClick.bind(this));
			}
			if(isHide) {
				this.needHideShapeArr.push(polygon);
			}
			//向地图上添加面
			this.map.addOverLay(polygon);
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

	drawXY(e) {
		//console.log("坐标：" + e.lnglat.getLng().toFixed(6)+","+e.lnglat.getLat().toFixed(6));
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
}

export default GisMap;
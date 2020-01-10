/**
 * desc：
 * author：joseph_xin
 * date：2019-08-08
 */
import React, {
	Component
} from 'react';
import echarts from 'echarts';

import yunchengJson from './yuncheng.json';
/*地图symbol*/
import greenScatter from './img/green-scatter.png';
import yellowScatter from './img/yellow-scatter.png';
/*提示框*/
import MapTooltip from './affluent_mapTooltip';

import NumberCard from '../gradientNumber';

import Geo from './geo/geo';

class YunchengTurnMap extends React.Component {
	constructor(props) {
		super(props);
		let me = this;

		me.geo = new Geo({
			mapLayoutSize: '140%', //
			mapAspectScale: '1.15', //和mapLayoutSize配合控制地图大小
			center: ['50%', '50%'], //地图位置
			mapType: 'yuncheng', //哪个城市的地图
			area1Color: 'rgba(0, 119, 211, .3)', //下层颜色
			area1BorderColor: '#02748d', //下层边框颜色
			area1BorderWidth: 1, //下层边框宽度
			geoSilent: false, //为true时不响应鼠标事件，false响应鼠标事件
			mapFontColor: '#cfe6ff', //地图上文字颜色
			mapLabelFontSize: 18, //地图上文字大小
			area2BorderColor: '#13fafc', //上层边框颜色
			area2BorderWidth: 2, //上层边框宽度
			area2BorderHoverColor: '#13fafc', //鼠标移上去的边框颜色
			colorStart: '#14d2ff', //鼠标移上地图颜色渐变的起点
			colorEnd: '#14d2ff' //鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
		});

		me._echartsInstance = null;
		me.timer = null;
		me.int = 0;
		me._randomValue = function() {
			return Math.round(Math.random() * 1500);
		};
		me.initData = [];

		me.geoCoord = {
			'盐湖区': [110.99817, 35.01505],
			'永济市': [110.44773, 34.86716],
			'河津市': [110.71186, 35.59643],
			'稷山县': [110.98311, 35.60401],
			'新绛县': [111.2247, 35.61622],
			'万荣县': [110.83781, 35.41534],
			'闻喜县': [111.2069606781, 35.4725538232],
			'绛县': [111.56878, 35.49146],
			'临猗县': [110.77408, 35.14471],
			'夏县': [111.22031, 35.14136],
			'垣曲县': [111.67025, 35.29762],
			'芮城县': [110.69442, 34.69365],
			'平陆县': [111.1735725403, 34.8897327907]
		};

		me.data = []; //地图的数据
		me.c = 0; //地图下标
	}

	_getGeoCoord(name) {
		let me = this;
		return me.geoCoord[name];
	}

	_setData(data) {
		let me = this;
		me.initData = data;
		this.removeChart();//先销毁实例，在重新生成，事件就不会重载了。
		this.initMap();
	}

	componentDidMount() {
		this.initMap();
	}

	initMap() {
		let me = this;
		me._echartsInstance = echarts.init(me._mapChartRef);
		let data = me.initData;

		me.data = data.sort(function(a, b) {
			return b.value - a.value;
		});

		me.initChartOption(me.data);

		me.data.forEach((item, index) => {
			for(let key in me.geoCoord) {
				if(item.name == key) {
					let pos = me.geoCoord[key];
					let tipPosition = me._echartsInstance.convertToPixel({
						seriesIndex: 0
					}, pos);
					item.pos = tipPosition;
					item.rank = index + 1;
				}
			}
		});

		/*
		 _echartsInstance实例绑定的事件可以重载，所以只能写在componentDidMount钩子函数内，以免触发多次事件
		 */
		me._echartsInstance.on('click', function(e) {
			//console.log('click', e);
			if(me.props.mapClickHandle) {
				me.props.mapClickHandle(e);
			}
		});
		/*
		 没有mouseenter和mouseleave事件
		 */
		me._echartsInstance.on('mouseover', function(e) {
			//console.log('mouseover', e);
			//console.log(me, this);//me指向YunchengGrowMap，this指向Echarts
			//return;
			if(me.data && me.data.length > 0) {
				let index = e.dataIndex;
				//设置当前项高亮
				if(me.data[index]) {
					me._echartsInstance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						name: me.data[index]["name"]
					});
					me.handleOpenModal(me.data[index]);
				}
			}
		});

		me._echartsInstance.on('mouseout', function(e) {
			//console.log('mouseout', e);
			//return;
			//取消所有项的高亮
			for(let i = 0; i < me.data.length; i++) {
				me._echartsInstance.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: i
				});
			}
			me.handleCloseModal();
		});
	}

	intervalFn() {
		let me = this;
		//console.log(me, me.data, me.c);
		if(me.data[me.c]) {
			me.handleOpenModal(me.data[me.c]);
			for(let i = 0; i < me.data.length; i++) {
				me._echartsInstance.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: i
				});
			}
			me._echartsInstance.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				name: me.data[me.c]["name"]
			});
			me.c++;
			if(me.c >= me.data.length) {
				me.c = 0;
			}
		}
	}

	clearIntervalFn() {
		if(this.int == 1) {
			this.int--;
		}
		clearInterval(this.timer);
		this.timer = null;
		this.handleCloseModal();
	}

	handleOpenModal(info) {
		//console.log(info);
		let me = this;
		if(!info) {
			return false;
		} else {
			info.flag = true;
			me._mapTooltipRef.setState(info);
		}
	}

	handleCloseModal() {
		let me = this;
		me._mapTooltipRef.setState({
			flag: false
		});
	}

	initChartOption(mapData) {
		let me = this;
		let greenColor = '#01e8b2';
		let scatterData = [];
		let effectScatterData = [];

		for(let key in me.geoCoord) {
			let value = me.geoCoord[key];
			/*涟漪效果*/
			let effectScatter = {};
			/*普通的symbol*/
			let scatter = {};
			mapData.forEach((item, index) => {
				if(item.name == key) {

					effectScatter.itemStyle = {
						color: greenColor
					};
					effectScatter.symbolCor = 'green';
					scatter.itemStyle = {
						color: greenColor
					};
					scatter.symbolCor = 'green';
					scatter.symbol = 'image://' + greenScatter;

					effectScatter.name = key;
					effectScatter.all = item;
					effectScatter.value = value;
					scatter.name = key;
					scatter.all = item;
					scatter.value = value;
					//json.symbol = 'circle'
					item.geoCoord = value;
				}
			});
			scatterData.push(scatter);
			effectScatterData.push(effectScatter);
		}
		//console.log(scatterData);
		//console.log(effectScatterData);
		let option = {
			tooltip: {
				show: false
			},
			visualMap: {
				show: false,
				text: ['农投品店数量', ''],
				realtime: false,
				calculable: true,
				inRange: {
					color: ['#005dc6', '#009dff']
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
			series: [{
					name: '',
					type: 'map',
					mapType: 'yuncheng',
					geoIndex: 1,
					data: mapData
				},
				{
					name: '',
					type: 'effectScatter',
					silent: true,
					coordinateSystem: 'geo',
					zlevel: 2,
					z: 2,
					symbol: 'circle',
					symbolSize: [14, 7],
					symbolOffset: [5, 15],
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
					silent: true,
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
					data: scatterData
				}
			]
		};

		me._echartsInstance.showLoading();
		echarts.registerMap('yuncheng', yunchengJson);
		me._echartsInstance.hideLoading();
		me._echartsInstance.setOption(option, true);
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		this.removeChart();
	}

	removeChart() {
		if(this._echartsInstance) {
			this._echartsInstance.dispose();
		}
	}

	render() {
		let me = this;
		return(
			<div style={{...me.props.style, position: 'relative'}}>
        <div ref={ref => me._mapChartRef = ref}
             style={{...me.props.style, position: 'absolute', left: 0, top: 0}}>
        </div>
        <MapTooltip ref={ref => {
          me._mapTooltipRef = ref;
        }}/>
      </div>
		);
	}

}

export default YunchengTurnMap;
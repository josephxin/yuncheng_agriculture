/**
 * desc：
 * author：joseph_xin
 * date：2019-09-05
 */
import React, {
	Component
} from 'react';
import echarts from 'echarts';

import yunchengJson from './yuncheng.json';

import * as Tool from '../../../../tool/tool';

/*提示框*/
import MapTooltip from './growMapTooltip';

import Geo from './geo/geo';

import ellipseBg from './grow-map-img/circle.png';

class YunchengGrowMap extends React.Component {
	constructor(props) {
		super(props);
		let me = this;

		me.geo = new Geo({
			mapLayoutSize: '85%', //
			mapAspectScale: '0.95', //和mapLayoutSize配合控制地图大小
			center: ['50%', '44%'], //地图位置
			mapType: 'yuncheng', //哪个城市的地图
			area1Color: 'rgba(0, 119, 211, .3)', //下层颜色
			area1BorderColor: '#02748d', //下层边框颜色
			area1BorderWidth: 1, //下层边框宽度
			geoSilent: false, //为true时不响应鼠标事件，false响应鼠标事件
			mapFontColor: '#cfe6ff', //地图上文字颜色
			mapLabelFontSize: 18, //地图上文字大小
			area2BorderColor: '#13fafc', //上层边框颜色
			area2BorderWidth: 3, //上层边框宽度
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
		me.scatterData = [];
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
		me.data = []; //种植分布地图的数据
		me.c = 0; //种植分布地图的下标
	}

	componentDidMount() {
		let me = this;
		me._echartsInstance = echarts.init(me._mapChartRef);
		me.data = Tool.cloneFn(me.initData);

		me.initChartOption(me.scatterData);
		//me.clearIntervalFn();

		me.data.forEach((item, index) => {
			for(let i in me.geoCoord) {
				if(item.name == i) {
					let pos = me.geoCoord[i];
					let tipPosition = me._echartsInstance.convertToPixel({
						seriesIndex: 0
					}, pos);
					item.pos = tipPosition;
					item.rank = index + 1;
				}
			}
		});

		if(me.data && me.data.length > 0) {
			//console.log(me.int);
			if(me.int == 0) {
				me.int++;
				me.intervalFn();
				me.timer = setInterval(me.intervalFn.bind(me), 3000); //必须绑定this，否则intervalFn函数内的this指向window
			}
		}

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
			if(me.data && me.data.length > 0) {
				let index = e.dataIndex;
				me.clearIntervalFn();
				//取消所有项的高亮
				for(let i = 0; i < me.data.length; i++) {
					me._echartsInstance.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				}
				//设置当前项高亮
				if(me.data[index]) {
					me._echartsInstance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						name: me.data[index]["name"]
					});
					//console.log("me.data[index]",me.data[index])
					me.handleOpenModal(me.data[index]);
				}
			}
		});

		me._echartsInstance.on('mouseout', function(e) {
			//console.log('mouseout', e);
			if(me.data && me.data.length > 0) {
				//console.log(me.int);
				if(me.int == 0) {
					me.int++;
					me.timer = setInterval(me.intervalFn.bind(me), 3000);
				}
			}
		});
	}

	_setData(d, e) {
		console.log('中心地图-原始数据', d, e);
		let me = this;
		me.clearIntervalFn();
		me.scatterData = d;
		me.initData = e;
		me.initChartOption(me.scatterData);
		me.data = Tool.cloneFn(me.initData);
		console.log('中心地图-处理后地图数据', me.data);
		me.c = 0;
		me.data.forEach((item, index) => {
			for(let i in me.geoCoord) {
				if(item.name == i) {
					let pos = me.geoCoord[i];
					let tipPosition = me._echartsInstance.convertToPixel({
						seriesIndex: 0
					}, pos);
					item.pos = tipPosition;
					item.rank = index + 1;
				}
			}

		});
		if(me.data && me.data.length > 0) {
			//console.log(me.int);
			if(me.int == 0) {
				me.int++;
				me.intervalFn();
				me.timer = setInterval(me.intervalFn.bind(me), 3000);
			}
		}
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
		//console.log('aaaaaaaaaaaaaaa',info);
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
		var valueMax = 0;
		me.initData.map((item, i) => {
			if(item.value > valueMax) {
				valueMax = item.value;
			}
		})
		let visualMax = Math.ceil(valueMax / 100) * 100;
		me.scatterData = [];

		mapData.forEach((item, index) => {
			let scatter = {};
			let bigVariety = item.bigVariety;
			scatter.name = item.name;
			scatter.symbol = 'image://' + item.symbol;
			if(bigVariety === '蔬菜') {
				scatter.symbolSize = [20, 17];
			} else if(bigVariety === '经济作物') {
				scatter.symbolSize = [20, 17];
			} else if(bigVariety === '粮食') {
				scatter.symbolSize = [20, 35];
			} else if(bigVariety === '水果') {
				scatter.symbolSize = [20, 20];
			} else if(bigVariety === '畜产') {
				scatter.symbolSize = [20, 20];
			} else if(bigVariety === '水产') {
				scatter.symbolSize = [20, 20];
			} else {
				scatter.symbolSize = [20, 20];
			}

			scatter.value = item.coord.concat(item.value);

			me.scatterData.push(scatter);
		});
		console.log('中心地图-icon数组', me.scatterData);

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
				bottom: 20,
				left: 40
			},
			geo: me.geo.geo,
			series: [{
					name: '',
					type: 'map',
					mapType: 'yuncheng',
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
					data: me.scatterData
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
		if(this._echartsInstance) {
			this._echartsInstance.dispose();
		}
		this.clearIntervalFn();
	}

	render() {
		let me = this;

		return(
			<div style={{...me.props.style, position: 'relative'}}>
        <div ref={ref => me._mapChartRef = ref} style={{...me.props.style, position: 'absolute', left: 0, top: 0, zIndex: 1}}>
        </div>

        <MapTooltip ref={ref => {
          me._mapTooltipRef = ref;
        }} text={'种植作物:'} />

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

export default YunchengGrowMap;
import React, {
	Component
} from 'react';
import echarts from 'echarts';

import yunchengJson from './yuncheng.json';

import Geo from './geo/geo';

class YunchengMap extends Component {

	constructor(props) {
		super(props);
		let me = this;
		this.state = {
			data: null,
			name: '盐湖区'
		}
		me.mapLayoutSize = me.props.layoutSize || '150%';
		me.mapLabelFontSize = 8;
		me.mapType = 'yuncheng';
		me.mapAspectScale = me.props.mapAspectScale || 0.9;

		me.geo = new Geo({
			mapLayoutSize: '150%', //
			mapAspectScale: '1.2', //和mapLayoutSize配合控制地图大小
			center: ['47%', '52%'], //地图位置
			mapType: 'yuncheng', //哪个城市的地图
			area1Color: '#074487', //下层颜色
			area1BorderColor: '#16548c', //下层边框颜色
			area1BorderWidth: 1, //下层边框宽度
			geoSilent: true, //为true时不响应鼠标事件，false响应鼠标事件
			mapFontColor: '#cfe6ff', //地图上文字颜色
			mapLabelFontSize: 12, //地图上文字大小
			area2Color: '#124ea9', //上层颜色
			area2BorderColor: '#3fadee', //上层边框颜色
			area2BorderWidth: 1, //上层边框宽度
			area2BorderHoverColor: '#3fadee', //鼠标移上去的边框颜色
			colorStart: '#124ea9', //鼠标移上地图颜色渐变的起点
			colorEnd: '#124ea9' //鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
		});
		me._randomValue = function() {
			return Math.round(Math.random() * 2000);
		};
		/*地图的区域颜色显示相关-初始数据*/
		me.initData = [];

	}

	_setData(d) {
		let me = this;
		me._flag = true;
		me.setState({
			data: d.data.slice(),
			name: d.name
		});
		//console.log(d);
		//console.log(me.state.data)
		//me._echartsInstance = echarts.init(me.yunchengMapRef);
		//me._initEchartsOption(me.state.data, me.state.name);
	}

	_flag = false;
	_tooltipTimer = null;
	_echartsInstance = undefined;
	_defaultAreaIndex = -1;

	componentDidUpdate() {
		let me = this;
		if(me._flag) {
			let scatterData = me.state.data.slice();
			me._initEchartsOption(scatterData, me.state.name);
			me._flag = false;
		}
	}

	_initEchartsOption(data, name) {
		let me = this;
		let geoCoordMapPro = {
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
		let effectScatterData = [];
		let linesData = [];
		let centerCity = {
			name: name,
			value: geoCoordMapPro[name].concat(1),
			symbol: 'circle',
			symbolSize: [8, 7]
		};
		effectScatterData.push(centerCity);
		for(let i in geoCoordMapPro) {
			let effectScatter = {};
			let lines = {};
			if(!data) {
				return;
			}
			data.forEach(function(item, index) {
				if(item.name.indexOf(i) > -1) {
					// console.log(item);
					effectScatter.name = i;
					effectScatter.value = geoCoordMapPro[i].concat(item.value);
					effectScatter.all = item;
					effectScatter.symbol = 'circle';
					effectScatter.symbolSize = [7, 5];

					lines.fromName = i;
					lines.toName = centerCity.name;
					lines.all = item;
					lines.coords = me.props.flow1 ? [geoCoordMapPro[i], geoCoordMapPro[centerCity.name]] : [geoCoordMapPro[centerCity.name], geoCoordMapPro[i]];
					//console.log(me.props.flow1)
					if(geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
						linesData.push(lines);
					}
				}
			});
			if(effectScatter.name && geoCoordMapPro[effectScatter.name]) {
				effectScatterData.push(effectScatter);
			}
		}

		let option = {
			tooltip: {
				show: true
			},
			geo: me.geo.geo,
			series: [{
					name: '',
					type: 'map',
					mapType: 'yuncheng',
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
					//symbolOffset: [0, -18],
					itemStyle: {
						normal: {
							color: '#fefa92'
						}
					},
					rippleEffect: {
						period: 12,
						scale: 2.5,
						brushType: 'stroke'
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
						formatter: function(d) {
							if(d.data.all) {
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
						symbolSize: 1
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
						symbolSize: [3, 8]
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
		echarts.registerMap('yuncheng', yunchengJson);
		me._echartsInstance.hideLoading();
		me._echartsInstance.setOption(option, true);

	}

	componentDidMount() {
		let me = this;
		me._echartsInstance = echarts.init(me.yunchengMapRef);
		me._initEchartsOption(me.state.data, me.state.name);

	}

	componentWillUnmount() {
		let me = this;
		if(me._echartsInstance) {
			me._echartsInstance.dispose();
			me._echartsInstance = undefined;
		}
	}

	render() {
		let me = this;
		return(
			<div>
        <div ref={ref=>this.yunchengMapRef=ref} style={me.props.style}>
        </div>
      </div>
		);
	}
}

export default YunchengMap;
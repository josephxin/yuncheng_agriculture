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
import yellow from './img/yellow.png';
import green from './img/green.png';

import Geo from './geo/geo';

let label = {
	show: true,
	position: 'top',
	padding: [5, 10],
	backgroundColor: 'rgba(0,0,0,.8)',
	color: '#fff',
	fontSize: 16,
}
class YunchengMap extends React.Component {
	constructor(props) {
		super(props);
		let me = this;

		me.geo = new Geo({
			mapLayoutSize: '160%', //
			mapAspectScale: '1.15', //和mapLayoutSize配合控制地图大小
			center: ['50%', '50%'], //地图位置
			mapType: 'yuncheng', //哪个城市的地图
			area1Color: 'rgba(0, 119, 211, .3)', //下层颜色
			area1BorderColor: '#02748d', //下层边框颜色
			area1BorderWidth: 1, //下层边框宽度
			geoSilent: false, //为true时不响应鼠标事件，false响应鼠标事件
			mapFontColor: '#fff', //地图上文字颜色
			mapLabelFontSize: 18, //地图上文字大小
			area2Color: 'rgba(0, 121, 229, 1)', //上层颜色
			area2BorderColor: '#13fafc', //上层边框颜色
			area2BorderWidth: 2, //上层边框宽度
			area2BorderHoverColor: '#13fafc', //鼠标移上去的边框颜色
			colorStart: '#14d2ff', //鼠标移上地图颜色渐变的起点
			colorEnd: '#14d2ff' //鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
		});

		me._echartsInstance = null;
		me.initData = [];
		me.scatterData = [{
			name: '黄河',
			value: [110.615153, 35.657498],
			symbol: 'image://' + yellow,
			label: {
				...label,
				formatter: '黄河',
			},
			tooltip: {
				formatter: function(params) {
					//console.log(params);
					var html = `<div class="tooltip-box">
						河津—>万荣—>临猗—>永济—>芮城县—>平陆—>夏县—>垣曲县
					</div>`;
					return html;
				}
			}
		}, {
			name: '汾河',
			value: [111.043824, 35.60672],
			symbol: 'image://' + green,
			label: {
				...label,
				formatter: '汾河',
			},
			tooltip: {
				formatter: function(params) {
					//console.log(params);
					var html = `<div class="tooltip-box">
						新绛—>稷山—>河津—>万荣
					</div>`;
					return html;
				}
			}
		}, {
			name: '涑水河',
			value: [111.335882, 35.426922],
			symbol: 'image://' + yellow,
			label: {
				...label,
				formatter: '涑水河',
			},
			tooltip: {
				formatter: function(params) {
					//console.log(params);
					var html = `<div class="tooltip-box">
						绛县—>闻喜—>夏县—>盐湖—>临猗—>永济
					</div>`;
					return html;
				}
			}
		}, {
			name: '姚暹渠',
			value: [111.08874, 35.108493],
			symbol: 'image://' + green,
			label: {
				...label,
				formatter: '姚暹渠',
			},
			tooltip: {
				formatter: function(params) {
					//console.log(params);
					var html = `<div class="tooltip-box">
						夏县—>盐湖—>永济
					</div>`;
					return html;
				}
			}
		}];
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
		this.removeChart();
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

		/*
		 _echartsInstance实例绑定的事件可以重载，所以只能写在componentDidMount钩子函数内，以免触发多次事件
		 */
		me._echartsInstance.on('click', function(e) {
			//console.log('click', e);
			if(me.props.mapClickHandle && e.seriesIndex == 0) {
				me.props.mapClickHandle(e);
			} else if(e.seriesIndex == 1) {

			}
		});
	}

	initChartOption(mapData) {
		let me = this;
		let option = {
			tooltip: {
				show: false
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
					type: 'scatter',
					silent: false,
					coordinateSystem: 'geo',
					zlevel: 3,
					z: 3,
					symbolSize: [18, 24],
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
						show: true,
						trigger: 'item',
						padding: 0,
					},
					geoIndex: 1,
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
      </div>
		);
	}

}

export default YunchengMap;
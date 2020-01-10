import React from 'react';
import echarts from 'echarts';
import './css/charts-style.css';
class Pie extends React.Component {
	constructor(props) {
		super(props);
		this.unit = props.unit || '公顷'
		this.state = {};
		this.name = props.name || '占比';
	}

	render() {
		return(
			<div ref={'chartsWrap'} style = {{width: this.props.width || '100%', height: this.props.height || '250px', top: this.props.top || 0}}></div>
		)
	}

	componentDidMount() {
		this.initChart();
	}

	componentDidUpdate() {

	}

	initChart(params) {
		let dom = this.refs.chartsWrap;
		if(this.chart) {
			this.chart.dispose();
		}
		this.chart = echarts.init(dom);
		this.chart.on('click', (params) => {
			if(typeof this.props.onClick == 'function') {
				this.props.onClick(params.name);
			}
		})
		if(!params) {
			return {};
		}
		let center = ['50%', '45%'];
		let seriesData = params.series || [];
		let color = params.color || [];
		let legendData = [];
		seriesData.map((item) => {
			legendData.push(item.name);
		});

		let option = {
			color: color,
			legend: {
				bottom: 0,
				left: 'center',
				data: legendData,
				textStyle: {
					color: '#fff'
				},
			},
			tooltip: {
				trigger: 'item',
				confine: true,
				textStyle: {
					align: 'left'
				},
				//padding: 0,
				//backgroundColor: 'transparent',
				formatter: `{a} <br/>{b} : {c}${this.unit} ({d}%)`
				/*formatter: function(param) {
					//console.log(param);
					var html = '',
						unit = params.unit ? params.unit : '';
					html += '<div class="tooltip-box">';
					html += param.name + '占比:' + param.percent + '%';
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
					return html;
				}*/
			},
			series: [{
				name: this.name,
				type: 'pie',
				radius: ['15%', '70%'],
				center: center,
				roseType: 'radius',
				label: {
					normal: {
						show: true,
						formatter: function(params) {
							return params.name
						},
						textStyle: {
							color: '#fff',
							fontSize: 16,
						},
					}
				},
				labelLine: {
					normal: {
						show: true,
						lineStyle: {
							color: '#fff'
						}
					}
				},
				data: seriesData,
			}]
		};
		this.chart.setOption(option, true);
	}
}

export default Pie;
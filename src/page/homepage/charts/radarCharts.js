import React from 'react';
import echarts from 'echarts';
class BarLine extends React.Component {
	constructor(props) {
		super(props);
		this.name = props.name || '数据展示';
		this.unit = props.unit || '亩';
		this.state = {
			IData: {
				indicator: [{
						name: '粮食',
						max: 25000
					},
					{
						name: '豆类',
						max: 25000
					},
					{
						name: '油料 ',
						max: 25000
					},
					{
						name: '棉花',
						max: 25000
					},
					{
						name: '蔬菜',
						max: 25000
					},
					{
						name: '中药材',
						max: 25000
					}
				],
				value: [4200, 12000, 25000, 22000, 20000, 24000]
			}
		};
	}

	setData(data) {
		this.setState({
			IData: data
		}, () => {
			//console.log(this.state.IData);//这里为最新的状态
			this.initChart(this.state.IData);
		});
	}

	render() {
		return(
			<div ref={'chartsWrap'} style={{
        width: this.props.width || '100%',
        height: this.props.height || '250px',
        position: 'absolute',
        top: `${this.props.top || 35}px`
      }}></div>
		)
	}

	componentDidMount() {
		this.initChart(this.state.IData);
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

	initChart(params) {
		let me = this;
		let dom = this.refs.chartsWrap;
		if(this.chart) {
			this.chart.dispose();
		}
		this.chart = echarts.init(dom);

		if(!params) {
			return {}
		}
		let option = {
			title: {
				show: false
			},
			tooltip: {
				trigger: 'item',
				//是否将 tooltip 框限制在图表的区域内。当图表外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
				confine: false,
				padding: 0,
				formatter: function(params) {
					//console.log(params);
					let html = '<div class="tooltip-box">';
					html += '<p>' + me.name + '</p>';
					let arr = option.radar.indicator;
					params.data.value.forEach(function(v, i) {
						html += '<p>' + arr[i].name + '：' + v + me.unit + '</p>';
					});
					html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
					return html;
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '1%',
				right: '1%',
				top: '5%',
				containLabel: true
			},
			radar: {
				// shape: 'circle',
				name: {
					textStyle: {
						fontsize: 14,
						color: '#7ecdff'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#1C8CB3'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#1C8CB3'
					}
				},
				indicator: params.indicator,
				triggerEvent: true,
				splitArea: {
					areaStyle: {
						color: [
							'rgba(3,57,104, 0.1)', 'rgba(7,74,127, 0.4)',
							'rgba(14,94,149, 0.5)', 'rgba(15,95,165, 0.6)',
							'rgba(15,95,165, 0.8)', 'rgba(15,95,165, 1)'
						].reverse()
					}
				}
			},
			series: [{
				name: me.name,
				type: 'radar',
				data: [{
					value: params.value,
					name: me.name,
					symbol: 'circle',
					symbolSize: 5,
					itemStyle: {
						normal: {
							color: '#09BC7B',
						}
					},
					lineStyle: {
						width: 3,
						color: '#09BC7B',
					}
				}],
				itemStyle: {
					normal: {
						color: "#85EDCD", // 图表中各个图区域的边框线拐点颜色
						lineStyle: {
							color: "transparent" // 图表中各个图区域的边框线颜色
						},
						areaStyle: {
							type: 'default'
						}
					}
				},
				areaStyle: {
					color: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.5,
						colorStops: [{
							offset: 0,
							color: 'red' // 0% 处的颜色
						}, {
							offset: 1,
							color: 'blue' // 100% 处的颜色
						}],
						global: false // 缺省为 false
					}
				}
			}]
		};
		this.chart.setOption(option);

		this.chart.on('click', (params) => {
			//console.log(params);
			if(params.componentType == "radar") {
				let name = params.name;
				if(typeof this.props.radarClick == 'function') {
					this.props.radarClick(name);
				}
			}
		});
	}
}

export default BarLine;
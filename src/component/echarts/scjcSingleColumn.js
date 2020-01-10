import React from 'react';
import echarts from 'echarts';
import './echarts.css';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.domRef = React.createRef();
		var titleStyle = this.props.titleStyle;
		// console.log(this.props.title);
		this.options = {
			title: {
				text: this.props.title ? this.props.title : '2017年各区县农产品采收量分析',
				left: titleStyle ? titleStyle.left : "center",
				textStyle: {
					color: "#fff",
					fontSize: titleStyle ? titleStyle.fontSize : 14
				},
			},
			color: ['#2bfdb6'],
			grid: {
				top: '20%',
				left: '4%',
				right: '3%',
				bottom: '5%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					lineStyle: {
						color: '#0a89ff'
					}
				},
				confine: true,
				padding: 0,
				backgroundColor: 'transparent',
				// position: function (point, params, dom, rect, size) {
				//   return [point[0] + 10, point[1] - size.contentSize[1]];
				// },
				formatter: function(param) {
					let html = '';
					let unit = 'g/kg';
					html += '<div class="tooltip-box">' + param[0].name + '<br/>沃土指数：';
					html += param[0].value + unit;
					html += '<i class="lt"></i><i class="rb"></i></div>';
					return html;
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				axisLabel: {
					interval: 0,
					textStyle: {
						fontSize: 14,
						color: "#bbf9ff",
					},
					margin: 10
				},
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: "#0a89ff",
						type: "solid"
					}
				},
				splitLine: {
					show: false,
				},
				data: ['奎文区', '潍城区', '寒亭区', '坊子区', '青州市', '诸城市', '寿光市', '安丘市', '高密市', '昌邑市', '昌乐县', '临朐县', '峡山区', '滨海区'],
			},
			yAxis: {
				type: 'value',
				name: 'g/kg',
				nameTextStyle: {
					color: '#fff',
					fontSize: 14,
				},
				axisLabel: {
					margin: 10,
					textStyle: {
						fontSize: 14,
						color: "#bbf9ff",
					},
					formatter: '{value}',
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					lineStyle: {
						color: "#0a89ff",
						type: "dashed",
					}
				},
			},
			series: [{
				name: '',
				type: 'bar',
				data: [5.5, 5, 4, 4, 4, 4, 4, 4, 3.5, 3.5, 3.2, 3, 2.5, 2],
				showSymbol: false,
				smooth: true,
				// areaStyle: {
				//   normal: {
				//     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				//       offset: 0,
				//       color: 'rgba(43,253,182,0.8)'
				//     }, {
				//       offset: 0.5,
				//       color: 'rgba(43,253,182,0)'
				//     }])
				//   }
				// },
				emphasis: {
					itemStyle: {
						borderWidth: 4,
						borderColor: 'rgba(24,54,133,0.6)',
						shadowColor: 'rgba(43,253,182,1)',
						shadowBlur: 10
					}
				}
			}]
		};
	}

	setData(d) {
		this.lock = true;
		this.setState({ ...d
		});
	}

	componentDidUpdate() {
		if(!this.lock) {
			return false;
		}
		const me = this;
		const state = me.state;
		const options = me.options;
		options.series[0].data = state.data;
		options.xAxis.data = state.date;
		options.title.text = state.text + '年各区县沃土指数';
		me.chart.setOption(me.options);
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}

	componentDidMount() {
		const me = this;
		const dom = me.domRef.current;
		me.chart = echarts.init(dom);
		me.chart.setOption(me.options);
	}

	render() {
		return(
			<div style={{
        position: 'absolute',
        top: this.props.top || 40,
        left: 0
      }}>
        <div style={{
          width: this.props.width || 440,
          height: this.props.height || 180
        }} ref={this.domRef}></div>
      </div>
		);
	}
};

export default Page;
import React from 'react';
import echarts from 'echarts';
import './qualitysafemark.css';

export default class QualitySafe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '黄瓜',
				children: [{
						name: "寿光市建德蔬菜专业合作社",
						value: 171
					},
					{
						name: "寿光市广业果蔬合作社",
						value: 180
					},
					{
						name: "寿光市广业果蔬合作社",
						value: 59
					},
					{
						name: "寿光市守苇蔬菜专业合作社",
						value: 325
					},
					{
						name: "寿光市守苇蔬菜专业合作社",
						value: 343
					},
					{
						name: "寿光市韬祥果蔬专业合作社",
						value: 508
					},
					{
						name: "寿光市韬祥果蔬专业合作社",
						value: 1489
					},
					{
						name: "寿光市韬祥果蔬专业合作社",
						value: 639
					},
					{
						name: "寿光市广业果蔬合作社",
						value: 1671
					},
					{
						name: "寿光市广业果蔬合作社",
						value: 918
					}
				]
			}
		};
		this.options = {
			legend: {
				orient: 'vertical',
				data: [{
					name: 'tree1',
					icon: 'rectangle'
				}],
				borderColor: '#c23531'
			},
			tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
			series: [{
				type: 'tree',
				top: 0,
				bottom: 0,
				left: '12%',
				right: '22%',
				data: [this.state.data],
				label: {
					normal: {
						position: 'left',
						fontSize: 16,
						color: '#d9eee7',
						formatter: function(params) {
							//console.log(params);
							let unit = 'kg';
							let data=params.data;
							let name = data.name;
							let value = data.value;
							let index = data.index;
							if (index==0) {
								return `{title|${name}}`;
							} else if(index==1){
								return `{a|${name}} {b|${value}} {p|${unit}}{bg|}`;
							} else if(index==2){
								return `{a|${name}} {c|${value}} {p|${unit}}{bg|}`;
							} else if(index==3){
								return `{a|${name}} {d|${value}} {p|${unit}}{bg|}`;
							}
							
						},
						/*formatter: [
							'{a|{b}} {b|{c}}{p|kg}{bg|}'
						].join('\n'),*/
						rich: {
							title: {
								padding: [0,18,0,18],
								height: 42,
								lineHeight: 42,
								backgroundColor: 'rgba(10,81,80,0.5)',
								borderColor: '#1aab12',
								borderWidth: 1,
		            borderRadius: 3,
		            color: '#d9eee7',
								fontSize: 20,
								fontWeight: 'bold',
								align: 'center',
							},
							a: {
								color: '#d9eee7',
								fontSize: 16,
								height: 26,
								lineHeight: 26,
								padding: [0,0,0,24],
							},
							b: {
								color: '#2afda5',
								fontSize: 16,
								height: 26,
								lineHeight: 26,
							},
							c: {
								color: '#3392ea',
								fontSize: 16,
								height: 26,
								lineHeight: 26,
							},
							d: {
								color: '#ffc800',
								fontSize: 16,
								height: 26,
								lineHeight: 26,
							},
							bg: {
								width: '100%',
								height: 26,
								align: 'right',
								borderColor: '#0472b7',
								borderWidth: 1,
		            borderRadius: 3,
							},
							p: {
								color: '#d9eee7',
								fontSize: 16,
								height: 26,
								lineHeight: 26,
								padding: [0,24,0,0],
							}
						}
					}
				},
				leaves: {
					label: {
						normal: {
							position: 'right'
						}
					}
				},
				lineStyle: {
					color: '#3392ea',
				},
				initialTreeDepth: 3
			}]
		}
	}
	setData(d) {
		//console.log(d);
		this.setState({ ...d
		});
	}
	render() {
		return(
			<div className={'flow-warning'}>
        <div style={{width: 1494, height: 685}} ref={ref => this.myChart = ref}>
        </div>
      </div>
		)
	}
	componentDidUpdate() {
		const me = this;
		const state = me.state;
		const options = me.options;
		options.series[0].data[0] = state.data;
		me.chart.setOption(me.options);
	}
	componentDidMount() {
		const me = this;
		me.chart = echarts.init(me.myChart);
		me.chart.setOption(me.options);
	}
	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose();
		}
	}
}
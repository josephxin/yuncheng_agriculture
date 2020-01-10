/**
 * Created by joseph_xin on 2019-12-9.
 */
import React from 'react';
import echarts from 'echarts';

let dataStyle = {
	normal: {
		label: {
			show: false
		},
		labelLine: {
			show: false
		}
	}
};
let placeHolderStyle = {
	normal: {
		color: 'rgba(22,74,143,.8)',
		label: {
			show: false
		},
		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(22,74,143,.8)',
	}
};
let centerData = ['45%', '50%'];
let radiusData = [
	['66%', '76%'],
	['49%', '59%'],
	['32%', '42%']
];

class Ring extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		me.unit = props.unit || '个';
		me.title = props.title || '标题';
		me.legendData = ['危险品资料', '法律法规', '危险事故'];
		me.seriesData = [
			[{
				name: '危险品资料',
				value: 124
			}, {
				name: '',
				value: 271 - 124
			}],
			[{
				name: '法律法规',
				value: 96
			}, {
				name: '',
				value: 271 - 96
			}],
			[{
				name: '危险事故',
				value: 51
			}, {
				name: '',
				value: 271 - 51
			}]
		];
		me.option = {
			backgroundColor: 'transparent',
			hoverAnimation: false,
			color: ['#29bcfc', '#2ce2b1', '#bee14b', '#edc047'],
			grid: {
				left: 20,
				right: 20,
				bottom: 20,
				top: 28,
			},
			legend: {
				//show: false,
				orient: 'vertical',
				x: '40%',
				y: '11%',
				icon: 'none',
				padding: 0,
				borderWidth: 0,
				itemGap: 4, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
				textStyle: {
					fontSize: 14,
					color: '#bddbfd',
					rich: {
						a: {
							fontSize: 17,
							fontWeight: 'bold',
							color: '#fffd88',
							padding: [0, 3, 0, 3]
						}
					}
				},
				formatter: (name) => {
					//console.log(name);
					//console.log(me.legendData);
					//console.log(me.seriesData);
					let index = me.legendData.indexOf(name);
					let value = me.seriesData[index][0].value;
					return `${name}{a|${value}}${me.unit}`;
				},
				data: me.legendData
			},
			tooltip: {
				show: false,
				trigger: 'item',
				backgroundColor: 'transparent',
				padding: 0,
				textStyle: {
					fontSize: 14,
					color: '#bddbfd'
				},
				formatter: (param) => {
					//console.log(param);
					return '<div style="text-align:center;position:relative;padding: 5px 10px;line-height:22px;background:rgba(27,46,70,0.85);border:1px solid #167cc4;border-radius:5px;color:#7a7a7a;box-shadow:0 0 10px 0 rgba(40,157,252,.6);">' +
						'<span style="font-size:14px; color:#fff;">' + param.name + '：<span style="color:#fddf16;">' + param.value + '</span>' + me.unit + '(' + param.percent + '%)</span>' + '</div>';
				},
			},
			series: [{
					type: 'pie',
					hoverAnimation: false,
					clockWise: false, //饼图的扇区是否是顺时针排布
					radius: radiusData[0],
					center: centerData,
					itemStyle: dataStyle,
					data: [{
							value: 124,
							name: '危险品资料',
						},
						{
							value: 271 - 124,
							itemStyle: placeHolderStyle,
							tooltip: {
								show: false
							}
						}
					]
				},
				{
					type: 'pie',
					hoverAnimation: false,
					clockWise: false,
					radius: radiusData[1],
					center: centerData,
					itemStyle: dataStyle,
					data: [{
							value: 96,
							name: '法律法规'
						},
						{
							value: 271 - 96,
							itemStyle: placeHolderStyle,
							tooltip: {
								show: false
							}
						}
					]
				},
				{
					type: 'pie',
					hoverAnimation: false,
					clockWise: false,
					radius: radiusData[2],
					center: centerData,
					itemStyle: dataStyle,
					data: [{
							value: 51,
							name: '危险事故'
						},
						{
							value: 271 - 51,
							itemStyle: placeHolderStyle,
							tooltip: {
								show: false
							}
						}
					]
				}
			]
		};
	}

	setData(d) {
		let me = this;
		me.legendData = d.legendData;
		me.seriesData = d.seriesData;
		me.option.legend.data = me.legendData;
		me.option.series = [];
		me.seriesData.map((item, i) => {
			me.option.series.push({
				type: 'pie',
				hoverAnimation: false,
				clockWise: false, //饼图的扇区是否是顺时针排布
				radius: radiusData[i],
				center: centerData,
				itemStyle: dataStyle,
				data: [{
						value: item[0].value,
						name: item[0].name,
					},
					{
						value: item[1].value,
						itemStyle: placeHolderStyle,
						tooltip: {
							show: false
						}
					}
				]
			});
		});
		me.myChart.setOption(me.option, true);
	}

	componentDidMount() {
		let me = this;
		me.myChart = echarts.init(me.chart);
		me.myChart.setOption(me.option);
	}

	render() {
		return(
			<div style={{height: '100%', position: 'relative'}}>
				<div ref={ref => this.chart = ref} style={{height: '100%'}}></div>
				<span style={{position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)', fontSize: 12, lineHeight: 1.2}} dangerouslySetInnerHTML={{__html: this.title}}></span>
			</div>
		)
	}

	componentWillUnmount() {
		if(this.myChart) {
			this.myChart.dispose();
		}
	}

}

export default Ring;
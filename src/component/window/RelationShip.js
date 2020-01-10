import React, {
	Component
} from 'react';
import echart from 'echarts';

export default class relationShip extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			market:  [{
				name: "寿光市"
			}, {
				name: "寿光市顺合蔬菜专业合作社"
			}],
			tomarket: [{
				source: "寿光市",
				target: "寿光市顺合蔬菜专业合作社"
			}],
		};
		me.boxStyle = {
			border: '1px ssssolid #f00',
			top: '25px'
		};
		me.parm = {
			width: '700px',
			height: '400px',
			showTitle: true,
			titleText: '万吨',
			titleLeft: 5,
			titleTop: 0,
			titleColor: '#fff',
			titleFontSize: 16,

			showLegend: true,
			legendLeft: 850,
			legendTop: 170,
			legendIcon: 'rect',
			legendColor: '#fff',
			legendFontSize: 14,
			legendItemWidth: 250,
			legendItemHeight: 250,

			girdTop: '20%',
			girdLeft: '2%',
			girdBottom: '1%',
			girdRight: '3%',

			xData: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
			xTextColor: '#bbf9ff',
			xTextSize: 14,
			xLineColor: '#0a89ff',
			xLineWidth: 1,
			xSymbol: ['none', 'none'],

			yTextColor: '#bbf9ff',
			yTextSize: 14,
			yLineColor: 'transparent',
			yLineWidth: 0,
			splitLineColor: '#053e7b',
			splitLineWidth: 1,
			yData: [900, 1200, 1400, 1500, 1400, 1800, 2000],

			showBarBg: false,
			barBgColor: 'rgba(255,255,255,0.25)',
			barCategoryGap: '60%',

			barColorTop: 'rgba(18,255,255,1)',
			barColorBottom: 'rgba(18,255,255,0)',
			barBorderColor: '#12ffff',
			barBorderWidth: 1,
			barBorderRadius: [0, 0, 0, 0]
		};
		me.style1 = {
			normal: {
				borderColor: 'rgba(0,255,150,.8)',
				borderWidth: 1,
				shadowBlur: 20,
				shadowColor: '#00755b',
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
							offset: 0,
							color: '#00cc78' // 0% 处的颜色
						},
						{
							offset: 1,
							color: 'rgba(0,106,52,.8)' // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				}
			}
		};
		me.style2 = {
			normal: {
				borderColor: 'rgba(0,255,150,.8)',
				borderWidth: 1,
				shadowBlur: 20,
				shadowColor: '#0096ff',
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
							offset: 0,
							color: '#13baff' // 0% 处的颜色
						},
						{
							offset: 1,
							color: 'rgba(0,92,186,.8)' // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				}
			}
		};
	}

	render() {
		let me = this;
		return(
			<div>
        <span style={{fontSize:'18px',display:'block',color:'#fff',position:'absolute',top:'84px',right:'88px'}}></span>
        <div style={{...me.boxStyle,width:this.props.width||'800px',height:this.props.height||'480px'}} ref={'echarts'}>
        </div>
      </div>
		)
	}

	componentDidMount() {
		//console.log(this.state.market)
	}

	componentDidUpdate() {

	}
	setData(val) {
		this.setState({
			market: val
		})
		console.log(val)
		let me = this;
		let box = me.refs.echarts;
		let echarts = echart.init(box);

		let option = {
			tooltip: {},
			color: ['#83e0ff', '#45f5ce', '#b158ff'],
			series: [{
				type: 'graph',
				layout: 'force',
				focusNodeAdjacency: true,
				force: {
					repulsion: 1200,
					edgeLength: 200
				},
				symbolSize: 80,
				roam: true,
				label: {
					normal: {
						show: true
					}
				},
				edgeSymbolSize: [4, 10],
				edgeLabel: {
					normal: {
						show: false,
						textStyle: {
							fontSize: 13
						},
						formatter: '{c}'
					}
				},
				data: this.state.market,
				links: this.state.tomarket,
				lineStyle: {
					normal: {
						curveness: 0.2,
						width: 1,
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: 'rgba(0,126,255,.1)' // 0% 处的颜色
								},
								{
									offset: 0.94,
									color: '#13bfff' // 94% 处的颜色
								},
								{
									offset: 1,
									color: '#affcff' // 100% 处的颜色
								}
							]
						}
					}
				},
				itemStyle: {
					normal: {
						borderColor: 'rgba(0,255,150,.8)',
						borderWidth: 1,
						shadowBlur: 20,
						shadowColor: '#0096ff',
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: '#13baff' // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(0,92,186,.8)' // 100% 处的颜色
								}
							],
							globalCoord: false, // 缺省为 false
						}
					}
				}
			}]
		}

		echarts.setOption(option);
	}
	setData1(val) {
		this.setState({
			tomarket: val
		})
		console.log(val)
		let me = this;
		let box = me.refs.echarts;
		let echarts = echart.init(box);

		let option = {
			tooltip: {},
			color: ['#83e0ff', '#45f5ce', '#b158ff'],
			series: [{
				type: 'graph',
				layout: 'force',
				focusNodeAdjacency: true,
				force: {
					repulsion: 1200,
					edgeLength: 200
				},
				symbolSize: 80,
				roam: true,
				label: {
					normal: {
						show: true
					}
				},
				edgeSymbolSize: [4, 10],
				edgeLabel: {
					normal: {
						show: false,
						textStyle: {
							fontSize: 13
						},
						formatter: '{c}'
					}
				},
				data: this.state.market,
				links: this.state.tomarket,
				lineStyle: {
					normal: {
						curveness: 0.2,
						width: 1,
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: 'rgba(0,126,255,.1)' // 0% 处的颜色
								},
								{
									offset: 0.94,
									color: '#13bfff' // 94% 处的颜色
								},
								{
									offset: 1,
									color: '#affcff' // 100% 处的颜色
								}
							]
						}
					}
				},
				itemStyle: {
					normal: {
						borderColor: 'rgba(0,255,150,.8)',
						borderWidth: 1,
						shadowBlur: 20,
						shadowColor: '#0096ff',
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: '#13baff' // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(0,92,186,.8)' // 100% 处的颜色
								}
							],
							globalCoord: false, // 缺省为 false
						}
					}
				}
			}]
		}

		echarts.setOption(option);
	}
}
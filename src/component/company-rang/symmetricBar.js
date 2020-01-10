import React, {
	Component
} from 'react';
import echarts from 'echarts'

class HosBar extends Component {
	constructor(props) {
		super(props);
		this.flag = props.flag || false;
		this.title = props.title || '';
		this.state = {
			echartsData: {
				'yData1': ['AAA', 'AAA', 'AA', 'AA', 'AA', 'A', 'A', 'A'],
				'yData2': ['D', 'DD', 'DDD', 'C', 'CC', 'CCC', 'CCC', 'CCC'],
				'data': [
					[{
							name: '寿光有限公司',
							value: -100
						},
						{
							name: '高密有限公司',
							value: -80
						},
						{
							name: '安丘有限公司',
							value: -75
						},
						{
							name: '潍城有限公司',
							value: -70
						},
						{
							name: '坊子有限公司',
							value: -65
						},
						{
							name: '诸城有限公司',
							value: -55
						},
						{
							name: '青州有限公司',
							value: -50
						},
						{
							name: '潍坊有限公司',
							value: -30
						}
					],
					[{
							name: '安乐有限公司',
							value: 100
						},
						{
							name: '艾玛科技有限公司',
							value: 70
						},
						{
							name: '云商有限公司',
							value: 60
						},
						{
							name: '奎文信息科技有限公司',
							value: 50
						},
						{
							name: '盛大网络发展有限公司',
							value: 40
						},
						{
							name: '新民有限公司',
							value: 35
						},
						{
							name: '昌乐科技有限公司',
							value: 32
						},
						{
							name: '易车有限公司',
							value: 30
						}
					]
				]
			}
		};
	}

	_setData(d) {
		let me = this;
		me.setState({
			data: d
		});
	}

	_setData2(dataList, yData1List, yData2List) {
		let me = this;
		me._option.yAxis[0].data = yData1List;
		me._option.yAxis[1].data = yData2List;
		me._option.series[0].data = dataList[0];
		me._option.series[1].data = dataList[1];
		me.myChart.setOption(me._option, true);
	}

	componentDidMount() {
		let me = this;
		const dom = me.refs.pieChart;
		me.myChart = echarts.init(dom);
		me._option = {
			color: ['#f00', '#aaa'],
			grid: {
				top: this.flag ? '10%' : '5%',
				bottom: '5%',
				left: '5%',
				right: '5%',
				containLabel: true
			},
			title: {
				text: this.title,
				top: '2%',
				left: 'center',
				textStyle: {
					color: '#fff'
				}
			},
			xAxis: [{
				type: 'value',
				name: "",
				position: 'top',
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				}
			}],
			yAxis: [{
					type: 'category',
					name: '',
					inverse: true, //是否是反向坐标轴
					axisLine: {
						lineStyle: {
							color: '#0372b1',
							width: 0
						}
					},
					axisLabel: {
						textStyle: {
							fontSize: this.flag ? 16 : 14,
							color: "#fff",
						},
						interval: 0,
						margin: 15 //刻度标签与轴线之间的距离，默认为8
					},
					axisTick: {
						show: false
					},
					data: this.state.echartsData.yData1,
				},
				{
					type: 'category',
					name: '',
					inverse: true,
					axisLine: {
						lineStyle: {
							color: '#0372b1',
							width: 0
						}
					},
					axisLabel: {
						textStyle: {
							fontSize: this.flag ? 16 : 14,
							color: "#fff",
						},
						interval: 0,
						margin: 15
					},
					axisTick: {
						show: false
					},
					data: this.state.echartsData.yData2,
				}
			],
			series: [{
					type: 'bar',
					name: '',
					stack: '总量', //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
					barWidth: this.flag ? 35 : 20,
					itemStyle: {
						normal: {
							borderColor: '#f1426c', //红色
							borderType: 'dotted',
							color: 'transparent', //必须用transparent，不能用none，否则点击不到
						}
					},
					label: {
						show: true,
						// position: this.flag ? 'inside' : 'insideRight',
						position: 'insideRight',
						fontSize: this.flag ? 20 : 12,
						color: '#f1426c',
						formatter(params) {
							// console.log(params)
							let name = params.name;
							if(!me.flag) {
								// name=name.substring(0, name.indexOf('有限公司'));
							}
							return name;
						}
					},
					data: this.state.echartsData.data[0]
				},
				{
					type: 'bar',
					name: '',
					stack: '总量',
					itemStyle: {
						normal: {
							borderColor: '#6fe5f1', //蓝色
							borderType: 'dotted',
							color: 'transparent',
						}
					},
					label: {
						show: true,
						// position: this.flag ? 'inside' : 'insideLeft',
						position: 'insideLeft',
						fontSize: this.flag ? 20 : 12,
						color: '#6fe5f1',
						formatter(params) {
							//console.log(params)
							let name = params.name;
							if(!me.flag) {
								//  name=name.substring(0, name.indexOf('有限公司'));
							}
							return name;
						}
					},
					data: this.state.echartsData.data[1]
				}
			]
		}
		me.myChart.setOption(me._option);
		me.myChart.on('click', (params) => {
			//console.log(params);
			let name = params.name;
			if(typeof this.props.click == 'function') {
				this.props.click(name);
			}
		});
	}

	render() {
		return(
			<div className="chart-wrapper" ref={'pieChart'} style={{position:'absolute',
        width: this.props.width || 440,
        height: this.props.height || 250,
        top:this.props.top || 0,
        left:this.props.left || 0,}}></div>
		)
	}
}
export default HosBar;
/**
 * Created by joseph_xin on 2019-12-17.
 */
import React from 'react';
import echarts from 'echarts';
//import 'echarts-liquidfill';
import '../../../component/echarts/vender/echarts-liquidfill.js';

class Water extends React.Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			
		};
		me.option = {
			grid: {
				top: 60,
				left: 40,
				right: 20,
				bottom: 60,
				containLabel: true
			},
			series: [
				{ //中间的水
					type: 'liquidFill',
					data: [0.3, 3/9],
					radius: '50%',
					silent: true,
					// 水球颜色
					color: ['rgba(55,115,207,.8)', 'rgba(55,115,207,.6)'],
					center: ["50%", "50%"],
					label: {
						show: false,
						color: '#294D99',
						insideColor: '#fff',
						fontSize: 40,
						fontWeight: 'bold',

						align: 'center',
						baseline: 'middle',
						position: 'inside'
					},
					outline: {
						show: false
					},
					// 内图 背景色 边
					backgroundStyle: {
						color: 'transparent',
					}
				}
			]
		};
		
		me._containerStyle = {
			width: props.width ? `${props.width}px` : '100%',
			height: props.height ? `${props.height}px` : '100%',
		};
	}

	setData(d) {
		this.setState(d);
	}

	componentDidMount() {
		let me = this;
		me.chart = echarts.init(me._chart);
		me.chart.setOption(me.option);
	}

	componentDidUpdate() {
		
	}

	render() {
		return(
			<div ref={ref => this._chart = ref} style={this._containerStyle}></div>
		)
	}

	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose()
		}
	}

}

export default Water;
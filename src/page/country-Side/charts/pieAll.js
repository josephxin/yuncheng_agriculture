/**
 * Created by admin on 2018-12-12.
 */
import React from 'react';
import echarts from 'echarts';
// import './vender/echarts-liquidfill';

class Pie extends React.Component {
	constructor(props) {
		super();
		this.state = {
			seriesData: [{
				value: 38,
				name: '粮食'
			}, {
				value: 40,
				name: '油料'
			}, {
				value: 60,
				name: '蔬菜'
			}, {
				value: 32,
				name: '水果'
			}, {
				value: 30,
				name: '其他'
			}]
		};
		const style = props.style || {};
		this._containerStyle = {
			position: 'absolute',
			width: style.width ? `${style.width}px` : '100%',
			height: style.height ? `${style.height}px` : '100%',
			left: `${style.left || 0}px`,
			top: `${style.top || 0}px`,
			zIndex: `${style.zIndex || ''}`,
		};
	}

	_setData(d) {
		this.setState(d)
	}

	componentDidMount() {
		this.chart = echarts.init(this._chart);
	}

	componentDidUpdate() {
		if(this.state) {
			let chart = this.chart;
			chart.off('click');
			const me = this;
			let legendData = [];
			let allValue = 0;
			this.state.seriesData.map((item) => {
				legendData.push(item.name);
				allValue = allValue + item.value;
			});
			//console.log(me.state)
			let option = {
				tooltip: {
					trigger: 'item',
          textStyle:{
            align:'left'
          },
					formatter: "{a} <br/>{b} : {c}人 ({d}%)"
				},
				legend: {
          orient: 'vertical',
          itemHeight: 10,
          top: '55',
          right: 20,
					data: legendData,
					textStyle: {
						color: '#fff'
					},
				},
				color: me.state.colorArr,
				series: [{
					name: '农村人口结构占比',
					type: 'pie',
					radius: '55%',
					center: ['45%', '57%'],
					data: me.state.seriesData,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};

			function showLabel(params) {}

			chart.setOption(option, true);

			/*默认选中第一项*/
			/*let initParams = { ...me.state.seriesData[0],
				percent: (Math.ceil(me.state.seriesData[0].value / allValue * 100))
			};
			showLabel(initParams);*/
			chart.on('click', function(params) {
				//console.log(params);
				if(me.props.getPieClick && typeof me.props.getPieClick == 'function') {
					me.props.getPieClick(params);
				}
				//showLabel(params);
			});
		}
	}
	render() {
		return(
			<div ref={ref => this._chart = ref} style={this._containerStyle}>
      </div>
		)
	}
	componentWillUnmount() {
		if(this.chart) {
			this.chart.dispose()
		}
	}
}
export default Pie

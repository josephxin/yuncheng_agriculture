/**
 * Created by admin on 2019/12/4.
 */
import React from 'react';
import 'echarts-wordcloud';
import echarts from 'echarts';

class Wordcloudl extends React.Component {
	constructor(props) {
		super(props);
		this.height = props.height || 300;
		this.sizeRange = props.sizeRange || [18, 35];
		this.tooltip=props.tooltip ? true : false;
		this.state = {
			wordCloudData: [
				//   {
				// 	name: 'Sam S Club',
				// 	value: '10000',
				// }, {
				// 	name: 'Macys',
				// 	value: '6181'
				// }, {
				// 	name: 'Amy Schumer',
				// 	value: '4386'
				// }, {
				// 	name: 'Jurassic World',
				// 	value: '405'
				// }, {
				// 	name: 'Charter Communications',
				// 	value: '2467'
				// }
			],
		};
		this.colors = ['#1371fb', '#37f7e1', '#fc3a70', '#fad562', '#c38dcb', '#00c036']; //蓝，青，红，黄
	}

	setData(data) {
		//console.log('词云', data);
		this.setState({
			wordCloudData: data
		}, () => {
			this.worldChart();
		});
	}

	worldChart() {
		let me = this;
		let myChart = echarts.init(me.refs.wordcloudl);
		myChart.setOption({
			tooltip: {
				show: me.tooltip,
				pointFormat: '{series.name}: <b>{series.value}</b>'
			},
			series: [{
				type: 'wordCloud',
				shape: 'circle',
				left: 'center',
				top: 'center',
				width: '100%',
				height: '100%',
				sizeRange: me.sizeRange,
				rotationRange: [0, 0], //Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
				rotationStep: 0,
				gridSize: 24, //单词之间的距离
				drawOutOfBound: true, //单词超出画布范围，false为不显示，true为显示
				textStyle: {
					normal: {
						fontFamily: 'sans-serif',
						fontWeight: 'bold',
						color: function() {
							return me.colors[Math.round(Math.random() * 5)];
						},
						shadowBlur: 3,
						shadowColor: '#002c46',
					},
					emphasis: {

					}
				},
				data: me.state.wordCloudData,
			}]
		}, true);
    myChart.on('click', (params) => {
      // console.log(params);
      if(params.componentType == "series") {
        let data = params.data;
        if(typeof this.props.seriesClick == 'function') {
          this.props.seriesClick(data);
        }
      }
    });


	}

	componentDidMount() {
		this.worldChart();
	}
	render() {
		return(
			<div>
        <div ref='wordcloudl' style={{height: this.height}}></div>
      </div>
		)
	}
}
export default Wordcloudl;
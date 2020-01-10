import React, {
	Component
} from 'react';
import BubbleChart from '../common/BubbleChart';
import blue from './images/bubble_blue.png';
import yellow from './images/bubble_yellow.png';
// 设置数据
let dataArr = [
	{
		name: '黄河',
		radius: 78,
		num: 396
	},
	{
		name: '汾河',
		radius: 48,
		num: 145.2
	},
	{
		name: '盐池',
		radius: 48,
	},
	{
		name: undefined, 
	},
	{
		name: undefined, 
	},
	{
		name: undefined,
	},
	{
		name: '伍姓湖',
		radius: 40,
	},
	{
		name: '硝池',
		radius: 40,
	},
	{
		name: '涑水河',
		radius: 54,
		num: 196
	},
	{
		name: '姚暹渠',
		radius: 40,
		num: 86
	},
].map(d => {
	d.fillId = d.name === '境内汾河' ? 'yellow_image' : 'blue_image';
	return d;
});
/**
 * 泡泡图 for react
 * props = {
 *  chartStyle:{width,height,left,top} <Object>
 *  onItemClick: <Function>
 * }
 * // 对象上的方法
 * setData(dataArr) // 可以用refs获取
 */
class PageBubbleChart extends Component {
	constructor(props) {
		super(props);
		const me = this;

		const style = props.style || {};

		me._containerStyle = {
			position: 'absolute',
			width: style.width ? `${style.width}px` : '100%',
			height: style.height ? `${style.height}px` : '100%',
			left: `${style.left || 0}px`,
			top: `${style.top || 0}px`,
		};
	}

	/**
	 * 设置数据的方法
	 * @param dataArr = [
	 *   {
	 *      name: '潍城区',
	 *      radius: 40,
	 *     fillId:'yellow_image'
	 *   } ...
	 * ]
	 */
	setData(dataArr) {
		const me = this;
		me._container.innerHTML='';
		//me._bubbleChart && me._bubbleChart.dispose();
		me.renderData(dataArr);
	}
	renderData(dataArr) {
		const me = this;
		let bubbleChart = new BubbleChart();
		const container = me._container;

		me._bubbleChart = bubbleChart;

		container.appendChild(bubbleChart.domElement);
		bubbleChart.resize(container.clientWidth, container.clientHeight);

		// 样式
		bubbleChart.chartStyle = {
			// 图表位置修正
			chartPositionFix: [-5, -5], //left, top
			// 椭圆力场 X,Y 轴长度的比例，长度等于 绘图区长宽的一版
			// 其实最简单的方法就是 试试
			radiusXYScale: [2.5, 2.2], // X,Y
			// 气泡背景
			bubblesBackgroundImages: [{
					path: blue,
					id: 'blue_image',
				},
				{
					path: yellow,
					id: 'yellow_image'
				}
			]
		};

		// 点击事件
		bubbleChart.click(function(v) {
			me.props.onItemClick && me.props.onItemClick(v);
		});
		
		// 添加数据并渲染
		bubbleChart.data = dataArr;
    bubbleChart.render();
	}
	componentDidMount() {
		this.renderData(dataArr);
	}

	componentWillUnmount() {
		const me = this;
		me._bubbleChart.dispose();
	}

	render() {
		const me = this;
		return(
			<div className={'page-bubble-chart'} style={me._containerStyle} ref={ref => me._container = ref}></div>
		)
	}

}

export default PageBubbleChart;

// ========= ↓↓↓ ======= 泡泡图的使用说明 ========= ↓↓↓ =======
// let bubbleChart = new BubbleChart();
// const container = document.getElementById('output_container');
// container.appendChild(bubbleChart.domElement);
// // 设置宽高
// bubbleChart.resize(container.clientWidth, container.clientHeight);
// // 设置小泡泡的数据量
// bubbleChart.smallBubbleQuantity = 200;
// // 数据
// bubbleChart.data = [
//   {
//     name: '潍城区',
//     radius: 40,
//     fillId:'yellow_image'
//   } ...
// ];
// // 样式
// bubbleChart.chartStyle = {
//   gridMargin: [10, 10, 10, 10],
//   borderColor: '#00fff6',
//   borderWidth: 1,
//   fillColor: '#00fff6',
//   smallBubbleRadiusRange: [2, 10], // min, max
//   shapeAngle: 45,
//   chartPositionFix: [-5, -5], //left, top
//   mouseHover: false,
//   bubblesBackgroundImages: [
//     {
//       path: blue,
//       id: 'blue_image'
//     },
//     {
//       path: yellow,
//       id: 'yellow_image'
//     }
//   ],
//   textFontWeight: 'bold',
//   textFontSize: 20,
//   textColor: '#00fff6',
//   radiusXYScale: [2.5, 2.5],
// };
// // 销毁
// bubbleChart.dispose();
// // render
// bubbleChart.render();
// // click
// bubbleChart.click(function (v) {
//   console.log(v);
// });
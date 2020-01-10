import React, {
	Component
} from 'react';
import * as d3 from 'd3';
//css
import './CreditSystem.css'

/**
 * 信用体系
 * */

class CreditSystem extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.unit = '';
		this.legend = [];
		this.data = [];
		this.startColor = this.props.startColor || ['#0aa4d4', '#33dfa8', '#28dd5f', '#fffd04', '#ffa500', '#f02f5e'];
		this.endColor = this.props.endColor || ['#0aa4d4', '#33dfa8', '#28dd5f', '#fffd04', '#ffa500', '#f02f5e'];
		this.w = this.props.width || 440;
		this.h = this.props.height || 268;
	}

	get colorA() {
		return this.startColor;
	}

	get colorB() {
		return this.endColor;
	}

	get width() {
		return this.w;
	}

	get height() {
		return this.h;
	}

	setData(d) {
		//console.log(d)
		//console.log(this.barChart)
		this.barChart.innerHTML = '';
		this.unit = d.unit;
		this.legend = d.legend;
		this.data = d.data;
		setTimeout(() => {
			this.componentDidMount();
		})
	}

	render() {
		return(
			<div style={{position: 'relative', top: 30}}>
        <div ref={ref => this.barChart = ref}></div>
        <div ref={ref => this.tip = ref} className={'tipBox tooltip-box'} style={{position: 'absolute', top: 50, left: 300, display: 'none'}}></div>
      </div>
		)
	}
	componentDidUpdate() {

	}
	componentDidMount() {
		const me = this;
		const w = 328; // 柱宽
		const h = 8; //柱高
		const diffy = 8; //y轴偏移距离
		const diffx = 80; // x轴偏移距离
		const unit = me.unit || '';
		const legend = me.legend;
		const data = me.data;
		const startColor = me.colorA;
		const endColor = me.colorB;
		const tipBox = me.tip;
		const y = me.props.gy || 19;
		const dx = me.props.dx || -100;
		const svgy = me.props.svgy || 45;
		let svg = d3.select(me.barChart)
			.append('svg')
			.attr('width', this.width)
			.attr('height', this.height)
			.append('g')
			.attr('transform', `translate(0,${svgy})`);
		let defs = svg.selectAll('defs')
			.data(this.colorA)
			.enter()
			.append('defs');
		let linear = defs.append('linearGradient')
			.attr('id', function(d, i) {
				return 'myGradient' + i
			})
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '100%')
			.attr('y2', '100%')
		linear.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', function(d, i) {
				return me.colorA[i]
			});
		linear.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', function(d, i) {
				return me.colorB[i]
			});

		let groups = svg.selectAll('g')
			.data(data)
			.enter()
			.append('g')
			.attr('transform', function(d, i) {
				return `translate(100,${y * i})`
			});

		// 添加提示框
		let path_g1 = groups.append('g')
			.attr('class', function(d, i) {
				return 'path_g1' + i;
			})
			.on('mouseover', function(d, i) {
				//console.log(d3.event);
				let x = d3.event.offsetX;
				let y = d3.event.offsetY;
				tipBox.style.display = 'block';
				tipBox.style.left = x + 'px';
				tipBox.style.top = y + 'px';
				let html = '';
				legend.map((t, i) => {
					html += `<li>${t}：${d['type' + i]}${unit}</li>`;
				})
				tipBox.innerHTML = `<h4>${d.name}</h4><ul class="tipUl">${html}</ul><i class="lt"></i><i class="rb"></i>`;
			})
			.on('mouseout', function() {
				tipBox.style.display = 'none';
			});

		//添加y轴文字
		groups.append('text')
			.style('font-size', 14)
			.style('fill', '#fff')
			.attr('dy', 5)
			.attr('dx', dx)
			.attr('dominant-baseline', 'middle')
			.text((d, i) => {
				return d.name.substring(0, 4);
			})
			.append('title')
			.text(function(d) {
				return d.name;
			});
		this._createBarChart(path_g1, w, h, diffy, diffx, '#0a3352', '#0b4063') // 背景柱图
		// 实体填充
		let sumArr = [];
		data.map((t) => {
			//console.log(t)
			let obj = { ...t
			};
			delete obj.name;
			let sum = 0;
			for(var key in obj) {
				sum += obj[key]
			}
			sumArr.push(sum);
		});
		//求出一组数据中的最大值
		const max = d3.max(sumArr, (t) => {
			return t; // 620
		});
		// 求柱宽与数据的比例值
		const percent_val = (w - 150) / max;
		let arr = [];
		data.map((t) => {
			let temArr = [];
			let obj = { ...t
			};
			delete obj.name;
			for(var key in obj) {
				temArr.push(obj[key] * percent_val)
			}
			arr.push(temArr)
		});
		//console.log(arr, data)
		data.map((t, i) => {
			for(var j = 0; j < arr[0].length; j++) {
				let sum = 0;
				for(var k = 0; k < j; k++) {
					sum += arr[i][k]
				}
				this._createBarChart(d3.select('.path_g1' + i), arr[i][j], h, diffy, diffx, 'url(#myGradient' + j + ')', startColor[j], true, sum);
			}
		});
	}

	// 柱图创建
	_createBarChart(path_g, w, h, diff, diffx, fillColor, sideColor, isData, m) {
		m = m ? m : 0;
		if(isData) {
			path_g.append('text')
				.attr('class', 'textVal')
				.style('font-size', 14)
				.style('fill', '#0afdff')
				.attr('dy', 10)
				.attr('dx', (d, i) => {
					return 10 + w;
				})
				.attr('dominant-baseline', 'middle')
				.text(function(d) {
					return d.value;
				});
		}

		//正面
		path_g.append('path')
			.attr('class', isData ? 'datapath' : 'bgpath')
			.attr('d', `M0,0 H${0},V${h},H0,L0,0 Z`)
			.transition()
			.duration(1000)
			.attr('d', `M${m},0 H${m + w},V${h},H${m},L${m},0 Z`)
			.attr('fill', fillColor)
			.attr('fill-opacity', 1)
			.attr('stroke', sideColor)
			.attr('stroke-width', 1)
			.attr('opacity', 0.8);
		//背面
		path_g.append('path')
			.attr('class', isData ? 'datapath' : 'bgpath')
			.attr('d', `M${0},${0} H${0},V${h - diff},H${0} Z`)
			.transition()
			.duration(1000)
			.attr('d', `M${m + diff},${-(diff - 4)} H${w + m + diff},V${h - diff},H${m} Z`)
			.attr('fill-opacity', 1)
			.attr('fill', sideColor)
			.attr('opacity', 0.8);
		//右边
		path_g.append('path')
			.attr('class', isData ? 'datapath' : 'bgpath')
			.attr('d', `M${0},0 L${0},${0} V${h - diff} L${0},${h} Z`)
			.transition()
			.duration(1000)
			.attr('d', `M${w + m},0 L${w + m + diff},${-(diff - 4)} V${h - (diff - 4)} L${w + m},${h} Z`)
			.attr('fill-opacity', 1)
			.attr('fill', sideColor)
			.attr('opacity', 0.8);
		//左边
		// path_g.append('path')
		//   .attr('class', isData ? 'datapath' : 'bgpath')
		//   .attr('d', `M0,0 L${0},${0} V${h - diff} L${0},${h} L0,0 Z`)
		//   .transition()
		//   .duration(1000)
		//   .attr('d', `M0,0 L${diff},${-diff} V${h - diff} L${0},${h} L0,0 Z`)
		//   .attr('fill-opacity', 1)
		//   .attr('fill', fillColor)
	}
}

export default CreditSystem;
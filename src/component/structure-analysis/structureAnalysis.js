import React from 'react';
import './list.css';
import * as d3 from 'd3';

class Circle {
	constructor(dom, data) {
		this.dom = dom;
		this.data = data;
		this.r = 18;
		this.R = 20;
		this.width = 40;
		this.height = 40;
		this.draw();

		this.state = {
			time: ''
		};
	}

	draw() {
		const me = this;
		me.linear = d3.scaleLinear()
			.domain([0, 100])
			.range([0, Math.PI * 2])
		me.arc = d3.arc()
			.innerRadius(me.r)
			.outerRadius(me.R)
			.startAngle(0)
			.endAngle(me.linear(me.data))
		me.arc2 = d3.arc()
			.innerRadius(me.r)
			.outerRadius(me.R + 1)
			.startAngle(0)
			.endAngle(me.linear(me.data))

		me.svg = d3.select(me.dom).append('svg')
			.attr('width', me.width)
			.attr('height', me.height)
			.attr('transform', 'translate(4,3)')
		me.g = me.svg.append('g').attr('transform', 'translate(20,20)')

		me.g.append('path')
			.attr('d', me.arc())
			.attr('fill', '#00ffb4')
		me.g.append('path')
			.attr('d', me.arc2())
			.attr('fill', '#00ffb4')
			.attr('opacity', 0.2)
		me.g.append('text')
			.text(me.data + '%')
			.attr('x', -18)
			.attr('y', 5)
			.attr('fill', '#fff')
			.attr('font-size', 12)
	}
}

class StructureAnaysis extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				/*     { name: '农林牧渔服务业', value: 41.64 },
				     { name: '林业总产值', value: 7.33 },
				     { name: '农业总产值', value: 555.19 },
				     { name: '牧业总产值', value: 328.85 },
				     { name: '渔业总产值', value: 52.89 }*/
			]
		}
	}

	_addlist() {
		const me = this;
		if(!this.state.data) {
			return
		};
		return me.state.data.map((s, i) => {
			return <li key={i}>
        <span>{s.name}</span>
        <span><i>{s.value}</i> 亿元</span>
      </li>
		})
	}

	_addDiv() {
		const me = this;
		return me.state.data.map((item, i) => {
			return <div className={'domArrs animated'} key={i} ref={'arrdom' + i}></div>
		});
	}

	render() {
		const me = this;
		return(
			<div style={{
        position: 'absolute',
        left: 26,
        top: 10
      }}>
        <div className={'structure-wrap'}>
          <ul className={'structure-list'}>
            {me._addlist()}
          </ul>
          <div className={'doms'}>
            {me._addDiv()}
          </div>
          <h4 style={{
            width: 300,
            color: '#03b7be',
            fontSize: 14,
            position: "absolute",
            left: 288,
            top: 235
          }}>＊{this.state.time}年度数据</h4>
        </div>
      </div>
		)
	}

	componentDidMount() {
		const me = this;
		me.state.data.map((item, i) => {
			let val = Math.ceil(item.value) / 10;
			new Circle(me.refs['arrdom' + i], val);
		});
	}

	setData(json) {
		this.setState({
			data: json,
			time: this.props.time
		});
		const me = this;
		json.map((item, i) => {
			let percent = Math.round(item.productionPercent * 10000) / 100;
			//let percent = (item.productionPercent * 100).toFixed(2);
			//console.log(percent);
			new Circle(me.refs['arrdom' + i], percent);
		});
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}
}
export default StructureAnaysis;
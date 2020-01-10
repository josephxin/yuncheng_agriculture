import React from 'react';
import bg from './bg.png';
import icon from './icon.png';
import uuid from 'uuid';
import * as  d3 from 'd3';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  _setData(d) {
    this.setState({
      data: d
    })
  }
  //arc 函数
  _createArc(r, R, start, end) {
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end)
      .cornerRadius([30])
    return arc()
  }
  //渐变色
  _color(startColor, endColor, x2, y2) {
    let id = uuid();
    let linearGrad = this.svg.append('defs').append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', x2)
      .attr('y2', y2)
    linearGrad.append('stop')
      .attr('offset', '0%')
      .style('stop-color', startColor)
    linearGrad.append('stop')
      .attr('offset', '100%')
      .style('stop-color', endColor)
    return id;
  }
  render() {
    return (
      <div className={'dashboard'} style={{
        position: 'absolute',
        left: this.props.left || 426,
        top: this.props.top || 32,
        transform: `scale(${this.props.scale})`
      }}>
        <div style={{
          width: 474,
          height: 182,
          background: `url(${bg})`
        }}>
          <div ref={'arcPath'}></div>
          <div style={{
            width: 178,
            height: 38,
            background: `url(${icon}) no-repeat`,
            position: 'absolute',
            bottom: -35,
            left: 149,
            color: '#fff',
            textAlign: 'center',
            lineHeight: '38px',
            fontSize: 16,
            cursor: 'pointer',
          }} onClick={this.props.showDialog}>质量安全综合指数</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    
  }
  componentDidUpdate() {
    const me = this;
    if (!me.state.data) { return }
    
    let dom=me.refs.arcPath;
    let width = 475;
    let height = 225;
    d3.select(dom).selectAll("*").remove();//清空容器
    me.svg = d3.select(dom).append('svg')
      .attr('width', width)
      .attr('height', height);
		
    let r = 216;
    let R = r + 10
    let data = me.state.data;
    let text = undefined;
    let unit = undefined;
    let color = undefined;
    if (data > 50) {
      text = '优';
      unit = '↑';
      color = '#fd296f'
    } else if (data < 50) {
      text = '差';
      unit = '↓'
      color = 'green'
    } else if (data = 50) {
      text = '中';
    }
    let _colorsText = me._color('#f9ff5c', '#ffb400', '0%', '100%');
    let _colorPath = me._color('#00fff6', '#f3ffff', '100%', '0%');
    //值域定义域
    let linear = d3.scaleLinear()
      .domain([0, 100])
      .range([-Math.PI / 2.8, Math.PI / 3])

    let g = me.svg.append('g').attr('class', 'g-arc')
      .attr('transform', 'translate(234,269)')
    //path
    g.append('path')
      .attr('d', function (d) {
        return me._createArc(r, R, -Math.PI / 2.8, Math.PI / 2.8)
      })
      .attr('fill', '#082a5a')
    //值域path
    g.append('path')
      .style('fill', `url(#${_colorPath})`)
      .transition()
      .duration(1000)
      .attrTween('d', function () {
        const move = d3.interpolate(-Math.PI / 2.8, linear(data));
        return function (t) {
          return me._createArc(r, R, -Math.PI / 2.8, move(t))
        }
      })

    //画圆
    g.append('circle')
      .attr('r', 8)
      .attr('fill', '#fff')
      .transition()
      .duration(1000)
      .attrTween('cx', function () {
        const move = d3.interpolate(-Math.PI / 2.8, linear(data));
        return function (t) {
          return (R - 5) * Math.sin(move(t))
        }
      })
      .attrTween('cy', function () {
        const move = d3.interpolate(-Math.PI / 2.8, linear(data));
        return function (t) {
          return -(R - 5) * Math.cos(move(t))
        }
      })
    //描边
    g.append('circle')
      .attr('r', 9)
      .attr('fill', '#fff')
      .attr('stroke', '#16cfe4')
      .attr('stroke-width', 6)
      .attr('opacity', 0.5)
      .transition()
      .duration(1000)
      .attrTween('cx', function () {
        const move = d3.interpolate(-Math.PI / 2.8, linear(data));
        return function (t) {
          return (R - 5) * Math.sin(move(t))
        }
      })
      .attrTween('cy', function () {
        const move = d3.interpolate(-Math.PI / 2.8, linear(data));
        return function (t) {
          return -(R - 5) * Math.cos(move(t))
        }
      })

    //文字
    g.append('text')
      .text(text)
      .attr("x", 0)
      .attr('y', -150)
      .attr('text-anchor', "middle")
      .attr('dy', 0)
      .attr('font-size', 47)
      .attr('fill', `url(#${_colorsText})`)
    g.append('text')
      .text(Number(data).toFixed(2))
      .attr("x", 0)
      .attr('y', -106)
      .attr('text-anchor', "middle")
      .attr('dy', 0)
      .attr('font-size', 30)
      .attr('fill', '#fff')
    g.append('text')
      .text(unit)
      .attr("x", 50)
      .attr('y', -110)
      .attr('text-anchor', "middle")
      .attr('dy', 0)
      .attr('font-size', 22)
      .attr('font-weight', 'bold ')
      .attr('fill', color)
  }
}
export default Dashboard;
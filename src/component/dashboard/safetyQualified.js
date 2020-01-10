import React from 'react';
import bgColor from './bgColor.png';
import icon from './icon.png';
import * as d3 from 'd3'
class SafetyQualifity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: '黄瓜', value: 84.5 },
        { name: '西红柿', value: 93.5 },
        { name: '土豆', value: 50.5 }
      ]
    }
  }
  _setData(d) {
  	//console.log(d);
    this.setState({
      data: d
    })
  }
  render() {
    return (
      <div className={'SafetyQualified'} style={{
        position: 'absolute',
        left: this.props.left || 418,
        top: this.props.top || 359,
        transform: `scale(${this.props.scale})`
      }}>
        <div style={{
          width: 489,
          height: 234,
          background: `url(${bgColor}) no-repeat`
        }}>
        </div>
        <div ref={'safetyQualiyRef'} style={{ position: 'absolute', zIndex: 10 }}></div>
        <div style={{
          width: 178,
          height: 38,
          background: `url(${icon}) no-repeat`,
          zIndex: 10,
          position: 'absolute',
          bottom: -46,
          left: 157,
          color: '#fff',
          textAlign: 'center',
          lineHeight: '38px',
          fontSize: 16,
          cursor: 'pointer',
        }} onClick={this.props.showDialog}>质量安全合格率</div>
      </div>
    )
  }
  //arc 函数
  _createArc(r, R, start, end) {
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end);
    return arc()
  }
  //画图
  _drawPicture(dataValue, r, R, x, y, color, name, fontSize, font, colorText, index) {
    const me = this;
    let myName = name;
    let num = 4;
    if (index==0) {
    	num = 7;
    }
    if (myName.length>num) {
    	myName = myName.substring(0, num) + '...';
    }
    let svg = me.svg;
    let _ticksum = 36;
    let angle = 2 * Math.PI / 36;
    let linear = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 360])
    let differAngle = Math.PI / 180;

    let pie = d3.pie()
      .value(function (d) { return d.value })

    let dataArr = []
    for (let i = 0; i < _ticksum; i++) {
      let obj = {};
      obj.value = dataValue;
      obj.name = name
      dataArr.push(obj)
    }
    let pieData = pie(dataArr);
    let g = svg.append('g')
      .attr('transform', `translate(${x} ${y})`);
    //画path
    let gPath = g.selectAll('g').data(pieData).enter().append('g')
    gPath.append('path')
      .attr('fill', 'rgba(72,220,254,0.4)')
      .attr('d', function (d, i) {
        return me._createArc(r, R, angle * i, angle * i + angle - Math.PI / 180 * 2)
      })
    //数据path
    gPath.append('path')
      .attr('fill', function (d, i) {
        if (i < Math.floor(linear(d.value) / 10)) {
          return color
        } else if (i == Math.floor(linear(d.value) / 10)) {
          return color
        }
        return 'transparent'
      })
      .attr('d', function (d, i) {
        if (i < Math.floor(linear(d.value) / 10)) {
          return me._createArc(r, R, angle * i, angle * i + angle - Math.PI / 180 * 2)
        } else if (i == Math.floor(linear(d.value) / 10)) {
          return me._createArc(r, R, angle * i, linear(d.value) * differAngle)
        }
      })
    g.append('text')
      .text(myName)
      .attr('fill', '#fff')
      .attr('font-size', fontSize)
      .attr('text-anchor', "middle")
      .attr('y', 18)
      .append('title')
    	.text(name)
    g.append('text')
      .text(dataValue + '%')
      .attr('fill', colorText)
      .attr('font-size', font)
      .attr('text-anchor', "middle")
      .attr('y', -8)
  }
  componentDidMount() {
    const me = this;
    let width = 493;
    let height = 239;
    let dom = me.refs.safetyQualiyRef;
    dom.innerHTML='';
    me.datas = me.state.data;
    me.svg = d3.select(dom).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(0,-225)');
    me.datas.map((s, i) => {
      if (i == 1) {
        me._drawPicture(s.value, 38, 55, 77, 108, '#1debf2', s.name, 16, 18, '#1cf8f9', i)
      }
      else if (i == 0) {
        me._drawPicture(s.value, 64, 87, 244, 108, '#5bf0c4', s.name, 20, 30, '#fff220', i)
      } else if (i == 2) {
        me._drawPicture(s.value, 38, 55, 412, 108, '#1debf2', s.name, 16, 18, '#1cf8f9', i)
      }
    });
  }
  componentDidUpdate(){
		this.componentDidMount()
	}
}
export default SafetyQualifity;
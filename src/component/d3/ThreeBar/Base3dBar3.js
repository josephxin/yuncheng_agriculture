/**
 * Created by admin on 2018-12-13.
 */

import * as d3 from 'd3';


class Base3dBar3 {
  constructor(props) {
    // console.log(props)
  }


  //内部属性
  _timer = undefined;
  _defaultData = [];
  _legendData = [];
  _data = [];
  _sizeObj = {
    width: 65,
    height: 123,
    left: 35,
    top: 67,
    right: 146,
    bottom: 30
  };
  _svg = undefined;
  _mainG = undefined;
  _gNode = undefined;
  _gPosition = 0;
  _borderColor = ['rgb(1,195,243)', 'rgb(0,236,144)', 'rgb(236,243,50)'];
  _barStyle = {
    barHeight: 123,
    barWidth: 60,
    bgcColor: ['rgb(26,165,213)', 'rgb(3,107,201)', 'rgb(1,209,143)'],
    diffx: 30,//矩形横向偏移
    diffy: 15,//矩形纵向偏移
    lineY1: 25,//线长
    lineY2: 40,
    lineY3: 40,
    lineX1: 40,
    lineX2: 30,
    lineX3: 20,
    circleR: 8,//小圆半径
    dy: 50,//文字偏移
    dx: 10,
    unit:'人',
    fontSize:14
  };

  _invalidateDataFlag = false;
  _invalidateStyleFlag = false;


  get domElement() {
    return this._svg
  }

  set data(v) {
    this._invalidateDataFlag = true;
    this._data = v;
    this.commitProperties();
  }

  set legendData(v) {
    this._invalidateDataFlag = true;
    this._legendData = v;
    this.commitProperties();
  }

  set size(v) {
    this._invalidateStyleFlag = true;
    this._sizeObj = {...this._sizeObj, ...v};
    this.commitProperties();
  }

  get gNode() {
    return this._gNode
  }

  set barStyle(v) {
    this._invalidateStyleFlag = true;
    this._barStyle = {...this._barStyle, ...v};
    this.commitProperties();
  }

  initial() {

    let svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._svg = svgDom;
  }


  commitProperties() {
    let me = this;
    const svg = me._svg;
    if (me._invalidateStyleFlag) {
      me._invalidateStyleFlag = false;
      /*设置大小*/
      let {width, height, left, top, right, bottom} = this._sizeObj;
      let mainG = d3.select(svg)
        .attr('width', width + left + right || 400)
        .attr('height', height + top + bottom || 300)
        .append('g')
        .attr('class', 'mainG')
        .attr('transform', `translate(${left || 0},${top || 0})`);

      me._mainG = mainG;
    }

    /*数据更新*/
    if (me._invalidateDataFlag) {
      me._invalidateDataFlag = false;
      let data = me._data || me._defaultData;
      let {
        barHeight, barWidth, bgcColor, diffx, diffy, lineY1, lineY2, lineY3,
        lineX1, lineX2, lineX3, circleR, dy, dx,unit,fontSize
      } = me._barStyle;

      let sum = data.reduce((total, current) => {
        return total + current.value
      }, 0);

      let positionScale = d3.scaleLinear().domain([0, sum]).range([barHeight, 0]);
      let sizeScale = d3.scaleLinear().domain([0, sum]).range([0, barHeight]);
      let format = d3.format(".0%");

      /*遍历生成立体柱子*/
      data.map((d, i) => {
        if (i === 0) {
          let line2Y2=positionScale(0) - sizeScale(d.value);
          createChart('barG' + i+"_3", 0, positionScale(0), barWidth, sizeScale(d.value), diffx, diffy, bgcColor[i]);
          createLine1('barG' + i+"_3", barWidth + diffx, line2Y2, lineX1 + barWidth + diffx, 0, bgcColor[i]);
          createLine2('barG' + i+"_3", lineX1 + barWidth + diffx, line2Y2, lineX1 + barWidth + diffx, line2Y2 + lineY1, bgcColor[i]);
          createCircle('barG' + i+"_3", lineX1 + barWidth + diffx, positionScale(0) - sizeScale(d.value) + lineY1 + circleR, circleR, bgcColor[i], d, 0, 0)
        } else if (i === 1) {
          let line2Y2=positionScale(0 + data[0]['value']) - sizeScale(d.value);

          createChart('barG' + i+"_3", 0, positionScale(0 + data[0]['value']), barWidth, sizeScale(d.value), diffx, diffy, bgcColor[i]);
          createLine1('barG' + i+"_3", barWidth + diffx, line2Y2, lineX2 + barWidth + diffx, 0, bgcColor[i]);
          createLine2('barG' + i+"_3", lineX2 + barWidth + diffx, line2Y2, lineX2 + barWidth + diffx, line2Y2 - lineY2, bgcColor[i]);
          createCircle('barG' + i+"_3", lineX2 + barWidth + diffx, line2Y2 - lineY2 + circleR, circleR, bgcColor[i], d, dx, dy)
        } else if (i === 2) {
          let line2Y2=positionScale(data[0]['value'] + data[1]['value']);

          createChart('barG' + i+"_3", 0, line2Y2, barWidth, sizeScale(d.value), diffx, diffy, bgcColor[i]);
          createLine1('barG' + i+"_3", 0, line2Y2 - sizeScale(d.value) / 2, -lineX3, 0, bgcColor[i]);
          createLine2('barG' + i+"_3", -lineX3, line2Y2 - sizeScale(d.value) / 2, -lineX3, line2Y2 - sizeScale(d.value) / 2 - lineY3, bgcColor[i]);
          createCircle('barG' + i+"_3", -lineX3, line2Y2 - sizeScale(d.value) / 2 - lineY3 + circleR, circleR, bgcColor[i], d, dx, dy)
        }
      });

      //矩形背景色渐变
      function createLinearGrad(id, c1) {
        me._mainG.append('defs').append('linearGradient')
          .attr('id', id)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '100%')
          .selectAll('stop')
          .data(d3.range(3))
          .enter()
          .append('stop')
          .attr('offset', (d, i) => i * 50 + '%')
          .attr('stop-color', c1)
          .attr('stop-opacity', (d, i) => i % 2 === 0 ? 1 : 0.3)
      }

      //创建立体矩形
      function createChart(c, x, y, w, h, diffX, diffY, color) {
        let barG = me._mainG.append('g')
          .attr('class', c);

        createLinearGrad('path' + c, color);
        //正面
        barG.append('path')
          .attr('d', `M${x} ${y} H${x + w} V${y - h} H${x} Z`)
          .attr('class', 'frontPath')
          .attr('fill', `url(#path${c}`)
          .attr('fill-opacity', 1)
          .attr('stroke', '#000')
          .attr('stroke-width', 0);
        //侧面
        barG.append('path')
          .attr('d', `M${x + w} ${y} L${x + w + diffX} ${y - diffY} L${x + w + diffX} ${y - diffY - h} L${x + w} ${y - h} Z`)
          .attr('class', 'rightPath')
          .attr('fill', `url(#path${c}`)
          .attr('fill-opacity', 1)
          .attr('stroke', '#000')
          .attr('stroke-width', 0);
        //上面
        barG.append('path')
          .attr('d', `M${x} ${y - h} L${x + w} ${y - h} L${x + w + diffX} ${y - diffY - h} L${x + diffX} ${y - h - diffY} Z`)
          .attr('class', 'topPath')
          .attr('fill', `url(#path${c}`)
          .attr('fill-opacity', 1)
          .attr('stroke', '#000')
          .attr('stroke-width', 0);
      }

      //创建引导线

      function createLine1(c, x1, y1, x2, y2, color) {
        c = d3.select('.' + c);
        c.append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y1)
          .attr('stroke', color)
          .attr('stroke-width', 2)
      }

      function createLine2(c, x1, y1, x2, y2, color) {
        c = d3.select('.' + c);
        c.append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .attr('stroke', color)
          .attr('stroke-width', 2);
      }

      function createCircle(c, x, y, r, color, d, dx, dy) {
        //console.log(d,'ddddddddddddddddddddddddddddddddddddddddddddddddd');
        c = d3.select('.' + c);
        c.append('circle')
          .attr('x', x)
          .attr('y', y)
          .attr('r', r)
          .attr('transform', `translate(${x},${y})`)
          .attr('fill', color);

        c.selectAll('text')
          .data([d.name, d.value, format(d.value / sum)])
          .enter()
          .append('text')
          .attr('x', function (t, i) {
            if (i !== 2) {
              return x - 30 + dx
            } else {
              return x + d.name.length * 5 + 5 + dx
            }
          })
          .attr('y', function (t, i) {
            if (i === 0) {
              return y + 20 - dy
            } else {
              return y + 33 - dy
            }
          })
          .text((t, i) => i === 1 ? t + unit : t)
          .attr('fill', '#fff')
          .style('font-size',fontSize+'px')
      }
    }
  }
}

export default Base3dBar3

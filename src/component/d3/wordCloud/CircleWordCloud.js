/**
 * Created by admin on 2018-12-11.
 */
import * as d3 from 'd3';

class CircleWordCloud {


  //内部属性
  _timer = undefined;
  _defaultData = [
    {name: '环境监控'},
    {name: '食品安全'},
    {name: '供应链金融'},
    {name: '数据交易'},
    {name: '成果研发'},
    {name: '植保技术'},
    {name: '种植计算器'},
    {name: 'AI种植'},
    {name: '植株生长周期'},
    {name: '病虫害'},
    {name: '沃土指数'},
    {name: '价格指数'},
    {name: '三品一标'},
    {name: '菜博会'},
    {name: '信用'},
    {name: '农民培训'},
    {name: '园区'},
    {name: '合作社'}];
  _sizeObj = undefined;
  _svg = undefined;
  _gNode = undefined;
  _gPosition = 0;
  _bgcColor = ['rgb(3,76,118)', 'rgb(4,97,101)', 'rgb(69,93,68)'];
  _borderColor = ['rgb(1,195,243)', 'rgb(0,236,144)', 'rgb(236,243,50)'];

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

  set size(v) {
    this._invalidateStyleFlag = true;
    this._sizeObj = v;
    this.commitProperties();
  }

  get gNode() {
    return this._gNode
  }

  set gPosition(v) {
    this._invalidateStyleFlag = true;
    this._gPosition = v;
    this.commitProperties();
  }

  initial() {
    let svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._svg = svgDom;
  }


  commitProperties() {
    let me = this;
    if (me._invalidateStyleFlag) {
      me._invalidateStyleFlag = false;
      let svg = me._svg;

      /*设置大小*/
      let {width, height} = this._sizeObj;
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
    }

    /*数据更新*/
    if (me._invalidateDataFlag) {
      me._invalidateDataFlag = false;
      let data = me._data || me._defaultData;
      let svg = d3.select(me._svg);
      let {width, height} = me._sizeObj;

      let newData = data.map((d, i) => {
        return {name: d.name, value: d.value, index: i}
      });
			svg.selectAll('*').remove();//清空容器
      positionCircle(createData(newData), svg);

      //渐变
      function createLinearGrad(id, c1) {
        svg.append('defs').append('linearGradient')
          .attr('id', id)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '100%')
          .selectAll('stop')
          .data(d3.range(2))
          .enter()
          .append('stop')
          .attr('offset', (d, i) => i * 100 + '%')
          .attr('stop-color', c1)
          .attr('stop-opacity', (d, i) => i + 0.3)
      }

      /*渐变比例尺*/
      function setScale(domainEnd, rangeEnd) {
        let scale = d3.scaleOrdinal()
          .domain(domainEnd)
          .range(rangeEnd);

        return scale
      }

      /*生成结构数据*/
      function createData(data) {
        let pack = data => d3.pack()
          .size([width - 2, height - 2])
          .padding(30)
          (d3.hierarchy({children: data})
            .sum(d => d.value));

        return pack(data);
      }

      /*布局*/
      function positionCircle(data, parent) {
      	//console.log(data, data.leaves());
        let leaf = parent.selectAll('g')
          .data(data.leaves())
          .enter()
          .append("g")
          .attr("transform", d => `translate(${d.x},${d.y - me._gPosition})`)
          .on('click', me._handleClick.bind(me));
				//console.log(leaf);
        /*空心圆*/
        leaf.append("circle")
          .attr('class', function (d, i) {
            return 'outCircle' + i
          })
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("r", d => d.r + 5)
          .attr("fill", 'transparent')
          .attr('stroke-width', 1)
          .attr('stroke', function (d, i) {
            let romain = d3.range(data.leaves().length);
            return setScale(romain, me._borderColor)(i)
          })
          .attr('stroke-opacity', 0.8);

        /*实心圆*/
        leaf.append("circle")
          .attr('class', function (d, i) {
            return 'circle' + i
          })
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("r", d => d.r)
          .attr("fill", function (d, i) {
            let romain = d3.range(data.leaves().length);
            createLinearGrad('linearGrad' + i, setScale(romain, me._bgcColor)(i));
            return 'url(#' + 'linearGrad' + i + ')'
          })
          .attr('stroke-width', 1)
          .attr('stroke', function (d, i) {
            let romain = d3.range(data.leaves().length);
            return setScale(romain, me._borderColor)(i)
          });

        leaf.append("text")
          .attr('class', function (d, i) {
            return 'text' + i
          })
          .text(d => d.data.name)
          .attr('text-anchor', 'middle')
          .style('font-size', function (d) {
            return d.r * 0.5 + 'px'
          })
          .attr("dy", d => d.r / 4)
          .attr("fill", '#fff');
      }

      // 每1000 * n秒执行一次，永不停止。
      function setTimer() {
        let count = 0;
        clearInterval(me._timer);
        me._timer = setInterval(function () {
          if (count >= data.length) {
            count = 0;
          }
          try {
            let domCircle = d3.select(`.circle${count}`);
            let domText = d3.select(`.text${count}`);
            let outCircle = d3.select(`.outCircle${count}`);

            count++;

            /*过渡效果*/
            domCircle
              .transition()
              .duration(1500)
              .attr('r', Number(domCircle.attr('r')) * 1.1)
              .transition()
              .duration(1500)
              .attr('r', domCircle.attr('r'));

            outCircle
              .transition()
              .duration(1500)
              .attr('r', Number(outCircle.attr('r')) * 1.1)
              .transition()
              .duration(1500)
              .attr('r', outCircle.attr('r'));

            domText
              .transition()
              .duration(1500)
              .style('font-size', Number(domCircle.attr('r')) * 1.1 * 0.7 + 'px')
              .transition()
              .duration(1500)
              .style('font-size', domText.style('font-size'))
          } catch (error) {
            console.log(error)
          }
        }, 3000)
      }

      if (d3.select('.circle0') && d3.select(`.text${0}`)) {
        setTimer()
      }
    }
  }

  /**
   * 点击事件
   */

  _handleClick(d) {
    this._gNode = d
  }

  /**
   * 停止定时器
   */
  stopTimer() {
    clearInterval(this._timer)
  }
}

export default CircleWordCloud

/**
 * Created by admin on 2018-12-9.
 */
import * as d3 from 'd3';
import {Timer} from '@jusfoun-vis/common';

class WordCloud  {
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
  _sizeObj=undefined;
  _innerPad = 5;
  _svg = undefined;
  _gNode=undefined;

  _invalidateDataFlag = false;
  _invalidateStyleFlag = false;

  get domElement() {
    return this._svg
  }

  set data(v) {
    //console.log(v);
    this._invalidateDataFlag=true;
    this._data = v;
    this.commitProperties();
  }

  set size(v) {
    this._invalidateStyleFlag=true;
    this._sizeObj = v;
    this.commitProperties();
  }

  get gNode(){
    return this._gNode
  }
  
  initial(){
    let svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._svg = svgDom;
  }

  commitProperties(){
    let me=this;
    if(me._invalidateStyleFlag){
      me._invalidateStyleFlag=false;
      let svg=me._svg;

      /*设置大小*/
      let {width,height}=this._sizeObj;
      svg.setAttribute('width',width);
      svg.setAttribute('height',height);
    }

    /*数据更新*/
    if(me._invalidateDataFlag){
      me._invalidateDataFlag=false;
      let data=me._data || me._defaultData;
      let svg=d3.select(me._svg);
      let {width,height}=me._sizeObj;

      let newData = data.map((d, i) => {
        //console.log(d, i);
        return {name: d.name, value: 1, index:i}
      });

      let newDataL = newData.length;

      let leftGG = svg.append('g').attr('class', 'leftGG').attr('transform', `translate(${-width / 1.5},${-2})`);
      let middleGG = svg.append('g').attr('class', 'middleGG').attr('transform', `translate(${-width / 2.6},${-5})`);
      let rightGG = svg.append('g').attr('class', 'rightGG').attr('transform', `translate(${-10},${-10})`);

      positionRect(createData(newData.slice(0, parseInt(newDataL / 3) + 1)), 'leftG', 0.5, leftGG, setScale(parseInt(newDataL / 3), 0.8));
      positionRect(createData(newData.slice(parseInt(newDataL / 3) + 1, parseInt(newDataL / 3 * 2))), 'middleG', 0.55, middleGG, setScale(parseInt(newDataL / 3), 1));
      positionRect(createData(newData.slice(parseInt(newDataL / 3 * 2), newDataL)), 'rightG', 0.65, rightGG, setScale(parseInt(newDataL / 3), 0.8));

      /*渐变比例尺*/
      function setScale(domainEnd, rangeEnd) {
        let scale = d3.scaleLinear()
          .domain([0, domainEnd])
          .range([0.3, rangeEnd]);

        return scale
      }

      /*生成结构数据*/
      function createData(data) {
        let pack = data => d3.pack()
          .size([width - 2, height - 2])
          .padding(3)
          (d3.hierarchy({children: data})
            .sum(d => d.value));

        return pack(data);
      }

      /*布局*/
      function positionRect(data, cl, n, parent, sl) {
        //console.log(data, cl, n, parent, sl);
        let leaf = parent.selectAll(cl)
          .data(data.leaves())
          .enter()
          .append("g")
          .attr('class', '.' + cl)
          .on('click',me._handleClick.bind(me));
        //console.log(leaf);
        leaf.append("rect")
          .attr('class', function (d,i) {
            //console.log(d,i);
            return 'rect'+d.data.index
          })
          .attr("x", (d, i) => (d.x) / n)
          .attr("y", d => d.y)
          .attr("width", function (d) {
            return d.data.name.length * (d.r * 0.7) + me._innerPad * 2
          })
          .attr('height', d => d.r)
         // .style('text-anchor', 'middle')
          .attr("fill", function (d, i) {
            return `rgba(14,88,168,${sl(i)})`
          });

        leaf.append("text")
          .attr('class', function (d) {
            return 'text'+d.data.index
          })
          .text(d => d.data.name)
          .attr("x", (d, i) => (d.x) / n)
          .attr("y", d => d.y)
          .attr('dy', d => d.r / 1.3)
          .attr('dx', me._innerPad)
          .style('font-size', function (d) {
            return 20 + 'px'
          })
         // .style('text-anchor', 'middle')
          .attr("fill", (d, i) => `rgba(195,193,215,${sl(i)})`);
      }

      // 每1000 * n秒执行一次，永不停止。
      me._timer = new Timer(3000);
      let timer = me._timer;
      let count = 0;

      timer.on('timer', function () {
        if (count >= data.length) {
          count = 0;
        }
        try {
          let domRect = d3.select(`.rect${count}`);
          let domText = d3.select(`.text${count}`);
          count++;

          /*过渡效果*/
          domRect
            .transition()
            .duration(1500)
           // .attr('width', Number(domRect.attr('width')) * 1.2)
            //.attr('height', Number(domRect.attr('height')) * 1.2)
            .attr('fill', '#CB9619')
            .transition()
            .duration(1500)
            .attr('width', domRect.attr('width'))
           // .style('margin-right', '100px')
           //.style('text-anchor', 'middle')
            .attr('height', domRect.attr('height'))
            .attr('fill', domRect.attr('fill'));

          domText
            .transition()
            .duration(1500)
            .style('font-size', 20 + 'px')
            .attr('fill', '#fff')
            .attr('dy',Number(domText.attr('dy'))*1.1)
            .transition()
            .duration(1500)
            .style('font-size', 20)
            //.style('margin-right', '100px')
           // .style('text-anchor', 'middle')
            .attr('fill', domText.attr('fill'))
            .attr('dy',Number(domText.attr('dy')));
        } catch (error) {
          console.log(error)
        }
      });

      if(d3.select('.rect0')&&d3.select(`.text${0}`)){
        timer.start();
      }
    }
  }

  /**
   * 点击事件
   */

  _handleClick(d){
    this._gNode=d
  }

  /**
   * 停止定时器
   */
  stopTimer() {
    this._timer && this._timer.off('timer')
  }
}

export default WordCloud

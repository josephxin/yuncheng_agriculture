import React, {Component} from 'react';
import {Line} from './FELineChart';

class FELineChartReact extends Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {};
  }

  /**
   * 设置数据的方法
   * @param o = {
   *   xAxisData:[],
   *   data:[],
   *   unit:'',
   *   yAxisName:'',
   *   colors:[],
   * }
   */
  setData(o = {}) {
    const me = this;
    let data = o.data || [];
    //console.log(o)
    if (data.length === 0) {
      //console.log('this chart need data !!');
      return;
    }
    const baseData = {
      legendShow: true,
      unit: o.unit || '元/公斤', //tooltip提示框单位
      color: o.colors || ['230,40,108', '22,197,255'], //rbg值
      yAxis: {
        name: o.yAxisName,
      },
      xAxis: {
        data: o.xAxisData,
        splitArea: o.xAxisSplitAreaShow,
      },
      series: data.map(d => {
        d.areaStyle = o.areaShow || false;
        return d;
      })
    };
    //console.log(baseData)
    me._line.setOption(baseData);
  }

  componentDidMount() {
    const me = this;
    me._line = new Line(me._domElement);
  }

  render() {
    const me = this;
    const props = me.props;
    const {width, height, left, top} = props;
    return (
      <div style={{
        position: 'absolute',
        width: `${width || 100}px`, height: `${height || 100}px`,
        left: `${left || 0}px`, top: `${top || 0}px`,
      }} ref={ref => me._domElement = ref}/>
    )
  }
}

export default FELineChartReact;

/**
 * Created by admin on 2018-12-12.
 */
import React, {Component} from "react";
import LineSimple from './LineSimple';
import emptyCircle from './img/emptyCircle.png';

class PriceTrendAndUpDownLine extends Component {
  constructor(props) {
    super(props);
    const me = this;
    const {width, height, left, top} = props;
    me._rootStyle = {
      position: 'absolute',
      width: `${width || 100}px`, height: `${height || 100}px`,
      left: `${left || 0}px`, top: `${top || 0}px`,
    };
    me._componentInstance = new LineSimple();


    /*价格走势及涨跌情况初始样式*/
    this._priceTrendStyle = {
      unit: '元/公斤',
      unitPosition: [5, 0, 0, 5],
      legendShow: false,
      yAxisLineShow: false,
      yAxisSplitType: 'dashed',
      gridMargin: [40, '10%', '3%', '2%'],
      axisLineColor: 'rgb(10,137,255)',
      yAxisSplitLineColor: 'rgb(8,106,201)',
      lineColor: 'rgb(59,255,208)',
      areaColor: ['rgba(26,119,131,0)', 'rgb(26,119,131)'],
      symbol: 'image://' + emptyCircle,
      symbolSize: 20,
      tooltipLineColor: '#25a79c',
      tooltipBackground: 'rgb(11,31,81)',
      tooltipBorderColor: 'rgb(59,255,208)',
      tooltipBorderWidth: 1,
      tooltipFormatter: '{b}<br />{a}: {c}元/公斤'
    };
  }

  _setData(d) {
    const me = this;
    let componentInstance = me._componentInstance;
    let axisData = d.axisData;
    let seriesData = d.seriesData;
    let seriesSum = seriesData.reduce((t, n) => (t - 0) + (n - 0));
    let legendData = d.legendData;
    if (seriesSum === 0 || seriesData.length === 0) {
      // axisData = [];
      legendData = '';
      seriesData = [];
    }
    componentInstance.data = {
      legendData: legendData,
      axisData: axisData,
      seriesData: seriesData
    }
  }


  render() {
    const me = this;
    return (
      <div style={me._rootStyle} ref={ref => me._domElement = ref}/>
    )
  }

  componentDidMount() {
    const me = this;
    const props = me.props;
    let componentInstance = me._componentInstance;
    let wrap = me._domElement;
    let width = props.width;
    let height = props.height;
    wrap.appendChild(componentInstance.domElement);
    let chartStyle=Object.assign({}, this._priceTrendStyle, props.chartStyle || {})
    componentInstance.chartStyle = chartStyle;
    componentInstance.resize(width, height);
  }

  componentWillUnmount() {
    const me = this;
    me._componentInstance.dispose();
  }
}

export default PriceTrendAndUpDownLine

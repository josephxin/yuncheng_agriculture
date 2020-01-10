import {
  UiComponent,
  createElement,
  setAttributes,
  setStyles,
} from '@jusfoun-vis/common';
import * as ec from 'echarts';
import {
  gradientLinearColor,
  chartUnit,
  copyObj, isUndefined, getMaxValue,
  objAssign, isArray,
} from '../../common/echarts-common';

/**
 * 简单的线图（+面积图）
 * 支持多系列数据
 let line = new LineSimple();
 wrap.appendChild(line.domElement);
 line.resize(width, height);
 line.data = {
    axisData: [1, 2, 3],
    seriesData: [
      [1, 2, 18],
      [13, 22, 8],
      [21, 12, 6],
    ], --------> seriesData: [1, 2, 18]
  };
 line.chartStyle = {
    showDataLength: 5,

    fontSize: 14,
    gridMargin: [30, '5%', '3%', '2%'],

    legendShow: true,
    legendPosition: ['top', 30, 'auto', 'auto'],
    legendColor: '#333',
    legendFontWeight: 'normal',
    legendFontFamily: 'sans-serif',
    legendFontSize: 12,
    legendItemWidth: 25,
    legendItemHeight: 14,

    unit: '单位 : 万人',
    unitPosition: [5, 0, 0, 5],

    axisLineColor: 'rgb(238,243,253)',
    axisLabelColor: '#000',
    xAxisLineShow: true,
    yAxisLineShow: true,
    xAxisBoundaryGap: false,
    yAxisSplitLineShow: true,
    yAxisSplitNumber: 5,
    yAxisSplitLineColor: 'rgb(238,243,253)',
    yAxisLabelFormatter: null,

    tooltipFormatter: null,
    tooltipBackground: '#e9effd',
    tooltipBorderColor: '#333',
    tooltipBorderWidth: 0,
    tooltipPadding: 5,
    tooltipFontColor: '#000',
    tooltipFontWeight: 'normal',
    tooltipFontFamily: 'sans-serif',
    tooltipFontSize: 14,

    lineAreaShow: true,
    lineColor: '#3373e6',
    lineType: 'solid',
    areaColor: 'rgb(134,173,254)'
   };
 */
class LineSimple extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._uid = `${Math.round(Math.random() * 0xFFFFFFFF).toString(16)}_${Date.now()}`;
    me._initialize();
  }

  // 默认样式
  _chartStyle = {
    showDataLength: 5,

    fontSize: 14,
    gridMargin: [30, '5%', '3%', '2%'],

    legendShow: true,
    legendPosition: ['top', 'center', 'auto', 'auto'],
    legendColor: '#333',
    legendFontWeight: 'normal',
    legendFontFamily: 'sans-serif',
    legendFontSize: 14,
    legendItemWidth: 25,
    legendItemHeight: 14,

    unit: '',
    unitPosition: [5, 0, 0, 5],

    axisLineColor: 'rgb(59,255,208)',
    axisLabelColor: '#fff',
    xAxisLineShow: true,
    yAxisLineShow: true,
    xAxisBoundaryGap: false,
    yAxisSplitLineShow: true,
    yAxisSplitNumber: 5,
    yAxisSplitType: 'solid',
    yAxisSplitLineColor: 'rgb(238,243,253)',
    yAxisLabelFormatter: null,

    tooltipFormatter: null,
    tooltipBackground: '#e9effd',
    tooltipBorderColor: '#333',
    tooltipBorderWidth: 0,
    tooltipPadding: 5,
    tooltipFontColor: '#fff',
    tooltipFontWeight: 'normal',
    tooltipFontFamily: 'sans-serif',
    tooltipFontSize: 14,
    tooltipLineColor:'#fff',
    tooltipType:'line',

    lineAreaShow: true,
    lineColor: '#3373e6',
    lineType: 'solid',
    areaColor: 'rgb(134,173,254)',
    //areaColor: ['#27dd5f', '#feef00'],
    symbol:'emptyCircle',
    symbolSize:4,
    symbolOffset:[0,0],
    showSymbol:true
  };

  // 数据
  _legendData = [];
  _axisData = [];
  _seriesData = [];

  // 初始化变量
  _chartInstance = undefined;

  _invalidateStyleFlag = false;
  _invalidateDataFlag = false;
  _invalidateChartStyleFlag = false;

  get domElement() {
    return this._domElement;
  }

  set data(o) {
    const me = this;

    if (!isUndefined(o.legendData)) {
      me._legendData = o.legendData;
    }

    if (!isUndefined(o.axisData)) {
      me._axisData = o.axisData;
      me._axisDataCache = o.axisData;
    }
    if (!isUndefined(o.seriesData)) {
      me._seriesData = o.seriesData;
      me._seriesDataCache = o.seriesData;
    }

    me._invalidateDataFlag = true;
    me.invalidateProperties();
  }

  set chartStyle(style) {
    const me = this;
    copyObj(me._chartStyle, style);

    me._invalidateChartStyleFlag = true;
    me.invalidateProperties();
  }

  commitProperties() {
    const me = this;
    if (me._invalidateStyleFlag) {
      me._invalidateStyleFlag = false;
      me._resizeInstance();
    }

    if (me._invalidateDataFlag) {
      me._invalidateDataFlag = false;
      me._updateChartData();
    }

    if (me._invalidateChartStyleFlag) {
      me._invalidateChartStyleFlag = false;
      me._updateChartStyle();
    }

    if (me._invalidateChangeDataFlag) {
      me._invalidateChangeDataFlag = false;
      me._changeChartData();
    }
  }

  // 切换图表数据
  _axisDataCache = [];
  _seriesDataCache = [];
  _sliceIndex = 0;

  _changeChartData() {
    const me = this;
    let seriesData = me._seriesDataCache;
    let axisData = me._axisDataCache;
    let chartStyle = me._chartStyle;
    let seriesDataLength = seriesData.length;
    let showDataLength = chartStyle.showDataLength;

    if (seriesDataLength > showDataLength) {
      let startIndex = me._sliceIndex;
      let endIndex = me._sliceIndex + showDataLength;
      me._axisData = axisData.slice(startIndex, endIndex);
      me._seriesData = seriesData.slice(startIndex, endIndex);
      me._updateChartData();
      me._sliceIndex++;
      if (endIndex === seriesDataLength) {
        me._sliceIndex = 0;
      }
    }
  }

  // 更新图表样式
  _updateChartStyle() {
    const me = this;
    let chartStyle = me._chartStyle;

    let {
      fontSize, gridMargin,
      legendShow, legendPosition, legendColor, legendFontWeight, legendFontFamily,
      legendFontSize, legendItemWidth, legendItemHeight,
      axisLineColor, axisLabelColor, yAxisSplitLineColor,yAxisSplitType,
      xAxisBoundaryGap, xAxisLineShow, yAxisLineShow, yAxisSplitLineShow,
      tooltipFormatter, tooltipBackground, tooltipBorderColor,
      tooltipBorderWidth, tooltipPadding, tooltipFontColor,
      tooltipFontWeight, tooltipFontFamily, tooltipFontSize,tooltipLineColor,tooltipType
    } = chartStyle;

    me._chartInstance.setOption({
      legend: {
        show: legendShow,
        top: legendPosition[0],
        right: legendPosition[1],
        bottom: legendPosition[2],
        left: legendPosition[3],
        itemWidth: legendItemWidth,
        itemHeight: legendItemHeight,
        textStyle: {
          color: legendColor,
          fontWeight: legendFontWeight,
          fontFamily: legendFontFamily,
          fontSize: legendFontSize,
        },
      },
      grid: {
        top: gridMargin[0],
        right: gridMargin[1],
        bottom: gridMargin[2],
        left: gridMargin[3],
      },
      tooltip: {
        formatter: tooltipFormatter,
        backgroundColor: tooltipBackground,
        borderColor: tooltipBorderColor,
        borderWidth: tooltipBorderWidth,
        padding: tooltipPadding,
        textStyle: {
          color: tooltipFontColor,
          fontWeight: tooltipFontWeight,
          fontFamily: tooltipFontFamily,
          fontSize: tooltipFontSize,
        },
        axisPointer:{
          type:tooltipType,
          lineStyle:{
            color:tooltipLineColor
          }
        }
      },
      xAxis: {
        boundaryGap: xAxisBoundaryGap,
        axisLine: {
          show: xAxisLineShow,
          lineStyle: {
            color: axisLineColor,
          }
        },
        axisLabel: {
          color: axisLabelColor,
          fontSize: fontSize,
        },
      },
      yAxis: {
        axisLine: {
          show: yAxisLineShow,
          lineStyle: {
            color: axisLineColor,
          }
        },
        axisLabel: {
          color: axisLabelColor,
          fontSize: fontSize,
        },
        splitLine: {
          show: yAxisSplitLineShow,
          lineStyle: {
            color: yAxisSplitLineColor,
            type:yAxisSplitType
          }
        }
      }
    })
  }

  // 更新图表数据以及与数据关联的样式
  _updateChartData() {
    const me = this;
    const chartInstance = me._chartInstance;
    let chartStyle = me._chartStyle;
    let legendData = me._legendData;
    let axisData = me._axisData;
    let seriesData = me._seriesData;
    let maxValue = getMaxValue(seriesData);

    let {
      fontSize,
      unit, unitPosition,
      yAxisSplitNumber, yAxisLabelFormatter,axisLabelColor,
      lineAreaShow, lineColor, areaColor, lineType,
      symbol,symbolSize, symbolOffset, showSymbol, smooth
    } = chartStyle;

    // 图表单位
    if (axisData.length > 0 || seriesData.length > 0) {
      chartUnit(chartInstance, {
        unitName: unit,
        unitPosition: unitPosition,
        fontSize: fontSize,
        color:axisLabelColor
      });
    }

    // yAxis
    let interval = maxValue / yAxisSplitNumber;
    let defaultFormatter = v => {
      return (interval.toString()).indexOf('.') > -1 ? v.toFixed(1) : v;
    };
    let yAxis = {
      min: 0,
      interval: interval,
      max: maxValue,
      axisLabel: {
        formatter: yAxisLabelFormatter || defaultFormatter,
      }
    };

    // 处理series
    // 通用样式
    let seriesStyle = {
    	smooth: smooth,
      symbol:symbol,
      symbolSize:symbolSize,
      symbolOffset:symbolOffset,
      showSymbol:showSymbol,
      lineStyle: {
        color: lineColor,
        width: 2,
        type: lineType,
      },
      itemStyle: {
        color: lineColor,
        borderColor: lineColor,
        borderWidth: 1,
        borderType: 'solid',
      }
    };

    // 单系列
    let areaOpacity = 1;
    if (!isArray(areaColor) && typeof areaColor === 'string') {
      areaColor = [areaColor, areaColor];
      areaOpacity = 0.3;
    }
    let series = objAssign({
      type: 'line',
      name: legendData[0],
      data: seriesData,
      areaStyle: lineAreaShow ? {
        color: gradientLinearColor(areaColor[0], areaColor[1], 'toBottom'),
        opacity: areaOpacity
      } : undefined,
    }, seriesStyle);

    // 多系列
    if (isArray(seriesData[0])) {
      if (!isArray(areaColor[0]) && typeof areaColor[0] === 'string') {
        areaColor = new Array(seriesData.length).fill(areaColor);
        areaOpacity = 0.3;
      }
      series = seriesData.map((v, i) => {
        let _areaColor = areaColor[i];
        return objAssign({
          type: 'line',
          name: legendData[i] || '',
          data: v,
          areaStyle: lineAreaShow ? {
            color: gradientLinearColor(_areaColor[0], _areaColor[1], 'toBottom'),
            opacity: areaOpacity,
          } : undefined,
        }, seriesStyle)
      });
    }
    chartInstance.setOption({
      legend: {
        data: legendData
      },
      yAxis: yAxis,
      xAxis: {
        data: axisData,
      },
      series,
    })
  }

  // 初始化图表
  _initializeChart() {
    const me = this;
    let chartStyle = me._chartStyle;
    let legendData = me._legendData;
    let {
      gridMargin,
      legendShow, legendPosition, legendColor,
      legendFontWeight, legendFontFamily, legendFontSize,
      axisLineColor, axisLabelColor,
      xAxisBoundaryGap, xAxisLineShow, yAxisLineShow, yAxisSplitLineColor,yAxisSplitType,
      tooltipFormatter, tooltipBackground, tooltipBorderColor,
      tooltipBorderWidth, tooltipPadding, tooltipFontColor,
      tooltipFontWeight, tooltipFontFamily, tooltipFontSize,tooltipLineColor,tooltipType
    } = chartStyle;

    legendPosition = legendPosition.map(d => d === 0 ? 'auto' : d);

    me._chartInstance.setOption({
      legend: {
        show: legendShow,
        top: legendPosition[0],
        right: legendPosition[1],
        bottom: legendPosition[2],
        left: legendPosition[3],
        textStyle: {
          color: legendColor,
          fontWeight: legendFontWeight,
          fontFamily: legendFontFamily,
          fontSize: legendFontSize,
        },
        data: legendData,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: tooltipType,
          axis: 'auto',
          snap: true,
          lineStyle:{
            color:tooltipLineColor
          }
        },
        formatter: tooltipFormatter,
        backgroundColor: tooltipBackground,
        borderColor: tooltipBorderColor,
        borderWidth: tooltipBorderWidth,
        padding: tooltipPadding,
        textStyle: {
          color: tooltipFontColor,
          fontWeight: tooltipFontWeight,
          fontFamily: tooltipFontFamily,
          fontSize: tooltipFontSize,
        }
      },
      grid: {
        top: gridMargin[0],
        right: gridMargin[1],
        bottom: gridMargin[2],
        left: gridMargin[3],
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: xAxisBoundaryGap,
        axisLine: {
          show: xAxisLineShow,
          lineStyle: {
            color: axisLineColor,
          }
        },
        axisLabel: {
          color: axisLabelColor,
        },
        axisTick: {
          show: false,
        },
        data: [],
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: yAxisLineShow,
          lineStyle: {
            color: axisLineColor,
          }
        },
        axisLabel: {
          color: axisLabelColor,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: yAxisSplitLineColor,
            type:yAxisSplitType
          }
        },
        splitNumber: 5,
      },
      series: []
    })
  }

  // 初始化Dom
  _initialize() {
    const me = this;
    let domElement = createElement('div');
    setAttributes(domElement, {
      id: 'chart_' + me._uid
    });
    setStyles(domElement, {
      position: 'absolute',
      left: 0, top: 0,
      width: '100%',
      height: '100%',
    });
    me._chartInstance = ec.init(domElement);
    me._domElement = domElement;
    me._initializeChart();
  }

  // 重置样式
  _resizeInstance() {
    const me = this;
    let domElement = me._domElement;
    setStyles(domElement, {
      width: me.width + 'px',
      height: me.height + 'px'
    });
    me._chartInstance.resize();
  }

  // 重置宽高
  resize(w, h) {
    const me = this;
    me.width = w;
    me.height = h;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  // 销毁
  dispose() {
    const me = this;
    me._chartInstance.dispose();
    me._domElement.innerHTML = '';
  }

  // 改变视图
  changeChartView() {
    const me = this;

    me._invalidateChangeDataFlag = true;
    me.invalidateProperties();
  }
}

export default LineSimple;

import React, {Component} from 'react';
import echart from 'echarts';

import symbol from '../sale-price-analysis/symbol.png';

export default class StockWarn extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.boxStyle = {
      border:'1px ssssolid #f00',
      top:'25px'
    };
    
    me.parm = {
      width:'440px',
      height:'270px',
      showTitle:true,
      titleText:'万吨',
      titleLeft:5,
      titleTop:0,
      titleColor:'#fff',
      titleFontSize:14,

      showLegend:true,
      legendLeft:150,
      legendTop:17,
      legendIcon:'rect',
      legendColor:'#fff',
      legendFontSize:14,
      legendItemWidth:10,
      legendItemHeight:10,

      girdTop: '20%',
      girdLeft:'2%',
      girdBottom:'1%',
      girdRight:'3%',

      xData:[2012,2013,2014,2015,2016,2017,2018],
      xTextColor:'#bbf9ff',
      xTextSize:14,
      xLineColor:'#0a89ff',
      xLineWidth:1,
      xSymbol:['none','none'],

      yTextColor:'#bbf9ff',
      yTextSize:14,
      yLineColor:'transparent',
      yLineWidth:0,
      splitLineColor:'#053e7b',
      splitLineWidth:1,
      yData:[2.5,3.8,3.6,5.6,2.8,3.0,3.3],

      showBarBg:false,
      barBgColor:'rgba(255,255,255,0.25)',
      barCategoryGap:'60%',

      barColorTop:'rgba(18,255,255,1)',
      barColorBottom:'rgba(18,255,255,0)',
      barBorderColor:'#12ffff',
      barBorderWidth:1,
      barBorderRadius:[0,0,0,0]
    }

  }

  render() {
    let me = this;
    return (
      <div>
        <span style={{fontSize:'14px',display:'block',color:'#fff',position:'absolute',top:'44px',right:'18px'}}>元/公斤</span>
        <div style={{...me.boxStyle,width:this.props.width||'400px',height:this.props.height||'270px'}} ref={'echarts'}>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let me = this;

    let box = me.refs.echarts;
    let echarts = echart.init(box);


    let seriseArr = [];
    let yArr = [];

    let obj = { // For shadow
      type: 'bar',
      silent:true,
      itemStyle: {
        normal: {
          color: 'transparent',
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#0b8fa1'
            }, {
              offset: 1, color: '#0b8fa1'
            }]
          },
          borderWidth: 1
        }
      },

      barGap:'-85%',
      barWidth:14,
      // barCategoryGap:this.parm.barCategoryGap||'60%',
      data: [0,0,0,0,0,0,0],
      animation: false
    };

    let obj1 = {
      type: 'bar',
      barWidth:10,
      name:'交易量',
      silent:false,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.parm.barColorTop||'rgba(0,255,246,1)'
            }, {
              offset: 1, color: this.parm.barColorBottom||'rgba(0,255,246,0.3)'
            }]
          },
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.parm.barBorderColor||'#ff0'
            }, {
              offset: 1, color: this.parm.barBorderColor||'#ff0'
            }]
          },
          borderWidth: this.parm.barBorderWidth||3,
          barBorderRadius: this.parm.barBorderRadius||[100,100,0,0]
        }
      },
      data: this.parm.yData||[5,6,7,8,9]
    };

    let obj2 = {
      name:'价格',
      type:'line',
      symbol:'image://'+symbol,
      smooth:false,
      lineStyle:{
        color:'#f0ff03',
        width:3
      },
      itemStyle: {
        normal: {
          color: '#f0ff03'
        }
      },
      yAxisIndex: 1,
      data:[3.5,3,3,4,5,4.5,5.5]
    };


    seriseArr.push(obj,obj1,obj2);

    let yObj1 = {
      type: 'value',
      // splitNumber: 5,
      min: 1,
      max: 6,
      axisTick: {
        show: true
      },
      axisLabel: {
        inside: false,
        textStyle: {
          color: this.parm.yTextColor||'#fff',
          fontSize:this.parm.yTextSize||24
        },
        interval: 0
      },
      splitLine:{
        show:true,
        lineStyle:{
          color:this.parm.splitLineColor||'#00f',
          width:this.parm.splitLineWidth||3,
          type:'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: this.parm.yLineColor||'#0f0',
          width: this.parm.yLineWidth||3
        },
        symbol:['none','arrow']
      }
    };

    let yObj2 = {
      type: 'value',
      min: 1,
      max: 6,
      // interval: 5,
      axisTick: {
        show: true
      },
      axisLabel: {
        inside: false,
        textStyle: {
          color: this.parm.yTextColor||'#fff',
          fontSize:this.parm.yTextSize||24
        },
        interval: 0,
        formatter: '{value}'
      },
      splitLine:{
        show:true,
        lineStyle:{
          color:this.parm.splitLineColor||'#00f',
          width:this.parm.splitLineWidth||3,
          type:'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: this.parm.yLineColor||'#0f0',
          width: this.parm.yLineWidth||3
        },
        symbol:['none','arrow']
      }
    };

    yArr.push(yObj1,yObj2);

    let option = {
      title: {
        show: this.parm.showTitle||true,
        text:this.parm.titleText||'我是title',
        textStyle: {
          color: this.parm.titleColor||'#fff',
          fontSize: this.parm.titleFontSize||24
        },
        top: this.parm.titleTop||16,
        left: this.parm.titleLeft||5
      },
      legend: {
        show: me.parm.showLegend||true,
        itemGap: 15,
        textStyle: {
          color: me.parm.legendColor||'#f0f',
          fontSize:me.parm.legendFontSize||24,
        },
        left: me.parm.legendLeft||300,
        top: me.parm.legendTop||20,
        data: [{
          name:'交易量',
          icon:'rect'
        },{
          name:'价格',
          icon:'line',
          backgroundColor:'#f0ff03'
        }],
        //data: ['面积变化','面积变化率']||['111'],
        itemWidth: me.parm.legendItemWidth||18,
        itemHeight: me.parm.legendItemHeight||18
      },
      xAxis: {
        data: this.parm.xData||[2014,2015,2016,2017,2018],
        axisLabel: {
          inside: false,
          textStyle: {
            color: this.parm.xTextColor||'#fff',
            fontSize:this.parm.xTextSize||14
          },
          interval: 0
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.parm.xLineColor||'#f00',
            width:this.parm.xLineWidth||3
          },
          symbol:this.parm.xSymbol||['none','arrow']
        },
        z: 10
      },
      yAxis: [],
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: 'rgba(25,31,106,0.8)',
        formatter: function (params) {
          let res1 = '<div style="min-width: 10px;">';
          if(params.length>0){
            let enter = '';
            let unit = '';
            for(let i = 1;i < params.length;i++){
              if(i===1){
                enter = '<br/>';
                unit = '万吨';
              }else {
                unit = '元/公斤';
              }
              res1 += '<span>'+params[i].seriesName+':'+ params[i].value +'</span>'+unit+enter;
            }
          }
          res1 += '</div>';
          return res1;
        }
      },
      grid: {
        top: this.parm.girdTop||'10%',
        left:this.parm.girdLeft||'2%',
        bottom:this.parm.girdBottom||'1%',
        right:this.parm.girdRight||'3%',
        containLabel:true
      },
      series: []
    };
    option.series = seriseArr;
    option.yAxis = yArr;
    echarts.setOption(option);

    echarts.on('mouseover',function (params) {
      if(params.componentSubType==='bar'){
        let index = params.dataIndex;
        let data = params.data + 30;
        let arr = [];
        for(let i = 0;i < me.parm.xData.length;i++){
          if(index===i){
            arr.push(data);
          }else {
            arr.push(0);
          }
        }
        option.series[0].data = arr;
        option.series[0].itemStyle.normal.borderWidth = 0;
        echarts.setOption(option);
      }
    });

    echarts.on('mouseout',function (params) {
      let arr = [];
      for(let i = 0;i < me.parm.xData.length;i++){
        arr.push(0);
      }
      option.series[0].data = arr;
      option.series[0].itemStyle.normal.borderWidth = 0;
      echarts.setOption(option);
    })
  }

  componentDidUpdate() {

  }
}

import React, {Component} from 'react';
import echart from 'echarts';

import symbol from './symbol.png';

export default class PlantArea extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.cultivatedArea = [];//面积变化
    this.areaChangeRate = [];//面积变化率
    this.dateTime=[]//横轴日期
    me.boxStyle = {
      border:'1px ssssolid #f00',
      top:'25px'
    };

    me.parm = {
      width:'400px',
      height:'300px',
      showTitle:true,
      titleText:'元',
      titleLeft:5,
      titleTop:0,
      titleColor:'#fff',
      titleFontSize:14,

      showLegend:true,
      legendLeft:85,
      legendTop:17,
      legendIcon:'rect',
      legendColor:'#fff',
      legendFontSize:14,
      legendItemWidth:10,
      legendItemHeight:10,
      legendData:['收入'],

      girdTop: '20%',
      girdLeft:'2%',
      girdBottom:'1%',
      girdRight:'3%',

      xData:[2004,2006,2008,2010,2012,2014,2016],
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
      yData:[800,1100,1300,1000,900,1200,1400],

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
        <div style={{width:this.props.width,height:this.props.height,marginTop:this.props.marginTop,marginLeft:this.props.marginLeft}} ref={'echarts'}>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.initChart();  
  }
  _setData(json){
    this.cultivatedArea = json.cultivatedArea ? json.cultivatedArea : [];
    this.areaChangeRate = json.areaChangeRate ? json.areaChangeRate : [];
    this.dateTime = json.dateTime ? json.dateTime : [];
    this.initChart();
  }
  initChart(){
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
     // data: [0,0,0,0,0,0,0],
      animation: false
    };

    let obj1 = {
      name:'收入',
      type: 'bar',
      barWidth:10,
      name:[this.parm.legendData]||['111'],
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
      data: this.cultivatedArea 
    };

    let obj2 = {
      name:'收入走势',
      type:'line',
      symbol:'image://'+symbol,
      smooth:true,
      lineStyle:{
        color:'red',
        width:3
      },
      yAxisIndex: 1,
      data:this.areaChangeRate 
    };


    seriseArr.push(obj,obj1,obj2);

    let yObj1 = {
      type: 'value',
      // splitNumber: 5,
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
      name: '温度',
      // interval: 5,
      axisTick: {
        show: true
      },
      /*axisLabel: {
        inside: false,
        textStyle: {
          color: this.parm.yTextColor||'#fff',
          fontSize:this.parm.yTextSize||24
        },
        interval: 0,
        formatter: '{value}'
      },*/
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
      color:['red','red'],
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
          name:'收入',
          icon:'rect'
        },{
          name:'收入走势',
          icon:'line',
          backgroundColor:'#f0ff03'
        }],
        //data: ['面积变化','面积变化率']||['111'],
        itemWidth: me.parm.legendItemWidth||18,
        itemHeight: me.parm.legendItemHeight||18
      },
      xAxis: {
        data: this.dateTime,
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: 'rgba(10,137,255,1)',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 16,
          margin: 16,  
          //interval:10,
          showMaxLabel:true,
        }
      },

      yAxis: [],
      tooltip: {
        trigger: 'axis',
        formatter: function (d) {
          let str = '';
          d.forEach((s, i) => {
            if (i === 0) {
              str = [s.name, '</br>', s.seriesName, ': ', s.value || '--','元'].join('');
            } /*else if (s.seriesName !== 'bar-dot') {
              str += ['</br>', s.seriesName, ': ', s.value || '--','%'].join('');
            }*/
          });
          return str;
        },
        textStyle: {
          fontSize: 16
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
/*    echarts.on('mouseover',function (params) {
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
        option.series[0].itemStyle.normal.borderWidth = 1;
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
    })*/
  }
  componentDidUpdate() {

  }
}

import React, {Component} from 'react';
import echarts from 'echarts';

// 农投品销量趋势

class ServiceTrendsBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.region = [];
    this.sales = [];
    this.xData = [];
    this.seriousData = [];
  }

  render() {
    return (
      <div ref={'barChart'}
           style={{width: this.props.width, height: this.props.height, position: 'relative', top: 30}}></div>
    )
  }
  setData(json){
    //console.log('json',json);
    this.xData = json.xData ? json.xData : [];
    this.seriousData = json.seriousData ? json.seriousData : [];
    this.setState(json)
    this.initChart(json);
  }
  initChart(json){
    let me = this;
    let dom = this.refs.barChart;
    me.myChart = echarts.init(dom);
    var newArr=[]
    var xData=[]
    if(this.state.seriousData){
      let allData=this.state.xData
      let sumData=allData[0]+'-'+allData[allData.length-1]
      //xData=[sumData,...allData];
      xData=allData;
      //console.log('2222222222',xData);
      let sum=null
      let data=this.state.seriousData
      data.forEach((item,index) => {
        sum+=item
      });
      //newArr=[sum,...this.state.seriousData];
      newArr=this.state.seriousData;
    }
    var data=newArr
    //var data = [2900, 1200, 300, 200, 900, 300];
    function fuzhuData(data){
      var ret = [];
      var sumData = data[0];
      data.forEach(function(v,i,a){
        ret[0] = 0;
        ret[1] = sumData - a[1];
        if(i > data.length - 3){
          return
        }
        ret[i+2] = ret[i+1] - a[i+2]
      })
      return ret
    }
    fuzhuData(data)
    me.option = {
      //backgroundColor: '#1b237e',
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          //console.log(data[0])
          //console.log(params)
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      /*legend: {
        top:20,
        right: '4%',
        itemGap:'4%',
        itemHeight:10,
        itemWidth:20,
        textStyle:{
          color:'#bacce5',
          fontSize:12,
          padding: [0, 0, 0, 5]
        }
      },*/
      grid: {
        top:'5%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type : 'category',
        name: '',
        axisTick:{
          show:false
        },
        axisLabel: {
          show: true,
          textStyle:{
            color:"#bacce5",
            fontSize:12
          }
        },
        axisLine:{
          lineStyle: {
            color:"#3b6aa1",
            fontSize:12
          }
        },
        splitLine: {
          show:true,
          lineStyle: {
            color: ['#113461']
          }
        },
        data :xData
      },
      yAxis: [{
        type : 'value',
        name:'',
        nameTextStyle:{
          color:'#d4e7ff'
        },
        axisLabel:{
          textStyle:{
            color:"#bacce5",
            fontSize:12
          }
        },
        axisLine: {
          lineStyle: {
            color:"#3b6aa1",
            fontSize:12
          }
        },
        splitLine: {
          show:false,
          lineStyle: {
            color: ['transparent']
          }
        },
        axisTick:{
          show:false
        },
        // splitArea: {
        //     show: true,
        //     areaStyle: {
        //         color: ['#06346c'],
        //     }
        // }
      },
        /*{
          type : 'value',
          name:' ',
          axisLabel:{
            textStyle:{
              color:"#bacce5",
              fontSize:12
            }
          },
          axisLine: {
            lineStyle: {
              color:"#3b6aa1",
              fontSize:12
            }
          },
          splitLine: {
            show:false,
            lineStyle: {
              color: ['transparent']
            }
          },
          axisTick:{
            show:false
          },
          // splitArea: {
          //     show: true,
          //     areaStyle: {
          //         color: ['#06346c'],
          //     }
          // }
        }*/
      ],
      series: [
        {
          name: '',
          type: 'bar',
          stack:  '总量',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: fuzhuData(data)
        },
        {
          name: '数量',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 30,
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#01d8ec'
                }, {
                  offset: 1,
                  color: '#02307d'
                }]
              ),
              opacity: 0.9,
              barBorderColor: '#036dbf'
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#01d8ec'
                }, {
                  offset: 1,
                  color: '#02307d'
                }]
              ),
              opacity: 0.9,
              barBorderColor: '#d0bc44'
            }
          },
          data:data
        }
      ]
    };





    me.myChart.setOption(me.option);
  }
  componentDidMount() {
    this.initChart();
  };
}

export default ServiceTrendsBar;

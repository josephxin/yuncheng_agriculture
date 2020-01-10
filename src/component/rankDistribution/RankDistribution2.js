import React, {Component} from 'react';
import echarts from 'echarts';

/**
 * 病虫害上报分析
 * */
class RankDistribution2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [
        {
          name: '黑名单',
          value: 8,
          color: '#000',
          children: [{
            name: '土测机构',
            value: 4,
            color: '#9fdf60'
          }, {
            name: '质检机构',
            value: 2,
            color: '#27dd5f'
          }, {
            name: '批发市场',
            value: 2,
            color: '#2bfdb6'
          }]
        },
        {
          name: '红名单',
          value: 10,
          color: '#fd296e',
          children: [{
            name: '农投品店',
            value: 10,
            color: '#028eff'
          }]
        }, {
          name: '白名单',
          value: 4,
          color: '#fff',
          children: [{
            name: '生产企业',
            value: 4,
            color: '#00cfff',
          }]
        }],
      colorList: ['#f845f1', '#ad46f3', '#5045f6', '#4777f5', '#44aff0']
    }
  }

  render() {
    return (
      <div ref={'pieChart'} style={{width: this.props.width, height: this.props.height}}></div>
    )
  }
  initData(d) {
	    let me = this;
	    me.setState({
	    	pieData: d
	    });
	    this.componentDidMount();
	  };
  componentDidMount() {
    let me = this;
    const pieData = this.state.pieData;
    const colorList = this.state.colorList;
    let sOuter = [];
    let sInner = pieData.map(d => {
      if (d.children) {
        d.children.forEach(r => {
          sOuter.push({
            name: r.name,
            value: r.value,
            type: d.name.replace(/中国|定电/g, ''),
            itemStyle: {
              normal: {
                color: r.color
              }
            }
          })
        })
      }
      return {
        name: d.name.replace(/中国|定电/g, ''),
        value: d.value,
        itemStyle: {
          normal: {
            color: d.color
          }
        }
      }
    });
    const dom = me.refs.pieChart;
    me.myChart = echarts.init(dom);
    me.option = {
      tooltip: {
        formatter(data) {
          let d = data.data;
          return d.name + '：' + d.value+'家'
        }
      },
      legend: {
        show: true,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle:{
          color:'#fff',
          fontSize:14
        },
        right:20,
        top:70,
        orient:'vertical'
      },

      series: [
        {
          name: '运营商',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, 33],
          center: ['40%', '60%'],
          label: {
            normal: {
              show: false,
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: sInner
        },
        {
          name: '通联行为',
          type: 'pie',
          radius: [48, 76],
          center: ['40%', '60%'],
          label: {
            normal: {
              fontSize: 16,
              formatter(d) {
                return `${d.percent}%\n{a|${d.name}}`
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 16
                }
              }
            }
          },

          data: sOuter
        }
      ]
    };
    me.myChart.setOption(me.option);
  }
}

export default RankDistribution2;

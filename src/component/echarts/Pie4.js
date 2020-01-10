import React from 'react';
import echarts from 'echarts';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	unit: '',
    	data: [],
    	seriesName: '',
    };
    this.domRef = React.createRef();
    let center = ['50%', '50%'];
    let seriesData = [];
    //let color = ['#2bfdb6', '#28dd5f', '#9fde5f', '#fffb92', '#01cfff'];
    this.color = ['#2bfdb6', '#28dd5f', '#9fde5f', '#d2f5a6', '#ffee51', '#f3a43b', '#d0648a', '#f58db2', '#f2b3c9'];
    let rich = {};
    this.color.map((item, index) => {
      rich['icon' + index] = {
        width: 10,
        height: 10,
        backgroundColor: item,
        borderRadius: 100
      }
    })
    this.options = {
    	title: {
    		text: this.state.seriesName,
    		textStyle: {
    			color: '#fff'
    		}
    	},
    	grid: {
    		//containLabel: true
    	},
      tooltip: {
        trigger: 'item',
        confine: true,
        padding: 0,
        backgroundColor: 'transparent',
        formatter: function (param) {
          var html = '';
          html += '<div class="tooltip-box">';
          html += param.value;
          html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
          return html;
        }
      },
      series: [{
        name: this.state.seriesName,
        type: 'pie',
        color: this.color,
        radius: ['15%', '40%'],
        center: center,
        minAngle: 10,//最小的扇区角度（0 ~ 360），默认0，用于防止某个值过小导致扇区太小影响交互。
        roseType: 'radius',//不定角男丁格尔图
        //roseType: 'area',//定角男丁格尔图
        //roseType: false,//正常饼图
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
            rich: rich
          }
        },
        labelLine: {
          normal: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        data: seriesData,
      }
      ]
    };;
  }

  setData(d) {
    this.lock = true;
    this.setState({ ...d });
  }

  componentDidUpdate() {
    if (!this.lock) { return false; }
    const me = this;
    const options = me.options;
    let seriesData = me.state.data;
		let seriesName = me.state.seriesName;
		let unit = me.state.unit;
		options.series[0].data = seriesData;
    options.title.text = seriesName;
    options.tooltip.formatter = function (params) {
    	//console.log(params);
      let html = '';
      html += '<div class="tooltip-box">';
      if (seriesName) {
      	html += seriesName + '<br/>';
      }
      html += params.name + '：' + params.value + unit;
      html += '(' + params.percent + '%)';
      html += '<i class="lt"></i><i class="rb"></i></div>';
      return html;
    }
    if (seriesData.length>me.color.length) {
    	let rich={};
	    seriesData.map((item, index) => {
	      rich['icon' + index] = {
	        width: 10,
	        height: 10,
	        backgroundColor: me.color[index%me.color.length],
	        borderRadius: 100
	      }
	    })
	    options.series[0].label.normal.rich=rich;
    }
    me.chart.setOption(options);
    me.lock = false;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidMount() {
    const me = this;
    const dom = me.domRef.current;
    me.chart = echarts.init(dom);
    me.chart.setOption(me.options);
  }

  render() {
    return (
      <div style={{
        width: this.props.width || 440,
        height: this.props.height || 250,
        top: this.props.top || 0,
        left: this.props.left || 0
      }} ref={this.domRef}></div>
    );
  }
};

export default Page;

import React from 'react';
import echarts from 'echarts';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	unit: '',
    	data: [],
    };
    this.domRef = React.createRef();
    let center = ['50%', '50%'];
    let seriesData = [];
    let color = ['#2bfdb6', '#28dd5f', '#9fde5f', '#fffb92', '#01cfff'];
    let rich = {};
    color.map((item, index) => {
      rich['icon' + index] = {
        width: 10,
        height: 10,
        backgroundColor: item,
        borderRadius: 100
      }
    })
    this.options = {
      tooltip: {
        trigger: 'item',
        confine: true,
        padding: 0,
        backgroundColor: 'transparent',
        // position: function (point, params, dom, rect, size) {
        //   return [point[0] + 10, point[1] - size.contentSize[1]];
        // },
        formatter: function (param) {
          var html = '';
          html += '<div class="tooltip-box">';
          html += param.value;
          html += '<i class="lt"></i><i class="angle"></i><i class="rb"></i></div>';
          return html;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        color: color,
        radius: ['15%', '70%'],
        center: center,
        minAngle: 10,//最小的扇区角度（0 ~ 360），默认0，用于防止某个值过小导致扇区太小影响交互。
        roseType: 'radius',
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return '{icon' + params.dataIndex + '|} {name|' + params.name + '}'
            },
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
    options.tooltip.formatter = function (param) {
      let html = '';
      let unit = me.state.unit;
      html += '<div class="tooltip-box">';
      html += param.value + unit;
      html += '<i class="lt"></i><i class="rb"></i></div>';
      return html;
    }
    options.series[0].data = me.state.data;
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
      <div className={'pie'} style={{
        position: 'absolute',
        top: 40,
        left: 0
      }}>
        <div style={{
          width: this.props.width ? this.props.width : 440,
          height: this.props.height ? this.props.height : 250
        }} ref={this.domRef}></div>
      </div>
    );
  }
};

export default Page;

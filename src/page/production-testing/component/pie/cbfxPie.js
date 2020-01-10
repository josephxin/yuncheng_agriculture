import React, {Component} from 'react';
import echarts from 'echarts';

export default class cbfxPie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.domRef = React.createRef();
    this.option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            //orient: 'vertical',
            left: this.props.legendLeft||'600px',
            bottom:this.props.lengthBottom||'0px',
            textStyle:{
              color:'#fff'
            }
        },
        series : [
            {
                name: '成本分析',
                type: 'pie',
                label:{
                  normal:{
                    formatter:"{b} {c}({d}%)"
                  }
                },
                radius : '55%',
                center: ['50%', '50%'],
                color: ["#0297ff", "#00cfff", "#2bfdb6", "#28dd5f", "#fffd04", "#08eafb"],
                data:[
                    {value:335, name:'种子种苗'},
                    {value:310, name:'人工'},
                    {value:234, name:'化肥'},
                    {value:135, name:'农药'},
                    {value:1548, name:'其他'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
  }
  setData(d) {
    this.setState({ ...d });
  }
  componentDidUpdate() {
    const me = this;
    const state = me.state;
    const option = me.option;
    option.series[0].data = state.data;
    option.series[0].name = state.name;
    me.chart.setOption(me.option);
  }
  render() {
    let me = this;
    return (
      <div>
        <div style={{
          position: 'absolute',
          top: this.props.top || '40px',
          left: 0,
          width: this.props.width||'440px',
          height: this.props.height || '190px'
        }}>
          <div style={{
            width: this.props.width||'440px',
            height: this.props.height || '160px'
          }} ref={this.domRef}></div>
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    let me = this;
    const dom = me.domRef.current;
    me.chart = echarts.init(dom);
    me.chart.setOption(me.option);
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

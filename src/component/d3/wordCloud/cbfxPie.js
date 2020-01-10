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
            left: '0px',
            top:'10px',
            textStyle:{
              color:'#fff'
            },
            /*selected:{
        　　　　"土地租赁费":false  //图例为‘全部’的一项默认置灰
        　　},
            "inactiveColor" : "#999",*/
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
                center: ['50%', '60%'],
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
    me.chart.setOption(me.option);
  }
  render() {
    let me = this;
    return (
      <div style={{clear:'both'}}>
        <div style={{
          position: 'absolute',
          top: this.props.top,
          left: 0,
          width: this.props.width,
          height: this.props.height
        }}>
          <div style={{
            width: this.props.width,
            height: this.props.height,
            marginTop:this.props.marginTop,
            marginLeft: this.props.marginLeft,
          }} ref={this.domRef}></div>
        </div>
      </div>
    )
  }-30
  
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

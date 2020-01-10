import React, {Component} from 'react';
// 中间地图
import DisasterMonitoring from '../disasterMonitoring/DisasterMonitoring';
import './CreditMap.css';
import NumberCard from '../map-component/gradientNumber';

// 企业信用地图
class CreditMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipList: [{
        name: '红名单企业',
        value: 1276
      }, {
        name: '白名单企业',
        value: 1276
      }, {
        name: '黑名单企业',
        value: 1276
      }],
      unit: '家'
    };
  }

  render() {
    const me = this;
    const top = me.props.top;
    const left = me.props.left;
    const width = me.props.width;
    const height = me.props.height;
    return (
      <div style={{position: 'absolute', top: top, left: left}} className={'mapBox'}>
        <DisasterMonitoring width={width}
                            height={height}
                            top={-45}
                            tooltipList={this.state.tooltipList}
                            unit={this.state.unit}/>
        <div className={'createBox'}>
          <span>红名单企业数量</span>
          <div className={'bar'}>
            <span style={{position: 'absolute', top: 0, left: 30}}>1000</span>
            <span style={{position: 'absolute', bottom: 0, left: 30}}>0</span>
          </div>
          <NumberCard ref={ref => {
            me.numberCardRef = ref;
          }} left={130} bottom={-20}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let me = this;
    let lTotal = 1276;
    let rTotal = 60;
    me.numberCardRef._setData({
      lTotal, rTotal
    });
  }
}

export default CreditMap;

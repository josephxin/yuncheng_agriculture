/**
 * desc：
 * author：joseph_xin
 * date：2019-12-26
 */
import React, {Component} from 'react';
import tipBg from './img/tooltip-bg.png';
import './tooltip.css';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    }
  }

  render() {
    let me = this;
    if (me.state.flag) {
      return (
        <div ref="mapToolTip" style={{
          position: 'absolute',
          backgroundImage: 'url(' + tipBg + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          left: `${Math.round(me.state.pos[0]) + 10}px`,
          top: `${Math.round(me.state.pos[1]) - 60}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none',
          textAlign: 'left',
          padding: '12px 25px 15px 120px'
        }} className="toolTipClass">
          <div style={{
            lineHeight: '32px',
          }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold'
            }}>{me.state.name}</span>
            <span style={{
              fontSize: '18px',
              fontWeight: '500',
              marginLeft: '10px'
            }}>{'第' + me.state.rank + '名'}</span>
          </div>
          <div className={'mapToolTip-item'}>园区数量：<span className="green-txt" style={{marginRight: '10px'}}>{me.state.value}</span>个
          </div>
          <div className={'mapToolTip-item'}>监测站数量：<span className="green-txt" style={{marginRight: '10px'}}>{me.state.jczNum}</span>个
          </div>
          <div className={'mapToolTip-item'}>设备数量：<span className="green-txt" style={{marginRight: '10px'}}>{me.state.equipmentNum}</span>个
          </div>
          <div className={'mapToolTip-item'}>预警次数：<span className="green-txt" style={{marginRight: '10px'}}>{me.state.yjNum}</span>个
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Tooltip;

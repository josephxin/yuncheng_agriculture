/**
 * desc：
 * author：joseph_xin
 * date：2019-9-10
 */
import React, {Component} from 'react';
import tipBg from './img/tooltip-bg2.png';
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
          width: '217px',
          height: '105px',
          position: 'absolute',
          backgroundImage: 'url(' + tipBg + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          left: `${Math.round(me.state.pos[0]) + 10}px`,
          top: `${Math.round(me.state.pos[1]) - 60}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none',
          textAlign: 'left',
          padding: '20px 10px 20px 20px'
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
          <div style={{
            lineHeight: '28px',
            fontSize: '18px',
            fontWeight: '500'
          }}>粮食产量：<span className="green-txt" style={{marginRight: '10px'}}>{me.state.value}</span>吨
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Tooltip;

/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import tipBg from './img/circulation-map-tooltip-bg.png';
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
          width: '353px',
          height: '160px',
          position: 'absolute',
          background: 'url(' + tipBg + ') no-repeat center',
          backgroundSize: 'contain',
          left: `${Math.round(me.state.pos[0]) + 10}px`,
          top: `${Math.round(me.state.pos[1]) - 60}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none'
        }} className="circulation-tooltip-class">
          <div style={{
            position: 'absolute',
            width: '250px',
            height: '32px',
            lineHeight: '32px',
            top: '10px',
            right: '6px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            {me.state.market}
          </div>
          <div className="line-msg" style={{top: '42px'}}>
            <span className="msg-name">
              交易产品:
            </span>
            <span className="msg-value">
              {me.state.product}
            </span>
          </div>
          <div className="line-msg" style={{top: '68px'}}>
            <span className="msg-name">
              交易重量:
            </span>
            <span className="msg-value">
              {me.state.weight}
            </span>
          </div>
          <div className="line-msg" style={{top: '94px'}}>
            <span className="msg-name">
              交易价格:
            </span>
            <span className="msg-value">
              {me.state.price}
            </span>
          </div>
          <div className="line-msg" style={{top: '120px'}}>
            <span className="msg-name">
              交易时间:
            </span>
            <span className="msg-value">
              {me.state.time}
            </span>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default Tooltip

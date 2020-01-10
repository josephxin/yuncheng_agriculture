/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import tipBg from './img/credit-tooltip-bg.png';
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
    console.log(me.state)
    if (me.state.flag) {
      return (
        <div ref="mapToolTip" style={{
          width: '285px',
          height: '160px',
          position: 'absolute',
          background: 'url(' + tipBg + ') no-repeat center',
          backgroundSize: 'contain',
          left: `${Math.round(me.state.pos[0]) + 15}px`,
          top: `${Math.round(me.state.pos[1]) - 55}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none'
        }} className="credit-tooltip-class">
          <div style={{
            position: 'absolute',
            width: '192px',
            height: '30px',
            lineHeight: '30px',
            top: '8px',
            right: '3px',
            fontSize: '18px',
            textIndent: '3px',
            fontWeight: 'bold'
          }}>
            {me.state.name}
          </div>
          <div className="line-message" style={{top: '42px'}}>
            <span className="message-name">
              红名单企业:
            </span>
            <span className="message-value">
              {parseFloat(me.state.value)}
            </span>
            <span>家</span>
          </div>
          <div className="line-message" style={{top: '80px'}}>
            <span className="message-name">
              白名单企业:
            </span>
            <span className="message-value">
              {parseFloat(me.state.white)}
            </span>
            <span>家</span>
          </div>
          <div className="line-message" style={{top: '118px'}}>
            <span className="message-name">
              黑名单企业:
            </span>
            <span className="message-value">
              {parseFloat(me.state.black)}
            </span>
            <span>家</span>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default Tooltip

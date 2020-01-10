/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import tipBg from './grow-map-img/grow-map-tooltip-bg.png';
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
    //console.log(me.state)
    if (me.state.flag) {
      return (
        <div ref="mapToolTip" style={{
          width: '285px',
          height: '191px',
          position: 'absolute',
          background: 'url(' + tipBg + ') no-repeat center',
          backgroundSize: 'contain',
          left: `${Math.round(me.state.pos[0]) + 15}px`,
          top: `${Math.round(me.state.pos[1]) - 55}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none'
        }} className="grow-tooltip-class">
          <div style={{
            position: 'absolute',
            width: '192px',
            height: '30px',
            lineHeight: '30px',
            top: '8px',
            right: '3px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <span style={{position: 'absolute', left: '2px', display: 'inline-block'}}>
              {me.state.name}
            </span>
            <span style={{position: 'absolute', right: '5px', display: 'inline-block'}}>
              {'第' + me.state.rank + '名'}
            </span>
          </div>
          <div className="line-message" style={{top: '38px'}}>
            <span className="message-name">
              种植面积:
            </span>
            <span className="message-value">
              {me.state.value}
            </span>
            <span>万亩</span>
          </div>
          <div className="line-message" style={{top: '68px'}}>
            <span className="message-name">{me.props.text||'品种:'}</span>
            <span className="message-value">
              {me.state.mainCrops}
            </span>
          </div>
          <div className="line-message" style={{top: '98px'}}>
            <span className="message-name">
              基地数量:
            </span>
            <span className="message-value">
              {parseFloat(me.state.base)}
            </span>
            <span>个</span>
          </div>
          <div className="line-message" style={{top: '128px'}}>
            <span className="message-name">
              大棚数量:
            </span>
            <span className="message-value">
              {parseFloat(me.state.greenhouse)}
            </span>
            <span>个</span>
          </div>
          <div className="line-message" style={{top: '158px'}}>
            <span className="message-name">
              三品一标数量:
            </span>
            <span className="message-value">
              {parseFloat(me.state.tpaos)}
            </span>
            <span>个</span>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default Tooltip

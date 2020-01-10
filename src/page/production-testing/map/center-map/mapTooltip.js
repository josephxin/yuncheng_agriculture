/**
 * desc：
 * author：
 * date：
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
          width: '243px',
          height: '160px',
          position: 'absolute',
          background: 'url(' + tipBg + ') no-repeat center',
          backgroundSize: 'contain',
          left: `${Math.round(me.state.pos[0]) + 10}px`,
          top: `${Math.round(me.state.pos[1]) - 60}px`,
          zIndex: '2',
          color: '#fff',
          pointerEvents: 'none'
        }} className="toolTipClass">
          <div style={{
            position: 'absolute',
            width: '146px',
            height: '32px',
            lineHeight: '32px',
            top: '10px',
            right: '6px',
            textIndent: '8px',
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
            position: 'absolute',
            width: '146px',
            height: '28px',
            lineHeight: '28px',
            top: '42px',
            right: '6px',
            textIndent: '8px',
            fontSize: '18px',
            fontWeight: '500'
          }}><span className="green-txt" style={{marginRight: '10px'}}>{me.state.value}</span>家
          </div>
          <div style={{
            position: 'absolute',
            width: '146px',
            height: '20px',
            lineHeight: '20px',
            top: '70px',
            right: '6px',
            textIndent: '8px',
            color: '#75f18e',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            农投品店总数
          </div>

          <div style={{
            position: 'absolute',
            width: '146px',
            height: '28px',
            lineHeight: '28px',
            top: '97px',
            right: '6px',
            textIndent: '8px',
            fontSize: '18px',
            fontWeight: '500'
          }}><span className="yellow-txt" style={{marginRight: '10px'}}>{me.state.company}</span>家
          </div>
          <div style={{
            position: 'absolute',
            width: '146px',
            height: '20px',
            lineHeight: '20px',
            top: '125px',
            right: '6px',
            textIndent: '8px',
            color: '#fff606',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            农投品生产企业数
          </div>

        </div>
      );
    } else {
      return null
    }
  }
}

export default Tooltip

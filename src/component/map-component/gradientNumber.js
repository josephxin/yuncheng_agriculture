/**
 * desc：
 * author：
 * date：
 */
import React, {Component} from 'react';
import * as d3 from 'd3';

import greenLegend from './green-legend.png';
import yellowLegend from './yellow-legend.png';

class NumberGradient extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      left: 0,
      right: 0
    };
  }

  _flag = false;

  _setData(d) {
  	//console.log(d);
    let me = this;
    me._flag = true;
    me.setState({
      left: d.lTotal,
      right: d.rTotal
    });
  }

  componentDidMount() {
    let me = this;
    me.textAnimation();
  }

  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      me.textAnimation();
      me._flag = false;
    }

  }

  render() {
    let me = this;
    return (
      <div style={{
        position: 'absolute',
        bottom: `${me.props.bottom || 10}px`,
        left: `${me.props.left || 250}px`,
        color: '#fff'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '200px',
          height: '50px'
        }}>
          <div style={{
            width: '42px',
            height: '44px',
            background: 'url(' + greenLegend + ') no-repeat center',
            backgroundSize: 'contain',
            position: 'absolute',
            left: 0,
            top: '3px'
          }}>
            <div style={{
              position: 'absolute',
              width: '146px',
              height: '28px',
              lineHeight: '28px',
              top: 0,
              left: '50px',
              textIndent: '2px',
              fontSize: '18px',
              fontWeight: '500'
            }}><span style={
              {
                marginRight: '10px',
                fontWeight: 'bold',
                fontSize: '24px',
                background: 'linear-gradient(to bottom, #75f18e, #30cfb5)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }} ref="storeTotalRef">{'0'}</span>家
            </div>
            <div style={{
              position: 'absolute',
              width: '146px',
              height: '20px',
              lineHeight: '20px',
              top: '30px',
              left: '50px',
              textIndent: '2px',
              color: '#75f18e',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              {me.props.leftTitle || '农投品店总数'}
            </div>
          </div>
        </div>
        {/* <div style={{
          position: 'absolute',
          left: '220px',
          bottom: 0,
          width: '200px',
          height: '50px'
        }}>
          <div style={{
            width: '42px',
            height: '44px',
            background: 'url(' + yellowLegend + ') no-repeat center',
            backgroundSize: 'contain',
            position: 'absolute',
            left: 0,
            top: '3px'
          }}>
            <div style={{
              position: 'absolute',
              width: '146px',
              height: '28px',
              lineHeight: '28px',
              top: 0,
              left: '50px',
              textIndent: '2px',
              fontSize: '18px',
              fontWeight: '500'
            }}><span style={
              {
                marginRight: '10px',
                fontWeight: 'bold',
                fontSize: '24px',
                background: 'linear-gradient(to bottom, #feffb1, #fff606)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }} ref="companyTotalRef">{'0'}</span>家
            </div>
            <div style={{
              position: 'absolute',
              width: '146px',
              height: '20px',
              lineHeight: '20px',
              top: '30px',
              left: '50px',
              textIndent: '2px',
              color: '#fff606',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              {me.props.rightTitle || '农投品生产企业数'}
            </div>
          </div>
        </div> */}
      </div>
    )
  }

  textAnimation() {
    let me = this;
    let leftData = me.state.left;
    let rightData = me.state.right;
    d3.select(me.refs.storeTotalRef).transition()
      .duration(2000)
      .tween('simple', function () {
        let _thisNode = this;
        return function (t) {
          let d = (leftData * t).toFixed(0);
          _thisNode.innerHTML = d;
        }
      });

    d3.select(me.refs.companyTotalRef).transition()
      .duration(2000)
      .tween('simple', function () {
        let _thisNode = this;
        return function (t) {
          let d = (rightData * t).toFixed(0);
          _thisNode.innerHTML = d;
        }
      });
  }
}

export default NumberGradient

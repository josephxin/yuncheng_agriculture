import React from 'react';
import BallScale from './BallScaleMin';

class BallChart extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {
      width: 290,
      height: 290,
      value: 50,
      fontSize: 56,
      textColor: ['#b7ffff', '#21d1f5'],
      backgroundColor: ['rgba(34,199,252,0.2)', 'rgba(43,254,201,0.6)'],
      ballBorder: 10,
      ballBorderColor: ['rgba(43,254,201,0.2)', 'rgba(43,254,201,0.8)'],
    };
    this.ballRef = React.createRef();
  }

  shouldComponentUpdate(prep, pres) {
    return this.props.value !== prep.value;
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
    if (this.svgDom) {
      this.svgDom.remove();
    }
    this.componentDidMount();
  }

  componentDidMount() {
    const me = this;
    const ballR = me.ballR;

    const ballRef = me.ballRef.current;
    const fontSize = this.props.fontSize || this.state.fontSize;
    const textColor = this.props.textColor || this.state.textColor;
    const backgroundColor = this.props.backgroundColor || this.state.backgroundColor;
    const ballBorder = this.props.ballBorder || this.state.ballBorder;
    const ballBorderColor = this.props.ballBorderColor || this.state.ballBorderColor;

    const ringDiagram = new BallScale();
    ringDiagram.width = ballR;
    ringDiagram.height = ballR;
    ringDiagram.speed = 1;
    ringDiagram.peak = 10;
    ringDiagram.value = 0;
    ringDiagram.fontSize = fontSize;
    ringDiagram.fontColor = textColor;
    ringDiagram.stopColor = backgroundColor;
    ringDiagram.borderWidth = ballBorder;
    ringDiagram.borderStopColor = ballBorderColor;
    ballRef.appendChild(ringDiagram.domElement);

    me.svgDom = ringDiagram.domElement;

    me.timer = setTimeout(() => {
      ringDiagram.value = (this.props.value || this.state.value);
    }, 100);
  }

  componentWillMount() {
    this.width = this.props.width || this.state.width;
    this.height = this.props.height || this.state.height;
    this.circleR = this.width > this.height ? this.height : this.width;
    this.ballR = this.circleR;
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        width: this.width,
        height: this.height,
        top: this.props.top || this.state.top,
        left: this.props.left || this.state.left,
      }}>
        <div ref={this.ballRef} style={{
          width: this.ballR,
          height: this.ballR,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}/>
      </div>
    )
  }
}

export default BallChart;

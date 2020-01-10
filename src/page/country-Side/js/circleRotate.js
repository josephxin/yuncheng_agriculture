import React, {Component} from 'react';
import CylinderEnv from './cicleRotateMin';

class CircleRotate extends Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {};
  }

  render() {
    const me = this;
    return (
      <div style={{
        border: 'none',
        cursor: 'move',
        width: '55%',
        height: '50%',
        position:'absolute',
        top:'320px',
        left:'240px'
      }} ref={'circleBox'}/>
    )
  }


  componentDidMount() {
    let me=this;
    const env = new CylinderEnv({
      cameraPosition: [-97.91555157983014,30.25541814953895,42.75111876309459]
    });
    const domElement = me.refs.circleBox;
    env.resize(domElement.clientWidth, domElement.clientHeight);
    domElement.appendChild(env.domElement);
    env.startRender();
    me._env = env;

  }

  componentWillUnmount() {
    const me = this;
    if (me._env) me._env.stopRender();

  }
}

export default CircleRotate;
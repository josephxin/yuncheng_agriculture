import React from 'react';
import './dialog.css';

class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      activeIndex: 0
    };
  }

  _open(text) {
    this.setState({
      display: 'block',
      title: text
    });
  }

  _close() {
    if (typeof this.props.close == 'function') {
      this.props.close();
    }
    this.setState({
      display: 'none',
    });
  }
  render() {
    let me = this;
    return (
      <div style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        zIndex: 999,
        background: 'rgba(27,33,62,.9)',
        left: this.props.left||0,
        top: this.props.top||0,
        display: me.state.display
      }} ref="bgBox">
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: me.props.width || 1557,
          height: me.props.height || 844,
          transform: 'translate(-50%,-50%)',
          paddingTop: '54px'
        }} className="contentBox" ref='dialog'>
          <h3 ref="h3">{this.props.title || '请添加标签'}</h3>
          <span className="diaLogClose" onClick={() => {
            me._close();
          }}></span>
          <div id="iframeFather" style={{ position: 'relative', top: '45px', height: '745px', color: '#fff' }}>
            {me.props.children}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const me = this;
    if(me.state.title){
    	me.refs.h3.innerHTML = me.state.title
    }
  }
}

export default Dialog;

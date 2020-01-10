import React from 'react';
import './dialog.css';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
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
    //关闭弹框
    this.props.closeDialog(false)
  }


  render() {
    let me = this;
    return (
      <div style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        zIndex: 1000,
        background: 'rgba(27,33,62,.9)',
        left: 0,
        top: 0
      }} ref="bgBox" className="opendialog">
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: me.props.width || 1557,
          height: me.props.height || 844,
          transform: 'translate(-50%,-50%)'
        }} className="contentBox" ref='dialog'>
          <h3 ref="h3">{me.props.title || '请添加标签'}</h3>
          <span className="diaLogClose" onClick={() => {
            me._close();
          }}></span>
          <div style={{ position: 'relative', top: '100px', height: '730px', color: '#fff' }}>
            {me.props.children}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }
}

export default Dialog;

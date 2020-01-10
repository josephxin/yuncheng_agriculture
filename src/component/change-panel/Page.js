import React from 'react';
import tab from './tab.png';
import tabed from './tabed.png';

/**
 * tab 切换
 * @author xf
 * 单按钮 两个组件 切换 显示/隐藏
 * props change
 */

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.change = this.change.bind(this);
  }

  change() {
    let index = this.state.index;
    if (index == 0) {
      index = 1;
    } else {
      index = 0;
    }
    if (typeof this.props.change == 'function') {
      this.props.change(index);
    }
    this.setState({ index });

  }
  getIndex(){
    return this.state.index;
  }
  render() {
    const props = this.props;
    let img = tab;
    if (this.state.index) {
      img = tabed;
    }
    let dom = props.children;
    if (dom) {
      if (!dom.length) {
        dom = [dom];
      }
    } else {
      dom = ['', ''];
    }
    return (
      <div style={{
        width: props.width || 440,
        height: props.height || 290,
        position: 'absolute',
        top: props.top || 0,
        left: props.left || 0
      }}>
        <img style={{ position: 'absolute', right: 0, top: 0, zIndex: 9, cursor: 'pointer' }} onClick={this.change} src={img} alt={'tab-btn'} />
        {dom.map((s, i) => {
          return <div key={'tab' + i} style={{ display: this.state.index == i ? 'block' : 'none', position: 'absolute' }}>{s}</div>;
        })}
      </div>
    );
  }
};

export default Page;

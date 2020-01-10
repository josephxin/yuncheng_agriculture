import React from 'react';
import './Dialog2.css';

class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      activeIndex: 0,
      height:'0px',
      height2:'0px'
    };
    this.cont=''
  }

  _open(text) {
    //console.log(text)
    this.setState({
      display: 'block',
      content: text
    });
    this.cont = text.slice(0,4)
    if(this.cont=="http"){
      this.setState({
        height:'680px',
        height2:'0px'
      })
      //http://sd.toxiangxia.com/shouguang/danzhang/fzpangwangcun.html
      document.getElementById('cont').innerHTML=`<iframe id='cont1' src=`+text+`></iframe>`;
    }else{
      this.setState({
        height:'0px',
        height2:'680px'
      })
    }
  }

  _close() {
    if (typeof this.props.close == 'function') {
      this.props.close();
    }
    this.setState({
      display: 'none',
    });
    document.getElementById('cont').innerHTML=''
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
        }} className="contentBox1" ref='dialog'>
          <h3 ref="h3">{this.props.title || '请添加标签'}</h3>
          <span className="diaLogClose1" onClick={() => {
            me._close();
          }}></span>
          <div id='cont' className="content" style={{ position: 'relative', top: '46px', height: this.state.height?this.state.height:'680px', color: '#fff' }}>
          </div> 
          <div id='conta' className="content" style={{ position: 'relative', top: '46px', height:this.state.height2?this.state.height2: '680px', color: '#fff' }}>
              <div dangerouslySetInnerHTML={{__html: this.state.content}} />
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

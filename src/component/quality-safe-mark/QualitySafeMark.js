import React from 'react';
import './qualitysafemark.css';
import pointer from './pointer.png';
import outround from './out-round.png';
import inround from './in-round.png';
import up from './up.png';
export default class QualitySafeMark extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numArry:0
    }
    this.pStyle = {
      backgroundImage: '-webkit-gradient(linear, 0 0, 0 bottom, from(#00f3ff), to(#01ffb3))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      height:'28px',
      position:'absolute',
      left:42,
      top:32,
      fontSize:'28px',
      lineHeight:'28px'
    }
    this.aStyle = {
      color:'#fff',
      display:'block',
      float:'left',
      backgroundImage: '-webkit-gradient(linear, 0 0, 0 bottom, from(#00fff6), to(#227af0))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  }
  setData(text){
    this.setState({
      numArry:text
    })
  }
  render(){
    return(
      <div style={{background:`url(${outround})`,left:50,top:66,width:'364px',height:'175px',position:'absolute'}}>
        <div style={{position:'absolute',left:114,top:103,width:'116px',height:'64px',background:`url(${inround})`}}>
          <p style={{height:'14px',lineHeight:'14px',left:43,top:14,fontSize:'14px',position:'absolute'}}>
            <span style={{...this.aStyle}}>{this.state.numArry}</span>
            <span style={{marginLeft:'5px',display:'block',width:'8px',float:'left',height:'14px',background:`url(${up})`}}> </span>
          </p>
          <p style={{...this.pStyle}}>优</p>
        </div>
        <span ref={'a'} className={'liFang'}></span>
      </div>
    )
  }
}

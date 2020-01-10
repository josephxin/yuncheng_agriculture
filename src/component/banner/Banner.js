import React from 'react';
import Subject from './Subject';
import normal from './img/normal.png';
import select from './img/select.png';
export default class Banner extends React.Component{
  constructor(props){
    super(props);
    this.buttonStyle = {
      display:'block',
      float:'left',
      width:'118px',
      height:'38px',
      fontSize:'16px',
      lineHeight:'38px',
      textAlign:'center',
      color:'#fff',
      cursor:'pointer'

    }

    this.state = {
      arr:[select,normal]
    }
  }
  handle1(){
    this.setState({
      arr:[select,normal]
    })
  }
  handle2(){
    this.setState({
      arr:[normal,select]
    })
  }
/*<span ref={'num2'} onClick={this.handle2.bind(this)} style={{...this.buttonStyle,marginLeft:'20px',background:`url(${this.state.arr[1]}) no-repeat center`}}>三品一标</span>*/
  render(){
    return(
      <div>
        {/* <div style={{width:'100%',height:'38px',marginTop:'40px'}}>
          <span ref={'num1'} onClick={this.handle1.bind(this)} style={{...this.buttonStyle,marginLeft:'15px',background:`url(${this.state.arr[0]}) no-repeat center`}}>一村一品</span>
        </div> */}


        <Subject ref={(ref) => { this.subject = ref; }} name={this.props.name} left={0} top={50}/>

      </div>
    )
  }
}

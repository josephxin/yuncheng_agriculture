//获取当前时间

import React, {Component} from 'react';

class ShowTime extends Component {
  constructor(props) {
    super(props);
    let arr=this.createTime();
    this.state = {
      YMD: arr[0],
      HMS: arr[1]
    };
  }
	createTime() {
		const date = new Date();
    let dates = date.getDate().toString().length > 1 ? date.getDate() : ('0' + date.getDate());
    let y_m_d = date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + dates;
    let h_m_s = (date.getHours().toString().length > 1 ? date.getHours() : ('0' + date.getHours())) + ':' + (date.getMinutes().toString().length > 1 ? date.getMinutes() : ('0' + date.getMinutes())) + ':' + (date.getSeconds().toString().length > 1 ? date.getSeconds() : ('0' + date.getSeconds()));
    return [y_m_d, h_m_s];
	}
  setTime() {
    let me = this;
    let arr=this.createTime();
    me.setState({
      YMD: arr[0],
      HMS: arr[1]
    })
  }
	componentDidMount() {
		
	}
  render() {
    let me = this;
    let y_m_d = me.state.YMD;
    let h_m_s = me.state.HMS;
    return (
      <div className={'showTime'}>{y_m_d} {h_m_s}</div>
    )
  }
}

export default ShowTime;

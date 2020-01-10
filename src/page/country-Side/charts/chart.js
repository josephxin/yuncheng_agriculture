import React, {Component} from 'react';
import pic from '../img/pic-bg.png';

// css
import '../css/ChartBox.css';

class Chart extends Component {
  constructor(props) {
    super();
    this.width = props.width;
    this.height = props.height;
  }


  render() {
    const datas = this.props.datas;
    if (!datas) {
      return (
        <div style={{fontSize: 20, color: '#fff'}}>暂无数据</div>
      )
    } else {
      return (
        <div className={'chartBox'}
             style={{background: `url(${pic}) no-repeat center`, width: this.width || 800, height: this.height || 197}}>
          {
            datas.map((item, i) => {
              return (
                <div className={'chartContent'} key={i}>{item.name} <span
                  style={{visibility: item.value ? 'visible' : 'hidden'}}>{item.value}{item.valueUnit}</span></div>
              )
            })
          }
        </div>
      )
    }
  }
}

export default Chart;
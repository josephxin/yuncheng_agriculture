import React, {Component} from 'react';
import CircleRotate from './circleRotate'
import '../css/StreetDelicacies.css';

class StreetDelicacies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }


  render() {
    // console.log(this.state.data);
    let data=this.props.data;
    return (
      <div >
        <CircleRotate/>
        <div className={'streetContent'}>
          {
            data.length>0?data.map((d,i)=>{
              return <div className={'contentBox'+(i+1)} key={i}>
                <span className={'textSpan'}>{d.value}人</span>
                <p>{d.name}</p>
              </div>
            }):''
          }

        </div>

      </div>
    )
  }
}

export default StreetDelicacies;


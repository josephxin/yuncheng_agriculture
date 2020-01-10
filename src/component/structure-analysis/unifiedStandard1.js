import React from 'react';
import "animate.css";
import './list1.css';
class UnifiedStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        /*{ name: '无公害农产品', value: 210, num: 100 }, //value 家企业  num个产品
        { name: '绿色产品', value: 160, num: 200 },
        { name: '有机农产品', value: 350, num: 280 },
        { name: '农产品地理标志', value: 130, num: 19 }*/
      ]
    }
  }
  setData(json){
    this.setState({
      data:json
    });
    const me = this;
    //me.apper()
  }
  _addList() {
    const me = this;
    if (!me.state.data) { return }
    return me.state.data.map((s, i) => {
      return <li key={i}>
        <div>
          <span style={{ display: 'block' }} ><i>{s.value}</i>家企业</span>
          <span><i>{s.num}</i>个产品</span>
        </div>
        <h4>{s.name}</h4>
        <span ref={'picture' + i} className={'picture animated '}></span>
      </li>
    })
  }
/*  apper() {
    const me = this;
    me.timer = setInterval(function () {
      let index = ~~(Math.random() * 4);
      for (let j = 0; j < 4; j++) {
        me.refs['picture1' + j].classList.remove('bounceIn1');
      }
      me.refs['picture1' + index].classList.add('bounceIn1');
    }, 3000)
  }*/
  render() {
    return (
      <div style={{
        position: 'absolute',
        left: -44,
        top: 108
      }}>
        <div className={'unified-wrap1'}>
          <ul className={'unified-list1'}>
            {this._addList()}
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const me = this;
  //  me.apper()
  }
  componentDidUpdate() {

  }
  componentWillUnmount() {
    /*if (this.timer) {
      clearInterval(this.timer)
    }*/
  }
}
export default UnifiedStandard;
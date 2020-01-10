import React from 'react';
import './product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: '大棚数量', value: 123 },
        { name: '品种个数', value: 235 },
        { name: '种植面积', value: 123 },
        { name: '示范园区', value: 345 },
        { name: '品牌农品', value: 678 },
        { name: '种业成果', value: 33 }
      ]
    }
  }
  _addList() {
    let me = this;
    return me.state.data.map((s, i) => {
      let unit = null;
      if (i == 2) {
        unit = '万亩'
      } else {
        unit = '个'
      }
      return <li key={i}>
        <span style={{ color: '#fff10a', fontSize: 14 }}>{s.value}<b>{unit}</b></span>
        <i className={'domArrs animated'} ref={'arrdom' + i}></i>
        <span style={{ color: '#fff', fontSize: 14 }}>{s.name}</span>
      </li>
    })
  }
  apper() {
    const me = this;
    me.timer = setInterval(function () {
      let index = ~~(Math.random() * 6);
      for (let j = 0; j < 6; j++) {
        me.refs['arrdom' + j].classList.remove('bounceIn');
      }
      me.refs['arrdom' + index].classList.add('bounceIn');
    }, 3000)
  }
  render() {
    return (
      <div style={{
        position: 'absolute',
        top: -94
      }}>
        <ul className={'list-product'}>
          {this._addList()}
        </ul>
      </div>
    )
  }
  componentDidMount() {
    const me = this;
    me.apper()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
}
export default Product;
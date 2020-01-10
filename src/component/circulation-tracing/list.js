import React from 'react';
import './list.css';
/**
 * 流通追溯列表
 */
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: '今日交易量', value: 1230 },
        { name: '今日交易额', value: 1230 }
      ]
    }
  }
  _addLList() {
    const me = this;
    return me.state.data.map((s, i) => {
      let unit = null;
      if (i == 0) {
        unit = '万吨'
      } else if (i == 1) {
        unit = '万元'
      }
      return <li key={i}>
        <span className={'picture'}></span>
        <div>
          <span>{s.name}</span><br />
          <span><i>{s.value}</i>   {unit}</span>
        </div>
      </li>
    })
  }
  render() {
    return (
      <div style={{
        position: 'absolute',
        left: 5,
        top: 60
      }}>
        <ul className={'list-trace'}>
          {this._addLList()}
        </ul>
      </div>
    )
  }

}
export default List;
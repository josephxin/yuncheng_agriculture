import React, {Component} from 'react';
//css

import BarChart from '../barChart/BarChart';

/**
 * 信用体系
 * */

class CreditSystem extends Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      data: props.data || [{
        name: '农林牧渔',
        typeA: 80,
        typeB: 200,
        typeC: 100,
        typeD: 120
      }, {
        name: '林业',
        typeA: 250,
        typeB: 50,
        typeC: 100,
        typeD: 20
      }, {
        name: '烟酒饮料茶',
        typeA: 200,
        typeB: 40,
        typeC: 100,
        typeD: 20
      }, {
        name: '渔业',
        typeA: 180,
        typeB: 20,
        typeC: 100,
        typeD: 20
      }, {
        name: '农产品仓储租赁',
        typeA: 280,
        typeB: 120,
        typeC: 100,
        typeD: 20
      }, {
        name: '农林牧渔',
        typeA: 300,
        typeB: 200,
        typeC: 100,
        typeD: 20
      }, {
        name: '林业',
        typeA: 250,
        typeB: 150,
        typeC: 100,
        typeD: 20
      }, {
        name: '烟酒饮料茶',
        typeA: 200,
        typeB: 140,
        typeC: 100,
        typeD: 20
      }, {
        name: '渔业',
        typeA: 180,
        typeB: 120,
        typeC: 100,
        typeD: 20
      }, {
        name: '农产品仓储租赁',
        typeA: 70,
        typeB: 50,
        typeC: 40,
        typeD: 20
      }, {
        name: '渔业',
        typeA: 180,
        typeB: 120,
        typeC: 100,
        typeD: 20
      }, {
        name: '农产品仓储租赁',
        typeA: 70,
        typeB: 50,
        typeC: 40,
        typeD: 20
      }]
    };
    this.startColor = ['#33c1df', '#33dfa8', '#28dd5f', '#fff83b', '#fd296f'];
    this.endColor = ['#046b97', '#046b97', '#009944', '#8b9e2a', '#833551'];

  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <ul className={'createUl'}>
          <li>A级</li>
          <li>B级</li>
          <li>C级</li>
          <li>D级</li>
        </ul>
        <BarChart data={this.state.data}
                  width={this.props.width}
                  height={this.props.height}
                  startColor={this.startColor}
                  endColor={this.endColor}/>
      </div>
    )
  }
}

export default CreditSystem;

import React, { Component } from 'react';
import TextPage from '../text/TextPage.js';
/**
 *价格监测翻拍效果
 * */
class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: ['根菜类价格指数', '葱蒜姜类价格指数'],
      values: [7171, 8020],
      unit: ''
    }
  }
  _addUnit() {
    return this.state.values.map((s, i) => {
      let val = null;
      let colors = null;
      let unit = null;
      if (s == 7171) {
        val = '+0.03';
        unit = '↑';
        colors = '#fd296f'
      } else if (s == 8020) {
        val = '-0.05';
        unit = '↓';
        colors = '#01ae85'
      }
      return <span key={i} >
        <i style={{
          color: colors
        }}>{unit}</i>{val}</span>
    })
  }
  render() {

    return (
      <div>
        <TextPage width={700}
          left={-190}
          top={30}
          scale={0.45}
          titles={this.state.titles}
          values={this.state.values}
          scale={0.6}
        />
        <div className={'unit-wrap'}>
          {this._addUnit()}
        </div>

      </div >
    )
  }
}

export default Price;

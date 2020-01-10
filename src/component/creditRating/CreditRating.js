import React, { Component } from 'react';
import PieChart from '../rankDistribution/RankDistribution';
import './CreditRading.css'
import TextPage from '../text/TextPage.js';


/**
 *信用分级
 * */
class CreditRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: ['农户红名单', '农户白名单', '农户黑名单'],
      values: [100, 123, 123],
      unit: '人'
    }
  }

  render() {
    return (
      <div>
        <TextPage width={1100}
          left={-350}
          top={10}
          scale={0.45}
          titles={this.state.titles}
          values={this.state.values}
          unit={this.state.unit} />
        <h4 className={'createRatingTitle'}>企业信用等级分布</h4>
        <PieChart width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}

export default CreditRating;

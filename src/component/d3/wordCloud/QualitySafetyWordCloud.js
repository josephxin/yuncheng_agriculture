/**
 * Created by admin on 2018-12-11.
 */
import React from 'react';
import './qualitySafetyWordCloud.css';
import CircleWordCloud from './CircleWordCloud';
import qualitySafeWordCloud from './img/qualitySafeWordCloud.png'

class QualitySafetyWordCloud extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };
    this.flag = false;
    this.rootStyle = {
      position: 'absolute',
      width: `${props.width || 400}px`,
      height: `${props.height || 400}px`,
      left: `${props.left || 0}px`,
      top: `${props.top || 0}px`
    };

    /*初始化*/
    this._chart = new CircleWordCloud();
    this._chart.initial();
    this._chart.domElement.style.position = 'absolute';
    this._chart.domElement.style.top = '35px';

    /*背景图片*/
    this._img = new Image();
    let img = this._img;
    img.src = qualitySafeWordCloud;
    img.width = 395;
    img.height = 159;
    img.style.position = 'absolute';
    img.style.left = '20px';
    img.style.top = '199px';

  }

  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }

  componentDidMount() {
    /*添加实例dom到指定容器*/
    let chart = this._chart;
    let props = this.props;
    let img = this._img;
    this.refs.svgContainer.appendChild(img);
    this.refs.svgContainer.appendChild(chart.domElement);
    chart.size = {width: props.width, height: props.height};
    chart.gPosition = 40;
    chart.data = [
      {name: '坊子区', value: 0.4},
      {name: '茄子', value: 0.9},
      {name: '奎文区', value: 0.8},
      {name: '寿光市', value: 0.1},
      {name: '大豆', value: 0.2},
      {name: '潍坊市', value: 0.3},
      {name: '苹果', value: 0.7},
      {name: '昌乐市', value: 0.5}
    ];
  }

  componentDidUpdate() {
    let chart = this._chart;
    let state = this.state;
    if (this.flag) {
      this.flag = false;
      chart.gPosition = 60;
      chart.data = state.data
    }
  }


  handleClick(d) {
    console.log('词云点击事件数据', this._chart.gNode)
  }


  render() {
    return (
      <div className={'qualitySafetyWordCloud'} style={this.rootStyle} ref="svgContainer" onClick={this.handleClick.bind(this)}>

      </div>
    )
  }

  componentWillUnmount() {
    this._chart.stopTimer()
  }
}

export  default  QualitySafetyWordCloud


/**
 * Created by admin on 2018-12-13.
 */
import Base3dBar2 from './Base3dBar2';
import React from 'react';
import farmerIndex from './farmerIndex.png'

class FarmerCreditIndex2 extends React.Component {
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
    this._chart = new Base3dBar2();
    this._chart.initial();
    // this._chart.domElement.style.position = 'absolute';
    // this._chart.domElement.style.top = '35px';

    /*背景图片*/
    this._img = new Image();
    let img = this._img;
    img.src = farmerIndex;
    img.width = 164;
    img.height = 48;
    img.style.position = 'absolute';
    img.style.left = '15px';
    img.style.top = '136px';

  }

  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }

  initData(dataObj){
	  /*添加实例dom到指定容器*/
	    let chart = this._chart;
	    let img = this._img;
	    this.refs.svgContainer.appendChild(chart.domElement);
	    this.refs.svgContainer.appendChild(img);
	    chart.size = { width: 55, height: 110, left: 55, top: 70, right: 140, bottom: 50 };
	    chart.data = dataObj;
  }
  
  componentDidMount() {
    /*添加实例dom到指定容器*/
    /*let chart = this._chart;
    let img = this._img;
    this.refs.svgContainer.appendChild(chart.domElement);
    this.refs.svgContainer.appendChild(img);
    chart.size = { width: 55, height: 110, left: 55, top: 45, right: 140, bottom: 50 };
    chart.data = [{ name: '红名单', value: 200 }, { name: '白名单', value: 250 }, { name: '黑名单', value: 400 }];*/
  }

  componentDidUpdate() {
    let chart = this._chart;
    let state = this.state;
    if (this.flag) {
      this.flag = false;
      chart.data = state.data
    }
  }




  render() {
    return (
      <div style={this.rootStyle} ref="svgContainer">

      </div>
    )
  }

  componentWillUnmount() {

  }
}

export default FarmerCreditIndex2

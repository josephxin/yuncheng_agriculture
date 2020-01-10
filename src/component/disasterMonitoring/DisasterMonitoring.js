import React, {Component} from 'react';
import {WeifangFloatingMountain} from '../common/weifangCopy';
import Map from './Map';
import './DisasterMonitoring.css';

/**
 * 潍坊市灾害监测
 * */
class DisasterMonitoring extends Component {
  constructor(props) {
    super(props);
    this.dataLevelArr = [];
    this.dataLevelBCArr = [];
    this.state = {
      show: 'none'
    };
  }

  render() {
    console.log('render');
    let show = this.state.show;
    const width = this.props.width || 900;
    const height = this.props.height || 860;
    const top = this.props.top || 48;
    const tooltipList = this.props.tooltipList || [];
    const unit = this.props.unit || '';
    console.log(this.props.seriesData);
    return (
      <div style={{display: show, top: top}} className={'moveBox'}>
        <Map width={width}
             height={height}
             top={2}
             left={17}
             visualMap={this.props.visualMap}
             seriesData={this.props.seriesData}
             tooltipList={tooltipList}
             unit={unit} ref ={'weiFangMap'}/>
        {/*<WeifangFloatingMountain width={width} height={height}/>*/}
        <div style={{
          width: width + 'px',
          height: height + 'px'
        }} ref="mountain">
        </div>
      </div>

    )
  }
  
  componentDidMount() {
    let me = this;
    console.log('计时器')
    setTimeout(() => {
      this.setState({
        show: 'block'
      })
    }, 1500);
    me.refs.mountain.innerHTML='';
    let mountain = new WeifangFloatingMountain();
    mountain.width = me.props.width;
    mountain.height = me.props.height;
    me.refs.mountain.append(mountain.domElement);
    // console.log(me.props.width,me.props.height);
    console.log(mountain.domElement);
    // console.log(mountain);
    // console.log(me.refs.mountain);
  }
  
  handle1(dataMap) {
	  if(dataMap.length>0){
		  /**给预警级别赋颜色*/
		  this.dataLevelArr = dataMap;
	  }
	  this.refs.weiFangMap.handle1(this.dataLevelArr);
  }
  
  handle2(dataMap) {
	  if(dataMap.length>0){
		  /**给预警级别赋颜色*/
		  this.dataLevelBCArr = dataMap;
	  }
	  this.refs.weiFangMap.handle2(this.dataLevelBCArr);
  }
  
}

export default DisasterMonitoring;

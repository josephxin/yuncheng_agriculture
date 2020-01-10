/**
 * Created by admin on 2018-12-8.
 */
import React from 'react';
import D3Bar from './D3Bar';
//弹出框
import Dialog from '../../dialog/Dialog';
class DiseasesInsectPestAnalysis extends React.Component {
  constructor(props) {
    super();
    this.flag = false;
    this.rootStyle = {
      position: 'absolute',
      width: `${props.width || 400}px`,
      height: `${props.height || 400}px`,
      left: `${props.left || 0}px`,
      top: `${props.top || 0}px`
    };
    this.state = {
      data: {}
    };

    /*设置实例宽高*/
    this._chart = new D3Bar();
    this._chart.resize(`${props.width || 400}`, `${props.height || 400}`);
  }
  diseasesListFun(t){}
  _chart = undefined;
  _dom = undefined;
  
  render() {
    return (
        <div ref={ref => this._dom = ref} style={this.rootStyle} onClick={this.props.diseasesListFun.bind(this,'病虫害上报分析列表')}>
              
        </div>
    )
  }

  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    });
  }

  componentDidMount() {
    /*添加实例dom到指定容器*/
    //console.log(this._chart);
    this._dom.appendChild(this._chart.domElement);
    //console.log(this._chart.domElement)
    // this._chart.on('click', function (e) {
    //   console.log(e);
    // });
   // console.log('病虫害',this._chart);
  }

  componentDidUpdate() {
    /*设置实例数据*/
    if (this.flag) {
      this.flag = false;
      this._chart._geoCoordMapPro = this.state.data;
      //console.log(this._chart);
    }
  }

  componentWillUnmount(){
    this._chart.stopTimer()
  }

}

export default DiseasesInsectPestAnalysis

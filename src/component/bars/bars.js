import React, { Component } from 'react';
import echarts from 'echarts';
import { api } from '../../page/homepage/api';
import './index.scss';


/**
 *信用分级
 * */
class Bars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dpNum: 1,
      typeName: [],
      imgName: ['qy', 'pp', 'db', 'yq', 'dp', 'wlw'],
      params: {
        regionName: '寿光'
      },
      dataArr: []
    }
  }

  getDa() {
    this.getData()
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    var newArr = [];
    var newData = [];
    var newImg = [];
    var me = this;
    var name = sessionStorage.getItem('modleName');
    this.setState({
      params:{
        regionName: name
      },
    })
    api.getAllNum({
      regionName: name
    }).then((res)=>{
      var res = res.content;
      if (res.length > 0) {
        for (let i in res) {
          if (i < 6) {
            newArr.push(res[i].indexNum);
            newData.push(res[i].indexName);
          }
        }
        me.setState({
          dataArr: newArr,
          typeName: newData
        })
      } else {
        me.setState({
          dataArr: [],
          typeName: []
        })
      }
    });
  }

  render() {
    return (
        <div className="bars">
          {
            this.state.typeName.map((item, index)=>{
              return (<div className="bar" style={{backgroundImage: "url(" + require("./img/" + this.state.imgName[index]+".png")+")"}} key={index}>{item}<span>{this.state.dataArr[index]}</span></div>)
            })
          }
        </div> 
    )
  }
}

export default Bars;

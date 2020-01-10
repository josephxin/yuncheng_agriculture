/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './gisTable.scss';
import btnBg from './btn-bg.png';

import Glm from '../../component/window/Glm';
import Dialog from '../../component/dialog/Dialog';
class gisTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
        tableDetails:false,
        detailsItem:{}
    }
    this.tbodys = props.data;
  }
  openDetails(item){
      this.setState({
        tableDetails:true,
        detailsItem:item
      })
  }
  closeDetails(){
      this.setState({
        tableDetails:false
      })
  }
  showGLMDialog(title) {
      this.dialogGLMRef._open(title);
  }
  render() {
    let tbodys = this.tbodys,
        detailsItem = this.state.detailsItem;
    return (
      <div>
      <div className={"gis-table-wrap"}>
          <div className={"git-head"}>
            <div className={"git-head-item"}>
                <p className={"blue"}><span>20,000</span>家</p>
                <p>农投品门店</p>
            </div>
            <div className={"git-head-item"}>
                <p className={"orange"}><span>40</span>种</p>
                <p>农投品门店种类</p>
            </div>
          </div>
          <div className={"git-body"}>
              <table style={{width:this.props.width}} className={"gis-table"}>
              	<thead>
                  <tr className={"gis-table-head"}>
                    <th>名称</th>
                    <th>类型</th>
                    <th>地址</th>
                    <th>联系人</th>
                    <th>电话</th>
                  </tr>
                </thead>
                <tbody>
                	{
                    tbodys.map((item, i) => {
                      return (
                        <tr className={"gis-table-body"} key={i}>
                          <td><span onClick={this.openDetails.bind(this,item)}>{item.name}</span></td>
                          <td>{item.type}</td>
                          <td>{item.add}</td>
                          <td>{item.contacts}</td>
                          <td>{item.tel}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div className={"gis-table-details"} style={{display:this.state.tableDetails == true ? 'block' : 'none'}}>
                  <div className={"gis-details-head"}><span onClick={this.closeDetails.bind(this)}>返回</span>{detailsItem.name}</div>
                  <p className={"gis-details-item"}>店铺名称：<span>{detailsItem.name}</span></p>
                  <p className={"gis-details-item"}>营业执照：<span>{detailsItem.license}</span></p>
                  <p className={"gis-details-item"}>法人代表：<span>{detailsItem.contacts}</span></p>
                  <p className={"gis-details-item"}>经营人：<span>{detailsItem.contacts}</span></p>
                  <p className={"gis-details-item"}>联系电话：<span>{detailsItem.tel}</span></p>
                  <p className={"gis-details-item"}>店铺地址：<span>{detailsItem.add}</span></p>
                  <div onClick={this.showGLMDialog.bind(this,detailsItem.name)} style={{
                    width: '120px',
                    height: '40px',
                    background: 'url(' + btnBg + ') no-repeat center 24px',
                    backgroundSize: 'contain',
                    textAlign: 'center',
                    lineHeight: '40px',
                    color: '#fff',
                    fontSize: '16px',
                    margin:'20px auto',
                    cursor: 'pointer',
                    zIndex: 1
                }}>店铺详情</div>
              </div>
          </div>
      </div>
      <Dialog ref={ref => this.dialogGLMRef = ref}>
        <Glm />
      </Dialog>
      </div>
    )
  }
}

export default gisTable

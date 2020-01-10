/**
 * Created by joseph on 2019-8-8.
 */
import React from 'react';
import './gisTable.scss';
import TableDiy from '../../component/table/Table';
/*引入图片*/
import search from './img/search.png';

class gisTable extends React.Component {
	constructor(props) {
		super();
		this.state = {
			shopTotal: '',
			shopType: '',
			tableDetails: false,
			detailsItem: {},
		}
		this.gisListWrap = {
			right: props.right || "0px",
			left: props.left || "0px",
			top: props.top || "0px",
			width: props.width || "auto",
		}
	}
	initActive() {
    console.log('this.shopList----------',this.shopList);
    this.shopList.initActive();
	}
  setTableClose(obj){
	  this.setState({tableDetails:obj})
  }
	setHead(obj) {
	  console.log('----->',obj)
		if(obj && obj.constructor == Object) {
			this.setState({
				shopTotal: obj.shopTotal,
				shopType: obj.shopType,
        selectSeviceCount:obj.selectSeviceCount,
        total:obj.total
			});
		}
	}
  locationBtn(item) {
    return {
      text: '',
      style: {
        background: 'url(' + search + ') no-repeat center',
        cursor: 'pointer'
      },
      tdClick: () => {
        this.openDetails(item);
      }
    }
  }
	setTable(data) {
		let me = this;
		if(data) {
			let list = {
				thead: [{
						text: '名称',
						style: {
							width: '150px',
							maxWidth: '150px',
						}
					},
					'联系人','详情'
				],
				tbody: []
			};
			data.map((item, i) => {
				list.tbody.push({
					td: [item.name,item.contacts,this.locationBtn(item)]
				});
			});
			me.shopList.setData(list);
		}
	}
	openDetails(item) {
		this.setState({
			tableDetails: true,
			detailsItem: item
		});
		if(typeof this.props.openDetails === 'function') {
			this.props.openDetails(item);
		}
	}
	closeDetails() {
		this.setState({
			tableDetails: false
		});
		//this.initActive();
	}

	render() {
		let detailsItem = this.state.detailsItem;

		return(
			<div>
        <div className={"gis-list-wrap"} style={this.gisListWrap}>
          <div className={"git-head"}>
            <div className={"git-head-item"}>
                <p className={"orange"}><span>{this.state.selectSeviceCount}</span>台</p>
                <p>{this.state.shopType}服务网点设备数量</p>
            </div>
            <div className={"git-head-item"}>
              <p className={"blue"}><span>{this.state.total}</span>台</p>
              <p>{this.state.shopType}设备总数</p>
            </div>
          </div>
          <TableDiy tbodyHeight={'680px'} ref={(ref) => { this.shopList = ref }} marginTop={10}></TableDiy>
        </div>

        <div className={"gis-table-details"} style={{display:this.state.tableDetails == true ? 'block' : 'none'}}>
          <div className={"gis-details-head"}><span className={"close"} onClick={this.closeDetails.bind(this)}>关闭</span>{detailsItem.name}</div>
          <p className={"gis-details-item"}>设备类型：<span>{this.state.shopType}</span></p>
          <p className={"gis-details-item"}>服务点名称：<span>{detailsItem.license}</span></p>
          <p className={"gis-details-item"}>联系人：<span>{detailsItem.legalPerson}</span></p>
          <p className={"gis-details-item"}>设备名称及数量：<span>{detailsItem.contacts}</span></p>
          <p className={"gis-details-item"}>联系电话：<span>{detailsItem.tel}</span></p>
          <p className={"gis-details-item"}>服务点地址：<span>{detailsItem.add}</span></p>
        </div>
      </div>
		)
	}
}

export default gisTable;

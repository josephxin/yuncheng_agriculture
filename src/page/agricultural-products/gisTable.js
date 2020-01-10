/**
 * Created by joseph on 2019-8-8.
 */
import React from 'react';
import './css/gisTable.scss';
import TableDiy from '../../component/table/Table6';

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
		this.shopList.initActive();
	}
	setHead(obj) {
		if(obj && obj.constructor == Object) {
			this.setState({
				shopTotal: obj.shopTotal,
				shopType: obj.shopType,
			});
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
					'类型', '联系人'
				],
				tbody: []
			};
			data.map((item, i) => {
				list.tbody.push({
					td: [item.name, item.type, item.contacts],
					trClick: function() {
						console.log(item);
						me.openDetails(item);
					}
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
		this.initActive();
		if(typeof this.props.closeDetails === 'function') {
			this.props.closeDetails();
		}
	}

	render() {
		let detailsItem = this.state.detailsItem;
		return(
			<div>
        <div className={"gis-list-wrap"} style={this.gisListWrap}>
          <div className={"git-head"}>
            <div className={"git-head-item"}>
                <p className={"blue"}><span>{this.state.shopTotal}</span>家</p>
                <p>农投品门店</p>
            </div>
            <div className={"git-head-item"}>
                <p className={"orange"}><span>{this.state.shopType}</span>种</p>
                <p>农投品门店种类</p>
            </div>
          </div>
          <TableDiy tbodyHeight={'680px'} ref={(ref) => { this.shopList = ref }} marginTop={0}></TableDiy>
        </div>
        
        <div className={"gis-table-details"} style={{display:this.state.tableDetails == true ? 'block' : 'none'}}>
          <div className={"gis-details-head"}><span className={"close"} onClick={this.closeDetails.bind(this)}>关闭</span>{detailsItem.name}</div>
          <p className={"gis-details-item"}>店铺名称：<span>{detailsItem.name}</span></p>
          <p className={"gis-details-item"}>营业执照：<span>{detailsItem.license}</span></p>
          <p className={"gis-details-item"}>法人代表：<span>{detailsItem.legalPerson}</span></p>
          <p className={"gis-details-item"}>经营人：<span>{detailsItem.contacts}</span></p>
          <p className={"gis-details-item"}>联系电话：<span>{detailsItem.tel}</span></p>
          <p className={"gis-details-item"}>店铺地址：<span>{detailsItem.add}</span></p>
        </div>
      </div>
		)
	}
}

export default gisTable;
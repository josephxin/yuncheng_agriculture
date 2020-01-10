/**
 * Created by joseph on 2019-8-8.
 */
import React from 'react';
import './css/gisTable.scss';
import TableDiy from '../../component/table/Table6';
/*引入Tab*/
import Tab from '../../component/tab/Tab';

class gisTable extends React.Component {
	constructor(props) {
		super();
		this.state = {
			companyTotal: 0,
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
	setHead(num) {
		this.setState({
			companyTotal: num
		});
	}
	setTable(data) {
		let me = this;
		if(data) {
			let list = {
				thead: [{
						text: '名称',
						style: {
							width: '240px',
						}
					},
					'类型'
				],
				tbody: []
			};
			data.map((item, i) => {
				list.tbody.push({
					td: [item.name, item.type],
					trClick: function() {
						console.log(item);
						me.openDetails(item);
					}
				});
			});
			me.shopList.setData(list);
		}
	}
	initTabIndex(){
		this.tabRef.setState({
			defaultItem: 0
		});
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
	}

	changeTableListByType(e) {
		//console.log(e);
		if(typeof this.props.changeTableListByType == 'function') {
			this.props.changeTableListByType(e);
		}
	}

	render() {
		let detailsItem = this.state.detailsItem;
		return(
			<div>
        <div className={"gis-list-wrap"} style={this.gisListWrap}>
          <div className={"git-head"}>
            <div className={"git-head-item"}>
                <p className={"blue"}><span>{this.state.companyTotal}</span>家</p>
                <p>涉农企业</p>
            </div>
          </div>
          <Tab ref={ref=>this.tabRef=ref} position={'relative'} minWidth={70} marginBottom={20} left={0} top={0} data={['全部', '红名单', '白名单', '黑名单']} onChange={this.changeTableListByType.bind(this)}/>
          <TableDiy ref={(ref) => { this.shopList = ref }} marginTop={0}></TableDiy>
        </div>
        
        <div className={"gis-table-details"} style={{display:this.state.tableDetails == true ? 'block' : 'none'}}>
          <div className={"gis-details-head"}><span className={"close"} onClick={this.closeDetails.bind(this)}>关闭</span>{detailsItem.name}</div>
          <p className={"gis-details-item"}>企业名称：<span>{detailsItem.name}</span></p>
          <p className={"gis-details-item"}>营业执照：<span>{detailsItem.license}</span></p>
          <p className={"gis-details-item"}>法人代表：<span>{detailsItem.legalPerson}</span></p>
          <p className={"gis-details-item"}>经营人：<span>{detailsItem.contacts}</span></p>
          <p className={"gis-details-item"}>联系电话：<span>{detailsItem.tel}</span></p>
          <p className={"gis-details-item"}>企业地址：<span>{detailsItem.add}</span></p>
        </div>
      </div>
		)
	}
}

export default gisTable;
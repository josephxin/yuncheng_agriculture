/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
/*引入antd框架*/
import { Table, Pagination } from 'antd';

import Panel from '../../component/panel/Panel';
import TableDiy from '../../component/table/Table';
import './css/Glm.scss';
import Dialog from '../../component/dialog/Dialog';
import syBtn from './img/suyuan.png';
import { api } from './api.js';

class Glm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shopDetails: {},
			saleAmount: {},
			pageSize1: null,
			total1: null,
			pageSize2: null,
			total2: null,
			ids: null
		};
		this.imgUrl = window.location.href.substring(7, 16) == 'localhost' ? window.BASEURL_03 : '';
		this.params = {
			shopId: null,
			pageable: true,
			pageNum: 1,
			pageSize: 8
		}
		this.params2 = {
			shopId: null,
			pageable: true,
			pageNum: 1,
			pageSize: 14
		}
	}

	jcyjTableData(data) {
		let jcyjTable = { //库存监测
			thead: ['商品名称', '库存数量', '下月销售预测', '库存状态'],
			tbody: []
		};
		data.map((item, i) => {
			jcyjTable.tbody.push([item.smallVariety, item.inventoryQuantity, item.salePredict, this.jcyjTableStyle(item)]);
		});
		this.jcyjTableRef.setData(jcyjTable);
	}
	jcyjTableStyle(item) {
		let state = item.inventoryStatus;
		return {
			text: state == 0 ? '充裕' : '短缺',
			style: {
				color: state == 0 ? '#00ff96' : '#ff7550'
			}
		}
	}
	ywkbTableData(data) {
		let ywkbTable = { //销售看板
			thead: ['客户名称', '销售日期', '商品名称', '购买数量', '商品规格', '当年累计量', '状态', '溯源'],
			tbody: []
		};
		data.map((item, i) => {
			ywkbTable.tbody.push([this.userBtn(item), item.dateTime, item.goodsName, item.saleNum, item.goodsSpec, item.yearTotal, item.status, this.syBtn(item)]);
		});
		this.ywkbTable.setData(ywkbTable);
	}
	syBtn(item) {
		return {
			text: '',
			style: {
				background: 'url(' + syBtn + ') no-repeat center',
				cursor: 'pointer'
			},
			tdClick: () => {
				this.props.openSYWin(item.id);
			}
		}
	}
	userBtn(item) {
		return {
			text: item.custName,
			style: {
				//width: '120px',
				cursor: 'pointer'
			},
			tdClick: () => {
				this.props.openUserWin(item.id);
			}
		}
	}
	openImg(src) {
		this.props.openImgWin(src);
	}
	//列表分页切换
	gisMapPageChange(page) {
		console.log(page);
		this.params.pageNum = page;
		api.gis_shop_inventory(this.params).then((res) => {
			if(window.debugging) console.log('GIS下钻—库存监测', res);
			let data = res.content.list || [];
			this.jcyjTableData(data);
			this.setState({
				total1: res.content.totalCount,
				pageSize1: res.content.pageSize,
			});
		});
	}
	gisMapPageChange1(page) {
		console.log(page);
		this.params2.pageNum = page;
		api.gis_shop_board(this.params2).then((res) => {
			if(window.debugging) console.log('GIS下钻—某农投品店销售看板', res);
			let data = res.content.list || [];
			this.ywkbTableData(data);
			this.setState({
				total2: res.content.totalCount,
				pageSize2: res.content.pageSize,
			});
		});
	}
	
	getData(id) {
		this.setState({
			ids: id
		});
		this.params.shopId = id;
		this.params2.shopId = id;
		if(!id) {
			return false;
		}
		api.gis_shop_details(this.params).then((res) => {
			if(window.debugging) console.log('GIS下钻—农投品门店信息查询', res);
			this.setState({
				shopDetails: res.content
			});
		});
		api.gis_shop_inventory(this.params).then((res) => {
			if(window.debugging) console.log('GIS下钻—库存监测', res);
			let data = res.content.list || [];
			this.jcyjTableData(data);
			this.setState({
				total1: res.content.totalCount,
				pageSize1: res.content.pageSize,
			});
		});
		api.gis_sale_amount(this.params).then((res) => {
			if(window.debugging) console.log('GIS下钻—农投品销售看板-当天当月销售额', res);
			this.setState({
				saleAmount: res.content
			});
		});
		api.gis_shop_board(this.params2).then((res) => {
			if(window.debugging) console.log('GIS下钻—某农投品店销售看板', res);
			let data = res.content.list || [];
			this.ywkbTableData(data);
			this.setState({
				total2: res.content.totalCount,
				pageSize2: res.content.pageSize,
			});
		});
	}
	
	componentDidMount() {

	}

	render() {
		let me = this,
			details = me.state.shopDetails,
			amount = me.state.saleAmount;
		let imgSrc = this.imgUrl + '/' + details.imgUrl;
		return(
			<div className={'investment'}>
	    	<div className={'investment-left'} style={{position:'relative'}}>
		      <div className={'investment-left-top'}>
						<div className={'shop-info'}>
	      			<p><i>营业执照：</i><span>{details.businessLicense}</span></p>
	      			<p><i>法人代表：</i><span>{details.legalPerson}</span></p>
	      			<p><i>经营人：</i><span>{details.operator}</span></p>
	      			<p><i>联系电话：</i><span>{details.linkTel}</span></p>
	      			<p><i>店铺地址：</i><span>{details.address}</span></p>
						</div>
						<img onClick={this.openImg.bind(this, imgSrc)} src={imgSrc}/>
		      </div>
		      
		      <div className={'investment-left-bottom'}>
		      	<Panel title={'库存监测'} width={440} height={430} top={0} left={0} type={0} childrenWidth={628}>
				      <TableDiy tbodyHeight={'315px'} ref={(ref) => { this.jcyjTableRef = ref;}} marginTop={50}></TableDiy>
						</Panel>
		      </div>
					<Pagination simple showQuickJumper current={this.params.pageNum} pageSize={this.state.pageSize1} total={this.state.total1} onChange={this.gisMapPageChange.bind(this)} style={{position:'absolute', right:'15px',bottom:'-10px'}} />
		    </div>

      	<div className={'investment-right'} style={{position:'relative'}}>
      		<Panel title={'销售看板'} width={440} height={689} top={0} left={0} type={0} childrenWidth={780}>
      			{/*<div className={'investment-right-head'}>
    					<div>
		        		<p className={'head-blue'}><span className={'font-22'}>{amount.dayAmount || 0}</span>元</p>
		        		<p className={'head-gray'}>今日销售额</p>
		        	</div>
							<div>
		        		<p className={'head-orange'}><span className={'font-22'}>{amount.monthAmount || 0}</span>元</p>
		        		<p className={'head-gray'}>本月销售额</p>
		        	</div>
		      	</div>*/}
	      		<TableDiy tbodyHeight={'545px'} ref={(ref) => { this.ywkbTable = ref;}} marginTop={50}></TableDiy>
					</Panel>
					<Pagination simple showQuickJumper current={this.params2.pageNum} pageSize={this.state.pageSize2} total={this.state.total2} onChange={this.gisMapPageChange1.bind(this)} style={{position:'absolute', right:'15px',bottom:'-10px'}} />
		    </div>
    	</div>
		)
	}
	setData(d) {
		this.setState({ ...d
		});
	}
}

export default Glm;
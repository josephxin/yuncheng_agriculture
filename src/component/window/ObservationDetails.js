/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import btnBg from './img/btn-bg.png';
import './observationDetails.scss';

class ObservationDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableDetails: false,
			detailsItem: {},
		};

	}
	render() {
		let me = this;
		let detailsItem = this.state.detailsItem;
		return(
			<div className={ "observationDetails"} style={{display:this.state.tableDetails==true ? 'block' : 'none', top: this.props.top}}>
				<div className={ "observationDetails-head"}><span className={ "close"} onClick={this.closeDetails.bind(this)}>关闭</span>{detailsItem.name}</div>
				<p className={ "observationDetails-item"}><i>名称：</i><span>{detailsItem.name}</span></p>
				<p className={ "observationDetails-item"}><i>类型：</i><span>{detailsItem.type}</span></p>
				<p className={ "observationDetails-item"}><i>区域：</i><span>{detailsItem.region}</span></p>
				<p className={ "observationDetails-item"}><i>地址：</i><span>{detailsItem.address}</span></p>
				<p className={ "observationDetails-item"}><i>联系人：</i><span>{detailsItem.linkMan}</span></p>
				<p className={ "observationDetails-item"}><i>主营业务：</i><span>{detailsItem.mainBiz}</span></p>
				<div className={'btn-wrap'}>
					<div onClick={this.showInsIntroDialog.bind(this, detailsItem)}>机构介绍</div>
					<div onClick={this.showGLMDialog.bind(this, detailsItem.name, detailsItem.id)}>检测详情</div>
				</div>
			</div>
		)
	}

	openDetails(item) {
		//console.log(item);
		this.setState({
			tableDetails: true
		})
		if (item && item.constructor == Object) {
			this.setState({
				detailsItem: item
			})
		}
	}
	closeDetails() {
		this.setState({
			tableDetails: false
		})
		if(typeof this.props.closeDetails === 'function') {
			this.props.closeDetails();
		}
	}
	showInsIntroDialog(item) {
		//console.log(item);
		if(typeof this.props.showInsIntroDialog === 'function') {
			this.props.showInsIntroDialog(item);
		}
	}
	showGLMDialog(title, id) {
		//console.log(title, id);
		if(typeof this.props.showGLMDialog === 'function') {
			this.props.showGLMDialog(title, id);
		}
	}
	setData(d) {
		this.setState({ ...d
		})
	}
}

export default ObservationDetails;
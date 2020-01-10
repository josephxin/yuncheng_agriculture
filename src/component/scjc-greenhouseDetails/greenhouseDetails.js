/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './greenhouseDetails.scss'

import tmgy from './img/tmgy.png';

class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			//大棚详情
			userNum: '100',
			phone: '13791684280',
			greenhouseNum: '368',
			greenhouseLength: '10*66',
			plantType: '丝瓜',
			name: '张春志',
			greenhouseType: '菜棚',
			greenhouseArea: '880.00',
			plantDate: '2018年9月10号',
		};
	}

	setData(d) {
		this.setState(d)
	}

	_close() {
		this.props.close('none');
	}
	componentDidMount() {

	}
	componentDidUpdate() {

	}
	componentWillUnmount() {

	}
	render() {
		let me = this;
		let props = this.props;
		return(
			<div className="topGreenhouse" style={{display:this.props.display}}>
	      <div className="greenhouseFather">
	        <div className="greenhouseHead">
	            <div style={{marginLeft:'30px'}} onClick={this._close.bind(this)}>
	                关闭
	            </div>
	            <div className="titleName">大棚-{this.state.name}</div>
	        </div>
	        <div className="greenhouseBody">
	            <div className="littleTittle">基本信息</div>
	            <div className="clearFix">
	                <div className="fl">
	                    <div><span className="leftName">户编号：</span><span className="rightText">{this.state.userNum}</span></div>
	                    <div><span className="leftName">联系电话：</span><span className="rightText">{this.state.phone}</span></div>
	                    <div><span className="leftName">大棚编号：</span><span className="rightText">{this.state.greenhouseNum}</span></div>
	                    <div><span className="leftName">大棚长宽：</span><span className="rightText">{this.state.greenhouseLength}m</span></div>
	                    <div><span className="leftName">种植品种：</span><span className="rightText">{this.state.plantType}</span></div>
	                </div>
	                <div className="fr">
	                    <div><span className="leftName">姓名：</span><span className="rightText">{this.state.name}</span></div>
	                    <div><span className="leftName">大棚类型：</span><span className="rightText">{this.state.greenhouseType}</span></div>
	                    <div><span className="leftName">面积：</span><span className="rightText">{this.state.greenhouseArea}</span></div>
	                    <div><span className="leftName">种植时间：</span><span className="rightText">{this.state.plantDate}</span></div>
	                </div>
	            </div>
	        </div>
	      </div>
    	</div>
		)
	}
}

export default Panel
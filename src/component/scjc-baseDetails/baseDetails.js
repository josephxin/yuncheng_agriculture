import React from 'react';
import './baseDetails.scss';

class baseDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//基地基本信息
			name: '寿光大西环',
			code: 1,
			addrDetails: '山东省潍坊市寿光市',
			baseArea: 328.9,
			baseVariety: '西红柿、黄瓜、彩椒',
		}
	}
	setData(d) {
		this.setState(d);
	}
	_close() {
		this.props.close('none');
	}
	componentDidMount() {

	}
	componentDidUpdate() {

	}
	render() {
		const me = this;
		return(
			<div className="topBase" style={{display:this.props.display}}>
                <div className="greenhouseFather">
                    <div className="greenhouseHead">
                        <div style={{float:'left',marginLeft:'10px'}} onClick={this._close.bind(this)}>
                            关闭
                       </div>
                        <div className="titleName" title={this.state.name}>{this.state.name}</div>
                    </div>
                    <div className="baseBody">
                        <div className="littleTittle">基本信息</div>
                        <div className="clearFix">
                            <div className="fl">
                                <div><span className="leftName">基地编号：</span><span className="rightText">{this.state.code}</span></div>
                                <div><span className="leftName">地址：</span><span className="rightText">{this.state.addrDetails}</span></div>
                                <div><span className="leftName">面积：</span><span className="rightText">{this.state.baseArea?this.state.baseArea:'--'}亩</span></div>
                                <div><span className="leftName">主要农作物：</span><span className="rightText">{this.state.baseVariety}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}

}

export default baseDetails;
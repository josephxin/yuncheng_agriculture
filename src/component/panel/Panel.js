/**
 * Created by joseph_xin on 2018-12-7.
 */
import React from 'react';
import border from './border.png';
import toBig from './to-big.png';
import close from './close.png';
class Panel extends React.Component {
	constructor(props) {
		super();
		this._titleL = props.title.length;
		this.state = {
			display: 'block',
			headerLength:0
		};
		this.panelStyle = {
			zIndex: 1,
			position: 'absolute',
			left: `${props.left}px`,
			top: `${props.top}px`,
			width: `${props.width}px`,
			height: `${props.height}px`
		};
		this.lineDefaultStyle = {
			position: 'absolute',
			left: "8px",
			bottom: `${props.linebottom}`||'4px',
			width: `${(this._titleL + 1) * 20}px`,
			height: '1px',
			backgroundColor: '#349dff'
		};
		this.circleDefaultStyle = {
			position: 'absolute',
			left: "0px",
			bottom: '0px',
			width: '7px',
			height: '7px',
			border: '1px solid #349dff',
			borderRadius: '50%'
		};
		this.textDefaultStyle = {
			fontSize: '20px',
			color: '#fff',
			paddingLeft: '10px'
		};
		this.positionStyle = {
			position: 'absolute',
			height: '35px'
		};
		this.panelImgStyle = {
			width: props.imgSelfWidth ? '' : props.width - ((this._titleL + 1) * 20 + 50),
			position: 'absolute',
			left: `${(this._titleL + 1) * 20 + 6}px`,
			bottom: '0px',
			height: '22px'
		};

		this.clickBig = this.clickBig.bind(this);
	}

	clickBig() {
		if(typeof this.props.onClick === 'function') {
			this.props.onClick();
		}
	}

	setHeaderLength(data){
		console.log(data);
		console.log(this._titleL);
		this.setState({
			headerLength:data
		})
	}

	_titleL = undefined; //title长度

	_close() {
		if(typeof this.props.closeWin == 'function') {
			this.props.closeWin();
		}
		this.setState({
			display: 'none',
		});
	}

	_jump() {
		if(this.props.title === '种植面积走势' || this.props.title === '产量走势') {
			window.location.hash = '/productionMonitor';
		} else if(this.props.title === '农产品交易量和价格走势' || this.props.title === '农产品价格走势' ||
			this.props.title === '农产品销售全国流向' || this.props.title === '农产品进出口贸易流向') {
			window.location.hash = '/circulationTracing';
		} else if(this.props.title === '质量安全合格率' || this.props.title === '质量安全综合指数') {
			window.location.hash = '/qualitySafety';
		} else if(this.props.title === '病虫害上报分析') {
			window.location.hash = '/disasterPrediction';
		}else if(this.props.title === '信用体系') {
			window.location.hash = '/enterpriseCredit';
		}else if(this.props.title === '农业农村概况') {
      window.location.hash = '/harmoniousCountryside';
    }
	}

	render() {
		let me = this;
		let props = this.props;
		let childrenWidth = props.childrenWidth || '';
		return(
			<div style={{display:this.state.display}} componentname={props.title}>
	      <div style={{...this.panelStyle,zIndex:props.zIndex?props.zIndex:1}}>
	        <div className="titlePanel" style={{...props.style,position: 'absolute',height: '34px'}}>
	          <p onClick={me._jump.bind(this)} style={this.textDefaultStyle}>{props.title}</p>
	          <div style={this.circleDefaultStyle}></div>
	          <div style={this.lineDefaultStyle}></div>
	          <img src={border} alt="" style={this.panelImgStyle} />
	        </div>
	        <img onClick={this.clickBig} src={toBig} alt={'to big button'} style={{
	          display: props.type ? 'block' : 'none',
	          position: 'absolute',
	          cursor: 'pointer',
	          top: 0,
	          right: 0,
	          zIndex: 9
	        }} />
	        <img alt={'to big button'} src={close} onClick={me._close.bind(this)} style={{
	          display: props.typeClose ? 'block' : 'none',
	          position: 'absolute',
	          cursor: 'pointer',
	          top: 0,
	          right: -40,
	          zIndex: 9
	        }} />
	        <div className="childPanel" style={{width: childrenWidth, height: 10, position: props.position || ''}}>
	          {props.children}
	        </div>
	      </div>
      </div>
		)
	}
}

export default Panel
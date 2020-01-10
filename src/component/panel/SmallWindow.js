/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import border from './border.png';
import toBig from './to-big.png';
import close from './close.png';

class SmallWindow extends React.Component {
	constructor(props) {
		super(props);
		this._titleL = props.title.length;

		this.panelStyle = {
			zIndex: 400,
			position: 'absolute',
			left: props.left,
			right: props.right,
			top: props.top,
			width: `${props.width}px`,
			height: `${props.height}px`,
			backgroundColor: '#0b3370',
			border: "1px solid #2670bc",
			padding: 20,

		};
		this.lineDefaultStyle = {
			position: 'absolute',
			left: "8px",
			bottom: '4px',
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

	_titleL = undefined; //title长度
	_close() {
		if(typeof this.props.closeWin == 'function') {
			this.props.closeWin(this.props.name);
		}
	}
	render() {
		let me = this;
		let props = this.props;
		let childrenWidth = props.childrenWidth ? props.childrenWidth : '';
		//console.log(props.show);
		return(
			<div style={{ display: props.show == true ? 'block' : 'none'}}>
		    <div className={ props.typeClose ? 'smallWindow' : ''} style={this.panelStyle}>
		      <div className="titlePanel" style={{...props.style,position: 'absolute',height: '35px'}}>
		        <p style={this.textDefaultStyle}>{props.title}</p>
		        <div style={this.circleDefaultStyle}></div>
		        <div style={this.lineDefaultStyle}></div>
		        <img src={border} alt="" style={this.panelImgStyle} />
		      </div>
		      <img onClick={this.clickBig} src={toBig} alt={'to big button'} style={{
		        display: props.type ? 'block' : 'none',
		        position: 'absolute',
		        cursor: 'pointer',
		        top: 20,
		        right: 60,
		        zIndex: 9
		      }} />
		      <img alt={'to big button'} src={close} onClick={me._close.bind(this)} style={{
		        position: 'absolute',
		        cursor: 'pointer',
		        top: 20,
		        right: 20,
		        zIndex: 9
		      }} />
		      <div className="childPanel" style={{position: 'relative', paddingTop: '50px', width: childrenWidth}}>
		        {props.children}
		      </div>
		    </div>
      </div>
		)
	}
}

export default SmallWindow
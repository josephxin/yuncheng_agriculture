import React from 'react';
import liBg from './liBg.png';
export default class TurnUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			val: 0
		};
		this.colorArr = ['rgba(41,243,177,1)', 'rgba(243,236,11,1)'];
		this.pStyle = {
			fontSize: '24px',
			marginBottom: '10px',
			height: '24px',
			lineHeight: '24px',
			backgroundImage: '-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(' + this.colorArr[this.props.theme - 1] + '))',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent'
		};
		this.liStyle = {
			marginLeft: '2px',
			marginTop: '2px',
			width: '32px',
			height: '48px',
			lineHeight: '48px',
			fontSize: '30px',
			float: 'left',
			background: `url(${liBg})`
		};
		this.spanStyle = {
			display: 'block',
			textAlign: 'center',
			height: '100%',
			width: '100%',
			backgroundImage: '-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(' + this.colorArr[this.props.theme - 1] + '))',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent',
		};
		this.unitStyle = {
			height: '18px',
			lineHeight: '18px',
			top: '60px',
			fontSize: '18px',
			position: 'absolute',
			backgroundImage: '-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(' + this.colorArr[this.props.theme - 1] + '))',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent',
		};
		this.flag = false;
	}

	setData(d) {
		this.flag = true;
		this.setState({
			val: d
		});
	}

	render() {
		//console.log(this.state.val, this.flag);
		if(this.flag) {
			return(
				<div>
	        <p style={{...this.pStyle}}>{this.props.title}</p>
	        <ul ref={'ul'} style={{height:'52px',border:'1px solid #006cff'}}>
	          {
	            this.addList(this.change(this.state.val))
	          }
	        </ul>
	        <span style={{...this.unitStyle,right:this.props.unitRight}}>{this.props.unit}</span>
	      </div>
			)
		} else {
			return null;
		}
	}

	addList(el) {
		//console.log(el);
		return el.map((v, i) => {
			if(v === ',') {
				return(
					<li style={{marginLeft:'2px',marginTop:'2px',width:'12px',height:'48px',lineHeight:'48px',fontSize:'30px',float:'left'}} key={i}>
            <span style={{...this.spanStyle}}>{v}</span>
          </li>
				)
			} else {
				return(
					<li style={{...this.liStyle,marginRight:i===el.length-1?'2px':0}} key={i}>
            <span style={{...this.spanStyle}}>{v}</span>
          </li>
				)
			}

		})
	}

	change(a) {
		let num = a;
		let b = String(num).split('').reverse();
		let me = this;

		for(let i = 0; i < b.length; i++) {
			if(i % 4 === 3) {
				b.splice(i, 0, ',')
			}
		}
		let c = b.reverse();
		return c
	}

	componentDidUpdate() {
		//console.log('componentDidUpdate');
	}

	componentDidMount() {}
}
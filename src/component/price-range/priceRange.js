import React from 'react';
import './price.css';
import {
	getLocalPosition,
	getGlobalPosition
} from '@jusfoun-vis/scaler';
class PriceRange extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}

	}

	_mouseOver(index, e) {
		const me = this;
		let ind = index / 2;
		let disx = null;
		let disy = 38 * ind;

		me.refs.tooltip.style.display = 'block'
		window.onmousemove = function(event) {
			let p1 = getLocalPosition(event, me.refs.priceWarn);
			disx = p1.x + 30;
			me.refs.tooltip.style.left = disx + 'px';
			me.refs.tooltip.style.top = disy + 'px';
			me.refs.cityName.innerHTML = e.name;
			me.refs.cityVal.innerHTML = e.value;
			me.refs.rangeRef.innerHTML = e.range;
		}
	}
	_mouseOut() {
		window.onmousemove = null;
		this.refs.tooltip.style.display = 'none'
	}
	_addList() {
		const me = this;
		if(!this.state.data) {
			return
		}
		// this.state.data=me.props.data
		let datas = this.state.data

	}
	render() {
		const me = this;
		let datas = this.state.data;
		return(
			<div ref={'priceWarn'} style={{position: 'absolute',left: 0,right: 0,top: 30}}>
        <div>
          <ul className={'price-wrap'}>
            {
                datas.map((s, i) => {
                  return <li key={i}>
                    <span className={'cityName'}>{s.name}</span>
                    <div onMouseOver={this._mouseOver.bind(this, i, s)} onMouseOut={this._mouseOut.bind(this, i, s)} >
                      <span ref={'dataVal' + i} style={{ width: 0 }}></span>
                    </div>
                    <span className={'cityVal'}> {s.value}</span>
                  </li >
                })
            }
          </ul>
          <div className={'price-tooltip'} ref={'tooltip'} style={{display: 'none',left: 200,top: 20}}>
            <span ref={'cityName'}></span><br />
            <span ><i ref={'cityVal'}></i>元/公斤</span><br />
            <span >排名第<i ref={'rangeRef'}></i></span>
          </div>
        </div>
      </div >
		)
	}
	moving() {
		const me = this;
		let data = this.state.data;
		let len = data.length;
		if(len < 1) {
			return;
		}
		let barW = 285;
		let max = Math.max.apply(null, this.state.data.map((s) => s.value));
		for(let i = 0; i < len; i++) {
			me.refs['dataVal' + i].style.width = `${barW * (this.state.data[i].value / max)}px`;
			me.refs['dataVal' + i].style.transition = 'width 1s';
		}
	}

	setData(data) {
		this.setState({
			data: data
		});
		this.moving();
	}
	componentDidMount() {}
	componentDidUpdate() {}
	componentWillUnmount() {

	}
}
export default PriceRange;
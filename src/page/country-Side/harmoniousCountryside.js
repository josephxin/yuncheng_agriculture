import React from 'react';
import './css/countrySide.scss';
import Affluent from './affluent.js';
import Harmonious from './Harmonious.js';
import Ecology from './Ecology.js';
import CountrySide from './countrySide.js';

class harmoniousCountryside extends React.Component {
	constructor() {
		super();
		this.state = {
			activeIndex: localStorage.getItem('activeIndex') || 0,
		};
	}
	changeBtn(activeIndex, e) {
		e.persist(); //将合成事件变成原生事件
		//console.log(e);
		/*let nodeBox = document.getElementsByClassName('container-box');
		let nextNode = e.target.parentNode.children[1];
		for(let key in nodeBox) {
			if(!isNaN(Number(key))) {
				nodeBox[key].style.display = 'none';
			}
		}
		//console.log(nextNode);
		nextNode.style.display = 'block';*/
		localStorage.setItem('activeIndex', activeIndex);
		this.setState({
			activeIndex: activeIndex
		});
	}
	
	componentDidMount() {
		//document.getElementById('countryBox').style.display = 'none';
		//document.getElementById('affluentBox').style.display = 'none';
		//document.getElementById('harmoniousBox').style.display='none';
		//document.getElementById('ecologyBox').style.display = 'none';
	}
	
	render() {
		const me = this;
		const defaulTime = me.state.defaulTime;
		return(
			<div>
        {/*tabs页面切换*/}
        <div className={'tabs-switch'}>
          <div id="countryBtn" className={'tabs-switch-item'}>
          	<span className={`my-btn${me.state.activeIndex==0?' active':''}`} onClick={this.changeBtn.bind(this, 0)}>农村概况</span>
            <div className={'container-box'} id="countryBox" style={{position: 'absolute', top:-80, left:-715}}>
              {
              	me.state.activeIndex==0 ? <CountrySide/> : null
              }
            </div>
          </div>
          <div id="affluentBtn" className={'tabs-switch-item'}>
          	<span className={`my-btn${me.state.activeIndex==1?' active':''}`} onClick={this.changeBtn.bind(this, 1)}>富裕农村</span>
            <div className={'container-box'} id="affluentBox">
              {
              	me.state.activeIndex==1 ? <Affluent/> : null
              }
            </div>
          </div>
          <div id="harmoniousBtn" className={'tabs-switch-item'}>
          	<span className={`my-btn${me.state.activeIndex==2?' active':''}`} onClick={this.changeBtn.bind(this, 2)}>和谐农村</span>
            <div className={'container-box'} id="harmoniousBox">
              {
              	me.state.activeIndex==2 ? <Harmonious/> : null
              }
            </div>
          </div>
          <div id="ecologyBtn" className={'tabs-switch-item'}>
          	<span className={`my-btn${me.state.activeIndex==3?' active':''}`} onClick={this.changeBtn.bind(this, 3)}>生态农村</span>
            <div className={'container-box'} id="ecologyBox">
              {
              	me.state.activeIndex==3 ? <Ecology/> : null
              }
            </div>
          </div>
        </div>
      </div>
		)
	}
}

export default harmoniousCountryside;
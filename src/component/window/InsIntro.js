/**
 * Created by joseph_xin on 2018-01-16.
 */
import React from 'react';
import './InsIntro.scss';

class InsIntro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			intro: ''
		};
	}
	render() {
		let me = this;
		let intro = me.state.intro;
		return (
			<div className={'ins-intro'}>
				{intro}
      </div>
		)
	}
	setData(d){
		//console.log(d);
		this.setState({
			intro: d
		})
	}
}

export default InsIntro;
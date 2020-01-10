/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import imgURL from './qrcode.png';

class Jcbg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}
	render() {
		return(
			<div> 
                <img src={imgURL} style={{width:'300px',height:'300px',display:'block',position:'absolute',top:'30px',left:'50px'}}/>
            </div>
		)
	}
}

export default Jcbg
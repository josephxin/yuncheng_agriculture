/**
 * desc：
 * author：joseph_xin
 * date：2019-9-10
 */
import React, {
	Component
} from 'react';

class LineMoreTooltip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: false
		};
	}
	
	showDialog(){
		if (typeof this.props.click == 'function') {
			this.props.click(this.state.name);
		}
	}
	
	render() {
		let me = this;
		if(me.state.flag) {
			return(
				<div ref={ref=>me.lineMoreTooltipRef=ref} className={'tooltip-box'} style={{
          left: me.state.pos[0] + 12,
          top: me.state.pos[1] - 19,
          cursor: 'pointer'
        }} onClick={this.showDialog.bind(this)}>
          {me.state.name}
          <i className="lt"></i>
          <i className="angle"></i>
          <i className="rb"></i>
        </div>
			);
		} else {
			return null;
		}
	}
}

export default LineMoreTooltip;
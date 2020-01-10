import React from 'react';
import './tab.scss';

class Tab extends React.Component {
	constructor(props) {
		super();
		this.state = {
			defaultItem: props.defaultItem || 0,
			data: []
		}

		this.tabWrap = {
			"position": props.position || "absolute",
			"top": props.top || '',
			"right": props.right || '',
			"left": props.left || '',
			"bottom": props.bottom || '',
			'width': props.width || '',
			"marginBottom": props.marginBottom || ''
		}
	}

	itemChange(obj) {
		console.log(obj)
		if(typeof this.props.onChange === 'function') {
			if(obj.value != this.state.defaultItem) {
				this.props.onChange(obj);
				this.setState({
					defaultItem: obj.value
				})
			}
		}
	}
	setData(data) {
		this.setState({
			data: data,
		});
	}
	render() {
		let data = this.props.data || this.state.data || [];
		let {
			defaultItem
		} = this.state;
		return(
			<div className={"diy-tab-wrap"} style={this.tabWrap}>
        {
            data.map((item, index) => {
              return (
                  <span style={{minWidth: this.props.minWidth}} className={`diy-tab-item${ index === defaultItem ? " active": '' }`} key={index} onClick={this.itemChange.bind(this,{label:item, value:index})}>
                    <i className={"diy-tab-l"}></i>{item}<i className={"diy-tab-r"}></i>
                  </span>
              )
            })
        }
      </div>
		)
	}
}

export default Tab
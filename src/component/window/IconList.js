/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import './IconList.scss';

class IconList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			gisIconActive: -1,
		};
		
	}
	render() {
		let me = this;
		//console.log('render', this.props.visible);
		return (
			<div className={'iconList'} style={{display: this.props.visible ? 'block' : 'none'}}>
				{
					me.state.data.map((t, i)=>{
						return (
							<div key={i} className={`${me.state.gisIconActive==i ? 'active' : ''}`} style={{backgroundImage: 'url(' + t.src + ')'}} title={t.title} onClick={this.onClick.bind(this, i)}>
            		<div></div>
            	</div>
						)
					})
				}
      </div>
		)
	}
	componentDidUpdate(){
		//console.log('componentDidUpdate', this.props.visible);
	}
	componentDidMount(){
		//console.log('componentDidMount', this.props.visible);
	}
	setData(d){
		this.setState({
			data: d
		})
	}
	initGisIconActive(){
		this.setState({
			gisIconActive: -1
		})
	}
	onClick(active){
		if(this.state.gisIconActive != active) {
			this.setState({
				gisIconActive: active,
			})
		} else {
			this.setState({
				gisIconActive: -1,
			})
		}
		this.props.click(active);
	}
}

export default IconList;
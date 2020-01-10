/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import btnBg from './img/btn-bg.png';
import './observationDetails.scss';

class ObservationDetails2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableDetails: false,
			name: '',
			detailsList: [],
			unit: '',
		};

	}
	render() {
		let me = this;
		let detailsList = me.state.detailsList;
		return(
			<div className={ "observationDetails"} style={{display:me.state.tableDetails==true ? 'block' : 'none', top: me.props.top}}>
				<div className={ "observationDetails-head"}><span className={ "close"} onClick={me.closeDetails.bind(this)}>关闭</span>{me.state.name}</div>
				{
					detailsList.map((item, i)=>{
						return (
							<p key={i} className={ "observationDetails-item3"}><i>{item[0]}：</i><span className={'overflow-ellipsis'} title={item[1]}>{item[1]}{me.state.unit}</span></p>
						)
					})
				}
			</div>
		)
	}
	
	openDetails(name, item, unit) {
		//console.log(item);
		this.setState({
			tableDetails: true
		})
		if (item && item.constructor == Array) {
			this.setState({
				name: name,
				detailsList: item,
				unit: unit || '',
			})
		}
	}
	closeDetails() {
		this.setState({
			tableDetails: false
		});
		if (typeof this.props.closeDetails == 'function') {
			this.props.closeDetails();
		}
	}
}

export default ObservationDetails2;
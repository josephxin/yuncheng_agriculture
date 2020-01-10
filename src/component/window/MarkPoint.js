/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import './markPoint.scss';

class MarkPoint extends React.Component {
	constructor(props) {
		super(props);
		this.className2 = props.className2 || 'mark-point';
		this.state = {
			dataList: []
		};

	}
	render() {
		let me = this;
		let dataList = me.state.dataList;
		return(
			<div className={me.className2} style={{display: dataList.length>0 ? 'flex' : 'none'}}>
				{
					dataList.map((t, i)=>{
						return (
							<div key={i}><div><img src={t.src} height={t.height} /></div><span>{t.name}</span></div>
						)
					})
				}
      </div>
		)
	}
	setData(d) {
		this.setState({ ...d
		})
	}
}

export default MarkPoint
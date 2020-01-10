/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import Table7 from '../table/Table7';
import './observation.scss';

class Observation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			observationHead: [],
			fontSize: '',
		};

	}
	render() {
		let me = this;
		return (
			<div style={{width: me.props.width||'', height: me.props.height||'', left: me.props.left||0}} className={'observation-cont'}>
				<div className={'observation-head3'}>
					{
						me.state.observationHead.map((t, i)=>{
							return (
								<div key={i}>
									<b style={{fontSize: this.state.fontSize}}>{t.name}：</b>
									<span>{t.num}</span>
									<em> {t.unit}</em>
								</div>
							)
						})	
					}
				</div>
				<Table7 ref={ref => this.TableRef = ref} marginTop={8} simple={true} click={this.props.click} getData={this.props.getData}></Table7>
			</div>
		)
	}

	initActive() {
		this.TableRef.initActive();
	}
	setData1(d, fontSize) {
		this.setState({
			observationHead: d,
			fontSize: fontSize
		});
	}
	setData2(d) {
		this.TableRef.setData(d);
	}
}

export default Observation;
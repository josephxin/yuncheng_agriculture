/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
//import Table1 from '../table/Table1';
import Table5 from '../table/Table5';
import './observation.scss';

class Observation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			observationHead: []
		};

	}
	render() {
		let me = this;
		return (
			<div style={{width: me.props.width||'', height: me.props.height||'', left: me.props.left||0}} className={'observation-cont'}>
				<div className={'observation-head'}>
					{
						me.state.observationHead.map((t, i)=>{
							return (
								<div key={i}>
									<p className={t.color}><span className={'font-22'}>{t.num}</span>{t.unit}</p>
									<p className={'head-gray'}>{t.name}</p>
								</div>
							)
						})	
					}
				</div>
				<Table5 ref={ref => this.TableRef = ref} marginTop={8} simple={true} isClick={true} click={this.props.click} getData={this.props.getData}></Table5>
			</div>
		)
	}

	initActive() {
		this.TableRef.initActive();
	}
	setData1(d) {
		this.setState({
			observationHead: d
		});
	}
	setData2(d) {
		this.TableRef.setData(d);
	}
}

export default Observation;
/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import Table5 from '../table/Table5';
import './observation.scss';

class Observation2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			observationHead: [],
			active: 0,
		};
	}
	render() {
		let me = this;
		return(
			<div style={{width: me.props.width||'', height: me.props.height||'', left: me.props.left||0}} className={'observation-cont'}>
				<div className={'observation-head'}>
					{
						me.state.observationHead.map((t, i)=>{
							return (
								<div style={{cursor: 'default'}} key={i} onClick={me.onClick.bind(me, i)}>
									<p className={t.color}><span className={'font-22'}>{t.num}</span>{t.unit}</p>
									<p className={'head-gray'}>{t.name}</p>
								</div>
							)
						})	
					}
				</div>
				<Table5 ref={ref => me.TableRef = ref} marginTop={8} simple={true} isClick={true} click={me.props.click} getData={me.props.getData}></Table5>
			</div>
		)
	}
	
	initActive(){
		this.TableRef.initActive();
	}
	setData1(d){
		this.setState({
			observationHead: d
		});
	}
	setData2(d){
		this.TableRef.setData(d);
	}
	onClick(index){
		if (typeof(this.props.headClick)=="function") {
			this.props.headClick(index);
		}
		this.setState({
			active: index
		});
	}
}

export default Observation2;
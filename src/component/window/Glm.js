/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import Panel from '../../component/panel/Panel';
import TableDiy from '../../component/table/Table2';
import './Glm.scss';

class Glm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orgDetails: [
				['类型', '监测机构'],
				['区域', '奎文区'],
				['地址', '文化南路凤凰街152号'],
				['面积', 1000]
			],
			observationHead: [],
		};
	}
	componentDidUpdate() {

	}
	render() {
		let me = this;
		let orgDetails = me.state.orgDetails;
		let observationHead = me.state.observationHead;

		return(
			<div className={'Glm'}>
    		<div className={'Glm-left'}>
      		<div className={'Glm-left-top'}>
      			{
      				orgDetails.map((t, i)=>{
      					return (
      						<p key={i}><i>{t[0]}：</i><span>{t[1]}</span></p>
      					)
      				})
      			}
      		</div>
      		<div className={'Glm-left-bottom'}>
      			<Panel title={me.props.title1} width={440} height={468} top={0} left={0} type={0} childrenWidth={628}>
		          <TableDiy ref={ref => this.TableDiyRef1 = ref} marginTop={60} tbodyHeight={'310px'} click={this.props.click} getData={this.props.getData}></TableDiy>
		        </Panel>
      		</div>
      	</div>
      	
      	<div className={'Glm-right'}>
      		<Panel title={me.props.title2} width={440} height={679} top={0} left={0} type={0} childrenWidth={780}>
      			<div className={'Glm-right-head'}>
		      		{
		      			observationHead.map((t, i)=>{
		      				return (
		      					<div key={i}>
					        		<p className={t.color}><span className={'font-30'}>{t.num}</span>{t.unit}</p>
					        		<p className={'head-gray'}>{t.name}</p>
					        	</div>
		      				)
		      			})	
		      		}
		      	</div>
		      	<TableDiy ref={ref => this.TableDiyRef2 = ref} marginTop={0} tbodyHeight={'445px'} click={this.props.click2} getData={this.props.getData2}></TableDiy>
	        </Panel>
      	</div>
    	</div>
		)
	}
	setData1(d) {
		//console.log(d);
		this.setState({ ...d
		})
	}
	setData2(d) {
		//console.log(d);
		this.setState({ ...d
		})
	}
	setData3(d) { //右侧table
		//console.log(d);
		this.TableDiyRef2.setData(d)
	}
	setData4(d) { //左侧table
		//console.log(d);
		this.TableDiyRef1.setData(d)
	}
}

export default Glm
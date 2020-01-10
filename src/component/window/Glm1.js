/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
import Panel from '../../component/panel/Panel';
import { Table, Pagination } from 'antd';
import TableDiy from '../../component/table/Table2';
import TableDiy2 from '../../component/table/Table4';
import { api } from '../../page/circulation-tracing/api.js'
import dates from '../../page/circulation-tracing/data';
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
			imgs: '',
			total1: null,
			total2: null,
			mkid: null,
			pageNum: 1,
			pageNum2: 1
		};
	}
	componentDidUpdate() {

	}
	componentWillMount() {

	}
	componentDidMount() {

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
      						<p key={i} style={{width:'340px'}}><i>{t[0]}：</i><span>{t[1]}</span></p>
      					)
      				})
				  	}
					  <img style={{width:'170px',height:'110px'}} src={this.state.imgs} onClick={this.onClick.bind(this, orgDetails[0][1])} />
      		</div>
      		<div className={'Glm-left-bottom1'}>
      			<Panel title={me.props.title1} width={440} height={428} top={0} left={0} type={0} childrenWidth={628}>
		          <TableDiy2 ref={ref => this.TableDiyRef1 = ref} marginTop={60} tbodyHeight={'310px'}></TableDiy2>
		        </Panel>
						<Pagination simple showQuickJumper current={this.state.pageNum} pageSize={10} total={this.state.total1} onChange={this.gisMapPageChange.bind(this)} style={{position:'absolute', right:'15px',bottom:'0'}}/>
      		</div>
      	</div>
      	
      	<div className={'Glm-right'}>
      		<Panel title={me.props.title2} width={780} height={679} top={0} left={0} type={0} childrenWidth={780}>
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
		      	<TableDiy2 ref={ref => this.TableDiyRef2 = ref} marginTop={0} tbodyHeight={'445px'} click={this.props.clicksy}></TableDiy2>
				  	<Pagination simple showQuickJumper current={this.state.pageNum2} pageSize={10} total={this.state.total2} onChange={this.gisMapPageChange2.bind(this)} style={{position:'absolute', right:'15px',bottom:'0'}}/>
	        </Panel>
      	</div>
    	</div>
		)
	}
	onClick(type) {
		console.log(type);
		if(typeof(this.props.clickimg) == "function") {
			this.props.clickimg(type);
		}
	}
	//列表分页切换
	gisMapPageChange(pagen) {
		console.log('页码', pagen);
		this.setState({
			pageNum: pagen
		})
		let salesTrendParams = {
			orgId: '0',
			pageable: true,
			pageNum: pagen || 2,
			pageSize: 10,
			buyerId: this.state.mkid
		}
		api.org_sale_list(salesTrendParams).then((res) => {
			if(window.debugging) console.log('左侧table', res);
			let content = res.content.list;
			if(content && content.length > 0) {
				let tbody = []
				content.map((t, i) => {
					tbody.push([t.productName, t.tradingWeight + t.unit, t.transactionSum + t.unit, t.transactionPrice]);
				});
				dates.table1.tbody = tbody
				this.TableDiyRef1.setData(dates.table1)
			}
		})
	};
	gisMapPageChange2(pagen) {
		console.log('页码', pagen);
		this.setState({
			pageNum2: pagen
		})
		let salesTrendParams = {
			orgId: '1',
			pageable: true,
			pageNum: pagen || 2,
			pageSize: 10,
			buyerId: this.state.mkid
		}
		api.org_sale_list(salesTrendParams).then((res) => {
			if(window.debugging) console.log('右侧table', res);
			let content = res.content.list;
			if(content && content.length > 0) {
				let tbody = [];
				let zj;
				content.map((t, i) => {
					zj = t.transactionSum * t.transactionPrice
					let str=zj.toString()
					if(str.indexOf(".")==-1){
						zj = t.transactionSum * t.transactionPrice
					}else{
						zj =str.substring(0,str.indexOf(".")+2)
					}
					tbody.push([t.productName, t.direction, t.tradingWeight + t.unit, t.transactionPrice, zj, t.dateTime, t.city, '溯源']);
				});
				dates.table2.tbody = tbody
				this.TableDiyRef2.setData(dates.table2)
			}
		})
	};
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
	setData5(d) {
		//console.log(d);
		this.setState({
			imgs: d
		})
	}
	//左侧
	setDataid(e) {
		//console.log('id', e)
		this.setState({
			mkid: e
		})
	}
	setDataTotal(e) {
		//console.log(e)
		this.setState({
			total1: e
		})
	}
	//右侧
	setDataTotal2(e) {
		//console.log(e)
		this.setState({
			total2: e
		})
	}
}

export default Glm;
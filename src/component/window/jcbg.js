/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
/*引入antd框架*/
import { Table } from 'antd';
import Panel from '../../component/panel/Panel';
import './jcbg.css';

class Jcbg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			details: {
				
			}
		};

	}
	
	setData(d){
		this.setState({
			details: d
		});
	}
	
	render() {
		let me = this;
		let details=me.state.details;
		
		return(
			<div className={'jcbg'}>
				<div className={'jcbg-left'}>
					<table style={{width:'1450px'}}>
						<thead>
						</thead>
						<tbody>
							<tr>
								<td className={'bgColor'}>产品名称：</td>
								<td>{details.smallVariety}</td>
								<td className={'bgColor'}>样品编号：</td>
								<td>{details.productBatch}</td>
							</tr>
							<tr>
								<td className={'bgColor'}>产品检测日期：</td>
								<td>{details.dateTime}</td>
								<td className={'bgColor'}>包装形式：</td>
								<td>--</td>
							</tr>
							<tr>
								<td className={'bgColor'}>受检单位：</td>
								<td>{details.testingOrgName}</td>
								<td className={'bgColor'}>检验类别：</td>
								<td>{details.testingType}</td>
							</tr>
							<tr>
								<td className={'bgColor'}>抽样地点：</td>
								<td>--</td>
								<td className={'bgColor'}>送样日期：</td>
								<td>{details.dateTime}</td>
							</tr>
							<tr>
								<td className={'bgColor'}>样品数量：</td>
								<td>--</td>
								<td className={'bgColor'}>送样人：</td>
								<td>{details.testingOrgName}</td>
							</tr>
							<tr>
								<td className={'bgColor'}>抽样基数：</td>
								<td>--</td>
								<td className={'bgColor'}>检验依据：</td>
								<td>--</td>
							</tr>
							<tr>
								<td className={'bgColor'} style={{height:'200px'}}>检验结果：</td>
								<td>样品抑制率{details.inhibitionRate}<br/>本检验品仅对此检验品负责</td>
								<td className={'bgColor'}>签发日期：</td>
								<td>{details.dateTime}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Jcbg
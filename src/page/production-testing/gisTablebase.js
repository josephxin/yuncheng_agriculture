/**
 * Created by joseph_xin on 2019-8-29.
 */
import React from 'react';
import './css/gisTable.scss';

class gisTableBase extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tbodys: [],
			active: -1, //列表-默认不选中
		}
		this.gisListWrap = {
			right: props.right || "0px",
			left: props.left || "0px",
			top: props.top || "0px",
			width: props.width || "auto",
		}
	}
	setData(data) {
		//console.log(data)
		if(data) {
			this.setState({
				tbodys: data
			});
		}
	}
	openDetails(item, index) {
		if(typeof this.props.openBaseDetails === 'function') {
			this.props.openBaseDetails(item);
			this.setState({
				active: index
			});
		}
	}
	initActive() {
		this.setState({
			active: -1
		});
	}
	
	render() {
		let tbodys = this.state.tbodys;
		let active = this.state.active;
		return(
			<div>
          <div className={"gis-list-wrap2 productionTestingGisTable"} style={this.gisListWrap}>
                <table className={"diy-table"} style={{marginTop:'10px'}}>
                 	<thead>
                     <tr className={"diy-table-head"}>
                       <th style={{width: '180px'}}><span>基地编号</span></th>
                       <th><span>基地名</span></th>   
                       <th><span>地址</span></th>
                     </tr>
                   </thead>
                   <tbody>
                   	{
                       tbodys.map((item, i) => {
                         return (
                           <tr style={{cursor:'pointer'}} onClick={this.openDetails.bind(this, item, i)} className={`diy-table-body ${active==i?'diy-active':''}`} key={i}>
                             <td><span className={'overflow-ellipsis'} title={item.number}>{item.number}</span></td>              
                             <td><span className={'overflow-ellipsis'} title={item.baseName}>{item.baseName}</span></td>
                             <td><span className={'overflow-ellipsis'} title={item.address}>{item.address}</span></td>
                           </tr>
                         )
                       })
                     }
                   </tbody>
                </table>
           </div>
       </div>
		)
	}
}

export default gisTableBase;
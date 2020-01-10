/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './table.css';

class Table extends React.Component {
	constructor(props) {
		super();
		this.state = {
			thead: [],
			tbody: [],
			active: -1
		}
	}
	initActive() {
		this.setState({
			active: -1
		});
	}
	setData(obj) {
		//console.log(obj);
		this.setState({
			thead: obj.thead || [],
			tbody: obj.tbody || []
		})
	}
	initTd(item, key) {
		return(<td key={key} style={{cursor: 'pointer'}}><span title={item} style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item}</span></td>)
	}
	trClick(key, callBack) {
		if(callBack) {
			this.setState({
				active: key
			});
			callBack();
		}
	}
	render() {
		let thead = this.state.thead,
			tbody = this.state.tbody;
		let marginTop = this.props.marginTop || 0;

		return(
			<div className={'diy-table-wrap'}  style={{marginTop: marginTop}}>
		    <table className={"diy-table"}>
				  <colgroup>
					  {
						  thead.map((item, index) => {
								return (<col style={item.style} key={index}></col>);
						  })
						}
				  </colgroup>
		      <thead>
		        <tr className={"diy-table-head"}>
		          {
		            thead.map((item, index) => {
		              return (<th key={index}><span>{item.text || item}</span></th>)
		            })
		          }
		        </tr>
		      </thead>
		    </table>
	      <div style={{height:this.props.tbodyHeight || '',overflow: 'hidden' ,overflowY:'auto'}}>
	        <table className={"diy-table"}>
						<colgroup>
							{
		            thead.map((item, index) => {
		              return (<col style={item.style} key={index}></col>);
		            })
		          }
						</colgroup>
	          <tbody>
	          	{
	              (tbody&&tbody.length>0) ? tbody.map((item, i) => {
									let tdArr = item.td;
	                return (
	                  <tr className={`diy-table-body ${this.state.active === i ? 'diy-active' : ''}`} style={item.style} onClick={this.trClick.bind(this, i, item.trClick)} key={i}>
	                    {
	                      thead.map((text, j) => {
	                        return this.initTd(tdArr[j],j);
	                      })
	                    }
	                  </tr>
	                )
	              }) : <tr className={"not_data2"}><td colSpan={thead.length}><span>暂无数据……</span></td></tr>
	            }
	          </tbody>
	        </table>
	      </div>
    	</div>
		)
	}
}

export default Table
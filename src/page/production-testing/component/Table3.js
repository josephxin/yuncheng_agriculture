/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './table.css';

class Table extends React.Component {
  constructor(props) {
    super();
    this.state={
    	thead: [],
    	tbody: [],
			src: '',
			detailsArr:[]
    };
  }
  render() {
    let thead = this.state.thead,
			tbody = this.state.tbody,
			src = this.state.src;
			//console.log(tbody)
		let marginTop=this.props.marginTop || 0;
		let myIndex = ((this.props.pageNum-1) * this.props.pageSize)

    return (
    	<div className={'diy-table-wrap'} style={{marginTop: marginTop}}>
		    <div style={{height:this.props.tbodyHeight || '', overflow:'hidden'}}>
		    	<table className={"diy-table"}>
					<colgroup>
							<col width="10"></col>
							<col width="50"></col>
							<col width="10"></col>
						</colgroup>
			    	<thead>
			        <tr className={"diy-hide diy-table-head"}>
			          {
			            thead.map((item, index) => {
			              return (<th key={index}><span style={{height:'40px',lineHeight:'40px',textAlign:'left'}}>{item}</span></th>)
			            })
			          }
			        </tr>
			      </thead>
			      <tbody>
			      	{
			          tbody.map((item, i) => {
			            return (
			              <tr className={"diy-table-body"} key={i}>
			                {
			                  item.map((t, j) => {
			                    return (
			                      <td key={j}><span style={{textAlign:'left'}} title={t} className={t=='不合格'?'red':''}>{t}</span></td>
			                    )
			                  })
			                }
			                <td style={{ display:this.props.srcDisplay }} key={'btn'}><img src={src} style={{cursor: 'pointer'}} onClick={this.putDetails.bind(this,this.state.detailsArr[i])}></img></td>
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
	putDetails(data){
		this.props.getDetailsNum(data);
	}
  setData(d) {
		//console.log(d);
		this.setState({ ...d })
	}
}

export default Table

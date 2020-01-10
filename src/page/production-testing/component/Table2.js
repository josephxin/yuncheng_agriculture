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
    };
  }
  render() {
    let thead = this.state.thead,
      tbody = this.state.tbody,
      src = this.state.src;
    let marginTop=this.props.marginTop || 0;

    return (
    	<div className={'diy-table-wrap'} style={{marginTop: marginTop}}>
		    {/* <table className={"diy-table"}>
		    	<thead>
		        <tr className={"diy-table-head"}>
		          {
		            thead.map((item, index) => {
		              return (<th key={index}><span>{item}</span></th>)
		            })
		          }
		        </tr>
		      </thead>
		      <tbody>
		      	{
		          tbody.map((item, i) => {
		            return (
		              <tr className={"diy-hide"} key={i}>
		                {
		                  item.map((t, j) => {
		                    return (
		                      <td key={j}><span className={t=='不合格'?'red':''}>{t}</span></td>
		                    )
		                  })
		                }
		                <td key={'btn'}><img src={src} style={{cursor: 'pointer', display: 'none'}} onClick={this.props.click}></img></td>
		              </tr>
		            )
		          })
		        }
		      </tbody>
		    </table> */}
		    <div style={{height:this.props.tbodyHeight || '', overflow:'hidden'}}>
		    	<table className={"diy-table"}>
			    	<thead>
			        <tr className={"diy-hide diy-table-head"}>
			          {
			            thead.map((item, index) => {
			              return (<th key={index}><span style={{height:'40px',lineHeight:'40px'}}>{item}</span></th>)
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
			                      <td key={j}><span title={t} className={t=='不合格'?'red':''}>{t}</span></td>
			                    )
			                  })
			                }
			                <td style={{ display:this.props.srcDisplay }} key={'btn'}><img src={src} style={{cursor: 'pointer'}} onClick={this.props.click}></img></td>
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
  setData(d) {
		//console.log(d);
		this.setState({ ...d })
	}
}

export default Table

/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './table.css';

class Table4 extends React.Component {
	constructor(props) {
		super();
		this.state = {
			thead: [],
			tbody: [],
			width: [],
			src: '',
		};
	}
	render() {
		let thead = this.state.thead,
			tbody = this.state.tbody,
			width = this.state.width,
			src = this.state.src;
		let marginTop = this.props.marginTop || 0;
		let needThead = [];
		if(src) {
			needThead = thead.slice(0, thead.length - 1);
		} else {
			needThead = thead;
		}

		return(
			<div className={'diy-table-wrap'} style={{marginTop: marginTop}}>
		    <table className={"diy-table"}>
			    <colgroup>
					  {
						  thead.map((item, index) => {
								return (<col style={{width: width[index]}} key={index}></col>);
						  })
						}
				  </colgroup>
		    	<thead>
		        <tr className={"diy-table-head"}>
		          {
		            thead.map((item, index) => {
		              return (<th key={index}><span>{item}</span></th>)
		            })
		          }
		        </tr>
		      </thead>
		    </table>
		    <div className={'table-overflow'} style={{height:this.props.tbodyHeight || ''}}>
		    	<table className={"diy-table"}>
			    	<colgroup>
							{
                thead.map((item, index) => {
                  return (<col style={{width: width[index]}} key={index}></col>);
                })
              }
						</colgroup>
			      <tbody>
			      	{
			          (tbody&&tbody.length>0) ? tbody.map((item, i) => {
			            return (
			              <tr className={"diy-table-body"} key={i}>
			                {
			                  needThead.map((t, j) => {
			                  	let name = item[j];
			                    return (
			                      <td key={j} onClick={this.onClick.bind(this, item[item.length-1])}><span className={name=='不合格' ? 'red' : name=='短缺' ? 'red' : name=='充裕' ? 'green' : ''}>{name}</span></td>
			                    )
			                  })
			                }
			                {
			                	src ? (<td key={'btn'}><span><img src={src} style={{cursor: 'pointer', verticalAlign: 'middle', minWidth: 16}} onClick={this.onClick.bind(this, item[item.length-1])}></img></span></td>) : null
			                }
			              </tr>
			            )
			          }) : <tr className={"not_data"}><td colSpan={thead.length}><span>暂无数据……</span></td></tr>
			        }
			      </tbody>
			    </table>
		    </div>
		  </div>
		)
	}
	onClick(id) {
		//console.log('销售ID', id);
		if(typeof this.props.click == 'function') {
			//this.props.click(id);
		}
	}
	setData(d) {
		//console.log(d);
		this.setState({ ...d
		})
	}
}

export default Table4
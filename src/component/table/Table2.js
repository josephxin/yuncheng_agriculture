/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import { Pagination } from 'antd';
import './table2.css';

class Table2 extends React.Component {
	constructor(props) {
		super();
		this.state = {
			thead: [],
			tbody: [],
			width: [],
			src: '',
			pageNum: 1,
			pageSize: 10,
			totalCount: 0,
		};
		this.isShowPage = props.isShowPage || 'block';
	}
	render() {
		let thead = this.state.thead,
			tbody = this.state.tbody,
			width = this.state.width,
			src = this.state.src,
			pageNum = this.state.pageNum,
			pageSize = this.state.pageSize,
			totalCount = this.state.totalCount;
		let marginTop = this.props.marginTop || 0;
		let needThead = [];
		if(src) {
			needThead = thead.slice(0, thead.length - 1);
		} else {
			needThead = thead;
		}

		return(
			<div className={'diy-table-wrap2'} style={{marginTop: marginTop}}>
		    <table className={"diy-table2"}>
			    <colgroup>
					  {
						  thead.map((item, index) => {
								return (<col style={{width: width[index]}} key={index}></col>);
						  })
						}
				  </colgroup>
		    	<thead>
		        <tr className={"diy-table-head2"}>
		          {
		            thead.map((item, index) => {
		              return (<th key={index}><span>{item}</span></th>)
		            })
		          }
		        </tr>
		      </thead>
		    </table>
		    <div className={'table-overflow2'} style={{height:this.props.tbodyHeight || ''}}>
		    	<table className={"diy-table2"}>
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
			              <tr className={"diy-table-body2"} key={i}>
			                {
			                  needThead.map((t, j) => {
			                  	let name = item[j];
			                    return (
			                      <td key={j}><span className={name=='不合格' ? 'red' : name=='短缺' ? 'red' : name=='充裕' ? 'green' : ''}>{name}</span></td>
			                    )
			                  })
			                }
			                {
			                	src ? (<td key={'btn'}><span><img src={src} style={{cursor: 'pointer', verticalAlign: 'middle', minWidth: 16}} onClick={this.onClick.bind(this, item[item.length-1])}></img></span></td>) : null
			                }
			              </tr>
			            )
			          }) : <tr className={"not_data2"}><td colSpan={thead.length}><span>暂无数据……</span></td></tr>
			        }
			      </tbody>
			    </table>
		    </div>
		    <Pagination style={{display: this.isShowPage}} className={'diy-pagination2'} showQuickJumper current={pageNum} pageSize={pageSize} total={totalCount} onChange={this.onChange.bind(this)} />
		  </div>
		)
	}
	onClick(id) {
		//console.log(id);
		this.props.click(id);
	}
	onChange(page) {
		//console.log(page);
		this.setState({
			pageNum: page
		});
		if(typeof(this.props.getData) == "function") {
			this.props.getData(page);
		}
	}
	setData(d) {
		//console.log(d);
		let pagination = d.pagination;
		if(pagination && (pagination instanceof Object) && JSON.stringify(pagination) != '{}') {
			this.setState({
				pageNum: pagination.pageNum,
				pageSize: pagination.pageSize,
				totalCount: pagination.totalCount
			})
		}
		this.setState({
			thead: d.thead,
			tbody: d.tbody,
			width: d.width,
			src: d.src,
		})
	}
}

export default Table2
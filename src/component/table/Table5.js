/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import { Pagination } from 'antd';
import './table2.css';

class Table5 extends React.Component {
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
			active: -1, //列表-默认不选中
		};
	}
	render() {
		let thead = this.state.thead,
			tbody = this.state.tbody,
			width = this.state.width,
			src = this.state.src,
			pageNum = this.state.pageNum,
			pageSize = this.state.pageSize,
			totalCount = this.state.totalCount,
			active = this.state.active;
		//console.log(tbody);
		let marginTop = this.props.marginTop || 0;
		let simple = this.props.simple;
		let needThead = [];
		if(src) {
			needThead = thead.slice(0, thead.length - 1);
		} else {
			needThead = thead;
		}
		//console.log(needThead, tbody);
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
			              <tr className={`diy-table-body2 ${active==i?'diy-active':''}`} key={i}>
			                {
			                  needThead.map((t, j) => {
			                  	let name = item[j];
			                    return (
			                      <td key={j} onClick={this.onClick.bind(this, item[item.length-3], item[item.length-2], item[item.length-1], i)} title={name} style={{cursor: 'pointer'}}><span className="diy-table-overflow">{name}</span></td>
			                    )
			                  })
			                }
			                {
			                	src ? (<td key={'btn'}><span><img src={src} style={{verticalAlign: 'middle', minWidth: 16}}></img></span></td>) : null
			                }
			              </tr>
			            )
			          }) : <tr className={"not_data2"}><td colSpan={thead.length}><span>暂无数据……</span></td></tr>
			        }
			      </tbody>
			    </table>
		    </div>
		    <Pagination className={'diy-pagination2'} simple={simple} showQuickJumper current={pageNum} pageSize={pageSize} total={totalCount} hideOnSinglePage={true} onChange={this.onChange.bind(this)} />
		  </div>
		)
	}

	initActive() {
		this.setState({
			active: -1
		});
	}
	onClick(lng, lat, id, index) {
		//console.log(id, this.props.isClick);
		if(this.props.isClick) {
			this.props.click(id, lng, lat);
			if(this.state.active == index) {
				this.initActive();
			} else {
				this.setState({
					active: index
				});
			}
		}
	}
	onChange(page) {
		//console.log(page);
		this.setState({
			pageNum: page,
			active: -1
		});
		if(typeof(this.props.getData) == "function") {
			this.props.getData(page);
		}
	}
	setData(d) {
		//console.log(d);
		let pagination = d.pagination;
		if(pagination && (pagination.constructor == Object) && JSON.stringify(pagination) != '{}') {
			let pageNum = pagination.pageNum;
			let pageSize = pagination.pageSize;
			let totalCount = pagination.totalCount;
			if(pageNum) {
				this.setState({
					pageNum: pageNum,
				})
			}
			if(pageSize) {
				this.setState({
					pageSize: pageSize,
				})
			}
			if(totalCount != undefined) {
				this.setState({
					totalCount: totalCount
				})
			}
		}
		if(d.thead) {
			this.setState({
				thead: d.thead,
			})
		}
		if(d.tbody) {
			this.setState({
				tbody: d.tbody,
			})
		}
		if(d.width) {
			this.setState({
				width: d.width,
			})
		}
		if(d.src) {
			this.setState({
				src: d.src,
			})
		}
	}
}

export default Table5;
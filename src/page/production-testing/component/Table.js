/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './table.css';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: [],
			tbodys: [],
			active:null,
			isLineFeed:false,
			pageNum: 1,
			pageSize: 10
		}
	}
	setData(obj) {
		console.log(obj);
		this.setState({
			thead: obj.thead || [],
			tbodys: obj.tbody || [],
			isLineFeed:obj.isLineFeed,
			pageNum: obj.pageNum,
			pageSize: obj.pageSize
		})
	}
	initTd(item,key,num,i){
      if ( typeof item == 'object') {
        return (<td key={key} style={item.style} onClick={item.tdClick}><span title={item.text}>{item.text}</span></td>)
			}
			if(this.state.thead[0]=="序号"&&key==0){
				return (<td style={{width:'10%'}} key={key}><span title={key}>{num + (i + 1)}</span></td>)
			}
      return (<td  key={key}><span title={item}>{item}</span></td>)
    }
	trClick(key,callBack){
		if (callBack) {
			this.setState({
				active:key
			});
			callBack();
		}
	}
	render() {
		let thead = this.state.thead,
			tbodys = this.state.tbodys;
			
		let marginTop = this.props.marginTop || 0;
		let isRoll = this.props.isRoll||false;
		let num = (this.state.pageNum-1)*this.state.pageSize;
		return(
			<div className={'diy-table-wrap'}  style={{marginTop: marginTop}}>
			{/* {
				tbodys.map((item, index) => {
					return (<code>{item}</code>)
				})
			} */}
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
									if(item=="序号"&&index==0){
										return (<th style={{width:'10%'}} key={index}><span>{item.text || item}</span></th>)
									}
		              return (<th key={index}><span>{item.text || item}</span></th>)
		            })
		          }
		        </tr>
		      </thead>
		    </table>
	      <div style={isRoll?{overflow:'scroll',height:this.props.isRollTableHeight||'150px'}:{height:this.props.tbodyHeight || '',overflow: 'hidden' ,overflowY:'auto'}}>
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
		              tbodys.map((item, i) => {
										let tdArr = item.td || item;
		                return (
		                  <tr className={`diy-table-body ${this.state.active === i ? 'diy-active' : ''} ${this.state.isLineFeed?'lineFeed':''}`} style={item.style} onClick={this.trClick.bind(this,i,item.trClick)} key={i}>
		                    {
		                      thead.map((text, j) => {
		                        return this.initTd(tdArr[j],j,num,i);
		                      })
		                    }
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

export default Table

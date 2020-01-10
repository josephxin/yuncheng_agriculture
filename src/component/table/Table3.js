/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './table.css';

class Table extends React.Component {
    constructor(props) {
        super();
    }
    initTd(item,key){
      if ( typeof item == 'object') {
        return (<td key={key} style={item.style}><span onClick={item.tdClick}>{item.text}</span></td>)
      }
      return (<td  key={key}><span>{item}</span></td>)
    }
  render() {
    let thead = this.props.data.thead,
      tbodys = this.props.data.tbody;
    let marginTop=this.props.marginTop || 0;
    //console.log(tbodys);
    return (
      <table className={"diy-table"} style={{marginTop: marginTop}}>
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
            tbodys.map((item, i) => {
              return (
                <tr className={"diy-table-body"} key={i}>
                  {
                    thead.map((text, j) => {
                        return this.initTd(item[j],j);
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

export default Table

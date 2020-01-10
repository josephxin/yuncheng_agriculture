import React from 'react';
import './css/source.scss'
export default class QualitySafe extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        sourceObj:{
            goodsName:'',
            list:[]
        }
    }
  }
  setData(obj){
      this.setState({
          sourceObj:obj
      })
  }
  render(){
      let sourceObj = this.state.sourceObj;
    return(
      <div className={'source-box'}>
        <span className={'source-wrap goods-name'}>{sourceObj.goodsName}</span>
        {
            sourceObj.list.map((item,i)=>{
                return (
                    <div className={`w-item w-${i+1}`} key={i+1}>
                        <span className={'source-wrap'}>{item.baseName}</span>
                        <div className={'greenhouses'}>
                            {
                                item.list.map((node,j)=>{
                                    if (item.list.length == 1) {
                                        return (
                                            <span className={'greenhouses-item only'} key={j+1}>{node.appendantName}</span>
                                        )
                                    }
                                    return (
                                        <span className={'greenhouses-item'} key={j+1}>{node.appendantName}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
      </div>
    )
  }

  componentDidMount(){

  }
}

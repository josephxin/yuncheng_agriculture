import React from 'react';

import './turnRoll.css';
import wxlb from './img/wxlb.png';
import clxg from './img/clxg.png';
import jsbl from './img/jsbl.png';
import qzyg from './img/qzyg.png';
import cydj from './img/cydj.png';
import ghqc from './img/ghqc.png';

class TrunRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dataList:[
        // {name:'潍县萝卜',id:1},
        // {name:'昌乐西瓜',id:2},
        // {name:'昌邑大姜',id:3},
        // {name:'桂河芹菜',id:4},
        // {name:'九山板栗',id:5},
        // {name:'青州银瓜',id:6}
        {name:' ',id:1},
        {name:' ',id:2},
        {name:' ',id:3},
        {name:' ',id:4},
        {name:' ',id:5},
        {name:' ',id:6}
      ],
      iconArr:[wxlb,clxg,cydj,ghqc,jsbl,qzyg]
    };
    this.classArr = ['left', 'center', 'right', 'right-rear', 'center-rear', 'left-rear'];
  }
  render() {
    return (
      <div style={{ position: 'absolute', left: 0, top: 80 }}>
        {this.changeClassList()}
      </div>
    )
  }
  
  handleClick(name,id) {
    console.log(name,id);
	  this.props.ProductsInfo(name,id);
  }
  
  changeClassList() {
    let classArr = this.classArr;
    let index = this.state.index;
    index %= 6;
    return (
      <ul className={'rollList'} ref={'formList'} >
        {
          classArr.map((t, i) => {
            let num = i - index;
            if (num === -1) {
              num = 5;
            } else if (num === -2) {
              num = 4;
            } else if (num === -3) {
              num = 3;
            }
            else if (num === -4) {
              num = 2;
            }
            else if (num === -5) {
              num = 1;
            }
            return <li style={{background: 'url(' +  this.state.iconArr[i] + ') no-repeat center center', cursor: 'pointer'}} onClick={() => this.handleClick(this.state.dataList[i].name,this.state.dataList[i].id)} className={classArr[num]} key={i} >
              <span style={{
                fontSize: 18,
                color: '#fff',
                display: 'block',
                marginTop: 93,
              }}>{this.state.dataList[i].name}</span>
            </li>
          })
        }
      </ul>
    )
  }
  componentDidMount() {
    const me = this;
    let index = this.state.index;
    me.timer = setInterval(() => {
      index += 1;
      me.setState({
        index
      });
    }, 2000)

  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}


export default TrunRoll;
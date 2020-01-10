/**
 * Created by admin on 2019/11/28.
 */
import React from 'react';
import './ulList.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ulList: []
    }
  }

  componentDidMount() {
    let box = this.refs.listBox;
    let oneList = this.refs.list1;
    let twoList = this.refs.list2;
    // twoList.innerHTML = oneList.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
    let i = 0;

    function scrollup() {
      if (i >= oneList.offsetHeight) { //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
        i = 0;
      } else {
        i++;
        box.scrollTop = i;
      }
    }

    let scrollMove = setInterval(scrollup, 30);//数值越大，滚动速度越慢
    // 鼠标经过时，滚动停止
    box.onmouseover = function () {
      clearInterval(scrollMove)
    };
    // 鼠标离开时，滚动继续
    box.onmouseout = function () {
      scrollMove = setInterval(scrollup, 30);
    };
  }

  setData(d) {
    this.setState({...d});
  }

  render() {
    let me = this;
    return (
      <div ref={'listBox'} style={{
        position: 'absolute',
        width: this.props.width || 460,
        height: this.props.height || 298,
        left: this.props.left || 0,
        top: this.props.top || 0,
        backgroundSize: '100% 100%'
      }} className="listBoxs listOnes">
        <ul ref={'list1'}>
          {
            this.state.ulList.map((t, i) => {
              return <li key={i}><a>{i + 1}</a><a>{t.name}</a><a>{t.address}</a></li>
            })
          }
        </ul>
        <ul ref={'list2'}>
          {
            this.state.ulList.length>=5?
            this.state.ulList.map((t, i) => {
              return <li key={i}><a>{i + 1}</a><a>{t.name}</a><a>{t.address}</a></li>
            }): null
          }
        </ul>
      </div>
    )
  }
}


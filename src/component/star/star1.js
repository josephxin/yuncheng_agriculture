import React from 'react';
import './star.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
        // {name:'昌乐科技有限公司',star:100},
        // {name:'新民有限公司',star:90},
        // {name:'奎文信息科技有限公司',star:80},
        // {name:'盛大网络发展有限公司',star:70},
        // {name:'云商有限公司',star:60},
    		// {name:'艾玛科技有限公司',star:50},
    		// {name:'完美世界有限公司',star:40}
      ]
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
    box.onmouseover = function () {// 鼠标经过时，滚动停止
      clearInterval(scrollMove)
    };
    box.onmouseout = function () { // 鼠标离开时，滚动继续
      scrollMove = setInterval(scrollup, 30);
    }
  }
  setData(d) {
		this.setState({ ...d });
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
      }} className="listBox">
        <ul  ref={'list1'}>
          {
            this.state.data.map((t,i)=>{
              return <li className="item" key={'zhy'+i}><a style={{width:'70%'}} title={t.name}>{t.name}</a><a style={{width:'0%'}}>{t.add}</a><a style={{width:'0%'}}>{t.street}</a><a><span style={{width:`${t.star}`+'%',position:'absolute',left:0}}></span></a></li>
            })
          }
        </ul>
        <ul ref={'list2'}>
          {
            this.state.data.map((t,i)=>{
              return <li className="item" key={'zhy'+i}><a style={{width:'70%'}} title={t.name}>{t.name}</a><a style={{width:'0%'}}>{t.add}</a><a style={{width:'0%'}}>{t.street}</a><a><span style={{width:`${t.star}`+'%',position:'absolute',left:0}}></span></a></li>
            })
          }
        </ul>
      </div>
    )
  }
}


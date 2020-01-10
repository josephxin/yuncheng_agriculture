import React from 'react';
import './star.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        // {name: '张山杳', add: '寿光市', street: '西马家村马泽路南', star: 100},
        // {name: '张瑞珍', add: '寒亭区', street: '营子小区沿街房31号', star: 90},
        // {name: '李春香', add: '高密市', street: '寨子村中心大街以北', star: 80},
        // {name: '刘洪国', add: '安丘市', street: '中心街东路南', star: 70},
        // {name: '李英群', add: '昌邑市', street: '双王城牛头五村', star: 60},
        // {name: '王淑敏', add: '寿光市', street: '西稻田', star: 50},
        // {name: '桑星义', add: '昌邑市', street: '桑家村', star: 40}
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
    // 鼠标经过时，滚动停止
    box.onmouseover = function () {
      clearInterval(scrollMove)
    };
    // 鼠标离开时，滚动继续
    box.onmouseout = function () {
      scrollMove = setInterval(scrollup, 30);
    }
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
      }} className="listBox listOne">
        <ul ref={'list1'} >
          {
            this.state.data.map((t, i) => {
              return <li key={'zhy' + i}><a>{t.name}</a><a>{t.add}</a><a>{t.street}</a><a><span
                style={{width: `${t.star}` + '%', position: 'absolute', left: 0}}></span></a></li>
            })
          }
        </ul>
        <ul ref={'list2'}>
          {
            this.state.data.map((t, i) => {
              return <li key={'zhy' + i}><a>{t.name}</a><a>{t.add}</a><a>{t.street}</a><a><span
                style={{width: `${t.star}` + '%', position: 'absolute', left: 0}}></span></a></li>
            })
          }
        </ul>
      </div>
    )
  }
}


import React from 'react';
import './circulationTracing.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
        // {name: '张山杳', product: '寿光市', price: '西马家村马泽路南', time: 100},
        // {name: '张瑞珍', product: '寒亭区', price: '营子小区沿街房31号', time: 90},
        // {name: '李春香', product: '高密市', price: '寨子村中心大街以北', time: 80},
        // {name: '刘洪国', product: '安丘市', price: '中心街东路南', time: 70},
        // {name: '李英群', product: '昌邑市', price: '双王城牛头五村', time: 60},
        // {name: '王淑敏', product: '寿光市', price: '西稻田', time: 50},
        // {name: '桑星义', product: '昌邑市', price: '桑家村', time: 40}
      ]
    };
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
    <div className="cirTable">
      <ol className="listCon1">
        <li>批发市场名称</li>
        <li>交易产品</li>
        <li>交易价格</li>
        <li>交易时间</li>
      </ol>

      <div ref={'listBox'} style={{
        position: 'absolute',
        width: this.props.width || 460,
        height: this.props.height || 298,
        left: this.props.left || 0,
        top: this.props.top || 0,
        backgroundSize: '100% 100%'
      }} className="listBox">
        <ul ref={'list1'} className="list1">
          { this.state.dataList.length>0?
            this.state.dataList.map((t, i) => {
              return <li key={i}><a title={t.name}>{t.name}</a><a>{t.product}</a><a>{t.price}</a><a>{t.time}</a></li>}):<li className="noList">暂无数据</li>
          }
        </ul>
        <ul ref={'list2'} className="list1">
          {
            this.state.dataList.map((t, i) => {
            return <li key={i}><a title={t.name}>{t.name}</a><a>{t.product}</a><a>{t.price}</a><a>{t.time}</a></li>})
          }
        </ul>
      </div>
    </div>
    )
  }
}


/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import '../scjc-greenhouseDetails/greenhouseDetails.scss'
import Dialog from '../../component/dialog/Dialog';
import timeBar from '../scjc-greenhouseDetails/img/time-bar.png';
import play from '../scjc-greenhouseDetails/img/play.png'
import { scaleLinear } from 'd3';

//生命周期默认图
import sowPng from '../scjc-greenhouseDetails/img/sow.png';
import sproutPng from '../scjc-greenhouseDetails/img/sprout.png';
import seedlPng from '../scjc-greenhouseDetails/img/seedl.png';
import bloomPng from '../scjc-greenhouseDetails/img/bloom.png';
import resultPng from '../scjc-greenhouseDetails/img/result.png';
import platform from '../scjc-greenhouseDetails/img/platform.png';

//生命周期hover图
import sowPngNow from '../scjc-greenhouseDetails/img/nowSow.png';
import sproutPngNow from '../scjc-greenhouseDetails/img/nowSprout.png';
import seedlPngNow from '../scjc-greenhouseDetails/img/nowSeedl.png';
import bloomPngNow from '../scjc-greenhouseDetails/img/nowBloom.png';
import resultPngNow from '../scjc-greenhouseDetails/img/nowResult.png';
import nowPlatform from '../scjc-greenhouseDetails/img/nowPlatform.png';

//gif动态图
import sowGif from '../scjc-greenhouseDetails/img/sow.gif';
import sproutGif from '../scjc-greenhouseDetails/img/sprout.gif';
import seedlGif from '../scjc-greenhouseDetails/img/seedl.gif';
import bloomGif from '../scjc-greenhouseDetails/img/bloom.gif';
import resultGif from '../scjc-greenhouseDetails/img/result.gif';

import tmgy from '../scjc-greenhouseDetails/img/tmgy.png';
/*引入下拉选择框*/
import Select from '../select/Select';
/*引入antd框架*/
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this._titleL = props.title.length;
    this.state = {
      display: 'none',
      index:0,
      lock:true,
    };
    this.clickBig = this.clickBig.bind(this);

    this.scale = scaleLinear().domain([0, 5]).range([0, 1340]);
    
  }

  clickBig() {
    if(typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }

  _titleL = undefined; //title长度
  _close() {
    this.setState({
      display: 'none',
    });
    
  }
  showGLMDialog(title) {
  this.dialogGLMRef._open(title);
  }
  openWin(name) {
    this.refs[name]._open();
  }
  ltpxsRateBig(text){
    this.refs.wlwjcyjDialogRef._open(text);
  }
  dialogClose() {

  }
  createTime() {
    const data = ['播种','发芽期','幼苗期','开花坐果期','结果期'];
    const len = data.length;
    return [data[0], data[~~(len / 2)], data[len - 1]].map((s, i) => {
      return (
        <div key={'time' + i}>{s}</div>
      );
    });
  }
  move() {
    const me = this;
    let index = me.state.index;
    me.timer = setInterval(() => {
      index++;
      if (index > 5) {
        index = 0;
      }
      me.state.lock = true;
      me.setState({ index });
    }, 3000);
  }
  play(){
    //默认播放，点击暂停
    //暂停
    if(this.state.lock==true){
        this.state.lock = !this.state.lock;
        this.setState({
            lock: false
        })
        clearInterval(this.timer);
    }else{
        //开始
        this.state.lock = !this.state.lock;
        this.setState({
            lock: true
        })
        this.move();
    }    
  }
  divHover(who){
      document.getElementsByClassName('left'+who)[0].style.display = 'block';
  }
  divOut(who){
    document.getElementsByClassName('left'+who)[0].style.display = 'none';
  }
  componentDidMount(){
    const me = this;
     // me.dialogGLMRef._open('种植计算器');
     me.siteSelectRef5._setList(['品种', '树状列表'])
  }
  componentDidUpdate() {
    if (!this.state.lock) { return false; }
    const me = this;
    if (!me.timer) {
        me.move();
    }
    //console.log(me.state.index);
    switch(me.state.index){
        case 0:
            document.getElementsByClassName('imgDiv5')[0].firstChild.style.backgroundImage="url("+resultPng+")"+",url("+platform+")";
            document.getElementsByClassName('left5')[0].style.display="none";
        break;
        case 1:
            document.getElementsByClassName('imgDiv1')[0].firstChild.style.backgroundImage="url("+sowGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left1')[0].style.display="block";
        break;
        case 2:
            document.getElementsByClassName('imgDiv1')[0].firstChild.style.backgroundImage="url("+sowPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv2')[0].firstChild.style.backgroundImage="url("+sproutGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left1')[0].style.display="none";
            document.getElementsByClassName('left2')[0].style.display="block";
        break;
        case 3:
            document.getElementsByClassName('imgDiv2')[0].firstChild.style.backgroundImage="url("+sproutPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv3')[0].firstChild.style.backgroundImage="url("+seedlGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left2')[0].style.display="none";
            document.getElementsByClassName('left3')[0].style.display="block";
        break;
        case 4:
            document.getElementsByClassName('imgDiv3')[0].firstChild.style.backgroundImage="url("+seedlPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv4')[0].firstChild.style.backgroundImage="url("+bloomGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left3')[0].style.display="none";
            document.getElementsByClassName('left4')[0].style.display="block";
        break;
        case 5:
            document.getElementsByClassName('imgDiv4')[0].firstChild.style.backgroundImage="url("+bloomPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv5')[0].firstChild.style.backgroundImage="url("+resultGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left4')[0].style.display="none";
            document.getElementsByClassName('left5')[0].style.display="block";
        break;
    }
    
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  getStartTime(moment, t) {
    //console.log(moment, t);
    this.startTime = t;
  }
  siteSelectChange(e) {
    console.log(e);
  }
  render() {
    let me = this;
    let props = this.props;
    return(
    <div className="topGreenhouse">
    {/*XXX监测机构弹窗*/}
        <Dialog ref={ref => this.dialogGLMRef = ref} left={'-1220px'} top={'-1029px'}>
        <div style={{padding: '25px 74px 60px 74px'}}>
            <div className={'select-time'}>
              <Select ref={(ref) => {
                this.siteSelectRef5 = ref;
              }} onSelectChange={this.siteSelectChange.bind(this)}
              />
              <DatePicker style={{marginLeft:200}} locale={locale} placeholder={'播种时间'} onChange={this.getStartTime.bind(this)} />
              <a style={{
                width: '80px',
                height: '35px',
                lineHeight: '37px',
                display: 'inline-block',
                cursor: 'pointer',
                backgroundColor: 'rgb(1, 185, 198)',
                fontSize: '14px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '3px',
                marginLeft: '10px'
              }}>计算</a>
            </div>
       </div>
       <Panel title={'价格结果'} top={100} left={549} width={311} height={730}></Panel>
      <div className="cycleDiv">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line lineSpecial"></div>
                <div className="imgDiv imgDiv1"><div onMouseOut={this.divOut.bind(this,1)} onMouseOver={this.divHover.bind(this,1)}></div><span>播种</span></div>
                <div className="imgDiv imgDiv2"><div onMouseOut={this.divOut.bind(this,2)} onMouseOver={this.divHover.bind(this,2)}></div><span>发芽期</span></div>
                <div className="imgDiv imgDiv3"><div onMouseOut={this.divOut.bind(this,3)} onMouseOver={this.divHover.bind(this,3)}></div><span>幼苗期</span></div>
                <div className="imgDiv imgDiv4"><div onMouseOut={this.divOut.bind(this,4)} onMouseOver={this.divHover.bind(this,4)}></div><span className="specialText1">开花坐果期</span></div>
                <div className="imgDiv imgDiv5"><div onMouseOut={this.divOut.bind(this,5)} onMouseOver={this.divHover.bind(this,5)}></div><span>结果期</span></div>
                {/* 各个周期时间 */}
                <div className="cycleTime">
                    <p>5月3号</p>
                    <p>5月18号</p>
                    <p>6月18号</p>
                    <p>7月18号</p>
                    <p>8月18号</p>
                    <p>9月18号</p>
                </div>
            </div>
            {/* 进度条 */}
            <div className={'time-line'} style={{
                display: 'block',
                position: 'absolute',
                top: 535,
                left: 95,
                }}>
                <div className={'time-line-bottom'} style={{
                    width: 1340,
                    height: 10,
                    position: 'absolute',
                    border: '1px solid rgba(4,91,172,1)',
                    borderRadius: 10,
                    backgroundColor: 'rgba(4,91,172,.3)',
                }}>
                    {/* <div className={'time-line-bottom-xdata'} style={{
                    width: 1340,
                    height: 10,
                    color: '#bbf9ff',
                    fontSize: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: 15
                    }}>
                    {this.createTime()}
                    </div> */}
                </div>
                <div className={'time-line-top'} style={{
                    width: this.scale ? this.scale(this.state.index) : 0,
                    height: 10,
                    position: 'absolute',
                    border: '1px solid rgba(4,91,172,1)',
                    borderRadius: 10,
                    backgroundColor: 'rgba(10,138,255,1)'
                }}>
                    <img src={timeBar} alt={'time-bar'} style={{ position: 'absolute', right: -10, top: -9 }}/>
                </div>
            </div>
            {/* 播放 */}
            <img src={play} onClick={this.play.bind(this)} style={{ cursor:'pointer', position: 'absolute',right: '90px',bottom: '195px'}} title={"播放/暂停"}/>
            {/* 生命周期详情 */}
            <div className="detailExplain left1">
                <p className="cycleTitle">播种期</p>
                <p>施肥频次：10天，1000g/次</p>
                <p>交税频次：10天</p>
                <p>注意虫害预防</p>
                <p>注意干旱</p>
                <p>预估产量：3.9吨</p>
                <p>预估收入：2.54万元</p>
            </div>
            <div className="detailExplain left2">
                <p className="cycleTitle">发芽期</p>
                <p>施肥频次：10天，1000g/次</p>
                <p>交税频次：10天</p>
                <p>注意虫害预防</p>
                <p>注意干旱</p>
                <p>预估产量：3.9吨</p>
                <p>预估收入：2.54万元</p>
            </div>
            <div className="detailExplain left3">
                <p className="cycleTitle">幼苗期</p>
                <p>施肥频次：10天，1000g/次</p>
                <p>交税频次：10天</p>
                <p>注意虫害预防</p>
                <p>注意干旱</p>
                <p>预估产量：3.9吨</p>
                <p>预估收入：2.54万元</p>
            </div>
            <div className="detailExplain left4">
                <p className="cycleTitle">开花坐果期</p>
                <p>施肥频次：10天，1000g/次</p>
                <p>交税频次：10天</p>
                <p>注意虫害预防</p>
                <p>注意干旱</p>
                <p>预估产量：3.9吨</p>
                <p>预估收入：2.54万元</p>
            </div>
            <div className="detailExplain left5">
                <p className="cycleTitle">结果期</p>
                <p>施肥频次：10天，1000g/次</p>
                <p>交税频次：10天</p>
                <p>注意虫害预防</p>
                <p>注意干旱</p>
                <p>预估产量：3.9吨</p>
                <p>预估收入：2.54万元</p>
            </div>
        </Dialog>
    </div>
    )
  }
}

export default Panel

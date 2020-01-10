/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import './greenhouseDetails.scss'
import Dialog from '../../component/dialog/Dialog';
import WeixinPng2 from './weixin2.png';
import timeBar from './img/time-bar.png';
import SmallWindow from '../panel/SmallWindow';
import play from './img/play.png'
import { scaleLinear } from 'd3';
/**物联网监测*/
import LineSingle1 from './LineSingle';
import LineSingle2 from './LineSingle';
import LineSingle3 from './LineSingle';
import LineSingle4 from './LineSingle';
import LineSingle5 from './LineSingle';
import LineSingle6 from './LineSingle';

//生命周期默认图
//播种期不需要  育苗期代替播种期   幼苗期后面加抽蔓期
// import sowPng from './img/sow.png';
import sproutPng from './img/sprout.png';
import seedlPng from './img/seedl.png';
import pumpingVine from './img/pumpingVine.png';
import bloomPng from './img/bloom.png';
import resultPng from './img/result.png';
//底层平台
import platform from './img/platform.png';

//生命周期hover图
import sowPngNow from './img/nowSow.png';
import sproutPngNow from './img/nowSprout.png';
import seedlPngNow from './img/nowSeedl.png';
import bloomPngNow from './img/nowBloom.png';
import resultPngNow from './img/nowResult.png';
import nowPlatform from './img/nowPlatform.png';

//gif动态图
//import sowGif from './img/sow.gif';
import sproutGif from './img/sprout.gif';
import seedlGif from './img/seedl.gif';
import pumpingVineGif from './img/pumpingVine.gif';
import bloomGif from './img/bloom.gif';
import resultGif from './img/result.gif';

import Table from  '../../page/production-testing/component/Table'
import tmgy from './img/tmgy.png';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    //this._titleL = props.title.length;
    this.state = {
      display: 'none',
      index:0,
      lock:true,
      //大棚详情
      userNum:'100',
      phone:'13791684280',
      greenhouseNum:'368',
      greenhouseLength:'10*66',
      plantType:'丝瓜',
      name:'张春志',
      greenhouseType:'菜棚',
      greenhouseArea:'880.00',
      plantDate:'2018年9月10号',
      //土壤检测
      organicMatter:'1.13',
      phValue:'7',
      detectionTime:'2018-11-27',
      waterSalt:'204',
      heavyMetal:'153',
      detectionOrganiza:'衡立检测',
      //大图详情土壤检测
      totalnItrogen:'1.13',
      rapidlyVailable:'287',
      organophosphorus:'204',
      waterNitrogen:'153',
      soilTemperature:'25',
      soilHumidity:'50',
      //生命周期
      lifeCycleData:[
          {
            fertilizaNum:'120',
            waterNum:'300',
            mattersAttention:'防干旱',
            forecastOut:'3.9',
            forecastPut:'2.54'
          },
          {
            fertilizaNum:'100',
            waterNum:'70',
            mattersAttention:'防干旱',
            forecastOut:'1.2',
            forecastPut:'2.34'
          },
          {
            fertilizaNum:'400',
            waterNum:'105',
            mattersAttention:'防干旱',
            forecastOut:'10.9',
            forecastPut:'0.84'
          },
          {
            fertilizaNum:'560',
            waterNum:'80',
            mattersAttention:'防干旱',
            forecastOut:'3.99',
            forecastPut:'2.324'
          },
          {
            fertilizaNum:'54',
            waterNum:'876',
            mattersAttention:'防干旱',
            forecastOut:'1.9',
            forecastPut:'2.4'
          },  
      ],
      //物联网
      InternetOfThings:{
        dataTime:['0时', '3时', '6时', '9时', '12时', '15时', '18时', '21时', '24时'] ,
        airHumidity:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5],
        airTemperature:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5],
        carbonDioxide:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5],
        illuminationIntensity:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5],
        soilHumidity:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5],
        soilTemperature:[5.1, 3.8, 5.2, 4.1, 6, 5.3, 4, 4.9, 3.5, 5]
      },
      //空气检测数据
      airHumidityData:'50',
      airTemperatureData:'25',
      IntensityOfIlluminationData:'122',
      carbonDioxideData:'0.25'
    };
    /**物联网监测*/
/*	this.bigWtrateRef1 = React.createRef();
	this.bigWtrateRef2 = React.createRef();
	this.bigWtrateRef3 = React.createRef();
	this.bigWtrateRef4 = React.createRef();
	this.bigWtrateRef5 = React.createRef();
	this.bigWtrateRef6 = React.createRef();*/
    this.clickBig = this.clickBig.bind(this);

    this.scale = scaleLinear().domain([0, 5]).range([0, 1340]);
    
  }

  setData(d){
    this.setState(d)
  }
  clickBig() {
    if(typeof this.props.onClick === 'function') {
      this.props.onClick();
      //console.log(this.props.title);
    }
  }

  //_titleL = undefined; //title长度
  _close() {
    // if (typeof this.props.closeWin == 'function') {
    //   this.props.closeWin();
    // }
    // if(this.props.display=="block"){
    //     this.props.display="none"
    // }
    this.setState({
      display: 'none',
    });
    
  }
  showGLMDialog(title) {
	
  //this.dialogGLMRef._open(title);
  }
  openWin(name) {
    this.refs[name]._open();
  }
  ltpxsRateBig(text){
   // this.refs.wlwjcyjDialogRef._open(text);
  }
  dialogClose() {

  }
  createTime() {
    const data = ['育苗期','幼苗期','抽蔓期','开花坐果期','结果期'];
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
  }
  componentDidUpdate() {
    if (!this.state.lock) { return false; }
    const me = this;
    if (!me.timer) {
        me.move();
    }
    switch(me.state.index){
        case 0:
            document.getElementsByClassName('imgDiv5')[0].firstChild.style.backgroundImage="url("+resultPng+")"+",url("+platform+")";
            document.getElementsByClassName('left5')[0].style.display="none";
        break;
        case 1:
            document.getElementsByClassName('imgDiv1')[0].firstChild.style.backgroundImage="url("+sproutGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left1')[0].style.display="block";
        break;
        case 2:
            document.getElementsByClassName('imgDiv1')[0].firstChild.style.backgroundImage="url("+sproutPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv2')[0].firstChild.style.backgroundImage="url("+seedlGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left1')[0].style.display="none";
            document.getElementsByClassName('left2')[0].style.display="block";
        break;
        case 3:
            document.getElementsByClassName('imgDiv2')[0].firstChild.style.backgroundImage="url("+seedlPng+")"+",url("+platform+")";
            document.getElementsByClassName('imgDiv3')[0].firstChild.style.backgroundImage="url("+pumpingVineGif+")"+",url("+tmgy+")";
            document.getElementsByClassName('left2')[0].style.display="none";
            document.getElementsByClassName('left3')[0].style.display="block";
        break;
        case 4:
            document.getElementsByClassName('imgDiv3')[0].firstChild.style.backgroundImage="url("+pumpingVine+")"+",url("+platform+")";
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
  render() {
    let me = this;
    let props = this.props;
    return(
    <div className="topGreenhouse" style={{display:this.props.display}}>
	  {/*XXX监测机构弹窗*/}
	   <div style={{position:'absolute',left:'-880px',top:'-853px'}}>
     <div style={{position:'relative'}}>
	    <div style={{float:'left',marginLeft:'100px',marginTop:'40px',width:'600px',height:'211px'}}>
				
			</div>
			<div className="rightTopDiv">
				
			</div>
			<div className="cycleDiv" style={{top:254,left:'55%'}}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line lineSpecial"></div>
                <div className="imgDiv imgDiv1"><div onMouseOut={this.divOut.bind(this,1)} onMouseOver={this.divHover.bind(this,1)}></div><span>育苗期</span></div>
                <div className="imgDiv imgDiv2"><div onMouseOut={this.divOut.bind(this,2)} onMouseOver={this.divHover.bind(this,2)}></div><span>幼苗期</span></div>
                <div className="imgDiv imgDiv3"><div onMouseOut={this.divOut.bind(this,3)} onMouseOver={this.divHover.bind(this,3)}></div><span>抽蔓期</span></div>
                <div className="imgDiv imgDiv4"><div onMouseOut={this.divOut.bind(this,4)} onMouseOver={this.divHover.bind(this,4)}></div><span className="specialText1">开花坐果期</span></div>
                <div className="imgDiv imgDiv5"><div onMouseOut={this.divOut.bind(this,5)} onMouseOver={this.divHover.bind(this,5)}></div><span>结果期</span></div>
                {/* 各个周期时间 */}
                <div className="cycleTime">
                    <p>8月3号</p>
                    <p>8月13号</p>
                    <p>9月3号</p>
                    <p>9月18号</p>
                    <p>9月28号</p>
                    <p>10月19号</p>
                </div>
            </div>
            {/* 进度条 */}
            <div className={'time-line'} style={{
                display: 'block',
                position: 'absolute',
                top: 535,
                left: 48,
                }}>
                <div className={'time-line-bottom'} style={{
                    width: 1340,
                    height: 10,
                    position: 'absolute',
                    border: '1px solid rgba(4,91,172,1)',
                    borderRadius: 10,
                    backgroundColor: 'rgba(4,91,172,.3)',
                }}>
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
                <p className="cycleTitle">育苗期</p>
                {/* <p>施肥频次：{this.state.lifeCycleData[0].fertilizaNum}</p>
                <p>交水频次：{this.state.lifeCycleData[0].waterNum}天</p> */}
                <p>黄瓜种用52~55度的热水浸泡30分钟，放入湿纱布中包好，置于26~30度左右的催芽箱中进行催芽</p>
                {/* <p>将苗畦或穴盘等用营养土整好或填充好后，浇透水，维持温度24~30度为宜</p>
                <p>苗期可喷施0.2%磷酸二氢钾溶液进行追肥</p> */}
                {/* <p>{this.state.lifeCycleData[0].mattersAttention}</p> */}
                {/* <p>预估产量：{this.state.lifeCycleData[0].forecastOut}吨</p> */}
                {/* <p>预估收入：{this.state.lifeCycleData[0].forecastPut}万元</p> */}
            </div>
            <div className="detailExplain left2">
                <p className="cycleTitle">幼苗期</p>
                {/* <p>施肥频次：{this.state.lifeCycleData[1].fertilizaNum}</p>
                <p>交水频次：{this.state.lifeCycleData[1].waterNum}天</p> */}
                <p>选择晴天无风下午进行定植，行距80cm，株距35cm。</p>
                <p>定植完成后及时浇水，土壤湿度达到90%以上为止</p>
                {/* <p>日温度20-25℃，夜温15-18℃，最低温度15℃</p> */}
                {/* <p>{this.state.lifeCycleData[1].mattersAttention}</p> */}
                {/* <p>预估产量：{this.state.lifeCycleData[1].forecastOut}吨</p>
                <p>预估收入：{this.state.lifeCycleData[1].forecastPut}万元</p> */}
            </div>
            <div className="detailExplain left3">
                <p className="cycleTitle">抽蔓期</p>
                {/* <p>施肥频次：{this.state.lifeCycleData[2].fertilizaNum}</p>
                <p>交水频次：{this.state.lifeCycleData[2].waterNum}天</p> */}
                <p>吊线或搭架</p>
                <p>引蔓、绕秧、顺秧、摸叉</p>
                <p>中耕除草，挂粘虫贴进行物理除虫</p>
                {/* <p>{this.state.lifeCycleData[2].mattersAttention}</p> */}
                {/* <p>预估产量：{this.state.lifeCycleData[2].forecastOut}吨</p>
                <p>预估收入：{this.state.lifeCycleData[2].forecastPut}万元</p> */}
            </div>
            <div className="detailExplain left4">
                <p className="cycleTitle">开花坐果期</p>
                {/* <p>施肥频次：{this.state.lifeCycleData[3].fertilizaNum}</p>
                <p>交水频次：{this.state.lifeCycleData[3].waterNum}天</p> */}
                <p>适度施用生根剂，促进根系生长</p>
                <p>蘸花时建议留一支瓜</p>
                <p>空气湿度控制在45-50%之间</p>
                {/* <p>{this.state.lifeCycleData[3].mattersAttention}</p> */}
                {/* <p>预估产量：{this.state.lifeCycleData[3].forecastOut}吨</p>
                <p>预估收入：{this.state.lifeCycleData[3].forecastPut}万元</p> */}
            </div>
            <div className="detailExplain left5">
                <p className="cycleTitle">结果期</p>
                {/* <p>施肥频次：{this.state.lifeCycleData[4].fertilizaNum}</p>
                <p>交水频次：{this.state.lifeCycleData[4].waterNum}天</p>
                <p>注意虫害预防</p>
                <p>{this.state.lifeCycleData[4].mattersAttention}</p> */}
                {/* <p>预估产量：{this.state.lifeCycleData[4].forecastOut}吨</p>
                <p>预估收入：{this.state.lifeCycleData[4].forecastPut}万元</p> */}
                <p>根瓜以上建议三到四节留一支瓜</p>
                <p>追加氮磷钾肥料</p>
                <p>根据市场需求自行决定采收长度</p>
            </div>
            {/* 底部 */}
            <div className="footer" style={{marginLeft: '-618px',bottom:0}}>
                <div className="footerTitle">土壤检测</div>
                <div className="footerDiv">
                    <div className="lowText separate"><span>全氮：{this.state.totalnItrogen}g/kg</span></div>
                    <div className="normalText separate"><span>速效钾：{this.state.rapidlyVailable}mg/kg</span></div>
                    <div className="normalText separate"><span>有机磷：{this.state.organophosphorus}mg/kg</span></div>
                    <div className="normalText separate"><span>水溶性氮：{this.state.waterNitrogen}mg/kg</span></div>
                    <div className="highText separate"><span>土壤温度：{this.state.soilTemperature}℃</span></div>
                    <div className="highText separate"><span>土壤湿度：{this.state.soilHumidity}%</span></div>
                    <div className="footerSign" style={{bottom: '-133px'}}>
                        <div className="highText"><div className="highCircle circle"></div> 偏高</div>
                        <div className="normalText"><div className="normalCircle circle"></div> 正常</div>
                        <div className="lowText"><div className="lowCircle circle"></div> 偏低</div>
                    </div>
                </div> 
            </div>
	      </div>
        </div>
    </div>
    )
  }
}

export default Panel

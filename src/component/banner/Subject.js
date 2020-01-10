import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import bg from './img/bg.png';
import button1 from './img/button1.png';
import button2 from './img/button2.png';
import not_picture from './img/not_picture.jpg';
//弹出框
import Dialog from '../dialog/Dialog';
import { Carousel } from 'antd';
import * as regionPatternApi from '../../api/api-region-pattern.js'
export default class Subject extends React.Component {
	constructor(props) {
		super(props);
		// this.arr = ['杨庄1','官庄村','北河崖','前疃村','西稻田','杨庄2','杨庄3','杨庄4'];
		// this.imgArr = [bg,button1,button2,bg,button1,button2,bg,button1];
		this.arr = [];
		this.imgArr = [];
		this.detailArr = [];
		this.liStyle = {
			width: '96px',
			height: '28px',
			marginBottom: '10px',
			color: '#fff',
			lineHeight: '28px',
			textAlign: 'center',
			cursor: 'pointer',
			backgroundRepeat: 'noRepeat',
			backgroundSize: '100% 100%'
		};

		this.state = {
			index: 0,
			innerHtml: '',
			url: '',
		};
		this.timer = null;
	}

	componentWillMount() {
		let urlStr = window.location.href.substring(7, 16);
		this.setState({
			url: urlStr
		})
	}

	handle(e) {
		this.setState({
			index: e
		});
		this.refs.box.style.background = `url(${this.imgArr[e]})`;
		this.refs.box.style.backgroundRepeat = 'no-repeat';
		this.refs.box.style.backgroundSize = 'cover';
	}

	dialogClose() {

	}

	boxClick(index) {
		//设置弹出框innerHtml
		this.setState({
			innerHtml: this.detailArr[index]
		})
		this.refs.hxnpDialogRef._open(this.arr[index].name);
	}

	setData() {
		const me = this;
		//要先清除定时器
		clearInterval(me.timer);
		//请求数据
		regionPatternApi.CoreAgriculturalProducts.send({
			pageable: false,
			regionName: sessionStorage.getItem('modleName')
		}).then(res => {
			if(window.debugging) console.log('核心农品', res);
			//名称
			me.arr = [];
			//图片路径
			me.imgArr = [];
			//详情内容
			me.detailArr = [];
			let data = []
			//console.log(res);
			let url = '';
			if(this.state.url == 'localhost') {
				url = window.BASEURL_03;
			}
			//console.log(url);
			res.content.list.map((item, i) => {
				let pic = item.picImage;
				if(!pic) {
					pic = not_picture;
				} else {
					pic = url + item.picImage;
				}
				me.arr.push({
					name: item.productName,
					typename: item.smallVariety,
					type: item.bigVariety
				});
				me.imgArr.push(pic);
				me.detailArr.push(item.descPic);
			})
			//console.log(me.arr);
			//console.log(me.imgArr);
			//启动定时器
			me.startInterval();
		});
	}

	startInterval() {
		let me = this;
		me.timer = setInterval(() => {
			if(me.state.index >= me.arr.length) {
				me.state.index = 0;
			}
			me.setState({
				index: me.state.index
			});
			//切换背景图
			me.refs.box.style.background = `url(${this.imgArr[me.state.index]})`;
			me.refs.box.style.backgroundRepeat = 'no-repeat';
			me.refs.box.style.backgroundSize = 'cover';
			//变动滚动条位置
			me.refs.ul.scrollTop = 210 * (me.state.index / me.arr.length);
			me.state.index++;
		}, 2000);
	}

	addList() {
		return this.arr.map((v, i) => {
			return(
				<li style={{display:'flex'}} key={i}>
          <p onClick={this.handle.bind(this,i)} ref={'li'+i} className={'overflow-ellipsis'} style={{...this.liStyle,backgroundImage:i===this.state.index?`url(${button1})`:`url(${button2})`}} title={v.name}>{v.name}</p>
          <Link to={`/dataPicture?type=${v.type}&name=${v.typename}`}><p style={{marginLeft:'10px',color: '#09d9db',cursor:'pointer'}}>》</p></Link>
        </li>
			)
		})
	}

	render() {
		return(
			<div style={{width:'420px',height:'230px',position:'absolute',left:this.props.left||0,top:this.props.top||0}} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <div ref={'box'} onClick={this.boxClick.bind(this,this.state.index)} style={{cursor:'pointer',width:'300px',height:'230px',background:`url(${this.imgArr[0]})`,border:'2px solid #2779cf',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}></div>
        <ul ref={'ul'} style={{overflowY:'scroll',width:'116px',height:'210px',position:'absolute',left:'320px',top:'10px'}}>
          {
            this.addList()
          }
        </ul>
        {/* 详情弹出框 */}
        <Dialog left={'-40px'} top={'-850px'} title={''} ref={'hxnpDialogRef'} close={this.dialogClose.bind(this)}>
            <div style={{padding:'50px',height:700,overflow:'auto'}} dangerouslySetInnerHTML={{__html:this.state.innerHtml}}></div>
        </Dialog>
      </div>
		)
	}

	componentDidMount() {
		this.setData();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	onMouseEnter(e) {
		e.persist();
		//console.log('onMouseEnter', e);
		clearInterval(this.timer);
	}
	onMouseLeave(e) {
		e.persist();
		//console.log('onMouseLeave', e);
		//启动定时器
		this.startInterval();
	}
}
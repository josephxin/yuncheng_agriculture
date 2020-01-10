import React from 'react';
/*引入antd框架*/
import { Button, message } from 'antd';
/*引入样式表*/
import './index.scss';

class IndexPage extends React.Component {
	constructor() {
		super();
		this.timer = null;
		this.state = {
			second: 10,
		}
	}

	componentDidMount() {
		const me = this;
		me.timer = setInterval(() => {
			me.setState({
				second: --me.state.second
			});
			if(me.state.second <= 0) {
				me.goLogin();
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}
	
	goLogin() {
		let me = this;
		clearInterval(me.timer);
		me.timer = null;
		window.location.hash = '/login';
	}
	
	render() {
		let me = this;
		return(
			<div className={'index-page'}>
				{/*在给video标签设置了autoplay属性的情况下，刷新页面后，视频无法自动播放
					解决方法：给video标签添加muted属性，可写为muted或完整写法：muted="muted"*/}	
				<video className={'my-video'} autoPlay="autoplay" muted="muted" >
					<source src="/static/video/open.mp4" type="video/mp4" />
			    您的浏览器不支持 video 标签。
				</video>
				<div className={'my-tool'}>
					<Button className={'my-button'} onClick={me.goLogin.bind(me)}>跳过</Button>
					<span><span>{me.state.second}</span>后进入登录页面</span>
				</div>
			</div>
		);
	}
}

export default IndexPage;
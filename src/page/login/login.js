import React from 'react';
/*引入antd框架*/
import { Input, Button, Icon, message } from 'antd';
/*引入api接口*/
import * as api from '../../api/api-login';
/*引入样式表*/
import './login.css';

const Password = Input.Password;

class LoginPage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const me = this;
		localStorage.removeItem('sid');
	}

	componentWillUnmount() {

	}

	render() {
		let me = this;
		return(
			<div className={'login'}>
				<p className={'login-title'}>用户登录</p>
				<Input className={'x-input'} ref={ref => me.usernameRef = ref} allowClear prefix={<Icon type="user" />} placeholder="请输入账号" onKeyUp={me.keyUpHandle.bind(me)} />
				<Password className={'x-input'} id={'pwd'} allowClear prefix={<Icon type="lock" />} placeholder="请输入密码" onKeyUp={me.keyUpHandle.bind(me)} />
				<Button type="primary" size={'large'} onClick={me.goHome.bind(me)}>登录</Button>
			</div>
		);
	}

	keyUpHandle(e) {
		e.persist();
		//console.log(e);
		let keyCode = e.keyCode;
		if(keyCode == 13) {
			this.goHome();
		}
	}
	goHome() {
		let me = this;
		let username = me.usernameRef.state.value;
		let password = document.getElementById('pwd').value;
		//console.log(me.usernameRef, username, password);
		if(!username) {
			message.info('请输入账号！');
		} else if(!password) {
			message.info('请输入密码！');
		} else {
			/*登陆接口*/
			api.login.send({
        captcha: 'dapingzhuanyong',
        captchaCode: 'dapingzhuanyong',
        userName: username,
				password: password,
				//isDpLogin: true,
			}).then(res => {
				if(window.debugging) console.log('登录接口', res);
				if(res.code == 1) {
					message.success('登录成功！');
					localStorage.setItem('sid', res.data.loginToken);
					window.location.hash = '/homepage';
				} else if(res.code == 500) {
					message.error(res.msg);
				} else {
					message.info('用户名或密码错误！');
				}
			});
		}
	}
}

export default LoginPage;

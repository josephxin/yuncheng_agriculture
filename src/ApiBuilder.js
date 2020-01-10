import axios from 'axios';
import { WFloading } from './tool/tool.js';

const WITH_REQUEST_BODY = 0x01;
const WITHOUT_REQUEST_BODY = 0x02;

const isLegalMethod = function(method) {
	const map = {
		'get': WITHOUT_REQUEST_BODY,
		'delete': WITHOUT_REQUEST_BODY,
		'head': WITHOUT_REQUEST_BODY,
		'options': WITHOUT_REQUEST_BODY,
		'post': WITH_REQUEST_BODY,
		'put': WITH_REQUEST_BODY,
		'patch': WITH_REQUEST_BODY
	};
	return map[method.toLowerCase()];
};

class ArrayCallee extends Array {
	call() {}

	apply() {}
}

/**
 * API对象。
 * @author Molay
 */
class Api {
	_option = undefined;
	_baseOption = undefined;
	_url = undefined;
	_method = undefined;
	_methodFlag = undefined;

	constructor(option, baseOption) {
		if(!option || !baseOption)
			throw new Error('API定义必须有合法的配置。');

		let me = this;
		me._option = option;
		me._baseOption = baseOption;

		let url = option.url;
		if(!url)
			throw new Error('请求地址不合法。');
		// if (!/^\w+:\/\//.test(url)) {
		//   let baseUrl = baseOption.baseUrl || '';
		//   url = baseUrl + '/' + option.url;
		// }
		me._url = url;

		let method = option.method || 'get';
		let methodFlag = isLegalMethod(method);
		if(!methodFlag)
			throw new Error('请求方法' + method + '不合法。');
		me._method = method;
		me._methodFlag = methodFlag;

		// let aspect = option.aspect;
	}

	send(data) {
		let xhr = undefined;
		let cancel = undefined;
		let cancelled = false;
		let listThen = new ArrayCallee();
		let listCatch = new ArrayCallee();
		let listProgress = new ArrayCallee();
		//显示loading
		//WFloading.show()

		let token = {
			then: function(executor) {
				listThen.push(executor);
				return this;
			},
			catch: function(executor) {
				listCatch.push(executor);
				return this;
			},
			progress: function(executor) {
				listProgress.push(executor);
				return this;
			},
			cancel: function() {
				cancelled = true;
				if(xhr) xhr.abort();
				else if(cancel) cancel();
				return this;
			}
		};

		let me = this;
		let option = me._option;
		let baseOption = me._baseOption;
		let simulation = baseOption.simulation || option.simulation;
		if(!simulation) { //不是模拟数据时
			let config = {
				baseURL: option.baseUrl || baseOption.baseUrl || '',
				url: me._url,
				method: me._method,
				responseType: option.responseType || baseOption.responseType || 'json',
				onDownloadProgress: function(event) {
					if(!xhr) xhr = event.target;
					if(cancelled) return xhr.abort();
					listProgress.forEach(method => {
						method.call(null, event, xhr);
					});
				},
				cancelToken: new axios.CancelToken(function(c) {
					cancel = c;
				})
			};
			/*可视化的每个接口都需要传token*/
			//console.log(me._url);
      //console.log('config.baseURL-------------',config.baseURL);
      if(me._url != '/bamSysUser/login') {
        //debugger
				config.headers = {
          Authorization: localStorage.getItem('sid')
				}
			}

			if(me._methodFlag === WITH_REQUEST_BODY){
        //data = formatParams(data);
        config.data = data;
      } else{
        config.params = data;
      }

			axios(config)
				.then(response => {
					//隐藏loading
					//WFloading.hide()
          //console.log('response-----------------',response);
          if(response.data.code == 401){
            localStorage.removeItem('sid')
            //this.props.history.push('/child02')
            window.location.hash = '/login';
          }
					if(cancelled) return;
					listThen.forEach(method => {
						method.call(null, response.data, response);
					});
				})
				.catch(error => {
					//隐藏loading
					//WFloading.hide()
					if(cancelled) return;
					listCatch.forEach(method => {
						method.call(null, error);
					});
				});
		} else { //模拟数据
			let simulator = option.simulator;
			let simulatorType = typeof simulator;
			if(simulatorType === 'string') {
				axios({
						url: simulator
					})
					.then(response => {
						//隐藏loading
						//WFloading.hide()
            console.log('response-----------------',response);
            if(cancelled) return;
						listThen.forEach(method => {
							// by yangqing  20181228 if the response.data is string type, parse it to json obj type
							let data_ = response.data;
							let data_Type = typeof data_;
							if(typeof data_Type === 'string') {
								data_ = eval('(' + data_ + ')');
							}
							method.call(null, data_, response);
						});
					})
					.catch(error => {
						//隐藏loading
						//WFloading.hide()
						if(cancelled) return;
						listCatch.forEach(method => {
							method.call(null, error);
						});
					});
			} else if(simulatorType === 'function') {
				new Promise(function(resolve, reject) {
					let result = simulator(option, data);
					let response = {
						data: result,
						status: 200,
						statusText: 'OK',
						headers: {},
						config: {},
						get request() {
							return xhr;
						}
					};
					resolve(response);
				}).then(function(response) {
					//隐藏loading
					//WFloading.hide()
					if(cancelled) return;
					listThen.forEach(method => {
						method.call(null, response.data, response);
					});
				});
			}
		}

		return token;
	}
}

/**
 * API构建器，用以创建具备一定统一规则的API对象。
 * @author Molay
 */

class ApiBuilder {
	_baseOption = undefined;
	_defaultGroup = undefined;
	_groups = undefined;

	constructor(baseOption) {
		let me = this;
		me._baseOption = baseOption;
		me._defaultGroup = {
			name: 'default',
			apis: []
		};
		me._groups = {
			'default': me._defaultGroup
		};
	}

	build(option) {
		let api = new Api(option, this._baseOption);
		this._defaultGroup.apis.push(api);
		return api;
	}
	group(name) {
		let me = this;
		return {
			build(option) {
				let group = me._groups[name];
				if(!group)
					me._groups[name] = group = {
						name: name,
						apis: []
					};
				let api = new Api(option, this._baseOption);
				group.apis.push(api);
				return api;
			}
		}
	}
}

function formatParams(obj) {
	let params = new URLSearchParams();
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			params.append(key, obj[key]);
		}
	}
	return params;
}

export default ApiBuilder;

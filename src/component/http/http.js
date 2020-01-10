import axios from 'axios'
import { WFloading } from '../../tool/tool.js';

let Config = {
	TIMEOUT: 30000,
	baseURL: {
		dev: window.BASEURL_01 + '/api/',
		//dev: window.BASEURL_01,
		prod: ''
	}
};
let AUTH_TOKEN = '';
// axios 配置
axios.defaults.timeout = Config.TIMEOUT;
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';// 配置请求头
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
let baseURL = Config.baseURL.dev;
export function post(url, params) {
	return new Promise((resolve, reject) => {
		//显示loading
		//WFloading.show()
		axios.post(baseURL + url, formatParams(params))
			.then(response => {
				//隐藏loading
				//WFloading.hide()
				if(response.data) {
					resolve(response.data);
				}
			})
			.catch((error) => {
				//隐藏loading
				//WFloading.hide()
				reject(error);
			})
	})
}
export function get(url, params) {
	return new Promise((resolve, reject) => {
		//显示loading
		//WFloading.show()
		axios.get(baseURL + url, params)
			.then(response => {
				//隐藏loading
				//WFloading.hide()
				if(response.data) {
					resolve(response.data);
				}
			})
			.catch((error) => {
				//隐藏loading
				//WFloading.hide()
				reject(error);
			})
	})
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

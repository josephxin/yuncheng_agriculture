import axios from 'axios'
let Config = {
	TIMEOUT: 30000,
	baseURL: {
		dev: window.BASEURL_01 + '/api/',
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
		axios.post(baseURL + url, formatParams(params))
			.then(response => {
				if(response.data) {
					resolve(response.data);
				}
			})
			.catch((error) => {
				reject(error);
			})
	})
}
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(baseURL + url, params)
			.then(response => {
				if(response.data) {
					resolve(response.data);
				}
			})
			.catch((error) => {
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
import ApiBuilder from '../ApiBuilder.js';

const builder = new ApiBuilder({
  //baseUrl: 'http://202.106.10.250:48005',
  baseUrl: '.',
  simulation: false
});

/**
 * @type {string}
 */

/* eoLinker 地址 */
builder.BASEURL_02 = window.BASEURL_02;

/* 测试环境地址 */
//console.log(window.BASEURL_01); 
builder.BASEURL_01 = window.BASEURL_01;



export default builder;

/**
 * Created by admin on 2020/1/10.
 */
import builder from './api-common';

/* 全部品种 */
export const product_tree = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/dic/producttype/getTree',
  method: 'POST',
});

/*地区*/
export const selectRegion = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/wfCsCompanyDetail/selectRegion',
  method: 'GET',
});

//查询所有的区县
export const selectSystemList = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/areayuncheng/selectSystemList',
	method: 'POST'
});

/*主查询-区县 */
export const getQuXian = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/getQuXian',
  method: 'GET',
});

/*主查询-乡镇 */
export const getXiangZhen = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/getXiangZhen',
  method: 'GET',
});

/*主查询-村 */
export const getAllCun = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/getAllCun',
  method: 'GET',
});
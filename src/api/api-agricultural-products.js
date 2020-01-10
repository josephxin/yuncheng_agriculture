import builder from './api-common';

/*农投品监测—农投品销量-各区县农投品销量分析*/
export const sale_volume_region = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/sale_volume_region',
  method: 'POST',
});

/* 农投品监测—农投品品种小类销量TOP10 */
export const sale_volume_ranking = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/sale_volume_ranking',
  method: 'POST',
});

/*农投品销售价格分析*/
export const sale_price = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/sale_price',
  method: 'POST',
});

/*违禁品名单*/
export const contraband_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/contraband_list',
  method: 'POST',
});

/*GIS下钻—农投品门店信息—农投品门店及种类总量查询*/
export const gis_shops_count = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/gis_shops_count',
  method: 'POST',
});

/*GIS下钻—农投品门店信息—农投品门店列表查询*/
export const gis_shops_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/gis_shops_list',
  method: 'POST',
});

/*首页地图*/
export const centerMap = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfai/shop_business',
  method: 'POST',
});


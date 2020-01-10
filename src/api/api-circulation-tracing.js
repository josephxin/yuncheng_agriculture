import builder from './api-common';

/*农产品销售全国流向*/
export const sale_tradeInfo = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/sale_tradeInfo',
  method: 'POST',
});

/*农产品销售全国流向 排行榜*/
export const sale_tradeOrder = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/sale_tradeOrder',
  method: 'POST',
});

/*农产品采收量监测*/
export const collection_monitor_total = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/collection_monitor_total',
  method: 'POST',
});

/*各区县农产品采收量分析*/
export const collection_monitor_region = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/collection_monitor_region',
  method: 'POST',
});

/*农产品交易价格分析*/
export const deal_price = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/deal_price',
  method: 'POST',
});

/*农产品交易结构分析-销售品种*/
export const deal_structure = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/deal_structure',
  method: 'POST',
});

/*农产品交易结构分析-地区销量*/
export const deal_variety_ranking = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/deal_variety_ranking',
  method: 'POST',
});

/*地图首页展示-今日交易量交易额数据---->批发市场数量，交易品种数量*/
export const market_class_quantity = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/market_class_quantity ',
  method: 'POST',
});

/*地图首页展示-实时交易额数据列表*/
export const today_trading_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/today_trading_list',
  method: 'POST',
});

/*批发价超市价对比*/
export const price_contrast = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/price_contrast',
  method: 'POST',
});

/*运城市农产品流通概况*/
export const analysis_trade_country = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/analysis_trade_country',
  method: 'POST',
});

/*全国批发市场价格-默认查询当天的批发市场价格数据*/
export const wholesale_market_price = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/wholesale_market_price',
  method: 'POST',
});

/*全國价格 province和city传递空 点击省province传省简称 再次下钻city传县全称呼*/
export const allPrice = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpw/allPrice',
  method: 'POST',
});

/*组织机构信息-组织机构总量查询*/
export const org_details_count = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/org_details_count',
  method: 'POST',
});

/*组织机构信息-组织机构信息查询*/
export const org_details_info = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/org_details_info',
  method: 'POST',
});

/*组织机构信息-组织机构列表查询*/
export const org_details_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wffb/org_details_list',
  method: 'POST',
});


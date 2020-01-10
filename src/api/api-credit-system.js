import builder from './api-common';

/* 信用体系---各信用级别企业数量趋势 */
export const wfCsCompanyCom = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCsCompanyCom',
  method: 'POST',
});

/* 信用体系---产业链各信用级别企业数量分析 */
export const WfCsCompanyServicelife = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/WfCsCompanyServicelife',
  method: 'POST',
});

/* 信用体系---企业红黑榜 */
export const wfCsCompanyRedblack = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCsCompanyRedblack',
  method: 'POST',
});

/* 信用体系---企业红黑榜（弹窗） */
export const wfCsCompanyRedblackQuerySort = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCsCompanyRedblackQuerySort',
  method: 'POST',
});

//企业红黑榜-企业详情
export const companyRedBlackDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/wfCsCompanyDetail/companyRedBlackDetail',
  method: 'GET',
});

/* 信用体系---农户信用等级分布(年度) */
export const yearWfCsFarmerCreditlevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/yearWfCsFarmerCreditlevel',
  method: 'POST',
});

/* 信用体系---农户信用等级分布---五星数据(年度) */
export const yearFarmerStarlevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/yearFarmerStarlevel',
  method: 'POST',
});

/* 信用体系---农户信用等级分布---多个时间的柱子 */
export const wfCsFarmerCreditlevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCsFarmerCreditlevel',
  method: 'POST',
});

/* 信用体系---企业信用等级分布---多个时间的柱子 */
export const wfCscompanyCreditlevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCscompanyCreditlevel',
  method: 'POST',
});

/* 信用体系---企业信用等级分布---红黑榜 */
export const yearWfCsCompanyCreditlevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/yearWfCsCompanyCreditlevel',
  method: 'POST',
});

/* 信用体系---企业信用等级分布---各种类型外层 */
export const yearWfCsCompanyType = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/yearWfCsCompanyType',
  method: 'POST',
});

/* 信用体系---地图数据 */
export const yearWfCsIndexMap = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/yearWfCsIndexMap',
  method: 'POST',
});

/* 信用体系---红名单 */
export const wfCsCompanyRedlist = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfcs/wfCsCompanyRedlist',
  method: 'POST',
});

/*农投品门店列表查询*/
export const selectCompanyDetailList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/wfCsCompanyDetail/selectCompanyDetailList',
  method: 'GET',
});

/*农投品门店及种类总量查询*/
export const selectCountCompany = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/wfCsCompanyDetail/selectCountCompany',
  method: 'GET',
});


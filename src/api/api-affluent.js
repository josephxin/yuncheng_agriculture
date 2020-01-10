/**
 * Created by admin on 2019/12/2.
 */
import builder from './api-common';

//农业经济与GDP占比
export const selectAgriculturalecoAndGdpPro = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectAgriculturalecoAndGdpPro',
  method: 'GET',
});

//生产资料市场信息
export const overviewStatistics = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'machinery/overviewStatistics',
  method: 'GET',
});

//村企业分布
export const selectVillageEnterpriseAllList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectVillageEnterpriseAllList',
  method: 'GET',
});

// 村企业分布-企业列表一级下钻
export const selectVillageEnterpriseList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectVillageEnterpriseList',
  method: 'GET',
});

// 村企业分布-企业详情二级下钻
export const selectVillageEnterpriseDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectVillageEnterpriseDetail',
  method: 'GET',
});

/*金融服务网点占比*/
export const selectFinancialServiceOsPro = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectFinancialServiceOsPro',
  method: 'GET',
});

/*金融服务网点占比-下钻*/
export const selectFinancial = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectFinancialServiceOsList',
  method: 'GET',
});

/*基本生活服务数据*/
export const selectBasiclivingServices = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectBasiclivingServices',
  method: 'GET',
});

/*道路硬化方式*/
export const selectRoadHardening = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/affluent/selectRoadHardening',
  method: 'GET',
});

/*产量占比分析*/
export const selectOutputProportion = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectOutputProportion',
  method: 'GET',
});

/*通公路未通公路*/
export const selectHighwayAndNoway = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectHighwayAndNoway',
  method: 'GET',
});

/*高速出口*/
export const selectHighspeedExit = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectHighspeedExit',
  method: 'GET',
});

/*地图*/
export const selectAgriculturalProductionData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'affluent/selectAgriculturalProductionData',
  method: 'GET',
});

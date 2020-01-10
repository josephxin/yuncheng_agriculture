/**
 * Created by admin on 2019/12/4.
 */
import builder from './api-common';

//村委会分布
export const selectDistributionVillageCommittees = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectDistributionVillageCommittees',
  method: 'GET',
});

//村详情
export const selectVillageDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/ecology/selectVillageDetail',
  method: 'GET',
});

//特色农产品
export const selectCharacteristicAgrProList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCharacteristicAgrProList',
  method: 'GET',
});

//农业投入品
export const selectAgriculturalInputsList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectAgriculturalInputsList',
  method: 'GET',
});

//餐饮住宿
export const selectCateringAccommodation = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCateringAccommodation',
  method: 'GET',
});

//餐饮住宿下钻列表
export const selectCateringAccommodationList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCateringAccommodationList',
  method: 'GET',
});

//通信服务网点
export const selectCommunicationService = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCommunicationService',
  method: 'GET',
});

//技术服务
export const selectTechnicalService = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectTechnicalService',
  method: 'GET',
});

//中间总览统计图-卫生服务
export const selectHealthService = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectHealthService',
  method: 'GET',
});

//中间总览统计图-教育资源
export const selectEducationalResources = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectEducationalResources',
  method: 'GET',
});

//公共服务
export const selectPublicService = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'harmonious/selectPublicService',
  method: 'GET',
});

//购物服务
export const selectShoppingService = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'harmonious/selectShoppingService',
  method: 'GET',
});

//乡村文化
export const selectRuralCulture = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'harmonious/selectRuralCulture',
  method: 'GET',
});

//乡村文化-列表
export const selectRuralCultureList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'harmonious/selectRuralCultureList',
  method: 'GET',
});

//乡村文化-详情
export const selectRuralCultureDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectRuralCultureDetail',
  method: 'GET',
});

/*卫生服务分布下钻列表 */
export const selectHealthServiceList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectHealthServiceList',
  method: 'GET',
});

/*下钻-卫生服务坐标点 */
export const selectHealthServiceCoordinatePoints = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectHealthServiceCoordinatePoints',
  method: 'GET',
});

/*教育资源分布下钻列表 */
export const selectEducationalResourcesList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectEducationalResourcesList',
  method: 'GET',
});

/*下钻-教育资源分布坐标点 */
export const selectEducationalResourcesPoints = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectEducationalResourcesPoints',
  method: 'GET',
});

/*技术服务分布下钻列表 */
export const selectTechnicalServiceList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectTechnicalServiceList',
  method: 'GET',
});

/*下钻-技术服务分布坐标点*/
export const selectTechnicalServicePoints = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectTechnicalServicePoints',
  method: 'GET',
});

/*下钻-通信服务统计数 */
export const selectCommunicationServiceCount = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCommunicationServiceCount',
  method: 'GET',
});

/*通信服务分布下钻列表 */
export const selectCommunicationServiceList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/harmonious/selectCommunicationServiceList',
  method: 'GET',
});

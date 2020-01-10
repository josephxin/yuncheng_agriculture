/**
 * Created by admin on 2019/12/6.
 */
import builder from './api-common';

//污水排放方式
export const selectSewageDischargeMode = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectSewageDischargeMode',
  method: 'GET',
});

//生活垃圾处理方式
export const selectDomesticWasteTreatment = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectDomesticWasteTreatment',
  method: 'GET',
});

//特色景观旅游名村
export const selectTourismNameVillage = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/ecology/selectTourismNameVillage',
  method: 'GET',
});

//耕地利用情况-年末耕地面积
export const selectCultivatedLandArea = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/ecology/selectCultivatedLandArea',
  method: 'GET',
});

//耕地利用情况-旱地水浇地
export const selectDryLandWatering = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/ecology/selectDryLandWatering',
  method: 'GET',
});

//耕地利用情况-耕地问题
export const selectArableLandProblem = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/ecology/selectArableLandProblem',
  method: 'GET',
});

//休闲娱乐统计
export const selectRecreationEntertainment = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectRecreationEntertainment',
  method: 'GET',
});

//地形地貌分析
export const selectLandformanalysis = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectLandformanalysis',
  method: 'GET',
});

//县域特色
export const selectCountyCharacteristics = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'harmonious/selectCountyCharacteristics',
  method: 'GET',
});

/*耕地基本情况一级下钻 */
export const selectLandList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectLandList',
  method: 'GET',
});

/*耕地基本情况二级下钻 */
export const selectLandDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectLandDetail',
  method: 'GET',
});

// 休闲娱乐统计下钻列表
export const selectRecreationEntertainmentList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectRecreationEntertainmentList',
  method: 'GET',
});

// 特色旅游风景村介绍下钻列表
export const selectTourismNameVillageDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'ecology/selectTourismNameVillageDetail',
  method: 'GET',
});

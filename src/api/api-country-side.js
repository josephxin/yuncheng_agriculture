import builder from './api-common';

/*常住人口 */
export const residencePeople = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectResidencePeople',
  method: 'GET',
});

/*常住人口从事农业生产人数年龄统计图 */
export const ageChart = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectAgeChart',
  method: 'GET',
});

/*户数统计*/
export const householdsStatistics = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectHouseholdsStatistics',
  method: 'GET',
});

/*外出打工人数-下钻页面*/
export const selectGoOutWorkPeopleList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectGoOutWorkPeopleList',
  method: 'POST',
});

/*户主社保情况-下钻页面*/
export const selectHzsbList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectHzsbList',
  method: 'POST',
});

/*户数统计-下钻页面*/
export const selectListHouseNumStatistics = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeHousehostInfo/selectListHouseNumStatistics',
  method: 'POST',
});

/*乡镇村概况-一级下钻页面*/
export const selectListXzcSurvey = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeHousehostInfo/selectListXzcSurvey',
  method: 'POST',
});

/*乡镇村概况-二级下钻页面*/
export const selectVillageDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectVillageDetail',
  method: 'GET',
});

/*贫困户数-下钻页面*/
export const selectListPoverty = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeHousehostInfo/selectListPoverty',
  method: 'POST',
});

/*乡镇村人口-一级下钻页面*/
export const selectListXzc = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeHousehostInfo/selectListXzc',
  method: 'POST',
});

/*乡镇村人口-二级下钻页面户主详情*/
export const selectHouseholderDetails = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectHouseholderDetails',
  method: 'GET',
});

//返乡大学生占乡村大学生数量
/*export const selectUndergraduateRatio = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectUndergraduateRatio',
  method: 'GET',
});*/

//30-40岁未婚男性占比全部男性比重
/*export const selectSpinsterhoodNum = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectSpinsterhoodNum',
  method: 'GET',
});*/

//乡镇村概况
export const selectXzcSituation = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectXzcSituation',
  method: 'GET',
});

//外出人口数
export const selectGoOutWorkPeopleNum = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectGoOutWorkPeopleNum',
  method: 'GET',
});

//贫困户
export const selectPovertyHouseHold = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectPovertyHouseHold',
  method: 'GET',
});

//乡镇村人口数
export const selectXzcPeopleNum = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectXzcPeopleNum',
  method: 'GET',
});

//社保情况
export const selectSocialCondition = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectSocialCondition',
  method: 'GET',
});

//农村人口结构占比
export const selectPopulationStructurePro = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'administrativeVillageInfo/selectPopulationStructurePro',
  method: 'GET',
});

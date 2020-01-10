import builder from './api-common';

//产业结构分析-首页图表
export const getlatelyInfo = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homeindustrialstructureanalysis/getlatelyinfo',
  method: 'GET',
});

//三品一标统计-首页图表
export const getcountfortype = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homethreeone/getcountfortype',
  method: 'GET',
});

//农作物耕地面积分布-首页图表
export const getcountforbigtype = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'plantcropsbaseinfo/getcountforbigtype',
  method: 'GET',
});

//农产品销售全国流向-首页图表
export const getallList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homesaleflow/getalllist',
  method: 'GET',
});

/* 批发零售价格比较-首页图表*/
export const priceContrast = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/homeProductsWholesaleRetail/getlatelymonthinfo',
  method: 'GET',
});

//批发零售价格-列表
export const selectlistThree = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homeProductsWholesaleRetail/selectlist',
  method: 'POST',
});

//物联网-首页图表
export const gethomeview = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homeiotequipment/gethomeview',
  method: 'GET',
});


//产业结构-列表
export const selectlistOne = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homeindustrialstructureanalysis/selectlist',
  method: 'POST',
});
//三品一标统计-列表
export const selectlistTwo = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homethreeone/selectlist',
  method: 'POST',
});

//物联网-列表
export const selectlistFour = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homeiotequipment/selectlist',
  method: 'POST',
});

/* 首页-农作物耕地-农作物分类下拉框*/
export const product_gettypetree = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/plantcropsbaseinfo/gettypetree',
  method: 'GET',
});

//产品-品类
/*export const productCategory= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'api/dic/producttype/getByParentId',
  method: 'POST',
});*/

//三农政策与产值、产量相关性分析
export const correlationAnalysis= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/homePolicyYieldOutput/gethomeview',
  method: 'GET',
});

//首页-三农政策与产值、产量相关性分析政策内容-下钻
export const gethomeviewdetail= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/homePolicyYieldOutput/gethomeviewdetail',
  method: 'GET',
});

//农耕作物占地面积分布-弹框
export const selectlistFive = builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'plantcropsbaseinfo/getlistforhome',
  method: 'POST',
});

/*------宏观发展状况-接口--------*/
//首页-中心区域
export const getCenterInfo= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/homecenter/getCenterInfo',
  method: 'GET',
});

//中间区域-农业总产值-弹框
export const outputValueData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaotlist',
  method: 'POST',
});

//中间区域-GDP占比-弹框
export const proportionData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getgdplist',
  method: 'POST',
});

//中间区域-利税-弹框
// export const profitTaxData= builder.build({
//   baseUrl: builder.BASEURL_01,
//   url: 'homecenter/getptlist',
//   method: 'POST',
// });

//中间区域-注册用户量-弹框
export const registeredUserData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/geturlist',
  method: 'POST',
});

//中间区域-农机设备数-弹框
export const equipmentNumData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaelist',
  method: 'POST',
});

//中间区域-农投品使用量-弹框
export const agriculturalData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaiulist',
  method: 'POST',
});

//中间区域-地标农产品-弹框
export const landmarkData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getlalist',
  method: 'POST',
});

//中间区域-农业总人口-弹框
export const totalPopulationData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaplist',
  method: 'POST',
});

//中间区域-龙头企业-弹框
export const enterpriseData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getselist',
  method: 'POST',
});

//中间区域-耕地总面积-弹框
export const cultivatedLandData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaalist',
  method: 'POST',
});

//中间区域-涉农企业-弹框
export const  relatedData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getiaeist',
  method: 'POST',
});

//中间区域-农药农投品使用量-弹框
export const  getainulistData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getainulist',
  method: 'POST',
});

//中间区域-化肥农投品使用量-弹框
export const  getaiulistData= builder.build({
  baseUrl: builder.BASEURL_01,
  url: 'homecenter/getaiulist',
  method: 'POST',
});

//注册量活跃度走势
export const  selectAppTrend= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/appStatistics/selectAppTrend',
  method: 'GET',
});

//用户类型占比
export const  selectAppUserType= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/appStatistics/selectAppUserType',
  method: 'GET',
});

//供需类型占比
export const  selectNeedAndService= builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/appStatistics/selectNeedAndService',
  method: 'GET',
});

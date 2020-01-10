import builder from './api-common';

/*字典*/
export const listByType = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/sysdic/front/listByType',
  method: 'GET',
});

/*产量占比*/
export const breed_structure = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/breed_structure',
  method: 'POST',
});

/*产量走势（传产量）和土地使用趋势（传种植面积）*/
export const production_scale = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/production_scale',
  method: 'POST',
});

/*耕地面积占比*/
export const cultivated_land_proportion = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/cultivated_land_proportion',
  method: 'POST',
});

/*生产规模排名Top10*/
export const production_scale_rank = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/production_scale_rank',
  method: 'POST',
});

/*运城市下属鼠标hover信息*/
export const production_scale_district = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/production_scale_district',
  method: 'POST',
});

/*生产规模排名数值总额统计*/
export const production_scale_rank_sum = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/production_scale_rank_sum',
  method: 'POST',
});

/*品牌农品,轮播信息*/
export const product_brand = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/product_brand',
  method: 'POST',
});

/*县区品牌农品*/
export const product_brandname_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/product_brandname_list',
  method: 'POST',
});

/*品牌农品详情(点击轮播调用)*/
export const product_brand_info_by_name = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/product_brand_info_by_name',
  method: 'POST',
});

/*品牌农品详情(点击下拉框调用)*/
export const product_brand_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/product_brand_list',
  method: 'POST',
});

/*种植分布*/
export const plant_distribution_coord = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/plant_distribution_coord',
  method: 'POST',
});

/*gis基地列表*/
export const gis_base_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_base_list',
  method: 'POST',
});

/*gis基地数量*/
export const gis_base_count = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_base_count',
  method: 'POST',
});

/*gis基地详情*/
export const gis_base_details = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_base_details',
  method: 'POST',
});

/*gis大棚列表*/
export const gis_greenhouse_list = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_greenhouse_list',
  method: 'POST',
});

/*gis大棚数量*/
export const gis_greenhouse_count = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_greenhouse_count',
  method: 'POST',
});

/*gis大棚详情*/
export const gis_greenhouse_details = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/api/wfpm/gis_greenhouse_details',
  method: 'POST',
});


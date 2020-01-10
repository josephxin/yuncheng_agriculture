import { post, get } from '../component/http/http';
import builder from './api-common';

//center总览图
export const machinery_overviewStatistics = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/overviewStatistics',
	method: 'GET'
});

//设备数量趋势分析
export const pesticide_residue_index = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/equipmentQuantityTrend',
	method: 'GET'
});

//区域设备数量排行
export const machinery_regEquipQuaRanking = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/regEquipQuaRanking',
	method: 'GET'
});

//设备数量占比分析
export const TradeStructure = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/equipNumberProAnalysis',
	method: 'GET'
});

//专业服务点趋势分析
export const serviceTrends = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/proServicePointTrend',
	method: 'GET'
});

//机播/机耕/机收
export const machinery_machinesph = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/machinesph',
	method: 'GET'
});

//GIS下钻—列表查询
export const machinery_selectList = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/selectList',
	method: 'GET'
});

//GIS下钻—头部数量
export const machinery_selectSeviceCount = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/selectSeviceCount',
	method: 'GET'
});

//GIS下钻—详情查询
export const machinery_selectDetail = builder.build({
	baseUrl: builder.BASEURL_01,
	url: '/machinery/selectDetail',
	method: 'GET'
});


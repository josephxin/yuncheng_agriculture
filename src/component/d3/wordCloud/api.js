import { post, get, publicPost } from './http.js';
export const api = {
    //病虫害
    selectGroupName(params,callBack){
        return post('wfsm/selectGroupName',params);
        //callBack(data.salesTrendBar);
    },
    //品种结构分析
    varietyStructure(params,callBack){
        return post('wfpm/breed_structure',params);
        //callBack(data.salesTrendBar);
    },
	//品种树状数据
	varietiesTree() {
		return publicPost('producttype/getTree', {
			rootId: '',
			keyword: ''
		})
	},
	//沃土指数
	fertileSoilIndex(params, callBack) {
		return post('wfpm/fertile_soil', params);
		//callBack(data.sellingPrice);
	},
	//种植面积走势
	plantAreaIndex(params, callBack) {
		return post('wfsm/selectPlantArea', params);
	},
	
	//种植面积走势-弹窗
	plantAreaIndex1(params, callBack) {
		return post('wfpm/plantArea_outputTrend', params);
	},
	//采收量与收入监测预警
	harvestingAndIncome(params, callBack) {
		return post('wfpm/gis_recovery_income', params);
	},
	//成本分析
	costAnalysis(params, callBack) {
		return post('wfpm/plant_calculator', params);
	},
	//每亩每茬每珠产量
	outputUnit(params, callBack) {
		return post('wfpm/output_unit', params);
	},
	
	//产量走势
	yieldTrend(params, callBack) {
		return post('wfsm/selectOutputTrend', params);
	},
	//三品一标统计
	selectThreeOne(params, callBack) {
		return post('wfsm/selectThreeOne', params);
	},
	//实时交易信息
	TradeMessage3(params, callBack) {
		return post('wffb/today_trading_list', params);
	},
	//各区县沃土指数
	districtAndCountyFertileSoil(params, callBack) {
		return post('wfpm/fertile_soil_region', params);
	},
	//农村劳动生产力
	selectWfSmRuralLaborers(params, callBack) {
		return post('wfsm/selectWfSmRuralLaborers', params);
	},
}
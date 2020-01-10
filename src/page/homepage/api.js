
import {post,get} from '../../component/http/httpHome';
export const api =  {
    //图片接口
    imgList(params,callBack){
        return post('wfqy/Hxpic/list',params);
    },
    //数据库价格最大的日期
    maxDate(params,callBack){
        return get('wffb/maxDate',params);
    },
    //品种、
    getTree(params,callBack){
        return post('dic/producttype/getTree',params);
    },
    //中间地图
    wfQyHxnpList1(params,callBack){
        return post('wfqy/Hxnp/WfQyHxnpList',params);
    },
    //中间地图
    plantingDistribution(params,callBack){
        return post('wfpm/plant_distribution_coord',params);
    },
    //品牌农品
    ppnpList(params,callBack){
        return post('wfqy/ppnp/List',params);
        //callBack(data.salesTrendBar);
    },
    //品牌农品详情
    ppnpDet(params,callBack){
        return post('wfqy/ppnp/info',params);
        //callBack(data.salesTrendBar);
    },
    //品种结构分析
    varietyStructure(params,callBack){
        return post('wfpm/breed_structure',params);
        //callBack(data.salesTrendBar);
    },
    //品种结构分析Top10
    varietyStructureTop10(params,callBack){
        return post('wfpm/breed_area_ranking',params);
    },
    //平台数据流向
    selectDataFlow(params,callBack){
        return post('wfsm/selectDataFlow',params);
    },
    //产业结构分析
    selectIndustrStructure(params,callBack){
        return post('wfsm/selectIndustrStructure',params);
    },
    //三品一标统计
    selectThreeOne(params,callBack){
        return post('wfsm/selectThreeOne',params);
    },
    //质量安全综合指数
    selectCompreIndex(params,callBack){
        return post('wfsm/selectCompreIndex',params);
    },
    //种植面积走势
    plantAreaIndex(params,callBack){
        return post('wfsm/selectPlantArea',params);
    },
    //产量走势
    yieldTrend(params,callBack){
        return post('wfsm/selectOutputTrend',params);
    },
    //农产品交易量和价格走势
    selectDealPrice(params,callBack){
        return post('wfsm/selectDealPrice',params);
    },
    //农产品价格走势
    selectPriceTrend(params,callBack){
        return post('wfsm/selectPriceTrend',params);
    },
    //农产品销售全国流向
    selectSaleDirection(params,callBack){
        return post('wfsm/selectSaleDirection',params);
    },
    //农产品进出口贸易流向
    selectWfSmAnalysisTrade(params,callBack){
        return post('wfsm/selectWfSmAnalysisTrade',params);
    },
    //质量安全合格率
    selectPercentPass(params,callBack){
        return post('wfsm/selectPercentPass',params);
    },
    //词云
    selectHotWord(params,callBack){
        return post('wfsm/selectHotWord',params);
    },
    //病虫害上报分析
    selectInsectPests(params,callBack){
        return post('wfsm/selectInsectPests',params);
    },
    //病虫害上报列表
    TradeMessage3(params,callBack){
        return post('wfsm/selectRegionName',params);
    },
    //全部品种
    allVarieties(params,callBack){
        return post('dic/producttype/getTree',params);
    },
    // 园区数量、地标数量、品牌数量
    getThreeNum(params,callBack){
        return post('wfqy/Hxindex/list',params);
    },
    // 企业数量
    getCompanyNum(params,callBack){
        return post('wfcs/selectRegionCompany',params);
    },
    // 大棚数量
    getDpNum(params,callBack){
        return post('wfpm/gis_greenhouse_count',params);
    },
    // 物联网数量
    getIOTNum(params,callBack){
        return post('wfqy/Hxindex/greenhouse_IoT_count',params);
    },
    // 核心指标
    getAllNum(params,callBack){
        return post('wfqy/Hxindex/list',params);
    },
}

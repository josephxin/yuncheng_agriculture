import {post,get} from '../http/http';
export const areaApi =  {
    //区域特色
    areaFeatures(params,callBack){
        return post('wfqy/Areafeature/analysis_trade_date',params);
    }
}
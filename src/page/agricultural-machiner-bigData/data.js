import React from 'react';

export default{
  //饼图数据
  pieData: {
    unit: '条',
    colorArr: ['#0297ff', '#00cfff', '#2bfdb6', '#28dd5f', '#fffd04', '#20fd40'],
    seriesData: [{
      value: 0,
      name: '无'
    }
    ]
  },
  //设备下拉框数据
  listSelect:['耕整机械','种植施肥机械','植保机械','收获机械','运送机械'],
  //地图列表
  tableList:{
    "code" : 0,
    "message" : "请求处理成功",
    "content" : {
      "pageable" : true,
      "pageNum" : 1,
      "pageSize" : 15,
      "totalCount" : 1775,
      "totalPage" : 119,
      "list" : [{
        "service_point_name": "张三",
        "person": null,
        "latitude": "111.028",
        "longitude": "111.028"
      }]
      }
    }
}

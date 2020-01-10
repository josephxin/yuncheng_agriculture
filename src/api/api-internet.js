/**
 * Created by joseph_xin on 2019/12/26.
 */
import builder from './api-common';

//物联网-左侧统计
export const selectStatistic = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/internetStatistics/selectStatistic',
  method: 'GET',
});



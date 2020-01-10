import React, {Component} from 'react';
import echarts from 'echarts';

import worldJson from './world.json';

import Geo from './geo/geo';

class WorldMap extends Component {

  constructor(props) {
    super(props);
    let me = this;

    me.mapLayoutSize = me.props.layoutSize || '150%';
    me.mapLabelFontSize = 8;
    me.mapType = 'world';
    me.mapAspectScale = me.props.mapAspectScale || 0.9;

    me.geo = new Geo({
      mapLayoutSize: '150%',//
      mapAspectScale: '0.9',//和mapLayoutSize配合控制地图大小
      center: ['47%', '52%'],//地图位置
      mapType: 'world',//哪个城市的地图
      area1Color: '#074487',//下层颜色
      area1BorderColor: '#16548c',//下层边框颜色
      area1BorderWidth: 1,//下层边框宽度
      geoSilent: true,//为true时不响应鼠标事件，false响应鼠标事件
      mapFontColor: '#88a7d4',//地图上文字颜色
      mapLabelFontSize: 8,//地图上文字大小
      area2Color: '#124ea9',
      area2BorderColor: '#3fadee',//上层边框颜色
      area2BorderWidth: 1,//上层边框宽度
      area2BorderHoverColor: '#3fadee',//鼠标移上去的边框颜色
      colorStart: '#124ea9',//鼠标移上地图颜色渐变的起点
      colorEnd: '#124ea9'//鼠标移上地图颜色渐变的终点,如果不需要渐变，两个颜色取值一样即可
    });
    me._randomValue = function () {
      return Math.round(Math.random() * 2000);
    };
    /*地图的区域颜色显示相关-初始数据*/
    me.initData = [
      /*{
        name: 'Afghanistan',
        value: 954
      },
      {
        name: 'Albania',
        value: 2337
      },
      {
        name: 'Algeria',
        value: 6454
      },
      {
        name: 'Andorra',
        value: 339
      },
      {
        name: 'Angola',
        value: 387
      },
      {
        name: 'Antigua and Barbuda',
        value: 58
      },
      {
        name: 'Argentina',
        value: 84119
      },
      {
        name: 'Armenia',
        value: 5154
      },
      {
        name: 'Australia',
        value: 1515
      },
      {
        name: 'Austria',
        value: 42258
      },
      {
        name: 'Azerbaijan',
        value: 11126
      },
      {
        name: 'Bahamas',
        value: 562
      },
      {
        name: 'Bahrain',
        value: 1339
      },
      {
        name: 'Bangladesh',
        value: 6038
      },
      {
        name: 'Barbados',
        value: 127
      },
      {
        name: 'Belarus',
        value: 29880
      },
      {
        name: 'Belgium',
        value: 36472
      },
      {
        name: 'Belize',
        value: 38
      },
      {
        name: 'Benin',
        value: 37
      },
      {
        name: 'Bhutan',
        value: 114
      },
      {
        name: 'Bolivia',
        value: 0
      },
      {
        name: 'Bosnia and Herzegovina',
        value: 2952
      },
      {
        name: 'Botswana',
        value: 418
      },
      {
        name: 'Brazil',
        value: 15950
      },
      {
        name: 'Brunei',
        value: 596
      },
      {
        name: 'Bulgaria',
        value: 12263
      },
      {
        name: 'Burkina Faso',
        value: 768
      },
      {
        name: 'Burundi',
        value: 158
      },
      {
        name: 'Cambodia',
        value: 2019
      },
      {
        name: 'Cameroon',
        value: 560
      },
      {
        name: 'Canada',
        value: 14589
      },
      {
        name: 'Cape Verde',
        value: 139
      },
      {
        name: 'Cayman Islands',
        value: 120
      },
      {
        name: 'Central African Republic',
        value: 22
      },
      {
        name: 'Chad',
        value: 78
      },
      {
        name: 'Chile',
        value: 57791
      },
      {
        name: 'China',
        value: 28914
      },
      {
        name: 'Colombia',
        value: 65307
      },
      {
        name: 'Comoros',
        value: 17
      },
      {
        name: 'Costa Rica',
        value: 6321
      },
      {
        name: 'Côte d’Ivoire',
        value: 7
      },
      {
        name: 'Croatia',
        value: 10749
      },
      {
        name: 'Cuba',
        value: 1452
      },
      {
        name: 'Cyprus',
        value: 1972
      },
      {
        name: 'Czech Republic',
        value: 37753
      },
      {
        name: 'Democratic Republic of the Congo',
        value: 185
      },
      {
        name: 'Denmark',
        value: 31438
      },
      {
        name: 'Djibouti',
        value: 88
      },
      {
        name: 'Dominica',
        value: 27
      },
      {
        name: 'Dominican Republic',
        value: 3055
      },
      {
        name: 'East Timor',
        value: 111
      },
      {
        name: 'Ecuador',
        value: 13014
      },
      {
        name: 'Egypt',
        value: 23246
      },
      {
        name: 'El Salvador',
        value: 1720
      },
      {
        name: 'Equatorial Guinea',
        value: 33
      },
      {
        name: 'Eritrea',
        value: 16
      },
      {
        name: 'Estonia',
        value: 9639
      },
      {
        name: 'Ethiopia',
        value: 1684
      },
      {
        name: 'Fiji',
        value: 300
      },
      {
        name: 'Finland',
        value: 15998
      },
      {
        name: 'France',
        value: 177825
      },
      {
        name: 'French Guiana',
        value: 525
      },
      {
        name: 'Gabon',
        value: 187
      },
      {
        name: 'Georgia',
        value: 13508
      },
      {
        name: 'Germany',
        value: 98405
      },
      {
        name: 'Ghana',
        value: 3567
      },
      {
        name: 'Greece',
        value: 19405
      },
      {
        name: 'Grenada',
        value: 33
      },
      {
        name: 'Guatemala',
        value: 5348
      },
      {
        name: 'Guinea',
        value: 179
      },
      {
        name: 'Guyana',
        value: 147
      },
      {
        name: 'Haiti',
        value: 488
      },
      {
        name: 'Honduras',
        value: 1214
      },
      {
        name: 'Hungary',
        value: 38449
      },
      {
        name: 'Iceland',
        value: 5996
      },
      {
        name: 'India',
        value: 38112
      },
      {
        name: 'Indonesia',
        value: 39681
      },
      {
        name: 'Iran',
        value: 55319
      },
      {
        name: 'Iraq',
        value: 1435
      },
      {
        name: 'Israel',
        value: 9408
      },
      {
        name: 'Italy',
        value: 45691
      },
      {
        name: 'Jamaica',
        value: 582
      },
      {
        name: 'Japan',
        value: 29417
      },
      {
        name: 'Jordan',
        value: 10140
      },
      {
        name: 'Kazakhstan',
        value: 5231
      },
      {
        name: 'Kenya',
        value: 7015
      },
      {
        name: 'Kiribati',
        value: 0
      },
      {
        name: 'Kuwait',
        value: 2027
      },
      {
        name: 'Kyrgyzstan',
        value: 3926
      },
      {
        name: 'Laos',
        value: 334
      },
      {
        name: 'Latvia',
        value: 17323
      },
      {
        name: 'Lebanon',
        value: 6278
      },
      {
        name: 'Lesotho',
        value: 85
      },
      {
        name: 'Liberia',
        value: 200
      },
      {
        name: 'Libya',
        value: 841
      },
      {
        name: 'Liechtenstein',
        value: 86
      },
      {
        name: 'Lithuania',
        value: 18099
      },
      {
        name: 'Luxembourg',
        value: 2415
      },
      {
        name: 'Madagascar',
        value: 641
      },
      {
        name: 'Malawi',
        value: 134
      },
      {
        name: 'Malaysia',
        value: 30314
      },
      {
        name: 'Maldives',
        value: 867
      },
      {
        name: 'Mali',
        value: 347
      },
      {
        name: 'Malta',
        value: 191
      },
      {
        name: 'Marshall Islands',
        value: 18
      },
      {
        name: 'Mauritania',
        value: 306
      },
      {
        name: 'Mauritius',
        value: 507
      },
      {
        name: 'Mexico',
        value: 68285
      },
      {
        name: 'Micronesia',
        value: 0
      },
      {
        name: 'Moldova',
        value: 6078
      },
      {
        name: 'Monaco',
        value: 650
      },
      {
        name: 'Mongolia',
        value: 3412
      },
      {
        name: 'Montenegro',
        value: 1034
      },
      {
        name: 'Morocco',
        value: 9067
      },
      {
        name: 'Mozambique',
        value: 463
      },
      {
        name: 'Myanmar',
        value: 5
      },
      {
        name: 'Namibia',
        value: 731
      },
      {
        name: 'Nauru',
        value: 4
      },
      {
        name: 'Nepal',
        value: 7792
      },
      {
        name: 'Netherlands ',
        value: 33891
      },
      {
        name: 'New Zealand',
        value: 6324
      },
      {
        name: 'Nicaragua',
        value: 1293
      },
      {
        name: 'Niger',
        value: 92
      },
      {
        name: 'Nigeria',
        value: 657
      },
      {
        name: 'North Korea',
        value: 81
      },
      {
        name: 'Norway',
        value: 16429
      },
      {
        name: 'Oman',
        value: 3783
      },
      {
        name: 'Pakistan',
        value: 7578
      },
      {
        name: 'Palau',
        value: 12
      },
      {
        name: 'Palestine',
        value: 9401
      },
      {
        name: 'Panama',
        value: 4336
      },
      {
        name: 'Papua New Guinea',
        value: 67
      },
      {
        name: 'Paraguay',
        value: 3525
      },
      {
        name: 'Peru',
        value: 28885
      },
      {
        name: 'Philippines',
        value: 16572
      },
      {
        name: 'Poland',
        value: 63685
      },
      {
        name: 'Portugal',
        value: 17088
      },
      {
        name: 'Puerto Rico',
        value: 3190
      },
      {
        name: 'Qatar',
        value: 6473
      },
      {
        name: 'Republic of Ireland',
        value: 29279
      },
      {
        name: 'Republic of Macedonia',
        value: 3593
      },
      {
        name: 'Republic of the Congo',
        value: 162
      },
      {
        name: 'Romania',
        value: 19458
      },
      {
        name: 'Russia',
        value: 154085
      },
      {
        name: 'Rwanda',
        value: 689
      },
      {
        name: 'Saint Kitts and Nevis',
        value: 154
      },
      {
        name: 'Saint Lucia',
        value: 33
      },
      {
        name: 'Saint Vincent and the Grenadines',
        value: 24
      },
      {
        name: 'Samoa',
        value: 31
      },
      {
        name: 'San Marino',
        value: 84
      },
      {
        name: 'São Tomé and Príncipe',
        value: 37
      },
      {
        name: 'Saudi Arabia',
        value: 6586
      },
      {
        name: 'Senegal',
        value: 1132
      },
      {
        name: 'Serbia',
        value: 12309
      },
      {
        name: 'Seychelles',
        value: 83
      },
      {
        name: 'Sierra Leone',
        value: 165
      },
      {
        name: 'Singapore',
        value: 52852
      },
      {
        name: 'Slovakia',
        value: 9633
      },
      {
        name: 'Slovenia',
        value: 8836
      },
      {
        name: 'Solomon Islands',
        value: 19
      },
      {
        name: 'Somaliland',
        value: 69
      },
      {
        name: 'South Africa',
        value: 2893
      },
      {
        name: 'South Korea',
        value: 65451
      },
      {
        name: 'South Sudan',
        value: 74
      },
      {
        name: 'Spain',
        value: 74898
      },
      {
        name: 'Sri Lanka',
        value: 126
      },
      {
        name: 'Sudan',
        value: 1354
      },
      {
        name: 'Suriname',
        value: 239
      },
      {
        name: 'Swaziland',
        value: 52
      },
      {
        name: 'Sweden',
        value: 23275
      },
      {
        name: 'Switzerland',
        value: 6157
      },
      {
        name: 'Syria',
        value: 1478
      },
      {
        name: 'Taiwan',
        value: 43349
      },
      {
        name: 'Tajikistan',
        value: 1053
      },
      {
        name: 'United Republic of Tanzania',
        value: 2
      },
      {
        name: 'Thailand',
        value: 31575
      },
      {
        name: 'The Gambia',
        value: 661
      },
      {
        name: 'Togo',
        value: 1003
      },
      {
        name: 'Tonga',
        value: 24
      },
      {
        name: 'Trinidad and Tobago',
        value: 697
      },
      {
        name: 'Tunisia',
        value: 13362
      },
      {
        name: 'Turkey',
        value: 34777
      },
      {
        name: 'Turkmenistan',
        value: 673
      },
      {
        name: 'Turks and Caicos',
        value: 21
      },
      {
        name: 'Tuvalu',
        value: 0
      },
      {
        name: 'Uganda',
        value: 3233
      },
      {
        name: 'Ukraine',
        value: 28
      },
      {
        name: 'United Arab Emirates',
        value: 6440
      },
      {
        name: 'United Kingdom',
        value: 152340
      },
      {
        name: 'United States of America',
        value: 30265
      },
      {
        name: 'Uruguay',
        value: 15495
      },
      {
        name: 'Uzbekistan',
        value: 3659
      },
      {
        name: 'Vanuatu',
        value: 75
      },
      {
        name: 'Vatican City',
        value: 29
      },
      {
        name: 'Venezuela',
        value: 9691
      },
      {
        name: 'Vietnam',
        value: 25084
      },
      {
        name: 'Western Sahara',
        value: 103
      },
      {
        name: 'Yemen',
        value: 383
      },
      {
        name: 'Zambia',
        value: 386
      },
      {
        name: 'Zimbabwe',
        value: 520
      }*/


      //{name:'南苏丹',value:0},
      //{name:'索马里兰',value:0},
      //{name:'黑山',value:0},
      //{name:'科索沃',value:0},
      //{name:'塞尔维亚',value:0},
    ];

/*    me.state = {
      data: me.initData.slice()
    };*/

  }

  _setData(d) {
    let me = this;
    me._flag = true;
    me.setState({
      data: d.slice()
    });
    //console.log(d);
    //console.log(me.state.data)
   me._echartsInstance = echarts.init(me.refs.worldMapRef);
    let initData = me.state.data;
    me._initEchartsOption(initData);
  }

  _flag = false;
  _tooltipTimer = null;
  _echartsInstance = undefined;
  _defaultAreaIndex = -1;


  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      let scatterData = me.state.data.slice();
      me._initEchartsOption(scatterData);
      me._flag = false;
    }
  }

  _initEchartsOption(data) {
    let me = this;
    let geoCoordMapPro = {
      '潍坊': [119.168378, 36.712652],
        '阿富汗': [69.11,34.28],
        '日本': [139.66,35.79],
        '阿尔巴尼亚': [19.49,41.18],
        '阿尔及利亚': [3.08,36.42],
        '美属萨摩亚': [-170.43,-14.16],
        '安道&#8203;&#8203;尔': [1.32,42.31],
        '安哥拉': [13.15,-8.50],
        '安提瓜和巴布达': [-61.48,17.20],
        '阿根廷': [-60.00,-36.30],
        '亚美尼亚': [44.31,40.10],
        '阿鲁巴': [-70.02,12.32],
        '澳大利亚': [149.08,-35.15],
        '奥地利': [16.22,48.12],
        '阿塞拜疆': [49.56,40.29],
        '巴哈马': [-77.20,25.05],
        '巴林': [50.30,26.10],
        '孟加拉国': [90.26,23.43],
        '巴巴多斯': [-59.30,13.05],
        '白俄罗斯': [27.30,53.52],
        '比利时': [4.21,50.51],
        '伯利兹': [-88.30,17.18],
        '贝宁': [2.42,6.23],
        '不丹': [89.45,27.31],
        '玻利维亚': [-68.10,-16.20],
        '波斯尼亚和黑塞哥维那': [18.26,43.52],
        '博茨瓦纳': [25.57,-24.45],
        '巴西': [-47.55,-15.47],
        '英属维尔京群岛': [-64.37,18.27],
        '文莱': [115.00,4.52],
        '保加利亚': [23.20,42.45],
        '布基纳法索': [-1.30,12.15],
        '布隆迪': [29.18,-3.16],
        '柬埔寨': [104.55,11.33],
        '喀麦隆': [11.35,3.50],
        '加拿大': [-75.42,45.27],
        '佛得角': [-23.34,15.02],
        '开曼群岛': [-81.24,19.20],
        '中非共和国': [18.35,4.23],
        '乍得': [14.59,12.10],
        '智利': [-70.40,-33.24],
        '中国': [116.20,39.55],
        '哥伦比亚': [-74.00,4.34],
        '科摩罗': [43.16,-11.40],
        '刚果': [15.12,-4.09],
        '哥斯达黎加': [-84.02,9.55],
        '科特迪瓦': [-5.17,6.49],
        '克罗地亚': [15.58,45.50],
        '古巴': [-82.22,23.08],
        '塞浦路斯': [33.25,35.10],
        '捷克共和国': [14.22,50.05],
        '朝鲜': [125.30,39.09],
        '刚果(扎伊尔)': [15.15,-4.20],
        '丹麦': [12.34,55.41],
        '吉布提': [42.20,11.08],
        '多米尼加': [-61.24,15.20],
        '多米尼加共和国': [-69.59,18.30],
        '东帝汶': [125.34,-8.29],
        '厄瓜多尔': [-78.35,-0.15],
        '埃及': [31.14,30.01],
        '萨尔瓦多': [-89.10,13.40],
        '赤道几内亚': [8.50,3.45],
        '厄立特里亚': [38.55,15.19],
        '爱沙尼亚': [24.48,59.22],
        '埃塞俄比亚': [38.42,9.02],
        '福克兰群岛(马尔维纳斯群岛)': [-59.51,-51.40],
        '法罗群岛': [-6.56,62.05],
        '斐济': [178.30,-18.06],
        '芬兰': [25.03,60.15],
        '法国': [2.20,48.50],
        '法属圭亚那': [-52.18,5.05],
        '法属波利尼西亚': [-149.34,-17.32],
        '加蓬': [9.26,0.25],
        '冈比亚': [-16.40,13.28],
        '格鲁吉亚': [44.50,41.43],
        '德国': [13.25,52.30],
        '加纳': [-0.06,5.35],
        '希腊': [23.46,37.58],
        '格陵兰': [-51.35,64.10],
        '瓜德罗普岛': [-61.44,16.00],
        '危地马拉': [-90.22,14.40],
        '根西岛': [-2.33,49.26],
        '几内亚': [-13.49,9.29],
        '几内亚比绍': [-15.45,11.45],
        '圭亚那': [-58.12,6.50],
        '海地': [-72.20,18.40],
        '赫德岛和麦当劳群岛': [74.00,-53.00],
        '洪都拉斯': [-87.14,14.05],
        '匈牙利': [19.05,47.29],
        '冰岛': [-21.57,64.10],
        '印度': [77.13,28.37],
        '印度尼西亚': [106.49,-6.09],
        '伊朗': [51.30,35.44],
        '伊拉克': [44.30,33.20],
        '爱尔兰': [-6.15,53.21],
        '以色列': [35.12,31.47],
        '意大利': [12.29,41.54],
        '牙买加': [-76.50,18.00],
        '约旦': [35.52,31.57],
        '哈萨克斯坦': [71.30,51.10],
        '肯尼亚': [36.48,-1.17],
        '基里巴斯': [173.00,1.30],
        '科威特': [48.00,29.30],
        '吉尔吉斯斯坦': [74.46,42.54],
        '老挝': [102.36,17.58],
        '拉脱维亚': [24.08,56.53],
        '黎巴嫩': [35.31,33.53],
        '莱索托': [27.30,-29.18],
        '利比里亚': [-10.47,6.18],
        '阿拉伯利比亚民众国': [13.07,32.49],
        '列支敦士登': [9.31,47.08],
        '立陶宛': [25.19,54.38],
        '卢森堡': [6.09,49.37],
        '马达加斯加': [47.31,-18.55],
        '马拉维': [33.48,-14.00],
        '马来西亚': [101.41,3.09],
        '马尔代夫': [73.28,4.00],
        '马里': [-7.55,12.34],
        '马耳他': [14.31,35.54],
        '马提尼克岛': [-61.02,14.36],
        '毛里塔尼亚': [57.30,-20.10],
        '马约特岛': [45.14,-12.48],
        '墨西哥': [-99.10,19.20],
        '密克罗尼西亚(联邦) ': [158.09,6.55],
        '摩尔多瓦共和国': [28.50,47.02],
        '莫桑比克': [32.32,-25.58],
        '缅甸': [96.20,16.45],
        '纳米比亚': [17.04,-22.35],
        '尼泊尔': [85.20,27.45],
        '荷兰': [4.54,52.23],
        '荷属安的列斯': [-69.00,12.05],
        '新喀里多尼亚': [166.30,-22.17],
        '新西兰': [174.46,-41.19],
        '尼加拉瓜': [-86.20,12.06],
        '尼日尔': [2.06,13.27],
        '尼日利亚': [7.32,9.05],
        '诺福克岛': [168.43,-45.20],
        '北马里亚纳群岛': [145.45,15.12],
        '挪威': [10.45,59.55],
        '阿曼': [58.36,23.37],
        '巴基斯坦': [73.10,33.40],
        '帕劳': [134.28,7.20],
        '巴拿马': [-79.25,9.00],
        '巴布亚新几内亚': [147.08,-9.24],
        '巴拉圭': [-57.30,-25.10],
        '秘鲁': [-77.00,-12.00],
        '菲律宾': [121.03,14.40],
        '波兰': [21.00,52.13],
        '葡萄牙': [-9.10,38.42],
        '波多黎各': [-66.07,18.28],
        '卡塔尔': [51.35,25.15],
        '韩国': [126.58,37.31],
        '罗马尼亚': [26.10,44.27],
        '俄罗斯': [37.35,55.45],
        '卢旺达': [30.04,-1.59],
        '圣基茨和尼维斯': [-62.43,17.17],
        '圣卢西亚': [-60.58,14.02],
        '圣皮埃尔和密克隆': [-56.12,46.46],
        '圣文森特和格林纳丁斯': [-61.10,13.10],
        '萨摩亚': [-171.50,-13.50],
        '圣马力诺': [12.30,43.55],
        '圣多美和普林西比': [6.39,0.10],
        '沙特阿拉伯': [46.42,24.41],
        '塞内加尔': [-17.29,14.34],
        '塞拉利昂': [-13.17,8.30],
        '斯洛伐克': [17.07,48.10],
        '斯洛文尼亚': [14.33,46.04],
        '所罗门群岛': [159.57,-9.27],
        '索马里': [45.25,2.02],
        '比勒陀利亚': [28.12,-25.44],
        '西班牙': [-3.45,40.25],
        '苏丹': [32.35,15.31],
        '苏里南': [-55.10,5.50],
        '斯威士兰': [31.06,-26.18],
        '瑞典': [18.03,59.20],
        '瑞士': [7.28,46.57],
        '阿拉伯叙利亚共和国': [36.18,33.30],
        '塔吉克斯坦': [68.48,38.33],
        '泰国': [100.35,13.45],
        '马其顿': [21.26,42.01],
        '多哥': [1.20,6.09],
        '汤加': [-174.00,-21.10],
        '突尼斯': [10.11,36.50],
        '土耳其': [32.54,39.57],
        '土库曼斯坦': [57.50,38.00],
        '图瓦卢': [179.13,-8.31],
        '乌干达': [32.30,0.20],
        '乌克兰': [30.28,50.30],
        '阿联酋': [54.22,24.28],
        '英国': [-0.05,51.36],
        '坦桑尼亚': [35.45,-6.08],
        '美国': [-77.02,39.91],
        '美属维尔京群岛': [-64.56,18.21],
        '乌拉圭': [-56.11,-34.50],
        '乌兹别克斯坦': [69.10,41.20],
        '瓦努阿图': [168.18,-17.45],
        '委内瑞拉': [-66.55,10.30],
        '越南': [105.55,21.05],
        '南斯拉夫': [20.37,44.50],
        '赞比亚': [28.16,-15.28],
        '津巴布韦': [31.02,-17.43]
    };
    let effectScatterData = [];
    let linesData = [];
    let centerCity = {
      name: '潍坊',
      value: geoCoordMapPro['潍坊'].concat(1),
      symbol: 'circle',
      symbolSize: [8, 7]
    };
    effectScatterData.push(centerCity);
    for (let i in geoCoordMapPro) {
      data.forEach(function (item, index) {
        if (item.name.indexOf(i) > -1) {

          if (geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
            linesData.push({fromName: i, toName: centerCity.name, all: item, coords: item.flow?[geoCoordMapPro[i], geoCoordMapPro[centerCity.name]] : [geoCoordMapPro[centerCity.name],geoCoordMapPro[i]]});
          }
          if (i && geoCoordMapPro[i]) {
            effectScatterData.push({name: i, value: geoCoordMapPro[i].concat(item.value), all: item, symbol: 'circle', symbolSize: [7, 5]});
          }
        }
      });
    }


    let option = {
      tooltip: {
        show: true
      },
      geo: me.geo.geo,
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'world',
          geoIndex: 1,
          z: 2,
          zlevel: 2,
          label: {
            normal: {
              show: true,
              color: '#fff',
              fontSize: 22
            },
            emphasis: {
              show: true,
              color: '#fff',
              fontSize: 22
            }
          },
          tooltip: {
            show: false
          },
          data: me.initData.slice()
        },
        {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          z: 3,
          symbol: 'circle',
          //symbolOffset: [0, -18],
          itemStyle: {
            normal: {
              color: '#fefa92'
            }
          },
          rippleEffect: {
            period: 12,
            scale: 2.5,
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              color: '#fff'
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: function (d) {
              if (d.data.all) {
                return d.marker + d.data.all.name;
              } else {
                return d.marker + d.name;
              }
            }
          },
          data: effectScatterData
        }, {
          name: '',
          type: 'lines',
          zlevel: 4,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: '#22ff7f',
              width: 0,
              curveness: 0.2
            }
          },
          tooltip: {
            show: false,
            trigger: 'item'
          },
          data: linesData
        },
        {
          name: '',
          type: 'lines',
          zlevel: 5,
          symbol: ['none', 'none'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.2,
            symbol: 'roundRect',
            symbolSize: [3, 8]
          },
          lineStyle: {
            normal: {
              color: '#22ff7f',
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          tooltip: {
            show: false,
            trigger: 'item'
          },
          data: linesData
        }
      ]
    };
    me._echartsInstance.showLoading();
    echarts.registerMap('world', worldJson);
    me._echartsInstance.hideLoading();
    me._echartsInstance.setOption(option, true);

  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me.refs.worldMapRef);
    let initData = [
      {
        name: '尼日利亚',
        value: me._randomValue()
      }, {
        name: '澳大利亚悉尼',
        value: me._randomValue()
      }, {
        name: '美国芝加哥',
        value: me._randomValue()
      }, {
        name: '英国曼彻斯特',
        value: me._randomValue()
      }, {
        name: '墨西哥',
        value: me._randomValue()
      }, {
        name: '哈萨克斯坦阿拉木图',
        value: me._randomValue()
      }, {
        name: '巴西',
        value: me._randomValue()
      }, {
        name: '澳大利亚墨尔本',
        value: me._randomValue()
      }
    ];
    me._initEchartsOption(initData);


  }


  componentWillUnmount() {
    let me = this;
    if (me._echartsInstance) {
      me._echartsInstance.dispose();
      me._echartsInstance = undefined;
    }
  }


  render() {
    let me = this;
    return (
      <div style={me.props.style}>
        <div ref='worldMapRef' style={me.props.style}>
        </div>
      </div>
    );
  }
}

export default WorldMap;

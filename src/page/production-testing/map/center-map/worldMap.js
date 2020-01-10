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
      '潍坊': [119.033727, 36.733087],
      '尼日利亚': [-4.388361, 11.186148],
      '美国洛杉矶': [-118.24311, 34.052713],
      '香港邦泰': [114.195466, 22.282751],
      '美国芝加哥': [-87.801833, 41.870975],
      '加纳库马西': [-4.62829, 7.72415],
      '英国曼彻斯特': [-1.657222, 51.886863],
      '德国汉堡': [10.01959, 54.38474],
      '哈萨克斯坦阿拉木图': [45.326912, 41.101891],
      '俄罗斯伊尔库茨克': [89.116876, 67.757906],
      '巴西': [-48.678945, -10.493623],
      '埃及达米埃塔': [31.815593, 31.418032],
      '西班牙巴塞罗纳': [2.175129, 41.385064],
      '柬埔寨金边': [104.88659, 11.545469],
      '意大利米兰': [9.189948, 45.46623],
      '乌拉圭蒙得维的亚': [-56.162231, -34.901113],
      '莫桑比克马普托': [32.608571, -25.893473],
      '阿尔及利亚阿尔及尔': [3.054275, 36.753027],
      '阿联酋迪拜': [55.269441, 25.204514],
      '匈牙利布达佩斯': [17.108519, 48.179162],
      '澳大利亚悉尼': [150.993137, -33.675509],
      '美国加州': [-121.910642, 41.38028],
      '澳大利亚墨尔本': [144.999416, -37.781726],
      '墨西哥': [-99.094092, 19.365711],
      '加拿大温哥华': [-123.023921, 49.311753]
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
      let effectScatter = {};
      let lines = {};
      data.forEach(function (item, index) {
        if (item.name.indexOf(i) > -1) {
          // console.log(item);
          effectScatter.name = i;
          effectScatter.value = geoCoordMapPro[i].concat(item.value);
          effectScatter.all = item;
          effectScatter.symbol = 'circle';
          effectScatter.symbolSize = [7, 5];

          lines.fromName = i;
          lines.toName = centerCity.name;
          lines.all = item;
          lines.coords = [geoCoordMapPro[i], geoCoordMapPro[centerCity.name]];

          if (geoCoordMapPro[i] && geoCoordMapPro[centerCity.name]) {
            linesData.push(lines);
          }
        }
      });
      if (effectScatter.name && geoCoordMapPro[effectScatter.name]) {
        effectScatterData.push(effectScatter);
      }

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

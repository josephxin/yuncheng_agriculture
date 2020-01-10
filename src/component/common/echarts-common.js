/*=======↓↓↓↓======== 通用方法 =======↓↓↓↓=========*/

// 两个简单方法
export const objAssign = Object.assign;
export const isArray = Array.isArray;
export const isUndefined = v => v === undefined;

// 数组最大值
export const maxValueArr = arr => Math.max(...arr);
// 数组去重
export const uniqueArr = arr => Array.from(new Set(arr));
// 获取最大值的某个倍数，用于y轴的最大值
export const getMaxValue = (arr, k = 1.5) => {
  if (arr[0] instanceof Array) {
    // 二维数组找最大值
    return getMaxValue(arr.map(v => getMaxValue(v, k)), k);
  } else {
    arr = uniqueArr(arr);
    arr = arr.filter(d => !isNaN(d));
    if (arr.length === 1) return arr[0];
    let tempMax = maxValueArr(arr);
    // console.log(tempMax);
    // if (!Number.isFinite(tempMax)) return 0;
    if (tempMax <= 1) return 1;
    if (tempMax <= 5) return 5;
    if (tempMax <= 10) return 10;
    if (tempMax % 5 === 0) return tempMax;
    return Math.round(tempMax / 10) * 10 * k;
  }
};

/**
 * copy Object
 * 不copy的属性值：undefined，null
 * @param target 不能是undefined
 * @param source
 * @param deepFlag
 * @returns {*}
 */
const objKeys = Object.keys;
export const copyObj = (target, source, deepFlag) => {
  // source === undefined 或 {} 时，不进行copy
  if (source === undefined || objKeys(source).length === 0) return;
  // target === undefined 时，抛出错误
  if (target === undefined) throw new Error('Target is undefined!');

  // 分两个循环，数组从两头进行汇合
  let sourceKeys = objKeys(source);
  let sourceKeysLength = sourceKeys.length;
  let sourceKeysHalfLength = Math.ceil(sourceKeysLength / 2);
  sourceKeysHalfLength = sourceKeysHalfLength < 1 ? 1 : sourceKeysHalfLength;

  for (let i = 0, j = sourceKeysLength - 1; i <= sourceKeysHalfLength; i++, j--) {
    let key1 = sourceKeys[i], key2 = sourceKeys[j];
    let s1 = source[key1], s2 = source[key2];
    if ((typeof s1 === 'boolean') || s1) valuesExchange(target, key1, s1, deepFlag);
    if ((typeof s2 === 'boolean') || s2) valuesExchange(target, key2, s2, deepFlag);
  }
  return target;
};

function valuesExchange(target, key, s, deepFlag) {
  if (s instanceof Array) {
    target[key] = s;
  } else if (typeof s !== 'string' && objKeys(s).length > 0 && deepFlag) {
    target[key] = target[key] === undefined ? {} : target[key];
    copyObj(target[key], s, deepFlag);
  } else {
    target[key] = s;
  }
}


/*========↑↑↑↑======= 通用方法 ========↑↑↑↑========*/


/*======↓↓↓↓========= ECharts方法 =======↓↓↓↓=========*/
// 渐变色的方法
export const gradientLinearColor = (start = 'red', end = 'transparent', dir = 'toTop') => {
  const direction = {
    toTop: {x: 0.5, y: 0, x2: 0.5, y2: 1},
    toBottom: {x: 0.5, y: 1, x2: 0.5, y2: 0},
    toLeft: {x: 1, y: 0.5, x2: 0, y2: 0.5},
    toRight: {x: 0, y: 0.5, x2: 1, y2: 0.5},
  };
  const {x, y, x2, y2} = direction[dir];
  return {
    type: 'linear',
    x,
    y,
    x2,
    y2,
    colorStops: [
      {offset: 0, color: start},// 0% 处的颜色
      {offset: 1, color: end},// 100% 处的颜色
    ],
    globalCoord: false, // 缺省为 false
  }
};

// 一个ECharts单位组件
export const chartUnit = (chartInstance, unitStyle) => {
  unitStyle = unitStyle || {};
  let unitName = unitStyle.unitName || '';
  let fontSize = unitStyle.fontSize || 14;
  let unitPosition = unitStyle.unitPosition;
  let color=unitStyle.color || '#000';

  unitPosition = isUndefined(unitPosition) || unitPosition.length === 0
    ? ['top', undefined, undefined, 'left']
    : unitPosition.map(d => d === 0 ? undefined : d);

  chartInstance.setOption({
    graphic: [
      {
        type: 'text',
        z: 1000,
        top: unitPosition[0],
        right: unitPosition[1],
        bottom: unitPosition[2],
        left: unitPosition[3],
        cursor: 'default',
        style: {
          fill: color,
          text: unitName,
          font: `${fontSize}px Microsoft YaHei`
        }
      }
    ]
  });
};


import React from 'react';
export default {
	//地区下拉
	//regionSelect: ['寿光市', '潍城区', '奎文区', '寒亭区', '坊子区', '青州市', '诸城市', '安丘市', '高密市', '昌邑市', '昌乐县', '临朐县'],
	regionSelect: ['盐湖区', '永济市', '河津市', '稷山县', '新绛县', '万荣县', '闻喜县', '绛县', '临猗县', '夏县', '垣曲县', '芮城县', '平陆县'],
	//品种下拉
	varietySelect: [{
		value: '蔬菜',
		label: '蔬菜',
		children: [{
			value: '黄瓜',
			label: '黄瓜',
		}, {
			value: '西红柿',
			label: '西红柿',
		}, {
			value: '生姜',
			label: '生姜',
		},{
			value: '大蒜',
			label: '大蒜',
		}, {
			value: '大葱',
			label: '大葱',
		}, {
			value: '茄子',
			label: '茄子',
		}, {
			value: '辣椒',
			label: '辣椒',
		}, {
			value: '四季豆',
			label: '四季豆',
		}],
	}, {
		value: '水果',
		label: '水果',
		children: [{
			value: '苹果',
			label: '苹果',
		}, {
			value: '梨',
			label: '梨',
		}, {
			value: '樱桃',
			label: '樱桃',
		}],
	}, {
		value: '粮食',
		label: '粮食',
		children: [{
			value: '小麦',
			label: '小麦',
		}, {
			value: '玉米',
			label: '玉米',
		}, {
			value: '小米',
			label: '小米',
		}, {
			value: '黄豆',
			label: '黄豆',
		}],
	}, {
		value: '畜产品',
		label: '畜产品',
		children: [{
			value: '猪肉',
			label: '猪肉',
		}, {
			value: '牛肉',
			label: '牛肉',
		}, {
			value: '羊肉',
			label: '羊肉',
		}, {
			value: '鸡肉',
			label: '鸡肉',
		}],
	}]
}
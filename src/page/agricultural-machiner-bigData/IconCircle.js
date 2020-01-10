import React from 'react';
import IconCircle from './main';
import bg from './img/bg.png';
import gengzheng from './img/gengzheng.png';
import guoshu from './img/guoshu.png';
import liangyou from './img/liangyou.png';
import mianhua from './img/mianhua.png';
import shouhuo from './img/shouhuo.png';
import zhibao from './img/zhibao.png';
import zhongzhi from './img/zhongzhi.png';
import yunsong from './img/yunsong.png';

export default class Page extends React.Component {

	constructor() {
		super();
		this.data = [{
				name: '耕整机械',
				unit: '台',
				value: 0,
				url: gengzheng
			},
			{
				name: '运送机械',
				unit: '台',
				value: 0,
				url: yunsong
			},
			{
				name: '种植施肥机械',
				unit: '台',
				value: 0,
				url: zhongzhi
			},
			{
				name: '植保机械',
				unit: '台',
				value: 0,
				url: zhibao
			},
			{
				name: '棉花机械',
				unit: '台',
				value: 0,
				url: mianhua
			},
			{
				name: '粮油机械',
				unit: '台',
				value: 0,
				url: liangyou
			},
			{
				name: '收获机械',
				unit: '台',
				value: 0,
				url: shouhuo
			},
			{
				name: '果蔬机械',
				unit: '台',
				value: 0,
				url: guoshu
			},
		];
	}

	componentDidMount() {
		this.iconCircleRef.setData({
			data: this.data
		});
	}

	setData(d) {
		this.data.map((item, i) => {
			item.value = 0;
		});
		for(let i = 0; i < d.length; i++) {
			for(let j = 0; j < this.data.length; j++) {
				if(d[i].name == this.data[j].name) {
					this.data[j].value = d[i].value;
					break;
				}
			}
		}
		this.iconCircleRef.setData({
			data: this.data
		});
	}
	
	iconClick(e){
		if (typeof this.props.click == 'function') {
			this.props.click(e);
		}
	}
	
	render() {
		return(
			<div style={{
        width: 1487,
        height: 880,
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <div style={{
          width: 1487,
          height: 880,
          position: 'absolute',
          backgroundImage: `url(${bg})`,
          top: 0,
          left: 0
        }} />
        <IconCircle fontSize={18} ref={refs => this.iconCircleRef = refs} onClick={this.iconClick.bind(this)} />
      </div>
		)
	}
};
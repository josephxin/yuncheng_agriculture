import React from 'react';
import normal from '../banner/img/normal.png';
import select from '../banner/img/select.png';
import pic1 from '../disasterMonitoring/img/pic1.png';
import pic2 from '../disasterMonitoring/img/pic2.png';
import pic3 from '../disasterMonitoring/img/pic3.png';
import pic4 from '../disasterMonitoring/img/changePic1.png';
import pic5 from '../disasterMonitoring/img/changepic2.png';

import '../disasterMap/Map.css';
// 中间地图
import DisasterMonitoring from '../disasterMonitoring/DisasterMonitoring';

export default class Banner extends React.Component {
	constructor(props) {
		super(props);
		/**气象灾害，灾害类型菜单*/
		this.legendDataArr = [];
		/**气象灾害，数据菜单*/
		this.dataArr = [];
		/**气象灾害，灾害类型等级*/
		this.dataLevelArr = [];

		/**病虫灾害，灾害类型菜单*/
		this.bchMenuArr = [];
		/**病虫灾害，灾害数据*/
		this.bchDataArr = [];
		/**病虫灾害，灾害类型等级*/
		this.dataLevelBCArr = [];
		this.buttonStyle = {
			display: 'block',
			float: 'left',
			width: '118px',
			height: '38px',
			fontSize: '16px',
			lineHeight: '38px',
			textAlign: 'center',
			color: '#fff',
			cursor: 'pointer'
		};

		this.state = {
			arr: [select, normal],
			tooltipList: [],
			legendData: [{
				name: '低温冻害',
				img: pic1
			}, {
				name: '干旱灾害',
				img: pic2
			}, {
				name: '连阴雨灾害',
				img: pic3
			}],
			seriesData: [{
				name: '寿光市',
				value: [118.869857, 36.866079, 100],
				symbol: 'image://' + pic1
			}, {
				name: '安丘市',
				value: [119.113496, 36.323964, 100],
				symbol: 'image://' + pic2
			}, {
				name: '诸城市',
				value: [119.408931, 35.925824, 0],
				symbol: 'image://' + pic3
			}, {
				name: '临朐县',
				value: [118.458613, 36.432298, 0],
				symbol: 'image://' + pic3
			}, {
				name: '高密市',
				value: [119.800358, 36.335943, 0],
				symbol: 'image://' + pic1
			}],
			top: 412,
			disaType: '气象'
		}
	}

	handle1(dataMap) {
		/**处理数据结果*/
		/**气象灾害类型*/
		console.log(dataMap)
		if(this.legendDataArr.length <= 0) {
			this.legendDataArr = dataMap.zAiHaiCaiDan;
			for(var i = 0; i < this.legendDataArr.length; i++) {
				/*if(this.legendDataArr[i].value == 'pic1') {
					this.legendDataArr[i].value = pic1
				}*/
				/*if(this.legendDataArr[i].img != 'pic1' && this.legendDataArr[i].img != 'pic2' && this.legendDataArr[i].img != 'pic3') {
					this.legendDataArr[i].img = 'pic'+(i%2+1)+'.png';
				}*/
				//alert(require('../disasterMonitoring/img/'+this.legendDataArr[i].img) == null);
				this.legendDataArr[i].img = require('../disasterMonitoring/img/'+this.legendDataArr[i].img+".png");
			}
			/**给预警级别赋颜色*/
			this.dataLevelArr = dataMap.warningRegionList;
		}
		this.refs.disasterMonitoring.handle1(this.dataLevelArr);
		/**气象灾害坐标及位置*/
		console.log(this.dataArr);
		if(this.dataArr.length <= 0) {
			this.dataArr = dataMap.dataList == null ? [] : dataMap.dataList;
			for(var i = 0; i < this.dataArr.length; i++) {
				/*if(this.dataArr[i].pic == 'pic1') {
					this.dataArr[i].symbol = 'image://' + pic1
				}*/
				/*if(this.dataArr[i].pic != 'pic1' && this.dataArr[i].pic != 'pic2' && this.dataArr[i].pic != 'pic3') {
					this.dataArr[i].pic = 'pic'+(i%2+1)+'.png';
				}*/
				this.dataArr[i].symbol = 'image://' + require('../disasterMonitoring/img/'+this.dataArr[i].pic+".png");
				this.dataArr[i].name = this.dataArr[i].region;
				this.dataArr[i].value = [this.dataArr[i].lng, this.dataArr[i].lat, 100];
			}
		}
		this.setState({
			arr: [select, normal],
			tooltipList: [],
			legendData: this.legendDataArr,
			seriesData: this.dataArr,
			top: 412,
			disaType: '气象灾害'
		}, function () {
			console.log(this.state.disaType);
			this.props.getStete(this.state.disaType)
		});
	}

	handle2(dataMap) {
		/**处理数据结果*/
		/**病虫灾害类型*/
		console.log(dataMap);
		console.log(this.bchMenuArr);
		console.log(this.bchDataArr);
		if(this.bchMenuArr.length <= 0) {
			/**获取数据*/
			console.log(dataMap.灾害菜单集合);
			this.bchMenuArr = dataMap.灾害菜单集合;
			for(var i = 0; i < this.bchMenuArr.length; i++) {
				if(this.bchMenuArr[i].img == 'pic4') {
					this.bchMenuArr[i].img = pic4
				}
				if(this.bchMenuArr[i].img == 'pic5') {
					this.bchMenuArr[i].img = pic5
				}
			}
			/**给预警级别赋颜色*/
			this.dataLevelBCArr = dataMap.区域预警数据集合;
		}
		this.refs.disasterMonitoring.handle2(this.dataLevelBCArr);
		/**病虫灾害坐标及位置*/
		if(this.bchDataArr.length <= 0) {
			this.bchDataArr = dataMap.数据集合;
			for(var i = 0; i < this.bchDataArr.length; i++) {
				if(this.bchDataArr[i].灾害类型pic == 'pic4') {
					this.bchDataArr[i].symbol = 'image://' + pic4
				}
				if(this.bchDataArr[i].灾害类型pic == 'pic5') {
					this.bchDataArr[i].symbol = 'image://' + pic5
				}
				this.bchDataArr[i].name = this.bchDataArr[i].灾害区域;
				this.bchDataArr[i].value = [this.bchDataArr[i].经度, this.bchDataArr[i].纬度, 100];
				//alert(JSON.stringify(this.bchDataArr[i].value)+"---------"+this.bchDataArr[i].name+"---------"+this.bchDataArr[i].value);
			}
		}
		this.setState({
			arr: [normal, select],
			tooltipList: [],
			legendData: this.bchMenuArr,
			seriesData: this.bchDataArr,
			top: 440,
			disaType: '病虫害'
		}, function () {
			console.log(this.state.disaType);
			this.props.getStete(this.state.disaType)
		});
	}
	componentDidUpdate(){
		
	}

	render() {
		const legendData = this.state.legendData;
		const top = this.state.top;
		console.log(this.state.seriesData);
		return(
			<div>
				<div style={{
					width: '100%',
					height: '38px',
					position: 'absolute',
					top: 80,
					left: 300,
					zIndex: 10
					}}>
					<span ref={'num1'} onClick={this.handle1.bind(this)} style={{
						...this.buttonStyle,
						marginLeft: '15px',
						background: `url(${this.state.arr[0]}) no-repeat center`
					}}>气象灾害</span>
					<span ref={'num2'} onClick={this.handle2.bind(this)} style={{
						...this.buttonStyle,
						marginLeft: '20px',
						background: `url(${this.state.arr[1]}) no-repeat center`
					}}>病虫害</span>
				</div>
				<div style={{position: 'relative', top: 145}}>
					<ul className={'changeLegend'} >
						{
						legendData.map((t, i) => {
							//console.log(t);
							return (
							<li style={{background: `url(${t.img}) no-repeat center left`}} key={i}>{t.name}</li>
							)
						})
						}
						<li className={'grade0'}>无预警</li>
						<li className={'grade4'}>一级预警</li>
						<li className={'grade3'}>二级预警</li>
						<li className={'grade2'}>三级预警</li>
						<li className={'grade1'}>四级预警</li>
					</ul>
					{/* <ul className={'legendUl'}>
					//
					// </ul>*/}
				</div>

				{/*引入地图组件*/}
				<DisasterMonitoring width={this.props.width}
									height={this.props.height}
									seriesData={this.state.seriesData}
									tooltipList={this.state.tooltipList} ref={'disasterMonitoring'}/>
			</div>
		)
	}
}
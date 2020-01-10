/**
 * Created by admin on 2018-12-14.
 */
import React from 'react';
import '../css/warning1.css'
class WeatherBigPre2 extends React.Component {
	constructor(props) {
		super();
		this.rootStyle = {
			position: 'absolute',
			width: `${props.width || 400}px`,
			height: `${props.height || 400}px`,
			left: `${props.left || 0}px`,
			top: `${props.top || 0}px`
		};
		this.state = {
			data: []
		}
	}

	_setData(d) {
		this.setState({
			data: d
		})
	}

	_createDom(data) {
		//if(!data.length) return false;
		let domList = [];
		let typeObj = {
				
				/*baoyu: '暴雨',
				bingbao: '冰雹',
				dafeng: '大风',
				gaowen: '高温',
				leidian: '雷电',
				taifeng: '台风',*/
				
				taifeng: '台风',
				baoyu: '暴雨',
				baoxue: '暴雪',
				hanchao: '寒潮',
				dafeng: '大风',
				shachenbao: '沙尘暴',
				gaowen: '高温',
				ganhan: '干旱',
				leidian: '雷电',
				bingbao: '冰雹',
				shuangdong: '霜冻',
				dawu: '大雾',
				mai: '霾',
				daolujiebing: '道路结冰',
				haishangdawu: '海上大雾',
				leibaodafeng: '雷暴大风',
				chixudiwen: '持续低温',
				nongfuchen: '浓浮尘',
				longjuanfeng: '龙卷风',
				diwendonghai: '低温冻害',
				haishangdafeng: '海上大风',
				diwenyuxuebingdong: '低温雨雪冰冻',
				qiangduiliu: '强对流',
				chouyang: '臭氧',
				daxue: '大雪',
				qiangjiangyu: '强降雨',
				qiangjiangwen: '强降温',
				xuezai: '雪灾',
				senlincaoyuanhuoxian:'森林（草原）火险',
				leibao: '雷暴',
				yanhan: '严寒',
				shachen: '沙尘',
				haishangleiyudafeng: '海上雷雨大风',
				haishangleidian: '海上雷电',
				haishnagtaifeng: '海上台风',
				diwen: '低温',
				hanleng: '寒冷',
				huimai: '灰霾',
				leiyudafeng: '雷雨大风',
				senlinhuoxian:'森林火险',
				jiangwen: '降温',
				daolubingxue: '道路冰雪',
				ganrefeng: '干热风',
				kongqizhongwuran:'空气重污染',
				bingdong: '冰冻'
			};
			let gradeObj = {
				yellow: '黄色',
				blue: '蓝色',
				orange: '橙色',
				red: '红色',
				white: '白色'
				
			};
		if(data.length > 0) {
			data.map((item, index) => {
				let type = item.type,
					stateClass = item.state == 0 ? 'state-release' : 'state-relieve',
					stateText = item.state == 0 ? '发布' : '解除',
					grade = gradeObj[item.grade],
					time = item.time,
					typeshowName=item.type;
				
				if(item.type != 'baoxue' &&
					item.type != 'baoyu' &&
					item.type != 'bingbao' &&
					item.type != 'dafeng' &&
					item.type != 'daolujiebing' &&
					item.type != 'dawu' &&
					item.type != 'ganhan' &&
					item.type != 'gaowen' &&
					item.type != 'hanchao' &&
					item.type != 'leidian' &&
					item.type != 'mai' &&
					item.type != 'qita' &&
					item.type != 'shachenbao' &&
					item.type != 'shuangdong' &&
					item.type != 'state-release' &&
					item.type != 'state-relieve' &&
					item.type != 'taifeng') {
					type = 'qita';
				}
				domList.push(
					<li className="qxzhjcyjj-li" key={index}>
	          <i className={`qxzhjcyjj-icon ${type}`}></i>
	          <div className="qxzhjcyjj-box">
	            <div className="qxzhjcyjj-wrap">
	              <span className="qxzhjcyjj-type">{typeObj[typeshowName]}</span>
	              <i className={stateClass}></i>
	              <span className="qxzhjcyjj-state">{item.region} {stateText}</span>
	              <span className={`qxzhjcyjj-grade ${item.grade}`}>{grade + typeObj[typeshowName]}</span>
	              <span>预警</span>
	              <span className="qxzhjcyjj-time">{time}</span>
	            </div>
	          </div>
	        </li>
				)
			});
		} else {
			let myDate = new Date();
			let hours = myDate.getHours();
			domList.push(
				<li className="qxzhjcyjj-li" key={0}>
    			<i className="qxzhjcyjj-icon"></i>
    			<div className="qxzhjcyjj-box">
  					<div className="qxzhjcyjj-wrap">
  						<span className="qxzhjcyjj-type"></span>
  						<i className=""></i>
  						<span className="qxzhjcyjj-state"></span>
  						<span className="qxzhjcyjj-grade yellow">暂无预警信息</span>
  						<span></span>
  						<span className="qxzhjcyjj-type" style= {{left:'100%'}}></span>
						</div>
					</div>
				</li>
			);
		}

		return domList
	}

	render() {
		if(this.state.data.length) {
			return <div className="charts-box" id="charts-box" style={this.rootStyle}>
        <ul className="qxzhjcyjj-ul" style= {{height:'600px',overflowY:'scroll'}}>
          {this._createDom(this.state.data)}
        </ul>
      </div>
		} else {
			return <div className="charts-box" id="charts-box" style={this.rootStyle}>
        <ul className="qxzhjcyjj-ul">
          {this._createDom(this.state.data)}
        </ul>
      </div>
		}
	}
}

export default WeatherBigPre2
/**
 * Created by admin on 2018-12-14.
 */
import React  from 'react';
import '../css/warning1.css'
class WeatherBigPre extends React.Component {
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
    if(!data.length) return false;
    let domList = [];
    let typeObj = {
      baoyu: '暴雨',
      bingbao: '冰雹',
      dafeng: '大风',
      gaowen: '高温',
      leidian: '雷电',
      taifeng: '台风'
    };
    let gradeObj = {
      yellow: '黄色',
      blue: '蓝色',
      orange: '橙色'
    };
    data.map((item, index) => {
      let type = item.type,
        stateClass = item.state == 0 ? 'state-release' : 'state-relieve',
        stateText = item.state == 0 ? '发布' : '解除',
        grade = gradeObj[item.grade],
        time = item.time;
      domList.push(
        <li className="qxzhjcyjj-li" key={index}>
          <i className={`qxzhjcyjj-icon ${type}`}></i>
          <div className="qxzhjcyjj-box">j
            <div className="qxzhjcyjj-wrap">
              <span className="qxzhjcyjj-type">{typeObj[type]}</span><i className={stateClass}></i><span
              className="qxzhjcyjj-state">{stateText}</span><span
              className={`qxzhjcyjj-grade ${item.grade}`}>{grade + typeObj[type]}</span><span>预警</span><span
              className="qxzhjcyjj-time">{time}</span>
            </div>j
          </div>
        </li>
      )
    });

    return domList
  }

  render() {
    if (this.state.data.length) {
      return <div className="charts-box" id="charts-box" style={this.rootStyle}>
        <ul className="qxzhjcyjj-ul">
          {this._createDom(this.state.data)}
        </ul>
      </div>
    } else {
      return null
    }
  }
}

export default WeatherBigPre

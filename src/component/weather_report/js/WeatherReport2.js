/**
 * Created by admin on 2018-12-14.
 */
import React from 'react';
// import Weather from './weather';
import '../css/weather2.css';
import weather1 from '../img/weather1.jpg';
import weather2 from '../img/weather2.jpg';

class WeatherReport extends React.Component {
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
      responseData2: []
    };
  }

  _setData(d) {
    this.setState({
      responseData2: d.responseData2
    })
  }

  _createHead(data) {
    if (!data) return false;
    return <div className="weather-report-top">
      <div className="title1">
        <span id="x-day">{`${data.date}（${data.week}）`}</span>
        <i id="x-brief">{`${data.brief}，${data.wind}`}</i>
      </div>
    {/*  <div className="content">
        <div className="img">
          <img src={`${data.iconL || weather1 }`}/>
          <img src={`${data.iconR || weather2} `}/>
        </div>
        <div className="oc">
          <span>温度</span>
          <span className="font-size-36 x-linear" text={`${data.maxT}℃`}>{`${data.maxT}℃`}</span>
          <span className="font-size-36 x-linear" text="/">/</span>
          <span className="font-size-36 x-linear" text={`${data.minT}℃`}>{`${data.minT}℃`}</span>
        </div>
      </div>*/}
      <p className="x-rotatettle"></p>
    </div>
  }

  _createBody(data) {
    if (!data) return false;
    let domList = [];
    data.map(item => {
      domList.push(<div key={item.date} className="x-item2">
        <div>
          <div className="x-item-content2">
          <h5>{`${item.date}（${item.week}）`}</h5>
          <div>
              <img src={`${item.iconL || weather1 }`}/>
         </div>
         <div>
              <img src={`${item.iconR || weather2} `}/>
            </div>
            <p className="x-color1" title={`${item.brief}`}>{`${item.brief}`}</p>
            <p className="x-box1">
              <span className="x-linear1" text={`${item.maxT}℃`}>{`${item.maxT}℃`}</span>
              <span className="x-linear1" text="/">/</span>
              <span className="x-linear1" text={`${item.minT}℃`}>{`${item.minT}℃`}</span>
            </p>
            <p className="x-color1" title={`${item.wind}`}>{`${item.wind}`}</p>
          </div>
          <p className="x-bar1 left-bar1"></p>
          <p className="x-bar1 right-bar1"></p>
          <p className="x-corner left-corner"></p>
          <p className="x-corner right-corner"></p>
          <p className="x-line left-line"></p>
          <p className="x-line right-line"></p>
          <p className="x-rotate2"></p>
        </div>
      </div>)
    });
    return domList
  }


  render() {
    if (this.state.responseData2) {
      let responseData2 = this.state.responseData2;
      return (
        <div id='chart-box' className="chart-box" style={this.rootStyle}>
          <div className="weather-report">
            {this._createHead(responseData2.slice(0, 1)[0])}
            <div className="weather-report-bottom2">
              <p className="x-color seven-day2">7天天气预报</p>
              {this._createBody(responseData2.slice(1, responseData2.length))}
            </div>

          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default WeatherReport

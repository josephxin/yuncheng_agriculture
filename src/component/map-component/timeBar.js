import React from 'react';
import timeBar from './time-bar.png';
import {scaleLinear} from 'd3';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeData: ['2018-11-10', '2018-11-15', '2018-11-20', '2018-11-25'],
      index: 0
    };

    this.len = 0;

  }

  initTimeBar() {
    this.scale = scaleLinear().domain([0, this.state.timeData.length - this.len]).range([this.len * 440 / this.state.timeData.length, 440]);
  }

  _flag = false;

  setData(d) {
    this._flag = true;
    this.setState({
      timeData: d
    });
  }

  componentDidUpdate() {
    if (this._flag) {
      this.initTimeBar();
      this.move();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    const me = this;

    me.initTimeBar();
    me.move();
  }

  move() {
    const me = this;
    clearInterval(me.timer);

    let index = me.state.index;
    me.timer = setInterval(() => {
      index++;
      if (index > me.state.timeData.length - me.len) {
        index = 0;
      }
      let currentTime = me.state.timeData[index - 1];

      if (me.props.timeChange && currentTime) {
        me.props.timeChange(currentTime);
      }
      //me.lock = true;
      me.setState({index});
    }, 3000);
  }


  render() {
    return (
      <div>
        <div style={{
          width: this.props.width || '440px',
          height: this.props.height || '24px',
          position: 'absolute',
          left: 0,
          top: '-15px',
          display: 'flex',
          color: '#b0ecf5',
          lineHeight: '24px',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          {
            this.state.timeData.map(function (item, index) {
              return (
                <span key={index} style={{display: 'inline-block'}}>{item}</span>
              )
            })
          }

        </div>
        <div style={{
          width: 440,
          height: 10,
          top: '10px',
          left: 0,
          position: 'absolute',
          border: '1px solid rgba(4,91,172,1)',
          borderRadius: 10,
          backgroundColor: 'rgba(4,91,172,.3)'
        }}>
          <div style={{
            width: this.scale ? this.scale(this.state.index) : 0,
            height: 10,
            position: 'absolute',
            border: '1px solid rgba(4,91,172,1)',
            borderRadius: 10,
            backgroundColor: 'rgba(10,138,255,1)'
          }}>
            <img src={timeBar} alt={'time-bar'} style={{position: 'absolute', right: -10, top: -10}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;

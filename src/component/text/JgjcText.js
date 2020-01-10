import React from 'react';
import TextBorder from './TextBorder';
import bg from './text-bg.png';

const nameList = ['根菜类价格指数', '葱姜蒜类价格指数'];

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: 88.12,
          type: 1,
          diff: 0.03
        },
        {
          value: 33.11,
          type: 0,
          diff: 0.05
        }
      ]
    };
    const text1Ref = React.createRef();
    const text2Ref = React.createRef();
    this.textRef = [text1Ref, text2Ref];
  }

  componentDidMount() {
    const me = this;

    const text1Dom = me.textRef[0].current;
    const text1 = new TextBorder({
      data: me.state.data[0].value,
      fontSize: 48,
      mark: true
    });
    // text1Dom.appendChild(text1.domElement);
    text1.start();

    const text2Dom = this.textRef[1].current;
    const text2 = new TextBorder({
      data: me.state.data[1].value,
      fontSize: 48,
      mark: true
    });
    // text2Dom.appendChild(text2.domElement);
    text2.start();
  }

  createList() {
    return this.state.data.map((s, i) => {
      let temp = <div style={{ color: '#fd296f' }}>&uarr; + </div>;
      if (s.type) {
        temp = <div style={{ color: '#00ffb4' }}>&darr; - </div>
      }
      return (
        <div key={'div' + i}>
          <p style={{ color: '#fff', fontSize: 14, marginBottom: 12 }}>{nameList[i]}</p>
          {/* <div style={{ position: 'absolute', top: 0, left: i === 0 ? -64 : -24, transform: 'scale(0.45)' }} ref={this.textRef[i]}></div> */}
          <div style={{
            width: 190,
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', marginRight: 10 }}>{this.createText(s.value)}</div>
            {temp}
            <div style={{ fontSize: 16, color: s.type ? '#00ffb4' : '#fd296f' }}>{s.diff}</div>
          </div>
        </div >
      );
    });
  }

  createText(num) {
    let data = '' + num;
    data = data.split('');
    return data.map((s, i) => {
      return (
        <div key={'text' + i} style={{ width: s === '.' ? 10 : 23, height: 34, display: 'inline-block', backgroundImage: s === '.' ? '' : `url(${bg})`, lineHeight: '34px', fontSize: 30, textAlign: 'center' }}><span className={'text-color'}>{s}</span></div>
      );
    });
  }

  render() {
    return (
      <div style={{
        width: 420,
        position: 'absolute',
        top: 50,
        left: 20,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {this.createList()}
      </div>
    );
  }
};

export default Page;
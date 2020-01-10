import React from 'react';
import bg from './bg.png';
import dot from './dot.png'

const siteDist = [[0, 51], [- 30 * 2, 51], [- 30 * 4, 51], [- 30 * 6, 51], [- 30 * 8, 51]];
const siteDist1 = [[72, 154], [212, 154]];

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dot1 = React.createRef();
    this.dotWrapRef = React.createRef();
  }

  componentDidMount() {
    const me = this;
    me.domDist = [];

    const dotWrapDom = me.dotWrapRef.current.children;
    const lenH = siteDist.length;
    siteDist.forEach((s, i) => {
      const dom = dotWrapDom[i];
      const x1 = s[0];
      const y1 = s[1];
      dom.style.transform = `translate(${x1}px,${y1}px)`;
      dom.data = s;
      me.domDist.push(dom);
    });
    siteDist1.forEach((s, i) => {
      const dom = dotWrapDom[lenH + i];
      const x1 = s[0];
      const y1 = s[1];
      dom.style.transform = `translate(${x1}px,${y1}px)`;
      dom.data = s;
      me.domDist.push(dom);
    });
    me.move();
  }

  move() {
    const reg = /translate\((.+)px,(.+)px/;
    const lenH = siteDist.length;
    this.timer = setInterval(() => {
      this.domDist.forEach((s, i) => {
        let angle = 0;
        const temp = s.style.transform.match(reg);
        let x = Number(temp[1]);
        let y = Number(temp[2]);
        if (i < lenH) {
          x += 1;
          if (x > 300 + 30) {
            x = 0;
          }
          if (x > 300) {
            s.style.opacity = 0;
          } else if (x == 16) {
            s.style.opacity = 1;
          }
        } else {
          if (x == siteDist1[i - lenH][0] && y < 185) {
            y += 1;
            angle = 90;
          } else if (y >= 185 && x < 356) {
            x += 1;
          } else if (x >= 356 && y > siteDist1[i - lenH][1]) {
            x = 356;
            y -= 1;
            angle = -90;
          } else if (y <= siteDist1[i - lenH][1] - 30 && x == 356) {
            x = siteDist1[i - lenH][0];
            y = siteDist1[i - lenH][1];
            s.style.opacity = 1;
          } else if (y <= siteDist1[i - lenH][1] && x == 356) {
            s.style.opacity = 0;
            y -= 1;
            angle = -90;
          }
        }
        s.style.transform = `translate(${x}px,${y}px) rotate(${angle}deg) `;
      });
    }, 1000 / 30);
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 60
      }}>
        <img style={{
          position: 'absolute',
          top: 0,
          left: 0
        }} src={bg} alt={'bg'} />
        <div style={{
          width: 443,
          height: 192,
          position: 'absolute',
          top: 0,
          left: 0
        }} ref={this.dotWrapRef}>
          {siteDist.map((s, i) => {
            return (
              <div key={'dot' + i} style={{
                width: 20,
                height: 4,
                position: 'absolute',
                transform: 'translate(' + s[0] + 'px,' + s[1] + 'px)',
                backgroundImage: 'url(' + dot + ')',
                opacity: 0,
                transition: 'opacity 1s'
              }}></div>
            );
          })}
          {
            siteDist1.map((s, i) => {
              return (
                <div key={'doth' + i} style={{
                  width: 20,
                  height: 4,
                  position: 'absolute',
                  transform: 'translate(' + s[0] + 'px,' + s[1] + 'px)',
                  backgroundImage: 'url(' + dot + ')',
                  opacity: 1,
                  transition: 'opacity 1s'
                }}></div>
              );
            })
          }
        </div>
      </div>
    );
  }
};

export default Page;

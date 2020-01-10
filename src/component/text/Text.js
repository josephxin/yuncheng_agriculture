import uuid from 'uuid';

/**
 * svg 渐变色文字
 * @author xf
 */

export default class Text {
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    const options = this.options;
    const fz = options.fontSize;
    const w = options.width;
    const h = options.height;
    const data = '' + options.data;
    const nameSpace = 'http://www.w3.org/2000/svg';
    const domElement = document.createElementNS(nameSpace, 'svg');
    this.domElement = domElement;
    domElement.style.height = h;
    domElement.style.width = w;
    domElement.style.marginLeft = fz / 8 + 'px';
    //domElement.style.marginTop = fz / 24 + 'px';
    const text = document.createElementNS(nameSpace, 'text');
    text.setAttribute('x', 0);
    text.setAttribute('y', fz - 2);
    text.style.fontSize = fz + 'px';
    const id = this.createColor();
    text.setAttribute('fill', `url(#${id})`);

    domElement.appendChild(text)
    this.data = data;
    this.text = text;
  }

  move() {
    let data = Number(this.data);
    if (!Boolean(data)) {
      this.update(this.data);
      this.domElement.style.width = '26px';
      return false;
    }
    let diff = data / 10;
    let temp = 0;
    this.timer = setInterval(() => {
      temp = temp + diff;
      if (temp > data) {
        this.update('over');
        clearInterval(this.timer);
      } else {
        this.update(~~temp);
      }
    }, 1000 / 15);
  }

  update(num) {
    let value = num;
    if (this.options.mark) {
      if (num !== 'over') {
        num = num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
        value = num;
      } else {
        this.data = this.data.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
        value = this.data;
      }
    }
    this.text.textContent = value;
  }

  createColor() {
    const color = this.options.color || [];
    const nameSpace = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(nameSpace, 'defs');
    const linearGradient = document.createElementNS(nameSpace, 'linearGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '0%');
    linearGradient.setAttribute('y2', '100%');
    const id = 'a' + uuid();
    linearGradient.setAttribute('id', id);
    const stop1 = document.createElementNS(nameSpace, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.style.stopColor = color[0] || '#fff';
    const stop2 = document.createElementNS(nameSpace, 'stop');
    stop2.setAttribute('offset', '30%');
    stop2.style.stopColor = color[0] || '#fff';
    const stop3 = document.createElementNS(nameSpace, 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.style.stopColor = color[1] || '#00f7ff';

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    linearGradient.appendChild(stop3);
    defs.appendChild(linearGradient);
    this.domElement.appendChild(defs);
    return id;
  }
};

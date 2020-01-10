import Text from './Text';
import bg from './text-border.png';

export default class TextBorder {
  constructor(options) {
    this.ns = 'http://www.w3.org/2000/svg';
    this.data = options.data;
    this.fontSize = options.fontSize;
    this.textList = [];
    this.init();
  }

  init() {
    const domElement = document.createElement('div');
    const style = domElement.style;
    style.display = 'flex';
    this.domElement = domElement;
    this.move();
  };

  move() {
    //const data = this.data.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
    const data = this.data.toString();
    const dataList = data.split('');
    dataList.forEach((s, i) => {
      const tempDom = document.createElement('div');
      tempDom.style.width = s == ',' ? '10px' : '24px';
      tempDom.style.height = '34px';
      tempDom.style.backgroundImage = s == ',' ? '' : 'url(' + bg + ')';
      tempDom.style.backgroundRepeat = 'no-repeat';
      tempDom.style.backgroundSize = 'contain';
      tempDom.style.marginRight = '2px';
      const text = new Text({
        data: s,
        fontSize: this.fontSize,
        width: tempDom.style.width,
        height: tempDom.style.height,
        mark: s == ',' ? false : true
      });
      this.textList.push(text);
      tempDom.appendChild(text.domElement);
      this.domElement.appendChild(tempDom);
    });
  }

  start() {
    this.textList.forEach(s => {
      s.move();
    });
  }
};

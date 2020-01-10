import React from 'react';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef1 = React.createRef();
  }

  componentDidMount() {
    const me = this;
    const ctx1 = me.canvasRef1.current.getContext('2d');
  }

  render() {
    return (
      <div>
        <canvas style={{ position: 'absolute' }} width={1420} height={680} ref={this.canvasRef1} />
        <canvas style={{ position: 'absolute' }} width={1420} height={680} ref={this.canvasRef2} />
        <canvas style={{ position: 'absolute' }} width={1420} height={680} ref={this.canvasRef3} />
        <canvas style={{ position: 'absolute' }} width={1420} height={680} ref={this.canvasRef4} />
      </div>
    );
  }
};

export default Page;

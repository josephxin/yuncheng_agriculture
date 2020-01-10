import React from 'react';
import TextBorder from './TextBorder';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: props.data || 0
    };
    this.unit = props.unit || '';
  }
	_setData(d){
		//console.log(d);
		this.setState({
			data: d
		})
	}
  componentDidMount() {
    const me = this;
    const dom = me.refs['textValue'];
    dom.innerHTML='';
    const testHomeData = new TextBorder({
      data: me.state.data,
      fontSize: 30,
      mark: true
    });
    dom.appendChild(testHomeData.domElement);
    testHomeData.start();
  }
	componentDidUpdate(){
		this.componentDidMount()
	}
  render() {
    const me = this;
    return (
    	<div style={{
        display: 'flex'
      }}>
        <div ref={'textValue'}></div>
        <span style={{fontSize: 14, transform: 'translate(2px, 10px)'}}>{me.unit}</span>
      </div>
    );
  }
};

export default Page;

import React from 'react';
import TextBorder from './TextBorder';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	values: props.values || [1444, 12444]
    };
    this.titles = props.titles || ['检测机构（家）', '检测次数（次）'];
    this.unit = props.unit || '';
  }
	_setData(d){
		//console.log(d);
		this.setState({
			values: d
		})
	}
  componentDidMount() {
    const me = this;
    me.titles.forEach((t, i) => {
      const dom = me.refs['textValue' + i];
      dom.innerHTML='';
      const testHomeData = new TextBorder({
        data: me.state.values[i],
        fontSize: 48,
        mark: true
      });
      dom.appendChild(testHomeData.domElement);
      testHomeData.start();
    })
  }
	componentDidUpdate(){
		this.componentDidMount()
	}
  render() {
    const me = this;
    const datas = me.titles;
    return (
      <div className={'text-page'} style={{
        width: me.props.width || 647,
        position: 'absolute',
        top: me.props.top || 258,
        left: me.props.left || 364,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        fontSize: 24,
        transform: `scale(${me.props.scale})`
      }}>
        {
          datas.map((t, i) => {
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative'
              }}>
                <p style={{ marginBottom: 18 }}>{this.titles[i]}</p>
                <div ref={'textValue' + i}></div>
                <span style={{ position: 'absolute', top: 80, left: i==0?275:298 }}>{me.unit}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
};

export default Page;

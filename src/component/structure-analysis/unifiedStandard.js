import React from 'react';
import "animate.css";
class UnifiedStandard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				// { name: '无公害农产品', value: 210, num: 100 }, //value 家企业  num个产品
				// { name: '绿色产品', value: 160, num: 200 },
				// { name: '有机农产品', value: 350, num: 280 },
				// { name: '农产品地理标志', value: 130, num: 19 }
			]
		}
	}

	setData(json) {
		this.setState({
			data: json
		});
	}

	_addList() {
		const me = this;
		if(!me.state.data) {
			return
		}
		return me.state.data.map((s, i) => {
			return(
				<li key={i}>
	        <div>
	          <span className="nameSpan"><i>{s.num}</i>个产品</span>
	        </div>
	        <h4>{s.name}</h4>
	        <span ref={'picture' + i} className={'picture animated'}></span>
	      </li>
			)
		});
	}

	render() {
		return(
			<div style={{
        position: 'absolute',
        left: 35,
        top: 108
      }}>
        <div className={'unified-wrap'}>
          <ul className={'unified-list'}>
            {this._addList()}
          </ul>
        </div>
      </div>
		)
	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	componentWillUnmount() {

	}
}
export default UnifiedStandard;
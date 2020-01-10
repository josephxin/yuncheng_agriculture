import React from 'react';
import * as d3 from 'd3';

const colorDist = ['#f8f103', '#00ff84', '#00fff6', '#0d7bff'];

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.max = 0;
		this.listRef = React.createRef();
	}
	setData(data) {
		if(!data || data.length < 1) {
			this.setState({
				data: []
			});
			return false;
		}
		this.setState({
			data: []
		});
		this.setState({
			data: data
		});
	}
	createList() {
		const me = this;
		if(this.state.data.length > 0) {
			return me.state.data.map((s, i) => {
				return(
					<li key={'list' + i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            fontSize: 16,
            marginBottom: me.props.marginBottom || 24
          }}>
            <div style={{ width: 20, textAlign: 'center' }}>{i + 1}</div>
            <div title={s.name} style={{ width: 80, textAlign: 'center' , overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>{s.name}</div>
            <div style={{ position: 'relative', width: 264, height: 22 }}>{this.createChart(s.value, i)}</div>
            <div style={{ width: 130, paddingLeft: 20 }}>{s.value}</div>
          </li>
				);
			});
		} else {
			return(<li style={{color: '#fff'}}>暂无数据</li>)
		}
	}

	createChart(value, index) {
		let color = colorDist[index];
		let len = 240 / this.max * value;
		if(index > 3) {
			color = colorDist[3];
		}
		let dom = (<svg style={{
      position: 'absolute',
      height:'30px'
    }}>
      <g>
        <path d={[
          'M20,6 ',
          'h240 ',
          'a5,5 1 1 1 0,10 ',
          'h-240 ',
          'A10,10 1 1 1 20,6'
        ].join('')} stroke={color} fill={'transparent'} />
      </g>
      <g>
        <path d={[
          'M17,8.5 ',
          `h0`,
          'a2,2 1 1 1 0,5 ',
          `h0`,
          'A6.5,6.5 1 1 1 17,8.5'
        ].join('')} fill={color} />
      </g>
    </svg>);
		return dom;
	}

	showBar() {
		const me = this;
		const data = this.state.data;
		d3.select(me.listRef.current).selectAll('svg g:last-child')
			.select('path').each(function(d, i, node) {
				d3.select(node[i]).transition()
					.duration(1000)
					.delay(i * 200)
					.attr('d', function() {
						let len = 240 / me.max * data[i].value;
						return [
							'M17,8.5 ',
							`h${len}`,
							'a2,2 1 1 1 0,5 ',
							`h${-len}`,
							'A6.5,6.5 1 1 1 17,8.5'
						].join('');
					});
			});
		// .transition()
		// .duration(1000)
		// .delay(300)
		// .attr('d', function (d, i) {
		//   let len = 240 / me.max * data[i].value;
		//   return [
		//     'M17,8.5 ',
		//     `h${len}`,
		//     'a2,2 1 1 1 0,5 ',
		//     `h${-len}`,
		//     'A6.5,6.5 1 1 1 17,8.5'
		//   ].join('');
		// });
	}

	componentDidMount() {

	}
	componentDidUpdate() {
		this.showBar();
	}
	render() {
		if(this.state.data[0]) {
			this.max = this.state.data[0].value;
		}
		return(
			<div style={{
        marginTop: this.props.top||50,
        width: 520,
        height: this.props.height||240,
        overflow: 'auto',
      }}>
        <ul ref={this.listRef}>
          {this.createList()}
        </ul>
      </div>
		);
	}
};

export default Page;
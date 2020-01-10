import React from 'react';
import titleImg from './title-long.png';
import mapImg from './map.png';
import dot from './map-dot.png';
import dot_s from './map-dot-s.png';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{
					type: 1,
					top: 936 - 780 - 73,
					left: 274 - 30 + 28,
					points: [118.726, 36.872],
					name: '田柳镇检测点',
					region: '寿光市'
				},
				{
					type: 1,
					top: 940 - 780 - 73,
					left: 470 - 30 + 28,
					points: [118.626, 36.572],
					name: '中兴农业',
					region: '寿光市'
				},
				{
					type: 1,
					top: 936 - 780 - 73,
					left: 667 - 30 + 28,
					points: [118.626, 36.772],
					name: '文家街道检测室',
					region: '寿光市'
				},
				{
					type: 0,
					top: 891 - 780 - 73,
					left: 235 - 30 + 28,
					points: [118.326, 36.472],
					name: '羊口镇检测室',
					region: '寿光市'
				},
				{
					type: 0,
					top: 886 - 780 - 73,
					left: 572 - 30 + 28,
					points: [118.726, 36.672],
					name: '营里镇检测点',
					region: '寿光市'
				},
				{
					type: 0,
					top: 907 - 780 - 73,
					left: 947 - 30 + 28,
					points: [118.226, 36.572],
					name: '上口镇检测点',
					region: '寿光市'
				}
			]
		};
	}

	setDot() {
		const data = this.state.data;
		return data.map((s, i) => {
			return(
				<div className={'dotWrap'} key={i} onClick={this.showGisMap.bind(this, s.points, s.region)}>
      		<img src={s.type ? dot : dot_s} alt={'map-dot'} style={{ position: 'absolute', top: s.top, left: s.left, transform: 'translate(-50%, -50%)', cursor: 'pointer' }} />
      		<p style={{ position: 'absolute', top: s.top, left: s.left, transform: 'translate(20px, -50%)', color: '#fff', cursor: 'pointer' }}>{s.name}</p>
      	</div>
			);
		});
	}

	render() {
		let data = this.state.data;
		//let points = data[0] ? data[0].points : [];
		//console.log(data);
		return(
			<div style={{
        position: 'absolute',
        top: 780,
        left: 30,
        zIndex: 8,
      }}>
        <img src={titleImg} alt={'检测点一览'} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div style={{ width: 30, height: 30, position: 'absolute', left: 1310, top: 0, cursor: 'pointer' }} onClick={this.showGisMap.bind(this, [], '')}></div>
        <img style={{ position: 'absolute', top: 73, left: -28 }} src={mapImg} alt={'map-img'} />
        <div className={'dot-list'} style={{ width: 1370, height: 225, position: 'absolute', top: 73, left: -28 }}>
          {this.setDot()}
        </div>
      </div>
		);
	}
	setData(d) {
		this.setState({ ...d
		});
	}
	showGisMap(points, region, e) {
		//console.log(points, region, e);//数组，事件对象
		this.props.showGisMap(points, region);
	}
};

export default Page;

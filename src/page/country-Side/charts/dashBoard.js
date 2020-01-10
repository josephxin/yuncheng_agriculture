import React, {
	useRef,
	useEffect,
	useState
} from 'react';

// 引入饼图组件
import Pie from '../js/WaterPieMin';

// 引入中心仪表盘
import DashBoard from '../js/dashBoardChartMin';

// 引入背景图片
import bg_pic from '../img/bg.png';

// 引入水球图
import WaveChart from '../js/main';

/**
 * 仪表盘主图
 * */
export default(props) => {
	// console.log(props);
	const numberOneList = props.numberOneList;
	const numberTwoList = props.numberTwoList;
	const numberThreeList = props.numberThreeList;

	// 饼图数据
	const [leftPieData, setLeftPieData] = useState(null); //left
	const [rightPieData, setRightPieData] = useState(null); //right

	const [leftBallData, setLeftBallData] = useState(0); //left
	const [rightBallData, setRightBallData] = useState(0); //right
	// 仪表盘数据
	const [dashBoardData, setDashBoardData] = useState(null);

	//如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
	//这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。
	useEffect(() => {
		// console.log('useEffect');
		// 左侧水球饼图数据
		if(numberOneList && numberOneList.length > 0) {
			setLeftPieData(numberOneList);
      setLeftBallData(numberOneList[0].value);
		}

		// 右侧水球饼图数据
		if(numberThreeList && numberThreeList.length > 0) {
			setRightPieData(numberThreeList);
			setRightBallData(numberThreeList[0].value);
		}

    // 仪表盘数据
		let dashBoardChart = {};
		if(numberTwoList && numberTwoList.length > 0) {
			dashBoardChart = {
				name: '占运城总人口比重',
				value: numberTwoList
			};
		}
		setDashBoardData(dashBoardChart); //触发render
	}, []);

	return(
		<div>
      <img src={bg_pic} alt="背景图片"/>

      {/*左边饼图 */}
      <div style={{position: 'absolute', top: 110, left: 65, zIndex: 2}}>
      	<Pie width={188}
           height={203}
           datas={leftPieData}
           colors={['#028fff', '#00cfff', '#2bfdb6', '#fff200']}
           top={0}
           left={0}
           selected={(d) => {
             setLeftBallData(d)
           }}
      	/>
      </div>
      <WaveChart width={120}
                 height={120}
                 top={152}
                 left={99}
                 ballBorderColor={'transparent'}
                 ballBorder={1}
                 value={leftBallData}
      />


      {/*右边饼图 */}
      <div style={{position: 'absolute', top: 110, left: 615, zIndex: 2}}>
	      <Pie width={188}
	           height={203}
	           datas={rightPieData}
	           colors={['#028fff', '#00cfff', '#2bfdb6', '#27dd5f', '#fff200']}
	           top={0}
	           left={0}
	           selected={(d) => {
	             setRightBallData(d)
	           }}
	      />
      </div>
      <WaveChart width={120}
                 height={120}
                 top={152}
                 left={648}
                 ballBorderColor={'transparent'}
                 ballBorder={1}
                 value={rightBallData}
      />
      {/*仪表盘 */}
      <DashBoard width={280} height={280} top={45} left={300} datas={dashBoardData} />
    </div>
	)
}
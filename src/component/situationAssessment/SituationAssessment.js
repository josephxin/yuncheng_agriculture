import React, {
	Component
} from 'react';
import BarChart from '../barChart/BarChart';

/**
 *wf_df_disaster_weather
 * */
class SituationAssessment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			legend: [],
		};
		this.startColor = ['#0aa4d4', '#33dfa8', '#28dd5f', '#fffd04', '#ffa500', '#f02f5e'];
		this.endColor = ['#0aa4d4', '#33dfa8', '#28dd5f', '#fffd04', '#ffa500', '#f02f5e'];
	}

	setData(d) {
		console.log(d);
		if (d.legend) {
			this.setState({
				legend: d.legend
			});
		}
		this.BarChartRef.setData(d);
	}

	render() {
		return(
			<div style={{position: 'relative',width:'600px'}}>
        <ul className={'createUl'} style={{top: 50}}>
        	{
        		this.state.legend.map((t, i)=>{
        			return (
        				<li key={i}>{t}</li>
        			)
        		})
        	}
        </ul>
        <BarChart
          width={this.props.width}
          height={this.props.height}
          gy={32}
          dx={-60}
          svgy={65}
          startColor={this.startColor}
          endColor={this.endColor}
         	ref={ref => this.BarChartRef = ref} />
      </div>
		)
	}
	componentDidMount() {
		//console.log(this.props.legend)
	}
	componentDidUpdate() {
		
	}
}

export default SituationAssessment;
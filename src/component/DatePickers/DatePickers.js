import React from 'react';
import { DatePicker, MonthPicker, YearPicker } from 'zent'

class DatePickers extends React.Component {
	constructor(props) {
		super();
	}
	render() {
		let type = this.props.type,
			placeholder = this.props.placeholder,
			min = this.props.min,
			max = this.props.max,
			onChange = this.props.onChange,
			value = this.props.value,
			width = this.props.width;
		if(type == 'month') {
			return(
				<MonthPicker placeholder={placeholder} max={max} min={min} value={value} width={width} onChange={onChange}/>
			)
		}
		if(type == 'year') {
			return(
				<YearPicker placeholder={placeholder} max={max} min={min} value={value} width={width} onChange={onChange} canClear={false}/>
			)
		}
		return(
			<DatePicker placeholder={placeholder} max={max} min={min} value={value} width={width} onChange={onChange}/>
		)
	}
}

export default DatePickers

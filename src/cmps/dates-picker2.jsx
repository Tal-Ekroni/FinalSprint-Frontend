import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React from "react"
import { DateRange } from 'react-date-range';

import { Calendar, DateRangePicker } from 'react-date-range';
// import { DateRangePicker } from 'react-dates';

export class DatesPicker2 extends React.Component {
    state = {
        startDate: null,
        endDate: null
    }
    handleSelect = ({ selection }) => {
        // console.log('endDate', date.selection.startDate);
        var { startDate, endDate } = selection
        this.setState({ startDate, endDate }, () => { this.props.onSelectDates(this.state) })
    }

    toTimeStamp = (strDate) => {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }
    render() {
        const selectionRange = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            key: 'selection',
        }
        return (
            <DateRangePicker
            className="date-pick"
                ranges={[selectionRange]}
                onChange={this.handleSelect}
            />
        )

        // return (
        //     // <Calendar
        //     //     minDate={this.state.startDate}
        //     //     maxDate={this.state.endDate}
        //     //     date={new Date()}
        //     //     onChange={this.handleSelect}
        //     //     moveRangeOnFirstSelection={false}
        //     // />
        //     <DateRangePicker/>
        // )
    }
}
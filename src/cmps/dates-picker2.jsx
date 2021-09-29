import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React from "react"
import { DateRange } from 'react-date-range';

import { Calendar } from 'react-date-range';

export class DatesPicker2 extends React.Component {
    state = {
        startDate: null,
        endDate: null
    }
    handleSelect(date) {
        console.log(date); // native Date object
        // var timeStamp = this.toTimeStamp(date)
    }

    // handleChange = ({ startDate, endDate }) => {
    //     if (startDate) {
    //         this.setState(prevState => ({ trip: { ...prevState.trip, startDate } }))
    //     }
    //     if (endDate) {
    //         this.setState(prevState => ({ trip: { ...prevState.trip, endDate } }))
    //     }
    // }

    toTimeStamp = (strDate) => {
        var datum = Date.parse(strDate);
        console.log('hii', datum / 1000);
        return datum / 1000;
    }
    render() {
        return (
            <Calendar
                date={new Date()}
                onChange={this.handleSelect}
                moveRangeOnFirstSelection={false}
            />
        )
    }
}
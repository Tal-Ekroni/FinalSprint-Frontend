import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React from "react"

import { DateRangePicker } from 'react-date-range';

export class DatesPicker2 extends React.Component {
    state = {
        startDate: null,
        endDate: null
    }
    handleSelect = ({ selection }) => {
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
            <div className="">
                <DateRangePicker
                    classNames="date-picker-2"
                    rangeColors={"black"}
                    color={"black"}
                    startDatePlaceholder="Check In"
                    endDatePlaceholder="Check Out"
                    className="date-pick"
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                />
            </div>
        )
    }
}
import React from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';


export class DatesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
  }

  render() {
    const {startDate,endDate,onSelectDates}=this.props
    return (
      <div className="App">
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={startDate}
          endDate={endDate}
          onDatesChange={({ startDate, endDate }) => {onSelectDates({ startDate, endDate }) }}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
        />
      </div>
    );
  }
}

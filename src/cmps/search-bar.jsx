import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { GuestsModal } from './guests-modal';
import { FaSearch } from 'react-icons/fa'



export class SearchBar extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        isGuestMode: false
    }
    onGuestMode = () => {
        this.setState(prevState => ({
            isGuestMode: !prevState.isGuestMode
        }));

    }
    render() {
        return (
               <div className="search-bar-container flex align-center">
                    <div className="flex column">
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" autoComplete="off" />
                    </div>
                    <DateRangePicker
                    className="date-pick"
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        startDatePlaceholderText="Check-in"
                        endDatePlaceholderText="Check-out"
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />
                    <div className="flex justify-center align-center">
                        <span onClick={this.onGuestMode}>Guests</span>
                    </div>
                    {/* <button className="search-btn">Search</button>
                     */}
                     <FaSearch size={20} color="#FFF" style={{backgroundColor:"#FF5A5F"}} />
                    {this.state.isGuestMode && <GuestsModal />}
                </div>
        )
    }
}
import React from 'react'
import { GuestsModal } from './guests-modal';
import { FaSearch } from 'react-icons/fa'
import { DatesPicker } from './dates-picker';
import { Link } from 'react-router';
import { withRouter } from "react-router-dom"
import { DatesPicker2 } from "./dates-picker2"
class _SearchBar extends React.Component {

    state = {
        startDate: null,
        endDate: null,
        guestModal: false,
        datesModal: false,
        location: '',
        adultNumber: 0,
        kidsNumber: 0
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ location: value }, () => { this.props.setFilter(this.state) });
    }
    // onSelectDates = ({ startDate, endDate }) => {
    //     if (startDate) {
    //         this.setState({ startDate }, () => console.log(this.state))
    //     }
    //     if (endDate) {

    //         this.setState({ endDate }, () => console.log(this.state))
    //     }
    // }

    onSelectDates = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate }, () => { this.props.setFilter(this.state) })
    }
    onToggleModals = (modalSelect) => {
        switch (modalSelect) {
            case 'guestModal':
                this.setState(prevState => ({
                    guestModal: !prevState.guestModal
                }, () => { this.props.setFilter(this.state) }));
                break;
            case 'datesPicker':
                this.setState(prevState => ({
                    datesModal: !prevState.datesModal
                }, () => { this.props.setFilter(this.state) }));
                break;

        }
    }
    onSelectAmount = (guestType, diff) => {
        switch (guestType) {
            case 'adultNumber':
                if (this.state.adultNumber + diff >= 0) {
                    this.setState(prevState => ({
                        adultNumber: prevState.adultNumber + diff
                    }, () => { this.props.setFilter(this.state) }));
                }
                break;
            case 'kidsNumber':
                if (this.state.kidsNumber + diff >= 0) {
                    this.setState(prevState => ({
                        kidsNumber: prevState.kidsNumber + diff
                    }, () => { this.props.setFilter(this.state) }));
                }
                break;
        }
    }
    onSetFilter = async () => {
        console.log(this.state);
        await this.props.setFilter(this.state)
        this.props.history.push('/explore')
    }
    toggleDatesModal = (val) => {
        this.setState({ datesModal: false })
        this.setState({ datesModal: val })
    }
    timeToShow = (date, val) => {
        var timeStamp = Date.parse(date);
        var time = new Date(timeStamp);
        var date = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }

    render() {
        const { location, adultNumber, kidsNumber, endDate, startDate, guestModal, datesModal } = this.state
        return (
            <div>
                <div className="search-bar-container flex ">

                    <div className="location-container flex column" onClick={() => { this.toggleDatesModal(false) }}>
                        <label htmlFor="location" className="loc-inpt">Location
                            <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange} placeholder="Where are you going?" />
                        </label>
                    </div>

                    <div className="dates-container flex ">
                        <div className="check-in-input flex column">
                            <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check in <span>{startDate ? this.timeToShow(startDate, 'startDate') : 'Add date'}</span></label>
                        </div>
                        <div className="check-out-input flex column" >
                            <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check out <span>{endDate ? this.timeToShow(endDate, 'startDate') : 'Add date'}</span></label>
                            {/* <p>{endDate ? endDate : 'Add date'}</p> */}
                        </div>
                    </div>

                    <div className="guests-container flex justify-center align-center" onClick={(ev) => {
                        console.log(ev.target.getBoundingClientRect())
                    }}>
                        <label htmlFor="" >
                            <span onClick={() => { this.onToggleModals('guestModal') }}>Guests</span>
                        </label>
                        {guestModal && <GuestsModal onToggleModals={this.onToggleModals} adultNumber={adultNumber} kidsNumber={kidsNumber} onSelectAmount={this.onSelectAmount} />}
                    </div>

                    <button className="search-btn" onClick={() =>this.onSetFilter}>Search</button>
                    <div className="search-btn-container flex align-center justify-center" onClick={() => { this.onSetFilter() }} >
                        <FaSearch className="search-btn" size={16} />
                    </div>
                </div>
                <div className="search-dates-container">
                    {datesModal && <DatesPicker2 onSelectDates={this.onSelectDates} />}
                </div>
            </div>
        )
    }
}
export const SearchBar = withRouter(_SearchBar)

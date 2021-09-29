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
        await this.props.setFilter(this.state)
        this.props.history.push('/explore')
    }
    toggleDatesModal = (val) => {
        this.setState({ datesModal: val })
    }
    render() {
        const { location, adultNumber, kidsNumber, endDate, startDate, guestModal, datesModal } = this.state
        return (
            <div className="search-bar-container flex ">
                <div className="flex column" onClick={() => { this.toggleDatesModal(false) }}>
                    <label htmlFor="location" className="loc-inpt">Location
                        <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange}  placeholder="Where are you going?" />
                    </label>
                </div>
                <div className="flex column">
                    {/* <div className="check-in-out flex justify-between">
                        <p htmlFor="dates">Check in</p>
                        <p htmlFor="dates">Check out</p>
                    </div> */}
                    <div className="dates flex">
                        {/* <DatesPicker startDate={startDate} endDate={endDate} onSelectDates={this.onSelectDates} />
                     */}
                        <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check in</label>
                        <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check out</label>
                    </div>
                    {datesModal && <DatesPicker2 />}
                </div>
                <div className="flex justify-center align-center" onClick={(ev) => {
                    console.log(ev.target.getBoundingClientRect())
                }}>
                    <label htmlFor="" >
                        <span onClick={() => { this.onToggleModals('guestModal') }}>Guests</span>
                    </label>
                </div>
                {guestModal && <GuestsModal onToggleModals={this.onToggleModals} adultNumber={adultNumber} kidsNumber={kidsNumber} onSelectAmount={this.onSelectAmount} />}
                {/* <button className="search-btn" onClick={() =>this.onSetFilter}>Search</button> */}

                <div className="search-bar-search-btn-container flex align-center justify-center" onClick={() => { this.onSetFilter() }} >
                    <FaSearch className="search-bar-search-btn" size={16} />
                </div>
            </div>
        )
    }
}
export const SearchBar = withRouter(_SearchBar)

import React from 'react'
import { GuestsModal } from './guests-modal';
import { FaSearch } from 'react-icons/fa'
import { DatesPicker } from './dates-picker';

export class SearchBar extends React.Component {
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
        this.setState({ location: value });
    }
    onSelectDates = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate })
    }
    onToggleModals = (modalSelect) => {
        console.log(modalSelect);
        switch (modalSelect) {
            case 'guestModal':
                this.setState(prevState => ({
                    guestModal: !prevState.guestModal
                }));
                break;
            case 'datesPicker':
                this.setState(prevState => ({
                    datesModal: !prevState.datesModal
                }));
                break;

        }
    }
    onSelectAmount = (guestType, diff) => {
        switch (guestType) {
            case 'adultNumber':
                if (this.state.adultNumber + diff >= 0) {
                    this.setState(prevState => ({
                        adultNumber: prevState.adultNumber + diff
                    }));
                }
                break;
            case 'kidsNumber':
                if (this.state.kidsNumber + diff >= 0) {
                    this.setState(prevState => ({
                        kidsNumber: prevState.kidsNumber + diff
                    }));
                }
                break;
        }
    }
    render() {
        const { location, adultNumber, kidsNumber, endDate, startDate, guestModal } = this.state
        return (
            <div className="search-bar-container flex align-center">

                <div className="flex column">
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange} />
                </div>

                <div className="flex justify-center align-center">
                    <DatesPicker startDate={startDate} endDate={endDate} onSelectDates={this.onSelectDates} />
                </div>
                <div className="flex justify-center align-center" onClick={(ev) => {
                    console.log(ev.target.getBoundingClientRect())
                }}>
                    <span onClick={() => { this.onToggleModals('guestModal') }}>Guests</span>
                </div>
                {guestModal && <GuestsModal onToggleModals={this.onToggleModals} adultNumber={adultNumber} kidsNumber={kidsNumber} onSelectAmount={this.onSelectAmount} />}
                {/* <button className="search-btn">Search</button>
                     */}
                <div className="search-bar-search-btn-container flex align-center justify-center">
                    <FaSearch className="search-bar-search-btn" size={16} />
                </div>
            </div>
        )
    }
}
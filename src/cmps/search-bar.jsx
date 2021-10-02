import React from 'react'
import { GuestsModal } from './guests-modal';
import { FaSearch } from 'react-icons/fa'
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
        kidsNumber: 0,
        infantsNumber: 0,
        modalPos: {
            top: '',
            left: ''
        }
    }
    // componentDidMount() {
    //     window.addEventListener('scroll', (ev) => {
    //         if (ev.target.scrollingElement.scrollTop > 50) {
    //             this.setState({ guestModal: false, datesModal: false })
    //         }



    //     })
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll')
    // }
    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ location: value }, () => { this.props.setFilter(this.state) });
    }

    onSelectDates = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate }, () => { this.props.setFilter(this.state) })
    }

    onSelectAmount = (guestType, diff) => {
        switch (guestType) {
            case 'adultNumber':
                if (this.state.adultNumber + diff >= 0) {
                    this.setState({ adultNumber: this.state.adultNumber + diff }, () => { this.props.setFilter(this.state) })
                }
                break;
            case 'kidsNumber':
                if (this.state.kidsNumber + diff >= 0) {
                    this.setState({ kidsNumber: this.state.kidsNumber + diff }, () => { this.props.setFilter(this.state) })
                }
                break;
            case 'infantsNumber':
                if (this.state.infantsNumber + diff >= 0) {
                    this.setState({ infantsNumber: this.state.infantsNumber + diff }, () => { this.props.setFilter(this.state) })
                }
                break;
        }
    }
    onSetFilter = async () => {
        await this.props.setFilter(this.state)
        this.props.history.push('/explore')
    }
    toggleDatesModal = (val) => {
        this.setState({ datesModal: false })
        this.setState({ datesModal: val })
    }
    onToggleGuestModals = (ev) => {
        const { left, bottom } = ev.target.getBoundingClientRect()
        const pos = {
            top: bottom + 'px',
            left: (left + 50) + 'px'
        }
        this.setState({ modalPos: pos }, () => console.log(this.state.modalPos))
        if (this.state.datesModal) this.toggleDatesModal()
        this.setState({ guestModal: !this.state.guestModal })
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
        const { isPageTop } = this.props
        console.log( this.props,'okok');
        const { location, adultNumber, kidsNumber, infantsNumber, endDate, startDate, guestModal, datesModal, modalPos } = this.state
        return (
            <div >
                <div className="search-bar-container flex space-between align-center ">

                    <div className="location-container flex column" onClick={() => { this.toggleDatesModal(false) }}>
                        <label htmlFor="location" className="loc-inpt">Location
                            <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange} placeholder="Where are you going?" />
                        </label>
                    </div>
                    <div className="mini-search-input">
                        <p>
                        Start your search
                        </p>
                    </div>
                    <div className="dates-container flex ">
                        <div className="check-in-input flex column">
                            <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check in <span>{startDate ? this.timeToShow(startDate, 'startDate') : 'Add date'}</span></label>
                        </div>
                        <div className="check-out-input flex column" >
                            <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check out <span>{endDate ? this.timeToShow(endDate, 'startDate') : 'Add date'}</span></label>

                        </div>
                    </div>

                    <div className="guests-container align-center flex" onClick={(ev) => { this.onToggleGuestModals(ev) }}>

                        <label htmlFor="" className=" flex column" >
                            <span>Guests</span>
                            <span className="guest-placeholder">Add guests</span>
                        </label>

                    </div>
                    {guestModal && <GuestsModal style={modalPos} onToggleGuestModals={this.onToggleGuestModals} adultNumber={adultNumber} kidsNumber={kidsNumber} infantsNumber={infantsNumber} onSelectAmount={this.onSelectAmount} />}
                    <div className="search-btn-container flex align-center justify-center" onClick={() => { this.onSetFilter() }} >
                        {!isPageTop && < FaSearch size={13} />}
                        {isPageTop && < FaSearch size={15} />}
                    </div>

                </div>
                <div className="search-dates-container ">
                    {datesModal && <DatesPicker2 onSelectDates={this.onSelectDates} toggleDatesModal={this.toggleDatesModal} />}
                </div>
            </div>
        )
    }
}
export const SearchBar = withRouter(_SearchBar)

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
        kidsNumber: 0,
        infantsNumber: 0
    }

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
                    // this.setState(prevState => ({
                    //     ...prevState,
                    //     adultNumber: prevState.adultNumber + diff
                    // }, () => { console.log(this.state) }));

                    this.setState({ adultNumber: this.state.adultNumber + diff }, () => { this.props.setFilter(this.state) })
                }
                break;
            case 'kidsNumber':
                if (this.state.kidsNumber + diff >= 0) {
                    // this.setState(prevState => ({...prevState,
                    //     kidsNumber: prevState.kidsNumber + diff
                    // }, () => { this.props.setFilter(this.state) }));
                    this.setState({ kidsNumber: this.state.kidsNumber + diff }, () => { this.props.setFilter(this.state) })
                }
                break;
            case 'infantsNumber':
                if (this.state.infantsNumber + diff >= 0) {
                    // this.setState(prevState => ({...prevState,
                    //     kidsNumber: prevState.kidsNumber + diff
                    // }, () => { this.props.setFilter(this.state) }));
                    this.setState({ infantsNumber: this.state.infantsNumber + diff }, () => { this.props.setFilter(this.state) })
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
    onToggleGuestModals = () => {
        this.toggleDatesModal()
        this.setState({ guestModal: !this.state.guestModal })
    }
    timeToString = (unformatedtime, val) => {
    //     var timeStamp = Date.parse(unformatedtime);
    //     var time = new Date(timeStamp);
    //     var date = "0" + time.getDate();
    //     var month = "0" + (time.getMonth() + 1);
    //     var year = "0" + time.getFullYear();
    //     if (val === 'StartDate') {
    //         switch (month) {
    //             case '01':
    //                 'Jan'
    //                 break;
    //             case '02':
    //                 'Feb'
    //                 break;
    //             case '03':
    //                 'Mar'
    //                 break;
    //             case '04':
    //                 'Apr'
    //                 break;
    //             case '05':
    //                 'May'
    //                 break;
    //             case '06':
    //                 'Jun'
    //                 break;
    //             case '07':
    //                 'Jul'
    //                 break;
    //             case '08':
    //                 'Aug'
    //                 break;
    //             case '09':
    //                 'Sep'
    //                 break;
    //             case '10':
    //                 'Oct'
    //                 break;
    //             case '11':
    //                 'Nov'
    //                 break;
    //             case '12':
    //                 'Dec'
    //                 break;


    //         }
    //         switch (date) {
    //             case "01":
                    
    //                 break;
            
    //             default:
    //                 break;
    //         }
    //     } else if (val==='')
    //     var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
    //     return formattedTime
    }
    timeToShow = (date, val) => {
        // var trying1 = date.substring(5,15)
        var timeStamp = Date.parse(date);
        var time = new Date(timeStamp);
        var date = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }

    render() {
        const { location, adultNumber, kidsNumber, infantsNumber, endDate, startDate, guestModal, datesModal } = this.state
        return (
            <div>
                <div className="search-bar-container flex align-center ">

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

                        </div>
                    </div>

                    <div className="guests-container align-center flex" onClick={() => { this.onToggleGuestModals() }}>

                        {/* // onClick={(ev) => {
                                console.log(ev.target.getBoundingClientRect())
                                //inline styling
                            }}> */}
                        <label htmlFor="" className=" flex column" >
                            <span>Guests</span>
                            <span className="guest-placeholder">Add guests</span>
                        </label>

                    </div>
                    {guestModal && <GuestsModal onToggleGuestModals={this.onToggleGuestModals} adultNumber={adultNumber} kidsNumber={kidsNumber} infantsNumber={infantsNumber} onSelectAmount={this.onSelectAmount} />}
                    <div className="search-btn-container flex align-center justify-center" onClick={() => { this.onSetFilter() }} >
                        <FaSearch size={16} />
                    </div>

                </div>
                <div className="search-dates-container ">
                    {datesModal && <DatesPicker2 onSelectDates={this.onSelectDates} />}
                </div>
            </div>
        )
    }
}
export const SearchBar = withRouter(_SearchBar)

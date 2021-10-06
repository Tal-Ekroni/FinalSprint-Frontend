import React from 'react'
import { GuestsModal } from './guests-modal';
import { FaSearch } from 'react-icons/fa'
import { withRouter } from "react-router-dom"
import { DatesPicker2 } from "./dates-picker2"
import { stayService } from '../services/stay.service';
import { LocationsPopUp } from './locations-popup';

class _SearchBar extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        location: '',
        adultNumber: 0,
        kidsNumber: 0,
        infantsNumber: 0,
        capacity: 0,
        amenities: '',
        assetType: '',
        uniqueStay: '',
        guestModal: false,
        datesModal: false,
        hostId: ''
    }
    componentDidMount() {
        const params = this.onGetQueryParams()
        // console.log(params, 'params');
        this.props.setFilter(params)
        this.setState({ ...params }, () => { console.log(this.state) })
    }
    onGetQueryParams = () => {
        const urlParams = new URLSearchParams(this.props.location.search);
        const location = urlParams.get('location') || '';
        const startDate = urlParams.get('startDate') || null;
        const endDate = urlParams.get('endDate') || null;
        const adultNumber = +urlParams.get('adults') || 1;
        const kidsNumber = +urlParams.get('kids') || 0;
        const infantsNumber = +urlParams.get('infants') || 0;
        const params = {
            location,
            startDate,
            endDate,
            adultNumber,
            kidsNumber,
            infantsNumber,
            capacity: 0,
            amenities: '',
            assetType: '',
            uniqueStay: '',
            guestModal: false,
            datesModal: false,
            hostId: ''
        }
        return params
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
            default:
                break;
        }
    }
    onSetFilter = async () => {
        await this.props.setFilter(this.state)
        const { location, startDate, endDate, adultNumber, kidsNumber, infantsNumber } = this.state
        const urlQuery = `explore/?location=${location}&startDate=${startDate}&endDate=${endDate}&adults=${adultNumber}&kids=${kidsNumber}&infants=${infantsNumber}`
        this.props.closeAllModals()
        this.props.history.push(urlQuery)
    }

    timeToShow = (date, val) => {
        var timeStamp = Date.parse(date);
        var time = new Date(timeStamp);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }

    render() {
        const { isMiniHeader, guestModal, datesModal, locModal, onToggleSearchModals, onToggleMiniSearchBar, closeAllModals } = this.props
        const { location, adultNumber, kidsNumber, infantsNumber, endDate, startDate } = this.state
        return (
            <div >
                <div className="search-bar-container flex align-center ">

                    <div className="location-container flex column" onClick={() => { onToggleSearchModals('locModal') }}>
                        <label htmlFor="location" className="loc-inpt">Location
                            <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange} placeholder="Where are you going?" />
                        </label>
                    </div>
                    {locModal && <LocationsPopUp closeAllModals={closeAllModals} history={this.props.history} />}
                    <div className="mini-search-input" onClick={onToggleMiniSearchBar}>
                        <p >
                            Start your search
                        </p>
                    </div>
                    <div className="dates-container flex ">
                        <div className="check-in-input flex column">
                            <label htmlFor="" onClick={() => { onToggleSearchModals('datesModal') }}>Check in <span>{startDate ? this.timeToShow(startDate, 'startDate') : 'Add date'}</span></label>
                        </div>
                        <div className="check-out-input flex column" >
                            <label htmlFor="" onClick={() => { onToggleSearchModals('datesModal') }}>Check out <span>{endDate ? this.timeToShow(endDate, 'startDate') : 'Add date'}</span></label>

                        </div>
                    </div>

                    <div className="guests-container" >
                        <div className="guests-label align-center flex" onClick={(ev) => { onToggleSearchModals('guestModal',) }}>
                            <label htmlFor="" className="flex column" >
                                <span>Guests</span>
                                <span className="guest-placeholder">Add guests</span>
                            </label>
                        </div>
                        {guestModal && <GuestsModal adultNumber={adultNumber} kidsNumber={kidsNumber} infantsNumber={infantsNumber} onSelectAmount={this.onSelectAmount} />}
                    </div>
                    <div className="search-btn-container flex align-center justify-center" onClick={() => { this.onSetFilter() }} >
                        {isMiniHeader && < FaSearch size={13} />}
                        {!isMiniHeader && < FaSearch size={20} />}
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

// export const SearchBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(_SearchBar))

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
        adultNumber: 1,
        kidsNumber: 0,
        infantsNumber: 0,
    }
    componentDidMount() {
        const params = stayService.onGetQueryParams()
        this.props.setFilter(params)
        this.setState({ params })
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
        }
    }
    onSetFilter = async () => {
        await this.props.setFilter(this.state)
        const { location, startDate, endDate, adultNumber, kidsNumber, infantsNumber } = this.state
        const urlQuery = `/explore/?location=${location}&startDate=${startDate}&endDate=${endDate}&adults=${adultNumber}&kids=${kidsNumber}&infants=${infantsNumber}`
        this.props.history.push(urlQuery)
    }
    onLoadFilter = async (filterBy) => {
        await this.props.setFilter(filterBy)
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
        const { isMiniHeader, guestModal, datesModal, locModal, onToggleSearchModals, onToggleMiniSearchBar } = this.props
        const { location, adultNumber, kidsNumber, infantsNumber, endDate, startDate } = this.state
        return (
            <div >
                <div className="search-bar-container flex align-center ">

                    <div className="location-container flex column" onClick={() => { onToggleSearchModals('locModal') }}>
                        <label htmlFor="location" className="loc-inpt">Location
                            <input type="text" name="location" autoComplete="off" value={location} onChange={this.handleChange} placeholder="Where are you going?" />
                        </label>
                    </div>
                    {locModal && <LocationsPopUp onToggleSearchModals={onToggleSearchModals} />}
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
                        {!isMiniHeader && < FaSearch size={13} />}
                        {isMiniHeader &&< FaSearch size={20} />}
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



// function mapStateToProps(state) {
//     return {
//         users: state.userModule.users,
//         user: state.userModule.user,
//         count: state.userModule.count,
//         isLoading: state.systemModule.isLoading,
//         filterBy: state.stayModule.filterBy,
//         isMiniHeader: state.stayModule.isMiniHeader

//     }
// }
// const mapDispatchToProps = {
// }


// export const SearchBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(_SearchBar))

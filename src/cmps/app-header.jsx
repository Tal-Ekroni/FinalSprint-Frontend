import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaAirbnb } from 'react-icons/fa'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { GuestsModal } from './guests-modal';



import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { SearchBar } from './search-bar';

class _AppHeader extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        isGuestMode: false
    }
    onLogin = (credentials) => {
        this.props.onLogin(credentials)
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }
    onGuestMode = () => {
        this.setState(prevState => ({
            isGuestMode: !prevState.isGuestMode
        }));

    }

    render() {
        const { user } = this.props
        return (
            <header className="app-header-conatiner">
                <nav className="user-header-section flex space-between align-center main-layout"  >
                    <div className="logo-container flex align-center">
                        <NavLink to="/"> <FaAirbnb size={30} color="#FF5A5F" /></NavLink>
                        <span>airbnb</span>
                    </div>
                    <div className="nav-bar-container flex space-between align-center">
                        <NavLink to="/stay">Explore</NavLink>
                        <NavLink to="/stay/10006546">Become a host</NavLink>
                    </div>
                    <div className="user-img-container flex">
                        <button className="user-btn flex space-between">
                            <div className="btn-section flex space-between">
                                <p className="menu-btn">☰</p>
                                <div className="user-logo-container">
                                    <div className="user-header-logo">
                                        <p >I</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </nav>
                <SearchBar/>
                {/* <div className="search-bar-container flex justify-center">
                    <div className="flex column">
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" />
                    </div>
                    <DateRangePicker
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
                    <button className="search-btn">Search</button>
                </div>
                {this.state.isGuestMode && <GuestsModal />} */}
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        count: state.userModule.count,
        isLoading: state.systemModule.isLoading
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaAirbnb } from 'react-icons/fa'
import { onLogin, onLogout, onSignup, loadUsers, removeUser, } from '../store/user.actions.js'
import { setFilter } from '../store/stay.actions';
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
        const { user, setFilter } = this.props
        return (
            <header className="app-header-conatiner">
                <nav className="user-header-section flex space-between align-center main-layout"  >
                    <div className="logo-container flex align-center">
                        <NavLink to="/"> <FaAirbnb size={30} color="#FF5A5F" /></NavLink>
                        <span>airbnb</span>
                    </div>
                    <div className="nav-bar-container flex space-between">
                        <NavLink to="/explore">Explore</NavLink>
                        <NavLink to="/stay/10006546">Become a host</NavLink>
                    </div>
                    <div className="user-img-container flex">
                        <button className="user-btn flex space-between">
                            <div className="btn-section flex space-between">
                                <p className="menu-btn">☰</p>
                                <div className="user-logo-container">
                                    <div className="user-header-logo">
                                        <p>I</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </nav>
                <SearchBar setFilter={setFilter} />
                <LoginSignup />
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
    removeUser,
    setFilter,
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
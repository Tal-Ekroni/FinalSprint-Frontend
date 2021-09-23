import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaAirbnb } from 'react-icons/fa'

import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

class _AppHeader extends React.Component {
    onLogin = (credentials) => {
        this.props.onLogin(credentials)
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }

    render() {
        const { user } = this.props
        return (
            <header className="app-header">
                <nav className="user-header-section flex space-between align-center" >
                    <div className="logo-container">
                        <NavLink to="/"> <FaAirbnb size={30} color="#FF5A5F" /></NavLink>
                    </div>
                    <div className="nav-bar-container flex space-between">
                        <NavLink to="/stay">Explore</NavLink>
                        <NavLink to="/">Become a host</NavLink>
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
import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaAirbnb, FaBars } from 'react-icons/fa'
import { onLogin, onLogout, onSignup, loadUsers, removeUser, } from '../store/user.actions.js'
import { setFilter } from '../store/stay.actions';
import { LoginSignup } from './login-signup.jsx'
import { SearchBar } from './search-bar';
import { UserMenu } from './user-menu';
import { Select } from '@material-ui/core';


class _AppHeader extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        isGuestMode: false,
        isUserMenuOpen: false,
        isLoginBotmodal: false

    }
    componentDidMount() {
        this.setState({ isUserMenuOpen: false, isLoginBotmodal: false })
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
    onToogleMenu = () => {
        this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen })
    }
    onOpenBotLogin = () => {
        this.setState({ isLoginBotmodal: true })
    }
    render() {
        const { user, setFilter } = this.props
        const { isUserMenuOpen, isLoginBotmodal } = this.state
        return (
            <header className="app-header-conatiner main-container">
                <nav className="user-header-section flex space-between "  >
                    <div className="logo-container flex align-center">
                        <NavLink to="/" className="logo"><span>Any</span><FaAirbnb size={40} color="#FFF"/><span>Go</span></NavLink>
                    </div>
                    <div className="nav-bar-container flex ">
                        <div className="nav-options flex align-center">
                            <NavLink to="/stay/" className="nav-opt">Become a host</NavLink>
                            <NavLink to="/explore" className="nav-opt">Explore</NavLink>
                        </div>
                        <div className="user-img-container ">
                            <button className="user-btn flex align-center ">
                                <div className="btn-section flex align-center justify-center">
                                    <FaBars onClick={this.onToogleMenu} className="menu-btn" />
                                    <div className="user-logo-container">
                                        {user && <img src={`https://i.pravatar.cc/100?u=${user._id}`} alt="" />}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="user-menu">
                            {isUserMenuOpen && <UserMenu onToogleMenu={this.onToogleMenu} onOpenBotLogin={this.onOpenBotLogin} />}
                        </div>
                    </div>
                </nav>
                <SearchBar setFilter={setFilter} />
                {isLoginBotmodal && <div className="main-layout">
                    <LoginSignup />
                </div>}

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
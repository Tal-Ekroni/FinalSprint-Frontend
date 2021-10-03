import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaAirbnb, FaBars } from 'react-icons/fa'
import { onLogin, onLogout, onSignup, loadUsers, removeUser, } from '../store/user.actions.js'
import { setFilter, setMiniHeader } from '../store/stay.actions';
import { LoginSignup } from './login-signup.jsx'
import { SearchBar } from './search-bar';
import { UserMenu } from './user-menu';
import { Select } from '@material-ui/core';


class _AppHeader extends React.Component {
    state = {
        isUserMenuOpen: false,
        isLoginBotmodal: false,
        isScreenOpen: false,
        guestModal: false,
        datesModal: false,
        locModal: false,
        isMiniInput: false
    }

    componentDidMount() {
        this.setState({ isUserMenuOpen: false, isLoginBotmodal: false })
        window.scrollTo(0, 0)
        window.addEventListener('scroll', this.onScrollCloseModals)
        this.onDetectScreenWitdh()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isMiniHeader !== this.props.isMiniHeader && !this.props.isMiniHeader) {
            this.closeAllModals()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollCloseModals)
    }
    onScrollCloseModals = (ev) => {
        if (ev.target.scrollingElement.scrollTop > 1) {
            this.closeAllModals()
            this.setState({ isMiniInput: false })
        }
    }
    onDetectScreenWitdh = () => {
        if (window.innerWidth < 780) {
            console.log(window.innerWidth);
            this.setState({ isMiniInput: false })
            this.props.setMiniHeader(false)
        }
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

    onToogleMenu = () => {
        this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen })
    }
    onOpenBotLogin = () => {
        this.setState({ isLoginBotmodal: true })
    }
    onToggleScreen = (val) => {
        this.setState({ isScreenOpen: val })
    }
    onToggleSearchModals = (modal) => {
        switch (modal) {
            case 'locModal':
                this.closeAllModals()
                this.onToggleScreen(!this.state.locModal)
                this.setState({ locModal: !this.state.locModal })
                break;
            case 'guestModal':
                this.closeAllModals()
                this.onToggleScreen(!this.state.guestModal)
                this.setState({ guestModal: !this.state.guestModal })
                break;
            case 'datesModal':
                this.closeAllModals()
                this.onToggleScreen(!this.state.datesModal)
                this.setState({ datesModal: !this.state.datesModal })
                break;
        }
    }

    closeAllModals = () => {
        this.onToggleScreen(false)
        this.setState({ locModal: false, guestModal: false, datesModal: false })
    }
    onToggleMiniSearchBar = () => {
        this.setState({ isMiniInput: !this.state.isMiniInput })
    }
    render() {
        const { user, setFilter, filterBy, isMiniHeader } = this.props
        const { isUserMenuOpen, isLoginBotmodal, isScreenOpen, locModal, datesModal, guestModal, isMiniInput } = this.state
        return (
            <header className={isMiniHeader ? `app-header-conatiner main-container` : isMiniInput ? `app-header-conatiner main-container mini-header-with-input` : `app-header-conatiner main-container mini-header`}>
                <div className={isScreenOpen ? "screen screen-open full" : "screen full"} onClick={() => { this.closeAllModals() }}></div>
                <nav className="user-header-section flex space-between align-center">

                    <div className="logo-container flex align-center">
                        <NavLink to="/" className="logo"><FaAirbnb size={40} color={isMiniHeader ? '#fff' : '#ff5a5f'} /><span>AnyGo</span></NavLink>
                    </div>

                    <div className="mini-search-bar">
                        {!isMiniHeader && <SearchBar setFilter={setFilter} isMiniHeader={isMiniHeader} filterBy={filterBy} datesModal={datesModal} guestModal={guestModal} locModal={locModal} onToggleSearchModals={this.onToggleSearchModals} onToggleMiniSearchBar={this.onToggleMiniSearchBar} />}
                    </div>
                    <div className="nav-bar-container flex ">
                        <div className="nav-options flex align-center">
                            <NavLink to="/stay/" className="nav-opt">Become a host</NavLink>
                        </div>

                        <div className="flex align-center">
                            <NavLink to="/explore/" className="nav-opt">Explore</NavLink>
                        </div>


                        <div className="user-img-container " onClick={this.onToogleMenu}>

                            <button className="user-btn flex align-center btn-section  ">
                                <FaBars className="menu-btn" />
                                <div className="user-logo-container">
                                    {user && <img src={`https://i.pravatar.cc/100?u=${user._id}`} alt="" />}
                                </div>
                            </button>
                        </div>

                        <div className="user-menu">
                            {isUserMenuOpen && <UserMenu onToogleMenu={this.onToogleMenu} onOpenBotLogin={this.onOpenBotLogin} />}
                        </div>

                    </div>
                </nav>
                {isMiniHeader && <SearchBar setFilter={setFilter} isMiniHeader={isMiniHeader} filterBy={filterBy} datesModal={datesModal} guestModal={guestModal} locModal={locModal} onToggleSearchModals={this.onToggleSearchModals} />}
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
        isLoading: state.systemModule.isLoading,
        filterBy: state.stayModule.filterBy,
        isMiniHeader: state.stayModule.isMiniHeader

    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser,
    setFilter,
    setMiniHeader
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
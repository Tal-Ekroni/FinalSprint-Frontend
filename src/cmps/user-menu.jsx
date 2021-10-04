import React from 'react'
import { connect } from 'react-redux'

import { Link, NavLink } from 'react-router-dom'
import { userService } from '../services/user.service'
import { onLogout, loadUser } from '../store/user.actions'
class _UserMenu extends React.Component {
    state = {
        isLoginModalOn: false
    }

    onLogout = () => {
        this.props.onLogout()
        this.props.onToogleMenu()
    }
    // onOpenLogin = () => {
    //     this.setState({ isLoginModalOn: true })
    // }
    onCloseLogin = () => {
        this.setState({ isLoginModalOn: false })
        this.props.onToogleMenu()
    }
    onOpenLogin = () => {
        this.props.onOpenBotLogin()
        this.props.onToogleMenu()
    }

    render() {
        const { user } = this.props
        return (
            <div className="user-menu-container" >
                <section className="user-menu top-section">
                    <div >
                        {user && <NavLink onClick={() => this.props.onToogleMenu()} className="user-menu-line" to="/trips"><p>Trips</p></NavLink>}
                        {!user && <p className="user-menu-line"> Trips</p>}

                    </div>
                    {
                        user && user.isHost && <div >
                            <NavLink onClick={() => this.props.onToogleMenu()} className="user-menu-line" to="/host"><p>Host</p></NavLink>

                        </div>
                    }
                    <div className="user-menu-line">
                        <p>Wishlist</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Host a expirience</p>
                    </div>
                </section >
                <section className="user-menu bottom-section">
                    {user && <div className="user-menu-line" onClick={this.onLogout}>
                        <p>Logout</p>
                    </div>}
                    {!user && <div className="user-menu-line" onClick={this.onOpenLogin}>
                        <p>Login</p>
                        {/* <Link to='/login'>Login</Link> */}
                    </div>}
                    {!user && <div className="user-menu-line">
                        <p>Signup</p>
                    </div>}

                </section>
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogout,
    loadUser
}
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(_UserMenu)
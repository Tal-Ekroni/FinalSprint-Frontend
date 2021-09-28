import React from 'react'
import { connect } from 'react-redux'

import { userService } from '../services/user.service'
import { onLogout } from '../store/user.actions'
class _UserMenu extends React.Component {
    state = {
        isLoginModalOn: false
    }
    componentDidMount() {
        return async function () {
            const user = await userService.getLoggedinUser()
        }
    }
    onLogout = () => {
        this.props.onLogout()
        this.props.onToogleMenu()
    }
    onOpenLogin = () => {
        this.setState({ isLoginModalOn: true })
    }
    onCloseLogin = () => {
        this.setState({ isLoginModalOn: false })
        this.props.onToogleMenu()
    }
    
    render() {
        const { user } = this.props
        return (
            <div className="user-menu-container" >
                <section className="user-menu top-section">
                    <div className="user-menu-line">
                        <p>Messeges</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Notifications</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Trips</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Wishlist</p>
                    </div>

                </section>
                <section className="user-menu middle-section">
                    <div className="user-menu-line">
                        <p>Manage Lists</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Host a expirience</p>
                    </div>
                    <div className="user-menu-line">
                        <p>Account</p>
                    </div>

                </section>
                <section className="user-menu bottom-section">
                    <div className="user-menu-line">
                        <p>Help</p>
                    </div>

                    {user && <div className="user-menu-line" onClick={this.onLogout}>
                        <p>Logout</p>
                    </div>}
                    {!user && <div className="user-menu-line" onClick={this.onOpenLogin}>
                        <p>Login</p>
                    </div>}

                </section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        count: state.userModule.count,
    }
}
const mapDispatchToProps = {
    onLogout
}
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(_UserMenu)
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { onLogout, loadUser } from '../store/user.actions'
class _UserMenu extends React.Component {
    state = {
        isLoginModalOn: false
    }
    componentDidMount() {
        if (this.props.user) this.props.loadUser(this.props.user._id)
    }
    onLogout = () => {
        this.props.onLogout()
        this.props.onToggleSearchModals('menuModal')
        this.props.history.push('/')

    }

    onCloseLogin = () => {
        this.setState({ isLoginModalOn: false })
        this.props.onToggleSearchModals('menuModal')
    }
    onOpenLogin = () => {
        this.props.history.push('/login')
        this.props.onOpenBotLogin()
        this.props.onToggleSearchModals('menuModal')
        const noti = {
            byUser: { fullName: 'Davit Pok' },
            onUser: { fullName: 'Joe James' },
            createdAt: Date.now(),
            stayId: '',
            txt: 'Reservd you stay'
        }
    }

    render() {
        const { user } = this.props
        return (
            <div className="user-menu-container flex column" >
                <section className="user-menu top-section ">
                    <div >
                        {user && <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} className="user-menu-line" to="/notifications"><p>Notifications</p><span>{user.notifications.length ? user.notifications.length : ''}</span></NavLink>}
                    </div>
                    <div  >
                        {user && <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} className="user-menu-line" to="/trips"><p >Trips</p></NavLink>}
                        {!user && <p className="user-menu-line"> Trips</p>}

                    </div>
                    {
                        user && user.isHost && <div >
                            <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} to="/host" className="user-menu-line" ><p>Host</p></NavLink>

                        </div>
                    }
                    <div className="user-menu-line">
                        <p>Wishlist</p>
                    </div>
                    <div >
                        {user ? <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} className="user-menu-line" to="/become-a-host"><p >Host a expirience</p></NavLink> : <p className="user-menu-line">Host a expirience</p>}

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
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogout,
    loadUser
}
export const UserMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(_UserMenu))
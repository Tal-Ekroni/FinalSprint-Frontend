import React from 'react'
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
    }

    onCloseLogin = () => {
        this.setState({ isLoginModalOn: false })
        this.props.onToggleSearchModals('menuModal')
    }
    onOpenLogin = () => {
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
                        {user && <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} className="user-menu-line" to="/notifications"><p>Notifications</p></NavLink>}
                    </div>
                    <div  >
                        {user && <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} className="user-menu-line" to="/trips"><p >Trips</p></NavLink>}
                        {!user && <p className="user-menu-line"F> Trips</p>}

                    </div>
                    {
                        user && user.isHost && <div >
                            <NavLink onClick={() => this.props.onToggleSearchModals('menuModal')} to="/host" className="user-menu-line" ><p>Host</p></NavLink>

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
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogout,
    loadUser
}
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(_UserMenu)
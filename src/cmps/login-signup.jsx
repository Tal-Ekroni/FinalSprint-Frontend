import React from 'react'
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';
import { LoginPage } from '../pages/login'
import { socketService } from '../services/socket.service';
import { stayService } from '../services/stay.service';
import { onLogin, onLogout, onSignup, loadUsers, updateUser } from '../store/user.actions'
import { GoogleLoginCmp } from './google-login';
class _LoginSignup extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignup: false,
        users: []
    }
    async componentDidMount() {

        try {
            await this.props.loadUsers()
        } catch (err) {
            console.log('error', err)
        }
    }
    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onLogin = async (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username) return;
        await this.props.onLogin(this.state.credentials);
        const { user } = this.props
        if (user.isHost) {
            const stays = await stayService.query()
            socketService.setup()
            socketService.emit('setHost', user._id)
            socketService.on('getNotif', async (notif) => {

                // {
                //     "byUser": {
                //         "fullName": "Houston Anderson",
                //         "imgUrl": "/img/img1.jpg",
                //         "_id": "615856f7cb4c045b46874e45"
                //     },
                //     "createdAt": 1633891364304,
                //     "stay": {
                //         "_id": "61585943cb4c045b46874e50",
                //         "name": "New York, United States"
                //     },
                //     "txt": "Reserved your stay",
                //     "isRead": false
                // }

                const editedNotif = {
                    notifTxt: `${notif.txt} at ${notif.stay.name}`,
                    byUser: notif.byUser.fullName,
                    // byUserImg: <div className="user-order-img-container flex align-center" >
                    //     <div>
                    //         <img src={`https://i.pravatar.cc/100?u=${notif.byUser._id.substr(notif.byUser._id.length - 9)}`} alt="user-icon" />
                    //     </div>
                    //     <p>{notif.byUser.fullName}</p>
                    // </div>,
                    isRead: notif.isRead,
                    createdAt: notif.createdAt,
                    // approveBtn: <div className="host-action-btns flex align-center">
                    //     <NavLink to={`host`} className="approve-order-btn">Go to order</NavLink>
                    // </div>
                }
                user.notifications = [editedNotif, ...user.notifications]
                await this.props.updateUser(user)
            })
        }
        this.clearState()
    }

    onSignup = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        this.props.onSignup(this.state.credentials);
        this.clearState()
        this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }
    responseGoogle = (response) => {
        console.log(response);
    }
    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        const { user, users } = this.props
        return (
            <div className="login-page">
                {/* <p>
                    <button className="btn-link" onClick={this.toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p> */}
                {!isSignup && !user && <form className="login-form" onSubmit={this.onLogin}>
                    {users && <select
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select>}

                    {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    /> */}
                    <button>Login!</button>
                </form>}

                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={this.onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            placeholder="Fullname"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />
                        <button >Signup!</button>
                    </form>}
                </div>
                <LoginPage />

                <GoogleLoginCmp />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        users: state.userModule.users
    }
}
const mapDispatchToProps = {
    onLogin,
    onLogout,
    onSignup,
    loadUsers,
    updateUser
}

export const LoginSignup = withRouter(connect(mapStateToProps, mapDispatchToProps)(_LoginSignup))

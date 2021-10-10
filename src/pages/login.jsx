import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { socketService } from '../services/socket.service'
import { stayService } from '../services/stay.service'
import { userService } from '../services/user.service'
import { onLogin, onLogout, onSignup, updateUser } from '../store/user.actions'
class _LoginPage extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignUp: false,
        users: []
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const users = await userService.getUsers()
        this.setState({ users })
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignUp: false
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
    console.log('login');
        this.props.onLogin(this.state.credentials);
        this.clearState()
        const user = userService.getLoggedinUser()
        if (user.isHost) {
            const stays = await stayService.query()
            console.log('ishost', stays);
            socketService.setup()

            stays.forEach((stay) => {
                if (stay.host._id === user._id) socketService.emit('setStay', stay._id)

            })
            socketService.on('getNotif', async (notif) => {
                user.notifications = [notif, ...user.notifications]
                console.log(user, 'userrrrr');
                this.props.updateUser(user)
            })
        }
        this.props.history.push('/')
    }


    onSignup = async (ev = null) => {
        console.log('sign-up');
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        await this.props.onSignup(this.state.credentials);
        this.clearState()
        this.props.history.push('/')
    }


    toggleSignUp = (ev) => {
        ev.preventDefault()
        this.setState({ isSignUp: !this.state.isSignUp })
    }
    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignUp, users } = this.state;
        if (!users) return <div>loading...</div>
        return (
            <section className="flex justify-center page-padding">
                <form className="login flex column justify-center align-center">
                    <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                    <h2>{isSignUp ? 'Welcome to AnyGo' : 'Welcome back'}</h2>
                    <div className="input-fields flex column align-center">
                        {isSignUp && <div className='fullname-input'>
                            <input className='flex' type="text" name="fullname" placeholder="fullname" value={fullname} onChange={this.handleChange} required />
                        </div>}
                        <div className={isSignUp ? 'login-input border-top' : 'login-input'}>
                            <input className='flex' type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required />
                        </div>
                        <div className='password-input'>
                            <input className='flex' type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                        </div>
                    </div>
                    <button className="login-btn" onClick={isSignUp ? this.onSignup : this.onLogin}>{isSignUp ? 'Sign Up' : 'Login'}</button>
                    <div className="new-user">
                        <button className="new-user-btn" onClick={this.toggleSignUp}>{isSignUp ? 'Already have an account ?' : 'New user ?'}</button>
                    </div>
                </form>
            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogin,
    onLogout,
    onSignup,
    updateUser
}

export const LoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_LoginPage))

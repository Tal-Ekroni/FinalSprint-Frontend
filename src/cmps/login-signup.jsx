import React from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/user.service'
import {  onLogin, onLogout, onSignup } from '../store/user.actions'
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
            isSignup: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onLogin = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username) return;
        this.props.onLogin(this.state.credentials);
        this.clearState()
    }

    onSignup = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        this.props.onSignup(this.state.credentials);
        this.clearState()
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup, users } = this.state;
        if(!users) return <div>loading...</div>
        return (
            <div className="login-page">
                {/* <p>
                    <button className="btn-link" onClick={this.toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p> */}
                {!isSignup && <form className="login-form" onSubmit={this.onLogin}>
                    <select
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select>

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

            </div>
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
    onSignup
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)

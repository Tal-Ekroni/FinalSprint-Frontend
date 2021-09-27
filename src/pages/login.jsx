import React from 'react'

export class LoginPage extends React.Component {
    state = {
        isSignUp: false
    }
    render() {
        const { isSignUp } = this.state
        return (
            <section className="flex justify-center">
                <form className="login flex column justify-center align-center">
                    <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                    <div className="input-fields flex column">
                        {isSignUp && <input type="text" placeholder="fullname" />}
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Password" />
                    </div>
                    <button className="login-btn">Login</button>
                </form>
            </section>

        )
    }
}
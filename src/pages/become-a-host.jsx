import React from 'react'
import { connect } from 'react-redux'
import hostLogo from '../assets/img/become-host.jpg'
// import { stayService } from '../services/stay.service'
import { onBecomeHost } from '../store/user.actions.js'
import { FaAirbnb } from 'react-icons/fa'

class _BecomeAHost extends React.Component {

    onBecomeHost = () => {
        if (this.props.user) {
            const userId = this.props.user._id
            this.props.onBecomeHost(userId)
            this.props.history.push('/host')
        }
        else this.props.history.push('/')
    }
    render() {
        return (
            <section className="be-host-container">
                <div className="be-host-left-container flex column ">
                    <div className="be-host-logo flex align-center" onClick={() => { this.props.history.push('/') }}><FaAirbnb color="#fff" size={40} /></div>
                    <div className="be-host-txt-container flex column align-center">
                        <div><h1>Hosting</h1></div>
                        <div><h1>makes AnyGo,</h1></div>
                        <div><h1>AnyGo</h1></div>
                    </div>
                    <div className="be-host-btn-container flex  align-center">
                        <button onClick={this.onBecomeHost} className="be-host-btn">Try hosting</button>
                    </div>
                </div>
                <div className="be-host-img-container">
                    <img src={hostLogo} alt="" />
                </div>
            </section>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays,
    }
}
const mapDispatchToProps = {
    onBecomeHost
}

export const BecomeAHost = connect(mapStateToProps, mapDispatchToProps)(_BecomeAHost)
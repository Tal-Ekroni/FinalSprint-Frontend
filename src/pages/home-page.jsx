import React from 'react'
import { connect } from 'react-redux'


import logo from '../assets/img/logo.png'
import locImg from '../assets/img/location-preview.png'

class _HomePage extends React.Component {
    state = {}

    changeCount = (diff) => {
        console.log('Changing count by:', diff);
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }

    render() {
        return (
            <section className="home-page flex column main-container">
                <div className="hero main-container full">
                </div>
                <div className="sug-loc">
                    <h2>Suggested locations:</h2>
                    <div className="locations flex space-between">
                        <div className="loc-section flex justify-center main-container ">
                            <img src={locImg} onClick={() => {this.props.history.push('/explore/Porto')}} />
                            <h1 className="flex align-center">Porto</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} onClick={() => {this.props.history.push('/explore/Barcelona')}} />
                            <h1 className="flex align-center" >Barcelona</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} onClick={() => {this.props.history.push('/explore/Beer')}} />
                            <h1 className="flex align-center">Beer-Yaakov</h1>
                        </div>
                    </div>
                </div>
                <div className="live-any flex column">
                    <h1>Live Anywhere:</h1>
                    <div className="live-loc flex space-between">

                        <div className="live-card flex column">
                            <img src={locImg} alt="" />
                            <p>Near the city</p>
                        </div>
                        <div className="live-card flex column">
                            <img src={locImg} alt="" />
                            <p>Pets Allowed</p>
                        </div>
                        <div className="live-card flex column">
                            <img src={locImg} alt="" />
                            <p>In the jungle</p>
                        </div>
                    </div>

                </div>
                <div className="host-banner flex column justify-center">
                    <h1>Try hosting</h1>
                    <p>Earn extra income and unlock new opportunities by sharing your space</p>
                    <button className="try-host-btn">Learn More</button>
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)
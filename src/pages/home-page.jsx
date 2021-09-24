import React from 'react'
import { connect } from 'react-redux'


import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}

    changeCount = (diff) => {
        console.log('Changing count by:', diff);
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }

    render() {
        return (
            <section className="home-page flex column">
                <div className="hero">
                </div>
                <div className="sug-loc">
                    <h2>Suggested locations:</h2>
                    <div className="locations flex space-between">
                        <div className="loc-section flex justify-center ">
                            <img src="../../public/img/location-preview.png" />
                            <h1 className="flex align-center">New-York</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src="../../public/img/location-preview.png" alt="" />
                            <h1 className="flex align-center" >Paris</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src="../../public/img/location-preview.png" alt="" />
                            <h1 className="flex align-center">Tokyo</h1>
                        </div>
                    </div>
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
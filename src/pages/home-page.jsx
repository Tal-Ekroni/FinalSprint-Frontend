import React from 'react'
import { connect } from 'react-redux'
import locImg from '../assets/img/location-preview.png'
import { setFilter } from '../store/stay.actions';

class _HomePage extends React.Component {
    state = {}

    changeCount = (diff) => {
        console.log('Changing count by:', diff);
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }
    onClickLoc = (val) => {
        const newFilter = this.props.filterBy
        newFilter.location = val
        this.props.setFilter(newFilter)
        this.props.history.push('/explore')
    }
    render() {
        return (
            <section className="home-page flex column main-container">
                <div className="hero main-container full">
                </div>
                <div className="sug-loc">
                    <h2>Suggested locations:</h2>
                    <div className="locations flex space-between">
                        <div className="loc-section flex justify-center ">
                            <img src={locImg} onClick={() => { this.onClickLoc('porto') }} />
                            <h1 className="flex align-center">Porto</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} onClick={() => { this.onClickLoc('Barcelona') }} />
                            <h1 className="flex align-center" >Barcelona</h1>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} onClick={() => { this.onClickLoc('Beer') }} />
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
        count: state.userModule.count,
        filterBy: state.stayModule.filterBy
    }
}
const mapDispatchToProps = {
    setFilter,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
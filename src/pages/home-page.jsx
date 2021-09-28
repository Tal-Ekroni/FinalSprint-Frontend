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
    onClickLoc = (val, type) => {
        const newFilter = this.props.filterBy
        switch (type) {
            case 'location':
                newFilter.location = val
                break;
            case 'amenity':
                newFilter.amenities = val
                break;
            case 'assetType':
                newFilter.assetType = val
                break;
            case 'capacity':
                newFilter.capacity = val
                break;
            case 'uniqueStay':
                newFilter.uniqueStay = val
                break;
        }
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
                        <div className="loc-section flex justify-center">
                            <img src={locImg} className="loc-img" onClick={() => { this.onClickLoc('porto', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p>Porto</p>
                                <p>Portugal</p>
                            </div>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} className="loc-img" onClick={() => { this.onClickLoc('Barcelona', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p>Barcelona</p>
                                <p>Spain</p>
                            </div>
                        </div>
                        <div className="loc-section flex justify-center">
                            <img src={locImg} className="loc-img" onClick={() => { this.onClickLoc('Beer', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p>Beer-Yaakov</p>
                                <p>Israel</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="live-any flex column">
                    <h1>Live Anywhere:</h1>
                    <div className="live-loc flex space-between">

                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('duplex', 'assetType') }} src={locImg} alt="" />
                            <p>Entire duplex</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('Pets allowed', 'amenity') }} src={locImg} alt="" />
                            <p>Pets Allowed</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc(10, 'capacity') }} src={locImg} alt="" />
                            <p>Large capacity</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('unique', 'uniqueStay') }} src={locImg} alt="" />
                            <p>Unique stays</p>
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
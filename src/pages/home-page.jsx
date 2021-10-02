import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import locImg1 from '../assets/img/location-preview-1.png'
import locImg2 from '../assets/img/location-preview-2.png'
import locImg3 from '../assets/img/location-preview-3.png'
import locImg4 from '../assets/img/location-preview-4.png'
import locImg5 from '../assets/img/location-preview-5.jpg'
import locImg6 from '../assets/img/location-preview-6.png'
import locImg7 from '../assets/img/location-preview-7.jpg'
import locImg8 from '../assets/img/location-preview-8.png'
import pet from '../assets/img/pets-allowed.jpg'
import duplex from '../assets/img/entire-duplex.jpg'
import cap from '../assets/img/large-capacity.jpg'
import unique from '../assets/img/unique-stays.jpg'
import { setFilter, setMiniHeader } from '../store/stay.actions';

class _HomePage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.setMiniHeader(true)
        window.addEventListener('scroll', this.onSetMiniHeader)
    }
    componentWillUnmount() {
        this.props.setMiniHeader(false)
        window.removeEventListener('scroll',this.onSetMiniHeader)
    }
    onSetMiniHeader=(ev) => {
        if (ev.target.scrollingElement.scrollTop > 50) {
            this.props.setMiniHeader(false)
        } else {
            this.props.setMiniHeader(true)
        }
    }
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

                <div className="hero main-container full flex justify-center align-center">
                    <div className="where-to-go flex justify-center align-center">
                        <h3>Not sure where to go? Perfect.</h3>
                        <button className="flex-btn flex justify-center align-center">
                            <Link to="/explore">I'm flexible
                            </Link>
                        </button>
                    </div>
                </div>

                <div className="sug-loc">
                    <h2>Popular destinations</h2>
                    <div className="locations">
                        <div className="loc-section flex">
                            <img src={locImg1} className="loc-img" onClick={() => { this.onClickLoc('porto', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Porto</p>
                                <p className="country-name">Portugal</p>
                            </div>
                        </div>
                        <div className="loc-section flex">
                            <img src={locImg2} className="loc-img" onClick={() => { this.onClickLoc('Barcelona', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Barcelona</p>
                                <p className="country-name">Spain</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg3} className="loc-img" onClick={() => { this.onClickLoc('Aviv', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Tel-Aviv</p>
                                <p className="country-name">Israel</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg4} className="loc-img" onClick={() => { this.onClickLoc('Paris', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Paris</p>
                                <p className="country-name">France</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg5} className="loc-img" onClick={() => { this.onClickLoc('London', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">London</p>
                                <p className="country-name">United Kingdoms</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg6} className="loc-img" onClick={() => { this.onClickLoc('York', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">New York</p>
                                <p className="country-name">United States</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg7} className="loc-img" onClick={() => { this.onClickLoc('Amsterdam', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Amsterdam</p>
                                <p className="country-name">Netherlands</p>
                            </div>
                        </div>
                        <div className="loc-section flex ">
                            <img src={locImg8} className="loc-img" onClick={() => { this.onClickLoc('Rome', 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">Rome</p>
                                <p className="country-name">Italy</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="live-any flex column">
                    <h2>Live Anywhere</h2>
                    <div className="live-loc flex space-between">

                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('duplex', 'assetType') }} src={duplex} alt="" />
                            <p>Entire duplex</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('Pets allowed', 'amenity') }} src={pet} alt="" />
                            <p>Pets Allowed</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc(10, 'capacity') }} src={cap} alt="" />
                            <p>Large capacity</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" onClick={() => { this.onClickLoc('unique', 'uniqueStay') }} src={unique} alt="" />
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
    setMiniHeader
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
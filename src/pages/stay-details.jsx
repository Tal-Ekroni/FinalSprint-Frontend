import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { FaStar, FaMedal, FaUpload, FaHeart } from 'react-icons/fa'
import { onEditStay, onRemoveStay, addToCart } from '../store/stay.actions.js'
// import * as data from '../data/air-data.json';
// import img from '../assets/img/1.jpg'
// const stay = data.stay;
// var stay = data.default[0].stay[0]
class _StayDetails extends React.Component {
    state = {
        stay: null,
        stayReviews: []
    }
    componentDidMount() {
        // localStorage.setItem('stay', JSON.stringify([stay]))
        const { stayId } = this.props.match.params
        if (!stayId) this.props.history.push('/')
        else {
            let currStay;
            stayService.getById(stayId)
                .then(stay => {
                    currStay = stay
                    console.log('currStay', currStay);
                    this.setState({ stay: currStay })
                })
        }
    }
    onRemoveStay = (stayId) => {
        this.props.onRemoveStay(stayId)
    }


    render() {
        const { stay } = this.state
        return (
            <section className="stay-details-section">
                {stay && <div className="stay-details-container">
                    <section className="stay-info">
                        <div className="stay-name-conatiner">
                            <h2>{stay.name}</h2>
                        </div>
                        <section className="flex space-between">
                            <div className="stay-info-conatiner flex">
                                <div className="stay-review-avg flex align-end">
                                    <p><FaStar size={13} color="#FF5A5F" /></p>
                                    <p>4.9</p>
                                    <p>{`(${stay.reviews.length} reviews)`}</p>
                                </div>
                                <p>•</p>
                                <div className="host-level-container flex align-end">
                                    <p><FaMedal size={13} color="#FF5A5F" /></p>
                                    <p>Superhost</p>
                                </div>
                                <p>•</p>
                                <div className="host-location-container flex align-end">
                                    <p className="info-line-loc">{stay.loc.address}</p>
                                </div>
                            </div>
                            <div className="user-btns-container flex">
                                <div className="share-btn-container flex align-end">
                                    <p><FaUpload size={13} /></p>
                                    <p>Share</p>
                                </div>
                                <div className="save-btn-container flex align-end">
                                    <p><FaHeart size={13} /></p>
                                    <p>Save</p>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className="imgs-container">
                        <div className="imgs-grid-container">
                            <div className="grid-items item-1"></div>
                            <div className="grid-items item-2"></div>
                            <div className="grid-items item-3"></div>
                            <div className="grid-items item-4"></div>
                            <div className="grid-items item-5"></div>
                        </div>
                    </section>
                    <section className="host-info-container flex align-center space-between">
                        <div className="asset-short-info flex">
                            <div className="host-by">
                                <p>{`${stay.assetType} hosted by ${stay.host.fullname}`}</p>
                            </div>
                            <div className="asset-info">
                                <p>{`${stay.capacity} guests`}<span>•</span>{`${stay.capacity} guests`}<span>•</span>{`${stay.capacity} guests`}<span>•</span>{`${stay.capacity} guests`} </p>
                            </div>
                        </div>
                        <div className="host-img-container">
                            {/* <img src={stay.host.imgUrl}  /> */}
                            <p>i</p>
                        </div>
                    </section>
                    <section className="asset-desc-container">
                        <div className="asset-desc">
                            <p>"{stay.summary}"</p>
                        </div>
                    </section>
                </div>}
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        currStay: state.stayModule.currStay,
        reviews: state.reviewModule.reviews

    }
}
const mapDispatchToProps = {
    onRemoveStay,
    onEditStay,
    addToCart
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)
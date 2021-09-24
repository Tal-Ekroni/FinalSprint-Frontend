import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { FaHome, FaBroom, FaDoorClosed, FaKey } from 'react-icons/fa'
import { onEditStay, onRemoveStay, addToCart } from '../store/stay.actions.js'
import { BasicInfo } from '../cmps/details-base-info'
import { AssetSum } from '../cmps/details-asset-sum'
import { AssetAmenities } from '../cmps/details-amenities'
import * as data from '../data/air-data.json';
// import img from '../assets/img/1.jpg'
// const stay = data.stay;
var stay = data.default[0].stay[0]
class _StayDetails extends React.Component {
    state = {
        stay: null,
        stayReviews: []
    }
    componentDidMount() {
        localStorage.setItem('stay', JSON.stringify([stay]))
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
                    <BasicInfo stay={stay} />
                    <section className="host-info-container flex align-center space-between">
                        <div className="asset-short-info flex">
                            <div className="host-by">
                                <p>{`${stay.assetType} hosted by ${stay.host.fullname}`}</p>
                            </div>
                            <div className="asset-info">
                                <p>{`${stay.capacity} guests`}<span>•</span>{`${stay.capacity} bedrooms`}<span>•</span>{`${stay.capacity} beds`}<span>•</span>{`${stay.capacity} baths`} </p>
                            </div>
                        </div>
                        <div className="host-img-container">
                            <p>i</p>
                        </div>
                    </section>
                    <section className="asset-sum-container">
                 <AssetSum/>
                    </section>
                    <section className="asset-desc-container">
                        <div className="asset-desc">
                            <p>"{stay.summary}"</p>
                        </div>
                    </section>
                    <section>
                    <AssetAmenities amenities={stay.amenities}/>
                    </section>
                </div>}
            </section>
        )
    }
}
{/* <img src={stay.host.imgUrl}  /> */ }
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
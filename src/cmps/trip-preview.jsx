import React from "react";
import { connect } from 'react-redux'
import { FaStar, } from "react-icons/fa";
import { onToggleLikeTrip } from '../store/user.actions.js'

import LazyLoad from "./preview-slider"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { showErrorMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";

class _TripPreview extends React.Component {
    state = {
        trip: null
    }
    loadStays = () => {

    }
    render() {
        const {  trip } = this.props
        console.log(trip);
        return (
            <div className="trip-preview"  >
                {trip &&
                    <section>

                        <div className="trip-img">
                            <img  src={trip.stay.imgUrl} alt="" />
                        </div>
                        <div className="preview-details">
                            {/* <span className="preview-rating flex align-center">
                        <FaStar size={13} color="#FF5A5F" />
                        <p className="preview-rating-amount">{trip.reviews[0].rate}</p>
                        <span className="preview-review-count flex"><span>(</span>{reviews.length}<span>)</span></span>
                        <p>reviews</p>
                    </span> */}
                            <div className="trip-style flex">
                                {/* <h3><span>{this.props.trip.assetType}</span> &#183; <span>{this.props.trip.loc.address.split(',')[0]}</span></h3> */}
                                {/* <h3>  {trip.assetType} <span> &#183;</span> {
                        trip.loc.address.split(',')[0]}  </h3> */}
                            </div>
                            <div className="trip-name" >
                                <h3>{trip.name}</h3>
                            </div>
                            {/* <div className="preview-price" >
                                <h3><span className="preview-price-amount">${trip.price}</span> / night</h3>
                            </div> */}
                        </div >
                    </section>}
            </div >
        )
        return (
            <div>hi</div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays



    }
}



export const TripPreview = connect(mapStateToProps)(_TripPreview)
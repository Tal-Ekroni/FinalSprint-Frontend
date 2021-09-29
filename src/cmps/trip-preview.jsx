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
    getTime = (time) => {
        var time = new Date(time * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();

        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);

        console.log('ft', formattedTime);
        return formattedTime
    }
    render() {
        const { trip } = this.props
        var startDate = this.getTime(trip.startDate)
        var endDate = this.getTime(trip.endDate)
        console.log(trip);
        return (
            <div className="trip-preview-container"  >
                {trip &&
                    <section>
                        <div>
                            <div className="trip-img-container">
                                {/* <img src={trip.stay.imgUrl} alt="" /> */}
                                <LazyLoad imgs={trip.stay.imgUrls} />
                            </div>
                        </div>
                        <div className="trip-preview-details">
                            <div className="name-dates-container flex space-between">
                                <div><h4>{trip.stay.name}</h4></div>
                                <div>
                                    <div>{startDate}</div>
                                    <div>{endDate}</div>
                                </div>
                            </div>
                            <div className="flex space-between">
                                {trip.status === 'pending' && <div>
                                    <p>Wait for approval</p>
                                </div>}
                                <div><p>Cancel order</p></div>
                            </div>
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
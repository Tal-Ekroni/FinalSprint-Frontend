import React from "react";
import { connect } from 'react-redux'
import { onCancelOrder } from '../store/order.actions'
import LazyLoad from "./preview-slider"

class _TripPreview extends React.Component {
    state = {
        trip: null
    }
   
    getTime = (time) => {
        var time = new Date(time * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    onCancelTrip = (trip) => {
        const { _id, buyer, host } = trip
        const buyerId = buyer._id
        const hostId = host._id
        this.props.onCancelOrder(_id, buyerId, hostId)
    }
    render() {
        const { trip } = this.props
        var startDate = this.getTime(trip.startDate)
        var endDate = this.getTime(trip.endDate)
        console.log('trip', trip);
        return (
            <div className="trip-preview-container"  >
                {trip &&
                    <section>
                        <div>
                            <div className="trip-img-container">
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
                                {trip.status === 'approved' && <div>
                                    <p>Approved by host!</p>
                                </div>}
                                <div><p className="user-cancel" onClick={() => { this.onCancelTrip(trip) }}>Cancel order</p></div>
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

const mapDispatchToProps = {
    onCancelOrder
}


export const TripPreview = connect(mapStateToProps, mapDispatchToProps)(_TripPreview)
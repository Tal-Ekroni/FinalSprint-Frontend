import React from "react";
import { connect } from 'react-redux'
import { onCancelOrder, onRemoveOrder, onUpdateOrder } from '../../store/order.actions'
import LazyLoad from "../preview-slider"

class _TripPreview extends React.Component {
    state = {
        trip: null
    }

    getTime = (timeStamp) => {
        var time = new Date(timeStamp * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    onCancelTrip = (trip) => {
        trip.status = "canceled"
        this.props.onUpdateOrder(trip)
    }
    onRemoveTrip = (tripId) => {
        this.props.onRemoveOrder(tripId)
    }
    render() {
        const { trip } = this.props
        var startDate = this.getTime(trip.startDate)
        var endDate = this.getTime(trip.endDate)
        return (
            <div className="trip-preview-container"  >
                {trip.stay &&
                    <section>
                        <div>
                            <div className="trip-img-container">
                                {trip.stay.imgUrls.length && <LazyLoad imgs={trip.stay.imgUrls} />}
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
                            {trip.status === 'pending' && <div className="host-btns-container flex space-between">
                                <div>
                                    <p>Wait for approval</p>
                                </div>
                                <div>
                                    <button onClick={() => { this.onCancelTrip(trip) }} className="host-btns cancel-btn">Cancel</button>
                                </div>
                            </div>}
                            {trip.status === 'canceled' && <div className="host-btns-container flex space-between">
                                <div>
                                    <button className="host-btns approve-btn">Canceled</button>
                                </div>
                                <div>
                                    <button onClick={() => { this.onRemoveTrip(trip._id) }} className="host-btns cancel-btn">Remove</button>
                                </div>
                            </div>}
                            {trip.status === 'declined' && <div className="host-btns-container flex space-between">
                                <div>
                                    <p>Declined by host</p>
                                </div>
                                <div>
                                    <button onClick={() => { this.onRemoveTrip(trip._id) }} className="host-btns cancel-btn">Remove</button>
                                </div>
                            </div>}
                            {trip.status === 'approved' && <div className="host-btns-container flex space-between">
                                <div>
                                    <p>Approved by host!</p>
                                </div>
                                <div>
                                    <button onClick={() => { this.onCancelTrip(trip) }} className="host-btns cancel-btn">Cancel</button>
                                </div>
                            </div>}
                            {/* <div className="flex space-between">
                                {trip.status === 'pending' && <div>
                                    <p>Wait for approval</p>
                                </div>}
                                {trip.status === 'approved' && <div>
                                    <p>Approved by host!</p>
                                </div>}
                                <div><p className="user-cancel" onClick={() => { this.onCancelTrip(trip) }}>Cancel order</p></div>
                            </div> */}
                        </div >
                    </section>}
            </div >
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
    onCancelOrder,
    onRemoveOrder,
    onUpdateOrder
}


export const TripPreview = connect(mapStateToProps, mapDispatchToProps)(_TripPreview)
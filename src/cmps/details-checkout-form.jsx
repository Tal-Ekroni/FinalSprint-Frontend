import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController, SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { onBookTrip } from '../store/stay.actions.js'
import { FaStar } from 'react-icons/fa'
import Select from 'react-select';

import { Button, TextField } from '@material-ui/core'
import 'react-dates/lib/css/_datepicker.css';
import { showErrorMsg } from '../services/event-bus.service.js';
import { DatesPicker2 } from './dates-picker2.jsx';
class _CheckoutForm extends React.Component {

    state = {
        trip: {
            startDate: null,
            endDate: null,
            guests: { adults: 1, kids: 0 }
        },
        isGuestPopupOn: false,
        isCheckoutToReserve: false,
        datesModal: false

    }
    componentDidMount() {
        const { stay, filterBy } = this.props
        this.setState({
            trip: {
                startDate: filterBy.startDate,
                endDate: filterBy.endDate,
                guests: { adults: 1, kids: 0, infants: 0 },
                loc: stay.loc
            },
            isGuestPopupOn: false,
            isCheckoutToReserve: false,
            datesModal: false
        })
    }

    handleChange = ({ startDate, endDate, price }) => {
        if (startDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, startDate } }))
        }
        if (endDate) {

            this.setState(prevState => ({ trip: { ...prevState.trip, endDate } }))
        }
    }
    toTimestamp = (strDate) => {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }
    getTripPrice = (startDate, endDate, price) => {

        const start = new Date(startDate / 1000);
        const end = new Date(endDate / 1000);
        const timeDiff = (end - start)
        const summedNights = (timeDiff / 86400)
        const summedPrice = price * summedNights
        this.setState(prevState => ({ trip: { ...prevState.trip, summedNights, summedPrice }, isCheckoutToReserve: true }));


    }
    toggleDatesModal = (val) => {
        this.setState({ datesModal: false })
        this.setState({ datesModal: val })
    }
    onBookTrip = (stay, trip) => {
        if (!this.props.user) {
            showErrorMsg('login first')
        } else {
            // console.log(stay);
            const { _id, fullname, imgUrl, username } = this.props.user
            trip.user = { _id, fullname, imgUrl, username }
            trip.startDate = this.toTimestamp(trip.startDate._d)
            trip.endDate = this.toTimestamp(trip.endDate._d)
            trip.stay = {
                _id: stay._id,
                host: stay.host,
                imgUrls: stay.imgUrls,
                name: stay.name
            }
            trip.status = 'pending'
            this.props.onBookTrip(trip)
            this.setState({
                trip: {
                    startDate: null,
                    endDate: null,
                    guests: { adults: 1, kids: 0 }
                },
                isGuestPopupOn: false,
                isCheckoutToReserve: false
            })
        }

    }

    timeToShow = (date, val) => {
        var timeStamp = Date.parse(date);
        var time = new Date(timeStamp);
        var date = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }


    render() {

        const { stay } = this.props
        const { trip, isCheckoutToReserve ,datesModal} = this.state
        const { price } = stay
        const {startDate,endDate} = trip
        return (
            <div className="checkout-form-container">
                <div className="checkout-form-header flex space-between align-center" onClick={() => { this.toggleDatesModal(false) }}>

                    <div className="order-price-container ">
                        <p className="order-price"><span>${price}</span> / night</p>
                    </div>
                    <div className="check-rating-container flex align-end">
                        <p><FaStar size={13} color="#FF5A5F" /></p>
                        <p className="order-avg-score">4.9</p>
                        <p className="order-reviews">{`(${stay.reviews.length} reviews)`}</p>
                    </div>
                </div>
                <div className="form-container">
                    <div className="select-form">
                        <div className="dates-check-container">

                            <div className="dates-container flex ">
                                <div className="check-in-input flex column">
                                    <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check in <span>{startDate ? this.timeToShow(startDate, 'startDate') : 'Add date'}</span></label>
                                </div>
                                <div className="check-out-input flex column" >
                                    <label htmlFor="" onClick={() => { this.toggleDatesModal(true) }}>Check out <span>{endDate ? this.timeToShow(endDate, 'startDate') : 'Add date'}</span></label>
                                    {/* <p>{endDate ? endDate : 'Add date'}</p> */}
                                </div>
                            </div>


                        </div>
                        <div className="guests-check-container">
                            <Select class="guests-lable flex">
                            </Select>
                            {/* <span>Guests</span>
                            <input name="guests" type="text" placeholder="Add guests" value={1} /> */}
                        </div>
                    </div>
                    {isCheckoutToReserve &&
                        <div className="summed-trip-info">
                            <div class="sum-line">
                                <p>You won't be charged yet</p>
                            </div>
                            <div className="calc-price-container flex space-between">
                                <p className="calc-price">${price} x {trip.summedNights} nights</p>
                                <p>${trip.summedPrice}</p>
                            </div>
                            <div className="service-fee-container flex space-between">
                                <p className="service-fee">Service fee</p>
                                <p>$200</p>
                            </div>
                            <div className="total-price-container flex space-between">
                                <p className="total">Total</p>
                                <p className="total-price">${trip.summedPrice + 200}</p>
                            </div>
                        </div>
                    }

                    {!isCheckoutToReserve && <div className="check-btn-container flex">
                        <Button onClick={() => this.getTripPrice(trip.startDate, trip.endDate, price)}>Check availabilty</Button>
                    </div>}
                    {isCheckoutToReserve && <div className="check-btn-container flex">
                        <Button onClick={() => this.onBookTrip(stay, trip)}>Reserve</Button>
                    </div>}

                </div>
                {this.state.isGuestPopupOn && <div className="guests-popup-container ">~
                    <section className="guests-popup  ">
                        <div className="adults-line">

                        </div>
                        <div className="children-line flex space-between">
                            <div>
                                <p>Children</p>
                            </div>
                            <div className="counter-container flex">
                                <div className="minus-guest-btn">  <div><p>-</p></div></div>
                                <div>
                                    <p>{trip.guests.kids}</p>
                                </div>
                                <div className="plus-guest-btn">
                                    <div><p>+</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="infants-line"></div>
                    </section>
                </div>}
                { datesModal && <DatesPicker2 />}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        currStay: state.stayModule.currStay,
        filterBy: state.stayModule.filterBy,

    }
}
const mapDispatchToProps = {
    onBookTrip
}

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(_CheckoutForm)

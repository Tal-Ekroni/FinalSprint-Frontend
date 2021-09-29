import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController, SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { onBookTrip } from '../store/user.actions'

import { FaStar, FaAngleDown, FaAngleUp, FaMinus, FaPlus } from 'react-icons/fa'
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
            guests: { adults: 1, kids: 0, infants: 0 }
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

    onSelectDates = ({ startDate, endDate }) => {
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

    toggleDatesModal = (val) => {
        this.setState({ datesModal: false, isGuestPopupOn: false })
        this.setState({ datesModal: val })
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

    getTripPrice = (startDate, endDate, price) => {

        const start = new Date(startDate / 1000);
        const end = new Date(endDate / 1000);
        const timeDiff = (end - start)
        const summedNights = (timeDiff / 86400)
        const summedPrice = price * summedNights
        this.setState(prevState => ({ trip: { ...prevState.trip, summedNights, summedPrice }, isCheckoutToReserve: true }));
    }

    toggleGuestsModal = () => {
        this.setState({ datesModal: false })
        this.setState({ isGuestPopupOn: !this.state.isGuestPopupOn }, () => { console.log(this.state); })
        this.calcGuestNum()
    }
    onSelectGuests = (val, action) => {
        console.log(val);
        var { adults, kids, infants } = this.state.trip.guests
        switch (val) {
            case 'adults':
                if (action === 'minus') adults = adults - 1
                if (action === 'plus') adults = adults + 1
                break;
            case 'kids':
                if (action === 'minus') kids = kids - 1
                if (action === 'plus') kids = kids + 1
                break;
            case 'infants':
                if (action === 'minus') infants = infants - 1
                if (action === 'plus') infants = infants + 1
                break;
        }
        this.setState(prevState => ({ ...prevState, trip: { ...prevState.trip, guests: { adults, kids, infants } } }));
        // this.setState({ guests: { adults, kids, infants } })

    }
    calcGuestNum = () => {
        const { adults, kids, infants } = this.state.trip.guests
        var res = adults + kids + infants
        console.log('res', res);
        return res
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
                    guests: { adults: 1, kids: 0, infants: 0 }
                },
                isGuestPopupOn: false,
                isCheckoutToReserve: false
            })
        }

    }

    render() {

        const { stay } = this.props
        const { trip, isCheckoutToReserve, isGuestPopupOn, datesModal } = this.state
        const { price } = stay
        const { startDate, endDate } = trip
        return (
            <section className="checkout-popup">
                <section className="checkout-container flex">
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

                                    <div className="dates-container flex  ">
                                        <div className="checkin-input flex column" onClick={() => { this.toggleDatesModal(true) }}>
                                            <label className="title" htmlFor="">CHECK-IN</label>
                                            <label htmlFor="" ><span>{startDate ? this.timeToShow(startDate, 'startDate') : 'Add date'}</span></label>
                                        </div>
                                        <div className="checkout-input flex column" onClick={() => { this.toggleDatesModal(true) }} >
                                            <label className="title" htmlFor="" >CHECK-OUT</label>
                                            <label htmlFor="" ><span>{endDate ? this.timeToShow(endDate, 'startDate') : 'Add date'}</span></label>
                                        </div>
                                    </div>


                                </div>
                                <div className="guests-check-container flex space-between" onClick={() => { this.toggleGuestsModal() }}>
                                    <div className="guests-input flex column"  >
                                        <label className="title" htmlFor="" >GUESTS </label>
                                        <label htmlFor="" ><span>{this.calcGuestNum()} guest</span></label>
                                    </div>
                                    <div className="guest-select-arrow flex">
                                        {isGuestPopupOn ? <FaAngleUp /> : <FaAngleDown />}

                                    </div>
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
                    </div >
                </section>
                {isGuestPopupOn && <div className="guest-popup-container">
                    <div className="guests-popup">
                        <div className="adults-line flex space-between align-center">
                            <div>
                                <p>Adults</p>
                            </div>
                            <div className="counter-container flex space-between align-center">
                                <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('adults', 'minus') }}>
                                    <p><FaMinus size={14} /></p>
                                </div>
                                <div>
                                    <p>{trip.guests.adults}</p>
                                </div>
                                <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('adults', 'plus') }}>
                                    <p><FaPlus size={14} /></p>
                                </div>
                            </div>
                        </div>
                        <div className="children-line flex space-between align-center" >
                            <div>
                                <p>Children</p>
                            </div>
                            <div className="counter-container flex space-between align-center">
                                <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('kids', 'minus') }}>
                                    <p><FaMinus size={14} /></p>
                                </div>
                                <div>
                                    <p>{trip.guests.kids}</p>
                                </div>
                                <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('kids', 'plus') }}>
                                    <p><FaPlus size={14} /></p>
                                </div>
                            </div>
                        </div>
                        <div className="infants-line flex space-between align-center">
                            <div>
                                <p>Infants</p>
                            </div>
                            <div className="counter-container flex space-between align-center">
                                <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('infants', 'minus') }}>
                                    <p><FaMinus size={14} /></p>
                                </div>
                                <div>
                                    <p>{trip.guests.infants}</p>
                                </div>
                                <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('infants', 'plus') }}>
                                    <p><FaPlus size={14} /></p>
                                </div>
                            </div>
                        </div>
                        <div className="max-guests-container">
                            <p>{stay.capacity} guests maximum. Infants don’t count toward the number of guests.</p>
                        </div>
                        <div className="close-guest-popup-container">
                            <p onClick={() => { this.toggleGuestsModal() }}>Close</p>
                        </div>
                    </div>
                </div>}
                {datesModal && <DatesPicker2 onSelectDates={this.onSelectDates} handleChange={this.handleChange} />}
            </section>
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

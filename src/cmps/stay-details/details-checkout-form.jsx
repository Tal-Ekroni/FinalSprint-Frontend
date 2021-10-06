import React from 'react'
import 'react-dates/initialize';
import { connect } from 'react-redux'
import { onAddOrder } from '../../store/order.actions'
import { FaStar, FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { Button } from '@material-ui/core'
import 'react-dates/lib/css/_datepicker.css';
import { showErrorMsg } from '../../services/event-bus.service.js';
import { DatesPicker2 } from '../dates-picker2.jsx';
import { GuestsCheckoutModal } from './_guests-modal';

class _CheckoutForm extends React.Component {

    state = {
        trip: {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            guests: { adults: this.props.filterBy.adultNumber, kids: this.props.filterBy.kidsNumber, infants: this.props.filterBy.infantsNumber }
        },
        isGuestPopupOn: false,
        isCheckoutToReserve: false,
        datesModal: false

    }
    componentDidMount() {
        const { stay, filterBy } = this.props
        // window.addEventListener('scroll', (ev) => { this.setState({ isGuestPopupOn: false }) })
        this.setState({
            trip: {
                startDate: filterBy.startDate,
                endDate: filterBy.endDate,
                guests: { adults: filterBy.adultNumber, kids: filterBy.kidsNumber, infants: filterBy.infantsNumber },
                loc: stay.loc
            },
            isGuestPopupOn: false,
            isCheckoutToReserve: false,
            datesModal: false
        })
    }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', (ev) => { this.setState({ isGuestPopupOn: false }) })
    // }
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
        this.setState({ datesModal: true, isGuestPopupOn: false })
    }

    timeToShow = (date, val) => {
        var timeStamp = Date.parse(date);
        var time = new Date(timeStamp);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }

    getTripPrice = (startDate, endDate, price) => {
        const start = this.toTimestamp(startDate)
        const end = this.toTimestamp(endDate)
        const timeDiff = (end - start)
        const totalNights = (timeDiff / 86400)
        const totalPrice = price * totalNights + 200
        this.setState(prevState => ({ trip: { ...prevState.trip, totalNights, totalPrice }, isCheckoutToReserve: true }));
    }

    toggleGuestsModal = () => {
        this.setState({ datesModal: false })
        this.setState({ isGuestPopupOn: !this.state.isGuestPopupOn })
        this.calcGuestNum()
    }
    onSelectGuests = (val, action) => {

        const { stay } = this.props
        var { adults, kids, infants } = this.state.trip.guests
        switch (val) {
            case 'adults':
                if (action === 'minus') adults = adults - 1
                if (adults < 0) adults = 0
                if (adults + kids + infants >= stay.capacity) return
                if (action === 'plus') adults = adults + 1
                break;
            case 'kids':
                if (action === 'minus') kids = kids - 1
                if (kids < 0) kids = 0
                if (adults + kids + infants >= stay.capacity) return
                if (action === 'plus') kids = kids + 1
                break;
            case 'infants':
                if (action === 'minus') infants = infants - 1
                if (infants < 0) infants = 0
                if (adults + kids + infants >= stay.capacity) return
                if (action === 'plus') infants = infants + 1
                break;
            default:
                break;
        }
        this.setState(prevState => ({ ...prevState, trip: { ...prevState.trip, guests: { adults, kids, infants } } }));
    }

    calcGuestNum = () => {
        const { adults, kids, infants } = this.state.trip.guests
        var res = +adults + +kids + +infants
        return res
    }

    onBookTrip = (stay, trip) => {
        if (!this.props.user) {
            showErrorMsg('login first')
        } else {
            const { _id, fullname, imgUrl, username } = this.props.user
            trip.buyer = { _id, fullname, imgUrl, username }
            trip.startDate = this.toTimestamp(trip.startDate)
            trip.endDate = this.toTimestamp(trip.endDate)
            trip.host = stay.host
            trip.stay = {
                _id: stay._id,
                imgUrls: stay.imgUrls,
                name: stay.name
            }
            trip.status = 'pending'
            this.props.onAddOrder(trip)
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
    onCloseModal = (ev) => {
        this.setState({ isGuestPopupOn: false, datesModal: false })

    }
    getMouseCord = (ev) => {

    }
    getBtnDivs = () => {
        let divStr = []
        for (let i = 0; i < 100; i++) {
            divStr.push(<div className="cell" ></div >)
        }
        return divStr
    }
    render() {
        const { stay } = this.props
        const { trip, isCheckoutToReserve, isGuestPopupOn, datesModal } = this.state
        const { price } = stay
        const { startDate, endDate } = trip
        return (
            <section className="checkout-popup flex column">
                {(isGuestPopupOn || datesModal) && <div className="checkout-screen" onClick={(ev) => { this.onCloseModal(ev) }}></div>}
                <section className="checkout-container flex">
                    <div className="checkout-form-container">
                        <div className="checkout-form-header flex space-between align-center" onClick={() => { this.onCloseModal(false) }}>
                            <div className="order-price-container ">
                                <p className="order-price"><span>${price}</span> / night</p>
                            </div>
                            <div className="check-rating-container flex align-center">
                                <p className="checkout-star"><FaStar size={13} color="#FF5A5F" /></p>
                                <p className="order-avg-score">4</p>
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
                                    <div className="sum-line">
                                        <p>You won't be charged yet</p>
                                    </div>
                                    <div className="calc-price-container flex space-between">
                                        <p className="calc-price">${price} x {trip.totalNights} nights</p>
                                        <p>${trip.totalPrice}</p>
                                    </div>
                                    <div className="service-fee-container flex space-between">
                                        <p className="service-fee">Service fee</p>
                                        <p>$200</p>
                                    </div>
                                    <div className="total-price-container flex space-between">
                                        <p className="total">Total</p>
                                        <p className="total-price">${trip.totalPrice}</p>
                                    </div>
                                </div>
                            }
                            <div className="checkout-btn-container">
                                {this.getBtnDivs()}
                                {!isCheckoutToReserve && <div className="content">
                                    <button  className="checkout-btn" onClick={() => this.getTripPrice(startDate, endDate, price)}><span>Check availabilty</span> </button>
                                </div>}
                                {isCheckoutToReserve && <div className="content">
                                    <button className="checkout-btn" onClick={() => this.onBookTrip(stay, trip)}><span>Reserve</span> </button>
                                </div>}
                            </div>
                        </div>
                    </div >
                </section>
                {/* <div className="report-container flex ">
                    <FaFlag />
                    <p>Report this listing</p>
                </div> */}
                {isGuestPopupOn && <GuestsCheckoutModal toggleGuestsModal={this.toggleGuestsModal} onSelectGuests={this.onSelectGuests} trip={trip} stay={stay} />}
                {/* {isGuestPopupOn && } */}
                {datesModal && <DatesPicker2 onSelectDates={this.onSelectDates} handleChange={this.handleChange} />}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stay: state.stayModule.stay,
        filterBy: state.stayModule.filterBy,

    }
}
const mapDispatchToProps = {
    onAddOrder
}

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(_CheckoutForm)

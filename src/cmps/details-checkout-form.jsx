import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController, SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { onBookTrip } from '../store/stay.actions.js'

import { Button } from '@material-ui/core'
import 'react-dates/lib/css/_datepicker.css';
class _CheckoutForm extends React.Component {

    state = {
        trip: {
            startDate: null,
            endDate: null,
            guests: { adults: 1, kids: 0 }
        },
        isGuestPopupOn: false

    }
    componentDidMount() {
        const { stay } = this.props
        console.log(stay);
        this.setState({
            trip: {
                startDate: null,
                endDate: null,
                guests: { adults: 1, kids: 0, infants: 0 },
                loc: stay.loc
            },
            isGuestPopupOn: false
        })
    }

    handleChange = ({ startDate, endDate }) => {
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
    onBookTrip = (stay, trip) => {

        const { _id, fullname, imgUrl, username } = this.props.user
        trip.user = { _id, fullname, imgUrl, username }
        trip.startDate = this.toTimestamp(trip.startDate._d)
        trip.endDate = this.toTimestamp(trip.endDate._d)
        trip.stay = {
            _id: stay._id,
            host: stay.host
        }
        trip.status = 'pending'
        this.props.onBookTrip(trip)

    }

    render() {
        const { stay } = this.props
        const { trip } = this.state
        return (
            <div className="checkout-form-container">
                <div className="checkout-form">
                    <div className="check-price-container">
                        <p className="check-price"><span>{stay.price}</span>/ night</p>
                    </div>
                    <div>
                        <div className="dates-check-container">
                            <DateRangePicker
                                startDate={this.state.trip.startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.trip.endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.handleChange({ startDate, endDate })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                startDatePlaceholderText="Check in"
                                endDatePlaceholderText="Check out"
                            />
                        </div>
                        {/* <div className="guests-check-container">
                            <Select />
                        </div> */}
                    </div>
                    <div className="check-btn-container">
                        <Button onClick={() => this.onBookTrip(stay, trip)}>Check availabilty</Button>
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
                </div>

            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        currStay: state.stayModule.currStay,
    }
}
const mapDispatchToProps = {
    onBookTrip
}

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(_CheckoutForm)

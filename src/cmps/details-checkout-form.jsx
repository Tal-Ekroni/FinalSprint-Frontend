import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController, SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { addToCart } from '../store/stay.actions.js'
import Select from 'react-select'
import { Button } from '@material-ui/core'
import { Calendar } from 'react-date-range';
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
    onReservStay = () => {
        console.log(this.state);
    }
    handleChange = ({ startDate, endDate }) => {
        // const Moment  = startDate[Moment]
        // console.log(startDate.Moment);
        // console.log(dateType, date);
        if (startDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, startDate } }))
        }
        if (endDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, endDate } }))
        }
        // const field = target.name
        // const value = target.type === 'number' ? +target.value : target.value
        // this.setState(prevState => ({ trip: { ...prevState.trip, [field]: value } }))
        // console.log(this.props);
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
                        <Button onClick={this.onReservStay}>Check availabilty</Button>
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
    addToCart
}

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(_CheckoutForm)

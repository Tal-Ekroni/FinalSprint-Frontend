import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { FaHome, FaBroom, FaDoorClosed, FaKey, FaFlag } from 'react-icons/fa'
import { onEditStay, onRemoveStay} from '../store/stay.actions.js'
import { BasicInfo } from '../cmps/details-base-info'
import { AssetSum } from '../cmps/details-asset-sum'
import { AssetAmenities } from '../cmps/details-amenities'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';
import * as data from '../data/air-data.json';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { CheckoutForm } from '../cmps/details-checkout-form'
import { DayPickerRangeController } from 'react-dates'
import { ReviewsList } from '../cmps/reviews-list'
import { StayMap } from '../cmps/stay-map'


// import img from '../assets/img/1.jpg'
// const stay = data.stay;
// var stay = data.default[0].stay[0]
var trip = data.default[0].trip
class _StayDetails extends React.Component {
    state = {
        stay: null,
        stayReviews: [],
        trip: {
            startDate: null,
            endDate: null,
            guests: { adults: 1, kids: 0, infants: 0 },

        }

    }
    componentDidMount() {
        // localStorage.setItem('stay', JSON.stringify([stay]))
        const { stayId } = this.props.match.params
        if (!stayId) this.props.history.push('/')
        else {
            let currStay;
            stayService.getById(stayId)
            .then(stay => {
                this.setState({
                    stay,
                    trip: {
                        startDate: null,
                        endDate: null,
                        guests: { adults: 1, kids: 0, infants: 0 },
                        loc: stay.loc
                    }
                    
                    
                })
            })
            
        }

    }
    onRemoveStay = (stayId) => {
        this.props.onRemoveStay(stayId)
    }
  
    handleChange = ({ startDate, endDate }) => {
        if (startDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, startDate } }))
        }
        if (endDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, endDate } }))
        }
    }
    render() {
        const { stay } = this.state
        const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />
        const initialValues = {}
        return (
            <section className="stay-details-section main-layout">
                {stay && <div className="stay-details-container">
                    <BasicInfo stay={stay} />
                    <section className=" details-main-conatiner flex">
                        <div className="details-left-container">
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
                             <img src={`https://i.pravatar.cc/100?u=${stay.host._id}`} alt="" />
                                </div>
                            </section>

                            <section className="asset-sum-container">
                                <AssetSum />
                            </section>

                            <section className="asset-desc-container">
                                <div className="asset-desc">
                                    <p>"{stay.summary}"</p>
                                </div>
                            </section>
                            <section className="amenities-container">
                                <h4>What this place offers</h4>
                                <div >
                                    <AssetAmenities amenities={stay.amenities} />
                                </div>
                                <button className="amenities-btn">{`Show all ${stay.amenities.length} amenities`}</button>
                            </section>
                            <section className="dates-container">
                                <div>
                                    <div>
                                        <h3>Select check-in date</h3>
                                        <p>Add your travel dates for exact pricing</p>
                                    </div>
                                    <div className="calender-container flex space-between">
                                        <div className="checkin-calender">
                                            <DayPickerRangeController
                                                startDate={this.state.trip.startDate} // momentPropTypes.momentObj or null,
                                                endDate={this.state.trip.endDate} // momentPropTypes.momentObj or null,
                                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                            />
                                        </div>
                                        <div className="checkout-calender">
                                            <DayPickerRangeController
                                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                            />
                                        </div>
                                    </div>


                                </div>

                            </section>
                        </div>
                        {/* TODO */}
                        <div className="details-right-container">
                            <section className="checkout-container flex">
                                <CheckoutForm stay={stay} />
                                {/* <div className="report-container flex ">
                                    <FaFlag />
                                    <p>Report this listing</p>
                                </div> */}
                            </section>
                        </div>

                    </section>
                    <section className="page-bottom-container">
                        <div >

                        <ReviewsList reviews={stay.reviews}/>
                        </div>
                        <div >

                        <StayMap location={stay.loc}/>
                        </div>
                        </section>
                </div >}
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
    onEditStay
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)
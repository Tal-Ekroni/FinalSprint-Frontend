import React from 'react'
import { DateRangePicker, SingleDatePicker } from 'react-dates'
import { connect } from 'react-redux'
import { addToCart } from '../store/stay.actions.js'
import Select from 'react-select'
import { Button } from '@material-ui/core'
class _CheckoutForm extends React.Component {

    state = {
        trip: {
            startDate: '',
            endDate: '',
            guests: { adults: 1, kids: 0 }
        }

    }
    componentDidMount() {
        const { stay } = this.props
        console.log(stay);
        this.setState({
            trip: {
                startDate: '',
                endDate: '',
                guests: { adults: 1, kids: 0 },
                loc: stay.loc
            }
        })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ trip: { ...prevState.trip, [field]: value } }))
        // console.log(this.props);
    }

    render() {
        const { stay } = this.props
        return (
            <div className="checkout-form-container">
                <div className="checkout-form">
                    <div className="check-price-container">
                        <p className="check-price"><span>{stay.price}</span>/ night</p>
                    </div>
                    <div>
                        <div className="dates-check-container flex">
                            <SingleDatePicker />
                            <SingleDatePicker  className="check-area" />
                        </div>
                        <div  className="guests-check-container">
                            <Select />
                        </div>
                    </div>
                    <div className="check-btn-container">
                        <Button>Check availabilty</Button>
                    </div>
                </div>
            
            </div>
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

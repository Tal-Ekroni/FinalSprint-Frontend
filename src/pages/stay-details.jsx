import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { onEditStay, onRemoveStay, addToCart } from '../store/stay.actions.js'
class _StayDetails extends React.Component {
    state = {
        stay: null,
        stayReviews: []
    }
    componentDidMount() {
    }
    onRemoveStay = (stayId) => {
        this.props.onRemoveStay(stayId)
    }


    render() {
      
        return (
            <section>
                <h1>stay Details</h1>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        currStay: state.stayModule.currStay,
        reviews: state.reviewModule.reviews

    }
}
const mapDispatchToProps = {
    onRemoveStay,
    onEditStay,
    addToCart
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)
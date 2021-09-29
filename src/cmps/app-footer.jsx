
import React from 'react'
import { connect } from 'react-redux'

import { removeFromCart, checkout } from '../store/stay.actions'
import { onBookTrip } from '../store/user.actions'

import { UserMsg } from './user-msg.jsx'

class _AppFooter extends React.Component {

    state = {
        isCartShown: false,
    }

    componentDidMount() { }

    removeFromCart = (stayId) => {
        this.props.removeFromCart(stayId)
    }
    checkout = () => {
        this.props.checkout();
    }
    get staytTotal() {
        return this.props.cart.reduce((acc, stay) => acc + stay.price, 0)
    }

    render() {
        return (
            <footer className="app-footer main-container full">
                <div className="footer-info flex justify-start align-center">
                    © 2021 T.I.L ,Inc. · About · Login · Become a host
                </div>
                <UserMsg />
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        cart: state.stayModule.cart
    }
}

const mapDispatchToProps = {
    checkout,
    onBookTrip,
    removeFromCart
}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
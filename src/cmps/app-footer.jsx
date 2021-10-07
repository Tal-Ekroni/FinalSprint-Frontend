
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TopRatedStays } from './app-footer/top-rated-stays'
import { loadStays } from '../store/stay.actions'
import { removeFromCart, checkout } from '../store/stay.actions'
import { onBookTrip } from '../store/user.actions'

import { UserMsg } from './user-msg.jsx'

class _AppFooter extends React.Component {

    state = {
        isCartShown: false,
        topRatedStays: []
    }

    async componentDidMount() {
        await this.props.loadStays(this.props.filterBy)
        const topRatedStays = this.props.stays.slice(1)
        console.log(topRatedStays)
        this.setState({ topRatedStays })

    }

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
        const { user } = this.props
        return (
            <footer className="app-footer main-container full">
                <h2>Insparation for future getaways</h2>
                <div className="flex column">
                    <h4>Top rated stays</h4>
                    <TopRatedStays stays={this.state.topRatedStays} />
                </div>
                <div className="footer-info flex justify-start align-center">
                    <p>
                        © 2021 AnyGo ,Inc.,
                    </p>
                    <Link to='/login'>· Login</Link>
                    {user && <Link to={user.isHost ? '/host' : '/become-a-host'}>{user.isHost ? '· Host page' : '· Become a host'}</Link>}
                </div>
                <UserMsg />
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        cart: state.stayModule.cart,
        user: state.userModule.user,
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy,
    }
}

const mapDispatchToProps = {
    checkout,
    onBookTrip,
    removeFromCart,
    loadStays
}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
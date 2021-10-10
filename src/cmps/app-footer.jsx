
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { TopRatedStays } from './app-footer/top-rated-stays'
import { loadStays } from '../store/stay.actions'
import { removeFromCart, checkout, setFilter } from '../store/stay.actions'
import { onBookTrip, loadUser } from '../store/user.actions'
import { UserMsg } from './user-msg.jsx'
import { FooterLocations } from './app-footer/locations-footer'
class _AppFooter extends React.Component {

    state = {
        isCartShown: false,
        topRatedStays: []
    }

    async componentDidMount() {
        await this.props.loadStays(this.props.filterBy)
        await this.props.loadUser()
        const topRatedStays = this.props.stays.slice(1,9)
        this.setState({ topRatedStays })

    }

    removeFromCart = (stayId) => {
        this.props.removeFromCart(stayId)
    }
    checkout = () => {
        this.props.checkout();
    }
    getstaytTotal() {
        return this.props.cart.reduce((acc, stay) => acc + stay.price, 0)
    }
    onClickLoc = (val, type) => {
        const newFilter = { ...this.props.filterBy }
        newFilter[type] = val
        this.props.setFilter(newFilter)
        this.props.history.push('/explore')
    }

    render() {
        const { user } = this.props
        return (
            <footer className="app-footer main-container full">
                <h2>Insparation for future getaways</h2>
                <div className='flex footer-link-headers'>
                    <h4>Top rated stays</h4>
                    <h4>Locations</h4>
                </div>
                <div className="flex footer-links align-center">
                    <TopRatedStays stays={this.state.topRatedStays} />
                    <FooterLocations locations={this.locations} onClickLoc={this.onClickLoc} />

                </div>
                <div className="footer-info flex space-between align-center">
                    <div className="footer-first flex">
                        <p>
                            © 2021 AnyGo ,Inc.,
                        </p>
                        <Link to='/login'>· Login</Link>
                        {user && <Link to={user.isHost ? '/host' : '/become-a-host'}>{user.isHost ? '· Host page' : '· Become a host'}</Link>}
                    </div>
                    <div className="footer-second flex">
                        <p>US$</p>
                        <p>English(US)</p>
                    </div>
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
    loadStays,
    loadUser,
    setFilter
}

// export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
export const AppFooter = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AppFooter))
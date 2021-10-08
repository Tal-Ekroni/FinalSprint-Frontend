import React from 'react'
import { connect } from 'react-redux'
import { loadStays, onAddStay, onEditStay, onRemoveStay, setFilter } from '../store/stay.actions.js'
import { onBookTrip, loadUser } from '../store/user.actions.js'
import { StaysList } from '../cmps/stays-list.jsx'
import { ExploreFilter } from '../cmps/explore-filter.jsx'
import loader from '../assets/img/three-dots.svg'
import { stayService } from '../services/stay.service.js'
class _Explore extends React.Component {
    state = {
        stays: [],
        isScreenOpen: false,
        modals: {
            placeTypeIsOpen: false,
            PropertyTypeIsOpen: false,
            PriceIsOpen: false,
            AmenitiesTypeIsOpen: false,
        },
        frontFilter: {
            placeType: '',
            PropertyType: '',
            priceRange: [20, 1500],
            amenities: {
                TV: false,
                Wifi: false,
                Kitchen: false,
                AC: false,
                "Smoking allowed": false,
                "Pets allowed": false,
                "Cooking basics": false,
                "Hot tub":false,
            }
        }
    }
    async componentDidMount() {
        try {
            const { user } = this.props
            window.scrollTo(0, 0)
            this.setState({ stays: this.props.stays })
            if (user) this.props.loadUser(this.props.user._id)
        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadStays(this.props.filterBy);
        }
    }
    onSetAmenity = (key) => {
        this.setState({ frontFilter: { ...this.state.frontFilter, amenities: { ...this.state.frontFilter.amenities, [key]: !this.state.frontFilter.amenities[key] } } }, () => { this.onSetPageFilter('ameneties', this.state.frontFilter.amenities) })
    }
    onSetPageFilter = (filterType, val, ev) => {
        this.setState({ frontFilter: { ...this.state.frontFilter, [filterType]: val } }, () => {
            const newStays = stayService.filterPageStays(this.state.frontFilter, this.props.stays)
            console.log(newStays, 'newStays')
            this.setState({ stays: newStays })
        })
    }
    onToggleScreen = (val) => {
        this.setState({ isScreenOpen: val })
    }
    onClearPageFilter = () => {
        const clearState = {
            stays: this.props.stays,
            isScreenOpen: false,
            frontFilter: {
                placeType: '',
                PropertyType: '',
                priceRange: [20, 1500],
                amenities: {
                    TV: false,
                    Wifi: false,
                    Kitchen: false,
                    AC: false,
                    "Smoking allowed": false,
                    "Pets allowed": false,
                    "Cooking basics": false,
                    "Hot tub":false,
                }
            }
        }
        this.setState({ ...clearState })
        this.closeAllModals()
    }

    onRemoveStay = (stayId) => {
        this.props.onRemoveStay(stayId)
    }
    onAddStay = () => {
        this.props.onAddStay()
    }
    onEditStay = (stay) => {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        this.props.onEditStay(stayToSave)
    }
    onToggleModals = (modal) => {
        this.setState({ modals: { placeTypeIsOpen: false, PropertyTypeIsOpen: false, PriceIsOpen: false, AmenitiesTypeIsOpen: false } }, () => {
            this.onToggleScreen(!this.state.modals[modal])
            this.setState({ modals: { ...this.state.modals, [modal]: !this.state[modal] } })
        })
    }
    closeAllModals = () => {
        console.log('hiyush');
        this.onToggleScreen(false)
        this.setState({ modals: { placeTypeIsOpen: false, PropertyTypeIsOpen: false, PriceIsOpen: false, AmenitiesTypeIsOpen: false } })
    }

    render() {
        const { stays, filterBy } = this.props
        const { isScreenOpen } = this.state
        if (!stays.length) return <div className="loader-container flex align-center justify-center page-padding"><img src={loader} alt="loader" /></div>
        return (
            <main className="explore-mega-container main-container page-padding">
                <div className="explore-page-container">
                    <div className={isScreenOpen ? "screen screen-open full" : "screen full"} onClick={() => { this.closeAllModals() }}></div>
                    <div className="stays-headline">
                        <p>{this.state.stays.length === 1 ? `1 stay` : `${this.state.stays.length} stays`}</p>
                        <h1>{filterBy.location ? `Places to stay at ${filterBy.location}` : 'Find places to stay'}</h1>
                    </div>
                    <ExploreFilter stays={stays} onSetAmenity={this.onSetAmenity} onSetPageFilter={this.onSetPageFilter} onClearPageFilter={this.onClearPageFilter} modals={this.state.modals} onToggleModals={this.onToggleModals} amenities={this.state.frontFilter.amenities} />
                    {stays.length && <StaysList stays={this.state.stays} history={this.props.history} />}
                </div>
            </main>
        )
    }
}
function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadStays,
    onRemoveStay,
    onAddStay,
    onEditStay,
    onBookTrip,
    setFilter,
    loadUser
}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)
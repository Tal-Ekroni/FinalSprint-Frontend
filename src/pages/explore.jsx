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
        allStaysPriceAvg: null,
        modals: {
            placeTypeIsOpen: false,
            PropertyTypeIsOpen: false,
            PriceIsOpen: false,
            AmenitiesTypeIsOpen: false,
        },
        frontFilter: {
            placeType: '',
            PropertyType: '',
            priceRange: [20, 600],
            amenities: []
        },
        ameintiesOptions: [
            { name: 'TV', isChecked: false },
            { name: 'Wifi', isChecked: false },
            { name: 'Kitchen', isChecked: false },
            { name: 'Smoking allowed', isChecked: false },
            { name: 'Cooking basics', isChecked: false },
            { name: 'Pets Allowed', isChecked: false },
            { name: 'Hot tub', isChecked: false }
        ]

    }
    async componentDidMount() {
        try {
            const { user } = this.props
            window.scrollTo(0, 0)
            await this.props.loadStays(this.props.filterBy);
            this.setState({ stays: this.props.stays }, () => {
                this.calcAllStaysPriceAvg(this.state.stays)
            })
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
    onSetAmenity = (amenity) => {
        const name = amenity.name
        const isChecked = amenity.isChecked
        const { ameintiesOptions } = this.state
        const { amenities } = this.state.frontFilter

        const updatedAmeintiesOpts = ameintiesOptions.map(amenity => (amenity.name === name) ? { name, isChecked } : amenity)
        if (isChecked) amenities.push(name)
        else {
            const idx = amenities.findIndex(amenity => amenity === name)
            amenities.splice(idx, 1)
        }
        this.setState(prevState => ({ ...prevState, frontFilter: { ...this.state.frontFilter, amenities }, ameintiesOptions: updatedAmeintiesOpts }), () => { this.onSetPageFilter('ameneties', this.state.frontFilter.amenities) })
    }
 
    onSetPageFilter = (filterType, val, ev) => {
        this.setState({ frontFilter: { ...this.state.frontFilter, [filterType]: val } }, () => {
            const newStays = stayService.filterPageStays(this.state.frontFilter, this.props.stays)
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
            allStaysPriceAvg: null,
            modals: {
                placeTypeIsOpen: false,
                PropertyTypeIsOpen: false,
                PriceIsOpen: false,
                AmenitiesTypeIsOpen: false,
            },
            frontFilter: {
                placeType: '',
                PropertyType: '',
                priceRange: [20, 600],
                amenities: []
            },
            ameintiesOptions: [
                { name: 'TV', isChecked: false },
                { name: 'Wifi', isChecked: false },
                { name: 'Kitchen', isChecked: false },
                { name: 'Smoking allowed', isChecked: false },
                { name: 'Cooking basics', isChecked: false },
                { name: 'Pets Allowed', isChecked: false },
                { name: 'Hot tub', isChecked: false }
            ]
    
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
        this.onToggleScreen(false)
        this.setState({ modals: { placeTypeIsOpen: false, PropertyTypeIsOpen: false, PriceIsOpen: false, AmenitiesTypeIsOpen: false } })
    }
    calcAllStaysPriceAvg = (stays) => {
        let staysAvg = stays
        staysAvg = staysAvg.reduce((acc, stay) => {
            acc += stay.price
            return acc
        }, 0)
        this.setState({ allStaysPriceAvg: (staysAvg / stays.length) })
    }
    render() {
        const { stays, filterBy } = this.props
        const { isScreenOpen, ameintiesOptions } = this.state
        if (!stays.length) return <div className="loader-container flex align-center justify-center page-padding"><img src={loader} alt="loader" /></div>
        return (
            <main className="explore-mega-container main-container page-padding">
                <div className="explore-page-container">
                    <div className={isScreenOpen ? "screen screen-open full" : "screen full"} onClick={() => { this.closeAllModals() }}></div>
                    <div className="stays-headline">
                        <p>{this.state.stays.length === 1 ? `1 stay` : `${this.state.stays.length} stays`}</p>
                        <h1>{filterBy.location ? `Places to stay at ${filterBy.location}` : 'Find places to stay'}</h1>
                    </div>
                    <ExploreFilter ameintiesOptions={ameintiesOptions} stays={this.state.stays} closeAllModals={this.closeAllModals} onSetAmenity={this.onSetAmenity} onSetPageFilter={this.onSetPageFilter} onClearPageFilter={this.onClearPageFilter} modals={this.state.modals} onToggleModals={this.onToggleModals} allStaysPriceAvg={this.state.allStaysPriceAvg} amenities={this.state.frontFilter.amenities} />
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
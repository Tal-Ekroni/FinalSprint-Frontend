import React from 'react'
import { connect } from 'react-redux'
import { loadStays, onAddStay, onEditStay, onRemoveStay, setFilter, setStays } from '../store/stay.actions.js'
import { onBookTrip, loadUser } from '../store/user.actions.js'
import { StaysList } from '../cmps/stays-list.jsx'
import { ExploreFilter } from '../cmps/explore-filter.jsx'
import loader from '../assets/img/three-dots.svg'
import { stayService } from '../services/stay.service.js'
class _Explore extends React.Component {
    state = {
        stays: [],
        frontFilter: {
            placeType: '',
            PropertyType: '',
            priceRange:[],
            amenities: {
                TV: false,
                Wifi: false,
                Kitchen: false,
                AC: false,
                "Smoking allowed": false,
                "Pets allowed": false,
                "Cooking basics": false,
            }
        }
    }
    async componentDidMount() {
        try {
            const { user } = this.props
            window.scrollTo(0, 0)
            await this.props.loadStays(this.props.filterBy)
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
        if (prevState.PropertyType !== this.state.PropertyType) {
            this.setState({ stays: stayService.filterPageStays(this.state, this.props.stays) })

        }
    }
    onSetAmenity = (key) => {
        this.setState({ frontFilter: { ...this.state.frontFilter, ameneties: { ...this.state.frontFilter.amenities, [key]: !this.state.frontFilter.amenities[key] } } }, () => { this.onSetPageFilter('ameneties', this.state.frontFilter.amenities) })
    } 
    onSetPageFilter = (filterType, val, ev) => {
        this.setState({ frontFilter: { ...this.state.frontFilter, [filterType]: val } }, () => {
            console.log(this.state)
            this.setState({ stays: stayService.filterPageStays(this.state.frontFilter, this.props.stays) })
        })



    }
    onClearPageFilter = () => {
        const clearState = {
            stays: this.props.stays,
            frontFilter: {
                placeType: '',
                PropertyType: '',
            }
        }
        this.setState({ ...clearState })
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
    render() {
        const { stays, filterBy } = this.props
        if (!stays.length) return <div className="loader-container flex align-center justify-center page-padding"><img src={loader} alt="loader" /></div>
        return (
            <main className="explore-mega-container main-container page-padding">
                <div className="explore-page-container">

                    <div className="stays-headline">
                        <p>{this.state.stays.length === 1 ? `1 stay` : `${this.state.stays.length} stays`}</p>
                        <h1>{filterBy.location ? `Places to stay at ${filterBy.location}` : 'Find places to stay'}</h1>
                    </div>
                    <ExploreFilter stays={stays} onSetAmenity={this.onSetAmenity} onSetPageFilter={this.onSetPageFilter} onClearPageFilter={this.onClearPageFilter} />
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
    loadUser,
    setStays

}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)
import React from 'react'
import { connect } from 'react-redux'
import { loadStays, onAddStay, onEditStay, onRemoveStay, setFilter } from '../store/stay.actions.js'
import { onBookTrip, loadUser } from '../store/user.actions.js'
import { StaysList } from '../cmps/stays-list.jsx'
import { ExploreFilter } from '../cmps/explore-filter.jsx'
import loader from '../assets/img/three-dots.svg'

class _Explore extends React.Component {

    async componentDidMount() {
        window.scrollTo(0, 0)
        try {
            await this.props.loadUser(this.props.user._id)
            await this.props.loadStays(this.props.filterBy)

        } catch (err) {
            console.log('error', err)
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadStays(this.props.filterBy);
        }
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
                        <p>{stays.length === 1 ? `${stays.length} stay` : `${stays.length} stays`}</p>
                        <h1>{filterBy.location ? `Places to stay at ${filterBy.location}` : 'Find places to stay'}</h1>
                    </div>
                    <ExploreFilter />
                    {stays.length && <StaysList stays={stays} history={this.props.history} />}
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
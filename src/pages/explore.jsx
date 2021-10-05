import React from 'react'
import { connect } from 'react-redux'
import { loadStays, onAddStay, onEditStay, onRemoveStay, setFilter } from '../store/stay.actions.js'
import { onBookTrip } from '../store/user.actions.js'
import { StaysList } from '../cmps/stays-list.jsx'
import { ExploreFilter } from '../cmps/explore-filter.jsx'
class _Explore extends React.Component {

    componentDidMount() {
        return async () => {
            window.scrollTo(0, 0)
            try {
                await this.props.loadStays(this.props.filterBy)
            } catch (err) {
                console.log('error', err)
            }
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
        if (!stays.length) return <div>loading</div>
        return (
            <main className="main-container page-padding">
                <div className="stays-headline">
                    <p>{stays.length === 1 ? `${stays.length} stay` : `${stays.length} stays`}</p>
                    <h1>{filterBy.location ? `Places to stay at ${filterBy.location}` : 'Find places to stay'}</h1>
                </div>
                <ExploreFilter />
                {stays.length && <StaysList stays={stays} history={this.props.history} />}
            </main>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy
    }
}
const mapDispatchToProps = {
    loadStays,
    onRemoveStay,
    onAddStay,
    onEditStay,
    onBookTrip,
    setFilter,

}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)
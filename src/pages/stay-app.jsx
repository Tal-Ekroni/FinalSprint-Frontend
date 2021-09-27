import React from 'react'
import { connect } from 'react-redux'


import { loadStays, onAddStay, onEditStay, onRemoveStay, onBookTrip } from '../store/stay.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { StaysList } from '../cmps/stays-list.jsx'
import { ExploreFilter } from '../cmps/explore-filter.jsx'

class _StayApp extends React.Component {
    // state = {
    //     filterBy: {
    //         cityName: ''
    //     }
    // }
    componentDidMount() {
        // const urlParams = new URLSearchParams(window.location.search);
        // const myParam = urlParams.get('cityName');
        this.props.loadStays(this.props.filterBy)
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
    addToStayt = (stay) => {
        console.log(`Adding ${stay.vendor} to Stayt`)
        this.props.addToStayt(stay)
        showSuccessMsg('Added to Stayt')
    }
    render() {
        const { stays } = this.props
        if (!stays.length) return <div>loading</div>
        return (
            <main className="main-container">
                <p>{stays.length} stays</p>
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
    onBookTrip
}


export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
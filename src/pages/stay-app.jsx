import React from 'react'
import { connect } from 'react-redux'


import { loadStays, onAddStay, onEditStay, onRemoveStay, addToCart } from '../store/stay.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

class _StayApp extends React.Component {
    state = {
    }
    componentDidMount() {
        this.props.loadStays()
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
        return (
            <div>
                <h3>Stays App</h3>
                <main>
                    <div>List Of Stays</div>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays
    }
}
const mapDispatchToProps = {
    loadStays,
    onRemoveStay,
    onAddStay,
    onEditStay,
    addToCart
}


export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
import { FaStar, FaAngleDown, FaAngleUp, FaMinus, FaPlus } from 'react-icons/fa'

export class GuestsModal extends React.Component {
    // onSelectGuests = (val, action) => {
    //     const { stay } = this.props
    //     var { adults, kids, infants } = this.state.trip.guests
    //     switch (val) {
    //         case 'adults':
    //             if (action === 'minus') adults = adults - 1
    //             if (adults < 0) adults = 0
    //             if (adults + kids + infants >= stay.capacity) return
    //             if (action === 'plus') adults = adults + 1
    //             break;
    //         case 'kids':
    //             if (action === 'minus') kids = kids - 1
    //             if (kids < 0) kids = 0
    //             if (adults + kids + infants >= stay.capacity) return
    //             if (action === 'plus') kids = kids + 1
    //             break;
    //         case 'infants':
    //             if (action === 'minus') infants = infants - 1
    //             if (infants < 0) infants = 0
    //             if (adults + kids + infants >= stay.capacity) return
    //             if (action === 'plus') infants = infants + 1
    //             break;
    //     }
    //     this.setState(prevState => ({ ...prevState, trip: { ...prevState.trip, guests: { adults, kids, infants } } }));
    // }

    // calcGuestNum = () => {
    //     const { adults, kids, infants } = this.state.trip.guests
    //     var res = adults + kids + infants
    //     return res
    // }
    render() {
        return (
            <div className="guest-popup-container">
                {/* <div className="guests-popup">
                    <div className="adults-line flex space-between align-center">
                        <div>
                            <p>Adults</p>
                        </div>
                        <div className="counter-container flex space-between align-center">
                            <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('adults', 'minus') }}>
                                <p><FaMinus size={14} /></p>
                            </div>
                            <div>
                                <p>{trip.guests.adults}</p>
                            </div>
                            <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('adults', 'plus') }}>
                                <p><FaPlus size={14} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="children-line flex space-between align-center" >
                        <div>
                            <p>Children</p>
                        </div>
                        <div className="counter-container flex space-between align-center">
                            <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('kids', 'minus') }}>
                                <p><FaMinus size={14} /></p>
                            </div>
                            <div>
                                <p>{trip.guests.kids}</p>
                            </div>
                            <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('kids', 'plus') }}>
                                <p><FaPlus size={14} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="infants-line flex space-between align-center">
                        <div>
                            <p>Infants</p>
                        </div>
                        <div className="counter-container flex space-between align-center">
                            <div className="minus-guest-btn flex" onClick={() => { this.onSelectGuests('infants', 'minus') }}>
                                <p><FaMinus size={14} /></p>
                            </div>
                            <div>
                                <p>{trip.guests.infants}</p>
                            </div>
                            <div className="plus-guest-btn flex" onClick={() => { this.onSelectGuests('infants', 'plus') }}>
                                <p><FaPlus size={14} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="max-guests-container">
                        <p>{stay.capacity} guests maximum. Infants don’t count toward the number of guests.</p>
                    </div>
                    <div className="close-guest-popup-container">
                        <p onClick={() => { this.toggleGuestsModal() }}>Close</p>
                    </div>
                </div> */}
            </div>)
    }
}

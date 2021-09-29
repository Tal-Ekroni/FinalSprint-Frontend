import React from 'react'


export class GuestsModal extends React.Component {


    render() {
        const { adultNumber, kidsNumber, onSelectAmount, onToggleGuestModals } = this.props
        return (
            <div className="guest-modal">
               ` <div className="screen" onClick={() => {onToggleGuestModals() }}>
                </div>`
                <div className="guest-card flex space-between">
                    <p>Adults</p>
                    <div className="guest-amount flex">
                        <button className="guest-btn" onClick={() => onSelectAmount('adultNumber', 1)}>+</button>
                        <p>{adultNumber}</p>
                        <button className="guest-btn" onClick={() => onSelectAmount('adultNumber', -1)}>-</button>
                    </div>

                </div>
                <div className="guest-card flex space-between border-top">
                    <p>Kids</p>
                    <div className="guest-amount flex">
                        <button className="guest-btn" onClick={() => onSelectAmount('kidsNumber', 1)}>+</button>
                        <p>{kidsNumber}</p>
                        <button className="guest-btn" onClick={() => onSelectAmount('kidsNumber', -1)}>-</button>
                    </div>
                </div>

            </div>
        )
    }
}
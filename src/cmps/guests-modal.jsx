import React from 'react'


export class GuestsModal extends React.Component {
    state = {
        adultNumber: 0,
        kidsNumber: 0
    }
    render() {
        const { adultNumber, kidsNumber } = this.state
        return (
            <div className="guest-modal">
                <div className="guest-card flex space-between">
                    <p>Adults</p>
                    <div className="guest-amount flex">
                        <button className="guest-btn">+</button>
                        <p>{adultNumber}</p>
                        <button className="guest-btn">-</button>
                    </div>

                </div>
                <div className="guest-card flex space-between border-top">
                    <p>Kids</p>
                    <div className="guest-amount flex">
                        <button className="guest-btn">+</button>
                        <p>{kidsNumber}</p>
                        <button className="guest-btn">-</button>
                    </div>
                </div>

            </div>
        )
    }
}
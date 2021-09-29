import React from 'react'
import { connect } from 'react-redux'
import { showSuccessMsg } from '../services/event-bus.service.js'
import travelImg from '../assets/img/travel.jpg'
import { TripsList } from '../cmps/trips-list.jsx'
class _TripsPage extends React.Component {

    render() {
        const { user } = this.props
        return (
            <main className="trips-page-container main-layout">
                <section className="trips-container">
                    <div className="trips-title-container">
                        <h1>Trips</h1>
                    </div>
                    {!user.myTrips.length && <div className="no-trips-txt">
                        <p>When you’re ready to start planning your next trip, we’re here to help. </p>
                        <div className="trips-img-container">
                            <img src={travelImg} alt="" />
                        </div>
                    </div>}
                    {user.myTrips && user.myTrips.length && <section className="trips-container">
                        <TripsList trips={user.myTrips} isHost={user.isHost} />
                    </section>}
                </section>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        

    }
}
// const mapDispatchToProps = {

// }


export const TripsPage = connect(mapStateToProps)(_TripsPage)
import React from 'react'
import { connect } from 'react-redux'
// import { OrdersList } from '../cmps/hosts-list.jsx'
class _HostPage extends React.Component {
    state = {
        user: null,
        orders: []
    }
    componentDidMount() {
        const { user } = this.props
        console.log(user, 'user');
    }
    // onCancelHost = () => {
    // }
    render() {
        const { user } = this.props
        return (
            <main className="host-page-container main-layout">
                {user && <section className="host-container">
                    <div className="host-title-container">
                        <h1>Hosts</h1>
                    </div>
                    {/* {user.orders && user.orders.length && <section className="hosts-container">
                        <OrdersList orders={user.orders} />
                    </section>} */}
                </section>}
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


export const HostPage = connect(mapStateToProps)(_HostPage)
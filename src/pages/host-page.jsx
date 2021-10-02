import React from 'react'
import { connect } from 'react-redux'
// import { OrdersList } from '../cmps/hosts-list.jsx'
class _HostPage extends React.Component {
    state = {
        user: null,
        orders: [],
        openTab: 'orders'
    }
    componentDidMount() {
        const { user } = this.props
        console.log(user, 'user');
        this.setState({ openTab: 'orders' })
    }
    // onCancelHost = () => {
    // }
    onChangeTab = (tab) => {
        this.setState({ openTab: tab })
    }
    render() {
        const { user } = this.props
        const { openTab } = this.state
        return (
            <main className="host-page-container main-layout">
                {user && <section className="host-container">
                    <div className="host-title-container">
                        <h1>Hosts</h1>
                        <nav className="tabs-bar flex space-between">
                            <div className="host-tab flex align-center "><p>Orders</p></div>
                            <div className="host-tab flex align-center active"><p>Stats</p></div>
                        </nav>
                    </div>
                    {openTab === 'orders' && <div>Orders</div>}
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
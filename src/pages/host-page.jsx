import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react'
import { connect } from 'react-redux'
import { HostChart } from '../cmps/host-page/host-stats';
import { OrdersList } from '../cmps/host-page/orders-list';
import { loadUser } from '../store/user.actions'
import { AddStay } from '../cmps/host-page/add-stay';
import { loadOrders } from '../store/order.actions'

// import { OrdersList } from '../cmps/hosts-list.jsx'
class _HostPage extends React.Component {
    state = {
        user: null,
        orders: [],
        selectedTab: 'add-stay'
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        await this.props.loadUser(this.props.user._id)
        await this.props.loadOrders(this.props.user._id, 'host')

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.orders !== prevProps.orders)
            this.props.loadUser(this.props.user._id)

    }

    // onCancelHost = () => {
    // }
    onChangeTab = (ev, value) => {
        this.setState({ selectedTab: value })
    }
    render() {
        const { user, orders } = this.props
        const { selectedTab } = this.state
        return (
            <main className="host-page-container main-container">
                <div>

                    <section className="host-tabs-container">
                        <Tabs
                            value={selectedTab}
                            onChange={this.onChangeTab}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="add-stay" label="Add a stay" />
                            <Tab value="orders" label={orders ? `Orders (${orders.length})` : 'Orders'} />
                            <Tab value="stats" label="Stats" />
                        </Tabs>
                    </section>
                    {user && <section className="host-container">

                        {selectedTab === 'orders' && <div>
                            <h2>Orders</h2>
                            <div className="orders-container">

                                <OrdersList orders={orders} />
                            </div>
                        </div>}
                        {selectedTab === 'stats' && <div>
                            <HostChart />
                        </div>}
                        {selectedTab === 'add-stay' && <div>
                            <AddStay />
                        </div>}
                    </section>}
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    loadUser,
    loadOrders

}


export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react'
import { connect } from 'react-redux'
import { HostChart } from '../cmps/host-page/host-stats';
import { OrdersList } from '../cmps/host-page/orders-list';
import { loadUser } from '../store/user.actions'
import { AddStay } from '../cmps/host-page/add-stay';
import { loadOrders } from '../store/order.actions'
import { loadStays, setFilter } from '../store/stay.actions'
import { HostStayslist } from '../cmps/host-page/host-stays-list';
import { OrdersDashboard } from '../cmps/host-page/dash-board';

// import { OrdersList } from '../cmps/hosts-list.jsx'
class _HostPage extends React.Component {
    state = {
        user: null,
        orders: [],
        stays: [],
        selectedTab: 'add-stay'
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        this.onGetHostStays()
        try {
            this.props.loadUser(this.props.user._id)
            await this.props.loadOrders(this.props.user._id, 'host')
            await this.props.loadStays(this.props.filterBy)

        } catch (err) {
            console.log('Error', err);
        }
    }
    onGetHostStays = () => {
        const newFilter = this.props.filterBy
        newFilter.hostId = this.props.user._id
        this.props.setFilter(newFilter)
    }

    onChangeTab = (ev, value) => {
        this.setState({ selectedTab: value })
    }
    render() {
        const { user, orders, stays } = this.props
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
                            <Tab value="my-stays" label="My stays" />
                            <Tab value="stats" label="Stats" />
                        </Tabs>
                    </section>
                    {user && <section className="host-container">

                        {selectedTab === 'orders' && <div className=" page-padding">
                            <h2>Orders</h2>
                            <div className="orders-container">
                                <OrdersDashboard orders={orders} />
                                {/* <OrdersList orders={orders} /> */}
                            </div>
                        </div>}
                        {selectedTab === 'my-stays' && <div className=" page-padding">
                            <h2>My Stays!</h2>
                            <div className="orders-container">
                                {stays && <HostStayslist stays={stays} />}

                            </div>
                        </div>}
                        {selectedTab === 'stats' && <div className=" page-padding">
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
        orders: state.orderModule.orders,
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy


    }
}
const mapDispatchToProps = {
    loadUser,
    loadOrders,
    loadStays,
    setFilter


}


export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)
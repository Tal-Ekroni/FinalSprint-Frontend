import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser } from '../../store/user.actions'
import { onUpdateOrder, onRemoveOrder } from '../../store/order.actions'
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FaStar } from 'react-icons/fa'

class _OrdersDashboard extends Component {
    state = {
        user: null,
        orders: null
    }
    componentDidMount() {
        const { user, orders } = this.props
        this.setState({ orders })
        if (user) this.props.loadUser(user._id)
    }
    getTime = (timeStamp) => {
        var time = new Date(timeStamp);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    getData = () => {
        const { orders } = this.props
        const dataOrders = [];
        let editedOrder;
        if (orders) {
            orders.map(order => {
                editedOrder = {
                    stayName: order.stay.name,
                    // address: order.loc.address,
                    buyerName: order.buyer.fullname,
                    buyerImg: order.buyer.imgUrl,
                    price: order.totalPrice,
                    status: order.status,
                    approveBtn: <div className="host-action-btns flex">
                        <button className="approve-order-btn" onClick={() => { this.onApproveOrder(order._id) }}>Approve</button>
                        <button className="approve-order-btn" onClick={() => { (order.status === "pending") ? this.onDeclinelOrder(order._id) : this.onRemoveOrder(order._id) }}>
                            {(order.status === "pending") ? 'Decline' : 'Remove'}</button>
                    </div>

                }
                dataOrders.unshift(editedOrder)
                editedOrder = null
            })
            return dataOrders
        }
    }
    getTotalRate = (orders) => {
        let totalRate = 0;
        orders.map(order => { totalRate += +order.stay.reviewsAvg })
        // orders.map(order => { console.log(order); })
        return totalRate
    }
    onApproveOrder = (orderId) => {
        const { orders } = this.props
        const order = orders.filter(order => order._id === orderId)
        order[0].status = "approved"
        console.log(order);
        this.props.onUpdateOrder(order[0])
    }
    onDeclinelOrder = (orderId) => {
        const { orders } = this.props
        const order = orders.filter(order => order._id === orderId)
        order[0].status = "declined"
        console.log(order);
        this.props.onUpdateOrder(order)
    }
    onRemoveOrder = (orderId) => {
        this.props.onRemoveOrder(orderId)
    }
    getOrdersStatus = (status) => {
        const { orders } = this.props
        const filterdOrders = orders.filter(order => order.status === status)
        return filterdOrders.length
    }
    render() {
        const { orders } = this.props
        const columns = [
            {
                name: 'stayName',
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "address",
                label: "Address",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "price",
                label: "Price",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "approveBtn",
                label: "Actions",

            }
        ];
        const options = {
            filter: true,
            filterType: "dropdown",
        };

        return (
            <main className="notifications-page-container  ">
                <section className="dashboard-header-container flex">
                    <div className="total-rate-container flex column space-between">
                        <div>
                            <p className="dashboard-label">Total Rate</p>
                        </div>
                        <div className="dashboard-value flex ">
                            <p className="checkout-star"><FaStar size={13} color="#FF5A5F" /></p>
                            <p className="dash-avg-score">{this.getTotalRate(orders)}</p>
                        </div>
                    </div>
                    <div className="dash-stat-container flex column space-between">
                        <div className="dashboard-label">
                        </div>
                        <div className="dashboard-value">
                            <p className="dash-avg-score">{5}%</p>
                        </div>
                    </div>
                    <div className="dash-earning-container flex column space-between">
                        <div>
                            <p className="dashboard-label">monthly earning</p>
                        </div>
                        <div className="dashboard-value">
                            <p className="dash-avg-earning">{5}%</p>
                        </div>
                    </div>
                    <div className="dash-earning-container flex column space-between">
                        <div>
                            <p className="dashboard-label">Orders</p>
                        </div>
                        <div className="orders-sec-dash flex ">
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle pending"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('pending')}/{orders.length}</p>
                            </div>
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle approved"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('approved')}/{orders.length}</p>
                            </div>
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle declined"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('declined')}/{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="notifications-container">
                    <MUIDataTable
                        title={"Your orders"}
                        data={this.getData()}
                        columns={columns}
                        options={options}

                    />
                </section>
            </main>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadUser,
    onUpdateOrder,
    onRemoveOrder
}


export const OrdersDashboard = connect(mapStateToProps, mapDispatchToProps)(_OrdersDashboard)
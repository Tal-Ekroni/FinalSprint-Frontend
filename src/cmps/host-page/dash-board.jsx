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
                    approveBtn: <div>
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
    render() {
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
            <main className="notifications-page-container  main-container">
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
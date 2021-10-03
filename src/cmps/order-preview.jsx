import React from "react";
import { connect } from 'react-redux'
import { onCancelOrder, onApproveOrder } from '../store/order.actions'
import LazyLoad from "./preview-slider"

class _OrderPreview extends React.Component {
    state = {
        order: null
    }

    getTime = (time) => {
        var time = new Date(time * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    onApproveOrder = (order) => {
        const { _id, buyer, host } = order
        const buyerId = buyer._id
        const hostId = host._id
        this.props.onApproveOrder(_id, buyerId, hostId)
    }
    onCancelOrder = (order) => {
        const { _id, buyer, host } = order
        const buyerId = buyer._id
        const hostId = host._id
        this.props.onCancelOrder(_id, buyerId, hostId)
    }
    render() {
        const { order } = this.props
        var startDate = this.getTime(order.startDate)
        var endDate = this.getTime(order.endDate)
        console.log('order', order);
        return (
            <div className="order-preview-container"  >
                {order &&
                    <section>
                        <div>
                            <div className="order-img-container">
                                {/* <img src={order.stay.imgUrl} alt="" /> */}
                                <LazyLoad imgs={order.stay.imgUrls} />
                            </div>
                        </div>
                        <div className="order-preview-details">
                            <div className="name-dates-container flex space-between">
                                <div><h4>{order.stay.name}</h4></div>
                                <div>
                                    <div>{startDate}</div>
                                    <div>{endDate}</div>
                                </div>
                            </div>
                            <div className="buyer-container flex space-between">
                                <div><h4>{order.buyer.fullname}</h4></div>
                                {/* <div>{order.guests}</div> */}
                            </div>
                            <div className="host-btns-container flex space-between">
                                {order.status === 'pending' && <div>
                                    <button onClick={() => { this.onApproveOrder(order) }} className="host-btns approve-btn">Approve</button>
                                </div>}
                                <div><button onClick={() => { this.onCancelOrder(order) }} className="host-btns cancel-btn">Cancel</button></div>
                            </div>
                        </div >
                    </section>}
            </div >
        )
        return (
            <div>hi</div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays



    }
}

const mapDispatchToProps = {
    onCancelOrder,
    onApproveOrder
}


export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)
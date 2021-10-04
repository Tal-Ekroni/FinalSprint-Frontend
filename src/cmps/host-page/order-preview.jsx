import React from "react";
import { connect } from 'react-redux'
import { onCancelOrder, onApproveOrder } from '../../store/order.actions'
import LazyLoad from "../preview-slider"
import { loadUser } from '../../store/user.actions'
import { utilService } from "../../services/util.service";

class _OrderPreview extends React.Component {
    state = {
        order: null,
        isApproved: false
    }
    componentDidMount() {
        const { order } = this.props
        console.log(order);
        if (order.status === 'pending') this.setState({ order, isApproved: false })
        if (order.status === 'approved') this.setState({ order, isApproved: true })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { order } = this.props
    //     console.log('prevProps', prevProps.order.status);
    //     if (order) {
    //         console.log('props', order.status);
    //         if (prevProps.order.status !== order.status) console.log('state', this.state)
    //     }

    // }

    getTime = (time) => {
        var time = new Date(time * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    onApproveOrder = (order) => {
        console.log('btn approve');
        const { _id, buyer, host } = order
        const buyerId = buyer._id
        const hostId = host._id
        this.props.onApproveOrder(_id, buyerId, hostId)
        this.setState({ isApproved: true })
    }
    onCancelOrder = (order) => {
        const { _id, buyer, host } = order
        const buyerId = buyer._id
        const hostId = host._id
        this.props.onCancelOrder(_id, buyerId, hostId)
    }
    render() {
        const { order } = this.props
        const { adults, kids, infants } = order.guests
        console.log('order', order);
        return (
            <div className="order-preview-container"  >
                {order &&
                    <section>
                        <div className="order-preview-details">
                            <div className="order-user-info flex " >
                                <div className="user-img-container">
                                    <img src={`https://i.pravatar.cc/100?u=${order.buyer._id}`} alt="" />
                                </div>
                                <div className="txt-info-container flex column">
                                    <div className="review-username-container">
                                        <p className="review-username">{order.buyer.fullname} </p>
                                    </div>
                                    <div className="review-username-container">
                                        {typeof order.createdAt === 'number' ? <p >{utilService.timeToShow(order.createdAt)} </p> : <p >{order.createdAt} </p>}
                                    </div>
                                </div>
                            </div>
                            <div><h4>{order.stay.name}</h4></div>
                            <div>{this.getTime(order.startDate)}-{this.getTime(order.endDate)}</div>
                            <div>
                                <p>Total Price: ${order.totalPrice} for {order.totalNights} nights </p>
                            </div>
                            <div>
                                {(adults + kids + infants === 1) && <p > Guests:{adults + kids + infants}</p>}
                                {(adults + kids + infants > 1) && <p>{adults > 0 && <span>Adults:{adults}</span>} {kids > 0 && <span>Children:{kids} </span>} {infants > 0 && <span> Infants:{infants}</span>}</p>}
                            </div>

                            <div className="host-btns-container flex space-between">
                                {order.status === 'pending' && <div>
                                    <button onClick={() => { this.onApproveOrder(order) }} className="host-btns approve-btn">Approve</button>
                                </div>}
                                {order.status === 'approved' && <div>
                                    <button className="host-btns apporved">Approved!</button>
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
    onApproveOrder,
    loadUser
}


export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)
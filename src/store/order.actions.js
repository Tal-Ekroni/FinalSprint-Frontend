import { orderService } from "../services/order.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";

export function loadOrders(userId, type) {
    return async (dispatch) => {
        try {
            const orders = await orderService.query(userId, type)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }
}

export function onRemoveOrder(orderId) {
    return async (dispatch, getState) => {
        try {
            await orderService.remove(orderId)
            dispatch({
                type: 'REMOVE_ORDER',
                orderId
            })
            showSuccessMsg('Order removed')
            console.log('Deleted Succesfully!');
        } catch (err) {
            showErrorMsg('Cannot remove order')
            console.log('Cannot remove order', err)
        }
    }
}

export function onAddOrder(orderToAdd) {
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(orderToAdd)
            console.log('orderToAdd', orderToAdd);

            dispatch({ type: 'ADD_ORDER', order: savedOrder })
            showSuccessMsg('Order added')
            // const user = await userService.getById(orderToAdd.buyer._id)
            // const hostUser = await userService.getById(orderToAdd.host._id)
            // const savedOrder = await orderService.save(orderToAdd)
            // console.log('host', hostUser);
            // console.log('user', user);
            // if (!hostUser.orders) hostUser.orders = []
            // if (!user.myTrips) user.myTrips = []
            // hostUser.orders.unshift(orderToAdd)
            // user.myTrips.unshift(orderToAdd)

            // const updatedUser = await userService.update(user)
            // const updatedHost = await userService.update(hostUser)
            // dispatch({ type: 'UPDATE_USER', user: updatedUser })
            // dispatch({ type: 'UPDATE_USER', user: updatedHost })
        }
        catch (err) {
            showErrorMsg('Cannot add order')
            console.log('Cannot add order', err)
        }
    }
}
export function onCancelOrder(tripId, buyerId, hostId) {
    return async (dispatch) => {
        try {
            // const {id , }
            console.log('trip cancel', tripId, buyerId, hostId);
            const buyer = await userService.getById(buyerId)
            const hostUser = await userService.getById(hostId)
            buyer.myTrips = buyer.myTrips.filter(trip => { return trip._id !== tripId })
            hostUser.orders = hostUser.orders.filter(trip => { return trip._id !== tripId })
            const updatedUser = await userService.update(buyer)
            const updatedHost = await userService.update(hostUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            dispatch({ type: 'UPDATE_USER', user: updatedHost })
            showSuccessMsg('Order canceled')

        }
        catch (err) {
            showErrorMsg('Cannot Cancel order')
            console.log('Cannot Cancel order', err)
        }
    }
}
export function onApproveOrder(orderId, buyerId, hostId) {
    return async (dispatch) => {
        try {
            const buyer = await userService.getById(buyerId)
            const hostUser = await userService.getById(hostId)
            const buyerIdx = buyer.myTrips.findIndex(trip => trip._id === orderId)
            const hostIdx = hostUser.orders.findIndex(order => order._id === orderId)
            buyer.myTrips[buyerIdx].status = 'approved'
            hostUser.orders[hostIdx].status = 'approved'
            const updatedUser = await userService.update(buyer)
            const updatedHost = await userService.update(hostUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            dispatch({ type: 'UPDATE_USER', user: updatedHost })
            showSuccessMsg('Order Approved')

        }
        catch (err) {
            showErrorMsg('Cannot approve order')
            console.log('Cannot approve order', err)
        }
    }
}
export function setFilter(filterBy) {
    return async (dispatch) => {
        try {
            await dispatch({
                type: 'SET_FILTER',
                filter: filterBy
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function onEditOrder(orderToSave) {
    // console.log('order to ', orderToSave);
    return async (dispatch) => {
        try {
            const updatedOrder = await orderService.update(orderToSave)
            console.log('Updated Order:', updatedOrder);
            dispatch({
                type: 'UPDATE_ORDER',
                order: updatedOrder
            })
            showSuccessMsg('Order updated')
        } catch (err) {
            showErrorMsg('Cannot update order')
            console.log('Cannot save order', err)
        }
    }

}


export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.orderModule.cart.reduce((acc, order) => acc + order.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
            showSuccessMsg('Charged you: $' + total.toLocaleString())


        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('CarActions: err in checkout', err)
        }
    }
}

// export function onBookTrip(trip) {
//     return async (dispatch, getState) => {
//         try {
//             // const userTrip = trip
//             // userTrip.id = orderId
//             // const hostOrder = trip
//             // hostOrder.id = orderId

//             // console.log('host', hostUser);
//             // console.log('user', user);

//             // showSuccessMsg('Stay Rserved ')
//         } catch (err) {
//             showErrorMsg('Cannot reserve stay')
//             console.log('Cannot reserve stay', err)
//         }
//     }
// }

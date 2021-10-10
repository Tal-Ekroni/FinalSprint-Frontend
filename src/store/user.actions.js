import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js";
import { socketService } from "../services/socket.service.js";
import { stayService } from '../services/stay.service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";


export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}
export function loadUser(userId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const user = await userService.getById(userId)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in loadUser', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}
export function updateUser(userToSave) {
    console.log('usert', userToSave);
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(userToSave)
            dispatch({
                type: 'UPDATE_USER',
                user: updatedUser
            })
            showSuccessMsg('User updated')
        } catch (err) {
            showErrorMsg('Cannot update user')
            console.log('Cannot save user', err)
        }
    }

}



export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            if (user.isHost) {
                socketService.setup()
                const stays = await stayService.query()
                console.log('ishost', stays);

                stays.forEach((stay) => {
                    if (stay.host._id === user._id) socketService.emit('setStay', stay._id)

                })
                socketService.on('getNotif', async(notif) => {
                    user.notifications = [notif, ...user.notifications]
                    const userToSave = await userService.update(user)
                    dispatch({ type: 'UPDATE_USER', user: userToSave })
                })
            }
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return (dispatch) => {
        userService.signup(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
            })
            .catch(err => {
                showErrorMsg('Cannot signup')
                console.log('Cannot signup', err)
            })

    }
}

export function onLogout() {
    return (dispatch) => {
        userService.logout()
            .then(() => dispatch({
                type: 'SET_USER',
                user: null
            }))
            .catch(err => {
                showErrorMsg('Cannot logout')
                console.log('Cannot logout', err)
            })
    }
}
export function onBecomeHost(userId) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(userId)
            user.isHost = true
            const updatedUser = await userService.update(user)
            dispatch({
                type: 'UPDATE_USER', user: updatedUser
            })
        } catch (err) {
            console.log(err);
        }
    }

}
export function onToggleLikedStay(savedStayId, isLiked, userId) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(userId)
            if (isLiked) {
                console.log(user);
                user.mySaves.push(savedStayId)
            } else {
                user.mySaves = user.mySaves.filter(saved => saved !== savedStayId)
            }
            const savedUser = await userService.update(user)
            dispatch({ type: 'UPDATE_USER', savedUser })
            showSuccessMsg('User updated')

        } catch (err) {
            console.log(err);
        }
    }
}
export function onBookTrip(trip) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(trip.user._id)
            const hostUser = await userService.getById(trip.stay.host._id)
            const orderId = utilService.makeId()

            const userTrip = trip
            userTrip.id = orderId
            const hostOrder = trip
            hostOrder.id = orderId

            if (!hostUser.orders) hostUser.orders = []
            if (!user.myTrips) user.myTrips = []
            hostUser.orders.push(hostOrder)
            user.myTrips.push(userTrip)

            const updatedUser = await userService.update(user)
            const updatedHost = await userService.update(hostUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            dispatch({ type: 'UPDATE_USER', user: updatedHost })

            showSuccessMsg('Stay Rserved ')
        } catch (err) {
            showErrorMsg('Cannot reserve stay')
            console.log('Cannot reserve stay', err)
        }
    }
}

export function loadAndWatchUser(userId) {
    return async (dispatch) => {
        try {
            // const user = await userService.getById(userId);
            // dispatch({ type: 'SET_WATCHED_USER', user })
            // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
            // socketService.off(SOCKET_EVENT_USER_UPDATED)
            // socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
            //     console.log('USER UPADTED FROM SOCKET');
            //     dispatch({ type: 'SET_WATCHED_USER', user })
            // })
        } catch (err) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}


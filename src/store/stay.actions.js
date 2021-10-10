import { stayService } from "../services/stay.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from "../services/user.service.js";
export function loadStays(filterBy = null) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy)
            dispatch({
                type: 'SET_STAYS',
                stays
            })
        } catch (err) {
            showErrorMsg('Cannot load stays')
        }
    }
}

export function loadStay(stayId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const stay = await stayService.getById(stayId)
            dispatch({ type: 'SET_STAY', stay })
        } catch (err) {
            console.log('UserActions: err in loadStay', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function onRemoveStay(stayId) {
    return async (dispatch, getState) => {
        try {
            await stayService.remove(stayId)
            dispatch({
                type: 'REMOVE_STAY',
                stayId
            })
            showSuccessMsg('Stay removed')
            console.log('Deleted Succesfully!');
        } catch (err) {
            showErrorMsg('Cannot remove stay')
            console.log('Cannot remove stay', err)
        }
    }
}

export function onAddStay(stayToAdd) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stayToAdd)
            console.log('Added Stay', savedStay);
            dispatch({
                type: 'ADD_STAY',
                stay: savedStay
            })
            showSuccessMsg('Stay added')
        }
        catch (err) {
            showErrorMsg('Cannot add stay')
            console.log('Cannot add stay', err)
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
export function setMiniHeader(isMiniHeader) {
    return async (dispatch, getState) => {
        try {
            await dispatch({
                type: 'SET_HEADER',
                isMiniHeader
            })
        } catch (err) {
            console.log(err);
        }
    }
}
export function onEditStay(stayToSave) {
    // console.log('stay to ', stayToSave);
    return async (dispatch) => {
        try {
            const updatedStay = await stayService.update(stayToSave)
            dispatch({
                type: 'UPDATE_STAY',
                stay: updatedStay
            })
            showSuccessMsg('Stay updated')
        } catch (err) {
            showErrorMsg('Cannot update stay')
            console.log('Cannot save stay', err)
        }
    }

}





export function removeFromCart(carId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            carId
        })
    }
}

export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.stayModule.cart.reduce((acc, stay) => acc + stay.price, 0)
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

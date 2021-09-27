const initialState = {
    stays: [],
    bookedStay: null,
    currStay: null,
    review: null,
    lastRemovedStay: null
}
export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    var cart
    switch (action.type) {
        case 'SET_STAYS':
            newState = { ...state, stays: action.stays }
            break
        case 'REMOVE_STAY':
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case 'ADD_STAY':
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case 'UPDATE_STAY':
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case 'Book-A-Stay':
            newState = { ...state, bookedStay: action.stay }
            break
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(stay => stay._id !== action.stayId)
            newState = { ...state, cart }
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break
        case 'UNDO_REMOVE_STAY':
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        default:
    }
    // For debug:
    window.stayState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}

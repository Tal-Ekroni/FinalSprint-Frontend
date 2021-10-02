
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'order'
const listeners = []

export const orderService = {
    query,
    getById,
    save,
    remove,
    subscribe

}
window.cs = orderService;

function query(filterBy) {
    const orders = storageService.query(STORAGE_KEY,200,filterBy) 
    return orders
}
function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}
function remove(orderId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, orderId)
}
function save(order) {
    console.log('order', order);
        return storageService.post(STORAGE_KEY, order)

}
function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersOrdersChanged(orders) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(orders))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(orders => {
            _notifySubscribersOrdersChanged(orders)
        })
})

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





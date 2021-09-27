
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'
const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    subscribe

}
window.cs = stayService;

function query() {
    const stays = storageService.query(STORAGE_KEY) 
    return stays
}
function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}
function remove(stayId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, stayId)
}
function save(stay) {
    console.log(stay);
    if (stay._id) {
        return storageService.put(STORAGE_KEY, stay)
    } else {
        stay.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, stay)
    }
}

function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersStaysChanged(stays) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(stays))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(stays => {
            _notifySubscribersStaysChanged(stays)
        })
})

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





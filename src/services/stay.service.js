
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
    subscribe,
    onGetQueryParams

}
window.cs = stayService;

function query(filterBy) {
    const stays = storageService.query(STORAGE_KEY,200,filterBy) 
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
        return storageService.post(STORAGE_KEY, stay)

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
function onGetQueryParams(){
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');
    const adultNumber = urlParams.get('adults');
    const kidsNumber = urlParams.get('kids');
    const infantsNumber = urlParams.get('infants');
    const params = {
        location,
        startDate,
        endDate,
        adultNumber,
        kidsNumber,
        infantsNumber
    }
    return params
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






import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'stay'
const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    subscribe,
    onGetQueryParams,
    update

}
window.cs = stayService;

async function query(filterBy) {
    // const stays = storageService.query(STORAGE_KEY, 200, filterBy)
    const stays = await httpService.get('stay', { params: filterBy })
    return stays
}
async function getById(stayId) {
    const stay = await httpService.get(`stay/${stayId}`)
    return stay
    // return storageService.get(STORAGE_KEY, stayId)
}
function remove(stayId) {
    // return Promise.reject('Not now!');
    // return storageService.remove(STORAGE_KEY, stayId)
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    return httpService.post(STORAGE_KEY, stay)

}
async function update(stay) {
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    const UpdatedStay = await storageService.put('stay', stay)
    return UpdatedStay;

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
function onGetQueryParams() {
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





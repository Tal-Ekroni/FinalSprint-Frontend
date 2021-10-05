import { httpService } from './http.service.js'

const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    subscribe,
    onGetQueryParams,
    update
}
window.cs = stayService;

async function query(filterBy) {
    const stays = await httpService.get('stay', { params: filterBy })
    return stays
}
async function getById(stayId) {
    const stay = await httpService.get(`stay/${stayId}`)
    return stay
}
function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    return httpService.post('stay', stay)

}
async function update(stay) {
    const UpdatedStay = await httpService.put(`stay/${stay._id}`, stay)
    return UpdatedStay;
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





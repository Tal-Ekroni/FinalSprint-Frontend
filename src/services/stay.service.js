import { showUserMsg } from './event-bus.service.js';
import { httpService } from './http.service.js'

const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    subscribe,
    update,
    filterPageStays
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


function filterPageStays(filterBy, stays) {
    var filterdStays = []
    // filterdStays = [...filterdStays, ...stays.filter(stay =>
    //     stay.amenities.filter(amenity => filterBy.amenities[amenity])
    // )]
    if (filterBy.placeType) {
        filterdStays = [...filterdStays, ...stays.filter(stay => stay.assetType.split(' ')[0] === filterBy.placeType.split(' ')[0])]
    }
    if (filterBy.PropertyType) {
        filterdStays = [...filterdStays, ...stays.filter(stay =>
            stay.assetType.toLowerCase().split(' ')[1] === filterBy.PropertyType.toLowerCase())]
    }
    if (filterBy.priceRange) {
        console.log('hi from price range');
    }
    return filterdStays
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





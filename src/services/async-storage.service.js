import * as stays from '../data/stays-data.json';
import * as users from '../data/users-data.json';
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}
let gStays = stays.default;
let gUsers = users.default;

function query(entityType, delay = 200, filterBy) {
    var entities;
    var filterdEntities = []
    if (entityType === 'stay') entities = JSON.parse(localStorage.getItem(entityType)) || _save('stay', gStays);
    if (entityType === 'user') entities = JSON.parse(localStorage.getItem(entityType)) || _save('user', gUsers);
    // var entities = JSON.parse(localStorage.getItem(entityType)) 
    if (filterBy) {
        if (filterBy.location) {
            console.log(filterBy.location);
            const regex = new RegExp(filterBy.location, 'i');
            filterdEntities = entities.filter(entity => regex.test(entity.loc.address.split(',')[0]))
            return filterdEntities
        }


    }
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         // reject('OOOOPs')
    //         resolve(entities)
    //     }, delay)
    // })
    return Promise.resolve(entities)
}



function get(entityType, entityId) {
    // console.log(entityType, entityId);
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
    // .then(entities =>)
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}
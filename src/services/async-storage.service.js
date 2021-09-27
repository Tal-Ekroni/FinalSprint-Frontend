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

<<<<<<< HEAD
function query(entityType, delay, filterBy) {
    console.log('in async storage', filterBy)
    let entities = JSON.parse(localStorage.getItem(entityType)) || _save('stay', gStays);
=======
function query(entityType, delay = 200) {
    var entities;
    if (entityType === 'stay') entities = JSON.parse(localStorage.getItem(entityType)) || _save('stay', gStays);
    if (entityType === 'user') entities = JSON.parse(localStorage.getItem(entityType)) || _save('user', gUsers);
>>>>>>> cfd5d3f3a9184610c8fbb43e597ac008608ef56c
    // var entities = JSON.parse(localStorage.getItem(entityType)) 
    if (filterBy) {
        if (filterBy.cityName) {
            let filteredEntities = entities.filter(entity => {
                return entity.loc.address.includes(filterBy.cityName)

            })
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // reject('OOOOPs')
                    resolve(filteredEntities)
                }, delay)
            })
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // reject('OOOOPs')
                    resolve(entities)
                }, delay)
            })
        }
    }
    // return Promise.resolve(entities)
}
// _save('stay',gStays)



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
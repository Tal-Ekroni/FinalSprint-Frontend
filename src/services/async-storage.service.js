
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}
let gStays =
[  {
    _id: "1000643546",
    name: "Ribeira Charming Duplex",
    assetType:"Entire duplex",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "Portugal",
        countryCode: "PT",
        address: "Porto, Portugal",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
}, 
 {
    _id: "1029006546",
    name: "Lola Balola akola",
    assetType:"Entire duplex",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "loblogal",
        countryCode: "PT",
        address: "Barcelona, Spain",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
},  {
    _id: "103996300646546",
    name: "Taboola salad",
    assetType:"Entire duplex",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "Portugal",
        countryCode: "PT",
        address: "Beer Yaakov, Israel",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
},  {
    _id: "10963006546",
    name: "JabrukLandia",
    assetType:"Entire duplex",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "Portugal",
        countryCode: "PT",
        address: "Beer Yaakov, Israel",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
},  {
    _id: "143040446",
    name: "Baba Kababa",
    assetType:"Entire duplex",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "Portugal",
        countryCode: "PT",
        address: "Beer Yaakov, Israel",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
},  {
    _id: "1567846",
    name: "Paris",
    assetType:"Entire island",
    imgUrls: [
        "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "otherImg.jpg"
    ],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
        "TV",
        "Wifi",
        "Kitchen",
        "Smoking allowed",
        "Pets allowed",
        "Cooking basics"
    ],
    host: {
        _id: "51399391",
        fullname: "Davit Pok",
        imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small"
    },
    loc: {
        country: "Portugal",
        countryCode: "PT",
        address: "Beer Yaakov, Israel",
        lat: -8.61308,
        lng: 41.1413
    },
    reviews: [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
                _id: "u102",
                fullname: "user2",
                imgUrl: "/img/img2.jpg"
            }
        }
    ],
    likedByUserIds: [
        "u101",
        "u102"
    ]
}]
// _save('stay',gStays)
function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || gStays
    // var entities = JSON.parse(localStorage.getItem(entityType)) 

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}



function get(entityType, entityId) {
    console.log(entityType, entityId);
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
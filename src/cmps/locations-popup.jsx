import React from "react";
// import locImg1 from '../assets/img/location-preview-1.png'
// import locImg2 from '../assets/img/location-preview-2.png'
// import locImg3 from '../assets/img/location-preview-3.png'
// import locImg4 from '../assets/img/location-preview-4.jpg'
// import locImg5 from '../assets/img/location-preview-5.jpg'
// import locImg6 from '../assets/img/location-preview-6.png'
// import locImg7 from '../assets/img/location-preview-7.jpg'
// import locImg8 from '../assets/img/location-preview-8.png'
const locations = [{ city: 'Porto', country: 'Portugal' }, { city: 'Barcelona', country: 'Spain' }, { city: 'Tel Aviv', country: 'Israel' }, { city: 'Paris', country: "France" }, { city: 'London', country: 'United Kingdom' }, { city: 'New York', country: 'United States' }, { city: 'Amsterdam', country: 'Netherlands' }, { city: 'Rome', country: 'Italy' }]
export function LocationsPopUp({ history }) {
    function onPushTo(pushTo) {
        history.push(pushTo)
    }

    return (
        <div className="location-modal flex column">
            {locations.map((location, idx) => <div className="location-card flex align-center" onClick={() => { onPushTo(`explore/?location=${location.city}`) }}>
                <img src={`./img/location-preview-${idx+1}.jpg`} alt="location" className="loc-img" />
                <div className="flex column">
                    <p className="location-city">{location.city}</p>
                    <p className="location-country">{location.country}</p>
                </div>
            </div>
            )}
        </div>
        
    )
}

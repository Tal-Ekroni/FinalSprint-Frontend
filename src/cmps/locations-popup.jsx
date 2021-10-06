import React from "react";
const locations = [{ city: 'Porto', country: 'Portugal' }, { city: 'Barcelona', country: 'Spain' }, { city: 'Tel Aviv', country: 'Israel' }, { city: 'Paris', country: "France" }, { city: 'London', country: 'United Kingdom' }, { city: 'New York', country: 'United States' }, { city: 'Amsterdam', country: 'Netherlands' }, { city: 'Rome', country: 'Italy' }]
export function LocationsPopUp({ history, closeAllModals }) {
    function onPushTo(pushTo) {
        closeAllModals()
        history.push(pushTo)
    }

    return (
        <div className="location-modal flex column">
            {locations.map((location, idx) => <div key={idx} className="location-card flex align-center" onClick={() => { onPushTo(`explore/?location=${location.city}`) }}>
                <img src={`./img/location-preview-${idx + 1}.jpg`} alt="location" className="loc-img" />
                <div className="flex column">
                    <p className="location-city">{location.city}</p>
                    <p className="location-country">{location.country}</p>
                </div>
            </div>
            )}
        </div>

    )
}

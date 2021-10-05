import React from "react";
import { withRouter } from "react-router-dom"
import locImg1 from '../assets/img/location-preview-1.png'
import locImg2 from '../assets/img/location-preview-2.png'
import locImg3 from '../assets/img/location-preview-3.png'
import locImg4 from '../assets/img/location-preview-4.jpg'
import locImg5 from '../assets/img/location-preview-5.jpg'
import locImg6 from '../assets/img/location-preview-6.png'
import locImg7 from '../assets/img/location-preview-7.jpg'
import locImg8 from '../assets/img/location-preview-8.png'
import { Link } from 'react-router-dom'

export function LocationsPopUp({ history }) {
    function onPushTo(pushTo) {
        history.push(pushTo)
    }
    return (
        <div className="location-modal flex column">
            <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=porto') }}>
                <img src={locImg1} className="loc-img" />
                <div className="flex column">
                    <p className="location-city">Porto</p>
                    <p className="location-country">Portugal</p>
                </div>
            </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=Barcelona') }}>
                    <img src={locImg2} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">Barcelona</p>
                        <p className="location-country">Spain</p>
                    </div>
                </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=Tel Aviv') }}>
                    <img src={locImg3} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">Tel Aviv</p>
                        <p className="location-country">Israel</p>
                    </div>
                </div>

                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=Paris') }}>
                    <img src={locImg4} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">Paris</p>
                        <p className="location-country">France</p>
                    </div>
                </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=London') }}>
                    <img src={locImg5} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">London</p>
                        <p className="location-country">United Kingdoms</p>
                    </div>
                </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=New York') }}>
                    <img src={locImg6} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">New York</p>
                        <p className="location-country">United States</p>
                    </div>
                </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=Amsterdam') }}>
                    <img src={locImg7} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">Amsterdam</p>
                        <p className="location-country">Netherlands</p>
                    </div>
                </div>
                <div className="location-card flex align-center" onClick={() => { onPushTo('explore/?location=Rome') }}>
                    <img src={locImg8} className="loc-img" />
                    <div className="flex column">
                        <p className="location-city">Rome</p>
                        <p className="location-country">Italy</p>
                    </div>
                </div>
        </div>
    )
}

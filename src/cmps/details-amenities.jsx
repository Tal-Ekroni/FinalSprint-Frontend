import React from 'react'
import { Fa } from 'react-icons'
import { FaAirFreshener, FaApple, FaDog, FaSmoking, FaSmokingBan, FaTv, FaWifi } from 'react-icons/fa';
export class AssetAmenities extends React.Component {
    getAmenitiesIcons = (amenity) => {
        switch (amenity) {
            case 'TV':
                return <FaTv />
            case 'Wifi':
                return <FaWifi />
            case 'Kitchen':
                return <FaApple />
            case 'Smoking allowed':
                return <FaSmoking />
            case 'Pets allowed':
                return <FaDog/>
            case 'No smoking':
                return <FaSmokingBan />
            case 'Air conditioner':
                return <FaAirFreshener />
            // case 'Cooking basics':
            //     return <FaC />
         

        }
    }
    render() {
        const { amenities } = this.props
        return (
            <ul className="amenities-list flex space-between">
                {amenities && amenities.map(amenity => {
                    return <li key={amenity} className="amenity-item flex">
                        <div className="amenity-icon-container">
                            {this.getAmenitiesIcons(amenity)}
                        </div>
                        <div className="amenity-txt">
                            <p>{amenity}</p>
                        </div>
                    </li>
                })}
            </ul>
        )
    }

}
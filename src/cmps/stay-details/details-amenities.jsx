import { FastfoodTwoTone } from '@material-ui/icons';
import React from 'react'
import { FaAirFreshener, FaBlender, FaCar, FaHotTub, FaPaw, FaSmoking, FaSmokingBan, FaTv, FaWifi } from 'react-icons/fa';
export class AssetAmenities extends React.Component {
    getAmenitiesIcons = (amenity) => {
        switch (amenity) {
            case 'TV':
                return <FaTv />
            case 'Wifi':
                return <FaWifi />
            case 'Kitchen':
                return <FastfoodTwoTone />
            case 'Smoking allowed':
                return <FaSmoking />
            case 'Pets allowed':
                return <FaPaw />
            case 'No smoking':
                return <FaSmokingBan />
            case 'Air conditioner':
                return <FaAirFreshener />
            case 'Cooking basics':
                return <FaBlender />
            case 'Hot tub':
                return <FaHotTub />
            case 'Free parking on premises':
                return <FaCar />
            default:
                break;

        }
    }
    render() {
        const { amenities } = this.props
        return (
            <ul className="amenities-list flex">
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
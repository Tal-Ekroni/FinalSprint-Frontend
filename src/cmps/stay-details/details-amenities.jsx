import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastfoodTwoTone, FireplaceOutlined, BeachAccess, OutdoorGrill, Kitchen, KingBed, Deck, LocalLaundryService, Pool, Bathtub, RoomService, Speaker, SportsEsports } from '@material-ui/icons';
import { Balcony, Checkroom, CoffeeMaker, Crib, Iron } from '@mui/icons-material';

import React from 'react'
import {
    FaSnowflake, FaBlender, FaCar, FaHotTub, FaPaw, FaSmoking, FaSmokingBan, FaTv, FaWifi,
    FaLock, FaThermometerHalf, FaDoorClosed, FaWineGlassAlt, FaSwimmingPool, FaAccessibleIcon
} from 'react-icons/fa';
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
            case 'Hot tub':
                return <FaHotTub />
            case 'Pets allowed':
                return <FaPaw />
            case 'No smoking':
                return <FaSmokingBan />
            case 'Cooking basics':
                return <FaBlender />
            case 'Air conditioning':
                return <FaSnowflake />
            case 'Heating':
                return <FaThermometerHalf />
            case 'Pool':
                return <Pool />
            case 'Indoor fireplace':
                return <FireplaceOutlined />
            case 'Refrigerator':
                return < Kitchen />
            case 'Refrigerator':
                return <FontAwesomeIcon icon="refrigerator" />
            case 'Dishwasher':
                return <FontAwesomeIcon icon="washer" />
            case 'Backyard':
                return <Deck />
            case 'BBQ grill':
                return <OutdoorGrill />
            case 'Crib':
                return <Crib />
            case 'Private entrance':
                return <FaDoorClosed />
            case 'Lockbox':
                return <FaLock />
            case 'Beachfront':
                return <BeachAccess />
            case 'Hangers':
                return < Checkroom />
            case 'Wine glasses':
                return <FaWineGlassAlt />
            case 'Free parking':
                return <FaCar />
            case 'Accessible':
                return <FaAccessibleIcon />
            case 'King size bed':
                return <KingBed />
            case 'Bathub':
                return <Bathtub />
            case 'Balcony':
                return <Balcony />
            case 'Iron':
                return <Iron />
            case 'Room service':
                return <RoomService />
            case 'Coffee machine':
                return <CoffeeMaker />
            case 'Laundry machine':
                return <LocalLaundryService />
            case 'Speakers':
                return < Speaker />
            case 'Gaming console':
                return < SportsEsports />
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
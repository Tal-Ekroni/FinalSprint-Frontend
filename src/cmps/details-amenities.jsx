import React from 'react'

export class AssetAmenities extends React.Component {
    getAmenitiesIcons = (amenity) => {
        console.log(amenity);
    }
    render() {
        const amenities =  this.props
        console.log('123',amenities);
        return (
            <div>
                AssetAmenities
            </div>
        )
    }

}
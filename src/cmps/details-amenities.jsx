import React from 'react'

export class AssetAmenities extends React.Component {
    componentDidMount() {
        console.log('amen', this.props);
    }
    getAmenitiesIcons = (amenity) => {
        console.log(amenity);
    }
    render() {
        return (
            <div>
                AssetAmenities
            </div>
        )
    }

}
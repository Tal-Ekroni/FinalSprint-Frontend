import React from 'react'
import { DynamicModal } from './DynamicModal'
import PriceRangeSlider from './price-range-slider'
export class ExploreFilter extends React.Component {
    render() {
        const { placeTypeIsOpen, PropertyTypeIsOpen, PriceIsOpen, AmenitiesTypeIsOpen } = this.props.modals
        const amenities = this.props.amenities
        return (
            <div className="explore-filter flex">
                <div className="sort-type type-of-place">
                    <button onClick={() => { this.props.onToggleModals('placeTypeIsOpen') }}>Type of place</button>
                    {placeTypeIsOpen && <DynamicModal >

                        <div className="place-type" onClick={(ev) => { this.props.onSetPageFilter('placeType', 'Entire Place') }}>
                            <h1>Entire Place</h1>
                            <p>You'll Have The Place To Yourself</p>
                        </div>
                        <div className="place-type" onClick={(ev) => { this.props.onSetPageFilter('placeType', 'Private Room') }}>
                            <h1>Private Room</h1>
                            <p>You'll Have A Private Room To Yourself</p>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type property-type">
                    <button onClick={() => { this.props.onToggleModals('PropertyTypeIsOpen') }}>Property Type</button>
                    {PropertyTypeIsOpen && <DynamicModal >
                        <div className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Loft') }}>
                            <h1>Loft</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Studio', ev) }}>
                            <h1>Studio</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Penthouse', ev) }}>
                            <h1>Penthouse</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Appartment', ev) }}>
                            <h1>Appartment</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Hotel', ev) }}>
                            <h1>Hotel</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Villa', ev) }}>
                            <h1>Villa</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Duplex', ev) }}>
                            <h1>Duplex</h1>
                        </div>
                        <div className="property-type" className="property-type" onClick={(ev) => { this.props.onSetPageFilter('PropertyType', 'Home', ev) }}>
                            <h1>Home</h1>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type price">
                    <button onClick={() => { this.props.onToggleModals('PriceIsOpen') }}>Price</button>
                    {PriceIsOpen && <DynamicModal >
                        <PriceRangeSlider onSetPageFilter={this.props.onSetPageFilter} />
                    </DynamicModal>}
                </div>
                <div className="">
                </div>
                <div className="sort-type amenities-type">
                    <button onClick={() => { this.props.onToggleModals('AmenitiesTypeIsOpen') }}>Amenities</button>
                    {AmenitiesTypeIsOpen && <DynamicModal >
                        <div className={amenities['TV'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('TV') }}>
                            <h1>
                                TV
                            </h1>
                        </div>
                        <div className={amenities['Wifi'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('Wifi') }}>
                            <h1>
                                Wifi
                            </h1>
                        </div>
                        <div className={amenities['AC'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('AC') }}>
                            <h1>
                                AC
                            </h1>
                        </div>
                        <div className={amenities['Smoking Allowed'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('Smoking allowed') }}>
                            <h1>
                                Smoking Allowed
                            </h1>
                        </div>
                        <div className={amenities['Pets Allowed'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('Pets allowed') }}>
                            <h1>
                                Pets Allowed
                            </h1>
                        </div>
                        <div className={amenities['Cooking Basics'] ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity('Cooking basics') }}>
                            <h1>
                                Cooking Basics
                            </h1>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type type-of-place">
                    <button onClick={this.props.onClearPageFilter}>Clear</button>
                </div>
            </div>
        )
    }
}



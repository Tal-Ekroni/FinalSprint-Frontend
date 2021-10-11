import React from 'react'
import { DynamicModal } from './DynamicModal'
import PriceRangeSlider from './price-range-slider'
export class ExploreFilter extends React.Component {
    componentDidMount() {
        window.addEventListener('scroll', (ev) => {
            if (ev.target.scrollingElement.scrollTop > 150) {
                this.props.closeAllModals()
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', (ev) => {
            if (ev.target.scrollingElement.scrollTop > 150) {
                this.props.closeAllModals()

            }
        })

    }
    render() {
        const { placeTypeIsOpen, PropertyTypeIsOpen, PriceIsOpen, AmenitiesTypeIsOpen } = this.props.modals
        const { amenities, allStaysPriceAvg, ameintiesOptions } = this.props
        const types = ['Loft', 'Studio', 'Penthouse', 'Appartment', 'Hotel', 'Villa', 'Duplex', 'Home']
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
                        <PriceRangeSlider onSetPageFilter={this.props.onSetPageFilter} allStaysPriceAvg={allStaysPriceAvg} />
                    </DynamicModal>}
                </div>
                <div className="">
                </div>
                <div className="sort-type amenities-type">
                    <button onClick={() => { this.props.onToggleModals('AmenitiesTypeIsOpen') }}>Amenities</button>
                    {AmenitiesTypeIsOpen && <DynamicModal >
                        {ameintiesOptions.map((amenity, idx) => {
                            return (<div key={idx} className={amenity.isChecked ? 'amenities-type active' : 'amenities-type'} onClick={() => { this.props.onSetAmenity({ name: amenity.name, isChecked: !amenity.isChecked }) }}>
                                <h1>
                                    {amenity.name}
                                </h1>
                            </div>)
                        })}

                    </DynamicModal>}
                </div>
                <div className="sort-type type-of-place">
                    <button onClick={this.props.onClearPageFilter}>Clear</button>
                </div>
            </div>
        )
    }
}



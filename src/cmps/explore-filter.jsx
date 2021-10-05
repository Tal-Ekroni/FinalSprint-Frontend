import React from 'react'
import { DynamicModal } from './DynamicModal'

export class ExploreFilter extends React.Component {
    state = {
        modals: {
            placeTypeIsOpen: false,
            PropertyTypeIsOpen: false,
            PriceIsOpen: false,
            AmenitiesTypeIsOpen: false,
        }

    }
    onCloseAllModals = () => {
        this.setState({ modals: { ...this.state.modals, placeTypeIsOpen: false, PropertyTypeIsOpen: false, PriceIsOpen: false, AmenitiesTypeIsOpen: false } })
        // this.setState({ modals:{placeTypeIsOpen: false, PropertyTypeIsOpen: false, PriceIsOpen: false, AmenitiesTypeIsOpen: false }})
    }
    onToggleModals = (modal) => {
        this.onCloseAllModals()
        switch (modal) {
            case 'placeTypeIsOpen':
                this.setState({ modals: { ...this.state.modals, placeTypeIsOpen: !this.state.modals.placeTypeIsOpen } })
                break;
            case 'PropertyTypeIsOpen':
                this.setState({ modals: { ...this.state.modals, PropertyTypeIsOpen: !this.state.modals.PropertyTypeIsOpen } })
                break;
            case 'PriceIsOpen':
                this.setState({ modals: { ...this.state.modals, PriceIsOpen: !this.state.modals.PriceIsOpen } })
                break;
            case 'AmenitiesTypeIsOpen':
                this.setState({ modals: { ...this.state.modals, AmenitiesTypeIsOpen: !this.state.modals.AmenitiesTypeIsOpen } })
                break;
            default:
                break;
        }
    }
    render() {
        const { placeTypeIsOpen, PropertyTypeIsOpen, PriceIsOpen, AmenitiesTypeIsOpen } = this.state.modals
        return (
            <div className="explore-filter flex">
                <div className="sort-type type-of-place">
                    <button onClick={() => { this.onToggleModals('placeTypeIsOpen') }}>Type of place</button>
                    {placeTypeIsOpen && <DynamicModal >
                        <div className="place-type">
                            <h1>Entire Place</h1>
                            <p>You'll Have The Place To Yourself</p>
                        </div>
                        <div className="place-type">
                            <h1>Private Room</h1>
                            <p>You'll Have A Pricate Room To Yourself</p>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type property-type">
                    <button onClick={() => { this.onToggleModals('PropertyTypeIsOpen') }}>Property Type</button>
                    {PropertyTypeIsOpen && <DynamicModal >
                        <div className="property-type">
                            <h1>Loft</h1>
                        </div>
                        <div className="property-type">
                            <h1>Studio</h1>
                        </div>
                        <div className="property-type">
                            <h1>Penthouse</h1>
                        </div>
                        <div className="property-type">
                            <h1>Appartment</h1>
                        </div>
                        <div className="property-type">
                            <h1>Hotel</h1>
                        </div>
                        <div className="property-type">
                            <h1>Villa</h1>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type price">
                    <button onClick={() => { this.onToggleModals('PriceIsOpen') }}>Price</button>
                    {PriceIsOpen && <DynamicModal >
                        <div className="price">
                            <input type="number" name="" id="" />
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type amenities-type">
                    <button onClick={() => { this.onToggleModals('AmenitiesTypeIsOpen') }}>Amenities</button>
                    {AmenitiesTypeIsOpen && <DynamicModal >
                        <div className="amenities-type">
                            <h1>
                                TV
                            </h1>
                        </div>
                        <div className="amenities-type">
                            <h1>
                                Wifi
                            </h1>
                        </div>
                        <div className="amenities-type">
                            <h1>
                                AC
                            </h1>
                        </div>
                        <div className="amenities-type">
                            <h1>
                                Smoking Allowed
                            </h1>
                        </div>
                        <div className="amenities-type">
                            <h1>
                                Pets Allowed
                            </h1>
                        </div>
                        <div className="amenities-type">
                            <h1>
                                Cooking Basics
                            </h1>
                        </div>
                    </DynamicModal>}
                </div>
                <div className="sort-type type-of-place">
                    <button >Clear</button>
                </div>

            </div>
        )
    }

}



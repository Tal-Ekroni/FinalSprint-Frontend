
import { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import { TextField } from '@material-ui/core';

class _AddStayMap extends Component {

    state = {
        selectedPlace: '',
        loc: {
            lat: '',
            lng: '',
            address: '',
            country: ''
        }

    }
    handleChange = (address) => {
        this.setState({ selectedPlace: address }, () => { console.log(this.state); });
    }
    handleSelect = async (address) => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        this.setState({ selectedPlace: address, loc: { lat: latLng.lat, lng: latLng.lng, address: address } }, () => {
            console.log(this.state.loc);
            this.props.handleAddressChange(this.state.loc)
        })
    }

    render() {
        const { selectedPlace } = this.state
        return (
            <section >
                <div className="add-form-line flex align-center ">
                    <label className="add-line" htmlFor="">Address</label>

                    <PlacesAutocomplete
                        value={selectedPlace}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    value={selectedPlace}
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion, idx) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                key={idx}
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
                {/* <div className="main-add-map-container">

                    <Map
                        containerStyle={style}
                        google={this.props.google}
                        zoom={15}
                        initialCenter={center}
                        onClick={this.onMapClicked}
                        center={center}
                    >
                        <Marker
                            position={center}
                            name={'Current location'}
                            onClick={this.onMarkerClicked}
                        />
                    </Map>
                </div>
                <div>
                    {this.state.loc.address && <h1 className="address-title">{this.state.loc.address.split(',')[0]} , {this.state.loc.address.split(',')[1]}</h1>}
                </div> */}
            </section>
        );
    }
}

export const AddStayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyC4nnRlZ8NjJzwvd5SZMk3ukykZTfqRKNU')
})(_AddStayMap)
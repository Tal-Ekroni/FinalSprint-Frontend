
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng, } from 'react-places-autocomplete';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

class _AddStayMap extends Component {

    state = {
        center: {
            lat: 31.73220474357407,
            lng: 35.18801418638734
        },
        selectedPlace: '',
        loc: {
            lat: '',
            lng: '',
            address: '',
            country: ''
        }

    }
    componentDidMount() {
    }
    onMapClicked = (props, marker, ev) => {
        // console.log(ev);
        console.log('map', ev.latLng.lat());
        this.setState({
            center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
            activeMarker: marker,
            selectedPlace: props,
            isInfoWindowOn: true
        })
        // console.log(props);
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }

    handleChange = (address) => {
        this.setState({ selectedPlace: address }, () => { console.log(this.state); });
    }
    handleSelect = async (address) => {
        console.log('ad', address);
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        await console.log('lat', latLng);
        await this.setState({ center: latLng, selectedPlace: address, loc: { lat: latLng.lng, lng: latLng.lng, address: address } }, () => {
            this.props.handleAddressChange(this.state.loc)
        })
    }

    render() {
        const { center, selectedPlace } = this.state

        const style = {
            width: '100%',
            height: '200px',
            position: "relative",
            margin: "0 auto"
        }
        return (
            <section >
                <div className="add-form-line flex align-center space-between">
                    <label className="add-line" htmlFor="">Enter your stay location</label>

                    <PlacesAutocomplete
                        value={this.state.selectedPlace}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
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
                <div className="main-add-map-container">

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
                    {this.state.loc.address && <h1 className="address-title">{this.state.loc.address}</h1>}
                </div>
            </section>
        );
    }
}

export const AddStayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyC4nnRlZ8NjJzwvd5SZMk3ukykZTfqRKNU')
})(_AddStayMap)
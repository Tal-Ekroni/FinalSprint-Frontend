
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';

class _AddStayMap extends Component {

    state = {
        center: {
            lat: 31.73220474357407,
            lng: 35.18801418638734
        },
        activeMarker: {
            lat: 31.73220474357407,
            lng: 35.18801418638734
        },
        selectedPlace: {},
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
        console.log(ev);
        this.setState({
            center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() },
            activeMarker: marker,
            selectedPlace: props,
            isInfoWindowOn: true
        })
        console.log(props);
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }
    render() {
        const { activeMarker, selectedPlace } = this.state

        const style = {
            width: '100%',
            height: '200px',
            position: "relative",
            margin: "0 auto"
        }
        return (
            <section className="main-add-map-container">

                <Map
                    containerStyle={style}
                    google={this.props.google}
                    zoom={15}
                    initialCenter={this.state.center}
                    onClick={this.onMapClicked}
                    center={this.state.center}
                >
                    {/* <StandaloneSearchBox>
                        <input
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </StandaloneSearchBox> */}
                    <Marker
                        position={activeMarker}
                        name={'Current location'}
                        onClick={this.onMarkerClicked}
                    />
                    {/* <Marker
                            key={loc.name}
                            position={loc}
                            name={'Current location'}
                            onClick={this.onMarkerClicked}
                        /> */}



                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={this.state.center}
                        visible={this.state.isInfoWindowOn}
                    >
                        <div>
                            <h1>{selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
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
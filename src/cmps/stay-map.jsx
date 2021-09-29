
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';

class _StayMap extends Component {

    state = {
        center: {
            lat: 31.73220474357407,
            lng: 35.18801418638734
        },
        loc: {
            lat: '',
            lng: '',
            address: '',
            country: ''
        }
    }
    componentDidMount() {
        const loc = this.props.location
        this.setState({ center: { lng: loc.lng, lat: loc.lat }, loc })
    }
    onMapClicked = (props, map, ev) => {
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }
    render() {
        const { loc } = this.state

        const style = {
            width: '100%',
            height: '400px',
            position: "relative",
            margin: "0 auto"
        }
        return (
            <section>
                <div className="map-title-container">
                    <h1 className="map-title">Where you’ll be</h1>
                </div>
                <div className="map-container">
                    <Map
                        containerStyle={style}
                        google={this.props.google}
                        zoom={15}
                        initialCenter={this.state.center}
                        onClick={this.onMapClicked}
                        center={this.state.center}
                    >
                        <Marker
                            position={this.state.center}
                            name={'Current location'}
                            onClick={this.onMarkerClicked}
                        />
                        <Marker
                            key={loc.name}
                            position={loc}
                            name={'Current location'}
                            onClick={this.onMarkerClicked}
                        />



                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={this.state.center}
                            visible={this.state.isInfoWindowOn}
                        >
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                <div>
                    {this.state.loc.address && <h1 className="address-title">{this.state.loc.address}</h1>}
                </div>
                </div>
            </section>
        );
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: ('AIzaSyC4nnRlZ8NjJzwvd5SZMk3ukykZTfqRKNU')
})(_StayMap)
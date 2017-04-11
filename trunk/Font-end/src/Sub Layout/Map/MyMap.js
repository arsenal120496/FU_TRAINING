/**
 * Created by Asus on 4/3/2017.
 */
import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "../../lib";

const GoogleMapConst = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        center={props.defaultCenter}
    >

        {props.markers.map(marker => (
            <Marker
                {...marker}
            />
        ))}
    </GoogleMap>
));

const center = {
    lat: 10.8231,
    lng: 106.6297
}

let markerList = [];

const user = JSON.parse(localStorage.getItem('user'));

const PATH_BASE = 'http://localhost:8080/home/locations';
const PATH_NAME = 'name='
const PARAM_NAME = user.name;
const PATH_EMAIL = 'email=';
const PARAM_EMAIL = user.email;

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            listLoc: [],
            center: {
                lat: 10.8231,
                lng: 106.6297
            }

        };
        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.handleMapLoad = this.handleMapLoad.bind(this);

    }


    handleMapLoad(map) {
        this._mapComponent = map;
        console.log("Map zoom " + map.getZoom());
    }

    setSearchLocation(result) {
        this.setState({
            listLoc: result.locations
        })
    }

    fetchSearchLocation() {
        fetch(`${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}&${PATH_NAME}${PARAM_NAME}`)
            .then(resp => resp.json())
            .then(result => this.setSearchLocation(result));

    }

    componentDidUpdate() {
        const list = this.state.listLoc;
        list.forEach(function (el) {
            const nextMarkers = {
                position: {
                    lat: parseFloat(el.location.latitude),
                    lng: parseFloat(el.location.longitude),
                },
                defaultAnimation: 2,
                key: el.time, // Add a key property for: http://fb.me/react-warning-keys
            };
            center.lat = parseFloat(el.location.latitude);
            center.lng = parseFloat(el.location.longitude)
            if (markerList.length !== list.length) {
                markerList.push(nextMarkers);
            }

        });

        if (markerList.length !== undefined) {
            this.state.center = center;
            this.state.markers = markerList;
        }

        ;
    }

    componentDidMount() {
        this.fetchSearchLocation();
    }

    render() {
        return (
            <div id="GSE" style={{height: `100%`}}>
                <GoogleMapConst
                    containerElement={
                        <div style={{height: `100%`}}/>
                    }
                    mapElement={
                        <div style={{height: `100%`}}/>
                    }
                    defaultCenter={this.state.center}
                    onMapLoad={this.handleMapLoad}
                    markers={this.state.markers}
                />
            </div>
        );
    }
}


export default MyMap;
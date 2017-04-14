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
    Polyline,
} from "../../lib";

const GoogleMapConst = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        center={props.center}
    >

        {props.markers.map(marker => (
            <Marker
                {...marker}
            />
        ))}
        <Polyline path={props.paths}
                  options={{
                      geodesic: true,
                      strokeColor: '#1a95ff',
                      strokeOpacity: 1.0,
                      strokeWeight: 2
                  }}/>
    </GoogleMap>
));

const center = {
    lat: 10.8231,
    lng: 106.6297
}

let markerList = [];
let pathList = [];


let user = JSON.parse(localStorage.getItem('user'));
if (user === null) {
    user = {
        email: "abcd",
        name: "me"
    }
}
const PATH_BASE = 'http://10.88.52.143:8080/home/locations';
const PATH_EMAIL = 'email=';
let PARAM_EMAIL = user.email;


class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            listLoc: [],
            center: {
                lat: 10.8231,
                lng: 106.6297
            },
            paths: [],

        };
        this.setSearchLocation = this.setSearchLocation.bind(this);
        this.fetchSearchLocation = this.fetchSearchLocation.bind(this);
        this.handleMapLoad = this.handleMapLoad.bind(this);

    }


    handleMapLoad(map) {
        this._mapComponent = map;
    }

    setSearchLocation(result) {
        console.log(result);
        this.setState({
            listLoc: result
        })
    }

    fetchSearchLocation() {
        fetch(`${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}`)
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
            const path = {
                lat: parseFloat(el.location.latitude),
                lng: parseFloat(el.location.longitude),
            }
            center.lat = parseFloat(el.location.latitude);
            center.lng = parseFloat(el.location.longitude)
            if (markerList.length !== list.length) {
                markerList.push(nextMarkers);
                pathList.push(path);
            }

        });
        this.state.paths = pathList;
        this.state.center = center;
        this.state.markers = markerList;
    }

    componentDidMount() {
        user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            console.log("null");
            user = {
                email: "abcd",
                name: "me"
            };
        } else {
            console.log("not null");
            PARAM_EMAIL = user.email;
        }
        this.fetchSearchLocation();
    }

    render() {
        console.log("center", this.state.center);
        console.log("markers", this.state.markers);
        return (
            <div id="GSE" style={{height: `100%`}}>
                <GoogleMapConst
                    containerElement={
                        <div style={{height: `100%`}}/>
                    }
                    mapElement={
                        <div style={{height: `100%`}}/>
                    }
                    center={this.state.center}
                    onMapLoad={this.handleMapLoad}
                    markers={this.state.markers}
                    paths={this.state.paths}
                />
            </div>
        );
    }
}


export default MyMap;
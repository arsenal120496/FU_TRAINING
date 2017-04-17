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

import $ from 'jquery';

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
const PATH_BASE = 'http://localhost:8080/home/locations';
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
        this.setState({
            listLoc: result
        })
        //
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
            };
            center.lat = parseFloat(el.location.latitude);
            center.lng = parseFloat(el.location.longitude);
            if (markerList.length !== list.length) {
                if (markerList.indexOf(nextMarkers) < 0) {
                    markerList.push(nextMarkers);
                    pathList.push(path);
                }
            }

        });
        this.setState({
            paths: pathList,
            center: center,
            markers: markerList,
        });
    }

    fetchSearchLocation() {
        // fetch(`${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}`)
        //     .then(resp => resp.json())
        //     .then(result => this.setSearchLocation(result));
        $.ajax({
            url: `${PATH_BASE}?${PATH_EMAIL}${PARAM_EMAIL}`,
            method: 'GET',
            success: function (data) {
                this.setSearchLocation(data)
            }.bind(this),
            error: function (err) {
                console.log('error: ', err);

            }
        });
    }

    componentDidMount() {
        user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            user = {
                email: "abcd",
                name: "me"
            };
        } else {
            PARAM_EMAIL = user.email;
        }
        this.fetchSearchLocation();
        // this.timerID = setInterval(
        //     () => this.fetchSearchLocation(),
        //     1000
        // );
    }

    /*componentWillUnmount() {
     clearInterval(this.timerID);
     }*/

    render() {
        if (this.state.markers == null) {
            return (
                <div>Loading...</div>
            );
        }
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
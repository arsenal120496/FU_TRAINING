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

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.handleMapLoad = this.handleMapLoad.bind(this);

    }

    handleMapLoad(map) {
        this._mapComponent = map;
    }

    render() {
        console.log(this.props);
        return (
            <div id="GSE" style={{height: `100%`}}>
                <GoogleMapConst
                    containerElement={
                        <div style={{height: `100%`}}/>
                    }
                    mapElement={
                        <div style={{height: `100%`}}/>
                    }


                    center={this.props.centerPoint}
                    markers={this.props.markerList}
                    paths={this.props.pathList}
                    onMapLoad={this.handleMapLoad}
                />
            </div>
        );
    }
}


export default MyMap;
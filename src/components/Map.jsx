import React from "react";
import { compose, withProps, withStateHandlers} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = compose(
    withProps({
        
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAu8oUWTfh7XuR6wX8pxhESPm-EdoxVhiI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
        
    }),
            withStateHandlers(() => ({
                isOpen: false,
            }), {
                onToggleOpen: ({ isOpen }) => () => ({
                    isOpen: !isOpen,
                })
            }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={12.35} defaultCenter={{ lat: 33.787326, lng: -84.355612 }}>
        <Marker position={{ lat: 33.787326, lng: -84.355612 }} />
        <Marker position={{ lat: 33.772841, lng: -84.352767 }} />
        <Marker position={{ lat: 33.762570, lng: -84.333190 }} />
  </GoogleMap>  
));

export default Map
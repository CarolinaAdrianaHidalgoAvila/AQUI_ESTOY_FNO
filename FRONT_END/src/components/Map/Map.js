import ReactMapGl, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import { Box } from '@mui/material'

import React from 'react';
import Geocoder from './Geocoder';

const mapTokenApp = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function DragMap(props) {
    const {lat, lng, zoom, onCoordChange } = props;

    return (
        <Box
            sx={{
                height: 400,
                position: 'relative'
            }}
        >
            <ReactMapGl
                mapboxAccessToken={mapTokenApp}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom
                }} 
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={(e) => {
                        console.log("changing on drag!");
                        onCoordChange(e.lngLat.lat, e.lngLat.lng);
                    }} 
                />
                <NavigationControl position='bottom-right' />
                <GeolocateControl
                    position='top-left'
                    trackUserLocation
                    onGeolocate={(e) => {
                        console.log("changing in self location!");
                        onCoordChange(e.coords.latitude, e.coords.longitude);
                    }} 
                />
                <Geocoder mapTokenApp={mapTokenApp} onCoordChange={onCoordChange}/>
            </ReactMapGl>
        </Box>
    );
}

export { DragMap };
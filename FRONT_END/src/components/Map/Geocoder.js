import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function Geocoder(props) {
    const {mapTokenApp, onCoordChange} = props

    const ctrl = new MapboxGeocoder({
        accessToken: mapTokenApp,
        marker: false,
        collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        console.log("changin on result!");
        console.log(coords);
        onCoordChange(coords[1], coords[0]);
    });
    return null;
}

export default Geocoder;
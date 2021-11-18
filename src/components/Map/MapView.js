import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    useMap,
} from 'react-leaflet';
// Custom
import Markers from 'src/components/Map/Markers';
import VenueLocationIcon from 'src/components/Map/VenueLocationIcon';
import 'src/components/Map/MapView.css'
//--------------------
const hereIcon = VenueLocationIcon('here');

function LocationMarker({ showCurrentLocation }) {
    const map = useMap();
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (map && showCurrentLocation) {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            });
        }
    }, [map, showCurrentLocation]);

    return position === null ? null : (
        <Marker position={position} icon={hereIcon}>
            <Popup>現在位置</Popup>
        </Marker>
    );
}

function SetFlyto({ flyto }) {
    const map = useMap();

    useEffect(() => {
        if (map && flyto) {
            map.flyTo(flyto, map.getZoom())
        }
    }, [map, flyto]);

    return null
}

export default function CyclingMap({
    markers,
    polyline,
    showCurrentLocation,
    showNearbyBikes,
}) {
    const [flyto, setflyto] = useState();
    const center = [25.04795444238345, 121.51693473083246]; // 台北車站

    useEffect(() => {
        if (polyline)
            setflyto(polyline[0])
    }, [polyline]);

    return (
        <MapContainer center={center} zoom={15}>
            {flyto && <SetFlyto flyto={flyto} />}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers && <Markers markers={markers} />}
            {polyline && <Polyline pathOptions={{ color: 'red' }} positions={polyline} />}
            {showCurrentLocation && <LocationMarker showCurrentLocation={showCurrentLocation} />}
            {showNearbyBikes && <Markers type={['bike']} />}
        </MapContainer >
    )
}
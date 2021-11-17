import React from 'react';
import 'leaflet/dist/leaflet.css';
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
} from 'react-leaflet';
// Custom
import VenueLocationIcon from 'src/components/Map/VenueLocationIcon';
import 'src/components/Map/MapView.css'
//--------------------

export default function CyclingMap({ markers, polyline }) {
    const center = [25.04795444238345, 121.51693473083246]; // 台北車站

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers && markers.map((item, index) => (
                <Marker key={index} position={item.position} icon={VenueLocationIcon} >
                    {item.name && <Popup>{item.name}</Popup>}
                </Marker>
            ))}
            {polyline && <Polyline pathOptions={{ color: 'red' }} positions={polyline} />}
        </MapContainer >
    )
}
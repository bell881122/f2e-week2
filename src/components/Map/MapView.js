import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  Polyline,
  Polygon,
  Rectangle
} from 'react-leaflet';
// Custom
import data from 'src/assets/data';
import icon from 'src/assets/venue_location_icon.svg'
import 'src/components/Map/MapView.css'
//--------------------
const VenueLocationIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});

const center = [51.505, -0.09]

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }

export default function MapView() {
  const currentLocation = { lat: 52.52437, lng: 13.41053 };
  const zoom = 12;

  return (
    <MapContainer center={currentLocation} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
      <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Polygon pathOptions={purpleOptions} positions={polygon} />
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />

      {data.venues.map((venue, index) => (
        <Marker key={index} position={venue.geometry} icon={VenueLocationIcon} >
          <Popup>
            <div className='poup-text'>{venue.name}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer >
  )
}
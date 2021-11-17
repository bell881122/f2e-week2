import L from 'leaflet';
import icon from 'src/assets/venue_location_icon.svg'

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
export default VenueLocationIcon;
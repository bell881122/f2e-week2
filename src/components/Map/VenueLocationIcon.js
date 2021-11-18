import L from 'leaflet';
import icon from 'src/assets/venue_location_icon.svg'
import hereIcon from 'src/assets/here_location_icon.svg'

const VenueLocationIcon = type => L.icon({
    iconUrl: type === 'here' ? hereIcon : icon,
    iconRetinaUrl: type === 'here' ? hereIcon : icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: 'leaflet-venue-icon'
});
export default VenueLocationIcon;
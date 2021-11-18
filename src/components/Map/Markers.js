import React from 'react';
import axios from 'axios'
import 'leaflet/dist/leaflet.css';
import {
    Marker,
    Popup,
    useMap,
} from 'react-leaflet';
// Custom
import VenueLocationIcon from 'src/components/Map/VenueLocationIcon';
import { getAuthorizationHeader } from 'src/service/_config'
//--------------------
const icon = VenueLocationIcon();

export default function Markers({ markers, type, setbikeStationUid }) {
    const map = useMap();
    const [locations, setlocations] = React.useState(markers);

    React.useEffect(() => {
        if (map && type) {
            const mapCenter = map.getCenter();
            const lat = mapCenter.lat;
            const lng = mapCenter.lng;
            const top = 30;

            switch (type[0]) {
                case 'bike':
                    (async () => await axios({
                        method: 'get',
                        url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$top=${top}&$spatialFilter=nearby(${lat}%2C%20${lng}%2C%201000)&$format=JSON`,
                        headers: getAuthorizationHeader()
                    }))().then(res => {
                        const list = res.data.map(item => {
                            return {
                                uid: item.StationUID,
                                name: item.StationName.Zh_tw,
                                position: [item.StationPosition.PositionLat, item.StationPosition.PositionLon],
                            }
                        });
                        setlocations(list);
                    }).catch(err => console.log(err))
                    break;
                default:
                    break;
            }
        }
    }, [map, type]);

    return locations ? locations.map((item, index) => (
        <Marker key={index} position={item.position} icon={icon}
            eventHandlers={{
                click: e => {
                    setbikeStationUid(item.uid)
                },
            }}
        >
            {item.name && <Popup>{item.name}</Popup>}
        </Marker>
    )) : null
}
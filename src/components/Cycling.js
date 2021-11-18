import React from 'react'
import axios from 'axios'
// MUI
import IconButton from '@mui/material/IconButton';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import CyclingList from 'src/components/CyclingList';
import BikeStationInfo from 'src/components/BikeStationInfo';
import MapView from 'src/components/Map/MapView';
//--------------------
export default function Cycling() {
    const [cyclingList, setcyclingList] = React.useState();
    const [markers, setmarkers] = React.useState();
    const [polyline, setpolyline] = React.useState();
    const [showCurrentLocation, setshowCurrentLocation] = React.useState();
    const [showNearbyBikes, setshowNearbyBikes] = React.useState(false);
    const [bikeStationUid, setbikeStationUid] = React.useState('');

    React.useEffect(() => {
        (async () => await axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Taipei?$top=4&$format=JSON`,
            headers: getAuthorizationHeader()
        }))().then(res => {
            setcyclingList(res.data);
        }).catch(err => console.log(err))
    }, []);

    const handleClick = data => {
        if (data.Geometry) {
            let line = data.Geometry
                .replace(/(MULTILINESTRING\s\(\()|(\)\))/g, '')
                .split(',')
                .map(x => x
                    .split(' ')
                    .map(y => parseFloat(y)).reverse()
                );

            setpolyline(line)
            setmarkers([
                { name: data.RoadSectionStart, position: line[0] },
                { name: data.RoadSectionEnd, position: line[line.length - 1] },
            ]);
        }
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* 自行車道列表 */}
            <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 401 }}>
                {cyclingList && <CyclingList list={cyclingList} handleClick={handleClick} />}
            </div>
            {bikeStationUid &&
                <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 401, width: '50%' }}>
                    <BikeStationInfo bikeStationUid={bikeStationUid} />
                </div>
            }

            {/* button group */}
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 401 }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '50%' }} >
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setshowNearbyBikes([])}>
                        <PedalBikeIcon />
                    </IconButton>
                </div>
                <div style={{ marginTop: '8px' }} />
                <div style={{ backgroundColor: '#fff', borderRadius: '50%' }} >
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setshowCurrentLocation([])}>
                        <GpsFixedIcon />
                    </IconButton>
                </div>
            </div>
            {/* Leaflet 地圖 */}
            <MapView
                markers={markers}
                polyline={polyline}
                showCurrentLocation={showCurrentLocation}
                showNearbyBikes={showNearbyBikes}
                setbikeStationUid={setbikeStationUid}
            />
        </div>
    )
}
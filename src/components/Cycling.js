import React, { useEffect, useState } from 'react'
import axios from 'axios'
// MUI
import IconButton from '@mui/material/IconButton';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import CyclingList from 'src/components/CyclingList';
import MapView from 'src/components/Map/MapView';
//--------------------
export default function Cycling() {
    const [cyclingList, setcyclingList] = useState();
    const [markers, setmarkers] = useState();
    const [polyline, setpolyline] = useState();
    const [showCurrentLocation, setshowCurrentLocation] = useState();
    const [showNearbyBikes, setshowNearbyBikes] = useState(false);

    useEffect(() => {
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
            {/* button group */}
            <div style={{ position: 'absolute', bottom: 24, right: 4, zIndex: 401 }}>
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
            />
        </div>
    )
}
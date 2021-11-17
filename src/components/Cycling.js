import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import CyclingList from 'src/components/CyclingList';
import MapView from 'src/components/Map/MapView';
//--------------------
export default function Cycling() {
    const [cyclingList, setcyclingList] = useState();
    const [markers, setmarkers] = useState();
    const [polyline, setpolyline] = useState();
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
        <>
            <MapView markers={markers} polyline={polyline} />
            {cyclingList && <CyclingList list={cyclingList} handleClick={handleClick} />}
        </>
    )
}
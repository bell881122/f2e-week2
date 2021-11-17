import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import CyclingList from 'src/components/CyclingList';
//--------------------
export default function Cycling() {
    const [cyclingList, setcyclingList] = useState([]);
    useEffect(() => {
        (async () => await axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Taipei?$top=4&$format=JSON`,
            headers: getAuthorizationHeader()
        }))().then(res => {
            console.log(res.data)
            setcyclingList(res.data);
        }).catch(err => console.log(err))
    }, []);
    return (
        <>
            {cyclingList && <CyclingList list={cyclingList} />}
        </>
    )
}
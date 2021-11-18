import React from 'react'
import axios from 'axios'
// MUI
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import { serviceStatusConfig } from 'src/_config'
//--------------------
export default function BikeStationInfo({ bikeStationUid }) {
    const [bikeStationInfo, setbikeStationInfo] = React.useState();

    React.useEffect(() => {
        const pro1 = (async () => await axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taipei?$filter=StationUID%20eq%20%27${bikeStationUid}%27&$top=1&$format=JSON`,
            headers: getAuthorizationHeader()
        }))();

        const pro2 = (async () => await axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/Taipei?$filter=StationUID%20eq%20%27${bikeStationUid}%27&$top=1&$format=JSON`,
            headers: getAuthorizationHeader()
        }))();

        Promise.all([pro1, pro2]).then(response => {
            let info;
            response.forEach(res => { info = { ...info, ...res.data[0] } })
            setbikeStationInfo(info);
        }).catch(err => console.log(err))

    }, [bikeStationUid]);

    const setChip = (type, value) => {
        let data;
        switch (type) {
            case "serviceStatus":
                data = serviceStatusConfig[value];
                break;
            case "serviceType":
                data = { text: `YouBike${value}.0` };
                break;
            default:
                break;
        }
        return <Chip size="small" label={<p>{data.color && <span style={{ color: data.color }}>● </span>}{data.text}</p>} />;
    }

    return bikeStationInfo ?
        <Paper style={{ padding: '16px' }}>
            <h3>{bikeStationInfo.StationName.Zh_tw}</h3>
            <p>{bikeStationInfo.AuthorityID}</p>
            <Divider style={{ margin: '8px auto' }} />
            <div>
                {setChip("serviceStatus", bikeStationInfo.ServiceStatus)}
                <span style={{ marginLeft: '8px' }}></span>
                {setChip("serviceType", bikeStationInfo.ServiceType)}
            </div>
            <div style={{ display: 'flex', marginTop: '8px', textAlign: 'center' }}>
                <p style={{ flexGrow: 1, padding: '8px', backgroundColor: '#dbf0d2', color: 'green', borderRadius: '4px 0 0 4px' }}>
                    可租 <span style={{ fontWeight: 'bold' }}>{bikeStationInfo.AvailableRentBikes}</span>
                </p>
                <p style={{ flexGrow: 1, padding: '8px', backgroundColor: 'green', color: '#fff', borderRadius: '0 4px 4px 0' }}>
                    可還 <span style={{ fontWeight: 'bold' }}>{bikeStationInfo.AvailableReturnBikes}</span>
                </p>
            </div>
            <small>更新時間：{bikeStationInfo.UpdateTime.replace("T", " ").replace(/\+\d*\:\d*/, "")}</small>
        </Paper > : null
}
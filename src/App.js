
import React, { useEffect } from 'react'
import axios from 'axios'
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
import MapView from 'src/components/Map/MapView';
//--------------------
function App() {
  useEffect(() => {
    (async () => await axios({
      method: 'get',
      url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taichung?$top=12&$format=JSON`,
      headers: getAuthorizationHeader()
    }))().then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }, []);
  return (
    <div>
      <MapView />
    </div>
  );
}

export default App;

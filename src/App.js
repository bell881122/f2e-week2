
import React, { useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
// Custom
import { getAuthorizationHeader } from 'src/service/_config'
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
      <Button variant="contained">Contained</Button>
    </div>
  );
}

export default App;

import React from 'react'
// MUI
import CssBaseline from '@mui/material/CssBaseline';
// Custom
import Cycling from 'src/components/Cycling';
import 'src/App.css'
//--------------------
function App() {
  return (
    <div style={{padding:'10px'}}>
      <CssBaseline />
      <Cycling />
    </div>
  );
}

export default App;

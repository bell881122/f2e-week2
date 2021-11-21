// MUI
import CssBaseline from '@mui/material/CssBaseline'
// Custom
import Cycling from 'src/components/Cycling';
import Logo from 'src/asset/logo.png'
import 'src/App.scss'
//--------------------
function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <div className="wrap">
          <h1>
            <span style={{ display: 'none' }}>台灣自行車旅遊網</span>
            <img src={Logo} alt="logo" />
          </h1>
          <p className="menu">找路線</p>
        </div>
      </header>
      <main className="wrap">
        <Cycling />
      </main>
    </>
  );
}

export default App;

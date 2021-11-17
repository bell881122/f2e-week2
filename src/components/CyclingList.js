// MUI
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
//--------------------
export default function CyclingList({ list }) {

    return (list.map((item, index) =>
        <Paper key={index} style={{ padding: '20px',marginTop: index === 0 ? '0' : '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{item.RouteName}</h3>
                <Chip label="雙向" />
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div>
                        <span>起 </span>
                        <span>{item.RoadSectionStart}</span>
                    </div>
                    <div>
                        <span>迄 </span>
                        <span>{item.RoadSectionEnd}</span>
                    </div>
                </div>
                <div>
                    <p>全長</p>
                    <p>{item.CyclingLength}公里</p>
                </div>
            </div>
                {item.Geometry} 
        </Paper>
    ))
}
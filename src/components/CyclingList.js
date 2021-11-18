// MUI
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
//--------------------
export default function CyclingList({ list, handleClick }) {

    return (list.map((item, index) =>
        <Paper key={index} style={{ padding: '16px', marginTop: index === 0 ? '0' : '10px' }}
            onClick={() => handleClick(item)}
        >
            <h3>{item.RouteName}</h3>
            <Divider style={{ margin: '4px auto' }} />
            <div style={{ display: 'flex' }}>
                {(item.RoadSectionStart || item.RoadSectionEnd) &&
                    <div>
                        {item.RoadSectionStart &&
                            <div style={{ margin: '12px auto' }}>
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'red', padding: '4px', border: 'solid 3px red', borderRadius: '50%' }}>起</span>
                                <span style={{ fontSize: '12px', marginLeft: '4px' }}>{item.RoadSectionStart}</span>
                            </div>
                        }
                        {item.RoadSectionStart &&
                            <div>
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'red', padding: '4px', border: 'solid 3px red', borderRadius: '50%' }}>迄</span>
                                <span style={{ fontSize: '12px', marginLeft: '4px' }}>{item.RoadSectionEnd}</span>
                            </div>
                        }
                    </div>
                }
                <div style={{ margin: 'auto 0 auto auto', textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', paddingTop: '16px' }} >全長</p>
                    <p style={{ fontWeight: 'bold', color: 'red' }}>{item.CyclingLength} 公里</p>
                </div>
            </div>
        </Paper >
    ))
}
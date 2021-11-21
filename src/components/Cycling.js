// MUI
import Grid from '@mui/material/Grid'
// Custom
import SearchBar from "src/components/SearchBar"
import CyclingList from "src/components/CyclingList"
//--------------------
export default function Cycling() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SearchBar />
        <div className="mt8" />
        <CyclingList />
      </Grid>
      <Grid item xs={8}>
        Map
      </Grid>
    </Grid>
  );
}
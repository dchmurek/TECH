import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import '../App.css';

interface WeatherProp {
  deviceNumber: number;
  temperature?: number;
  pressure?: number;
  humidity?: number;
}

const Weather: React.FC<WeatherProp> = ({ deviceNumber, temperature, pressure, humidity }) => {
  return (
    <Card sx={{width: '200px', padding:'5px', display: 'flex', flexDirection: 'column', p: 1, backgroundColor: '#2a2a2a', alignItems: 'flex-start'}}>
          <Typography variant="h6" component="div" sx={{ color: 'white'}}>
              Device No. {deviceNumber}
          </Typography>

          <Typography component="div" sx={{
              backgroundColor: 'white',
              height: '5px',
              width: '100%',
              margin: '8px 0'
            }}>
          </Typography>

          <Typography variant="h6" component="div" sx={{ color: 'white'}}>
            <DeviceThermostatIcon /> <span className="value">{temperature ?? 'N/A'}</span> <span>&deg;C</span>
          </Typography>

          <Typography variant="h6" component="div" sx={{ color: 'white'}}>
            <CloudUploadIcon /> <span className="value">{pressure ?? 'N/A'}</span> hPa
          </Typography>

          <Typography variant="h6" component="div" sx={{ color: 'white'}}>
            <OpacityIcon /> <span className="value">{humidity ?? 'N/A'}</span>%
          </Typography>
    </Card>
  );
};

export default Weather;
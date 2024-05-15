import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box } from '@mui/material';

const data = [
  { x: '2024-05-15 12:37:54', pressure: 100.0, humidity: 39, temperature: 17 },
  { x: '2024-05-15 15:43:21', pressure: 103.2, humidity: 34, temperature: 21 },
];

function Charts() {
    return (
        <Box sx={{ width: '60%', minWidth: '560px' }}>
            <LineChart
              sx={{
                [`.${axisClasses.root}`]: {
                    [`.${axisClasses.line}`]: {
                        stroke: 'white'
                    },
                    [`.${axisClasses.tickLabel}`]: {
                        fill: 'white'
                    },
                }
              }}
              height={300}
              dataset={data}
              series={[
                { dataKey: 'pressure', label: 'Pressure x10 (hPa)' },
                { dataKey: 'humidity', label: 'Humidity (%)' },
                { dataKey: 'temperature', label: 'Temperature (°C)' }
              ]}
              xAxis={[
                {
                  scaleType: 'point',
                  data: data.map(item => item.x),
                  labelStyle: { fill: 'white' } 
                },
              ]}
              yAxis={[
                {
                  labelStyle: { fill: 'white' }
                },
              ]}
              margin={{ top: 10, right: 60, bottom: 30, left: 60 }}
              slotProps={{
                legend: {
                  labelStyle: {
                    fill: 'white'
                  }
                }
              }}
            />
        </Box>
    );
}

export default Charts;
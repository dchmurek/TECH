import Navbar from './components/Navbar';
import Weather from './components/Weather';
import Charts from './components/Charts';
import './App.css';

function App() {
  const deviceNumber = 1;
  const temperature = 20;
  const humidity = 100.0;
  const pressure = 50;
  const Cards = 17;

  return (
    <>
      <Navbar />
      <div className="content">
        <Weather deviceNumber={deviceNumber} temperature={temperature} pressure={pressure} humidity={humidity} />
        <Charts />
      </div>

      <div className="weathers" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {Array.from({ length: Cards }, (_, index) => (
          <div className="device" key={index} style={{ margin: '10px' }}>
            <Weather deviceNumber={index} temperature={temperature} pressure={pressure} humidity={humidity} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

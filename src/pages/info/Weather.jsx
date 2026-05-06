import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSyncAlt, FaSearch, FaTint, FaWind, FaEye, FaTachometerAlt, FaExclamationTriangle, FaSun, FaCloudSun, FaCloudRain, FaCloudShowersHeavy, FaCloud, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const getWeatherIcon = (code, large = false) => {
  const props = large ? { style: { fontSize: 72, filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.2))' } } : {};
  if (code === 0) { props.style = { ...props.style, color: '#f59e0b' }; return <FaSun {...props} />; }
  if (code === 1 || code === 2 || code === 3) { props.style = { ...props.style, color: '#6b7280' }; return <FaCloudSun {...props} />; }
  if (code >= 45 && code <= 48) { props.style = { ...props.style, color: '#9ca3af' }; return <FaCloud {...props} />; }
  if (code >= 51 && code <= 67) { props.style = { ...props.style, color: '#3b82f6' }; return <FaCloudRain {...props} />; }
  if (code >= 71 && code <= 82) { props.style = { ...props.style, color: '#1d4ed8' }; return <FaCloudShowersHeavy {...props} />; }
  if (code >= 95) { props.style = { ...props.style, color: '#701a75' }; return <FaCloudShowersHeavy {...props} />; }
  props.style = { ...props.style, color: '#f59e0b' }; return <FaSun {...props} />;
};

const getWeatherDesc = (code) => {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2 || code === 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 67) return 'Rain / Drizzle';
  if (code >= 71 && code <= 82) return 'Snow / Hail';
  if (code >= 95) return 'Thunderstorm';
  return 'Clear Sky';
};

const getDayName = (dateString, index) => {
  if (index === 0) return 'Today';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default function Weather() {
  const [city, setCity] = useState('Waiting for location...');
  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [weatherData, setWeatherData] = useState({
    temp: '--', conditionCode: 0, condition: '--', humidity: '--', wind: '--', pressure: '--', visibility: '--'
  });
  const [forecastData, setForecastData] = useState([]);
  const [currentCoords, setCurrentCoords] = useState({ lat: null, lon: null });

  const fetchWeather = async (lat, lon, locationName) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
      const data = await res.json();
      
      setWeatherData({
        temp: Math.round(data.current.temperature_2m),
        conditionCode: data.current.weather_code,
        condition: getWeatherDesc(data.current.weather_code),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        pressure: Math.round(data.current.surface_pressure),
        visibility: data.current.visibility ? (data.current.visibility / 1000).toFixed(1) : '10', // convert m to km
      });

      const daily = data.daily;
      const forecast = [];
      for(let i=1; i<7; i++) { // Next 6 days
        forecast.push({
          day: getDayName(daily.time[i], i),
          iconCode: daily.weather_code[i],
          temp: `${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°`
        });
      }
      setForecastData(forecast);
      setCity(locationName);
      setCurrentCoords({ lat, lon });
    } catch (error) {
      toast.error('Failed to fetch weather data.');
      console.error(error);
    }
    setLoading(false);
  };

  const getCoordinatesByCity = async (cityName, isInit = false) => {
    setLoading(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const fullName = `${result.name}, ${result.country}`;
        await fetchWeather(result.latitude, result.longitude, fullName);
        if(!isInit) toast.success(`Weather loaded for ${fullName}`);
      } else {
        toast.error('City not found. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Error searching for city.');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      getCoordinatesByCity(searchVal.trim());
      setSearchVal('');
    }
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            const locName = data?.address?.city || data?.address?.county || data?.address?.state || 'Current Location';
            const country = data?.address?.country || '';
            const fullName = country ? `${locName}, ${country}` : locName;
            await fetchWeather(lat, lon, fullName);
            toast.success('Location detected! 📍');
          } catch(err) {
            await fetchWeather(lat, lon, 'Current Location (GPS)');
            toast.success('Location detected! 📍');
          }
        },
        () => {
          toast.error('Location access denied. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  };

  const refreshCurrentWeather = () => {
    if (currentCoords.lat && currentCoords.lon) {
      fetchWeather(currentCoords.lat, currentCoords.lon, city);
      toast.success('Weather data refreshed! 🌤️');
    }
  };

  useEffect(() => {
    handleAutoLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaCloudSun /> Weather Intelligence</span>
          <h2 className="section-title">Live <span className="gradient-text">Weather Dashboard</span></h2>
          <p className="section-subtitle">Real-time weather monitoring for informed farming decisions</p>
        </div>

        {/* Location Search */}
        <div style={{ display: 'flex', gap: 12, maxWidth: 600, margin: '0 auto 32px', flexWrap: 'wrap' }}>
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: 8 }}>
            <div className="search-box" style={{ flex: 1, position: 'relative' }}>
              <FaSearch className="search-icon" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 16, color: 'var(--text-tertiary)' }} />
              <input 
                className="form-control" 
                placeholder="Search any city or zip code..." 
                value={searchVal} 
                onChange={e => setSearchVal(e.target.value)} 
                style={{ paddingLeft: 44, width: '100%' }} 
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 24px' }}>
              {loading ? <FaSpinner className="spin" /> : 'Search'}
            </button>
          </form>
          <button className="btn btn-outline" onClick={handleAutoLocation} disabled={loading} style={{ padding: '0 24px' }}>
            <FaMapMarkerAlt /> Auto Detect
          </button>
        </div>

        {/* Weather Dashboard */}
        <div className="weather-dashboard" style={{ position: 'relative', opacity: loading ? 0.6 : 1, transition: 'var(--transition)' }}>
          <div className="weather-main">
            <div className="weather-location">
              <FaMapMarkerAlt style={{ color: 'var(--green)' }} />
              <span>{city}</span>
              <button className="btn-icon" onClick={refreshCurrentWeather} disabled={loading} title="Refresh">
                <FaSyncAlt className={loading ? "spin" : ""} />
              </button>
            </div>
            <div className="weather-current">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {getWeatherIcon(weatherData.conditionCode, true)}
                <div>
                  <span className="temp-value">{weatherData.temp}</span>
                  <span className="temp-unit">°C</span>
                </div>
              </div>
              <div style={{ marginLeft: 8 }}>
                <div className="weather-condition">{weatherData.condition}</div>
                <div className="weather-meta">
                  <div className="meta-item"><FaTint style={{ color: 'var(--green)' }} /> Humidity: <strong>{weatherData.humidity}%</strong></div>
                  <div className="meta-item"><FaWind style={{ color: 'var(--green)' }} /> Wind: <strong>{weatherData.wind} km/h</strong></div>
                  <div className="meta-item"><FaEye style={{ color: 'var(--green)' }} /> Visibility: <strong>{weatherData.visibility} km</strong></div>
                  <div className="meta-item"><FaTachometerAlt style={{ color: 'var(--green)' }} /> Pressure: <strong>{weatherData.pressure} hPa</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div style={{ padding: '24px 36px 8px' }}>
            <h3 style={{ fontSize: 16, color: 'var(--text-secondary)' }}>6-Day Forecast</h3>
          </div>
          <div className="forecast-cards" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 36px 24px' }}>
            {forecastData.map((f, i) => (
              <div className="forecast-card" key={i} style={{ flex: '1 0 100px', minWidth: 100, textAlign: 'center' }}>
                <div className="forecast-day" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f.day}</div>
                <div className="forecast-icon" style={{ fontSize: 24, margin: '8px 0' }}>{getWeatherIcon(f.iconCode)}</div>
                <div className="forecast-temp" style={{ fontSize: 14, fontWeight: 600 }}>{f.temp}</div>
              </div>
            ))}
          </div>

          {/* Advisory */}
          <div className="weather-advisory" style={{ padding: '0 36px 36px' }}>
            <div style={{ background: 'rgba(234,179,8,0.1)', padding: 16, borderRadius: 'var(--radius-lg)', border: '1px solid rgba(234,179,8,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <FaExclamationTriangle style={{ color: 'var(--gold)' }} />
                <h4 style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 600 }}>Crop Advisory</h4>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                {weatherData.conditionCode >= 50 
                  ? "Rain is expected. Consider delaying irrigation schedules and protect harvested crops."
                  : weatherData.temp > 35 
                  ? "High temperatures detected. Ensure adequate irrigation to prevent heat stress on crops."
                  : "Weather looks stable. Normal irrigation and fertilizer application can proceed as scheduled."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

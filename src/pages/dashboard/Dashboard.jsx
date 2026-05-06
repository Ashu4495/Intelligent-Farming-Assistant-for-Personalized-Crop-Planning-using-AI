import { Link } from 'react-router-dom';
import { FaCloudSun, FaSeedling, FaChartLine, FaBell, FaCamera, FaCommentDots, FaCalendarAlt, FaTint, FaArrowUp, FaArrowDown, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        {/* Welcome */}
        <div className="dashboard-welcome dashboard-wide" style={{ marginBottom: 24 }}>
          <div>
            <h2>👋 Welcome back, Rajesh!</h2>
            <p>📍 Jaipur, Rajasthan • Last login: Today</p>
          </div>
          <div className="quick-actions">
            <Link to="/crops" className="quick-action">🌾 Recommend Crop</Link>
            <Link to="/disease" className="quick-action">📸 Scan Disease</Link>
            <Link to="/market" className="quick-action">📊 Market Prices</Link>
            <Link to="/weather" className="quick-action">🌤️ Weather</Link>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Weather Mini */}
          <div className="mini-card">
            <div className="mini-card-header">
              <h3><FaCloudSun style={{ color: 'var(--gold)' }} /> Weather</h3>
              <Link to="/weather" className="btn btn-ghost btn-sm">View Full →</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>28<span style={{ fontSize: 20, color: 'var(--text-muted)' }}>°C</span></div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Partly Cloudy</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Humidity: 65% • Wind: 12 km/h</div>
              </div>
            </div>
            <div style={{ padding: '12px 16px', background: 'linear-gradient(90deg, rgba(234,179,8,0.06), transparent)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
              <FaExclamationTriangle style={{ color: 'var(--gold)', marginRight: 8 }} />
              Rain expected Thursday — delay irrigation
            </div>
          </div>

          {/* My Crops */}
          <div className="mini-card">
            <div className="mini-card-header">
              <h3><FaSeedling style={{ color: 'var(--green)' }} /> My Crops</h3>
              <Link to="/crops/calendar" className="btn btn-ghost btn-sm">Calendar →</Link>
            </div>
            {[
              { name: '🌾 Wheat', stage: 'Tillering (Day 45)', status: 'On Track', color: 'var(--green)' },
              { name: '🌿 Mustard', stage: 'Crown Root (Day 22)', status: 'Irrigation Due', color: 'var(--gold)' },
            ].map((crop, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{crop.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{crop.stage}</div>
                </div>
                <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 'var(--radius-full)', background: `${crop.color}15`, color: crop.color, fontWeight: 600 }}>{crop.status}</span>
              </div>
            ))}
          </div>

          {/* Price Watchlist */}
          <div className="mini-card">
            <div className="mini-card-header">
              <h3><FaChartLine style={{ color: 'var(--purple)' }} /> Price Watchlist</h3>
              <Link to="/market" className="btn btn-ghost btn-sm">All Prices →</Link>
            </div>
            {[
              { crop: 'Wheat', price: '₹2,275/Q', trend: 'up', change: '+3.2%' },
              { crop: 'Mustard', price: '₹5,100/Q', trend: 'up', change: '+1.5%' },
              { crop: 'Onion', price: '₹1,150/Q', trend: 'down', change: '-4.8%' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontWeight: 600 }}>{item.crop}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>{item.price}</div>
                  <div className={`trend-${item.trend}`} style={{ fontSize: 13 }}>
                    {item.trend === 'up' ? <FaArrowUp style={{ fontSize: 10 }} /> : <FaArrowDown style={{ fontSize: 10 }} />} {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alerts */}
          <div className="mini-card">
            <div className="mini-card-header">
              <h3><FaBell style={{ color: 'var(--orange)' }} /> Recent Alerts</h3>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontWeight: 600 }}>3 new</span>
            </div>
            {[
              { icon: <FaExclamationTriangle style={{ color: 'var(--gold)' }} />, text: 'Heavy rain expected Thursday — delay irrigation', time: '2h ago' },
              { icon: <FaChartLine style={{ color: 'var(--green)' }} />, text: 'Wheat price crossed ₹2,200 in Delhi mandi', time: '5h ago' },
              { icon: <FaCalendarAlt style={{ color: 'var(--blue)' }} />, text: 'Apply urea to Wheat — Day 45 task', time: 'Today' },
            ].map((alert, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ marginTop: 2 }}>{alert.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{alert.text}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent News */}
          <div className="mini-card dashboard-wide">
            <div className="mini-card-header">
              <h3>📰 Latest Agri News</h3>
              <Link to="/news" className="btn btn-ghost btn-sm">All News →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {[
                { title: 'PM-KISAN: 17th installment released for 9.5 crore farmers', source: 'Krishi Jagran', time: '3h ago' },
                { title: 'Wheat MSP for 2026-27 increased to ₹2,400 per quintal', source: 'Economic Times', time: '5h ago' },
                { title: 'India achieves record 330 million tonnes foodgrain production', source: 'PIB', time: '8h ago' },
              ].map((news, i) => (
                <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'var(--transition)' }}>
                  <h4 style={{ fontSize: 15, marginBottom: 8, lineHeight: 1.5 }}>{news.title}</h4>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{news.source} • {news.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

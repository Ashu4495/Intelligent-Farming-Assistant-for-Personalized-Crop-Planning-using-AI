import { useState } from 'react';
import { FaSearch, FaChartLine, FaArrowUp, FaArrowDown, FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';

const marketData = [
  { crop: 'Wheat', market: 'Azadpur, Delhi', state: 'Delhi', min: 2100, max: 2450, modal: 2275, trend: 'up', change: '+3.2%', demand: 'High' },
  { crop: 'Rice (Basmati)', market: 'Karnal, Haryana', state: 'Haryana', min: 3800, max: 4500, modal: 4150, trend: 'up', change: '+1.8%', demand: 'High' },
  { crop: 'Cotton', market: 'Rajkot, Gujarat', state: 'Gujarat', min: 6200, max: 7100, modal: 6650, trend: 'down', change: '-2.1%', demand: 'Medium' },
  { crop: 'Soybean', market: 'Indore, MP', state: 'Madhya Pradesh', min: 4100, max: 4600, modal: 4350, trend: 'up', change: '+0.8%', demand: 'High' },
  { crop: 'Mustard', market: 'Jaipur, Rajasthan', state: 'Rajasthan', min: 4800, max: 5400, modal: 5100, trend: 'up', change: '+1.5%', demand: 'Medium' },
  { crop: 'Chana (Gram)', market: 'Latur, MH', state: 'Maharashtra', min: 4500, max: 5200, modal: 4850, trend: 'up', change: '+2.1%', demand: 'High' },
  { crop: 'Maize', market: 'Davangere, KA', state: 'Karnataka', min: 1800, max: 2200, modal: 1950, trend: 'down', change: '-1.3%', demand: 'Medium' },
  { crop: 'Onion', market: 'Lasalgaon, MH', state: 'Maharashtra', min: 800, max: 1500, modal: 1150, trend: 'down', change: '-4.8%', demand: 'Low' },
  { crop: 'Tomato', market: 'Kolar, KA', state: 'Karnataka', min: 600, max: 1200, modal: 850, trend: 'up', change: '+6.2%', demand: 'High' },
  { crop: 'Sugarcane', market: 'Meerut, UP', state: 'Uttar Pradesh', min: 3500, max: 4000, modal: 3800, trend: 'up', change: '+0.5%', demand: 'Medium' },
];

export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const filtered = marketData.filter(d =>
    d.crop.toLowerCase().includes(search.toLowerCase()) &&
    (!stateFilter || d.state === stateFilter)
  );

  const states = [...new Set(marketData.map(d => d.state))];

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaChartLine /> Market Intelligence</span>
          <h2 className="section-title">Live <span className="gradient-text">Market Prices</span> & Demand</h2>
          <p className="section-subtitle">Track real-time mandi prices and demand trends to maximize your profits</p>
        </div>

        <div className="market-dashboard">
          <div className="market-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input className="form-control" placeholder="Search crop or market..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 48 }} />
            </div>
            <select className="form-control" style={{ width: 200, flex: 'none' }} value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="market-table">
              <thead>
                <tr>
                  <th>Crop</th><th>Market</th><th>Min Price (₹/Q)</th><th>Max Price (₹/Q)</th><th>Modal Price (₹/Q)</th><th>Trend</th><th>Demand</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={i}>
                    <td><strong>{d.crop}</strong></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{d.market}</td>
                    <td>₹{d.min.toLocaleString()}</td>
                    <td>₹{d.max.toLocaleString()}</td>
                    <td><strong>₹{d.modal.toLocaleString()}</strong></td>
                    <td className={`trend-${d.trend}`}>
                      {d.trend === 'up' ? <FaArrowUp style={{ fontSize: 10, marginRight: 4 }} /> : <FaArrowDown style={{ fontSize: 10, marginRight: 4 }} />}
                      {d.change}
                    </td>
                    <td className={`demand-${d.demand.toLowerCase()}`}>{d.demand}</td>
                    <td>
                      <button className="btn-icon" onClick={() => toast.success(`Alert set for ${d.crop}! 🔔`)} title="Set Price Alert"><FaBell /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
              No crops found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

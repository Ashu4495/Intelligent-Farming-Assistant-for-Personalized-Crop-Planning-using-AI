import { useState } from 'react';
import { FaSeedling, FaMountain, FaCalendar, FaCloudRain, FaThermometerHalf, FaMap, FaMagic, FaCheckCircle, FaTint, FaLeaf } from 'react-icons/fa';
import toast from 'react-hot-toast';

const cropDB = {
  alluvial: { kharif: [{n:'Rice',m:'High',w:'High',t:'25-35°C'},{n:'Sugarcane',m:'High',w:'High',t:'20-30°C'},{n:'Maize',m:'Medium',w:'Medium',t:'21-27°C'}], rabi: [{n:'Wheat',m:'High',w:'Medium',t:'20-25°C'},{n:'Mustard',m:'High',w:'Low',t:'15-25°C'},{n:'Potato',m:'Medium',w:'Medium',t:'15-20°C'}], zaid: [{n:'Watermelon',m:'High',w:'Medium',t:'25-35°C'},{n:'Cucumber',m:'High',w:'Medium',t:'20-30°C'}] },
  black: { kharif: [{n:'Cotton',m:'High',w:'Medium',t:'25-35°C'},{n:'Soybean',m:'High',w:'Medium',t:'20-30°C'},{n:'Sorghum',m:'Medium',w:'Low',t:'25-32°C'}], rabi: [{n:'Wheat',m:'High',w:'Medium',t:'20-25°C'},{n:'Chickpea',m:'High',w:'Low',t:'15-25°C'}], zaid: [{n:'Groundnut',m:'High',w:'Medium',t:'25-30°C'},{n:'Sunflower',m:'Medium',w:'Medium',t:'20-25°C'}] },
  red: { kharif: [{n:'Groundnut',m:'High',w:'Medium',t:'25-30°C'},{n:'Millets',m:'High',w:'Low',t:'25-35°C'}], rabi: [{n:'Potato',m:'High',w:'Medium',t:'15-20°C'},{n:'Wheat',m:'Medium',w:'Medium',t:'20-25°C'}], zaid: [{n:'Vegetables',m:'High',w:'Medium',t:'20-30°C'}] },
};

export default function CropRecommendation() {
  const [soil, setSoil] = useState('');
  const [season, setSeason] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!soil || !season) { toast.error('Select soil type and season'); return; }
    const crops = cropDB[soil]?.[season] || [{n:'Rice',m:'Medium',w:'High',t:'25-35°C'},{n:'Wheat',m:'Medium',w:'Medium',t:'20-25°C'}];
    setResults(crops);
    toast.success('Recommendations generated! 🌱');
  };

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaSeedling /> Crop Intelligence</span>
          <h2 className="section-title">Smart <span className="gradient-text">Crop Recommendations</span></h2>
          <p className="section-subtitle">AI-powered suggestions based on your soil, weather, and regional conditions</p>
        </div>

        <div className="grid-2-col">
          {/* Form */}
          <div className="card" style={{ padding: 36 }}>
            <h3 style={{ fontSize: 22, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <FaMagic style={{ color: 'var(--green)' }} /> Enter Your Details
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label"><FaMountain style={{ color: 'var(--green)', fontSize: 12 }} /> Soil Type</label>
                <select className="form-control" value={soil} onChange={e => setSoil(e.target.value)}>
                  <option value="">Select Soil Type</option>
                  <option value="alluvial">Alluvial Soil</option>
                  <option value="black">Black Soil</option>
                  <option value="red">Red Soil</option>
                  <option value="laterite">Laterite Soil</option>
                  <option value="sandy">Sandy Soil</option>
                  <option value="loamy">Loamy Soil</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label"><FaCalendar style={{ color: 'var(--green)', fontSize: 12 }} /> Season</label>
                <select className="form-control" value={season} onChange={e => setSeason(e.target.value)}>
                  <option value="">Select Season</option>
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label"><FaCloudRain style={{ color: 'var(--green)', fontSize: 12 }} /> Avg Rainfall (mm)</label>
                  <input type="number" className="form-control" placeholder="e.g., 800" />
                </div>
                <div className="form-group">
                  <label className="form-label"><FaThermometerHalf style={{ color: 'var(--green)', fontSize: 12 }} /> Avg Temp (°C)</label>
                  <input type="number" className="form-control" placeholder="e.g., 28" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label"><FaMap style={{ color: 'var(--green)', fontSize: 12 }} /> State</label>
                <select className="form-control">
                  <option value="">Select State</option>
                  {['Punjab','Haryana','Uttar Pradesh','Madhya Pradesh','Maharashtra','Karnataka','Rajasthan','Gujarat','Bihar'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block"><FaMagic /> Get Recommendations</button>
            </form>
          </div>

          {/* Results */}
          <div className="card" style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: results ? 'flex-start' : 'center', alignItems: results ? 'stretch' : 'center', minHeight: 500 }}>
            {!results ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <FaLeaf style={{ fontSize: 72, opacity: 0.15, color: 'var(--green)', marginBottom: 20 }} />
                <h3 style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Your Crop Recommendations</h3>
                <p style={{ fontSize: 14 }}>Fill in your details to get AI-powered suggestions</p>
              </div>
            ) : (
              <>
                <h3 style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FaCheckCircle style={{ color: 'var(--green)' }} /> Recommended Crops
                </h3>
                {results.map((crop, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 22, marginBottom: 14, transition: 'var(--transition)', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: 18, fontWeight: 700 }}>🌾 {crop.n}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 'var(--radius-full)', background: crop.m === 'High' ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)', color: crop.m === 'High' ? 'var(--green)' : 'var(--gold)', border: `1px solid ${crop.m === 'High' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)'}` }}>
                        {crop.m} Match
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      <span><FaCalendar style={{ marginRight: 4, color: 'var(--green)' }} /> {season}</span>
                      <span><FaTint style={{ marginRight: 4, color: 'var(--green)' }} /> Water: {crop.w}</span>
                      <span><FaThermometerHalf style={{ marginRight: 4, color: 'var(--green)' }} /> {crop.t}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

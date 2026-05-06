import { useState } from 'react';
import { FaExternalLinkAlt, FaHandHoldingUsd, FaFilter, FaCheckCircle, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaShieldAlt, FaSeedling, FaSolarPanel, FaTractor } from 'react-icons/fa';

const schemes = [
  { name: 'PM-KISAN', full: 'Pradhan Mantri Kisan Samman Nidhi', cat: 'financial', icon: <FaMoneyBillWave />, desc: 'Direct income support of ₹6,000/year in 3 installments to farmer families.', benefits: ['₹6,000/year', 'Direct bank transfer'], eligibility: ['Small & marginal farmers', 'Valid Aadhaar'], link: 'https://pmkisan.gov.in/', status: 'active', budget: '₹75,000 Cr' },
  { name: 'PM Fasal Bima', full: 'Pradhan Mantri Fasal Bima Yojana', cat: 'insurance', icon: <FaShieldAlt />, desc: 'Comprehensive crop insurance at low premiums: 2% for Kharif, 1.5% for Rabi.', benefits: ['Low premium', 'Full loss coverage'], eligibility: ['All farmers', 'Enrolled crops'], link: 'https://pmfby.gov.in/', status: 'active', budget: '₹16,000 Cr' },
  { name: 'KCC', full: 'Kisan Credit Card', cat: 'financial', icon: <FaMoneyBillWave />, desc: 'Farm credit at 4% interest for crop production, dairy, and fisheries.', benefits: ['Credit at 4%', 'Flexible usage'], eligibility: ['Landowner farmers', 'Tenant farmers'], link: 'https://pmkisan.gov.in/', status: 'active', budget: '—' },
  { name: 'PM-KUSUM', full: 'Kusum Solar Pump Scheme', cat: 'subsidy', icon: <FaSolarPanel />, desc: 'Up to 90% subsidy on solar pumps for irrigation, reducing diesel dependency.', benefits: ['90% subsidy', 'Solar powered'], eligibility: ['Small farmers', 'Irrigation need'], link: 'https://mnre.gov.in/', status: 'active', budget: '₹34,422 Cr' },
  { name: 'e-NAM', full: 'Electronic National Agriculture Market', cat: 'market', icon: <FaTractor />, desc: 'Online trading platform for agricultural commodities, bringing transparency.', benefits: ['Transparent pricing', 'Better reach'], eligibility: ['All farmers'], link: 'https://enam.gov.in/', status: 'active', budget: '—' },
  { name: 'Soil Health Card', full: 'Soil Health Card Scheme', cat: 'subsidy', icon: <FaSeedling />, desc: 'Free soil testing and health cards with crop-wise fertilizer recommendations.', benefits: ['Free testing', 'NPK report'], eligibility: ['All farmers'], link: 'https://soilhealth.dac.gov.in/', status: 'active', budget: '₹568 Cr' },
  { name: 'RKVY', full: 'Rashtriya Krishi Vikas Yojana', cat: 'subsidy', icon: <FaMoneyBillWave />, desc: 'State-level agricultural development grants for infrastructure and innovation.', benefits: ['Infra grants', 'Agri innovation'], eligibility: ['State-proposed'], link: 'https://rkvy.nic.in/', status: 'active', budget: '₹3,000 Cr' },
  { name: 'AIF', full: 'Agriculture Infrastructure Fund', cat: 'financial', icon: <FaTractor />, desc: '₹1 lakh crore financing for post-harvest management infrastructure and community assets.', benefits: ['Interest subvention', 'Long tenure'], eligibility: ['FPOs', 'Agri-entrepreneurs'], link: 'https://agriinfra.dac.gov.in/', status: 'active', budget: '₹1,00,000 Cr' },
];

const categories = [
  { key: 'all', label: 'All Schemes' },
  { key: 'financial', label: '💰 Financial' },
  { key: 'insurance', label: '🛡️ Insurance' },
  { key: 'subsidy', label: '🌿 Subsidy' },
  { key: 'market', label: '📊 Market' },
];

export default function Schemes() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? schemes : schemes.filter(s => s.cat === filter);

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaHandHoldingUsd /> Government Schemes</span>
          <h2 className="section-title">Government <span className="gradient-text">Schemes & Subsidies</span></h2>
          <p className="section-subtitle">Latest agricultural subsidies, insurance, and financial aid with direct apply links</p>
        </div>

        <div className="schemes-filter">
          {categories.map(c => (
            <button key={c.key} className={`filter-btn ${filter === c.key ? 'active' : ''}`} onClick={() => setFilter(c.key)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="schemes-grid">
          {filtered.map((s, i) => (
            <div key={i} className="card scheme-card">
              <div className="scheme-header">
                <div className="scheme-icon">{s.icon}</div>
                <div>
                  <h3 style={{ fontSize: 18 }}>{s.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{s.full}</p>
                </div>
                <span className="status-badge" style={{ marginLeft: 'auto' }}>Active</span>
              </div>
              <div className="scheme-body">
                <p>{s.desc}</p>
                <div className="scheme-details">
                  {s.benefits.map((b, j) => (
                    <span key={j} className="scheme-detail"><FaCheckCircle style={{ color: 'var(--green)' }} /> {b}</span>
                  ))}
                  {s.budget !== '—' && <span className="scheme-detail"><FaMoneyBillWave style={{ color: 'var(--gold)' }} /> Budget: {s.budget}</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  <strong>Eligibility:</strong> {s.eligibility.join(' • ')}
                </div>
              </div>
              <div className="scheme-footer">
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  Apply Now <FaExternalLinkAlt style={{ fontSize: 11 }} />
                </a>
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

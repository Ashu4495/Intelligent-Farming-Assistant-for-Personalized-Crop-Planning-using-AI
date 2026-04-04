import { FaTint, FaCloudSun, FaExclamationTriangle } from 'react-icons/fa';

export default function WaterManagement() {
  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaTint /> Smart Irrigation</span>
          <h2 className="section-title">Water <span className="gradient-text">Management</span></h2>
          <p className="section-subtitle">Calculate water requirements based on weather and soil</p>
        </div>
        <div className="dashboard-grid">
           <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48 }}>
              <FaTint style={{ fontSize: 64, color: 'var(--blue)', opacity: 0.2, marginBottom: 20 }} />
              <h3>Irrigation Scheduler</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Select a crop and soil type to calculate the exact water needed today.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

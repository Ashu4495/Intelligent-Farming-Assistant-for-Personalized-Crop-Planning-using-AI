import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaLeaf, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function CropCalendar() {
  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaCalendarAlt /> Smart Calendar</span>
          <h2 className="section-title">Your <span className="gradient-text">Crop Calendar</span></h2>
          <p className="section-subtitle">Track the growth stages and upcoming tasks for your crops</p>
        </div>
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <FaCalendarAlt style={{ fontSize: 64, color: 'var(--green)', opacity: 0.2, marginBottom: 20 }} />
          <h3>No Crops Tracked Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Add crops from the recommendations page to start tracking their growth stages.</p>
          <Link to="/crops" className="btn btn-primary">Discover Crops</Link>
        </div>
      </div>
    </div>
  );
}

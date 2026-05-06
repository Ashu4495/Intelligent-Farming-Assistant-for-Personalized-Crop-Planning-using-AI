import { useParams, Link } from 'react-router-dom';
import { FaLeaf, FaArrowLeft } from 'react-icons/fa';

export default function CropGrowthAssistant() {
  const { crop } = useParams();

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
         <Link to="/crops" className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}><FaArrowLeft /> Back</Link>
        <div className="section-header">
          <span className="section-badge"><FaLeaf /> Growth Assistant</span>
          <h2 className="section-title"><span className="gradient-text">{crop || 'Crop'}</span> Guide</h2>
          <p className="section-subtitle">Step-by-step growing manual</p>
        </div>
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <FaLeaf style={{ fontSize: 64, color: 'var(--green)', opacity: 0.2, marginBottom: 20 }} />
          <h3>Detailed guide coming soon</h3>
          <p style={{ color: 'var(--text-secondary)' }}>We are currently updating our database with detailed growth stages for {crop || 'this crop'}.</p>
        </div>
      </div>
    </div>
  );
}

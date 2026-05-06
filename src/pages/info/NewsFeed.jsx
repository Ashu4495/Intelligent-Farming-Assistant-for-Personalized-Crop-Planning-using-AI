import { FaNewspaper } from 'react-icons/fa';

export default function NewsFeed() {
  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaNewspaper /> Agri News</span>
          <h2 className="section-title">Latest <span className="gradient-text">Agriculture News</span></h2>
          <p className="section-subtitle">Stay updated with farming policies, tech, and weather news</p>
        </div>
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <FaNewspaper style={{ fontSize: 64, color: 'var(--blue)', opacity: 0.2, marginBottom: 20 }} />
          <h3>Loading News Feeds...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Connecting to RSS feeds for the latest agriculture updates.</p>
        </div>
      </div>
    </div>
  );
}

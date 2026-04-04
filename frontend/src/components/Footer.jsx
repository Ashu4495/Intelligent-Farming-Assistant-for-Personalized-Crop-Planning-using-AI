import { Link } from 'react-router-dom';
import { FaSeedling, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaSeedling style={{ color: 'var(--green)' }} />
              Agri<span style={{ color: 'var(--green)' }}>Smart</span>
            </Link>
            <p>Empowering farmers with technology for a sustainable and profitable future in agriculture.</p>
            <div className="social-links">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, i) => (
                <a href="#" className="social-link" key={i}><Icon /></a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/weather', label: 'Weather' },
                { to: '/crops', label: 'Crop Recommendations' },
                { to: '/disease', label: 'Disease Detection' },
                { to: '/market', label: 'Market Prices' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to}><FaChevronRight size={10} /> {link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              {[
                { to: '/schemes', label: 'Govt Schemes' },
                { to: '/news', label: 'Agri News' },
                { to: '/crops/calendar', label: 'Crop Calendar' },
                { to: '/water', label: 'Water Management' },
                { to: '#', label: 'Crop Guides' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to}><FaChevronRight size={10} /> {link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                📧 support@agrismart.in
              </li>
              <li style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                📞 1800-XXX-XXXX
              </li>
              <li style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                📍 New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AgriSmart. All rights reserved. Built with ❤️ for Indian Farmers.</p>
        </div>
      </div>
    </footer>
  );
}

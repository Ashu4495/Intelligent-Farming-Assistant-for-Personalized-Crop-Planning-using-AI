import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSeedling, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext, LangContext } from '../App';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);
  const { t } = useTranslation();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: '/weather', label: t('nav.weather') },
    { path: '/crops', label: t('nav.crops') },
    { path: '/disease', label: t('nav.disease') },
    { path: '/market', label: t('nav.market') },
    { path: '/schemes', label: t('nav.schemes') },
    { path: '/news', label: t('nav.news') },
  ];

  return (
    <nav className={`navbar ${scrolled || !isLanding ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <FaSeedling className="nav-logo-icon" />
          <span>Agri<span className="nav-logo-highlight">Smart</span></span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          
          {/* Mobile Actions Overlay */}
          <li className="mobile-only-actions">
            <select 
              className="lang-toggle" 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              title="Select Language"
              style={{ width: '100%', cursor: 'pointer', appearance: 'auto' }}
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="mr">मराठी (MR)</option>
              <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              <option value="gu">ગુજરાતી (GU)</option>
              <option value="ta">தமிழ் (TA)</option>
              <option value="te">తెలుగు (TE)</option>
            </select>
            
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme" style={{ alignSelf: 'flex-start' }}>
              <div className="theme-toggle-knob">
                {theme === 'dark' ? <FaMoon size={8} /> : <FaSun size={8} />}
              </div>
            </button>
            
            {isLanding && (
              <>
                <Link to="/login" className="btn btn-sm btn-outline">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  {t('nav.getStarted')}
                </Link>
              </>
            )}
          </li>
        </ul>

        <div className="nav-actions">
          <div className="desktop-actions">
            <select 
              className="lang-toggle" 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              title="Select Language"
              style={{ paddingRight: '28px', cursor: 'pointer', appearance: 'auto' }}
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="mr">मराठी (MR)</option>
              <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              <option value="gu">ગુજરાતી (GU)</option>
              <option value="ta">தமிழ் (TA)</option>
              <option value="te">తెలుగు (TE)</option>
            </select>

            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              <div className="theme-toggle-knob">
                {theme === 'dark' ? <FaMoon size={8} /> : <FaSun size={8} />}
              </div>
            </button>

            <Link to="/login" className="btn btn-sm btn-outline" style={{ display: isLanding ? '' : 'none' }}>
              {t('nav.login')}
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary" style={{ display: isLanding ? '' : 'none' }}>
              {t('nav.getStarted')}
            </Link>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}

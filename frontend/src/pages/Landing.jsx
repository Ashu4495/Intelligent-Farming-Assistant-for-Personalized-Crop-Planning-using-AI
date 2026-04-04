import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRocket, FaCompass, FaPlayCircle, FaCloudSun, FaSeedling, FaHandHoldingUsd, FaChartLine, FaRobot, FaBug, FaFlask, FaCalendarAlt, FaTint, FaArrowRight, FaShieldAlt, FaCamera, FaMoon, FaSun } from 'react-icons/fa';

const features = [
  { icon: <FaCloudSun />, titleKey: 'Weather Intelligence', titleKeyHi: 'मौसम जानकारी', desc: 'Real-time weather data with 7-day forecasts and crop-specific advisories.', link: '/weather', accent: '#22c55e' },
  { icon: <FaSeedling />, titleKey: 'Crop Recommendations', titleKeyHi: 'फसल सिफारिश', desc: 'AI-powered crop suggestions based on soil, weather, and regional conditions.', link: '/crops', accent: '#0ea5e9' },
  { icon: <FaCamera />, titleKey: 'Disease Detection', titleKeyHi: 'रोग पहचान', desc: 'Upload a leaf photo and get instant AI diagnosis with treatment plans.', link: '/disease', accent: '#f43f5e' },
  { icon: <FaHandHoldingUsd />, titleKey: 'Government Schemes', titleKeyHi: 'सरकारी योजनाएं', desc: 'Latest subsidies, insurance and financial aid programs with direct apply links.', link: '/schemes', accent: '#eab308' },
  { icon: <FaChartLine />, titleKey: 'Market Prices', titleKeyHi: 'मंडी भाव', desc: 'Live mandi prices, price trends and demand analysis for better selling.', link: '/market', accent: '#8b5cf6' },
  { icon: <FaRobot />, titleKey: 'AI Chatbot', titleKeyHi: 'AI चैटबॉट', desc: '24/7 intelligent farming assistant for crops, pests, fertilizers and more.', link: '#', accent: '#06b6d4' },
  { icon: <FaTint />, titleKey: 'Water Management', titleKeyHi: 'जल प्रबंधन', desc: 'Smart irrigation scheduling and water requirement calculator.', link: '/water', accent: '#ec4899' },
  { icon: <FaCalendarAlt />, titleKey: 'Crop Calendar', titleKeyHi: 'फसल कैलेंडर', desc: 'Personalized sowing, irrigation and harvest schedules for your crops.', link: '/crops/calendar', accent: '#14b8a6' },
];

const stats = [
  { count: 50, suffix: '+', labelKey: 'Crop Types', labelKeyHi: 'फसल प्रकार' },
  { count: 100, suffix: '+', labelKey: 'Govt Schemes', labelKeyHi: 'सरकारी योजनाएं' },
  { count: 500, suffix: '+', labelKey: 'Market Prices', labelKeyHi: 'मंडी भाव' },
  { count: 10000, suffix: '+', labelKey: 'Farmers Helped', labelKeyHi: 'किसानों की मदद' },
];

function AnimatedCounter({ target }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let current = 0;
    const step = target / 120;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
      else el.textContent = Math.floor(current).toLocaleString();
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span ref={ref} className="stat-number">0</span>;
}

export default function Landing() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge animate-on-scroll">
            <FaRocket /> <span>{t('landing.badge')}</span>
          </div>
          <h1 className="hero-title animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            {t('landing.title1')}<br />
            <span className="gradient-text">{t('landing.titleGradient')}</span><br />
            {t('landing.title2')}
          </h1>
          <p className="hero-subtitle animate-on-scroll" data-delay="200">
            {t('landing.subtitle')}
          </p>
          <div className="hero-buttons animate-on-scroll" data-delay="300">
            <Link to="/register" className="btn btn-primary btn-lg">
              <FaCompass /> {t('landing.btnStarted')}
            </Link>
            <Link to="/crops" className="btn btn-outline btn-lg">
              <FaPlayCircle /> {t('landing.btnExplore')}
            </Link>
          </div>
          <div className="hero-stats animate-on-scroll" data-delay="400">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <AnimatedCounter target={s.count} />
                <span className="stat-suffix">{s.suffix}</span>
                <div className="stat-label">{en ? s.labelKey : s.labelKeyHi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-badge">⭐ {t('landing.featuresTitle')}</span>
            <h2 className="section-title">
              {t('landing.featuresHeading1')} <span className="gradient-text">{t('landing.featuresHeadingGradient')}</span>
            </h2>
            <p className="section-subtitle">{t('landing.featuresDesc')}</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <Link to={f.link} key={i} className="card feature-card animate-on-scroll" data-delay={i * 100} style={{ '--card-accent': f.accent }}>
                <div className="feature-icon" style={{ color: f.accent }}>{f.icon}</div>
                <h3>{en ? f.titleKey : f.titleKeyHi}</h3>
                <p>{f.desc}</p>
                <span className="feature-link">{en ? 'Learn More' : 'और जानें'} <FaArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(34,197,94,0.02), transparent)' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-badge">🚀 {t('landing.howItWorks')}</span>
            <h2 className="section-title">{t('landing.stepsHeading1')} <span className="gradient-text">{t('landing.stepsHeading2')}</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              { step: '01', icon: '📋', title: t('landing.step1Title'), desc: t('landing.step1Desc') },
              { step: '02', icon: '🤖', title: t('landing.step2Title'), desc: t('landing.step2Desc') },
              { step: '03', icon: '🌾', title: t('landing.step3Title'), desc: t('landing.step3Desc') },
              { step: '04', icon: '📈', title: t('landing.step4Title'), desc: t('landing.step4Desc') },
            ].map((s, i) => (
              <div key={i} className="card animate-on-scroll" data-delay={i * 150} style={{ textAlign: 'center', padding: '40px 28px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700, marginBottom: 8, letterSpacing: 2 }}>STEP {s.step}</div>
                <h3 style={{ marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="animate-on-scroll">
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 20 }}>
              {t('landing.ctaHeading1')} <span className="gradient-text">{t('landing.ctaHeading2')}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', fontSize: 16 }}>
              {t('landing.ctaDesc')}
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary btn-lg">🌱 {t('landing.ctaBtn1')}</Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg">{t('landing.ctaBtn2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

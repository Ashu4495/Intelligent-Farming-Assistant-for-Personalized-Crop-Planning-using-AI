import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling, FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', state: '' });
  const [showPass, setShowPass] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill required fields'); return; }
    toast.success(`Welcome, ${form.name}! Account created 🌱`);
  };

  const states = ['Punjab','Haryana','Uttar Pradesh','Madhya Pradesh','Maharashtra','Karnataka','Andhra Pradesh','Tamil Nadu','West Bengal','Rajasthan','Gujarat','Bihar','Odisha','Kerala','Jharkhand','Chhattisgarh','Assam','Telangana'];

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: 520 }}>
        <div className="auth-card">
          <div className="auth-logo">
            <h1><FaSeedling style={{ color: 'var(--green)' }} /> Agri<span style={{ color: 'var(--green)' }}>Smart</span></h1>
            <p>Join the smart farming revolution 🚀</p>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">It's free and takes less than a minute</p>

          <div className="social-auth">
            <button className="social-btn" style={{ flex: 1 }}><FaGoogle /> Continue with Google</button>
          </div>
          <div className="auth-divider"><span>or register with email</span></div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label"><FaUser style={{ color: 'var(--green)', fontSize: 12 }} /> Full Name *</label>
              <input className="form-control" placeholder="Enter your full name" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><FaEnvelope style={{ color: 'var(--green)', fontSize: 12 }} /> Email *</label>
                <input type="email" className="form-control" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label"><FaPhone style={{ color: 'var(--green)', fontSize: 12 }} /> Phone</label>
                <input type="tel" className="form-control" placeholder="Phone number" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label"><FaMapMarkerAlt style={{ color: 'var(--green)', fontSize: 12 }} /> State</label>
              <select className="form-control" value={form.state} onChange={e => update('state', e.target.value)}>
                <option value="">Select your state</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label"><FaLock style={{ color: 'var(--green)', fontSize: 12 }} /> Password *</label>
              <input type={showPass ? 'text' : 'password'} className="form-control" placeholder="Create a password" value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingRight: 44 }} />
              <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 8 }}>Create Account 🌱</button>
          </form>
          <p className="auth-footer" style={{ marginTop: 24, fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

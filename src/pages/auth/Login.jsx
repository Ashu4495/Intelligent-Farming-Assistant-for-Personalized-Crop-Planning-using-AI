import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    toast.success('Login successful! Redirecting...');
  };

  return (
    <div className="auth-page">
      <div className="aurora-bg" />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <h1><FaSeedling style={{ color: 'var(--green)' }} /> Agri<span style={{ color: 'var(--green)' }}>Smart</span></h1>
            <p>Welcome back, farmer! 🌾</p>
          </div>
          <h2 className="auth-title">Sign In</h2>
          <p className="auth-subtitle">Access your personalized farm dashboard</p>

          <div className="social-auth">
            <button className="social-btn"><FaGoogle /> Google</button>
            <button className="social-btn"><FaPhone /> Phone</button>
          </div>
          <div className="auth-divider"><span>or continue with email</span></div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label"><FaEnvelope style={{ color: 'var(--green)', fontSize: 12 }} /> Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label"><FaLock style={{ color: 'var(--green)', fontSize: 12 }} /> Password</label>
              <input type={showPass ? 'text' : 'password'} className="form-control" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
              <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <Link to="#" style={{ fontSize: 13, color: 'var(--green)' }}>Forgot password?</Link>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
          </form>
          <p className="auth-footer" style={{ marginTop: 24, fontSize: 14, color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

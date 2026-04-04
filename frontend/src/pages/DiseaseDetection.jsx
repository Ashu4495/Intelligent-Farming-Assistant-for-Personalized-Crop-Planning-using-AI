import { useState, useRef } from 'react';
import { FaCamera, FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle, FaSeedling } from 'react-icons/fa';
import toast from 'react-hot-toast';

const mockDiseases = {
  healthy: { disease: 'Healthy Leaf', confidence: 98.5, isHealthy: true, plant: 'Tomato', treatment: [] },
  blight: { disease: 'Late Blight', confidence: 94.2, isHealthy: false, plant: 'Tomato', severity: 'High', cause: 'Phytophthora infestans fungus', treatment: ['Apply Mancozeb or Chlorothalonil fungicide', 'Remove and destroy infected leaves immediately', 'Improve air circulation between plants', 'Avoid overhead watering — use drip irrigation'] },
  rust: { disease: 'Yellow Rust', confidence: 91.7, isHealthy: false, plant: 'Wheat', severity: 'Medium', cause: 'Puccinia striiformis fungus', treatment: ['Spray Propiconazole 25% EC @ 0.1%', 'Apply Tebuconazole if severe', 'Use resistant varieties like HD-2967', 'Monitor crop regularly during tillering stage'] },
};

export default function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const analyze = () => {
    if (!image) { toast.error('Please upload an image first'); return; }
    setLoading(true);
    setTimeout(() => {
      const diseases = Object.values(mockDiseases);
      const res = diseases[Math.floor(Math.random() * diseases.length)];
      setResult(res);
      setLoading(false);
      toast.success(res.isHealthy ? 'Your plant looks healthy! 🌿' : `Disease detected: ${res.disease}`);
    }, 2000);
  };

  return (
    <div className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><FaCamera /> Disease Detection</span>
          <h2 className="section-title">AI <span className="gradient-text">Plant Disease Detector</span></h2>
          <p className="section-subtitle">Upload a photo of your crop leaf and get instant AI-powered diagnosis with treatment</p>
        </div>

        <div className="grid-2-col" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Upload */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: 28, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>📸 Upload Crop Image</h3>
            </div>
            <div style={{ padding: 28 }}>
              {preview ? (
                <div style={{ textAlign: 'center' }}>
                  <img src={preview} alt="Plant" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 'var(--radius-sm)', marginBottom: 20 }} />
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={analyze} disabled={loading}>
                      {loading ? '🔬 Analyzing...' : '🔍 Analyze Disease'}
                    </button>
                    <button className="btn btn-outline" onClick={() => { setPreview(null); setImage(null); setResult(null); }}>
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-zone" onClick={() => fileRef.current.click()}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragging'); }}
                  onDragLeave={e => e.currentTarget.classList.remove('dragging')}
                  onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('dragging'); handleFile(e.dataTransfer.files[0]); }}>
                  <FaCloudUploadAlt className="upload-icon" />
                  <h3>Drop your image here</h3>
                  <p>or click to browse • Supports JPG, PNG, WEBP</p>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} />
                </div>
              )}
              <button className="btn btn-outline btn-block" style={{ marginTop: 16 }} onClick={() => { setPreview('https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_late_blight.JPG/220px-Tomato_late_blight.JPG'); setImage({}); setResult(null); }}>
                📷 Use Demo Image
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 28, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>🔬 Analysis Result</h3>
            </div>
            <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: result ? 'flex-start' : 'center', alignItems: result ? 'stretch' : 'center' }}>
              {!result ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <FaSeedling style={{ fontSize: 64, opacity: 0.15, color: 'var(--green)', marginBottom: 16 }} />
                  <h3 style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Awaiting Analysis</h3>
                  <p style={{ fontSize: 14 }}>Upload and analyze an image to see results</p>
                </div>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 64, marginBottom: 8 }}>{result.isHealthy ? '✅' : '⚠️'}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>{result.plant}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)', color: result.isHealthy ? 'var(--green)' : 'var(--red)' }}>{result.disease}</div>
                    <div style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 8 }}>Confidence: <strong style={{ color: 'var(--green)' }}>{result.confidence}%</strong></div>
                    {result.severity && <span style={{ display: 'inline-block', marginTop: 12, padding: '4px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: 13, fontWeight: 600 }}>Severity: {result.severity}</span>}
                  </div>
                  {result.cause && <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', marginBottom: 16, fontSize: 14, color: 'var(--text-secondary)' }}><strong>Cause:</strong> {result.cause}</div>}
                  {result.treatment.length > 0 && (
                    <div>
                      <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>💊 Treatment</h4>
                      {result.treatment.map((t, i) => (
                        <div key={i} className="treatment-item"><FaCheckCircle style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} /> {t}</div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

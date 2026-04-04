import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Fireflies from './components/Fireflies';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketPrices from './pages/MarketPrices';
import Schemes from './pages/Schemes';
import CropCalendar from './pages/CropCalendar';
import CropGrowthAssistant from './pages/CropGrowthAssistant';
import WaterManagement from './pages/WaterManagement';
import NewsFeed from './pages/NewsFeed';
import './index.css';

export const ThemeContext = createContext();
export const LangContext = createContext();

export default function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Router>
          <div className="page-wrapper">
            <div className="aurora-bg" />
            <Fireflies />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/crops" element={<CropRecommendation />} />
                <Route path="/crops/calendar" element={<CropCalendar />} />
                <Route path="/crops/guide/:crop" element={<CropGrowthAssistant />} />
                <Route path="/disease" element={<DiseaseDetection />} />
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/water" element={<WaterManagement />} />
                <Route path="/news" element={<NewsFeed />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: 'var(--bg-card-solid)', color: 'var(--text-primary)', border: '1px solid var(--border)' },
              success: { iconTheme: { primary: '#22c55e', secondary: 'white' } },
            }}
          />
        </Router>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

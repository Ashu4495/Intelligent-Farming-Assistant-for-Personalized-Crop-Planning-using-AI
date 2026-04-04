import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import pa from './locales/pa.json';
import gu from './locales/gu.json';
import ta from './locales/ta.json';
import te from './locales/te.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  pa: { translation: pa },
  gu: { translation: gu },
  ta: { translation: ta },
  te: { translation: te },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en', // Default to value in localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;

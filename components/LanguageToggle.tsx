import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isEnglish ? '日本語に切り替える' : 'Switch to English'}
      className={`inline-flex items-center justify-center px-3 py-2 text-xs font-mono tracking-widest rounded-md border border-emerald-700/50 bg-emerald-950/60 text-emerald-300 hover:text-emerald-200 hover:border-emerald-500/70 hover:bg-emerald-900/60 transition-all duration-300 ${className}`}
    >
      {isEnglish ? 'JP' : 'EN'}
    </button>
  );
};

export default LanguageToggle;

import { useState } from 'react';

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'EN' | 'PL'>('EN'); 

  const toggleLanguage = () => {
    
    setLanguage(prevLanguage => (prevLanguage === 'EN' ? 'PL' : 'EN'));

    
  };

  return (
    <button 
      onClick={toggleLanguage} 
      style={{ 
        backgroundColor: 'transparent' , 
        border: 'none', 
        padding: '10px', 
        }}
    >
      {language === 'EN' ? 'EN / PL' : 'PL / EN'}
    </button>
  );
};

export default LanguageToggle;

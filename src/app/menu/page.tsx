'use client';

import React, { useState } from 'react';
import Navbar from '@/src/components/molecules/Navbar';
import MenuPage from '@/src/components/molecules/Menu';

export default function Page() {
  const [language, setLanguage] = useState<string>('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'pl' : 'en'));
  };

  return (
    <div>
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <MenuPage language={language} />
    </div>
  );
}

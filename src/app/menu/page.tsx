'use client';

import React, { Fragment, useState } from 'react';
import Navbar from '@/src/components/molecules/Navbar';
import MenuPage from '@/src/components/molecules/Menu';
import Footer from '@/src/components/atoms/Footer';

export default function Page() {
  const [language, setLanguage] = useState<string>('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'pl' : 'en'));
  };

  return (
    <Fragment>
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <MenuPage language={language} />
      <Footer />
    </Fragment>
  );
}

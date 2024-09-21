import React from 'react';
import logo from '../../assets/logokubus.png';
import Image from 'next/image';
import LanguageToggle from '../atoms/LanguageToggle';
import '@/src/styles/navbar.css';

type NavbarProps = {
  language: string;
  toggleLanguage: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ language, toggleLanguage }) => {
  return (
    <div className="navbox">
      <Image src={logo} height={63} className="logo" alt="logo of kubus" />{' '}
      <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
    </div>
  );
};

export default Navbar;

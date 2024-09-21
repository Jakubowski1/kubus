import React from 'react';
import styles from '../../styles/MenuImages.module.css';

type LanguageToggleProps = {
  language: string;
  toggleLanguage: () => void;
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  toggleLanguage,
}) => {
  return (
    <div onClick={toggleLanguage} className={styles.languageToggle}>
      {language === 'en' ? 'EN / PL' : 'PL / EN'}
    </div>
  );
};

export default LanguageToggle;

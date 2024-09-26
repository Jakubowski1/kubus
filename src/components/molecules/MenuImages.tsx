import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { landingPageSection } from '@/src/services';
import styles from '../../styles/MenuImages.module.css';
import logo from '../../assets/logokubus.png';
import LanguageToggle from '../atoms/LanguageToggle';
import '../../styles/navbar.css';

type ImageData = {
  url: string;
};
type Text = {
  html: string;
};
type LandingPageData = {
  contactImage: ImageData[];
  doggiesImage: ImageData[];
  menuImage: ImageData;
  welcomeText: Text[];
}[];

const MenuImages: React.FC = () => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    getLandingPageData();
  }, []);

  const getLandingPageData = async () => {
    try {
      const res = await landingPageSection();
      setData(res.landingPages);
    } catch (error) {
      console.error('Error fetching landing page data:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'pl' : 'en'));
  };

  const getImageByLanguage = (images: ImageData[]) => {
    return language === 'en' ? images[0].url : images[1]?.url || images[0].url;
  };

  const getTextByLanguage = (texts: Text[]) => {
    return language === 'en' ? texts[0].html : texts[1]?.html || texts[0].html;
  };

  return (
    <div className={styles.container}>
      <a
        href="/"
        style={{ cursor: " url('../../public/handCursor.ico'), pointer" }}
      >
        <Image
          className={styles.logoSection}
          src={logo}
          height={220}
          alt="logo of kubus"
        />
      </a>
      {data && data.length > 0 && (
        <>
          <div className={styles.welcomeTag}>Zapraszamy!</div>

          <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

          <div
            className={styles.centerText}
            dangerouslySetInnerHTML={{
              __html: getTextByLanguage(data[0].welcomeText),
            }}
          />

          <div className={styles.imageSection}>
            <a
              href="/menu"
              className={`${styles.imageWrapper} ${styles.menuImage}`}
            >
              <Image
                src={data[0].menuImage.url}
                alt="Menu Image"
                width={300}
                height={300}
                layout="responsive"
              />
            </a>

            <a
              href="pieski"
              className={`${styles.imageWrapper} ${styles.doggiesImage}`}
            >
              <Image
                src={getImageByLanguage(data[0].doggiesImage)}
                alt="Doggies Image"
                width={350}
                height={350}
                layout="responsive"
              />
            </a>

            <a
              href="kontakt"
              className={`${styles.imageWrapper} ${styles.contactImage}`}
            >
              <Image
                src={getImageByLanguage(data[0].contactImage)}
                alt="Contact Image"
                width={350}
                height={350}
                layout="responsive"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuImages;

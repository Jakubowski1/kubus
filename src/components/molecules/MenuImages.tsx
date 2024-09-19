import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { landingPageSection } from '@/src/services';
import styles from '../../styles/MenuImages.module.css'; 
import logo from "../../assets/logokubus.png";

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

type Props = {};

const MenuImages: React.FC<Props> = () => {
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
            <Image 
                className={styles.logoSection}
                src={logo}
                height={220}
                alt="logo of kubus"
            />
            {data && data.length > 0 && (
                <>
                    <div className={styles.welcomeTag}>Zapraszamy!</div>
                    <div onClick={toggleLanguage} className={styles.languageToggle}>
                        {language === 'en' ? 'EN / PL' : 'PL / EN'}
                    </div>

                    <div
                        className={styles.centerText}
                        dangerouslySetInnerHTML={{
                            __html: getTextByLanguage(data[0].welcomeText),
                        }}
                    />

                    <div className={styles.imageSection}>
                        <div className={`${styles.imageWrapper} ${styles.menuImage}`}>
                            <Image
                                src={data[0].menuImage.url}
                                alt="Menu Image"
                                width={300}
                                height={300}
                                layout="responsive"
                            />
                        </div>

                        <div className={`${styles.imageWrapper} ${styles.doggiesImage}`}>
                            <Image
                                src={getImageByLanguage(data[0].doggiesImage)}
                                alt="Doggies Image"
                                width={350}
                                height={350}
                                layout="responsive"
                            />
                        </div>

                        <div className={`${styles.imageWrapper} ${styles.contactImage}`}>
                            <Image
                                src={getImageByLanguage(data[0].contactImage)}
                                alt="Contact Image"
                                width={350}
                                height={350}
                                layout="responsive"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MenuImages;

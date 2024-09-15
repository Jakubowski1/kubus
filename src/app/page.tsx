"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'; 
import { landingPageSection } from "@/src/services";
import "../../public/globals.css";


type LandingPageData = {
  contactImage: { url: string }[]; 
  doggiesImage: { url: string }[]; 
  menuImage: {
    url: string;
  };
  shortWelcomeText: {
    html: string;
  };
}[];

export default function Home() {
  
  const [data, setData] = useState<LandingPageData | null>(null);

  useEffect(() => {
    getLandingPageData();
  }, []);

  const getLandingPageData = async () => {
    try {
      const res = await landingPageSection();
      setData(res.landingPages); 
    } catch (error) {
      console.error("Error fetching landing page data:", error);
    }
  };

  return (
    <div>
      {data && data.length > 0 && (
        <>
          <div>
            <h1 dangerouslySetInnerHTML={{ __html: data[0].shortWelcomeText.html }} />
          </div>

          <div>
            <h2>Contact Images:</h2>
            {data[0].contactImage.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Contact Image ${index + 1}`}
                width={300} 
                height={200} 
                layout="responsive" 
              />
            ))}

            <h2>Doggies Images:</h2>
            {data[0].doggiesImage.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Doggies Image ${index + 1}`}
                width={300} 
                height={200} 
                layout="responsive" 
              />
            ))}

            <h2>Menu Image:</h2>
            <Image
              src={data[0].menuImage.url}
              alt="Menu"
              width={300} 
              height={200} 
              layout="responsive" 
            />
          </div>
        </>
      )}
    </div>
  );
}

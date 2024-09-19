import React from 'react'
import logo from "../../assets/logokubus.png"
import Image from 'next/image'
import LanguageToggle from '../atoms/LanguageToggle'
import "@/src/styles/navbar.css"
type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='navbox'>
    <Image 
    src={logo}
    height={63}
    alt="logo of kubus"
  /> 
  <LanguageToggle language={''} toggleLanguage={function (): void {
        throw new Error('Function not implemented.')
      } }/>
  </div>
    
)
}
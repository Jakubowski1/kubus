'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { landingPageSection } from '@/src/services';
import '../../public/globals.css';
import Navbar from '../components/molecules/Navbar';
import MenuImages from '../components/molecules/MenuImages';

export default function Home() {
  return (
    <div>
      <MenuImages />
    </div>
  );
}

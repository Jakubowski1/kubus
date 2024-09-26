'use client';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { landingPageSection } from '@/src/services';
import '../../public/globals.css';
import Navbar from '../components/molecules/Navbar';
import MenuImages from '../components/molecules/MenuImages';
import Footer from '../components/atoms/Footer';

export default function Home() {
  return (
    <Fragment>
      <MenuImages />
      <Footer />
    </Fragment>
  );
}

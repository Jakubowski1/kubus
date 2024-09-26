'use client';
import React from 'react';
import Navbar from '@/src/components/molecules/Navbar';
import NotFoundPage from '@/src/components/molecules/NotFound';

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <NotFoundPage />
    </div>
  );
}

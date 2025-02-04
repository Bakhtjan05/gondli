// components/HeaderSelector.tsx (Client Component)
'use client'; // This marks it as a Client Component

import { usePathname } from 'next/navigation';
import HeaderOld from '@/components/shared/headerOld';
import Header from '@/components/shared/header';
import { useLocale } from 'next-intl';
import { useAuth } from '@/types/auth';
import { useEffect, useState } from 'react';


export default function HeaderSelector() {
  const { isAuthenticated } = useAuth();


  // Render Header for the home page, HeaderOld for other pages
  return isAuthenticated  ? <Header /> : <HeaderOld />;
}

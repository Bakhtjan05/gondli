import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@/icons';
import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import SignupModal from '../headerComponents/SignupModal/SignupModal';
import LoginModal from '../headerComponents/LoginModal/LoginModal';
import { useAuth } from '@/types/auth';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();

  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const navigation = [
    {
      href: `/#`,
      label: t('home'),
    },
    {
      href: '/#explore',
      label: t('explore'),
    },
    {
      href: '/#features',
      label: t('features'),
    },
    {
      href: '/#solutions',
      label: t('solutions'),
    },
    {
      href: '/#testimonials',
      label: t('testimonials'),
    },
  ];

  const openSignupModal = () => setSignupModal(true);
  const closeSignupModal = () => setSignupModal(false);
  const openLoginModal = () => setLoginModal(true);
  const closeLoginModal = () => setLoginModal(false);

  return (
    <header className='fixed top-0 z-30 flex h-16.75 w-full items-center justify-between gap-5 bg-surface-brand px-3.75 sm:h-18.5 lg:px-25'>
      <div className='w-full'>
        <Image
          src={'/images/logo/index.svg'}
          alt='logo'
          priority
          width={101}
          height={22}
          className='h-4.5 w-auto sm:h-auto'
        />
      </div>
      <nav className='hidden lg:block'>
        <ul className='flex gap-10 text-nowrap text-white'>
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex w-full justify-end gap-3 max-lg:!gap-2'>
        <button className='text-white py-2 px-6'  onClick={openLoginModal}>
          Login
        </button>
        <Button onClick={openSignupModal}>Sign Up</Button>

        <Sheet>
          <SheetTrigger>
            <Menu className='text-white lg:hidden' />
          </SheetTrigger>
          <SheetContent side={'top'}>
            <nav>
              <ul className='flex flex-col gap-7 text-nowrap text-white'>
                {navigation.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>
                      <SheetClose>{label}</SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SheetTitle>Header Navigation</SheetTitle>
            <SheetDescription>
              The main navigation of the page.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
      {/* {!token && (
        <> */}
      <SignupModal show={signupModal} onClose={closeSignupModal} />
      <LoginModal show={loginModal} onClose={closeLoginModal} />
      {/* </>
      )}
      {token && (
        <>
          <p>jahjhbvhjvb</p>
        </>
      )} */}
    </header>
  );
}

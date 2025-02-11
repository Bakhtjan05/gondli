'use client';

import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu } from '@/icons';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import HeaderInput from '../headerComponents/HeaderInput/HeaderInput';
import SocialIcons from '../headerComponents/SocialIcons/SocialIcons';
import { useLocale } from 'next-intl';
import FormTracker from '../headerComponents/formTracker/FormTracker';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  // Check if the current route is the home page
  const isHomePage = pathname === `/${locale}`;
  const isRegistration = pathname === `/${locale}/business-registration`;
  const isSearchPage = pathname === `/${locale}/homeSection/SearchResults`;

  

  return (
    <header className='fixed top-0 z-30 h-[80px] w-full bg-surface-brand max-lg:!h-auto'>
      <div className='container'>
        <div className='flex h-16.75 items-center justify-between gap-2 sm:h-18.5'>
          <a href='' className='logoWrap w-full'>
            <Image
              src={'/images/logo/index.svg'}
              alt='logo'
              priority
              width={101}
              height={22}
              className='h-4.5 w-auto sm:h-auto'
            />
          </a>

          <nav className='hidden lg:block'>
            {isRegistration ? (
              <FormTracker />
            ) : (
              !isHomePage && (
                <div className='headerSearch'>
                  <HeaderInput />
                </div>
              )
            )}
          </nav>

          <div className='flex w-full justify-end gap-2'>
            <SocialIcons />
            <Sheet>
              <SheetTrigger>
                <Menu className='text-white lg:hidden' />
              </SheetTrigger>
              <SheetContent side={'top'}>
                <HeaderInput />
                <SheetTitle>Header Navigation</SheetTitle>
                <SheetDescription>
                  The main navigation of the page.
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {isSearchPage && (
          <div className='my-4 lg:hidden'>
            <HeaderInput />
          </div>
        )}

        {isRegistration && (
          <div className='lg:hidden'>
            <FormTracker />
          </div>
        )}
      </div>
    </header>
  );
}

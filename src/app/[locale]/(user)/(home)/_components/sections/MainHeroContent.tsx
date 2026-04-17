'use client';

import { useAuth } from '@/types/auth';
import { useTranslations } from 'next-intl';
import { SectionDescription } from '@/components/shared/section';
import HeaderInput from '@/components/headerComponents/HeaderInput/HeaderInput';

const MainHeroContent = () => {
  const t = useTranslations();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <div className='flex flex-col relative items-center gap-8 p-3.75 text-white sm:gap-6 max-lg:w-full max-lg:px-0'>
      <SectionDescription className='max-w-150'>
        {isAuthenticated ? (
          <>
            {t('welcome-back')}
            <br />
            {t('looking-for')}
          </>
        ) : (
          <>
            {"Welcome to Gondli!"}
            <br />
            {t('looking-for')}
          </>
        )}
      </SectionDescription>

      <HeaderInput />
    </div>
  );
};

export default MainHeroContent;
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ComingSoon() {
  const t = useTranslations();

  return (
    <div className='flex h-screen w-full flex-col items-center justify-between bg-coming-soon bg-cover bg-center py-12 text-white'>
      <span />
      <div className='flex translate-y-10 flex-col gap-3 text-center sm:gap-4'>
        <h1 className='text-4xl font-black sm:text-7xl'>
          {t('coming-soon-title')}
        </h1>
        <p className='text-xl opacity-80 sm:text-2xl'>{t('coming-soon')}</p>
      </div>
      <Image
        src={'/images/logo/index.svg'}
        alt='logo'
        width={128}
        height={28}
        className='h-auto w-28 sm:w-32'
      />
    </div>
  );
}

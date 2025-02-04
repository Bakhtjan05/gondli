import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper, SectionTitle } from '@/components/shared/section';

export default function JourneySection() {
  const t = useTranslations();

  return (
    <SectionWrapper
      id='journey'
      className='relative bg-surface-brand pb-80 pt-20 text-white sm:py-44'
    >
      <div className='relative z-10 space-y-8 text-center sm:space-y-10 sm:text-left'>
        <SectionTitle>{t('journey-title')}</SectionTitle>
        <p className='max-w-162.5 leading-snug'>{t('journey-description')}</p>
      </div>
      <Image
        src='/images/shapes/mountains-large.png'
        alt='mountains'
        width={949}
        height={474}
        quality={100}
        className='absolute -bottom-6 -right-25 min-w-136.5 sm:-right-60 sm:w-auto'
      />
    </SectionWrapper>
  );
}

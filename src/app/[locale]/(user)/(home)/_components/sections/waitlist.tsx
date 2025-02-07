import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';

export default function WaitlistSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id='waitlist' className='space-y-15 !py-0 sm:space-y-20'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-8 text-center sm:space-y-6'>
          <SectionTitle>{t('waitlist-title')}</SectionTitle>
          <SectionDescription>{t('waitlist-description')}</SectionDescription>
        </div>
        
      </div>
      <div className='relative'>
        <Image
          src={'/images/tasks.png'}
          alt='tasks'
          width={4960}
          height={3524}
          quality={100}
          className='max-h-[584px] w-full object-cover object-top 2xl:max-h-258'
        />
        <div className='absolute bottom-0 left-0 h-35.5 w-full bg-gradient-to-t from-white' />
      </div>
    </SectionWrapper>
  );
}

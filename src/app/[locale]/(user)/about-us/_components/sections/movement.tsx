import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MovementSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id='movement' className='space-y-16 !pb-0 sm:space-y-20'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-8 text-center sm:space-y-6'>
          <SectionTitle>{t('movement-title')}</SectionTitle>
          <SectionDescription className='max-w-212.5'>
            {t('movement-description')}
          </SectionDescription>
          <div className='space-x-3 pt-2 sm:space-x-5 sm:pt-4'>
            <Link href={'/#waitlist'}>
              <Button>{t('get-started')}</Button>
            </Link>
            <Link href={'/#waitlist'}>
              <Button variant={'outline'}>{t('explore-listing')}</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='relative'>
        <Image
          src={'/images/tasks.png'}
          alt='tasks'
          width={4960}
          height={3524}
          quality={100}
          className='max-h-172 w-full object-cover object-top 2xl:max-h-258'
        />
        <div className='absolute bottom-0 left-0 h-35.5 w-full bg-gradient-to-t from-white' />
      </div>
    </SectionWrapper>
  );
}

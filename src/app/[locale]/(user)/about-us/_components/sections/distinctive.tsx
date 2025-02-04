import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@/components/shared/section';

export default function DistinctiveSection() {
  const t = useTranslations();

  const points = ['locality', 'empowerment', 'trust'];

  return (
    <SectionWrapper id='solutions' className='space-y-10 sm:space-y-15'>
      <div className='space-y-8 text-center sm:space-y-6'>
        <SectionTitle>{t('distinctive-title')}</SectionTitle>
        <SectionDescription className='mx-auto max-w-212.5'>
          {t('distinctive-description')}
        </SectionDescription>
      </div>
      <div className='grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-primary bg-border-primary sm:grid-cols-3'>
        {points.map((distinctive) => (
          <div
            className='w-full space-y-5 bg-surface-primary px-5 py-6 sm:space-y-6 sm:p-10'
            key={distinctive}
          >
            <Image
              src={`/images/distinctive/${distinctive}.svg`}
              alt='solution'
              width={40}
              height={40}
              className='mx-auto sm:mx-0'
            />
            <div className='space-y-3 text-center text-sm sm:space-y-4 sm:text-left sm:text-base'>
              <h3 className='font-medium'>
                {t(`distinctive-${distinctive}-title`)}
              </h3>
              <p className='text-text-secondary'>
                {t(`distinctive-${distinctive}-description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

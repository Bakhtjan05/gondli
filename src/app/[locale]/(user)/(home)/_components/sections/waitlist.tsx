import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';
import { Button } from '@/components/ui/button';

export default function WaitlistSection() {
  const t = useTranslations();

  return (
    <SectionWrapper id='waitlist' className='space-y-15 !pt-15 sm:space-y-20 container mx-auto'>
      <div className='flex flex-col items-center gap-10'>
        <div className='space-y-8 text-center sm:space-y-6'>
          <SectionTitle className='font-semibold'>Start Using Gondli Now</SectionTitle>
          <SectionDescription>Start prioritizing your well-being and treat yourself to a healthier, happier life.</SectionDescription>
          <div className='flex justify-center items-center gap-[20px] mt-6'>
            <Button>Get Started</Button>
            <Button variant='outline'>Explore Listing</Button>
            
          </div>
        </div>
        
      </div>
      <div className='relative '>
        <Image
          src={'/images/tasks.png'}
          alt='tasks'
          width={4960}
          height={3524}
          quality={100}
          className='max-h-[584px] w-full object-cover object-top 2xl:max-h-150'
        />
        <div className='absolute bottom-0 left-0 h-35.5 w-full bg-gradient-to-t from-white' />
      </div>
    </SectionWrapper>
  );
}

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselNav,
} from '@/components/ui/carousel';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';

export default function TestimonialsSection() {
  const t = useTranslations();

  const testimonials = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    testimonial: t('testimonial'),
    author: {
      name: 'Annika',
      image: '/images/testimonials/annika_testimonial.png',
    },
  }));

  return (
    <SectionWrapper
      displayMountains
      id='testimonials'
      className='container mx-auto flex flex-col gap-25 bg-surface-brand !py-20 text-center text-white sm:gap-27.25'
    >
      <SectionTitle>{t('testimonials-title')}</SectionTitle>
      <Carousel className='pb-13.75 sm:px-20 sm:pb-10'>
        <CarouselContent className='cursor-grab select-none'>
          {testimonials.map(({ id, testimonial, author }) => (
            <CarouselItem key={id}>
              <div className='mx-auto flex max-w-184.5 flex-col items-center gap-25 sm:gap-27.25'>
                <SectionDescription>{testimonial}</SectionDescription>
                <div className='flex items-center gap-3.5'>
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={96}
                    height={96}
                    quality={100}
                    className='h-10 w-10 rounded-full sm:h-12 sm:w-12'
                  />
                  <div className='flex h-full flex-col justify-between text-left'>
                    <p className='text-sm font-medium sm:text-xl'>
                      {author.name}
                    </p>
                    <p className='text-sm font-light text-situational-secondary sm:text-base'>
                      {t('gondli-user')}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='top-full sm:top-15' />
        <CarouselNext className='top-full sm:top-15' />
        <CarouselNav className='translate-y-1/3' />
      </Carousel>
    </SectionWrapper>
  );
}

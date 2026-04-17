import {
  SectionWrapper,
} from '@/components/shared/section';
import MainHeroBackground from './main-hero-background';
import MainHeroContent from './MainHeroContent';

const MainHero: React.FC = () => {
  return (
    <div className='relative w-full h-screen'>
      <SectionWrapper className='flex relative h-screen w-full flex-col items-center justify-center gap-15 text-center sm:gap-20'>
        <MainHeroContent />
      </SectionWrapper>

      <MainHeroBackground />
    </div>
  );
};

export default MainHero;



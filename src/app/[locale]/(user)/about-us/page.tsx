import JourneySection from './_components/sections/journey';
import DistinctiveSection from './_components/sections/distinctive';
import ConnectionsSection from './_components/sections/connections';
import MovementSection from './_components/sections/movement';

export default function AboutUs() {
  return (
    <main className='pt-16.75 sm:pt-18.5'>
      <JourneySection />
      <DistinctiveSection />
      <ConnectionsSection />
      <MovementSection />
    </main>
  );
}

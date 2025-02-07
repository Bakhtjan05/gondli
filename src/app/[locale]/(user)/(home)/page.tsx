
import DigitalContent from './_components/sections/DigitalContent/DigitalContent';
import MainHero from './_components/sections/main-hero';
import LocationServices from './_components/sections/LocationServices/LocationServices';
import MissedStories from './_components/sections/MissedStories/MissedStories';
import PastBooking from './_components/sections/PastBooking/PastBooking';
import Recommended from './_components/sections/Recommended/Recommended';
import WaitlistSection from './_components/sections/waitlist';


export default function HomeSection() {

  

  return (
    <main>
      <MainHero />
      <MissedStories />
      <PastBooking />
      <LocationServices />
      <DigitalContent />
      <Recommended />
      <WaitlistSection />
      
    </main>
  );
}

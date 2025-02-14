
import MainHero from './_components/sections/main-hero';
import LocationServices from './_components/sections/LocationServices/LocationServices';
import PastBooking from './_components/sections/PastBooking/PastBooking';
import Recommended from './_components/sections/Recommended/Recommended';
import WaitlistSection from './_components/sections/waitlist';
import ForBusiness from './_components/sections/ForBusiness/ForBusiness';


export default function HomeSection() {

  

  return (
    <main>
      <MainHero />
      <Recommended />
      <PastBooking />
      <ForBusiness />
      <LocationServices />
      <WaitlistSection />
      
    </main>
  );
}

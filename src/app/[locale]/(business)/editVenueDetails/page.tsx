'use client';
import React, { useState } from 'react';
import General from './_components/General/General';
import CancelationPolicy from './_components/CancelationPolicy/CancelationPolicy';
import Header from './_components/Header/Header';
import WorkingHours from './_components/WorkingHours/WorkingHours';
import Amenities from './_components/Amenities/Amenities';
import Promotions from './_components/Promotions/Promotions';
import InstantBooking from './_components/InstantBooking/InstantBooking';
import Availability from './_components/Availablity/Availablity';

export default function EditVenueDetail() {
  const [activeComponent, setActiveComponent] = useState('General');

  const renderComponent = () => {
    const formattedComponent = activeComponent.replace(/-/g, ' ');

    switch (formattedComponent) {
      case 'General':
        return <General />;
      case 'Working Hours':
        return <WorkingHours />;
      case 'Services':
        return <>Services</>;
      case 'Amenities':
        return <Amenities />;
      case 'Promotions':
        return <Promotions />;
      case 'Instant Booking':
        return <InstantBooking />;
      case 'Availability':
        return <Availability />;
      case 'Cancellation Policy':
        return <CancelationPolicy />;
      default:
        return <General />;
    }
  };

  return (
    <main>
      <Header setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </main>
  );
}

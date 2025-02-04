import React from 'react';
import ServiceDashboard from './_components/ServiceDashboard/ServiceDashboard';

const ServicePage: React.FC = () => {
  return (
    <div className='flex max-lg:px-4 min-h-screen ml-[40px] max-lg:!ml-0 bg-[#F5F9FF]'>
      <ServiceDashboard />
    </div>
  );
};

export default ServicePage;

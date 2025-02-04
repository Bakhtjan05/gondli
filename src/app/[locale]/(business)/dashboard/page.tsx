import React from 'react';
import Discount from './_components/sections/discount/discount';
import YourStatistics from './_components/sections/yourStatistics/yourStatistics';
import UpcomingBookings from './_components/sections/upcomingBookings/upcomingBookings';
import YourServices from './_components/sections/yourServices/yourServices';
import RecentActivities from './_components/sections/recentActivities/recentActivities';

const Dashboard = () => {
  return (
    <main className='px-10 max-lg:px-4 '>
      <YourStatistics />
      <YourServices />
      <Discount />
      <UpcomingBookings />
      <RecentActivities />
    </main>
  );
};

export default Dashboard;

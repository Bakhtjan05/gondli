"use client"

import React, { createContext, useContext, useState } from 'react';
import ProfileHeader from './_components/shared/ProfileHeader/ProfileHeader';
import Sidebar from './_components/shared/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, selectUpcomingPageState } from '@/slices/upcomingPageSlice';


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { isUpcomingPage } = useSelector(selectUpcomingPageState);
  

  return (
    
      <div className="w-full bg-surface-primary container mx-auto">
        {!isUpcomingPage && (
          <div>
            <ProfileHeader />
          </div>
        )}
        <div className="mx-auto mt-[50px] flex w-full max-lg:flex-col max-lg:mt-2">
          {!isUpcomingPage && (
            <div>
              <Sidebar isUpcomingPage={isUpcomingPage} setIsUpcoming={setIsUpcomingPage} />
            </div>
          )}
          <div className="w-full max-lg:hidden">{children}</div>
        </div>
        {isUpcomingPage && (
          <div className="w-full mt-[102px]">{children}</div>
        )}
      </div>
    
  );
}

"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import "./Main.scss"
import Image from 'next/image';
import ScheduleStats from '../ScheduleStats/ScheduleStats';
import Schedule from '../Schedule/Schedule';
import BookingList from '../BookingList/BookingList';


type ViewMode = "daily" | "list";

interface NewBookings {
  orderId: string;
  customer: { name: string; image: string };
  bookingType: string;
  chosenService: string;
  paidAmount: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Canceled";
}

interface ActiveBookings {
  orderId: string;
  customer: { name: string; image: string };
  bookingType: string;
  chosenService: string;
  paidAmount: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Canceled";
}



const Main: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [openCustomerDetails, setOpenCustomerDetails] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessRefund, setShowSuccessRefund] = useState(false);



  const [openBookingDetails, setOpenBookingDetails] = useState(false)

  const [openRescheduling, setOpenRescheduling] = useState(false)

  const [openCancelation, setOpenCancelation] = useState(false)

  const [openRefund, setOpenRefund] = useState(false)


  const [newBookingInfo, setNewBookingInfo] = useState<NewBookings[]>([
    {
      orderId: "#132631",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Individual",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Pending",
    },
    {
      orderId: "#132632",
      customer: {
        name: "Lowell Bauver",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (2)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "17:00",
      status: "Pending",
    },
  ])

  const [activeBookingInfo, setActiveBookingInfo] = useState<ActiveBookings[]>([
    {
      orderId: "#132633",
      customer: {
        name: "Taylor Kertzmann",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "12:00",
      status: "Accepted",
    },
    {
      orderId: "#132634",
      customer: {
        name: "Johny Keebler",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Accepted",
    },
    {
      orderId: "#132635",
      customer: {
        name: "Simon Ratke",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May,",
      time: "16:00",
      status: "Canceled",
    },
    {
      orderId: "#132636",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Accepted",
    },
    {
      orderId: "#132637",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Accepted",
    },
    {
      orderId: "#132638",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Accepted",
    },
    {
      orderId: "#132639",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Canceled",
    },
    {
      orderId: "#132640",
      customer: {
        name: "Wilfred Howe",
        image: "/images/bookingManage/profile-picture.png",
      },
      bookingType: "Group Booking (3)",
      chosenService: "Gentle Flow Yoga Class",
      paidAmount: "100.00 CHF",
      date: "24 May",
      time: "16:00",
      status: "Accepted",
    },

  ])



  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'daily' ? 'list' : 'daily'));
  };

  const handleOpenBookingDetails = (time: string) => {
    setSelectedTime(time)
    setOpenBookingDetails((prev) => !prev)
    setOpenCustomerDetails(false)
    setOpenRescheduling(false)
  }

  const handleOpenCustomerDetails = (order: string) => {
    setOrderNumber(order)
    setOpenCustomerDetails((prev) => !prev)
    setOpenBookingDetails(false)
    setOpenRescheduling(false)
    setOpenCancelation(false)


  }

  const handleOpenReschedule = (order: string) => {
    setOrderNumber(order)
    setOpenRescheduling((prev) => !prev)
    setOpenBookingDetails(false)
    setOpenCustomerDetails(false)
    setOpenCancelation(false)
  }

  const handleOpenCancelation = () => {
    setOpenCancelation((prev) => !prev)
    setOpenBookingDetails(false)
    setOpenCustomerDetails(false)
    setOpenRescheduling(false)
  }

  const updateBookingStatus = (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => {
    setNewBookingInfo(prevBookingInfo =>
      prevBookingInfo.map(booking =>
        booking.orderId === orderId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const updateActiveBookingStatus = (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => {
    setActiveBookingInfo(prevBookingInfo =>
      prevBookingInfo.map(booking =>
        booking.orderId === orderId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleOpenRefund = () => {
    setOpenRefund((prev) => !prev)
    setOpenBookingDetails(false)
    setOpenCustomerDetails(false)
    setOpenRescheduling(false)
    setOpenCancelation(false)
    setShowSuccessRefund(true)
    setTimeout(() => {
      setShowSuccessRefund(false);
  }, 5000);

  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setViewMode(window.innerWidth < 1024 ? "list" : "daily");
    };

    handleResize(); // Изначальная проверка при загрузке

    window.addEventListener("resize", handleResize);

    setIsLoaded(true); // Устанавливаем флаг загрузки после инициализации

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className='main'>
      {isLoaded && (
        isMobile ? (
          <BookingList
            toggleViewMode={toggleViewMode}
            viewMode={viewMode}
            handleOpenCustomerDetails={handleOpenCustomerDetails}
            openCustomerDetails={openCustomerDetails}
            orderNumber={orderNumber ?? ""}
            handleOpenBookingDetails={handleOpenBookingDetails}
            handleOpenReschedule={handleOpenReschedule}
            openRescheduling={openRescheduling}
            openCancelation={openCancelation}
            handleOpenCancelation={handleOpenCancelation}
            newBookings={newBookingInfo}
            activeBookings={activeBookingInfo}
            updateBookingStatus={updateBookingStatus}
            updateActiveBookingStatus={updateActiveBookingStatus}
            handleOpenRefund={handleOpenRefund}
            openRefund={openRefund}
            showSuccessRefund={showSuccessRefund}
          />
        ) : viewMode === "daily" ? (
          <>
            <Schedule
              toggleViewMode={toggleViewMode}
              viewMode={viewMode}
              handleOpenCustomerDetails={handleOpenCustomerDetails}
              openCustomerDetails={openCustomerDetails}
              handleOpenBookingDetails={handleOpenBookingDetails}
              openBookingDetails={openBookingDetails}
              selectedTime={selectedTime ?? ""}
              orderNumber={orderNumber ?? ""}
              handleOpenReschedule={handleOpenReschedule}
              openRescheduling={openRescheduling}
              openCancelation={openCancelation}
              handleOpenCancelation={handleOpenCancelation}
              handleOpenRefund={handleOpenRefund}
              openRefund={openRefund}
              updateBookingStatus={updateBookingStatus}
              updateActiveBookingStatus={updateActiveBookingStatus}
              newBookings={newBookingInfo}
              activeBookings={activeBookingInfo}
              showSuccessRefund={showSuccessRefund}
            />
            <ScheduleStats />
          </>
        ) : (
          <BookingList
            toggleViewMode={toggleViewMode}
            viewMode={viewMode}
            handleOpenCustomerDetails={handleOpenCustomerDetails}
            openCustomerDetails={openCustomerDetails}
            orderNumber={orderNumber ?? ""}
            handleOpenBookingDetails={handleOpenBookingDetails}
            handleOpenReschedule={handleOpenReschedule}
            openRescheduling={openRescheduling}
            openCancelation={openCancelation}
            handleOpenCancelation={handleOpenCancelation}
            newBookings={newBookingInfo}
            activeBookings={activeBookingInfo}
            updateBookingStatus={updateBookingStatus}
            updateActiveBookingStatus={updateActiveBookingStatus}
            handleOpenRefund={handleOpenRefund}
            openRefund={openRefund}
            showSuccessRefund={showSuccessRefund}
          />
        )
      )}
    </div>

  );
};

export default Main;
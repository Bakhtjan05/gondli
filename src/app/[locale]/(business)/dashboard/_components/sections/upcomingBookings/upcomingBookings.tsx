'use client';
import React, { useEffect, useRef, useState } from 'react';
import './upcomingBookings.scss';
import Image from 'next/image';

type UpcomingBookingsTableProps = {
  orderId: string;
  customer: { name: string; image: string };
  bookingType: string;
  chosenService: string;
  paidAmount: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Canceled";
}[];

const UpcomingBookings: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown
  const [statusBtn, setStatusBtn] = useState<number>(1);

  const bookingInfoTitles = [
    { title: "Order" },
    { title: "Customer" },
    { title: "Booking Type" },
    { title: "Service Chosen" },
    { title: "Paid Amount" },
    { title: "Date" },
    { title: "Status" },
  ]

  const bookings: UpcomingBookingsTableProps = [
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
      status: "Accepted",
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
      status: "Accepted",
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
  ];

  const toggleRow = (index: number) => {
    setActiveRow(activeRow === index ? null : index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveRow(null); // Close dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='upcomingBookings'>
      <div className='header max-lg:!mb-5'>
        <h2 className='max-lg:!text-lg'>Upcoming Bookings</h2>
        <div className='btns'>
          <button className='btn'>See all</button>
        </div>
      </div>
      <div className='overflow-auto w-full rounded-2xl border border-[#DBECF0]'>
        <div className='controls max-lg:border-b max-lg:border-b-[#DBECF0]'>
          <div className='select'>
            <button
              className={statusBtn === 1 ? 'btn lg:!bg-[#0c343d] lg:!text-white' : 'btn'}
              onClick={() => setStatusBtn(1)}
            >
              All
            </button>
            <button
              className={`max-lg:hidden ${statusBtn === 2 ? 'btn active_status' : 'btn'}`}
              onClick={() => setStatusBtn(2)}
            >
              Pending
            </button>
            <button
              className={`max-lg:hidden ${statusBtn === 3 ? 'btn active_status' : 'btn'}`}
              onClick={() => setStatusBtn(3)}
            >
              Accepted
            </button>
            <button
              className={`max-lg:hidden ${statusBtn === 4 ? 'btn active_status' : 'btn'}`}
              onClick={() => setStatusBtn(4)}
            >
              Cancelled
            </button>
          </div>
          <div className='filter'>
            <button className='btn max-lg:!text-sm'>
              <Image
                priority
                width={13}
                height={12}
                src='/images/dashboard/search.svg'
                alt='SearchOutline'
              />
              Search
            </button>
            <button className='btn max-lg:!text-sm'>
              <Image
                priority
                width={10}
                height={10}
                src='/images/dashboard/filter.svg'
                alt='SearchOutline'
              />
              Filter
            </button>
          </div>
        </div>
        
        <div className="active-bookings max-lg:hidden overflow-auto !bg-white">
          <div className='title'>
            <div className='amount'>
              <p>9</p>
            </div>
            <p>Active Orders</p>
          </div>
          <div className="booking-titles">
            {bookingInfoTitles.map((item, index) => (

              <div className='info-name' key={index}>
                <p>{item.title}</p>
                <Image src="/images/bookingManage/chevron-up-icon.svg" alt='' width={12} height={12} />
              </div>
            ))}
            <div className='details'></div>
            {bookings.map((item, index) => (
              <div className="booking-row" key={index}>
                <div className={`order-id item ${index === bookings.length - 1 ? "last" : ""}`}>
                  <p>{item.orderId}</p>
                </div>
                <div className="customer item">
                  <div className="customer-info">
                    <Image src={item.customer.image} alt="" width={24} height={24} />
                    <p>{item.customer.name}</p>
                  </div>
                </div>
                <div className="booking-type item">
                  <p>{item.bookingType}</p>
                </div>
                <div className="chosen-service item">
                  <p>{item.chosenService}</p>
                </div>
                <div className="paid-amount item">
                  {item.paidAmount}
                </div>
                <div className="date item">
                  {item.date} {item.time}
                </div>
                <div className="status item">
                  {item.status === "Pending" ? (
                    <div className='pending'>
                      <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                      <p>Pending</p>
                    </div>
                  ) : item.status === "Accepted" ? (
                    <div className='accepted !border-none'>
                      <Image src="/images/bookingManage/check-icon.svg" alt="" width={16} height={16} />
                      <p>Accepted</p>
                    </div>
                  ) : (
                    <div className='canceled'>
                      <Image src="/images/bookingManage/x-red-icon.svg" alt="" width={16} height={16} />
                      <p>Canceled</p>
                    </div>
                  )}
                </div>
                <div className={`details item ${index === bookings.length - 1 ? "last" : ""}`} >
                  <button >
                    <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                  </button>
                  <div className={`details-block `}>
                    <div className='details-options'>
                      <button >
                        <Image src="/images/bookingManage/details-icon.svg" alt='' width={20} height={20} />
                        View Details
                      </button>
                      <button >
                        <Image src="/images/bookingManage/schedule-icon.svg" alt='' width={20} height={20} />
                        Reschedule Appointment
                      </button>
                      <button >
                        <Image src="/images/bookingManage/refund-icon.svg" alt='' width={20} height={20} />
                        Refund
                      </button>
                    </div>
                    <div className='cancel'>
                      <button >
                        <Image src="/images/bookingManage/x-icon.svg" alt='' width={20} height={20} />
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className='lg:hidden w-full !bg-white'>
          {bookings.map((service, index) => (
            <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
              <div className='flex items-center gap-2'>
                <Image className='rounded-full' src={"/images/bookingManage/profile-picture.png"} alt='' width={24} height={24} />
                <h3 className='flex items-center gap-1 font-bold text-sm'>
                  {service.customer.name}
                </h3>

              </div>
              <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Order: <span className='text-[#000B19]'>#132631</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Type: <span className='text-[#000B19]'>Group Booking (3)</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Service: <span className='text-[#000B19]'>Restorative Yoga and Meditation</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Paid Amount: <span className='text-[#000B19]'>75.00 CHF</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Date: <span className='text-[#000B19]'>24 May, 12:00</span></p>
                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>Status: <span className='text-[#000B19] flex items-center gap-1 text-[#ABCF6F]'> <Image src={"/images/icons/check-circle-green.svg"} alt='' width={16} height={16} /> Accepted</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingBookings;

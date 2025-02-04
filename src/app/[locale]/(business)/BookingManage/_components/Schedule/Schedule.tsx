import React from 'react';
import { useEffect, useState } from 'react';
import "./Schedule.scss"
import Image from 'next/image';
import BookingDetails from '../BookingDetails/BookingDetails';
import CustomerDetails from '../CustomerDetails/CustomerDetails';
import Rescheduling from '../Rescheduling/Rescheduling';
import Cancelation from '../Cancelation/Cancelation';
import Refund from '../Refund/Refund';

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

interface ScheduleProps {
    toggleViewMode: () => void;
    viewMode: ViewMode;
    handleOpenCustomerDetails: (orderId: string) => void;
    openCustomerDetails: boolean;
    handleOpenBookingDetails: (time: string) => void;
    openBookingDetails: boolean;
    selectedTime: string;
    orderNumber: string;
    handleOpenReschedule: (orderId: string) => void;
    openRescheduling: boolean
    handleOpenCancelation: () => void;
    openCancelation: boolean;
    handleOpenRefund: () => void;
    openRefund: boolean;
    updateBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    updateActiveBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    newBookings: NewBookings[];
    activeBookings: ActiveBookings[];
    showSuccessRefund: boolean;


}

const Schedule: React.FC<ScheduleProps> = ({
    toggleViewMode,
    viewMode,
    handleOpenCustomerDetails,
    openCustomerDetails,
    handleOpenBookingDetails,
    openBookingDetails,
    selectedTime,
    orderNumber,
    handleOpenReschedule,
    openRescheduling,
    handleOpenCancelation,
    openCancelation,
    handleOpenRefund,
    openRefund,
    updateBookingStatus,
    newBookings,
    activeBookings,
    updateActiveBookingStatus,
    showSuccessRefund,


}) => {

    const [selectedNewBooking, setSelectedNewBooking] = useState<NewBookings | null>(null);
    const [selectedActiveBooking, setSelectedActiveBooking] = useState<ActiveBookings | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [succeedRescheduleOrderNumber, setSucceedRescheduleOrderNumber] = useState<string | null>(null);
    const [showSuccessCancelation, setShowSuccessCancelation] = useState(false);



    const scheduleData = [
        {
            time: "9:00",
            events: [

            ],
        },
        {
            time: "10:00",
            events: [
                {
                    id: 1,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "10:00 - 11:00",
                    className: "Morning Yoga",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: true,
                },
            ],
        },
        {
            time: "11:00",
            events: [

            ],
        },
        {
            time: "12:00",
            events: [
                {
                    id: 2,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "12:00 - 13:00",
                    className: "Gentle Flow Yoga Class",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: false,
                },
                {
                    id: 3,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "12:00 - 13:00",
                    className: "Gentle Flow Yoga Class",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: true,
                },
            ],
        },
        {
            time: "13:00",
            events: [],
        },
        {
            time: "14:00",
            events: [],
        },
        {
            time: "15:00",
            events: [
                {
                    id: 4,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "15:00 - 16:00",
                    className: "Gentle Flow Yoga Class",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: false,
                },
            ],
        },
        {
            time: "16:00",
            events: [],
        },
        {
            time: "17:00",
            events: [],
        },
        {
            time: "18:00",
            events: [
                {
                    id: 5,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "18:00 - 19:00",
                    className: "Gentle Flow Yoga Class",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: false,
                },
            ],
        },
        {
            time: "19:00",
            events: [],
        },
        {
            time: "20:00",
            events: [
                {
                    id: 6,
                    people: "Lowell, Taylor, Anna and 7 Others",
                    timeRange: "20:00 - 21:00",
                    className: "Gentle Flow Yoga Class",
                    avatars: [
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                        "/images/bookingManage/profile-picture.png",
                    ],
                    isNew: false,
                },
            ],
        },
        {
            time: "21:00",
            events: [],
        },
        {
            time: "22:00",
            events: [],
        },
    ];

    const handleCancelNewBookingClick = (newBooking: NewBookings) => {
        setSelectedNewBooking(newBooking);
        handleOpenCancelation()
        setSelectedActiveBooking(null)

    };

    const handleCancelActiveBookingClick = (activeBooking: ActiveBookings) => {
        setSelectedActiveBooking(activeBooking);
        handleOpenCancelation()
        setSelectedNewBooking(null)

    };


    return (
        <div className='main-side'>
            <div className='top'>
                <h1>18 May, 2024</h1>
                <div className='options'>
                    <div className='btns'>
                        <button>
                            <Image src="/images/bookingManage/left-icon.svg" alt='' width={14} height={14} />
                        </button>
                        <button>
                            <Image src="/images/bookingManage/right-icon.svg" alt='' width={14} height={14} />
                        </button>
                    </div>
                    <div className='filter-view'>
                        <button className='filter-btn'>
                            <Image src="/images/bookingManage/filter-icon.svg" alt='' width={14} height={14}></Image>
                            Filter
                        </button>
                        <button className='view-btn' onClick={toggleViewMode}>
                            <Image src="/images/bookingManage/calendar-icon.svg" alt='' width={14} height={14}></Image>
                            View: Daily
                        </button>
                    </div>
                </div>
            </div>
            <div className="schedule">
                {scheduleData.map((block) => (
                    <div key={block.time} className={`clock-block ${block === scheduleData[0] ? "start" : ""}`}>
                        <p className="schedule-time">{block.time}</p>
                        <div className={`block ${block === scheduleData[0] ? "block-start" : ""}`}>
                            {block.events.map((event) => (
                                <div key={event.id} className={`calendar-event ${event.isNew ? "new" : ""}`} onClick={() => handleOpenBookingDetails(event.timeRange)}>
                                    <div className="info-side">
                                        <div className="avatar">
                                            {event.avatars.map((avatar, index) => (
                                                <div key={index} className={`profile-${index + 1}`}>
                                                    <Image src={avatar} alt="" width={32} height={32} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="event-info">
                                            <p className="people-names">{event.people}</p>
                                            <div className="time-name">
                                                <p className="time">{event.timeRange}</p>
                                                <p className="name">{event.className}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {event.isNew ? (
                                        <div className="indicator">

                                        </div>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
            {openBookingDetails && <BookingDetails
                openBookingDetails={openBookingDetails}
                handleOpenBookingDetails={() => handleOpenBookingDetails("")}
                selectedTime={selectedTime}
                handleOpenCustomerDetails={() => handleOpenCustomerDetails('')}
                openCustomerDetails={openCustomerDetails}
                handleOpenReschedule={handleOpenReschedule}
                openRescheduling={openRescheduling}
                openCancelation={openCancelation}
                handleOpenCancelation={handleOpenCancelation}
                handleOpenRefund={handleOpenRefund}
                openRefund={openRefund}
                newBookings={newBookings}
                activeBookings={activeBookings}
                handleCancelNewBookingClick={handleCancelNewBookingClick}
                handleCancelActiveBookingClick={handleCancelActiveBookingClick}
                updateBookingStatus={updateBookingStatus}
                updateActiveBookingStatus={updateActiveBookingStatus}
                selectedNewBooking={selectedNewBooking}
                selectedActiveBooking={selectedActiveBooking}
                setSelectedNewBooking={setSelectedNewBooking}
                setSelectedActiveBooking={setSelectedActiveBooking}

            />}

            {openCustomerDetails && <CustomerDetails
                handleOpenCustomerDetails={() => handleOpenCustomerDetails('')}
                openCustomerDetails={openCustomerDetails}
                openBookingDetails={openBookingDetails}
                orderNumber={orderNumber}
                handleOpenReschedule={() => handleOpenReschedule('')}
                openRescheduling={openRescheduling}
            />}

            {openRescheduling && <Rescheduling
                handleOpenCustomerDetails={() => handleOpenCustomerDetails('')}
                openCustomerDetails={openCustomerDetails}
                openBookingDetails={openBookingDetails}
                orderNumber={orderNumber}
                handleOpenReschedule={() => handleOpenReschedule('')}
                openRescheduling={openRescheduling}
                setShowSuccessMessage={setShowSuccessMessage}
                setSucceedRescheduleOrderNumber={setSucceedRescheduleOrderNumber}

            />}

            {showSuccessMessage && (
                <div className='succes-message'>
                    <div className='flex items-center gap-2'>
                        <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        <p>Order {succeedRescheduleOrderNumber} has been canceled successfully</p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={12} height={12} />
                    </button>
                </div>
            )}


            {openCancelation && <Cancelation
                openCancelation={openCancelation}
                handleOpenCancelation={handleOpenCancelation}
                updateBookingStatus={updateBookingStatus}
                updateActiveBookingStatus={updateActiveBookingStatus}
                selectedNewBooking={selectedNewBooking}
                selectedActiveBooking={selectedActiveBooking}
                setShowSuccessCancelation={setShowSuccessCancelation}

            />}

            {showSuccessCancelation && (
                <div className='succes-message'>
                    <div className='max-lg:text-sm flex items-center gap-2'>
                        <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        <p>Order <span className='font-bold'>#132631</span> has been canceled successfully</p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={16} height={16} />
                    </button>
                </div>
            )}

            {openRefund && <Refund
                handleOpenRefund={handleOpenRefund}
                openRefund={openRefund}

            />}

            {showSuccessRefund && (
                <div className='succes-message'>
                    <div className='flex items-center gap-2'>
                        <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        <p>Refund of <span className='font-bold'>40.00 CHF</span> to <span className='font-bold'>Wilfred Anderson</span> processed successfully</p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={12} height={12} />
                    </button>
                </div>
            )}

        </div>
    )
}

export default Schedule;
import React from 'react';
import { useEffect, useState } from 'react';
import "./BookingDetails.scss"
import Image from 'next/image';

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

interface BookingDetailsProps {
    openBookingDetails: boolean;
    handleOpenBookingDetails: () => void;
    selectedTime: string | null;
    handleOpenCustomerDetails: () => void;
    openCustomerDetails: boolean;
    handleOpenReschedule: (orderId: string) => void;
    openRescheduling: boolean
    handleOpenCancelation: () => void;
    openCancelation: boolean;
    handleOpenRefund: () => void;
    openRefund: boolean;
    newBookings: NewBookings[];
    activeBookings: ActiveBookings[];
    handleCancelNewBookingClick: (newBooking: NewBookings) => void;
    handleCancelActiveBookingClick: (activeBooking: ActiveBookings) => void;
    updateBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    updateActiveBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    selectedNewBooking?: NewBookings | null;
    selectedActiveBooking?: NewBookings | null;
    setSelectedNewBooking: React.Dispatch<React.SetStateAction<NewBookings | null>>;
    setSelectedActiveBooking: React.Dispatch<React.SetStateAction<NewBookings | null>>;


}


const BookingDetails: React.FC<BookingDetailsProps> = ({
    openBookingDetails,
    handleOpenBookingDetails,
    selectedTime,
    handleOpenCustomerDetails,
    openCustomerDetails,
    handleOpenReschedule,
    openRescheduling,
    handleOpenCancelation,
    openCancelation,
    handleOpenRefund,
    openRefund,
    newBookings,
    activeBookings,
    handleCancelNewBookingClick,
    updateBookingStatus,
    selectedNewBooking,
    selectedActiveBooking,
    setSelectedNewBooking,
    setSelectedActiveBooking,
    updateActiveBookingStatus,
    handleCancelActiveBookingClick,

}) => {

    const [isToday, setIsToday] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [openDetailsInNew, setOpenDetailsInNew] = useState<number | null>(null)
    const [openDetailsInActive, setOpenDetailsInActive] = useState<number | null>(null)


    const bookingInfoTitles = [
        { title: "Customer" },
        { title: "Booking Type" },
        { title: "Status" },
    ]


    const toggleSwitch = () => {
        setIsToday(!isToday);
    };

    const toggleOpenDetailsInNew = (index: number) => {
        setOpenDetailsInNew(prevIndex => (prevIndex === index ? null : index))

    }

    const toggleOpenDetailsInActive = (index: number) => {
        setOpenDetailsInActive(prevIndex => (prevIndex === index ? null : index))

    }

    const handleConfirmNewBookingClick = (newBooking: NewBookings) => {
        setSelectedNewBooking(newBooking);
        setIsConfirmed(true)
    };

    useEffect(() => {
        if (selectedNewBooking && isConfirmed) {
            updateBookingStatus(selectedNewBooking.orderId, "Accepted");
            setIsConfirmed(false);
        }
    }, [selectedNewBooking]);


    return (
        <div className='block-booking-details'>
            <div className='booking-details'>
                <div className='title'>
                    <h2 >Booking Details For <span> {selectedTime}, 24 May, 2024 </span></h2>
                    <div onClick={handleOpenBookingDetails}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className='main-block'>
                    <div className="new-bookings-details">
                        <div className='title'>
                            <div className='amount'>
                                <p>2</p>
                            </div>
                            <p>New Bookings</p>
                        </div>
                        <div className="booking-titles">
                            {bookingInfoTitles.map((item, index) => (

                                <div className='info-name' key={index}>
                                    <p>{item.title}</p>
                                    <Image src="/images/bookingManage/chevron-up-icon.svg" alt='' width={12} height={12} />
                                </div>
                            ))}
                            <div className='details'></div>
                            {newBookings.map((item, index) => (
                                <div className="booking-row" key={index}>

                                    <div className="customer item">
                                        <div className="customer-info">
                                            <Image src={item.customer.image} alt="" width={24} height={24} />
                                            <p>{item.customer.name}</p>
                                        </div>
                                        <div className="indicator"></div>
                                    </div>
                                    <div className="booking-type item">
                                        <p>{item.bookingType}</p>
                                    </div>
                                    <div className="status item">
                                        {item.status === "Pending" ? (
                                            <div className='pending'>
                                                <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                                                <p>Pending</p>
                                            </div>
                                        ) : item.status === "Accepted" ? (
                                            <div className='accepted'>
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
                                    <div className={`details item  ${index === newBookings.length - 1 ? "last" : ""}`}>
                                        <button onClick={() => toggleOpenDetailsInNew(index)}>
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>
                                        <div className={`details-block ${openDetailsInNew === index ? "active" : ""}`}>
                                            <div className='confirm'>
                                                <button onClick={() => handleConfirmNewBookingClick(item)}>
                                                    <Image src="/images/bookingManage/confirm-icon.svg" alt='' width={20} height={20} />
                                                    Confirm Booking
                                                </button>
                                            </div>
                                            <div className='details-options'>
                                                <button onClick={handleOpenCustomerDetails}>
                                                    <Image src="/images/bookingManage/details-icon.svg" alt='' width={20} height={20} />
                                                    View Details
                                                </button>
                                                <button onClick={() => handleOpenReschedule(item.orderId)}>
                                                    <Image src="/images/bookingManage/schedule-icon.svg" alt='' width={20} height={20} />
                                                    Reschedule Appointment
                                                </button>
                                                <button onClick={() => handleOpenRefund()}>
                                                    <Image src="/images/bookingManage/refund-icon.svg" alt='' width={20} height={20} />
                                                    Refund
                                                </button>
                                            </div>
                                            <div className='cancel'>
                                                <button onClick={() => handleCancelNewBookingClick(item)}>
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
                    <div className="active-bookings-details">
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
                            {activeBookings.map((item, index) => (
                                <div className="booking-row" key={index}>
                                    <div className="customer item">
                                        <div className="customer-info">
                                            <Image src={item.customer.image} alt="" width={24} height={24} />
                                            <p>{item.customer.name}</p>
                                        </div>
                                    </div>
                                    <div className="booking-type item">
                                        <p>{item.bookingType}</p>
                                    </div>
                                    <div className="status item">
                                        {item.status === "Pending" ? (
                                            <div className='pending'>
                                                <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                                                <p>Pending</p>
                                            </div>
                                        ) : item.status === "Accepted" ? (
                                            <div className='accepted'>
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
                                    <div className={`details item ${index === activeBookings.length - 1 ? "last" : ""}`} >
                                        <button onClick={() => toggleOpenDetailsInActive(index)}>
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>
                                        <div className={`details-block ${openDetailsInActive === index ? "active" : ""}`}>
                                            <div className='details-options'>
                                                <button >
                                                    <Image src="/images/bookingManage/details-icon.svg" alt='' width={20} height={20} />
                                                    View Details
                                                </button>
                                                <button onClick={() => handleOpenReschedule(item.orderId)}>
                                                    <Image src="/images/bookingManage/schedule-icon.svg" alt='' width={20} height={20} />
                                                    Reschedule Appointment
                                                </button>
                                                <button onClick={() => handleOpenRefund()}>
                                                    <Image src="/images/bookingManage/refund-icon.svg" alt='' width={20} height={20} />
                                                    Refund
                                                </button>
                                            </div>
                                            <div className='cancel'>
                                                <button onClick={() => handleCancelActiveBookingClick(item)}>
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
                </div>
            </div>

        </div>
    )
}

export default BookingDetails;
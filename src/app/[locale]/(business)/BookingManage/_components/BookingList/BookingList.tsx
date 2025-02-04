import React from 'react';
import { useEffect, useState } from 'react';
import "./BookingList.scss"
import Image from 'next/image';
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
    orderNumber: string | null;
    handleOpenBookingDetails: (time: string) => void;
    handleOpenReschedule: (orderId: string) => void;
    openRescheduling: boolean;
    handleOpenCancelation: () => void;
    openCancelation: boolean;
    newBookings: NewBookings[];
    activeBookings: ActiveBookings[];
    updateBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    updateActiveBookingStatus: (orderId: string, newStatus: "Pending" | "Accepted" | "Canceled") => void;
    handleOpenRefund: () => void;
    openRefund: boolean;
    showSuccessRefund: boolean;


}



const BookingList: React.FC<ScheduleProps> = ({
    toggleViewMode,
    viewMode,
    handleOpenCustomerDetails,
    openCustomerDetails,
    orderNumber,
    handleOpenBookingDetails,
    handleOpenReschedule,
    openRescheduling,
    handleOpenCancelation,
    openCancelation,
    newBookings,
    activeBookings,
    updateBookingStatus,
    handleOpenRefund,
    openRefund,
    updateActiveBookingStatus,
    showSuccessRefund,

}) => {
    const [isToday, setIsToday] = useState(true);
    const [openDetailsInNew, setOpenDetailsInNew] = useState<number | null>(null)
    const [openDetailsInActive, setOpenDetailsInActive] = useState<number | null>(null)
    const [activeList, setActiveList] = useState<"new" | "active">("new");
    const [selectedNewBooking, setSelectedNewBooking] = useState<NewBookings | null>(null);
    const [selectedActiveBooking, setSelectedActiveBooking] = useState<ActiveBookings | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessCancelation, setShowSuccessCancelation] = useState(false);
    const [succeedRescheduleOrderNumber, setSucceedRescheduleOrderNumber] = useState<string | null>(null);



    const bookingInfoTitles = [
        { title: "Order" },
        { title: "Customer" },
        { title: "Booking Type" },
        { title: "Service Chosen" },
        { title: "Paid Amount" },
        { title: "Date" },
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

    const handleCancelClick = (newBooking: NewBookings) => {
        setSelectedNewBooking(newBooking);
        handleOpenCancelation()
        setOpenDetailsInNew(null)
        setSelectedActiveBooking(null)

    };

    const handleCancelActiveBookingClick = (activeBooking: ActiveBookings) => {
        setSelectedActiveBooking(activeBooking);
        handleOpenCancelation()
        setOpenDetailsInActive(null)
        setSelectedNewBooking(null)


    };

    return (
        <div className='booking-list-container'>
            <div className='top max-lg:!flex-col max-lg:!items-start max-lg:gap-5'>
                <h1>Bookings</h1>
                <div className='options max-lg:w-full'>
                    <div className='show-today max-lg:flex-1 max-lg:flex max-lg:justify-center' onClick={toggleSwitch}>
                        <div className={`switch-mode ${isToday ? "active" : ""}`}>
                            <div className={`circle ${isToday ? 'circle-right' : 'circle-left'}`}></div>
                        </div>
                        <p>Show Only Today</p>
                    </div>
                    <div className='filter-view'>
                        <button className='filter-btn'>
                            <Image src="/images/bookingManage/filter-icon.svg" alt='' width={14} height={14}></Image>
                            Filter
                        </button>
                        <button className='view-btn max-lg:!hidden' onClick={toggleViewMode}>
                            <Image src="/images/bookingManage/calendar-icon.svg" alt='' width={14} height={14}></Image>
                            View: Daily
                        </button>
                    </div>
                </div>
            </div>
            <div className="new-bookings">
                <div className='title'>
                    <div className='amount'>
                        <p>2</p>
                    </div>
                    <p>New Bookings</p>
                </div>
                <div className="booking-titles max-lg:!hidden">
                    {bookingInfoTitles.map((item, index) => (
                        <div className='info-name' key={index}>
                            <p>{item.title}</p>
                            <Image src="/images/bookingManage/chevron-up-icon.svg" alt='' width={12} height={12} />
                        </div>
                    ))}
                    <div className='details'></div>
                    {newBookings.map((item, index) => (
                        <div className="booking-row" key={index}>
                            <div className={`order-id item ${index === newBookings.length - 1 ? "last" : ""}`}>
                                <p>{item.orderId}</p>
                            </div>
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
                                    <div className='details-options'>
                                        <button onClick={() => handleOpenCustomerDetails(item.orderId)}>
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
                                        <button onClick={() => handleCancelClick(item)}>
                                            <Image src="/images/bookingManage/x-icon.svg" alt='' width={20} height={20} />
                                            Cancel Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='lg:hidden w-full !bg-white'>
                    {newBookings.map((service, index) => (
                        <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Image className='rounded-full' src={"/images/bookingManage/profile-picture.png"} alt='' width={24} height={24} />
                                    <h3 className='flex items-center gap-1 font-bold text-sm'>
                                        {service.customer.name}
                                    </h3>
                                </div>
                                <div className='flex !items-center gap-2'>
                                    <div className="indicator"></div>
                                    <div className={`details-mb flex items-center item  ${index === newBookings.length - 1 ? "last" : ""}`}>
                                        <button onClick={() => toggleOpenDetailsInNew(index)}>
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>
                                        <div className={`details-block-mb ${openDetailsInNew === index ? "active" : ""}`}>
                                            <div className='details-options'>
                                                <button onClick={() => handleOpenCustomerDetails(service.orderId)}>
                                                    <Image src="/images/bookingManage/details-icon.svg" alt='' width={20} height={20} />
                                                    View Details
                                                </button>
                                                <button onClick={() => handleOpenReschedule(service.orderId)}>
                                                    <Image src="/images/bookingManage/schedule-icon.svg" alt='' width={20} height={20} />
                                                    Reschedule Appointment
                                                </button>
                                                <button onClick={() => handleOpenRefund()}>
                                                    <Image src="/images/bookingManage/refund-icon.svg" alt='' width={20} height={20} />
                                                    Refund
                                                </button>
                                            </div>
                                            <div className='cancel'>
                                                <button onClick={() => handleCancelClick(service)}>
                                                    <Image src="/images/bookingManage/x-icon.svg" alt='' width={20} height={20} />
                                                    Cancel Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Order: <span className='text-[#000B19]'>{service.orderId}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Type: <span className='text-[#000B19]'>{service.bookingType}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Service: <span className='text-[#000B19]'>{service.chosenService}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Paid Amount: <span className='text-[#000B19]'>{service.paidAmount}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Date: <span className='text-[#000B19]'>{service.date}, {service.time}</span></p>
                                {service.status === "Pending" ? (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4'>Pending</span>
                                    </p>
                                ) : service.status === "Accepted" ? (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/check-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4 text-[#ABCF6F]'>Accepted</span>
                                    </p>
                                ) : (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/x-red-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4 text-[#D56C6C]'>Canceled</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="active-bookings">
                <div className='title'>
                    <div className='amount'>
                        <p>9</p>
                    </div>
                    <p>Active Orders</p>
                </div>
                <div className="booking-titles max-lg:!hidden">
                    {bookingInfoTitles.map((item, index) => (

                        <div className='info-name' key={index}>
                            <p>{item.title}</p>
                            <Image src="/images/bookingManage/chevron-up-icon.svg" alt='' width={12} height={12} />
                        </div>
                    ))}
                    <div className='details'></div>
                    {activeBookings.map((item, index) => (
                        <div className="booking-row" key={index}>
                            <div className={`order-id item ${index === activeBookings.length - 1 ? "last" : ""}`}>
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
                                        <button onClick={() => handleOpenCustomerDetails(item.orderId)}>
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
                <div className='lg:hidden w-full !bg-white'>
                    {activeBookings.map((service, index) => (
                        <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Image className='rounded-full' src={"/images/bookingManage/profile-picture.png"} alt='' width={24} height={24} />
                                    <h3 className='flex items-center gap-1 font-bold text-sm'>
                                        {service.customer.name}
                                    </h3>
                                </div>
                                <div className='flex !items-center '>
                                    <div className={`details-mb flex items-center item  ${index === activeBookings.length - 1 ? "last" : ""}`}>
                                        <button onClick={() => toggleOpenDetailsInActive(index)}>
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>
                                        <div className={`details-block-mb ${openDetailsInActive === index ? "active" : ""}`}>
                                            <div className='details-options'>
                                                <button onClick={() => handleOpenCustomerDetails(service.orderId)}>
                                                    <Image src="/images/bookingManage/details-icon.svg" alt='' width={20} height={20} />
                                                    View Details
                                                </button>
                                                <button onClick={() => handleOpenReschedule(service.orderId)}>
                                                    <Image src="/images/bookingManage/schedule-icon.svg" alt='' width={20} height={20} />
                                                    Reschedule Appointment
                                                </button>
                                                <button onClick={() => handleOpenRefund()}>
                                                    <Image src="/images/bookingManage/refund-icon.svg" alt='' width={20} height={20} />
                                                    Refund
                                                </button>
                                            </div>
                                            <div className='cancel'>
                                                <button onClick={() => handleCancelClick(service)}>
                                                    <Image src="/images/bookingManage/x-icon.svg" alt='' width={20} height={20} />
                                                    Cancel Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Order: <span className='text-[#000B19]'>{service.orderId}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Type: <span className='text-[#000B19]'>{service.bookingType}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Service: <span className='text-[#000B19]'>{service.chosenService}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Paid Amount: <span className='text-[#000B19]'>{service.paidAmount}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Date: <span className='text-[#000B19]'>{service.date}, {service.time}</span></p>
                                {service.status === "Pending" ? (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4'>Pending</span>
                                    </p>
                                ) : service.status === "Accepted" ? (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/check-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4 text-[#ABCF6F]'>Accepted</span>
                                    </p>
                                ) : (
                                    <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97] flex items-center gap-1'>
                                        <span>Status: </span>
                                        <Image src="/images/bookingManage/x-red-icon.svg" alt="" width={16} height={16} />
                                        <span className='pr-4 text-[#D56C6C]'>Canceled</span>
                                    </p>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openCustomerDetails && <CustomerDetails
                openBookingDetails={openCustomerDetails}
                handleOpenCustomerDetails={() => handleOpenCustomerDetails('')}
                openCustomerDetails={openCustomerDetails}
                orderNumber={orderNumber}
                handleOpenReschedule={() => handleOpenReschedule('')}
                openRescheduling={openRescheduling}
            />}

            {openRescheduling && <Rescheduling
                openBookingDetails={openCustomerDetails}
                handleOpenCustomerDetails={() => handleOpenCustomerDetails('')}
                openCustomerDetails={openCustomerDetails}
                orderNumber={orderNumber}
                handleOpenReschedule={() => handleOpenReschedule('')}
                openRescheduling={openRescheduling}
                setShowSuccessMessage={setShowSuccessMessage}
                setSucceedRescheduleOrderNumber={setSucceedRescheduleOrderNumber}
            />}

            {showSuccessMessage && (
                <div className='succes-message'>
                    <div className='max-lg:text-sm flex items-center gap-2'>
                        <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        <p>Order <span className='font-bold'>{succeedRescheduleOrderNumber}</span> has been rescheduled successfully</p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={16} height={16} />
                    </button>
                </div>
            )}

            {openCancelation && <Cancelation
                openCancelation={openCancelation}
                handleOpenCancelation={handleOpenCancelation}
                selectedNewBooking={selectedNewBooking}
                selectedActiveBooking={selectedActiveBooking}
                updateBookingStatus={updateBookingStatus}
                updateActiveBookingStatus={updateActiveBookingStatus}
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
                    <div className='max-lg:text-sm flex items-center gap-2'>
                        <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        <p>Refund of <span className='font-bold'>40.00 CHF</span> to <span className='font-bold'>Wilfred Anderson</span> processed successfully</p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={16} height={16} />
                    </button>
                </div>
            )}


        </div>
    )
}

export default BookingList;
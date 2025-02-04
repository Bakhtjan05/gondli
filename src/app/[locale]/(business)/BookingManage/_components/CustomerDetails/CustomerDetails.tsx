import React from 'react';
import { useEffect, useState } from 'react';
import "./CustomerDetails.scss"
import Image from 'next/image';

interface CustomerDetailsProps {
    openBookingDetails: boolean;
    handleOpenCustomerDetails: () => void;
    orderNumber: string | null;
    openCustomerDetails: boolean;
    handleOpenReschedule?: () => void;
    openRescheduling: boolean

}


const CustomerDetails: React.FC<CustomerDetailsProps> = ({
    openBookingDetails,
    handleOpenCustomerDetails,
    orderNumber,
    openCustomerDetails,
    handleOpenReschedule,
    openRescheduling,

}) => {

    const bookingDetailsData = [
        { value: "Gentle Flow Yoga Class", label: "Chosen Service" },
        {
            value: "Winifred Wuckert",
            label: "Chosen Masseur",
            icon: "/images/booking/star.svg",
            rating: "9.2",
        },
        { value: "24 July, 2024", label: "Chosen Date" },
        { value: "11:30", label: "Chosen Start Time" },
        { value: "HMEEYXCZA5", label: "Confirmation Code" },
    ]

    const profileData = [
        { name: "Sam Maiz", email: "sammeiz@VideoEncoder.com", status: true, },
        { name: "Myrtle Shields", email: "sammeiz@VideoEncoder.com", status: false, },
        { name: "Miranda Hand", email: "sammeiz@VideoEncoder.com", status: false, },
    ]

    const extraOptionsData = [
        { icon: "/images/booking/candle-scent-icon.svg", title: "Candle Scent", value: "Any Scent" },
        { icon: "/images/booking/oil-icon.svg", title: "Oil Type", value: "Any Oil" },
        { icon: "/images/booking/fragrance-icon.svg", title: "Fragrance Type", value: "Any Fragrance" },
    ]

    const paymentData = [
        {
            className: "payment-method",
            icon: "/images/booking/visa.png",
            cardNumber: "2561",
            value: "",
            label: "Payment Method",
        },
        {
            className: "for-choosen-service",
            value: "40.00 CHF",
            label: "For Chosen Service",
        },
        {
            className: "service-fee",
            value: "10.00 CHF",
            label: "Service Fee",
        },
        {
            className: "total-cost",
            value: "50.00 CHF",
            label: "Total Cost",
        },
    ];





    return (
        <div className='block-customer-details'>
            <div className='order-info'>
                <div className='title'>
                    <h2>Order {orderNumber}</h2>
                    <div onClick={handleOpenCustomerDetails}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="infos-section">
                    <div className='customer-details'>
                        <div className="details-block">
                            <h3>Customer Details</h3>
                            <div className="customer-info">
                                <div className='name-date max-lg:flex-col max-lg:!items-start max-lg:gap-5'>
                                    <div className='left-side'>
                                        <div>
                                            <Image src="/images/BookingManage/profile-picture.png" alt='' width={40} height={40} />
                                        </div>
                                        <div>
                                            <p className='name'>Samantha Lawrey <Image src="/images/BookingManage/yoga-icon.svg" alt='' width={32} height={32} /></p>
                                            <p className='date'>Customer Since 24 Aug, 2023</p>
                                        </div>
                                    </div>
                                    <div className='right-side max-lg:w-full'>
                                        <div className='status max-lg:flex-1 max-lg:justify-center'>
                                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={16} height={16} />
                                            <p>Accepted</p>
                                        </div>
                                        <div className="extra-info">
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt='' width={16} height={16} />
                                        </div>
                                    </div>
                                </div>
                                <div className="email">
                                    <p>Samanthalaw@gmail.com</p>
                                    <p>Email</p>
                                </div>
                                <div className="number">
                                    <p>+41 052 694-58-89</p>
                                    <p>Phone Number</p>
                                </div>
                                <div className="comment">
                                    <p>-</p>
                                    <p>Additional Comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-details">
                        <h3>Booking Details</h3>
                        <div className="block">
                            {bookingDetailsData.map((item, index) => (
                                <div key={index} className="detail-block">
                                    <p className='star'>
                                        {item.value}
                                        {item.icon && (
                                            <>
                                                <span className="dot"></span>
                                                <span>
                                                    <Image src={item.icon} alt="" width={16} height={16} />
                                                </span>
                                                <span className="rating">{item.rating}</span>
                                            </>
                                        )}
                                    </p>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="coming-with">
                        <h3>Coming With</h3>
                        <div className="block">
                            {profileData.map((item, index) => (
                                <div className='profile ' key={index}>
                                    <div className='left-side w-full max-lg:!items-start'>
                                        <div>
                                            <Image src="/images/BookingManage/profile-picture.png" alt='' width={40} height={40} />
                                        </div>
                                        <div className='flex justify-between w-full max-lg:flex-col max-lg:!items-start max-lg:gap-2'>
                                            <div>
                                                <p className='name'>{item.name}</p>
                                                <p className='date'>{item.email}</p>
                                            </div>
                                            {item.status ? (
                                                <div className="status-accepted">
                                                    <div>
                                                        <Image src="/images/bookingManage/check-icon.svg" alt="" width={16} height={16} />
                                                        <p>Accepted</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="status-pending">
                                                    <div>
                                                        <Image src="/images/bookingManage/clock-icon.svg" alt="" width={16} height={16} />
                                                        <p>Pending</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="extra-options">
                        <h3>Extra Options</h3>
                        <div className="block">
                            {extraOptionsData.map((item, index) => (
                                <div className='option' key={index}>
                                    <div className='left-side'>
                                        <div>
                                            <Image src={item.icon} alt='' width={20} height={20} />
                                        </div>
                                        <div>
                                            <p className='option-value'>{item.value}</p>
                                            <p className='option-title'>{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="payment-details">
                        <h3>Payment Details</h3>
                        <div className="block">
                            {paymentData.map((item, index) => (
                                <div key={index} className="details">
                                    {item.icon ? (
                                        <div className='payment-method'>
                                            <div className='left-side'>
                                                <div className='top'>
                                                    <div className="method-icon">
                                                        <Image src={item.icon} alt="" width={20} height={8} />
                                                    </div>
                                                    {item.cardNumber && <span>****</span>}
                                                    {item.cardNumber && <p>{item.cardNumber}</p>}
                                                </div>
                                                <p>{item.label}</p>
                                            </div>
                                            <div className="right-side">
                                                <button> <Image src="/images/bookingManage/refresh-icon.svg" alt='' width={10} height={10} />Refund</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className={` ${index === paymentData.length - 1 ? "font-bold" : ""}`}>{item.value}</p>
                                            <p className={` ${index === paymentData.length - 1 ? "font-bold !text-[#000B19]" : ""}`}>{item.label}</p>
                                        </>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CustomerDetails;
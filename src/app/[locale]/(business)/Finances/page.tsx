"use client"


import React, { useEffect, useRef, useState } from 'react';
import "./page.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ChartDiagram from './_components/ChartDiagram/ChartDiagram';
import CompletePayout from './_components/CompletePayout/CompletePayout';
import RecurringPayouts from './_components/RecurringPayouts/RecurringPayouts';

interface NewBookings {
    cardNumber: string;
    amount: number;
    fee: number;
    balanceLeft: number;
    date: string;
}


interface FinancesProps {

}

const Finances: React.FC = () => {
    const t = useTranslations();

    const [openRecurringPayouts, setOpenRecurringPayouts] = useState(false)
    const [showSuccessRecurringPayouts, setShowSuccessRecurringPayouts] = useState(false);


    const [newBookingInfo, setNewBookingInfo] = useState<NewBookings[]>([
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",

        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },
        {
            cardNumber: "4032323132219444",
            amount: 305.56,
            fee: 4.30,
            balanceLeft: 0.96,
            date: "24 May, 2024",
        },

    ])


    const bookingInfoTitles = [
        { title: "On card" },
        { title: "Amount" },
        { title: "Fee" },
        { title: "Balance Left" },
        { title: "Date" },

    ]

    const toggleOpenRecurringPayouts = () => {
        setOpenRecurringPayouts((prev) => !prev)

    }


    return (
        <main className='finances'>
            <ChartDiagram />
            <CompletePayout />
            <div className='finance-action-buttons max-lg:!flex-col max-lg:!items-start max-lg:!gap-3'>
                <p className='title'>Payouts</p>
                <div className='button-group'>
                    <div className='filter-search-wrapper'>
                        <button className='button-wrapper-1'>
                            <Image
                                src={'/images/services/filter.svg'}
                                width={14}
                                height={14}
                                alt='filter'
                                className='filter-icon'
                            />
                            <div className='button-text'>{t('filter')}</div>
                        </button>

                        <div className='search-field'>
                            <div className='search-input'>
                                <input
                                    placeholder={t('Search')}
                                    type='text'
                                    className=''

                                />
                            </div>
                            <div className='search-btn'>
                                <Image
                                    src={'/images/services/search.svg'}
                                    width={14}
                                    height={14}
                                    alt='search'
                                    className='search-icon'

                                />
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='add-service-wrapper'>
                        <button
                            className='button-wrapper-2'
                            onClick={toggleOpenRecurringPayouts}
                        >
                            <Image
                                src={'/images/finance-page/upload-icon.svg'}
                                width={16}
                                height={16}
                                alt='add service'
                                className='add-icon'
                            />
                            <div className='button-text'>Set Recurring Payouts</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="new-bookings">

                <div className="booking-titles max-lg:!hidden">
                    {bookingInfoTitles.map((item, index) => (

                        <div className='info-name' key={index}>
                            <p>{item.title}</p>
                            <Image src="/images/bookingManage/chevron-up-icon.svg" alt='' width={12} height={12} />
                        </div>
                    ))}
                    <div className='details'></div>
                    {newBookingInfo.map((item, index) => (
                        <div className="booking-row" key={index}>
                            <div className={`order-id item ${index === newBookingInfo.length - 1 ? "last" : ""}`}>
                                <div className='payment-icon'>
                                    <Image src={"/images/finance-page/mastercard-icon.svg"} alt='' width={24} height={14} />
                                </div>
                                <p>{"•••• " + item.cardNumber.slice(-4, 0) + " " + item.cardNumber.slice(-4)}</p>

                            </div>
                            <div className="customer item">
                                <div className="customer-info">
                                    <p>{item.amount} CHF</p>
                                </div>

                            </div>
                            <div className="booking-type item">
                                <p>{item.fee} CHF</p>
                            </div>
                            <div className="chosen-service item">
                                <p>{item.balanceLeft} CHF</p>
                            </div>
                            <div className="date item">
                                <p>{item.date}</p>
                            </div>
                            <div className={`details item  ${index === newBookingInfo.length - 1 ? "last" : ""}`}>
                                <button >
                                    <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                </button>
                                {/* <div className={`details-block ${openDetailsInNew === index ? "active" : ""}`}>
                                    <div className='details-options'>
                                        <button onClick={() => toggleOpenConfirmBlock(item.customer.name)}>
                                            <Image src="/images/bookingManage/hide-icon.svg" alt='' width={20} height={20} />
                                            Block User
                                        </button>
                                        <button onClick={() => toggleOpenReportUser(item.customer.name)}>
                                            <Image src="/images/bookingManage/report-icon.svg" alt='' width={20} height={20} />
                                            Report User
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    ))}

                </div>
                <div className='lg:hidden w-full !bg-white'>
                    {newBookingInfo.map((service, index) => (
                        <div className=' !py-4 !px-5 border-b border-[#DBECF0]' key={index}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Image className='rounded-full' src={"/images/bookingManage/profile-picture.png"} alt='' width={24} height={24} />
                                    <h3 className='flex items-center gap-1 font-bold text-sm'>
                                        {service.cardNumber}
                                    </h3>
                                </div>

                                <div className='flex !items-center '>
                                    <div className={`details-customer item  ${index === newBookingInfo.length - 1 ? "last" : ""}`}>
                                        <button >
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>

                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Amount: <span className='text-[#000B19]'>{service.amount}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Fee: <span className='text-[#000B19]'>{service.fee}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Balance Left: <span className='text-[#000B19]'>{service.balanceLeft}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Date: <span className='text-[#000B19]'>{service.date}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openRecurringPayouts && <RecurringPayouts
                setOpenRecurringPayouts={setOpenRecurringPayouts}
                setShowSuccessRecurringPayouts={setShowSuccessRecurringPayouts}


            />}

            {showSuccessRecurringPayouts && (
                <div className='succes-message'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />

                        </div>
                        <p className='max-lg:text-sm '>
                            Reccuring Payouts has been set-up successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}
        </main>
    )
}

export default Finances
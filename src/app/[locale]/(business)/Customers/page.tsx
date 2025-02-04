"use client"

import React, { useState } from 'react';
import "./page.scss"
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ConfirmBlock from './_components/ConfirmBlock/ConfirmBlock';
import ReportUser from './_components/ReportUser/ReportUser';

interface NewBookings {
    orderId: string;
    customer: { name: string; image: string };
    bookingMade: string;
    spentAmount: string;
}

const Customer: React.FC = () => {
    const t = useTranslations();

    const [openDetailsInNew, setOpenDetailsInNew] = useState<number | null>(null)
    const [openConfirmBlock, setOpenConfirmBlock] = useState(false)
    const [openReportUser, setOpenReportUser] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessReport, setShowSuccessReport] = useState(false)
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedNameReport, setSelectedNameReport] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);


    const [newBookingInfo, setNewBookingInfo] = useState<NewBookings[]>([
        {
            orderId: "#132631",
            customer: {
                name: "Wilfred Howe",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Rachael Bogisich",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Tiffany Keefe",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Belinda Hane",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Wilfred Anderson",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Lydia Satterfield",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Jamie Carter",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Noah Jakubowski",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },
        {
            orderId: "#132631",
            customer: {
                name: "Sheila Cummings",
                image: "/images/bookingManage/profile-picture.png",
            },
            bookingMade: "Individual",
            spentAmount: "Gentle Flow Yoga Class",

        },

    ])

    const bookingInfoTitles = [
        { title: "ID" },
        { title: "Customer" },
        { title: "Booking Made" },
        { title: "Spent Amount" },

    ]

    const toggleOpenDetailsInNew = (index: number) => {
        setOpenDetailsInNew(prevIndex => (prevIndex === index ? null : index))

    }

    const toggleOpenConfirmBlock = (name: string) => {
        setOpenConfirmBlock((prev) => !prev)
        setSelectedName(name)

    }

    const toggleOpenReportUser = (name: string) => {
        setOpenReportUser((prev) => !prev)
        setSelectedNameReport(name)
    }

    return (
        <main className='customers'>
            <div className='action-buttons max-lg:!flex-col max-lg:!items-start max-lg:!gap-5'>
                <p className='title'>{t('Customers')}</p>
                <div className='button-group max-lg:!w-full'>
                    <div className='filter-search-wrapper max-lg:!w-full'>
                        <button className='button-wrapper-1 max-lg:!w-full max-lg:!justify-center'>
                            <Image
                                src={'/images/services/filter.svg'}
                                width={14}
                                height={14}
                                alt='filter'
                                className='filter-icon'
                            />
                            <div className='button-text'>{t('filter')}</div>
                        </button>

                        <div className={`search-field-cusotmers max-lg:!w-full bg-white ${!isFocused ? 'max-lg:!justify-center' : 'max-lg:!justify-start max-lg:!pl-2'} relative`}>
                            <div className='search-btn'>
                                <Image
                                    src='/images/services/search.svg'
                                    width={14}
                                    height={14}
                                    alt='search'
                                    className={`}`}
                                />
                            </div>

                            <div className='search-input-cusotmers'>
                                <input
                                    type='text'
                                    placeholder={t('Search')}
                                    className={`  focus:outline-none max-lg:!text-sm ${!isFocused ? '' : 'max-lg:!w-full'}`}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className="new-bookings">
                <div className='title'>
                    <div className='amount'>
                        <p>{newBookingInfo.length}</p>
                    </div>
                    <p>Active Customers</p>
                </div>
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
                                <p>{item.orderId}</p>
                            </div>
                            <div className="customer item">
                                <div className="customer-info">
                                    <Image src={item.customer.image} alt="" width={24} height={24} />
                                    <p>{item.customer.name}</p>
                                </div>

                            </div>
                            <div className="booking-type item">
                                <p>{item.bookingMade}</p>
                            </div>
                            <div className="chosen-service item">
                                <p>{item.spentAmount}</p>
                            </div>
                            <div className={`details-customer item  ${index === newBookingInfo.length - 1 ? "last" : ""}`}>
                                <button onClick={() => toggleOpenDetailsInNew(index)}>
                                    <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                </button>
                                <div className={`details-customer-block ${openDetailsInNew === index ? "active" : ""}`}>
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
                                </div>
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
                                        {service.customer.name}
                                    </h3>
                                </div>

                                <div className='flex !items-center '>
                                    <div className={`details-customer item  ${index === newBookingInfo.length - 1 ? "last" : ""}`}>
                                        <button onClick={() => toggleOpenDetailsInNew(index)}>
                                            <Image src="/images/bookingManage/horizontal-dots.svg" alt="" width={18} height={18} />
                                        </button>
                                        <div className={`details-customer-block ${openDetailsInNew === index ? "active" : ""}`}>
                                            <div className='details-options'>
                                                <button onClick={() => toggleOpenConfirmBlock(service.customer.name)}>
                                                    <Image src="/images/bookingManage/hide-icon.svg" alt='' width={20} height={20} />
                                                    Block User
                                                </button>
                                                <button onClick={() => toggleOpenReportUser(service.customer.name)}>
                                                    <Image src="/images/bookingManage/report-icon.svg" alt='' width={20} height={20} />
                                                    Report User
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-[6px] mt-3 items-center !overflow-x-auto min-w-full'>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>ID: <span className='text-[#000B19]'>{service.orderId}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Bookings Made: <span className='text-[#000B19]'>{service.bookingMade}</span></p>
                                <p className='px-[10px] py-[8px] rounded-3xl border border-[#ECEDEF] text-nowrap text-sm text-[#878E97]'>Spent Amount: <span className='text-[#000B19]'>{service.spentAmount}</span></p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openConfirmBlock && <ConfirmBlock
                setOpenConfirmBlock={setOpenConfirmBlock}
                setShowSuccessMessage={setShowSuccessMessage}
                newBookingInfo={newBookingInfo}
                selectedName={selectedName}
            />}

            {showSuccessMessage && (
                <div className='succes-customer '>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        </div>
                        <p className='max-lg:text-sm '>
                            User <span>{selectedName}</span> has been blocked successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}


            {openReportUser && <ReportUser
                setOpenReportUser={setOpenReportUser}
                setShowSuccessReport={setShowSuccessReport}
                selectedNameReport={selectedNameReport}

            />}

            {showSuccessReport && (
                <div className='succes-customer max-lg:!w-11/12'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image src="/images/bookingManage/check-circle.svg" alt='' width={20} height={20} />
                        </div>
                        <p>
                            User <span>{selectedNameReport}</span> has been reported successfully
                        </p>
                    </div>
                    <button>
                        <Image src="/images/bookingManage/x-outline.svg" alt='' width={20} height={20} />
                    </button>
                </div>
            )}


        </main>
    );
};

export default Customer;
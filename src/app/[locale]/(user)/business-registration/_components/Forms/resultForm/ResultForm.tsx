/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './ResultForm.scss';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


interface ResultFormProps {
    formData: {
        candleNames: string;
        oilNames: string;
        fragranceNames: string;
    };

}

export default function ResultForm({ formData }: ResultFormProps) {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);



    const servicesData = [
        {
            serviceName: "Yoga",
            services: [
                {
                    name: "Gentle Flow Yoga Class",
                    time: "60 Minutes",
                    price: "35.00 CHF"
                },
                {
                    name: "Power Vinyasa Yoga Workshop",
                    time: "75 Minutes",
                    price: "35.00 CHF"
                },
                {
                    name: "Gentle Flow Yoga Class",
                    time: "60 Minutes",
                    price: "40.00 CHF"
                },
            ]
        },
        {
            serviceName: "Spa",
            services: [
                {
                    name: "Tranquil Relaxation Massage",
                    time: "60 Minutes",
                    price: "35.00 CHF"
                },
                {
                    name: "Revitalizing Aromatherapy Facial",
                    time: "75 Minutes",
                    price: "35.00 CHF"
                },
            ]
        },
        {
            serviceName: "Yoga",
            services: [
                {
                    name: "Gentle Flow Yoga Class",
                    time: "60 Minutes",
                    price: "35.00 CHF"
                },
                {
                    name: "Power Vinyasa Yoga Workshop",
                    time: "75 Minutes",
                    price: "35.00 CHF"
                },
                {
                    name: "Gentle Flow Yoga Class",
                    time: "60 Minutes",
                    price: "40.00 CHF"
                },
            ]
        },
    ]

    const amenitiesData = [
        { name: "Free Parking" },
        { name: "Air-Conditioned Spaces" },
        { name: "Cozy Lounge" },
        { name: "Pet-Friendly Policy" },
        { name: "Wi-Fi" },
        { name: "Hydration Stations" },
        { name: "Indoor Bar" },

    ]

    const images = [
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
        "/images/services/mainBanner.svg",
    ];

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        console.log("Clicked");

    };

    const shortText =
        "Welcome to Harmony Haven, where tranquility meets rejuvenation in the heart of Zurich's serene Seefeld district. Nestled in the midst of...";

    const fullText =
        "Welcome to Harmony Haven, where tranquility meets rejuvenation in the heart of Zurich's serene Seefeld district. Nestled in the midst of picturesque landscapes and overlooking the calming waters of Lake Zurich, our wellness center is a sanctuary dedicated to enhancing your overall well-being. At Harmo";

    return (
        <div className='form-eleven-main flex justify-center max-lg:!my-0'>
            <div className='w-full max-w-[800px] '>
                <FormHeader
                    title={"Congratulations! Your profile is ready!"}
                    desc={"Your Service Provider's profile is ready and one click away to publish..."}
                />


                <div className='form-eleven-box z-10 rounded-3xl gradient-border glass-border'>
                    <div className='max-lg:!hidden'>
                        <h1 className='mt-2 font-semibold text-[28px] max-lg:!text-xl'>Harmony Haven Wellness Center</h1>
                        <div className='flex items-center mt-3'>
                            <Image src={"/images/searchInput/star-icon.svg"} alt='' width={16} height={16} />
                            <p className='text-[#F4B003] ms-1 max-lg:!text-sm'>10.0</p>
                            <div className='w-[3px] h-[3px] rounded-full bg-[#ACBFC3] ms-[10px]'></div>
                            <p className='ms-[10px] max-lg:!text-sm'>$$<span className='text-[#ACBFC3]'>$$</span></p>
                            <div className='w-[3px] h-[3px] rounded-full bg-[#ACBFC3] ms-[10px]'></div>
                            <p className='ms-[10px] max-lg:!text-sm'>Seefeld</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-5 grid-rows-[131px_131px] gap-x-[6px] mt-[24px] max-lg:!hidden'>
                        <div className='grid-block col-start-1 col-end-4 row-span-2 rounded-2xl border border-[#ff2c2c]'>
                            <Image className='w-full h-full object-cover rounded-2xl' src={"/images/searchInput/image.png"} alt='' width={600} height={600}></Image>
                        </div>
                        <div className='grid-block col-start-4 col-end-6 row-span-1 rounded-2xl border border-[#4B7F8B]'>
                            <Image className='w-full h-full object-cover rounded-2xl' src={"/images/searchInput/image.png"} alt='' width={300} height={100}></Image>
                        </div>
                        <div className='grid-block col-start-4 col-end-5 row-span-2 mt-[6px] rounded-2xl border border-[#4B7F8B]'>
                            <Image className='w-full h-full object-cover rounded-2xl' src={"/images/searchInput/image.png"} alt='' width={300} height={300}></Image>
                        </div>
                        <div className='grid-block cursor-pointer last-image-bg border border-[#4B7F8B] flex flex-col items-center justify-center mt-[6px] col-start-5 col-end-6 row-span-2 rounded-2xl '>
                            <div>
                                <Image src={"/images/searchInput/image-icon.png"} alt='' width={32} height={32}></Image>
                            </div>
                            <p className='mt-2 text-sm'>See all photos</p>
                        </div>
                    </div>
                    <div className="slider relative w-full mx-auto lg:!hidden">
                        {/* Slider */}
                        <Swiper
                            modules={[Navigation]}
                            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                            className="rounded-lg overflow-hidden"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        width={375}
                                        height={211}
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Pagination */}
                        <div className="absolute blake z-10 bottom-4 left-1/2 transform -translate-x-1/2  text-white ">
                            <div className='heart-icon-block w-auto h-auto px-[10px] py-[6px] rounded-full bg-[#0000004D] flex justify-center items-center'>
                                <p className='max-lg:!text-sm'>{currentIndex + 1} / {images.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:!hidden mt-3'>
                        <h1 className='mt-2 font-semibold text-[28px] max-lg:!text-xl'>Harmony Haven Wellness Center</h1>
                        <div className='flex items-center mt-3 max-lg:!mt-2'>
                            <Image src={"/images/searchInput/star-icon.svg"} alt='' width={16} height={16} />
                            <p className='text-[#F4B003] ms-1 max-lg:!text-sm'>10.0</p>
                            <div className='w-[3px] h-[3px] rounded-full bg-[#ACBFC3] ms-[10px]'></div>
                            <p className='ms-[10px] max-lg:!text-sm'>$$<span className='text-[#ACBFC3]'>$$</span></p>
                            <div className='w-[3px] h-[3px] rounded-full bg-[#ACBFC3] ms-[10px]'></div>
                            <p className='ms-[10px] max-lg:!text-sm'>Seefeld</p>
                        </div>
                    </div>
                    <p className='mt-6 font-[600] max-lg:!hidden'>About The Space</p>
                    <p className="mt-6 max-lg:!text-sm" >
                        {isExpanded ? fullText : shortText}{' '}
                        <button
                            onClick={handleToggle}
                            type="button"
                            className="font-bold z-[999]"
                        >
                            {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                    </p>
                    <div className='flex items-center justify-between mt-8 pb-6 border-b border-[#607C82] max-lg:!flex-col max-lg:!items-start max-lg:!gap-5'>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 !border-[#739097] rounded-full'>
                                <Image src={"/images/searchInput/virta.png"} alt='' width={40} height={40} />
                            </div>
                            <div>
                                <p className='flex items-center gap-[2px] max-lg:!text-sm'>
                                    Hosted By Vitra
                                    <Image src={"/images/searchInput/check-green-badge.svg"} alt='' width={20} height={20} />
                                </p>
                                <p className='text-[#ACBFC3] mt-1 text-sm'>Member Since 16 Aug, 2023</p>
                            </div>
                        </div>
                        <div className='flex gap-3 max-lg:!w-full'>
                            <button
                                className='footer-preview max-lg:!flex-1 max-lg:!text-sm max-lg:!text-center max-lg:!flex max-lg:!justify-center'
                            >
                                Venue Insights
                            </button>
                            <button
                                className='footer-next cursor-pointer max-lg:!flex-1 max-lg:!text-sm max-lg:!text-center'
                            >
                                Follow
                            </button>
                        </div>
                    </div>
                    <div className='services py-6 border-b border-[#607C82]'>
                        <p className='font-semibold max-lg:!text-sm'>Services</p>
                        {servicesData.map((item, index) => (
                            <div key={index}>
                                <div className='flex gap-2 mt-6'>
                                    <p className='max-lg:!text-sm'>{item.serviceName}</p>
                                </div>
                                <div className='ps-[20px] py-2 ms-[10px] border-s border-[#607C82] mt-3 flex flex-col gap-4'>
                                    {item.services.map((val, ind) => (
                                        <div key={val.name + ind} className=' flex items-center justify-between max-lg:!gap-5'>
                                            <div className='max-lg:!flex-1'>
                                                <p className='max-lg:!text-sm max-[400px]:!max-w-40 !whitespace-nowrap !text-ellipsis !overflow-hidden'>{val.name}</p>
                                                <p className='text-sm text-[#ACBFC3]'>{val.time}</p>
                                            </div>
                                            <div className=''>
                                                <p className='max-lg:!text-sm '>{val.price}</p>
                                                <p className='text-sm'>per sesssion</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="amenities mt-6 pb-6 border-b border-[#607C82]">
                        <p className='font-semibold max-lg:!text-sm'>Amenities</p>
                        <div className='grid grid-cols-2 gap-y-6 mt-6 max-lg:!grid-cols-1 max-lg:!pl-5 max-lg:!ml-[10px] max-lg:!border-l max-lg:!border-l-[#607C82]'>
                            {amenitiesData.map((item, index) => (
                                <div key={index} className='flex-1 flex gap-[10px] items-center'>
                                    <Image src={"/images/searchInput/lear.svg"} alt='' width={20} height={20} />
                                    <p className='max-lg:!text-sm'>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="location">
                        <p className='font-semibold mt-6 max-lg:!text-sm'>Amenities</p>
                        <p className='mt-6 max-lg:!text-sm'>Harmony Haven Wellness Center, 65 Tranquil Terrace, CH-8003 Zurich, Switzerland</p>
                        <div className='w-full h-[329px] max-lg:!h-52'>
                            <iframe className='w-full h-full rounded-2xl mt-4 max-lg:!mt-3' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21629.701930694486!2d8.509508935015104!3d47.33948113662698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479009d845d42b91%3A0x7db4358e76bb3faa!2z0JLQvtC70LvQuNGB0YXQvtGE0LXQvSwg0KbRjtGA0LjRhSwg0KjQstC10LnRhtCw0YDQuNGP!5e0!3m2!1sru!2s!4v1730910856396!5m2!1sde!2s&hl=de" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client"

import React, { useState } from 'react';
import './ForBusiness.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
const ForBusiness: React.FC = () => {
    const t = useTranslations();

    const [activeIndex, setActiveIndex] = useState(0);


    const buttons = [
        'Manage Bookings Easily',
        'Control Your Services',
        'Answer Customer Inquiries'
    ];

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    const images = [
        "/images/home/home-choose-1.png",
        "/images/home/home-choose-2.png",
        "/images/home/home-choose-3.png"
    ];

    return (
        <React.Fragment>
            <div
                className='locationServices bg-[#0C343D] relative text-white'
                style={{

                    minHeight: '350px',
                    padding: '120px 90px 0px',
                }}
            >
                <div className='absolute right-0 bottom-0 z-0'>
                    <Image src={"/images/home/gondli-mountains.png"} alt='' width={400} height={400} />
                </div>
                <div className='relative z-10 flex flex-col items-center text-center overflow-hidden'>
                    <h1 className='text-[40px] font-semibold flex items-center gap-3'>
                        <Image src={"/images/home/logo.png"} alt='' width={149} height={33} />
                        For Business
                    </h1>
                    <p className='mt-4 text-xl '>Supercharge your business for free with the world's top booking platform for salons <br /> and spas. Independently voted no. 1 by industry professionals.</p>
                    <div className="flex justify-around mb-6 mt-10 border-[1px] border-[#3E5E65] rounded-xl">
                        {buttons.map((text, index) => (
                            <button
                                key={index}
                                className={`p-3 rounded-xl text-white border-2 border-transparent transition-all ${activeIndex === index ? 'bg-[#3E656D] border-2 border-[#65848C]' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                    <div className='w-full h-[600px] relative'>
                        <div className=' border-[#4A676E] border-[6px] rounded-t-3xl overflow-hidden'>
                            <Image src={images[activeIndex]} alt='' width={4200} height={1200} />
                        </div>
                        <div className='w-full absolute bottom-0 h-[138px] gradient '></div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default ForBusiness;

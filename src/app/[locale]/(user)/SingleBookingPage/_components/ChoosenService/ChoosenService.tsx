import Image from 'next/image';
import React, { useEffect } from 'react';
import './ChoosenService.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setServicesData, setGroupedServices, selectUpcomingPageState } from '@/slices/upcomingPageSlice';


interface Props { }

const ChoosenService: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const { servicesData, groupedServices } = useSelector(selectUpcomingPageState);


    const serviceData = [
        {
            productName: "Harmony Haven Wellness Center",
            productImgUrl: "/images/services/mainBanner.jpg",
            categories: [
                { name: "Spa" },
                { name: "Yoga" },
                { name: "Fitness" },
                { name: "Defox" },

            ],
            rating: "8.5",
            location: "Seefeld",
        }

    ]

    useEffect(() => {
        const savedServicesData = localStorage.getItem('servicesData');
        const savedGroupedServices = localStorage.getItem('groupedServices');

        if (savedServicesData) {
            const parsedServicesData = JSON.parse(savedServicesData);
            dispatch(setServicesData(parsedServicesData));
        }

        if (savedGroupedServices) {
            const parsedGroupedServices = JSON.parse(savedGroupedServices);
            dispatch(setGroupedServices(parsedGroupedServices));
        }
    }, [dispatch]);

    return (
        <div className="service max-lg:flex-col ">
            <div className='max-lg:relative img-side !h-full'>
                <Image className='main-img max-w-[126px] h-[126px] max-lg:!max-w-full object-cover' src={serviceData[0].productImgUrl} alt="avatar" width={500} height={500} />
                <div className='absolute flex gap-3 top-3 right-4'>
                    <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
                        <Image src={"/images/icons/wellness-heart.svg"} alt='' width={16} height={16} />
                    </div>
                </div>
            </div>
            <div className='info-side-texts py-[20px]'>
                <p>{servicesData?.name}</p>
                <p>
                    {Object.entries(groupedServices).map(([category, services], index) => (
                        <span key={index}>
                            {category}
                            {Array.isArray(services) && services.length > 0 && index < services.length - 1 && (
                                <span className="dot"> </span>
                            )}
                        </span>
                    ))}
                </p>
                <div className="rating">
                    <p><Image src="/images/booking/star.svg" alt="star" width={12} height={12} /> {serviceData[0].rating} </p>
                    <div className="dot"></div>
                    <p>$$<span>$$</span></p>
                    <div className="dot"></div>
                    <p>{serviceData[0].location}</p>
                </div>
            </div>
        </div>
    );
};

export default ChoosenService;
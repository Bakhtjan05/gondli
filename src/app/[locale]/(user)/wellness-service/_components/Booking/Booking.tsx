import React, { useState, useRef, useEffect } from 'react';
import './Booking.scss';
import Image from 'next/image';
import CustomDatePicker from './CustomDatePicker';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedService, setSelectedDate, setSelectedTime, selectUpcomingPageState, setSelectedServicePrice } from '@/slices/upcomingPageSlice';

interface BookingProps {
    isBookingOpen?: boolean;
    setIsBookingOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    groupedServices?: Record<string, any[]>;
}


const Booking: React.FC<BookingProps> = ({ isBookingOpen, setIsBookingOpen, groupedServices }) => {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();
    const dispatch = useDispatch();

    const { selectedService, selectedDate, selectedTime } = useSelector(selectUpcomingPageState);


    const [bookingCount, setBookingCount] = useState(1);



    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);


    const timeOptions = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
    ];



    const handleIncrement = () => setBookingCount(prevCount => prevCount + 1);
    const handleDecrement = () => bookingCount > 1 && setBookingCount(prevCount => prevCount - 1);

    const handleAccordionToggle = (accordion: string) => {
        setActiveAccordion(prev => (prev === accordion ? null : accordion));
    };

    const handleServiceSelect = (serviceName: string, servicePrice: string) => {
        dispatch(setSelectedService(serviceName));
        dispatch(setSelectedServicePrice(servicePrice))
        localStorage.setItem('selectedService', serviceName);
        localStorage.setItem('selectedServicePrice', servicePrice);
        setActiveAccordion(null); // Close after selection
    };

    const handleDateSelect = (date: Date) => {
        dispatch(setSelectedDate(date.toLocaleDateString()));
        localStorage.setItem('selectedDate', date.toLocaleDateString());
        setActiveAccordion(null); // Close after selection
    };

    const handleTimeSelect = (time: string) => {
        dispatch(setSelectedTime(time));
        localStorage.setItem('selectedTime', time);
        setActiveAccordion(null);
    };

    const handleBookingClick = () => {
        router.push(`/${locale}/SingleBookingPage`);
        setIsBookingOpen!(false);
    };

    const handleCloseBooking = () => {
        setIsBookingOpen!(false);

    }

    return (
        <div className="booking">
            {isBookingOpen && (
                <div className='header flex justify-between items-center'>
                    <Image src={"/images/icons/booking-logo.png"} alt='' width={101} height={22} />
                    <button onClick={handleCloseBooking}>
                        <Image src={"/images/icons/booking-x.svg"} alt='' width={20} height={20} />
                    </button>
                </div>
            )}
            <div className="title">
                <h2>25 - 110 CHF</h2>
                <p>{t('price-range')}</p>
            </div>
            <div className="selectService">
                <div className="booking">
                    <p>{t('booking-for')}</p>
                    <div className="add">
                        <button onClick={handleDecrement}>-</button>
                        <p>{bookingCount}</p>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </div>

                {/* Accordion for Service Selection */}
                <div className={`booking-accordion ${activeAccordion === 'service' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('service')}>
                        {selectedService || t('services')}
                        <Image priority src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'service' && (
                        <div className="accordion-content">
                            {Object.entries(groupedServices).map(([category, services]) => (
                                <div key={category} className="booking-category">
                                    <h3>
                                        {category}
                                    </h3>
                                    {services.map((service, idx) => (
                                        <div key={idx} className="booking-item" onClick={() => handleServiceSelect(service.name, service.price)}>
                                            <p className='!text-sm'>
                                                <Checkbox />
                                                {service.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Accordion for Date Selection */}
                <div className={`booking-accordion ${activeAccordion === 'date' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('date')}>
                        {selectedDate || t('select-date')}
                        <Image priority src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'date' && (
                        <div className="accordion-content">
                            <CustomDatePicker onDateSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

                {/* Accordion for Time Selection */}
                <div className={`booking-accordion ${activeAccordion === 'time' ? 'active' : ''}`}>
                    <button className="accordion-btn" onClick={() => handleAccordionToggle('time')}>
                        {selectedTime || t('select-time')}
                        <Image priority src="/images/services/dropdown.svg" width={8} height={4} alt="dropdown" className="accordion-icon" />
                    </button>

                    {activeAccordion === 'time' && (
                        <div className="accordion-content text-black">
                            {timeOptions.map((time, index) => (
                                <div
                                    key={index}
                                    className="booking-time-item "
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    <Image priority src="/images/services/circle.svg" width={20} height={20} alt="circle" />
                                    {time}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {bookingCount > 1 ? (
                <Link href={`/${locale}/GroupBookingPage`} passHref>
                    <button className='book'>
                        {t('book')}
                    </button>
                </Link>
            ) : (
                <button className='book' onClick={handleBookingClick}>
                    {t('book')}
                </button>
            )}
        </div>
    );
};

export default Booking;
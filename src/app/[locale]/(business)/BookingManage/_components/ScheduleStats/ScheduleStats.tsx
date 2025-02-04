import React from 'react';
import { useEffect, useState } from 'react';
import "./ScheduleStats.scss"
import Image from 'next/image';


const ScheduleStats: React.FC = () => {
    const [fillWidth, setFillWidth] = useState(0);


    const popularTime = [
        { time: "12:00", amount: 10 },
        { time: "13:00", amount: 25 },
        { time: "16:00", amount: 8 },
        { time: "12:00", amount: 21 },
        { time: "20:00", amount: 6 },
    ]

    const bookingInformations = [
        { name: "Booking’s Made", number: 83, trend: "/images/bookingManage/go-up-icon.svg" },
        { name: "New Customers", number: 60, trend: "/images/bookingManage/go-up-icon.svg" },
        { name: "Loyal Customers", number: 23, trend: "/images/bookingManage/go-up-icon.svg" },
        { name: "Total Revenue", number: "3,500 CHF", trend: "/images/bookingManage/go-up-icon.svg" },
        { name: "Avg. Revenue", number: "101.20 CHF", trend: "/images/bookingManage/go-down-icon.svg" },
        { name: "Conversion Rate", number: "100%", trend: "/images/bookingManage/go-up-icon.svg" },
    ]

    const todaysCustomers = [
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
        { name: "Lowell Bauver", time: "10:00", service: "Gentle Flow Yoga Class" },
    ]


    const calculateWidth = (number: number) => {
        return number >= 20 ? 100 : (number / 20) * 100;
    };

    const maxAmount = popularTime.reduce((max, current) => {
        return current.amount > max.amount ? current : max;
    }, popularTime[0]);

    useEffect(() => {
        setFillWidth(calculateWidth(10));
    }, []);

    return (
        <aside>
            <div className="bookings-breakdown">
                <h2>Bookings Breakdown</h2>
                <div className="booking-container">
                    {bookingInformations.map((item, index) => (
                        <div className='booking-info' key={index}>
                            <div className='booking-title'>
                                <p>{item.name}</p>
                                <Image src="/images/bookingManage/info-icon.svg" alt='' width={16} height={16} />
                            </div>
                            <div className='numbers'>
                                <p>{item.number}</p>
                                <Image src={item.trend} alt='' width={8} height={8} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="popular-times">
                <h2>Most Popular Times</h2>
                <div className='times-container'>
                    {popularTime.map((item, index) => (
                        <div className={`time-col ${item.amount === maxAmount.amount ? "max" : ""}`} key={index}>
                            <p className='time-text'>{item.time}</p>
                            <div
                                className='fill-container'
                                style={{
                                    width: `${calculateWidth(item.amount)}%`,
                                    transition: 'width 0.3s ease',
                                }}
                            >
                                <div
                                    className={`fill ${item.amount === maxAmount.amount ? "max" : ""}`}

                                >

                                </div>
                                <p className='number'>{item.amount}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="todays-customers">
                <h2>Today’s Customers</h2>
                <div className="customers-container">
                    {todaysCustomers.map((item, index) => (
                        <div className="customer" key={index}>
                            <div>
                                <Image src="/images/bookingManage/profile-picture.png" alt='' width={40} height={40} />
                            </div>
                            <div className='customer-info'>
                                <p className='name'>{item.name}</p>
                                <p className='time-class'>{item.time} <span></span> {item.service}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )

}

export default ScheduleStats;
import React from 'react';
import { useEffect, useState } from 'react';
import "./Rescheduling.scss"
import Image from 'next/image';

interface ReschedulingProps {
    openBookingDetails: boolean;
    handleOpenCustomerDetails: () => void;
    orderNumber: string | null;
    openCustomerDetails: boolean;
    handleOpenReschedule: () => void;
    openRescheduling: boolean;
    setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
    setSucceedRescheduleOrderNumber: React.Dispatch<React.SetStateAction<string | null>>;


}


const Rescheduling: React.FC<ReschedulingProps> = ({
    openBookingDetails,
    handleOpenCustomerDetails,
    orderNumber,
    openCustomerDetails,
    handleOpenReschedule,
    openRescheduling,
    setShowSuccessMessage,
    setSucceedRescheduleOrderNumber,


}) => {


    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [openCalendar, setOpenCalendar] = useState(true)
    const [selectedDate, setSelectedDate] = useState<string>("26 November 2024");
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>("09:00");
    const unavailableTimes = ["10:30", "14:00", "18:00"];
    const today = new Date();

    const [openTimeEditor, setOpenTimeEditor] = useState(false);


    const [currentDate, setCurrentDate] = useState(new Date());

    const timeData = [

    ]

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    const handlePrevMonth = () => {
        const now = new Date();
        if (
            currentDate.getFullYear() > now.getFullYear() ||
            (currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() > now.getMonth())
        ) {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        }
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleSaveReschedule = () => {
        setSucceedRescheduleOrderNumber(orderNumber)
        handleOpenReschedule();
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 5000);
    }

    const handleDayClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (newDate >= today) {
            setSelectedDate(newDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
            setSelectedDay(day);
        }
    };

    const generateDays = () => {
        const days = [];
        const startDay = (startOfMonth.getDay() + 6) % 7;
        const totalDays = endOfMonth.getDate();

        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthEnd.getDate() - i;
            const dayOfWeek = (startDay - i - 1) % 7;
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
            days.push(
                <div key={`prev-${day}`} className={`day notCurrentMonth ${isWeekend ? "weekend" : ""}`}>
                    <p>{day}</p>
                </div>
            );
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayOfWeek = (startDay + day - 1) % 7;
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
            const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();
            const isBeforeToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < today;

            days.push(
                <div
                    key={`current-${day}`}
                    className={`day currentMonth ${isWeekend ? "weekend" : ""} ${isToday ? "today" : ""
                        } ${selectedDay === day ? "selected" : ""} ${isBeforeToday ? "disabled" : ""}`}
                    onClick={() => !isBeforeToday && handleDayClick(day)} // Запрет клика по дням до текущего
                >
                    <p>{day}</p>
                </div>
            );
        }

        const remainingDays = (7 - (days.length % 7)) % 7;
        for (let day = 1; day <= remainingDays; day++) {
            const dayOfWeek = (startDay + totalDays + day - 1) % 7;
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
            days.push(
                <div key={`next-${day}`} className={`day notCurrentMonth ${isWeekend ? "weekend" : ""}`}>
                    <p className=''>{day}</p>
                </div>
            );
        }

        return days;
    };

    const generateTimes = () => {
        const times = [];
        for (let hour = 9; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                times.push(formattedTime);
            }
        }
        return times;
    };

    const handleOpenCalendar = () => {
        setOpenCalendar((prev) => !prev)
    }

    const handleOpenTimeEditor = () => {
        setOpenTimeEditor((prev) => !prev)
    }

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    return (
        <div className='block-rescheduling'>
            <div className='order-info'>
                <div className='title'>
                    <h2>Order {orderNumber}</h2>
                    <div onClick={handleOpenReschedule}>
                        <Image src="/images/bookingManage/x-dark.svg" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className="schedule-info">
                    <div className="main-block">
                        <h3>Rescheduling Appointment</h3>
                        <div className={`dropdown-date`}>
                            <div className={`date edit-block ${openTimeEditor ? "hidden" : ""}`}>
                                <div>
                                    <p className='value-edit'>{selectedDate}</p>
                                    <p className='title-edit'>Current Appointment Date</p>
                                </div>
                                <div>
                                    {openCalendar ? (
                                        <button className='save-btn' onClick={openTimeEditor ? undefined : handleOpenCalendar}>
                                            <Image src="/images/bookingManage/check-white-icon.svg" alt='' width={14} height={14} />
                                            Save
                                        </button>
                                    ) : (
                                        <button className='edit-btn' onClick={openTimeEditor ? undefined : handleOpenCalendar}>
                                            <Image src="/images/bookingManage/edit-dark-icon.svg" alt='' width={14} height={14} />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`calendar ${openCalendar ? "active" : ""}`}>
                            <div className="header">
                                <button className="navButton" onClick={handlePrevMonth}>
                                    <Image src="/images/bookingManage/left-icon.svg" alt='' width={16} height={16} />
                                </button>
                                <h2>
                                    {currentDate.toLocaleString('en-US', { month: "long" })} {currentDate.getFullYear()}
                                </h2>
                                <button className="navButton" onClick={handleNextMonth}>
                                    <Image className='right' src="/images/bookingManage/left-icon.svg" alt='' width={16} height={16} />
                                </button>
                            </div>
                            <div className="weekdays">
                                {daysOfWeek.map((day) => (
                                    <div key={day} className="weekday">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="days">{generateDays()}</div>
                        </div>
                        <div className={`time edit-block ${openCalendar ? "hidden" : ""}`}>
                            <div>
                                <p className='value-edit'>{selectedTime}</p>
                                <p className='title-edit'>Current Appointment Time</p>
                            </div>
                            <div>
                                {openTimeEditor ? (
                                    <button className='save-btn' onClick={openCalendar ? undefined : handleOpenTimeEditor}>
                                        <Image src="/images/bookingManage/check-white-icon.svg" alt='' width={14} height={14} />
                                        Save
                                    </button>
                                ) : (
                                    <button className='edit-btn' onClick={openCalendar ? undefined : handleOpenTimeEditor}>
                                        <Image src="/images/bookingManage/edit-dark-icon.svg" alt='' width={14} height={14} />
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={`time-editor ${openTimeEditor ? "active" : ""}`}>
                            <div className="scroll-block">
                                {generateTimes().map((time) => (
                                    <div
                                        key={time}
                                        className={`time-to-choose ${unavailableTimes.includes(time) ? 'unavailable' : ''} ${selectedTime === time ? 'selected' : ''
                                            }`}
                                        onClick={() => {
                                            if (!unavailableTimes.includes(time)) {
                                                handleTimeClick(time);
                                            }
                                        }}
                                    >
                                        <div className="circle-check">
                                            <Image src="/images/bookingManage/check-white-icon.svg" width={16} height={16} alt='' />

                                        </div>
                                        <p>{time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="save-block">
                        <button className='discard' onClick={handleOpenReschedule}>Discard</button>
                        <button className='save' onClick={handleSaveReschedule}>Save Changes</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Rescheduling;